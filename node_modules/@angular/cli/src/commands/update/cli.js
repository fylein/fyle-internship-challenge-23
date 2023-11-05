"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tools_1 = require("@angular-devkit/schematics/tools");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const module_1 = require("module");
const npm_package_arg_1 = __importDefault(require("npm-package-arg"));
const npm_pick_manifest_1 = __importDefault(require("npm-pick-manifest"));
const path = __importStar(require("path"));
const path_1 = require("path");
const semver = __importStar(require("semver"));
const workspace_schema_1 = require("../../../lib/config/workspace-schema");
const command_module_1 = require("../../command-builder/command-module");
const schematic_engine_host_1 = require("../../command-builder/utilities/schematic-engine-host");
const schematic_workflow_1 = require("../../command-builder/utilities/schematic-workflow");
const color_1 = require("../../utilities/color");
const environment_options_1 = require("../../utilities/environment-options");
const error_1 = require("../../utilities/error");
const log_file_1 = require("../../utilities/log-file");
const package_metadata_1 = require("../../utilities/package-metadata");
const package_tree_1 = require("../../utilities/package-tree");
const prompt_1 = require("../../utilities/prompt");
const tty_1 = require("../../utilities/tty");
const version_1 = require("../../utilities/version");
const ANGULAR_PACKAGES_REGEXP = /^@(?:angular|nguniversal)\//;
const UPDATE_SCHEMATIC_COLLECTION = path.join(__dirname, 'schematic/collection.json');
class UpdateCommandModule extends command_module_1.CommandModule {
    constructor() {
        super(...arguments);
        this.scope = command_module_1.CommandScope.In;
        this.shouldReportAnalytics = false;
        this.command = 'update [packages..]';
        this.describe = 'Updates your workspace and its dependencies. See https://update.angular.io/.';
        this.longDescriptionPath = (0, path_1.join)(__dirname, 'long-description.md');
    }
    builder(localYargs) {
        return localYargs
            .positional('packages', {
            description: 'The names of package(s) to update.',
            type: 'string',
            array: true,
        })
            .option('force', {
            description: 'Ignore peer dependency version mismatches.',
            type: 'boolean',
            default: false,
        })
            .option('next', {
            description: 'Use the prerelease version, including beta and RCs.',
            type: 'boolean',
            default: false,
        })
            .option('migrate-only', {
            description: 'Only perform a migration, do not update the installed version.',
            type: 'boolean',
        })
            .option('name', {
            description: 'The name of the migration to run. ' +
                `Only available with a single package being updated, and only with 'migrate-only' option.`,
            type: 'string',
            implies: ['migrate-only'],
            conflicts: ['to', 'from'],
        })
            .option('from', {
            description: 'Version from which to migrate from. ' +
                `Only available with a single package being updated, and only with 'migrate-only'.`,
            type: 'string',
            implies: ['migrate-only'],
            conflicts: ['name'],
        })
            .option('to', {
            describe: 'Version up to which to apply migrations. Only available with a single package being updated, ' +
                `and only with 'migrate-only' option. Requires 'from' to be specified. Default to the installed version detected.`,
            type: 'string',
            implies: ['from', 'migrate-only'],
            conflicts: ['name'],
        })
            .option('allow-dirty', {
            describe: 'Whether to allow updating when the repository contains modified or untracked files.',
            type: 'boolean',
            default: false,
        })
            .option('verbose', {
            describe: 'Display additional details about internal operations during execution.',
            type: 'boolean',
            default: false,
        })
            .option('create-commits', {
            describe: 'Create source control commits for updates and migrations.',
            type: 'boolean',
            alias: ['C'],
            default: false,
        })
            .check(({ packages, 'allow-dirty': allowDirty, 'migrate-only': migrateOnly }) => {
            const { logger } = this.context;
            // This allows the user to easily reset any changes from the update.
            if (packages?.length && !this.checkCleanGit()) {
                if (allowDirty) {
                    logger.warn('Repository is not clean. Update changes will be mixed with pre-existing changes.');
                }
                else {
                    throw new command_module_1.CommandModuleError('Repository is not clean. Please commit or stash any changes before updating.');
                }
            }
            if (migrateOnly) {
                if (packages?.length !== 1) {
                    throw new command_module_1.CommandModuleError(`A single package must be specified when using the 'migrate-only' option.`);
                }
            }
            return true;
        })
            .strict();
    }
    async run(options) {
        const { logger, packageManager } = this.context;
        packageManager.ensureCompatibility();
        // Check if the current installed CLI version is older than the latest compatible version.
        // Skip when running `ng update` without a package name as this will not trigger an actual update.
        if (!environment_options_1.disableVersionCheck && options.packages?.length) {
            const cliVersionToInstall = await this.checkCLIVersion(options.packages, options.verbose, options.next);
            if (cliVersionToInstall) {
                logger.warn('The installed Angular CLI version is outdated.\n' +
                    `Installing a temporary Angular CLI versioned ${cliVersionToInstall} to perform the update.`);
                return this.runTempBinary(`@angular/cli@${cliVersionToInstall}`, process.argv.slice(2));
            }
        }
        const packages = [];
        for (const request of options.packages ?? []) {
            try {
                const packageIdentifier = (0, npm_package_arg_1.default)(request);
                // only registry identifiers are supported
                if (!packageIdentifier.registry) {
                    logger.error(`Package '${request}' is not a registry package identifer.`);
                    return 1;
                }
                if (packages.some((v) => v.name === packageIdentifier.name)) {
                    logger.error(`Duplicate package '${packageIdentifier.name}' specified.`);
                    return 1;
                }
                if (options.migrateOnly && packageIdentifier.rawSpec !== '*') {
                    logger.warn('Package specifier has no effect when using "migrate-only" option.');
                }
                // If next option is used and no specifier supplied, use next tag
                if (options.next && packageIdentifier.rawSpec === '*') {
                    packageIdentifier.fetchSpec = 'next';
                }
                packages.push(packageIdentifier);
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                logger.error(e.message);
                return 1;
            }
        }
        logger.info(`Using package manager: ${color_1.colors.grey(packageManager.name)}`);
        logger.info('Collecting installed dependencies...');
        const rootDependencies = await (0, package_tree_1.getProjectDependencies)(this.context.root);
        logger.info(`Found ${rootDependencies.size} dependencies.`);
        const workflow = new tools_1.NodeWorkflow(this.context.root, {
            packageManager: packageManager.name,
            packageManagerForce: this.packageManagerForce(options.verbose),
            // __dirname -> favor @schematics/update from this package
            // Otherwise, use packages from the active workspace (migrations)
            resolvePaths: [__dirname, this.context.root],
            schemaValidation: true,
            engineHostCreator: (options) => new schematic_engine_host_1.SchematicEngineHost(options.resolvePaths),
        });
        if (packages.length === 0) {
            // Show status
            const { success } = await this.executeSchematic(workflow, UPDATE_SCHEMATIC_COLLECTION, 'update', {
                force: options.force,
                next: options.next,
                verbose: options.verbose,
                packageManager: packageManager.name,
                packages: [],
            });
            return success ? 0 : 1;
        }
        return options.migrateOnly
            ? this.migrateOnly(workflow, (options.packages ?? [])[0], rootDependencies, options)
            : this.updatePackagesAndMigrate(workflow, rootDependencies, options, packages);
    }
    async executeSchematic(workflow, collection, schematic, options = {}) {
        const { logger } = this.context;
        const workflowSubscription = (0, schematic_workflow_1.subscribeToWorkflow)(workflow, logger);
        // TODO: Allow passing a schematic instance directly
        try {
            await workflow
                .execute({
                collection,
                schematic,
                options,
                logger,
            })
                .toPromise();
            return { success: !workflowSubscription.error, files: workflowSubscription.files };
        }
        catch (e) {
            if (e instanceof schematics_1.UnsuccessfulWorkflowExecution) {
                logger.error(`${color_1.colors.symbols.cross} Migration failed. See above for further details.\n`);
            }
            else {
                (0, error_1.assertIsError)(e);
                const logPath = (0, log_file_1.writeErrorToLogFile)(e);
                logger.fatal(`${color_1.colors.symbols.cross} Migration failed: ${e.message}\n` +
                    `  See "${logPath}" for further details.\n`);
            }
            return { success: false, files: workflowSubscription.files };
        }
        finally {
            workflowSubscription.unsubscribe();
        }
    }
    /**
     * @return Whether or not the migration was performed successfully.
     */
    async executeMigration(workflow, packageName, collectionPath, migrationName, commit) {
        const { logger } = this.context;
        const collection = workflow.engine.createCollection(collectionPath);
        const name = collection.listSchematicNames().find((name) => name === migrationName);
        if (!name) {
            logger.error(`Cannot find migration '${migrationName}' in '${packageName}'.`);
            return 1;
        }
        logger.info(color_1.colors.cyan(`** Executing '${migrationName}' of package '${packageName}' **\n`));
        const schematic = workflow.engine.createSchematic(name, collection);
        return this.executePackageMigrations(workflow, [schematic.description], packageName, commit);
    }
    /**
     * @return Whether or not the migrations were performed successfully.
     */
    async executeMigrations(workflow, packageName, collectionPath, from, to, commit) {
        const collection = workflow.engine.createCollection(collectionPath);
        const migrationRange = new semver.Range('>' + (semver.prerelease(from) ? from.split('-')[0] + '-0' : from) + ' <=' + to.split('-')[0]);
        const requiredMigrations = [];
        const optionalMigrations = [];
        for (const name of collection.listSchematicNames()) {
            const schematic = workflow.engine.createSchematic(name, collection);
            const description = schematic.description;
            description.version = coerceVersionNumber(description.version);
            if (!description.version) {
                continue;
            }
            if (semver.satisfies(description.version, migrationRange, { includePrerelease: true })) {
                (description.optional ? optionalMigrations : requiredMigrations).push(description);
            }
        }
        if (requiredMigrations.length === 0 && optionalMigrations.length === 0) {
            return 0;
        }
        // Required migrations
        if (requiredMigrations.length) {
            this.context.logger.info(color_1.colors.cyan(`** Executing migrations of package '${packageName}' **\n`));
            requiredMigrations.sort((a, b) => semver.compare(a.version, b.version) || a.name.localeCompare(b.name));
            const result = await this.executePackageMigrations(workflow, requiredMigrations, packageName, commit);
            if (result === 1) {
                return 1;
            }
        }
        // Optional migrations
        if (optionalMigrations.length) {
            this.context.logger.info(color_1.colors.magenta(`** Optional migrations of package '${packageName}' **\n`));
            optionalMigrations.sort((a, b) => semver.compare(a.version, b.version) || a.name.localeCompare(b.name));
            const migrationsToRun = await this.getOptionalMigrationsToRun(optionalMigrations, packageName);
            if (migrationsToRun?.length) {
                return this.executePackageMigrations(workflow, migrationsToRun, packageName, commit);
            }
        }
        return 0;
    }
    async executePackageMigrations(workflow, migrations, packageName, commit = false) {
        const { logger } = this.context;
        for (const migration of migrations) {
            const { title, description } = getMigrationTitleAndDescription(migration);
            logger.info(color_1.colors.cyan(color_1.colors.symbols.pointer) + ' ' + color_1.colors.bold(title));
            if (description) {
                logger.info('  ' + description);
            }
            const { success, files } = await this.executeSchematic(workflow, migration.collection.name, migration.name);
            if (!success) {
                return 1;
            }
            let modifiedFilesText;
            switch (files.size) {
                case 0:
                    modifiedFilesText = 'No changes made';
                    break;
                case 1:
                    modifiedFilesText = '1 file modified';
                    break;
                default:
                    modifiedFilesText = `${files.size} files modified`;
                    break;
            }
            logger.info(`  Migration completed (${modifiedFilesText}).`);
            // Commit migration
            if (commit) {
                const commitPrefix = `${packageName} migration - ${migration.name}`;
                const commitMessage = migration.description
                    ? `${commitPrefix}\n\n${migration.description}`
                    : commitPrefix;
                const committed = this.commit(commitMessage);
                if (!committed) {
                    // Failed to commit, something went wrong. Abort the update.
                    return 1;
                }
            }
            logger.info(''); // Extra trailing newline.
        }
        return 0;
    }
    async migrateOnly(workflow, packageName, rootDependencies, options) {
        const { logger } = this.context;
        const packageDependency = rootDependencies.get(packageName);
        let packagePath = packageDependency?.path;
        let packageNode = packageDependency?.package;
        if (packageDependency && !packageNode) {
            logger.error('Package found in package.json but is not installed.');
            return 1;
        }
        else if (!packageDependency) {
            // Allow running migrations on transitively installed dependencies
            // There can technically be nested multiple versions
            // TODO: If multiple, this should find all versions and ask which one to use
            const packageJson = (0, package_tree_1.findPackageJson)(this.context.root, packageName);
            if (packageJson) {
                packagePath = path.dirname(packageJson);
                packageNode = await (0, package_tree_1.readPackageJson)(packageJson);
            }
        }
        if (!packageNode || !packagePath) {
            logger.error('Package is not installed.');
            return 1;
        }
        const updateMetadata = packageNode['ng-update'];
        let migrations = updateMetadata?.migrations;
        if (migrations === undefined) {
            logger.error('Package does not provide migrations.');
            return 1;
        }
        else if (typeof migrations !== 'string') {
            logger.error('Package contains a malformed migrations field.');
            return 1;
        }
        else if (path.posix.isAbsolute(migrations) || path.win32.isAbsolute(migrations)) {
            logger.error('Package contains an invalid migrations field. Absolute paths are not permitted.');
            return 1;
        }
        // Normalize slashes
        migrations = migrations.replace(/\\/g, '/');
        if (migrations.startsWith('../')) {
            logger.error('Package contains an invalid migrations field. Paths outside the package root are not permitted.');
            return 1;
        }
        // Check if it is a package-local location
        const localMigrations = path.join(packagePath, migrations);
        if ((0, fs_1.existsSync)(localMigrations)) {
            migrations = localMigrations;
        }
        else {
            // Try to resolve from package location.
            // This avoids issues with package hoisting.
            try {
                const packageRequire = (0, module_1.createRequire)(packagePath + '/');
                migrations = packageRequire.resolve(migrations);
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                if (e.code === 'MODULE_NOT_FOUND') {
                    logger.error('Migrations for package were not found.');
                }
                else {
                    logger.error(`Unable to resolve migrations for package.  [${e.message}]`);
                }
                return 1;
            }
        }
        if (options.name) {
            return this.executeMigration(workflow, packageName, migrations, options.name, options.createCommits);
        }
        const from = coerceVersionNumber(options.from);
        if (!from) {
            logger.error(`"from" value [${options.from}] is not a valid version.`);
            return 1;
        }
        return this.executeMigrations(workflow, packageName, migrations, from, options.to || packageNode.version, options.createCommits);
    }
    // eslint-disable-next-line max-lines-per-function
    async updatePackagesAndMigrate(workflow, rootDependencies, options, packages) {
        const { logger } = this.context;
        const logVerbose = (message) => {
            if (options.verbose) {
                logger.info(message);
            }
        };
        const requests = [];
        // Validate packages actually are part of the workspace
        for (const pkg of packages) {
            const node = rootDependencies.get(pkg.name);
            if (!node?.package) {
                logger.error(`Package '${pkg.name}' is not a dependency.`);
                return 1;
            }
            // If a specific version is requested and matches the installed version, skip.
            if (pkg.type === 'version' && node.package.version === pkg.fetchSpec) {
                logger.info(`Package '${pkg.name}' is already at '${pkg.fetchSpec}'.`);
                continue;
            }
            requests.push({ identifier: pkg, node });
        }
        if (requests.length === 0) {
            return 0;
        }
        logger.info('Fetching dependency metadata from registry...');
        const packagesToUpdate = [];
        for (const { identifier: requestIdentifier, node } of requests) {
            const packageName = requestIdentifier.name;
            let metadata;
            try {
                // Metadata requests are internally cached; multiple requests for same name
                // does not result in additional network traffic
                metadata = await (0, package_metadata_1.fetchPackageMetadata)(packageName, logger, {
                    verbose: options.verbose,
                });
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                logger.error(`Error fetching metadata for '${packageName}': ` + e.message);
                return 1;
            }
            // Try to find a package version based on the user requested package specifier
            // registry specifier types are either version, range, or tag
            let manifest;
            if (requestIdentifier.type === 'version' ||
                requestIdentifier.type === 'range' ||
                requestIdentifier.type === 'tag') {
                try {
                    manifest = (0, npm_pick_manifest_1.default)(metadata, requestIdentifier.fetchSpec);
                }
                catch (e) {
                    (0, error_1.assertIsError)(e);
                    if (e.code === 'ETARGET') {
                        // If not found and next was used and user did not provide a specifier, try latest.
                        // Package may not have a next tag.
                        if (requestIdentifier.type === 'tag' &&
                            requestIdentifier.fetchSpec === 'next' &&
                            !requestIdentifier.rawSpec) {
                            try {
                                manifest = (0, npm_pick_manifest_1.default)(metadata, 'latest');
                            }
                            catch (e) {
                                (0, error_1.assertIsError)(e);
                                if (e.code !== 'ETARGET' && e.code !== 'ENOVERSIONS') {
                                    throw e;
                                }
                            }
                        }
                    }
                    else if (e.code !== 'ENOVERSIONS') {
                        throw e;
                    }
                }
            }
            if (!manifest) {
                logger.error(`Package specified by '${requestIdentifier.raw}' does not exist within the registry.`);
                return 1;
            }
            if (manifest.version === node.package?.version) {
                logger.info(`Package '${packageName}' is already up to date.`);
                continue;
            }
            if (node.package && ANGULAR_PACKAGES_REGEXP.test(node.package.name)) {
                const { name, version } = node.package;
                const toBeInstalledMajorVersion = +manifest.version.split('.')[0];
                const currentMajorVersion = +version.split('.')[0];
                if (toBeInstalledMajorVersion - currentMajorVersion > 1) {
                    // Only allow updating a single version at a time.
                    if (currentMajorVersion < 6) {
                        // Before version 6, the major versions were not always sequential.
                        // Example @angular/core skipped version 3, @angular/cli skipped versions 2-5.
                        logger.error(`Updating multiple major versions of '${name}' at once is not supported. Please migrate each major version individually.\n` +
                            `For more information about the update process, see https://update.angular.io/.`);
                    }
                    else {
                        const nextMajorVersionFromCurrent = currentMajorVersion + 1;
                        logger.error(`Updating multiple major versions of '${name}' at once is not supported. Please migrate each major version individually.\n` +
                            `Run 'ng update ${name}@${nextMajorVersionFromCurrent}' in your workspace directory ` +
                            `to update to latest '${nextMajorVersionFromCurrent}.x' version of '${name}'.\n\n` +
                            `For more information about the update process, see https://update.angular.io/?v=${currentMajorVersion}.0-${nextMajorVersionFromCurrent}.0`);
                    }
                    return 1;
                }
            }
            packagesToUpdate.push(requestIdentifier.toString());
        }
        if (packagesToUpdate.length === 0) {
            return 0;
        }
        const { success } = await this.executeSchematic(workflow, UPDATE_SCHEMATIC_COLLECTION, 'update', {
            verbose: options.verbose,
            force: options.force,
            next: options.next,
            packageManager: this.context.packageManager.name,
            packages: packagesToUpdate,
        });
        if (success) {
            try {
                await fs_1.promises.rm(path.join(this.context.root, 'node_modules'), {
                    force: true,
                    recursive: true,
                    maxRetries: 3,
                });
            }
            catch { }
            const installationSuccess = await this.context.packageManager.installAll(this.packageManagerForce(options.verbose) ? ['--force'] : [], this.context.root);
            if (!installationSuccess) {
                return 1;
            }
        }
        if (success && options.createCommits) {
            if (!this.commit(`Angular CLI update for packages - ${packagesToUpdate.join(', ')}`)) {
                return 1;
            }
        }
        // This is a temporary workaround to allow data to be passed back from the update schematic
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const migrations = global.externalMigrations;
        if (success && migrations) {
            const rootRequire = (0, module_1.createRequire)(this.context.root + '/');
            for (const migration of migrations) {
                // Resolve the package from the workspace root, as otherwise it will be resolved from the temp
                // installed CLI version.
                let packagePath;
                logVerbose(`Resolving migration package '${migration.package}' from '${this.context.root}'...`);
                try {
                    try {
                        packagePath = path.dirname(
                        // This may fail if the `package.json` is not exported as an entry point
                        rootRequire.resolve(path.join(migration.package, 'package.json')));
                    }
                    catch (e) {
                        (0, error_1.assertIsError)(e);
                        if (e.code === 'MODULE_NOT_FOUND') {
                            // Fallback to trying to resolve the package's main entry point
                            packagePath = rootRequire.resolve(migration.package);
                        }
                        else {
                            throw e;
                        }
                    }
                }
                catch (e) {
                    (0, error_1.assertIsError)(e);
                    if (e.code === 'MODULE_NOT_FOUND') {
                        logVerbose(e.toString());
                        logger.error(`Migrations for package (${migration.package}) were not found.` +
                            ' The package could not be found in the workspace.');
                    }
                    else {
                        logger.error(`Unable to resolve migrations for package (${migration.package}).  [${e.message}]`);
                    }
                    return 1;
                }
                let migrations;
                // Check if it is a package-local location
                const localMigrations = path.join(packagePath, migration.collection);
                if ((0, fs_1.existsSync)(localMigrations)) {
                    migrations = localMigrations;
                }
                else {
                    // Try to resolve from package location.
                    // This avoids issues with package hoisting.
                    try {
                        const packageRequire = (0, module_1.createRequire)(packagePath + '/');
                        migrations = packageRequire.resolve(migration.collection);
                    }
                    catch (e) {
                        (0, error_1.assertIsError)(e);
                        if (e.code === 'MODULE_NOT_FOUND') {
                            logger.error(`Migrations for package (${migration.package}) were not found.`);
                        }
                        else {
                            logger.error(`Unable to resolve migrations for package (${migration.package}).  [${e.message}]`);
                        }
                        return 1;
                    }
                }
                const result = await this.executeMigrations(workflow, migration.package, migrations, migration.from, migration.to, options.createCommits);
                // A non-zero value is a failure for the package's migrations
                if (result !== 0) {
                    return result;
                }
            }
        }
        return success ? 0 : 1;
    }
    /**
     * @return Whether or not the commit was successful.
     */
    commit(message) {
        const { logger } = this.context;
        // Check if a commit is needed.
        let commitNeeded;
        try {
            commitNeeded = hasChangesToCommit();
        }
        catch (err) {
            logger.error(`  Failed to read Git tree:\n${err.stderr}`);
            return false;
        }
        if (!commitNeeded) {
            logger.info('  No changes to commit after migration.');
            return true;
        }
        // Commit changes and abort on error.
        try {
            createCommit(message);
        }
        catch (err) {
            logger.error(`Failed to commit update (${message}):\n${err.stderr}`);
            return false;
        }
        // Notify user of the commit.
        const hash = findCurrentGitSha();
        const shortMessage = message.split('\n')[0];
        if (hash) {
            logger.info(`  Committed migration step (${getShortHash(hash)}): ${shortMessage}.`);
        }
        else {
            // Commit was successful, but reading the hash was not. Something weird happened,
            // but nothing that would stop the update. Just log the weirdness and continue.
            logger.info(`  Committed migration step: ${shortMessage}.`);
            logger.warn('  Failed to look up hash of most recent commit, continuing anyways.');
        }
        return true;
    }
    checkCleanGit() {
        try {
            const topLevel = (0, child_process_1.execSync)('git rev-parse --show-toplevel', {
                encoding: 'utf8',
                stdio: 'pipe',
            });
            const result = (0, child_process_1.execSync)('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' });
            if (result.trim().length === 0) {
                return true;
            }
            // Only files inside the workspace root are relevant
            for (const entry of result.split('\n')) {
                const relativeEntry = path.relative(path.resolve(this.context.root), path.resolve(topLevel.trim(), entry.slice(3).trim()));
                if (!relativeEntry.startsWith('..') && !path.isAbsolute(relativeEntry)) {
                    return false;
                }
            }
        }
        catch { }
        return true;
    }
    /**
     * Checks if the current installed CLI version is older or newer than a compatible version.
     * @returns the version to install or null when there is no update to install.
     */
    async checkCLIVersion(packagesToUpdate, verbose = false, next = false) {
        const { version } = await (0, package_metadata_1.fetchPackageManifest)(`@angular/cli@${this.getCLIUpdateRunnerVersion(packagesToUpdate, next)}`, this.context.logger, {
            verbose,
            usingYarn: this.context.packageManager.name === workspace_schema_1.PackageManager.Yarn,
        });
        return version_1.VERSION.full === version ? null : version;
    }
    getCLIUpdateRunnerVersion(packagesToUpdate, next) {
        if (next) {
            return 'next';
        }
        const updatingAngularPackage = packagesToUpdate?.find((r) => ANGULAR_PACKAGES_REGEXP.test(r));
        if (updatingAngularPackage) {
            // If we are updating any Angular package we can update the CLI to the target version because
            // migrations for @angular/core@13 can be executed using Angular/cli@13.
            // This is same behaviour as `npx @angular/cli@13 update @angular/core@13`.
            // `@angular/cli@13` -> ['', 'angular/cli', '13']
            // `@angular/cli` -> ['', 'angular/cli']
            const tempVersion = coerceVersionNumber(updatingAngularPackage.split('@')[2]);
            return semver.parse(tempVersion)?.major ?? 'latest';
        }
        // When not updating an Angular package we cannot determine which schematic runtime the migration should to be executed in.
        // Typically, we can assume that the `@angular/cli` was updated previously.
        // Example: Angular official packages are typically updated prior to NGRX etc...
        // Therefore, we only update to the latest patch version of the installed major version of the Angular CLI.
        // This is important because we might end up in a scenario where locally Angular v12 is installed, updating NGRX from 11 to 12.
        // We end up using Angular ClI v13 to run the migrations if we run the migrations using the CLI installed major version + 1 logic.
        return version_1.VERSION.major;
    }
    async runTempBinary(packageName, args = []) {
        const { success, tempNodeModules } = await this.context.packageManager.installTemp(packageName);
        if (!success) {
            return 1;
        }
        // Remove version/tag etc... from package name
        // Ex: @angular/cli@latest -> @angular/cli
        const packageNameNoVersion = packageName.substring(0, packageName.lastIndexOf('@'));
        const pkgLocation = (0, path_1.join)(tempNodeModules, packageNameNoVersion);
        const packageJsonPath = (0, path_1.join)(pkgLocation, 'package.json');
        // Get a binary location for this package
        let binPath;
        if ((0, fs_1.existsSync)(packageJsonPath)) {
            const content = await fs_1.promises.readFile(packageJsonPath, 'utf-8');
            if (content) {
                const { bin = {} } = JSON.parse(content);
                const binKeys = Object.keys(bin);
                if (binKeys.length) {
                    binPath = (0, path_1.resolve)(pkgLocation, bin[binKeys[0]]);
                }
            }
        }
        if (!binPath) {
            throw new Error(`Cannot locate bin for temporary package: ${packageNameNoVersion}.`);
        }
        const { status, error } = (0, child_process_1.spawnSync)(process.execPath, [binPath, ...args], {
            stdio: 'inherit',
            env: {
                ...process.env,
                NG_DISABLE_VERSION_CHECK: 'true',
                NG_CLI_ANALYTICS: 'false',
            },
        });
        if (status === null && error) {
            throw error;
        }
        return status ?? 0;
    }
    packageManagerForce(verbose) {
        // npm 7+ can fail due to it incorrectly resolving peer dependencies that have valid SemVer
        // ranges during an update. Update will set correct versions of dependencies within the
        // package.json file. The force option is set to workaround these errors.
        // Example error:
        // npm ERR! Conflicting peer dependency: @angular/compiler-cli@14.0.0-rc.0
        // npm ERR! node_modules/@angular/compiler-cli
        // npm ERR!   peer @angular/compiler-cli@"^14.0.0 || ^14.0.0-rc" from @angular-devkit/build-angular@14.0.0-rc.0
        // npm ERR!   node_modules/@angular-devkit/build-angular
        // npm ERR!     dev @angular-devkit/build-angular@"~14.0.0-rc.0" from the root project
        if (this.context.packageManager.name === workspace_schema_1.PackageManager.Npm &&
            this.context.packageManager.version &&
            semver.gte(this.context.packageManager.version, '7.0.0')) {
            if (verbose) {
                this.context.logger.info('NPM 7+ detected -- enabling force option for package installation');
            }
            return true;
        }
        return false;
    }
    async getOptionalMigrationsToRun(optionalMigrations, packageName) {
        const { logger } = this.context;
        const numberOfMigrations = optionalMigrations.length;
        logger.info(`This package has ${numberOfMigrations} optional migration${numberOfMigrations > 1 ? 's' : ''} that can be executed.`);
        logger.info(''); // Extra trailing newline.
        if (!(0, tty_1.isTTY)()) {
            for (const migration of optionalMigrations) {
                const { title } = getMigrationTitleAndDescription(migration);
                logger.info(color_1.colors.cyan(color_1.colors.symbols.pointer) + ' ' + color_1.colors.bold(title));
                logger.info(color_1.colors.gray(`  ng update ${packageName} --migration-only --name ${migration.name}`));
                logger.info(''); // Extra trailing newline.
            }
            return undefined;
        }
        const answer = await (0, prompt_1.askChoices)(`Select the migrations that you'd like to run`, optionalMigrations.map((migration) => {
            const { title } = getMigrationTitleAndDescription(migration);
            return {
                name: title,
                value: migration.name,
            };
        }), null);
        logger.info(''); // Extra trailing newline.
        return optionalMigrations.filter(({ name }) => answer?.includes(name));
    }
}
exports.default = UpdateCommandModule;
/**
 * @return Whether or not the working directory has Git changes to commit.
 */
