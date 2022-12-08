import { loadYamlFileSync } from "load-yaml-file";

export const keyLabel = (key) => `${key} repository config:`;

export const repoConfigError = (key, msg) => {
  throw `${keyLabel(key)}: ${msg}`;
};

export const validateStringFieldRepoConfig = (key, value, name) => {
  const entry = value.url;
  if (!entry) {
    repoConfigError(key, `missing ${name} entry`);
  }
  if (typeof entry !== "string") {
    repoConfigError(key, `invalid ${name} entry`);
  }
  return entry;
};

export const validateArrayFieldRepoConfig = (key, value, name) => {
  const entry = value[name];
  if (!entry) return [];
  if (!Array.isArray(entry)) {
    repoConfigError(key, `invalid ${name} entry`);
  }
};

export const normalizeRepoConfig = (entry, index) => {
  let label;
  try {
    label = validateStringFieldRepoConfig(index, entry, "name");
  } catch (err) {}
  const repo = validateStringFieldRepoConfig(label || index, entry, "repo");
  label = label || repo;

  const docs = validateArrayFieldRepoConfig(label, entry, "docs");
  const blogs = validateArrayFieldRepoConfig(label, entry, "blogs");
  const sidebars = validateArrayFieldRepoConfig(label, entry, "sidebars");
  return { label, repo, url, docs, blogs, sidebars };
};

export const normalizedRepoConfigs = (repositories) =>
  repositories.map(normalizeRepoConfig);

export const loadConfig = (configFilePath = "docusaurus-merge.config.yaml") => {
  try {
    const data = loadYamlFileSync(configFilePath);
    const { repositories } = data;
    if (!repositories) {
      throw `missing root key: repositories`;
    }
    return normalizedRepoConfigs(repositories);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
