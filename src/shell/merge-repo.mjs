import {
  runExtractArchive,
  runFetchArchive,
  runMoveFiles,
} from "./run-shell-command.mjs";

export const mergeRepo = (gitAccountUrl, repoName, opts = {}) => {
  const rootPath = opts.rootPath || ".";
  const branch = opts.branch || "main";
  runFetchArchive(gitAccountUrl, repoName, { branch });
  runExtractArchive(gitAccountUrl, repoName, { branch });
  runMoveFiles(repoName, rootPath);
};
