import { mergeRepo } from "./shell/merge-repo.mjs";

export const processRepoConfig = (repoConfig) => {
  const { url, docs, blogs } = repoConfig;
  mergeRepo();
};

export const processRepoConfigs = (repoConfigs) => {
  if (!Array.isArray(repoConfigs)) {
    throw "processRepoConfigs: invalid repoConfigs";
  }
  repoConfigs.forEach(processRepoConfig);
};
