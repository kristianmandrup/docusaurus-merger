import {
  runExtractArchive,
  runFetchArchive,
  runMoveFiles,
} from "./run-shell-command.mjs";

export const mergeRepo = (gitAccountUrl, repoName, opts = {}) => {
  const rootPath = opts.rootPath || ".";
  const branch = opts.branch || "main";
  runFetchArchive(gitAccountUrl, repoName, { branch });
  runExtractArchive(repoName);
  runMoveFiles(repoName, rootPath);
};

export const createGithubRepoBranchUrl = ({ account, name, branch, defaults}) => {
  branch = branch || defaults.branch || "main"
  return [account, name, branch].join("/")
}
