import * as exec from "shelljs.exec";
import commands from "./shell-commands.mjs";

export const runShellCommand = (command) => {
  try {
    // https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
    // cwd <string> | <URL> Current working directory of the child process.
    exec(command, { silent: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const runFetchArchive = (gitAccountUrl, name, opts) => {
  const branch = opts.branch || "main";
  const command = commands.fetchArchive(gitAccountUrl, name, branch);
  runShellCommand(command);
};

export const runExtractArchive = (name) => {
  const command = commands.extractArchive(name);
  exec(command, { silent: true });
};

export const runMoveFiles = (rootPath) => {
  const commands = commands.createMoveCommands(rootPath);
  commands.forEach((command) => {
    runShellCommand(command);
  });
  exec(command, { silent: true });
};
