const debug = require("debug");
const chalk = require("chalk");

const loggers = {
  error: debug("app"),
  warn: debug("app"),
  info: debug("app"),
  success: debug("app"),
};

const logLabels = {
  error: "Error",
  warn: "Warning",
  info: "Info",
  success: "Success",
};

const logColors = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.blue,
  success: chalk.green,
};

const createLogFunction = (type) => (msg) => {
  const label = logLabels[type];
  const color = logColors[type];
  loggers[type](chalk.cyanBright(`- ${label}:`), color(msg));
};

module.exports.error = createLogFunction("error");
module.exports.warn = createLogFunction("warn");
module.exports.info = createLogFunction("info");
module.exports.success = createLogFunction("success");
