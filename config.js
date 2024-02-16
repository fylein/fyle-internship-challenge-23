const fs = require("fs");
const util = require("util");
const dotenv = require("dotenv");

const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);

const setEnv = async () => {
  try {
    await mkdirAsync("src/environments", { recursive: true });

    dotenv.config({ path: "src/environments/.env" });

    const envConfigFile = `export const environment = {
  token: '${process.env.OCTOKIT_TOKEN || ""}',
  production: true,
};
`;

    await writeFileAsync("./src/environments/environment.ts", envConfigFile);

    console.log("environment.ts file created successfully.");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

setEnv();
