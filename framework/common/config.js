const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"];
const DEFAULT_FW = 'shopify'

const withFrameworkConfig = (defaultConfig = {}) => {
  let framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error("The api framework is missing, please add valid provider");
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error(
      `The api ${framework} do not implemented, available: ${ALLOWED_FW.join(
        ", "
      )}`
    );
  }

  if (framework === "shopify_local") {
    framework = DEFAULT_FW;
  }

  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config"
  ));
  const config = merge(defaultConfig, frameworkNextConfig);

  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath);

  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];

  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig, null, 2), {
      parser: "json",
    })
  );

  return config;
};

module.exports = { withFrameworkConfig };