function hasChangesToCommit() {
    // List all modified files not covered by .gitignore.
    // If any files are returned, then there must be something to commit.
    return (0, child_process_1.execSync)('git ls-files -m -d -o --exclude-standard').toString() !== '';
}
/**
 * Precondition: Must have pending changes to commit, they do not need to be staged.
 * Postcondition: The Git working tree is committed and the repo is clean.
 * @param message The commit message to use.
 */
function createCommit(message) {
    // Stage entire working tree for commit.
    (0, child_process_1.execSync)('git add -A', { encoding: 'utf8', stdio: 'pipe' });
    // Commit with the message passed via stdin to avoid bash escaping issues.
    (0, child_process_1.execSync)('git commit --no-verify -F -', { encoding: 'utf8', stdio: 'pipe', input: message });
}
/**
 * @return The Git SHA hash of the HEAD commit. Returns null if unable to retrieve the hash.
 */
function findCurrentGitSha() {
    try {
        return (0, child_process_1.execSync)('git rev-parse HEAD', { encoding: 'utf8', stdio: 'pipe' }).trim();
    }
    catch {
        return null;
    }
}
function getShortHash(commitHash) {
    return commitHash.slice(0, 9);
}
function coerceVersionNumber(version) {
    if (!version) {
        return undefined;
    }
    if (!/^\d{1,30}\.\d{1,30}\.\d{1,30}/.test(version)) {
        const match = version.match(/^\d{1,30}(\.\d{1,30})*/);
        if (!match) {
            return undefined;
        }
        if (!match[1]) {
            version = version.substring(0, match[0].length) + '.0.0' + version.substring(match[0].length);
        }
        else if (!match[2]) {
            version = version.substring(0, match[0].length) + '.0' + version.substring(match[0].length);
        }
        else {
            return undefined;
        }
    }
    return semver.valid(version) ?? undefined;
}
function getMigrationTitleAndDescription(migration) {
    const [title, ...description] = migration.description.split('. ');
    return {
        title: title.endsWith('.') ? title : title + '.',
        description: description.join('.\n  '),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhci9jbGkvc3JjL2NvbW1hbmRzL3VwZGF0ZS9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDJEQUFpRztBQUNqRyw0REFJMEM7QUFDMUMsaURBQXNFO0FBQ3RFLDJCQUFnRDtBQUNoRCxtQ0FBdUM7QUFDdkMsc0VBQWtDO0FBQ2xDLDBFQUE2QztBQUM3QywyQ0FBNkI7QUFDN0IsK0JBQXFDO0FBQ3JDLCtDQUFpQztBQUVqQywyRUFBc0U7QUFDdEUseUVBSzhDO0FBQzlDLGlHQUE0RjtBQUM1RiwyRkFBeUY7QUFDekYsaURBQStDO0FBQy9DLDZFQUEwRTtBQUMxRSxpREFBc0Q7QUFDdEQsdURBQStEO0FBQy9ELHVFQUswQztBQUMxQywrREFLc0M7QUFDdEMsbURBQW9EO0FBQ3BELDZDQUE0QztBQUM1QyxxREFBa0Q7QUF5QmxELE1BQU0sdUJBQXVCLEdBQUcsNkJBQTZCLENBQUM7QUFDOUQsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBRXRGLE1BQXFCLG1CQUFvQixTQUFRLDhCQUFnQztJQUFqRjs7UUFDVyxVQUFLLEdBQUcsNkJBQVksQ0FBQyxFQUFFLENBQUM7UUFDZCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFFakQsWUFBTyxHQUFHLHFCQUFxQixDQUFDO1FBQ2hDLGFBQVEsR0FBRyw4RUFBOEUsQ0FBQztRQUMxRix3QkFBbUIsR0FBRyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQW9nQy9ELENBQUM7SUFsZ0NDLE9BQU8sQ0FBQyxVQUFnQjtRQUN0QixPQUFPLFVBQVU7YUFDZCxVQUFVLENBQUMsVUFBVSxFQUFFO1lB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QUMsRUFBRTtZQUNwQixPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3RjthQUFNO1lBQ0wsT0FBTyxTQUFTLENBQUM7U0FDbEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDNUMsQ0FBQztBQUVELFNBQVMsK0JBQStCLENBQUMsU0FBd0M7SUFJL0UsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxFLE9BQU87UUFDTCxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRztRQUNoRCxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgU2NoZW1hdGljRGVzY3JpcHRpb24sIFVuc3VjY2Vzc2Z1bFdvcmtmbG93RXhlY3V0aW9uIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjcmlwdGlvbixcbiAgRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2NyaXB0aW9uLFxuICBOb2RlV29ya2Zsb3csXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rvb2xzJztcbmltcG9ydCB7IFNwYXduU3luY1JldHVybnMsIGV4ZWNTeW5jLCBzcGF3blN5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ21vZHVsZSc7XG5pbXBvcnQgbnBhIGZyb20gJ25wbS1wYWNrYWdlLWFyZyc7XG5pbXBvcnQgcGlja01hbmlmZXN0IGZyb20gJ25wbS1waWNrLW1hbmlmZXN0JztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBqb2luLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJztcbmltcG9ydCB7IEFyZ3YgfSBmcm9tICd5YXJncyc7XG5pbXBvcnQgeyBQYWNrYWdlTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2xpYi9jb25maWcvd29ya3NwYWNlLXNjaGVtYSc7XG5pbXBvcnQge1xuICBDb21tYW5kTW9kdWxlLFxuICBDb21tYW5kTW9kdWxlRXJyb3IsXG4gIENvbW1hbmRTY29wZSxcbiAgT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vY29tbWFuZC1idWlsZGVyL2NvbW1hbmQtbW9kdWxlJztcbmltcG9ydCB7IFNjaGVtYXRpY0VuZ2luZUhvc3QgfSBmcm9tICcuLi8uLi9jb21tYW5kLWJ1aWxkZXIvdXRpbGl0aWVzL3NjaGVtYXRpYy1lbmdpbmUtaG9zdCc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1dvcmtmbG93IH0gZnJvbSAnLi4vLi4vY29tbWFuZC1idWlsZGVyL3V0aWxpdGllcy9zY2hlbWF0aWMtd29ya2Zsb3cnO1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL2NvbG9yJztcbmltcG9ydCB7IGRpc2FibGVWZXJzaW9uQ2hlY2sgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvZW52aXJvbm1lbnQtb3B0aW9ucyc7XG5pbXBvcnQgeyBhc3NlcnRJc0Vycm9yIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL2Vycm9yJztcbmltcG9ydCB7IHdyaXRlRXJyb3JUb0xvZ0ZpbGUgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvbG9nLWZpbGUnO1xuaW1wb3J0IHtcbiAgUGFja2FnZUlkZW50aWZpZXIsXG4gIFBhY2thZ2VNYW5pZmVzdCxcbiAgZmV0Y2hQYWNrYWdlTWFuaWZlc3QsXG4gIGZldGNoUGFja2FnZU1ldGFkYXRhLFxufSBmcm9tICcuLi8uLi91dGlsaXRpZXMvcGFja2FnZS1tZXRhZGF0YSc7XG5pbXBvcnQge1xuICBQYWNrYWdlVHJlZU5vZGUsXG4gIGZpbmRQYWNrYWdlSnNvbixcbiAgZ2V0UHJvamVjdERlcGVuZGVuY2llcyxcbiAgcmVhZFBhY2thZ2VKc29uLFxufSBmcm9tICcuLi8uLi91dGlsaXRpZXMvcGFja2FnZS10cmVlJztcbmltcG9ydCB7IGFza0Nob2ljZXMgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvcHJvbXB0JztcbmltcG9ydCB7IGlzVFRZIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3R0eSc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL3ZlcnNpb24nO1xuXG5pbnRlcmZhY2UgVXBkYXRlQ29tbWFuZEFyZ3Mge1xuICBwYWNrYWdlcz86IHN0cmluZ1tdO1xuICBmb3JjZTogYm9vbGVhbjtcbiAgbmV4dDogYm9vbGVhbjtcbiAgJ21pZ3JhdGUtb25seSc/OiBib29sZWFuO1xuICBuYW1lPzogc3RyaW5nO1xuICBmcm9tPzogc3RyaW5nO1xuICB0bz86IHN0cmluZztcbiAgJ2FsbG93LWRpcnR5JzogYm9vbGVhbjtcbiAgdmVyYm9zZTogYm9vbGVhbjtcbiAgJ2NyZWF0ZS1jb21taXRzJzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIE1pZ3JhdGlvblNjaGVtYXRpY0Rlc2NyaXB0aW9uXG4gIGV4dGVuZHMgU2NoZW1hdGljRGVzY3JpcHRpb248RmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjcmlwdGlvbiwgRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2NyaXB0aW9uPiB7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG4gIG9wdGlvbmFsPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIE1pZ3JhdGlvblNjaGVtYXRpY0Rlc2NyaXB0aW9uV2l0aFZlcnNpb24gZXh0ZW5kcyBNaWdyYXRpb25TY2hlbWF0aWNEZXNjcmlwdGlvbiB7XG4gIHZlcnNpb246IHN0cmluZztcbn1cblxuY29uc3QgQU5HVUxBUl9QQUNLQUdFU19SRUdFWFAgPSAvXkAoPzphbmd1bGFyfG5ndW5pdmVyc2FsKVxcLy87XG5jb25zdCBVUERBVEVfU0NIRU1BVElDX0NPTExFQ1RJT04gPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnc2NoZW1hdGljL2NvbGxlY3Rpb24uanNvbicpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVDb21tYW5kTW9kdWxlIGV4dGVuZHMgQ29tbWFuZE1vZHVsZTxVcGRhdGVDb21tYW5kQXJncz4ge1xuICBvdmVycmlkZSBzY29wZSA9IENvbW1hbmRTY29wZS5JbjtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHNob3VsZFJlcG9ydEFuYWx5dGljcyA9IGZhbHNlO1xuXG4gIGNvbW1hbmQgPSAndXBkYXRlIFtwYWNrYWdlcy4uXSc7XG4gIGRlc2NyaWJlID0gJ1VwZGF0ZXMgeW91ciB3b3Jrc3BhY2UgYW5kIGl0cyBkZXBlbmRlbmNpZXMuIFNlZSBodHRwczovL3VwZGF0ZS5hbmd1bGFyLmlvLy4nO1xuICBsb25nRGVzY3JpcHRpb25QYXRoID0gam9pbihfX2Rpcm5hbWUsICdsb25nLWRlc2NyaXB0aW9uLm1kJyk7XG5cbiAgYnVpbGRlcihsb2NhbFlhcmdzOiBBcmd2KTogQXJndjxVcGRhdGVDb21tYW5kQXJncz4ge1xuICAgIHJldHVybiBsb2NhbFlhcmdzXG4gICAgICAucG9zaXRpb25hbCgncGFja2FnZXMnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG5hbWVzIG9mIHBhY2thZ2UocykgdG8gdXBkYXRlLicsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBhcnJheTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCdmb3JjZScsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdJZ25vcmUgcGVlciBkZXBlbmRlbmN5IHZlcnNpb24gbWlzbWF0Y2hlcy4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgIC5vcHRpb24oJ25leHQnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVXNlIHRoZSBwcmVyZWxlYXNlIHZlcnNpb24sIGluY2x1ZGluZyBiZXRhIGFuZCBSQ3MuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCdtaWdyYXRlLW9ubHknLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnT25seSBwZXJmb3JtIGEgbWlncmF0aW9uLCBkbyBub3QgdXBkYXRlIHRoZSBpbnN0YWxsZWQgdmVyc2lvbi4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICB9KVxuICAgICAgLm9wdGlvbignbmFtZScsIHtcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ1RoZSBuYW1lIG9mIHRoZSBtaWdyYXRpb24gdG8gcnVuLiAnICtcbiAgICAgICAgICBgT25seSBhdmFpbGFibGUgd2l0aCBhIHNpbmdsZSBwYWNrYWdlIGJlaW5nIHVwZGF0ZWQsIGFuZCBvbmx5IHdpdGggJ21pZ3JhdGUtb25seScgb3B0aW9uLmAsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBpbXBsaWVzOiBbJ21pZ3JhdGUtb25seSddLFxuICAgICAgICBjb25mbGljdHM6IFsndG8nLCAnZnJvbSddLFxuICAgICAgfSlcbiAgICAgIC5vcHRpb24oJ2Zyb20nLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdWZXJzaW9uIGZyb20gd2hpY2ggdG8gbWlncmF0ZSBmcm9tLiAnICtcbiAgICAgICAgICBgT25seSBhdmFpbGFibGUgd2l0aCBhIHNpbmdsZSBwYWNrYWdlIGJlaW5nIHVwZGF0ZWQsIGFuZCBvbmx5IHdpdGggJ21pZ3JhdGUtb25seScuYCxcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGltcGxpZXM6IFsnbWlncmF0ZS1vbmx5J10sXG4gICAgICAgIGNvbmZsaWN0czogWyduYW1lJ10sXG4gICAgICB9KVxuICAgICAgLm9wdGlvbigndG8nLCB7XG4gICAgICAgIGRlc2NyaWJlOlxuICAgICAgICAgICdWZXJzaW9uIHVwIHRvIHdoaWNoIHRvIGFwcGx5IG1pZ3JhdGlvbnMuIE9ubHkgYXZhaWxhYmxlIHdpdGggYSBzaW5nbGUgcGFja2FnZSBiZWluZyB1cGRhdGVkLCAnICtcbiAgICAgICAgICBgYW5kIG9ubHkgd2l0aCAnbWlncmF0ZS1vbmx5JyBvcHRpb24uIFJlcXVpcmVzICdmcm9tJyB0byBiZSBzcGVjaWZpZWQuIERlZmF1bHQgdG8gdGhlIGluc3RhbGxlZCB2ZXJzaW9uIGRldGVjdGVkLmAsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBpbXBsaWVzOiBbJ2Zyb20nLCAnbWlncmF0ZS1vbmx5J10sXG4gICAgICAgIGNvbmZsaWN0czogWyduYW1lJ10sXG4gICAgICB9KVxuICAgICAgLm9wdGlvbignYWxsb3ctZGlydHknLCB7XG4gICAgICAgIGRlc2NyaWJlOlxuICAgICAgICAgICdXaGV0aGVyIHRvIGFsbG93IHVwZGF0aW5nIHdoZW4gdGhlIHJlcG9zaXRvcnkgY29udGFpbnMgbW9kaWZpZWQgb3IgdW50cmFja2VkIGZpbGVzLicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB9KVxuICAgICAgLm9wdGlvbigndmVyYm9zZScsIHtcbiAgICAgICAgZGVzY3JpYmU6ICdEaXNwbGF5IGFkZGl0aW9uYWwgZGV0YWlscyBhYm91dCBpbnRlcm5hbCBvcGVyYXRpb25zIGR1cmluZyBleGVjdXRpb24uJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCdjcmVhdGUtY29tbWl0cycsIHtcbiAgICAgICAgZGVzY3JpYmU6ICdDcmVhdGUgc291cmNlIGNvbnRyb2wgY29tbWl0cyBmb3IgdXBkYXRlcyBhbmQgbWlncmF0aW9ucy4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGFsaWFzOiBbJ0MnXSxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB9KVxuICAgICAgLmNoZWNrKCh7IHBhY2thZ2VzLCAnYWxsb3ctZGlydHknOiBhbGxvd0RpcnR5LCAnbWlncmF0ZS1vbmx5JzogbWlncmF0ZU9ubHkgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIGVhc2lseSByZXNldCBhbnkgY2hhbmdlcyBmcm9tIHRoZSB1cGRhdGUuXG4gICAgICAgIGlmIChwYWNrYWdlcz8ubGVuZ3RoICYmICF0aGlzLmNoZWNrQ2xlYW5HaXQoKSkge1xuICAgICAgICAgIGlmIChhbGxvd0RpcnR5KSB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICAgICAgJ1JlcG9zaXRvcnkgaXMgbm90IGNsZWFuLiBVcGRhdGUgY2hhbmdlcyB3aWxsIGJlIG1peGVkIHdpdGggcHJlLWV4aXN0aW5nIGNoYW5nZXMuJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBDb21tYW5kTW9kdWxlRXJyb3IoXG4gICAgICAgICAgICAgICdSZXBvc2l0b3J5IGlzIG5vdCBjbGVhbi4gUGxlYXNlIGNvbW1pdCBvciBzdGFzaCBhbnkgY2hhbmdlcyBiZWZvcmUgdXBkYXRpbmcuJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pZ3JhdGVPbmx5KSB7XG4gICAgICAgICAgaWYgKHBhY2thZ2VzPy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBDb21tYW5kTW9kdWxlRXJyb3IoXG4gICAgICAgICAgICAgIGBBIHNpbmdsZSBwYWNrYWdlIG11c3QgYmUgc3BlY2lmaWVkIHdoZW4gdXNpbmcgdGhlICdtaWdyYXRlLW9ubHknIG9wdGlvbi5gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuc3RyaWN0KCk7XG4gIH1cblxuICBhc3luYyBydW4ob3B0aW9uczogT3B0aW9uczxVcGRhdGVDb21tYW5kQXJncz4pOiBQcm9taXNlPG51bWJlciB8IHZvaWQ+IHtcbiAgICBjb25zdCB7IGxvZ2dlciwgcGFja2FnZU1hbmFnZXIgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIHBhY2thZ2VNYW5hZ2VyLmVuc3VyZUNvbXBhdGliaWxpdHkoKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBjdXJyZW50IGluc3RhbGxlZCBDTEkgdmVyc2lvbiBpcyBvbGRlciB0aGFuIHRoZSBsYXRlc3QgY29tcGF0aWJsZSB2ZXJzaW9uLlxuICAgIC8vIFNraXAgd2hlbiBydW5uaW5nIGBuZyB1cGRhdGVgIHdpdGhvdXQgYSBwYWNrYWdlIG5hbWUgYXMgdGhpcyB3aWxsIG5vdCB0cmlnZ2VyIGFuIGFjdHVhbCB1cGRhdGUuXG4gICAgaWYgKCFkaXNhYmxlVmVyc2lvbkNoZWNrICYmIG9wdGlvbnMucGFja2FnZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3QgY2xpVmVyc2lvblRvSW5zdGFsbCA9IGF3YWl0IHRoaXMuY2hlY2tDTElWZXJzaW9uKFxuICAgICAgICBvcHRpb25zLnBhY2thZ2VzLFxuICAgICAgICBvcHRpb25zLnZlcmJvc2UsXG4gICAgICAgIG9wdGlvbnMubmV4dCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChjbGlWZXJzaW9uVG9JbnN0YWxsKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgICdUaGUgaW5zdGFsbGVkIEFuZ3VsYXIgQ0xJIHZlcnNpb24gaXMgb3V0ZGF0ZWQuXFxuJyArXG4gICAgICAgICAgICBgSW5zdGFsbGluZyBhIHRlbXBvcmFyeSBBbmd1bGFyIENMSSB2ZXJzaW9uZWQgJHtjbGlWZXJzaW9uVG9JbnN0YWxsfSB0byBwZXJmb3JtIHRoZSB1cGRhdGUuYCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5ydW5UZW1wQmluYXJ5KGBAYW5ndWxhci9jbGlAJHtjbGlWZXJzaW9uVG9JbnN0YWxsfWAsIHByb2Nlc3MuYXJndi5zbGljZSgyKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGFja2FnZXM6IFBhY2thZ2VJZGVudGlmaWVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJlcXVlc3Qgb2Ygb3B0aW9ucy5wYWNrYWdlcyA/PyBbXSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFja2FnZUlkZW50aWZpZXIgPSBucGEocmVxdWVzdCk7XG5cbiAgICAgICAgLy8gb25seSByZWdpc3RyeSBpZGVudGlmaWVycyBhcmUgc3VwcG9ydGVkXG4gICAgICAgIGlmICghcGFja2FnZUlkZW50aWZpZXIucmVnaXN0cnkpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoYFBhY2thZ2UgJyR7cmVxdWVzdH0nIGlzIG5vdCBhIHJlZ2lzdHJ5IHBhY2thZ2UgaWRlbnRpZmVyLmApO1xuXG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFja2FnZXMuc29tZSgodikgPT4gdi5uYW1lID09PSBwYWNrYWdlSWRlbnRpZmllci5uYW1lKSkge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihgRHVwbGljYXRlIHBhY2thZ2UgJyR7cGFja2FnZUlkZW50aWZpZXIubmFtZX0nIHNwZWNpZmllZC5gKTtcblxuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubWlncmF0ZU9ubHkgJiYgcGFja2FnZUlkZW50aWZpZXIucmF3U3BlYyAhPT0gJyonKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oJ1BhY2thZ2Ugc3BlY2lmaWVyIGhhcyBubyBlZmZlY3Qgd2hlbiB1c2luZyBcIm1pZ3JhdGUtb25seVwiIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG5leHQgb3B0aW9uIGlzIHVzZWQgYW5kIG5vIHNwZWNpZmllciBzdXBwbGllZCwgdXNlIG5leHQgdGFnXG4gICAgICAgIGlmIChvcHRpb25zLm5leHQgJiYgcGFja2FnZUlkZW50aWZpZXIucmF3U3BlYyA9PT0gJyonKSB7XG4gICAgICAgICAgcGFja2FnZUlkZW50aWZpZXIuZmV0Y2hTcGVjID0gJ25leHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFja2FnZXMucHVzaChwYWNrYWdlSWRlbnRpZmllciBhcyBQYWNrYWdlSWRlbnRpZmllcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGFzc2VydElzRXJyb3IoZSk7XG4gICAgICAgIGxvZ2dlci5lcnJvcihlLm1lc3NhZ2UpO1xuXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKGBVc2luZyBwYWNrYWdlIG1hbmFnZXI6ICR7Y29sb3JzLmdyZXkocGFja2FnZU1hbmFnZXIubmFtZSl9YCk7XG4gICAgbG9nZ2VyLmluZm8oJ0NvbGxlY3RpbmcgaW5zdGFsbGVkIGRlcGVuZGVuY2llcy4uLicpO1xuXG4gICAgY29uc3Qgcm9vdERlcGVuZGVuY2llcyA9IGF3YWl0IGdldFByb2plY3REZXBlbmRlbmNpZXModGhpcy5jb250ZXh0LnJvb3QpO1xuICAgIGxvZ2dlci5pbmZvKGBGb3VuZCAke3Jvb3REZXBlbmRlbmNpZXMuc2l6ZX0gZGVwZW5kZW5jaWVzLmApO1xuXG4gICAgY29uc3Qgd29ya2Zsb3cgPSBuZXcgTm9kZVdvcmtmbG93KHRoaXMuY29udGV4dC5yb290LCB7XG4gICAgICBwYWNrYWdlTWFuYWdlcjogcGFja2FnZU1hbmFnZXIubmFtZSxcbiAgICAgIHBhY2thZ2VNYW5hZ2VyRm9yY2U6IHRoaXMucGFja2FnZU1hbmFnZXJGb3JjZShvcHRpb25zLnZlcmJvc2UpLFxuICAgICAgLy8gX19kaXJuYW1lIC0+IGZhdm9yIEBzY2hlbWF0aWNzL3VwZGF0ZSBmcm9tIHRoaXMgcGFja2FnZVxuICAgICAgLy8gT3RoZXJ3aXNlLCB1c2UgcGFja2FnZXMgZnJvbSB0aGUgYWN0aXZlIHdvcmtzcGFjZSAobWlncmF0aW9ucylcbiAgICAgIHJlc29sdmVQYXRoczogW19fZGlybmFtZSwgdGhpcy5jb250ZXh0LnJvb3RdLFxuICAgICAgc2NoZW1hVmFsaWRhdGlvbjogdHJ1ZSxcbiAgICAgIGVuZ2luZUhvc3RDcmVhdG9yOiAob3B0aW9ucykgPT4gbmV3IFNjaGVtYXRpY0VuZ2luZUhvc3Qob3B0aW9ucy5yZXNvbHZlUGF0aHMpLFxuICAgIH0pO1xuXG4gICAgaWYgKHBhY2thZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gU2hvdyBzdGF0dXNcbiAgICAgIGNvbnN0IHsgc3VjY2VzcyB9ID0gYXdhaXQgdGhpcy5leGVjdXRlU2NoZW1hdGljKFxuICAgICAgICB3b3JrZmxvdyxcbiAgICAgICAgVVBEQVRFX1NDSEVNQVRJQ19DT0xMRUNUSU9OLFxuICAgICAgICAndXBkYXRlJyxcbiAgICAgICAge1xuICAgICAgICAgIGZvcmNlOiBvcHRpb25zLmZvcmNlLFxuICAgICAgICAgIG5leHQ6IG9wdGlvbnMubmV4dCxcbiAgICAgICAgICB2ZXJib3NlOiBvcHRpb25zLnZlcmJvc2UsXG4gICAgICAgICAgcGFja2FnZU1hbmFnZXI6IHBhY2thZ2VNYW5hZ2VyLm5hbWUsXG4gICAgICAgICAgcGFja2FnZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHN1Y2Nlc3MgPyAwIDogMTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucy5taWdyYXRlT25seVxuICAgICAgPyB0aGlzLm1pZ3JhdGVPbmx5KHdvcmtmbG93LCAob3B0aW9ucy5wYWNrYWdlcyA/PyBbXSlbMF0sIHJvb3REZXBlbmRlbmNpZXMsIG9wdGlvbnMpXG4gICAgICA6IHRoaXMudXBkYXRlUGFja2FnZXNBbmRNaWdyYXRlKHdvcmtmbG93LCByb290RGVwZW5kZW5jaWVzLCBvcHRpb25zLCBwYWNrYWdlcyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVTY2hlbWF0aWMoXG4gICAgd29ya2Zsb3c6IE5vZGVXb3JrZmxvdyxcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgc2NoZW1hdGljOiBzdHJpbmcsXG4gICAgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSxcbiAgKTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGZpbGVzOiBTZXQ8c3RyaW5nPiB9PiB7XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCB3b3JrZmxvd1N1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvV29ya2Zsb3cod29ya2Zsb3csIGxvZ2dlcik7XG5cbiAgICAvLyBUT0RPOiBBbGxvdyBwYXNzaW5nIGEgc2NoZW1hdGljIGluc3RhbmNlIGRpcmVjdGx5XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdvcmtmbG93XG4gICAgICAgIC5leGVjdXRlKHtcbiAgICAgICAgICBjb2xsZWN0aW9uLFxuICAgICAgICAgIHNjaGVtYXRpYyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIGxvZ2dlcixcbiAgICAgICAgfSlcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xuXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiAhd29ya2Zsb3dTdWJzY3JpcHRpb24uZXJyb3IsIGZpbGVzOiB3b3JrZmxvd1N1YnNjcmlwdGlvbi5maWxlcyB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgVW5zdWNjZXNzZnVsV29ya2Zsb3dFeGVjdXRpb24pIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGAke2NvbG9ycy5zeW1ib2xzLmNyb3NzfSBNaWdyYXRpb24gZmFpbGVkLiBTZWUgYWJvdmUgZm9yIGZ1cnRoZXIgZGV0YWlscy5cXG5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2VydElzRXJyb3IoZSk7XG4gICAgICAgIGNvbnN0IGxvZ1BhdGggPSB3cml0ZUVycm9yVG9Mb2dGaWxlKGUpO1xuICAgICAgICBsb2dnZXIuZmF0YWwoXG4gICAgICAgICAgYCR7Y29sb3JzLnN5bWJvbHMuY3Jvc3N9IE1pZ3JhdGlvbiBmYWlsZWQ6ICR7ZS5tZXNzYWdlfVxcbmAgK1xuICAgICAgICAgICAgYCAgU2VlIFwiJHtsb2dQYXRofVwiIGZvciBmdXJ0aGVyIGRldGFpbHMuXFxuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGZpbGVzOiB3b3JrZmxvd1N1YnNjcmlwdGlvbi5maWxlcyB9O1xuICAgIH0gZmluYWxseSB7XG4gICAgICB3b3JrZmxvd1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHRoZSBtaWdyYXRpb24gd2FzIHBlcmZvcm1lZCBzdWNjZXNzZnVsbHkuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVNaWdyYXRpb24oXG4gICAgd29ya2Zsb3c6IE5vZGVXb3JrZmxvdyxcbiAgICBwYWNrYWdlTmFtZTogc3RyaW5nLFxuICAgIGNvbGxlY3Rpb25QYXRoOiBzdHJpbmcsXG4gICAgbWlncmF0aW9uTmFtZTogc3RyaW5nLFxuICAgIGNvbW1pdD86IGJvb2xlYW4sXG4gICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gd29ya2Zsb3cuZW5naW5lLmNyZWF0ZUNvbGxlY3Rpb24oY29sbGVjdGlvblBhdGgpO1xuICAgIGNvbnN0IG5hbWUgPSBjb2xsZWN0aW9uLmxpc3RTY2hlbWF0aWNOYW1lcygpLmZpbmQoKG5hbWUpID0+IG5hbWUgPT09IG1pZ3JhdGlvbk5hbWUpO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgbG9nZ2VyLmVycm9yKGBDYW5ub3QgZmluZCBtaWdyYXRpb24gJyR7bWlncmF0aW9uTmFtZX0nIGluICcke3BhY2thZ2VOYW1lfScuYCk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKGNvbG9ycy5jeWFuKGAqKiBFeGVjdXRpbmcgJyR7bWlncmF0aW9uTmFtZX0nIG9mIHBhY2thZ2UgJyR7cGFja2FnZU5hbWV9JyAqKlxcbmApKTtcbiAgICBjb25zdCBzY2hlbWF0aWMgPSB3b3JrZmxvdy5lbmdpbmUuY3JlYXRlU2NoZW1hdGljKG5hbWUsIGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZVBhY2thZ2VNaWdyYXRpb25zKHdvcmtmbG93LCBbc2NoZW1hdGljLmRlc2NyaXB0aW9uXSwgcGFja2FnZU5hbWUsIGNvbW1pdCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgbWlncmF0aW9ucyB3ZXJlIHBlcmZvcm1lZCBzdWNjZXNzZnVsbHkuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVNaWdyYXRpb25zKFxuICAgIHdvcmtmbG93OiBOb2RlV29ya2Zsb3csXG4gICAgcGFja2FnZU5hbWU6IHN0cmluZyxcbiAgICBjb2xsZWN0aW9uUGF0aDogc3RyaW5nLFxuICAgIGZyb206IHN0cmluZyxcbiAgICB0bzogc3RyaW5nLFxuICAgIGNvbW1pdD86IGJvb2xlYW4sXG4gICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHdvcmtmbG93LmVuZ2luZS5jcmVhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb25QYXRoKTtcbiAgICBjb25zdCBtaWdyYXRpb25SYW5nZSA9IG5ldyBzZW12ZXIuUmFuZ2UoXG4gICAgICAnPicgKyAoc2VtdmVyLnByZXJlbGVhc2UoZnJvbSkgPyBmcm9tLnNwbGl0KCctJylbMF0gKyAnLTAnIDogZnJvbSkgKyAnIDw9JyArIHRvLnNwbGl0KCctJylbMF0sXG4gICAgKTtcblxuICAgIGNvbnN0IHJlcXVpcmVkTWlncmF0aW9uczogTWlncmF0aW9uU2NoZW1hdGljRGVzY3JpcHRpb25XaXRoVmVyc2lvbltdID0gW107XG4gICAgY29uc3Qgb3B0aW9uYWxNaWdyYXRpb25zOiBNaWdyYXRpb25TY2hlbWF0aWNEZXNjcmlwdGlvbldpdGhWZXJzaW9uW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBjb2xsZWN0aW9uLmxpc3RTY2hlbWF0aWNOYW1lcygpKSB7XG4gICAgICBjb25zdCBzY2hlbWF0aWMgPSB3b3JrZmxvdy5lbmdpbmUuY3JlYXRlU2NoZW1hdGljKG5hbWUsIGNvbGxlY3Rpb24pO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzY2hlbWF0aWMuZGVzY3JpcHRpb24gYXMgTWlncmF0aW9uU2NoZW1hdGljRGVzY3JpcHRpb247XG5cbiAgICAgIGRlc2NyaXB0aW9uLnZlcnNpb24gPSBjb2VyY2VWZXJzaW9uTnVtYmVyKGRlc2NyaXB0aW9uLnZlcnNpb24pO1xuICAgICAgaWYgKCFkZXNjcmlwdGlvbi52ZXJzaW9uKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VtdmVyLnNhdGlzZmllcyhkZXNjcmlwdGlvbi52ZXJzaW9uLCBtaWdyYXRpb25SYW5nZSwgeyBpbmNsdWRlUHJlcmVsZWFzZTogdHJ1ZSB9KSkge1xuICAgICAgICAoZGVzY3JpcHRpb24ub3B0aW9uYWwgPyBvcHRpb25hbE1pZ3JhdGlvbnMgOiByZXF1aXJlZE1pZ3JhdGlvbnMpLnB1c2goXG4gICAgICAgICAgZGVzY3JpcHRpb24gYXMgTWlncmF0aW9uU2NoZW1hdGljRGVzY3JpcHRpb25XaXRoVmVyc2lvbixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZWRNaWdyYXRpb25zLmxlbmd0aCA9PT0gMCAmJiBvcHRpb25hbE1pZ3JhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBSZXF1aXJlZCBtaWdyYXRpb25zXG4gICAgaWYgKHJlcXVpcmVkTWlncmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udGV4dC5sb2dnZXIuaW5mbyhcbiAgICAgICAgY29sb3JzLmN5YW4oYCoqIEV4ZWN1dGluZyBtaWdyYXRpb25zIG9mIHBhY2thZ2UgJyR7cGFja2FnZU5hbWV9JyAqKlxcbmApLFxuICAgICAgKTtcblxuICAgICAgcmVxdWlyZWRNaWdyYXRpb25zLnNvcnQoXG4gICAgICAgIChhLCBiKSA9PiBzZW12ZXIuY29tcGFyZShhLnZlcnNpb24sIGIudmVyc2lvbikgfHwgYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZXhlY3V0ZVBhY2thZ2VNaWdyYXRpb25zKFxuICAgICAgICB3b3JrZmxvdyxcbiAgICAgICAgcmVxdWlyZWRNaWdyYXRpb25zLFxuICAgICAgICBwYWNrYWdlTmFtZSxcbiAgICAgICAgY29tbWl0LFxuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPcHRpb25hbCBtaWdyYXRpb25zXG4gICAgaWYgKG9wdGlvbmFsTWlncmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udGV4dC5sb2dnZXIuaW5mbyhcbiAgICAgICAgY29sb3JzLm1hZ2VudGEoYCoqIE9wdGlvbmFsIG1pZ3JhdGlvbnMgb2YgcGFja2FnZSAnJHtwYWNrYWdlTmFtZX0nICoqXFxuYCksXG4gICAgICApO1xuXG4gICAgICBvcHRpb25hbE1pZ3JhdGlvbnMuc29ydChcbiAgICAgICAgKGEsIGIpID0+IHNlbXZlci5jb21wYXJlKGEudmVyc2lvbiwgYi52ZXJzaW9uKSB8fCBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWlncmF0aW9uc1RvUnVuID0gYXdhaXQgdGhpcy5nZXRPcHRpb25hbE1pZ3JhdGlvbnNUb1J1bihcbiAgICAgICAgb3B0aW9uYWxNaWdyYXRpb25zLFxuICAgICAgICBwYWNrYWdlTmFtZSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChtaWdyYXRpb25zVG9SdW4/Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlUGFja2FnZU1pZ3JhdGlvbnMod29ya2Zsb3csIG1pZ3JhdGlvbnNUb1J1biwgcGFja2FnZU5hbWUsIGNvbW1pdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVQYWNrYWdlTWlncmF0aW9ucyhcbiAgICB3b3JrZmxvdzogTm9kZVdvcmtmbG93LFxuICAgIG1pZ3JhdGlvbnM6IE1pZ3JhdGlvblNjaGVtYXRpY0Rlc2NyaXB0aW9uW10sXG4gICAgcGFja2FnZU5hbWU6IHN0cmluZyxcbiAgICBjb21taXQgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTwxIHwgMD4ge1xuICAgIGNvbnN0IHsgbG9nZ2VyIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgZm9yIChjb25zdCBtaWdyYXRpb24gb2YgbWlncmF0aW9ucykge1xuICAgICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24gfSA9IGdldE1pZ3JhdGlvblRpdGxlQW5kRGVzY3JpcHRpb24obWlncmF0aW9uKTtcblxuICAgICAgbG9nZ2VyLmluZm8oY29sb3JzLmN5YW4oY29sb3JzLnN5bWJvbHMucG9pbnRlcikgKyAnICcgKyBjb2xvcnMuYm9sZCh0aXRsZSkpO1xuXG4gICAgICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJyAgJyArIGRlc2NyaXB0aW9uKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzdWNjZXNzLCBmaWxlcyB9ID0gYXdhaXQgdGhpcy5leGVjdXRlU2NoZW1hdGljKFxuICAgICAgICB3b3JrZmxvdyxcbiAgICAgICAgbWlncmF0aW9uLmNvbGxlY3Rpb24ubmFtZSxcbiAgICAgICAgbWlncmF0aW9uLm5hbWUsXG4gICAgICApO1xuICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICBsZXQgbW9kaWZpZWRGaWxlc1RleHQ6IHN0cmluZztcbiAgICAgIHN3aXRjaCAoZmlsZXMuc2l6ZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbW9kaWZpZWRGaWxlc1RleHQgPSAnTm8gY2hhbmdlcyBtYWRlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIG1vZGlmaWVkRmlsZXNUZXh0ID0gJzEgZmlsZSBtb2RpZmllZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbW9kaWZpZWRGaWxlc1RleHQgPSBgJHtmaWxlcy5zaXplfSBmaWxlcyBtb2RpZmllZGA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxvZ2dlci5pbmZvKGAgIE1pZ3JhdGlvbiBjb21wbGV0ZWQgKCR7bW9kaWZpZWRGaWxlc1RleHR9KS5gKTtcblxuICAgICAgLy8gQ29tbWl0IG1pZ3JhdGlvblxuICAgICAgaWYgKGNvbW1pdCkge1xuICAgICAgICBjb25zdCBjb21taXRQcmVmaXggPSBgJHtwYWNrYWdlTmFtZX0gbWlncmF0aW9uIC0gJHttaWdyYXRpb24ubmFtZX1gO1xuICAgICAgICBjb25zdCBjb21taXRNZXNzYWdlID0gbWlncmF0aW9uLmRlc2NyaXB0aW9uXG4gICAgICAgICAgPyBgJHtjb21taXRQcmVmaXh9XFxuXFxuJHttaWdyYXRpb24uZGVzY3JpcHRpb259YFxuICAgICAgICAgIDogY29tbWl0UHJlZml4O1xuICAgICAgICBjb25zdCBjb21taXR0ZWQgPSB0aGlzLmNvbW1pdChjb21taXRNZXNzYWdlKTtcbiAgICAgICAgaWYgKCFjb21taXR0ZWQpIHtcbiAgICAgICAgICAvLyBGYWlsZWQgdG8gY29tbWl0LCBzb21ldGhpbmcgd2VudCB3cm9uZy4gQWJvcnQgdGhlIHVwZGF0ZS5cbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsb2dnZXIuaW5mbygnJyk7IC8vIEV4dHJhIHRyYWlsaW5nIG5ld2xpbmUuXG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG1pZ3JhdGVPbmx5KFxuICAgIHdvcmtmbG93OiBOb2RlV29ya2Zsb3csXG4gICAgcGFja2FnZU5hbWU6IHN0cmluZyxcbiAgICByb290RGVwZW5kZW5jaWVzOiBNYXA8c3RyaW5nLCBQYWNrYWdlVHJlZU5vZGU+LFxuICAgIG9wdGlvbnM6IE9wdGlvbnM8VXBkYXRlQ29tbWFuZEFyZ3M+LFxuICApOiBQcm9taXNlPG51bWJlciB8IHZvaWQ+IHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5jb250ZXh0O1xuICAgIGNvbnN0IHBhY2thZ2VEZXBlbmRlbmN5ID0gcm9vdERlcGVuZGVuY2llcy5nZXQocGFja2FnZU5hbWUpO1xuICAgIGxldCBwYWNrYWdlUGF0aCA9IHBhY2thZ2VEZXBlbmRlbmN5Py5wYXRoO1xuICAgIGxldCBwYWNrYWdlTm9kZSA9IHBhY2thZ2VEZXBlbmRlbmN5Py5wYWNrYWdlO1xuICAgIGlmIChwYWNrYWdlRGVwZW5kZW5jeSAmJiAhcGFja2FnZU5vZGUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignUGFja2FnZSBmb3VuZCBpbiBwYWNrYWdlLmpzb24gYnV0IGlzIG5vdCBpbnN0YWxsZWQuJyk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoIXBhY2thZ2VEZXBlbmRlbmN5KSB7XG4gICAgICAvLyBBbGxvdyBydW5uaW5nIG1pZ3JhdGlvbnMgb24gdHJhbnNpdGl2ZWx5IGluc3RhbGxlZCBkZXBlbmRlbmNpZXNcbiAgICAgIC8vIFRoZXJlIGNhbiB0ZWNobmljYWxseSBiZSBuZXN0ZWQgbXVsdGlwbGUgdmVyc2lvbnNcbiAgICAgIC8vIFRPRE86IElmIG11bHRpcGxlLCB0aGlzIHNob3VsZCBmaW5kIGFsbCB2ZXJzaW9ucyBhbmQgYXNrIHdoaWNoIG9uZSB0byB1c2VcbiAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gZmluZFBhY2thZ2VKc29uKHRoaXMuY29udGV4dC5yb290LCBwYWNrYWdlTmFtZSk7XG4gICAgICBpZiAocGFja2FnZUpzb24pIHtcbiAgICAgICAgcGFja2FnZVBhdGggPSBwYXRoLmRpcm5hbWUocGFja2FnZUpzb24pO1xuICAgICAgICBwYWNrYWdlTm9kZSA9IGF3YWl0IHJlYWRQYWNrYWdlSnNvbihwYWNrYWdlSnNvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYWNrYWdlTm9kZSB8fCAhcGFja2FnZVBhdGgpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignUGFja2FnZSBpcyBub3QgaW5zdGFsbGVkLicpO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVNZXRhZGF0YSA9IHBhY2thZ2VOb2RlWyduZy11cGRhdGUnXTtcbiAgICBsZXQgbWlncmF0aW9ucyA9IHVwZGF0ZU1ldGFkYXRhPy5taWdyYXRpb25zO1xuICAgIGlmIChtaWdyYXRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignUGFja2FnZSBkb2VzIG5vdCBwcm92aWRlIG1pZ3JhdGlvbnMuJyk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pZ3JhdGlvbnMgIT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ1BhY2thZ2UgY29udGFpbnMgYSBtYWxmb3JtZWQgbWlncmF0aW9ucyBmaWVsZC4nKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChwYXRoLnBvc2l4LmlzQWJzb2x1dGUobWlncmF0aW9ucykgfHwgcGF0aC53aW4zMi5pc0Fic29sdXRlKG1pZ3JhdGlvbnMpKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICdQYWNrYWdlIGNvbnRhaW5zIGFuIGludmFsaWQgbWlncmF0aW9ucyBmaWVsZC4gQWJzb2x1dGUgcGF0aHMgYXJlIG5vdCBwZXJtaXR0ZWQuJyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBzbGFzaGVzXG4gICAgbWlncmF0aW9ucyA9IG1pZ3JhdGlvbnMucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gICAgaWYgKG1pZ3JhdGlvbnMuc3RhcnRzV2l0aCgnLi4vJykpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgJ1BhY2thZ2UgY29udGFpbnMgYW4gaW52YWxpZCBtaWdyYXRpb25zIGZpZWxkLiBQYXRocyBvdXRzaWRlIHRoZSBwYWNrYWdlIHJvb3QgYXJlIG5vdCBwZXJtaXR0ZWQuJyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgcGFja2FnZS1sb2NhbCBsb2NhdGlvblxuICAgIGNvbnN0IGxvY2FsTWlncmF0aW9ucyA9IHBhdGguam9pbihwYWNrYWdlUGF0aCwgbWlncmF0aW9ucyk7XG4gICAgaWYgKGV4aXN0c1N5bmMobG9jYWxNaWdyYXRpb25zKSkge1xuICAgICAgbWlncmF0aW9ucyA9IGxvY2FsTWlncmF0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJ5IHRvIHJlc29sdmUgZnJvbSBwYWNrYWdlIGxvY2F0aW9uLlxuICAgICAgLy8gVGhpcyBhdm9pZHMgaXNzdWVzIHdpdGggcGFja2FnZSBob2lzdGluZy5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhY2thZ2VSZXF1aXJlID0gY3JlYXRlUmVxdWlyZShwYWNrYWdlUGF0aCArICcvJyk7XG4gICAgICAgIG1pZ3JhdGlvbnMgPSBwYWNrYWdlUmVxdWlyZS5yZXNvbHZlKG1pZ3JhdGlvbnMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhc3NlcnRJc0Vycm9yKGUpO1xuICAgICAgICBpZiAoZS5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ01pZ3JhdGlvbnMgZm9yIHBhY2thZ2Ugd2VyZSBub3QgZm91bmQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKGBVbmFibGUgdG8gcmVzb2x2ZSBtaWdyYXRpb25zIGZvciBwYWNrYWdlLiAgWyR7ZS5tZXNzYWdlfV1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVNaWdyYXRpb24oXG4gICAgICAgIHdvcmtmbG93LFxuICAgICAgICBwYWNrYWdlTmFtZSxcbiAgICAgICAgbWlncmF0aW9ucyxcbiAgICAgICAgb3B0aW9ucy5uYW1lLFxuICAgICAgICBvcHRpb25zLmNyZWF0ZUNvbW1pdHMsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZyb20gPSBjb2VyY2VWZXJzaW9uTnVtYmVyKG9wdGlvbnMuZnJvbSk7XG4gICAgaWYgKCFmcm9tKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYFwiZnJvbVwiIHZhbHVlIFske29wdGlvbnMuZnJvbX1dIGlzIG5vdCBhIHZhbGlkIHZlcnNpb24uYCk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVNaWdyYXRpb25zKFxuICAgICAgd29ya2Zsb3csXG4gICAgICBwYWNrYWdlTmFtZSxcbiAgICAgIG1pZ3JhdGlvbnMsXG4gICAgICBmcm9tLFxuICAgICAgb3B0aW9ucy50byB8fCBwYWNrYWdlTm9kZS52ZXJzaW9uLFxuICAgICAgb3B0aW9ucy5jcmVhdGVDb21taXRzLFxuICAgICk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmVzLXBlci1mdW5jdGlvblxuICBwcml2YXRlIGFzeW5jIHVwZGF0ZVBhY2thZ2VzQW5kTWlncmF0ZShcbiAgICB3b3JrZmxvdzogTm9kZVdvcmtmbG93LFxuICAgIHJvb3REZXBlbmRlbmNpZXM6IE1hcDxzdHJpbmcsIFBhY2thZ2VUcmVlTm9kZT4sXG4gICAgb3B0aW9uczogT3B0aW9uczxVcGRhdGVDb21tYW5kQXJncz4sXG4gICAgcGFja2FnZXM6IFBhY2thZ2VJZGVudGlmaWVyW10sXG4gICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIGNvbnN0IGxvZ1ZlcmJvc2UgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZXF1ZXN0czoge1xuICAgICAgaWRlbnRpZmllcjogUGFja2FnZUlkZW50aWZpZXI7XG4gICAgICBub2RlOiBQYWNrYWdlVHJlZU5vZGU7XG4gICAgfVtdID0gW107XG5cbiAgICAvLyBWYWxpZGF0ZSBwYWNrYWdlcyBhY3R1YWxseSBhcmUgcGFydCBvZiB0aGUgd29ya3NwYWNlXG4gICAgZm9yIChjb25zdCBwa2cgb2YgcGFja2FnZXMpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSByb290RGVwZW5kZW5jaWVzLmdldChwa2cubmFtZSk7XG4gICAgICBpZiAoIW5vZGU/LnBhY2thZ2UpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBQYWNrYWdlICcke3BrZy5uYW1lfScgaXMgbm90IGEgZGVwZW5kZW5jeS5gKTtcblxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYSBzcGVjaWZpYyB2ZXJzaW9uIGlzIHJlcXVlc3RlZCBhbmQgbWF0Y2hlcyB0aGUgaW5zdGFsbGVkIHZlcnNpb24sIHNraXAuXG4gICAgICBpZiAocGtnLnR5cGUgPT09ICd2ZXJzaW9uJyAmJiBub2RlLnBhY2thZ2UudmVyc2lvbiA9PT0gcGtnLmZldGNoU3BlYykge1xuICAgICAgICBsb2dnZXIuaW5mbyhgUGFja2FnZSAnJHtwa2cubmFtZX0nIGlzIGFscmVhZHkgYXQgJyR7cGtnLmZldGNoU3BlY30nLmApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdHMucHVzaCh7IGlkZW50aWZpZXI6IHBrZywgbm9kZSB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbygnRmV0Y2hpbmcgZGVwZW5kZW5jeSBtZXRhZGF0YSBmcm9tIHJlZ2lzdHJ5Li4uJyk7XG5cbiAgICBjb25zdCBwYWNrYWdlc1RvVXBkYXRlOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgeyBpZGVudGlmaWVyOiByZXF1ZXN0SWRlbnRpZmllciwgbm9kZSB9IG9mIHJlcXVlc3RzKSB7XG4gICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IHJlcXVlc3RJZGVudGlmaWVyLm5hbWU7XG5cbiAgICAgIGxldCBtZXRhZGF0YTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIE1ldGFkYXRhIHJlcXVlc3RzIGFyZSBpbnRlcm5hbGx5IGNhY2hlZDsgbXVsdGlwbGUgcmVxdWVzdHMgZm9yIHNhbWUgbmFtZVxuICAgICAgICAvLyBkb2VzIG5vdCByZXN1bHQgaW4gYWRkaXRpb25hbCBuZXR3b3JrIHRyYWZmaWNcbiAgICAgICAgbWV0YWRhdGEgPSBhd2FpdCBmZXRjaFBhY2thZ2VNZXRhZGF0YShwYWNrYWdlTmFtZSwgbG9nZ2VyLCB7XG4gICAgICAgICAgdmVyYm9zZTogb3B0aW9ucy52ZXJib3NlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYXNzZXJ0SXNFcnJvcihlKTtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciBmZXRjaGluZyBtZXRhZGF0YSBmb3IgJyR7cGFja2FnZU5hbWV9JzogYCArIGUubWVzc2FnZSk7XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyeSB0byBmaW5kIGEgcGFja2FnZSB2ZXJzaW9uIGJhc2VkIG9uIHRoZSB1c2VyIHJlcXVlc3RlZCBwYWNrYWdlIHNwZWNpZmllclxuICAgICAgLy8gcmVnaXN0cnkgc3BlY2lmaWVyIHR5cGVzIGFyZSBlaXRoZXIgdmVyc2lvbiwgcmFuZ2UsIG9yIHRhZ1xuICAgICAgbGV0IG1hbmlmZXN0OiBQYWNrYWdlTWFuaWZlc3QgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAoXG4gICAgICAgIHJlcXVlc3RJZGVudGlmaWVyLnR5cGUgPT09ICd2ZXJzaW9uJyB8fFxuICAgICAgICByZXF1ZXN0SWRlbnRpZmllci50eXBlID09PSAncmFuZ2UnIHx8XG4gICAgICAgIHJlcXVlc3RJZGVudGlmaWVyLnR5cGUgPT09ICd0YWcnXG4gICAgICApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBtYW5pZmVzdCA9IHBpY2tNYW5pZmVzdChtZXRhZGF0YSwgcmVxdWVzdElkZW50aWZpZXIuZmV0Y2hTcGVjKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGFzc2VydElzRXJyb3IoZSk7XG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VUQVJHRVQnKSB7XG4gICAgICAgICAgICAvLyBJZiBub3QgZm91bmQgYW5kIG5leHQgd2FzIHVzZWQgYW5kIHVzZXIgZGlkIG5vdCBwcm92aWRlIGEgc3BlY2lmaWVyLCB0cnkgbGF0ZXN0LlxuICAgICAgICAgICAgLy8gUGFja2FnZSBtYXkgbm90IGhhdmUgYSBuZXh0IHRhZy5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcmVxdWVzdElkZW50aWZpZXIudHlwZSA9PT0gJ3RhZycgJiZcbiAgICAgICAgICAgICAgcmVxdWVzdElkZW50aWZpZXIuZmV0Y2hTcGVjID09PSAnbmV4dCcgJiZcbiAgICAgICAgICAgICAgIXJlcXVlc3RJZGVudGlmaWVyLnJhd1NwZWNcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG1hbmlmZXN0ID0gcGlja01hbmlmZXN0KG1ldGFkYXRhLCAnbGF0ZXN0Jyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnRJc0Vycm9yKGUpO1xuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgIT09ICdFVEFSR0VUJyAmJiBlLmNvZGUgIT09ICdFTk9WRVJTSU9OUycpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgIT09ICdFTk9WRVJTSU9OUycpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFuaWZlc3QpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAgIGBQYWNrYWdlIHNwZWNpZmllZCBieSAnJHtyZXF1ZXN0SWRlbnRpZmllci5yYXd9JyBkb2VzIG5vdCBleGlzdCB3aXRoaW4gdGhlIHJlZ2lzdHJ5LmAsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYW5pZmVzdC52ZXJzaW9uID09PSBub2RlLnBhY2thZ2U/LnZlcnNpb24pIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFBhY2thZ2UgJyR7cGFja2FnZU5hbWV9JyBpcyBhbHJlYWR5IHVwIHRvIGRhdGUuYCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5wYWNrYWdlICYmIEFOR1VMQVJfUEFDS0FHRVNfUkVHRVhQLnRlc3Qobm9kZS5wYWNrYWdlLm5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgdmVyc2lvbiB9ID0gbm9kZS5wYWNrYWdlO1xuICAgICAgICBjb25zdCB0b0JlSW5zdGFsbGVkTWFqb3JWZXJzaW9uID0gK21hbmlmZXN0LnZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgY29uc3QgY3VycmVudE1ham9yVmVyc2lvbiA9ICt2ZXJzaW9uLnNwbGl0KCcuJylbMF07XG5cbiAgICAgICAgaWYgKHRvQmVJbnN0YWxsZWRNYWpvclZlcnNpb24gLSBjdXJyZW50TWFqb3JWZXJzaW9uID4gMSkge1xuICAgICAgICAgIC8vIE9ubHkgYWxsb3cgdXBkYXRpbmcgYSBzaW5nbGUgdmVyc2lvbiBhdCBhIHRpbWUuXG4gICAgICAgICAgaWYgKGN1cnJlbnRNYWpvclZlcnNpb24gPCA2KSB7XG4gICAgICAgICAgICAvLyBCZWZvcmUgdmVyc2lvbiA2LCB0aGUgbWFqb3IgdmVyc2lvbnMgd2VyZSBub3QgYWx3YXlzIHNlcXVlbnRpYWwuXG4gICAgICAgICAgICAvLyBFeGFtcGxlIEBhbmd1bGFyL2NvcmUgc2tpcHBlZCB2ZXJzaW9uIDMsIEBhbmd1bGFyL2NsaSBza2lwcGVkIHZlcnNpb25zIDItNS5cbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgYFVwZGF0aW5nIG11bHRpcGxlIG1ham9yIHZlcnNpb25zIG9mICcke25hbWV9JyBhdCBvbmNlIGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSBtaWdyYXRlIGVhY2ggbWFqb3IgdmVyc2lvbiBpbmRpdmlkdWFsbHkuXFxuYCArXG4gICAgICAgICAgICAgICAgYEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoZSB1cGRhdGUgcHJvY2Vzcywgc2VlIGh0dHBzOi8vdXBkYXRlLmFuZ3VsYXIuaW8vLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0TWFqb3JWZXJzaW9uRnJvbUN1cnJlbnQgPSBjdXJyZW50TWFqb3JWZXJzaW9uICsgMTtcblxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICBgVXBkYXRpbmcgbXVsdGlwbGUgbWFqb3IgdmVyc2lvbnMgb2YgJyR7bmFtZX0nIGF0IG9uY2UgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIG1pZ3JhdGUgZWFjaCBtYWpvciB2ZXJzaW9uIGluZGl2aWR1YWxseS5cXG5gICtcbiAgICAgICAgICAgICAgICBgUnVuICduZyB1cGRhdGUgJHtuYW1lfUAke25leHRNYWpvclZlcnNpb25Gcm9tQ3VycmVudH0nIGluIHlvdXIgd29ya3NwYWNlIGRpcmVjdG9yeSBgICtcbiAgICAgICAgICAgICAgICBgdG8gdXBkYXRlIHRvIGxhdGVzdCAnJHtuZXh0TWFqb3JWZXJzaW9uRnJvbUN1cnJlbnR9LngnIHZlcnNpb24gb2YgJyR7bmFtZX0nLlxcblxcbmAgK1xuICAgICAgICAgICAgICAgIGBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdXBkYXRlIHByb2Nlc3MsIHNlZSBodHRwczovL3VwZGF0ZS5hbmd1bGFyLmlvLz92PSR7Y3VycmVudE1ham9yVmVyc2lvbn0uMC0ke25leHRNYWpvclZlcnNpb25Gcm9tQ3VycmVudH0uMGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBhY2thZ2VzVG9VcGRhdGUucHVzaChyZXF1ZXN0SWRlbnRpZmllci50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBpZiAocGFja2FnZXNUb1VwZGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3VjY2VzcyB9ID0gYXdhaXQgdGhpcy5leGVjdXRlU2NoZW1hdGljKFxuICAgICAgd29ya2Zsb3csXG4gICAgICBVUERBVEVfU0NIRU1BVElDX0NPTExFQ1RJT04sXG4gICAgICAndXBkYXRlJyxcbiAgICAgIHtcbiAgICAgICAgdmVyYm9zZTogb3B0aW9ucy52ZXJib3NlLFxuICAgICAgICBmb3JjZTogb3B0aW9ucy5mb3JjZSxcbiAgICAgICAgbmV4dDogb3B0aW9ucy5uZXh0LFxuICAgICAgICBwYWNrYWdlTWFuYWdlcjogdGhpcy5jb250ZXh0LnBhY2thZ2VNYW5hZ2VyLm5hbWUsXG4gICAgICAgIHBhY2thZ2VzOiBwYWNrYWdlc1RvVXBkYXRlLFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGZzLnJtKHBhdGguam9pbih0aGlzLmNvbnRleHQucm9vdCwgJ25vZGVfbW9kdWxlcycpLCB7XG4gICAgICAgICAgZm9yY2U6IHRydWUsXG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICAgIG1heFJldHJpZXM6IDMsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCB7fVxuXG4gICAgICBjb25zdCBpbnN0YWxsYXRpb25TdWNjZXNzID0gYXdhaXQgdGhpcy5jb250ZXh0LnBhY2thZ2VNYW5hZ2VyLmluc3RhbGxBbGwoXG4gICAgICAgIHRoaXMucGFja2FnZU1hbmFnZXJGb3JjZShvcHRpb25zLnZlcmJvc2UpID8gWyctLWZvcmNlJ10gOiBbXSxcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvb3QsXG4gICAgICApO1xuXG4gICAgICBpZiAoIWluc3RhbGxhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1Y2Nlc3MgJiYgb3B0aW9ucy5jcmVhdGVDb21taXRzKSB7XG4gICAgICBpZiAoIXRoaXMuY29tbWl0KGBBbmd1bGFyIENMSSB1cGRhdGUgZm9yIHBhY2thZ2VzIC0gJHtwYWNrYWdlc1RvVXBkYXRlLmpvaW4oJywgJyl9YCkpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpcyBhIHRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIGFsbG93IGRhdGEgdG8gYmUgcGFzc2VkIGJhY2sgZnJvbSB0aGUgdXBkYXRlIHNjaGVtYXRpY1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgbWlncmF0aW9ucyA9IChnbG9iYWwgYXMgYW55KS5leHRlcm5hbE1pZ3JhdGlvbnMgYXMge1xuICAgICAgcGFja2FnZTogc3RyaW5nO1xuICAgICAgY29sbGVjdGlvbjogc3RyaW5nO1xuICAgICAgZnJvbTogc3RyaW5nO1xuICAgICAgdG86IHN0cmluZztcbiAgICB9W107XG5cbiAgICBpZiAoc3VjY2VzcyAmJiBtaWdyYXRpb25zKSB7XG4gICAgICBjb25zdCByb290UmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUodGhpcy5jb250ZXh0LnJvb3QgKyAnLycpO1xuICAgICAgZm9yIChjb25zdCBtaWdyYXRpb24gb2YgbWlncmF0aW9ucykge1xuICAgICAgICAvLyBSZXNvbHZlIHRoZSBwYWNrYWdlIGZyb20gdGhlIHdvcmtzcGFjZSByb290LCBhcyBvdGhlcndpc2UgaXQgd2lsbCBiZSByZXNvbHZlZCBmcm9tIHRoZSB0ZW1wXG4gICAgICAgIC8vIGluc3RhbGxlZCBDTEkgdmVyc2lvbi5cbiAgICAgICAgbGV0IHBhY2thZ2VQYXRoO1xuICAgICAgICBsb2dWZXJib3NlKFxuICAgICAgICAgIGBSZXNvbHZpbmcgbWlncmF0aW9uIHBhY2thZ2UgJyR7bWlncmF0aW9uLnBhY2thZ2V9JyBmcm9tICcke3RoaXMuY29udGV4dC5yb290fScuLi5gLFxuICAgICAgICApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWNrYWdlUGF0aCA9IHBhdGguZGlybmFtZShcbiAgICAgICAgICAgICAgLy8gVGhpcyBtYXkgZmFpbCBpZiB0aGUgYHBhY2thZ2UuanNvbmAgaXMgbm90IGV4cG9ydGVkIGFzIGFuIGVudHJ5IHBvaW50XG4gICAgICAgICAgICAgIHJvb3RSZXF1aXJlLnJlc29sdmUocGF0aC5qb2luKG1pZ3JhdGlvbi5wYWNrYWdlLCAncGFja2FnZS5qc29uJykpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhc3NlcnRJc0Vycm9yKGUpO1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ01PRFVMRV9OT1RfRk9VTkQnKSB7XG4gICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHRyeWluZyB0byByZXNvbHZlIHRoZSBwYWNrYWdlJ3MgbWFpbiBlbnRyeSBwb2ludFxuICAgICAgICAgICAgICBwYWNrYWdlUGF0aCA9IHJvb3RSZXF1aXJlLnJlc29sdmUobWlncmF0aW9uLnBhY2thZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBhc3NlcnRJc0Vycm9yKGUpO1xuICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJykge1xuICAgICAgICAgICAgbG9nVmVyYm9zZShlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICBgTWlncmF0aW9ucyBmb3IgcGFja2FnZSAoJHttaWdyYXRpb24ucGFja2FnZX0pIHdlcmUgbm90IGZvdW5kLmAgK1xuICAgICAgICAgICAgICAgICcgVGhlIHBhY2thZ2UgY291bGQgbm90IGJlIGZvdW5kIGluIHRoZSB3b3Jrc3BhY2UuJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgYFVuYWJsZSB0byByZXNvbHZlIG1pZ3JhdGlvbnMgZm9yIHBhY2thZ2UgKCR7bWlncmF0aW9uLnBhY2thZ2V9KS4gIFske2UubWVzc2FnZX1dYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWlncmF0aW9ucztcblxuICAgICAgICAvLyBDaGVjayBpZiBpdCBpcyBhIHBhY2thZ2UtbG9jYWwgbG9jYXRpb25cbiAgICAgICAgY29uc3QgbG9jYWxNaWdyYXRpb25zID0gcGF0aC5qb2luKHBhY2thZ2VQYXRoLCBtaWdyYXRpb24uY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChleGlzdHNTeW5jKGxvY2FsTWlncmF0aW9ucykpIHtcbiAgICAgICAgICBtaWdyYXRpb25zID0gbG9jYWxNaWdyYXRpb25zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRyeSB0byByZXNvbHZlIGZyb20gcGFja2FnZSBsb2NhdGlvbi5cbiAgICAgICAgICAvLyBUaGlzIGF2b2lkcyBpc3N1ZXMgd2l0aCBwYWNrYWdlIGhvaXN0aW5nLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlUmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUocGFja2FnZVBhdGggKyAnLycpO1xuICAgICAgICAgICAgbWlncmF0aW9ucyA9IHBhY2thZ2VSZXF1aXJlLnJlc29sdmUobWlncmF0aW9uLmNvbGxlY3Rpb24pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGFzc2VydElzRXJyb3IoZSk7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBNaWdyYXRpb25zIGZvciBwYWNrYWdlICgke21pZ3JhdGlvbi5wYWNrYWdlfSkgd2VyZSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgICAgYFVuYWJsZSB0byByZXNvbHZlIG1pZ3JhdGlvbnMgZm9yIHBhY2thZ2UgKCR7bWlncmF0aW9uLnBhY2thZ2V9KS4gIFske2UubWVzc2FnZX1dYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZXhlY3V0ZU1pZ3JhdGlvbnMoXG4gICAgICAgICAgd29ya2Zsb3csXG4gICAgICAgICAgbWlncmF0aW9uLnBhY2thZ2UsXG4gICAgICAgICAgbWlncmF0aW9ucyxcbiAgICAgICAgICBtaWdyYXRpb24uZnJvbSxcbiAgICAgICAgICBtaWdyYXRpb24udG8sXG4gICAgICAgICAgb3B0aW9ucy5jcmVhdGVDb21taXRzLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEEgbm9uLXplcm8gdmFsdWUgaXMgYSBmYWlsdXJlIGZvciB0aGUgcGFja2FnZSdzIG1pZ3JhdGlvbnNcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcyA/IDAgOiAxO1xuICB9XG4gIC8qKlxuICAgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHRoZSBjb21taXQgd2FzIHN1Y2Nlc3NmdWwuXG4gICAqL1xuICBwcml2YXRlIGNvbW1pdChtZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBjb21taXQgaXMgbmVlZGVkLlxuICAgIGxldCBjb21taXROZWVkZWQ6IGJvb2xlYW47XG4gICAgdHJ5IHtcbiAgICAgIGNvbW1pdE5lZWRlZCA9IGhhc0NoYW5nZXNUb0NvbW1pdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAgIEZhaWxlZCB0byByZWFkIEdpdCB0cmVlOlxcbiR7KGVyciBhcyBTcGF3blN5bmNSZXR1cm5zPHN0cmluZz4pLnN0ZGVycn1gKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghY29tbWl0TmVlZGVkKSB7XG4gICAgICBsb2dnZXIuaW5mbygnICBObyBjaGFuZ2VzIHRvIGNvbW1pdCBhZnRlciBtaWdyYXRpb24uJyk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIENvbW1pdCBjaGFuZ2VzIGFuZCBhYm9ydCBvbiBlcnJvci5cbiAgICB0cnkge1xuICAgICAgY3JlYXRlQ29tbWl0KG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgRmFpbGVkIHRvIGNvbW1pdCB1cGRhdGUgKCR7bWVzc2FnZX0pOlxcbiR7KGVyciBhcyBTcGF3blN5bmNSZXR1cm5zPHN0cmluZz4pLnN0ZGVycn1gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIE5vdGlmeSB1c2VyIG9mIHRoZSBjb21taXQuXG4gICAgY29uc3QgaGFzaCA9IGZpbmRDdXJyZW50R2l0U2hhKCk7XG4gICAgY29uc3Qgc2hvcnRNZXNzYWdlID0gbWVzc2FnZS5zcGxpdCgnXFxuJylbMF07XG4gICAgaWYgKGhhc2gpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGAgIENvbW1pdHRlZCBtaWdyYXRpb24gc3RlcCAoJHtnZXRTaG9ydEhhc2goaGFzaCl9KTogJHtzaG9ydE1lc3NhZ2V9LmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDb21taXQgd2FzIHN1Y2Nlc3NmdWwsIGJ1dCByZWFkaW5nIHRoZSBoYXNoIHdhcyBub3QuIFNvbWV0aGluZyB3ZWlyZCBoYXBwZW5lZCxcbiAgICAgIC8vIGJ1dCBub3RoaW5nIHRoYXQgd291bGQgc3RvcCB0aGUgdXBkYXRlLiBKdXN0IGxvZyB0aGUgd2VpcmRuZXNzIGFuZCBjb250aW51ZS5cbiAgICAgIGxvZ2dlci5pbmZvKGAgIENvbW1pdHRlZCBtaWdyYXRpb24gc3RlcDogJHtzaG9ydE1lc3NhZ2V9LmApO1xuICAgICAgbG9nZ2VyLndhcm4oJyAgRmFpbGVkIHRvIGxvb2sgdXAgaGFzaCBvZiBtb3N0IHJlY2VudCBjb21taXQsIGNvbnRpbnVpbmcgYW55d2F5cy4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tDbGVhbkdpdCgpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9wTGV2ZWwgPSBleGVjU3luYygnZ2l0IHJldi1wYXJzZSAtLXNob3ctdG9wbGV2ZWwnLCB7XG4gICAgICAgIGVuY29kaW5nOiAndXRmOCcsXG4gICAgICAgIHN0ZGlvOiAncGlwZScsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGV4ZWNTeW5jKCdnaXQgc3RhdHVzIC0tcG9yY2VsYWluJywgeyBlbmNvZGluZzogJ3V0ZjgnLCBzdGRpbzogJ3BpcGUnIH0pO1xuICAgICAgaWYgKHJlc3VsdC50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IGZpbGVzIGluc2lkZSB0aGUgd29ya3NwYWNlIHJvb3QgYXJlIHJlbGV2YW50XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHJlc3VsdC5zcGxpdCgnXFxuJykpIHtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVFbnRyeSA9IHBhdGgucmVsYXRpdmUoXG4gICAgICAgICAgcGF0aC5yZXNvbHZlKHRoaXMuY29udGV4dC5yb290KSxcbiAgICAgICAgICBwYXRoLnJlc29sdmUodG9wTGV2ZWwudHJpbSgpLCBlbnRyeS5zbGljZSgzKS50cmltKCkpLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcmVsYXRpdmVFbnRyeS5zdGFydHNXaXRoKCcuLicpICYmICFwYXRoLmlzQWJzb2x1dGUocmVsYXRpdmVFbnRyeSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgaW5zdGFsbGVkIENMSSB2ZXJzaW9uIGlzIG9sZGVyIG9yIG5ld2VyIHRoYW4gYSBjb21wYXRpYmxlIHZlcnNpb24uXG4gICAqIEByZXR1cm5zIHRoZSB2ZXJzaW9uIHRvIGluc3RhbGwgb3IgbnVsbCB3aGVuIHRoZXJlIGlzIG5vIHVwZGF0ZSB0byBpbnN0YWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0NMSVZlcnNpb24oXG4gICAgcGFja2FnZXNUb1VwZGF0ZTogc3RyaW5nW10sXG4gICAgdmVyYm9zZSA9IGZhbHNlLFxuICAgIG5leHQgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgY29uc3QgeyB2ZXJzaW9uIH0gPSBhd2FpdCBmZXRjaFBhY2thZ2VNYW5pZmVzdChcbiAgICAgIGBAYW5ndWxhci9jbGlAJHt0aGlzLmdldENMSVVwZGF0ZVJ1bm5lclZlcnNpb24ocGFja2FnZXNUb1VwZGF0ZSwgbmV4dCl9YCxcbiAgICAgIHRoaXMuY29udGV4dC5sb2dnZXIsXG4gICAgICB7XG4gICAgICAgIHZlcmJvc2UsXG4gICAgICAgIHVzaW5nWWFybjogdGhpcy5jb250ZXh0LnBhY2thZ2VNYW5hZ2VyLm5hbWUgPT09IFBhY2thZ2VNYW5hZ2VyLllhcm4sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gVkVSU0lPTi5mdWxsID09PSB2ZXJzaW9uID8gbnVsbCA6IHZlcnNpb247XG4gIH1cblxuICBwcml2YXRlIGdldENMSVVwZGF0ZVJ1bm5lclZlcnNpb24oXG4gICAgcGFja2FnZXNUb1VwZGF0ZTogc3RyaW5nW10gfCB1bmRlZmluZWQsXG4gICAgbmV4dDogYm9vbGVhbixcbiAgKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICBpZiAobmV4dCkge1xuICAgICAgcmV0dXJuICduZXh0JztcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGluZ0FuZ3VsYXJQYWNrYWdlID0gcGFja2FnZXNUb1VwZGF0ZT8uZmluZCgocikgPT4gQU5HVUxBUl9QQUNLQUdFU19SRUdFWFAudGVzdChyKSk7XG4gICAgaWYgKHVwZGF0aW5nQW5ndWxhclBhY2thZ2UpIHtcbiAgICAgIC8vIElmIHdlIGFyZSB1cGRhdGluZyBhbnkgQW5ndWxhciBwYWNrYWdlIHdlIGNhbiB1cGRhdGUgdGhlIENMSSB0byB0aGUgdGFyZ2V0IHZlcnNpb24gYmVjYXVzZVxuICAgICAgLy8gbWlncmF0aW9ucyBmb3IgQGFuZ3VsYXIvY29yZUAxMyBjYW4gYmUgZXhlY3V0ZWQgdXNpbmcgQW5ndWxhci9jbGlAMTMuXG4gICAgICAvLyBUaGlzIGlzIHNhbWUgYmVoYXZpb3VyIGFzIGBucHggQGFuZ3VsYXIvY2xpQDEzIHVwZGF0ZSBAYW5ndWxhci9jb3JlQDEzYC5cblxuICAgICAgLy8gYEBhbmd1bGFyL2NsaUAxM2AgLT4gWycnLCAnYW5ndWxhci9jbGknLCAnMTMnXVxuICAgICAgLy8gYEBhbmd1bGFyL2NsaWAgLT4gWycnLCAnYW5ndWxhci9jbGknXVxuICAgICAgY29uc3QgdGVtcFZlcnNpb24gPSBjb2VyY2VWZXJzaW9uTnVtYmVyKHVwZGF0aW5nQW5ndWxhclBhY2thZ2Uuc3BsaXQoJ0AnKVsyXSk7XG5cbiAgICAgIHJldHVybiBzZW12ZXIucGFyc2UodGVtcFZlcnNpb24pPy5tYWpvciA/PyAnbGF0ZXN0JztcbiAgICB9XG5cbiAgICAvLyBXaGVuIG5vdCB1cGRhdGluZyBhbiBBbmd1bGFyIHBhY2thZ2Ugd2UgY2Fubm90IGRldGVybWluZSB3aGljaCBzY2hlbWF0aWMgcnVudGltZSB0aGUgbWlncmF0aW9uIHNob3VsZCB0byBiZSBleGVjdXRlZCBpbi5cbiAgICAvLyBUeXBpY2FsbHksIHdlIGNhbiBhc3N1bWUgdGhhdCB0aGUgYEBhbmd1bGFyL2NsaWAgd2FzIHVwZGF0ZWQgcHJldmlvdXNseS5cbiAgICAvLyBFeGFtcGxlOiBBbmd1bGFyIG9mZmljaWFsIHBhY2thZ2VzIGFyZSB0eXBpY2FsbHkgdXBkYXRlZCBwcmlvciB0byBOR1JYIGV0Yy4uLlxuICAgIC8vIFRoZXJlZm9yZSwgd2Ugb25seSB1cGRhdGUgdG8gdGhlIGxhdGVzdCBwYXRjaCB2ZXJzaW9uIG9mIHRoZSBpbnN0YWxsZWQgbWFqb3IgdmVyc2lvbiBvZiB0aGUgQW5ndWxhciBDTEkuXG5cbiAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBiZWNhdXNlIHdlIG1pZ2h0IGVuZCB1cCBpbiBhIHNjZW5hcmlvIHdoZXJlIGxvY2FsbHkgQW5ndWxhciB2MTIgaXMgaW5zdGFsbGVkLCB1cGRhdGluZyBOR1JYIGZyb20gMTEgdG8gMTIuXG4gICAgLy8gV2UgZW5kIHVwIHVzaW5nIEFuZ3VsYXIgQ2xJIHYxMyB0byBydW4gdGhlIG1pZ3JhdGlvbnMgaWYgd2UgcnVuIHRoZSBtaWdyYXRpb25zIHVzaW5nIHRoZSBDTEkgaW5zdGFsbGVkIG1ham9yIHZlcnNpb24gKyAxIGxvZ2ljLlxuICAgIHJldHVybiBWRVJTSU9OLm1ham9yO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBydW5UZW1wQmluYXJ5KHBhY2thZ2VOYW1lOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdID0gW10pOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHsgc3VjY2VzcywgdGVtcE5vZGVNb2R1bGVzIH0gPSBhd2FpdCB0aGlzLmNvbnRleHQucGFja2FnZU1hbmFnZXIuaW5zdGFsbFRlbXAocGFja2FnZU5hbWUpO1xuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHZlcnNpb24vdGFnIGV0Yy4uLiBmcm9tIHBhY2thZ2UgbmFtZVxuICAgIC8vIEV4OiBAYW5ndWxhci9jbGlAbGF0ZXN0IC0+IEBhbmd1bGFyL2NsaVxuICAgIGNvbnN0IHBhY2thZ2VOYW1lTm9WZXJzaW9uID0gcGFja2FnZU5hbWUuc3Vic3RyaW5nKDAsIHBhY2thZ2VOYW1lLmxhc3RJbmRleE9mKCdAJykpO1xuICAgIGNvbnN0IHBrZ0xvY2F0aW9uID0gam9pbih0ZW1wTm9kZU1vZHVsZXMsIHBhY2thZ2VOYW1lTm9WZXJzaW9uKTtcbiAgICBjb25zdCBwYWNrYWdlSnNvblBhdGggPSBqb2luKHBrZ0xvY2F0aW9uLCAncGFja2FnZS5qc29uJyk7XG5cbiAgICAvLyBHZXQgYSBiaW5hcnkgbG9jYXRpb24gZm9yIHRoaXMgcGFja2FnZVxuICAgIGxldCBiaW5QYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4aXN0c1N5bmMocGFja2FnZUpzb25QYXRoKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKHBhY2thZ2VKc29uUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICBjb25zdCB7IGJpbiA9IHt9IH0gPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBiaW5LZXlzID0gT2JqZWN0LmtleXMoYmluKTtcblxuICAgICAgICBpZiAoYmluS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICBiaW5QYXRoID0gcmVzb2x2ZShwa2dMb2NhdGlvbiwgYmluW2JpbktleXNbMF1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghYmluUGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgbG9jYXRlIGJpbiBmb3IgdGVtcG9yYXJ5IHBhY2thZ2U6ICR7cGFja2FnZU5hbWVOb1ZlcnNpb259LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciB9ID0gc3Bhd25TeW5jKHByb2Nlc3MuZXhlY1BhdGgsIFtiaW5QYXRoLCAuLi5hcmdzXSwge1xuICAgICAgc3RkaW86ICdpbmhlcml0JyxcbiAgICAgIGVudjoge1xuICAgICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgICAgTkdfRElTQUJMRV9WRVJTSU9OX0NIRUNLOiAndHJ1ZScsXG4gICAgICAgIE5HX0NMSV9BTkFMWVRJQ1M6ICdmYWxzZScsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gbnVsbCAmJiBlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXR1cyA/PyAwO1xuICB9XG5cbiAgcHJpdmF0ZSBwYWNrYWdlTWFuYWdlckZvcmNlKHZlcmJvc2U6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAvLyBucG0gNysgY2FuIGZhaWwgZHVlIHRvIGl0IGluY29ycmVjdGx5IHJlc29sdmluZyBwZWVyIGRlcGVuZGVuY2llcyB0aGF0IGhhdmUgdmFsaWQgU2VtVmVyXG4gICAgLy8gcmFuZ2VzIGR1cmluZyBhbiB1cGRhdGUuIFVwZGF0ZSB3aWxsIHNldCBjb3JyZWN0IHZlcnNpb25zIG9mIGRlcGVuZGVuY2llcyB3aXRoaW4gdGhlXG4gICAgLy8gcGFja2FnZS5qc29uIGZpbGUuIFRoZSBmb3JjZSBvcHRpb24gaXMgc2V0IHRvIHdvcmthcm91bmQgdGhlc2UgZXJyb3JzLlxuICAgIC8vIEV4YW1wbGUgZXJyb3I6XG4gICAgLy8gbnBtIEVSUiEgQ29uZmxpY3RpbmcgcGVlciBkZXBlbmRlbmN5OiBAYW5ndWxhci9jb21waWxlci1jbGlAMTQuMC4wLXJjLjBcbiAgICAvLyBucG0gRVJSISBub2RlX21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXItY2xpXG4gICAgLy8gbnBtIEVSUiEgICBwZWVyIEBhbmd1bGFyL2NvbXBpbGVyLWNsaUBcIl4xNC4wLjAgfHwgXjE0LjAuMC1yY1wiIGZyb20gQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXJAMTQuMC4wLXJjLjBcbiAgICAvLyBucG0gRVJSISAgIG5vZGVfbW9kdWxlcy9AYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhclxuICAgIC8vIG5wbSBFUlIhICAgICBkZXYgQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXJAXCJ+MTQuMC4wLXJjLjBcIiBmcm9tIHRoZSByb290IHByb2plY3RcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbnRleHQucGFja2FnZU1hbmFnZXIubmFtZSA9PT0gUGFja2FnZU1hbmFnZXIuTnBtICYmXG4gICAgICB0aGlzLmNvbnRleHQucGFja2FnZU1hbmFnZXIudmVyc2lvbiAmJlxuICAgICAgc2VtdmVyLmd0ZSh0aGlzLmNvbnRleHQucGFja2FnZU1hbmFnZXIudmVyc2lvbiwgJzcuMC4wJylcbiAgICApIHtcbiAgICAgIGlmICh2ZXJib3NlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5sb2dnZXIuaW5mbyhcbiAgICAgICAgICAnTlBNIDcrIGRldGVjdGVkIC0tIGVuYWJsaW5nIGZvcmNlIG9wdGlvbiBmb3IgcGFja2FnZSBpbnN0YWxsYXRpb24nLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldE9wdGlvbmFsTWlncmF0aW9uc1RvUnVuKFxuICAgIG9wdGlvbmFsTWlncmF0aW9uczogTWlncmF0aW9uU2NoZW1hdGljRGVzY3JpcHRpb25bXSxcbiAgICBwYWNrYWdlTmFtZTogc3RyaW5nLFxuICApOiBQcm9taXNlPE1pZ3JhdGlvblNjaGVtYXRpY0Rlc2NyaXB0aW9uW10gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5jb250ZXh0O1xuICAgIGNvbnN0IG51bWJlck9mTWlncmF0aW9ucyA9IG9wdGlvbmFsTWlncmF0aW9ucy5sZW5ndGg7XG4gICAgbG9nZ2VyLmluZm8oXG4gICAgICBgVGhpcyBwYWNrYWdlIGhhcyAke251bWJlck9mTWlncmF0aW9uc30gb3B0aW9uYWwgbWlncmF0aW9uJHtcbiAgICAgICAgbnVtYmVyT2ZNaWdyYXRpb25zID4gMSA/ICdzJyA6ICcnXG4gICAgICB9IHRoYXQgY2FuIGJlIGV4ZWN1dGVkLmAsXG4gICAgKTtcbiAgICBsb2dnZXIuaW5mbygnJyk7IC8vIEV4dHJhIHRyYWlsaW5nIG5ld2xpbmUuXG5cbiAgICBpZiAoIWlzVFRZKCkpIHtcbiAgICAgIGZvciAoY29uc3QgbWlncmF0aW9uIG9mIG9wdGlvbmFsTWlncmF0aW9ucykge1xuICAgICAgICBjb25zdCB7IHRpdGxlIH0gPSBnZXRNaWdyYXRpb25UaXRsZUFuZERlc2NyaXB0aW9uKG1pZ3JhdGlvbik7XG4gICAgICAgIGxvZ2dlci5pbmZvKGNvbG9ycy5jeWFuKGNvbG9ycy5zeW1ib2xzLnBvaW50ZXIpICsgJyAnICsgY29sb3JzLmJvbGQodGl0bGUpKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICAgY29sb3JzLmdyYXkoYCAgbmcgdXBkYXRlICR7cGFja2FnZU5hbWV9IC0tbWlncmF0aW9uLW9ubHkgLS1uYW1lICR7bWlncmF0aW9uLm5hbWV9YCksXG4gICAgICAgICk7XG4gICAgICAgIGxvZ2dlci5pbmZvKCcnKTsgLy8gRXh0cmEgdHJhaWxpbmcgbmV3bGluZS5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBhc2tDaG9pY2VzKFxuICAgICAgYFNlbGVjdCB0aGUgbWlncmF0aW9ucyB0aGF0IHlvdSdkIGxpa2UgdG8gcnVuYCxcbiAgICAgIG9wdGlvbmFsTWlncmF0aW9ucy5tYXAoKG1pZ3JhdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB7IHRpdGxlIH0gPSBnZXRNaWdyYXRpb25UaXRsZUFuZERlc2NyaXB0aW9uKG1pZ3JhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiB0aXRsZSxcbiAgICAgICAgICB2YWx1ZTogbWlncmF0aW9uLm5hbWUsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIG51bGwsXG4gICAgKTtcblxuICAgIGxvZ2dlci5pbmZvKCcnKTsgLy8gRXh0cmEgdHJhaWxpbmcgbmV3bGluZS5cblxuICAgIHJldHVybiBvcHRpb25hbE1pZ3JhdGlvbnMuZmlsdGVyKCh7IG5hbWUgfSkgPT4gYW5zd2VyPy5pbmNsdWRlcyhuYW1lKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHRoZSB3b3JraW5nIGRpcmVjdG9yeSBoYXMgR2l0IGNoYW5nZXMgdG8gY29tbWl0LlxuICovXG5mdW5jdGlvbiBoYXNDaGFuZ2VzVG9Db21taXQoKTogYm9vbGVhbiB7XG4gIC8vIExpc3QgYWxsIG1vZGlmaWVkIGZpbGVzIG5vdCBjb3ZlcmVkIGJ5IC5naXRpZ25vcmUuXG4gIC8vIElmIGFueSBmaWxlcyBhcmUgcmV0dXJuZWQsIHRoZW4gdGhlcmUgbXVzdCBiZSBzb21ldGhpbmcgdG8gY29tbWl0LlxuXG4gIHJldHVybiBleGVjU3luYygnZ2l0IGxzLWZpbGVzIC1tIC1kIC1vIC0tZXhjbHVkZS1zdGFuZGFyZCcpLnRvU3RyaW5nKCkgIT09ICcnO1xufVxuXG4vKipcbiAqIFByZWNvbmRpdGlvbjogTXVzdCBoYXZlIHBlbmRpbmcgY2hhbmdlcyB0byBjb21taXQsIHRoZXkgZG8gbm90IG5lZWQgdG8gYmUgc3RhZ2VkLlxuICogUG9zdGNvbmRpdGlvbjogVGhlIEdpdCB3b3JraW5nIHRyZWUgaXMgY29tbWl0dGVkIGFuZCB0aGUgcmVwbyBpcyBjbGVhbi5cbiAqIEBwYXJhbSBtZXNzYWdlIFRoZSBjb21taXQgbWVzc2FnZSB0byB1c2UuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1pdChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgLy8gU3RhZ2UgZW50aXJlIHdvcmtpbmcgdHJlZSBmb3IgY29tbWl0LlxuICBleGVjU3luYygnZ2l0IGFkZCAtQScsIHsgZW5jb2Rpbmc6ICd1dGY4Jywgc3RkaW86ICdwaXBlJyB9KTtcblxuICAvLyBDb21taXQgd2l0aCB0aGUgbWVzc2FnZSBwYXNzZWQgdmlhIHN0ZGluIHRvIGF2b2lkIGJhc2ggZXNjYXBpbmcgaXNzdWVzLlxuICBleGVjU3luYygnZ2l0IGNvbW1pdCAtLW5vLXZlcmlmeSAtRiAtJywgeyBlbmNvZGluZzogJ3V0ZjgnLCBzdGRpbzogJ3BpcGUnLCBpbnB1dDogbWVzc2FnZSB9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIFRoZSBHaXQgU0hBIGhhc2ggb2YgdGhlIEhFQUQgY29tbWl0LiBSZXR1cm5zIG51bGwgaWYgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBoYXNoLlxuICovXG5mdW5jdGlvbiBmaW5kQ3VycmVudEdpdFNoYSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgSEVBRCcsIHsgZW5jb2Rpbmc6ICd1dGY4Jywgc3RkaW86ICdwaXBlJyB9KS50cmltKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFNob3J0SGFzaChjb21taXRIYXNoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY29tbWl0SGFzaC5zbGljZSgwLCA5KTtcbn1cblxuZnVuY3Rpb24gY29lcmNlVmVyc2lvbk51bWJlcih2ZXJzaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoIXZlcnNpb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCEvXlxcZHsxLDMwfVxcLlxcZHsxLDMwfVxcLlxcZHsxLDMwfS8udGVzdCh2ZXJzaW9uKSkge1xuICAgIGNvbnN0IG1hdGNoID0gdmVyc2lvbi5tYXRjaCgvXlxcZHsxLDMwfShcXC5cXGR7MSwzMH0pKi8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoIW1hdGNoWzFdKSB7XG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgbWF0Y2hbMF0ubGVuZ3RoKSArICcuMC4wJyArIHZlcnNpb24uc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmICghbWF0Y2hbMl0pIHtcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBtYXRjaFswXS5sZW5ndGgpICsgJy4wJyArIHZlcnNpb24uc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlbXZlci52YWxpZCh2ZXJzaW9uKSA/PyB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE1pZ3JhdGlvblRpdGxlQW5kRGVzY3JpcHRpb24obWlncmF0aW9uOiBNaWdyYXRpb25TY2hlbWF0aWNEZXNjcmlwdGlvbik6IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn0ge1xuICBjb25zdCBbdGl0bGUsIC4uLmRlc2NyaXB0aW9uXSA9IG1pZ3JhdGlvbi5kZXNjcmlwdGlvbi5zcGxpdCgnLiAnKTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0aXRsZS5lbmRzV2l0aCgnLicpID8gdGl0bGUgOiB0aXRsZSArICcuJyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24uam9pbignLlxcbiAgJyksXG4gIH07XG59XG4iXX0=