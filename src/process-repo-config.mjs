import { mergeRepo } from "./shell/merge-repo.mjs";

// - name: Brand one
// repo: brand1
// docs:
//   - docs
//   - more-docs
// sidebars:
//   - sidebar.js
// blogs:
//   - blog

export const processRepoConfig = (repoConfig, opts = {}) => {
  const { account, defaults } = opts;
  const { repo, docs, blogs } = repoConfig;
  const { name } = repo
  const gitAccountUrl = account
  opts = {
      ...opts,
      ...defaults || {},
      ...repo || {}
    }  
  mergeRepo(gitAccountUrl, name, opts);
  // generate
};


export const processRepoConfigs = (repoConfigs) => {
  if (!Array.isArray(repoConfigs)) {
    throw "processRepoConfigs: invalid repoConfigs";
  }
  repoConfigs.forEach(processRepoConfig);
};
