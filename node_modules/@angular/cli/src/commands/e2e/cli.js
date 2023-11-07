"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const architect_command_module_1 = require("../../command-builder/architect-command-module");
const command_config_1 = require("../command-config");
class E2eCommandModule extends architect_command_module_1.ArchitectCommandModule {
    constructor() {
        super(...arguments);
        this.missingTargetChoices = [
            {
                name: 'Cypress',
                value: '@cypress/schematic',
            },
            {
                name: 'Nightwatch',
                value: '@nightwatch/schematics',
            },
            {
                name: 'WebdriverIO',
                value: '@wdio/schematics',
            },
        ];
        this.multiTarget = true;
        this.command = 'e2e [project]';
        this.aliases = command_config_1.RootCommands['e2e'].aliases;
        this.describe = 'Builds and serves an Angular application, then runs end-to-end tests.';
    }
}
exports.default = E2eCommandModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhci9jbGkvc3JjL2NvbW1hbmRzL2UyZS9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFHSCw2RkFBd0Y7QUFFeEYsc0RBQWlEO0FBRWpELE1BQXFCLGdCQUNuQixTQUFRLGlEQUFzQjtJQURoQzs7UUFJVyx5QkFBb0IsR0FBMEI7WUFDckQ7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLG9CQUFvQjthQUM1QjtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixLQUFLLEVBQUUsd0JBQXdCO2FBQ2hDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLEtBQUssRUFBRSxrQkFBa0I7YUFDMUI7U0FDRixDQUFDO1FBRUYsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsWUFBTyxHQUFHLGVBQWUsQ0FBQztRQUMxQixZQUFPLEdBQUcsNkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdEMsYUFBUSxHQUFHLHVFQUF1RSxDQUFDO0lBRXJGLENBQUM7Q0FBQTtBQXhCRCxtQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTWlzc2luZ1RhcmdldENob2ljZSB9IGZyb20gJy4uLy4uL2NvbW1hbmQtYnVpbGRlci9hcmNoaXRlY3QtYmFzZS1jb21tYW5kLW1vZHVsZSc7XG5pbXBvcnQgeyBBcmNoaXRlY3RDb21tYW5kTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29tbWFuZC1idWlsZGVyL2FyY2hpdGVjdC1jb21tYW5kLW1vZHVsZSc7XG5pbXBvcnQgeyBDb21tYW5kTW9kdWxlSW1wbGVtZW50YXRpb24gfSBmcm9tICcuLi8uLi9jb21tYW5kLWJ1aWxkZXIvY29tbWFuZC1tb2R1bGUnO1xuaW1wb3J0IHsgUm9vdENvbW1hbmRzIH0gZnJvbSAnLi4vY29tbWFuZC1jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFMmVDb21tYW5kTW9kdWxlXG4gIGV4dGVuZHMgQXJjaGl0ZWN0Q29tbWFuZE1vZHVsZVxuICBpbXBsZW1lbnRzIENvbW1hbmRNb2R1bGVJbXBsZW1lbnRhdGlvblxue1xuICBvdmVycmlkZSBtaXNzaW5nVGFyZ2V0Q2hvaWNlczogTWlzc2luZ1RhcmdldENob2ljZVtdID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdDeXByZXNzJyxcbiAgICAgIHZhbHVlOiAnQGN5cHJlc3Mvc2NoZW1hdGljJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdOaWdodHdhdGNoJyxcbiAgICAgIHZhbHVlOiAnQG5pZ2h0d2F0Y2gvc2NoZW1hdGljcycsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnV2ViZHJpdmVySU8nLFxuICAgICAgdmFsdWU6ICdAd2Rpby9zY2hlbWF0aWNzJyxcbiAgICB9LFxuICBdO1xuXG4gIG11bHRpVGFyZ2V0ID0gdHJ1ZTtcbiAgY29tbWFuZCA9ICdlMmUgW3Byb2plY3RdJztcbiAgYWxpYXNlcyA9IFJvb3RDb21tYW5kc1snZTJlJ10uYWxpYXNlcztcbiAgZGVzY3JpYmUgPSAnQnVpbGRzIGFuZCBzZXJ2ZXMgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiwgdGhlbiBydW5zIGVuZC10by1lbmQgdGVzdHMuJztcbiAgbG9uZ0Rlc2NyaXB0aW9uUGF0aD86IHN0cmluZztcbn1cbiJdfQ==