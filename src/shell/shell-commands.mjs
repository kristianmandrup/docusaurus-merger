export const fetchArchive = (gitAccountUrl, name, branch = "main") => {
  const remote = [gitAccountUrl, name].join("/");
  return `git archive --remote=${remote} --format=tar ${branch} > ${name}.tar`;
};

export const extractArchive = (name) => `tar -xf ${name}.tar -C ${name}`;

export const createMoveCommands = (name, rootPath = "root") => {
  const command = {
    docs: (resourcePath = "docs") =>
      `mv ${repoName}/${resourcePath} ${rootPath}/docs/${repoName}`,
    blog: (resourcePath = "blog") =>
      `mv ${repoName}/${resourcePath} ${rootPath}/blogs/${repoName}`,
    src: (resourcePath = "src") =>
      `mv ${repoName}/${resourcePath} ${rootPath}/src/${repoName}`,
    static: (resourcePath = "static") =>
      `mv ${repoName}/${resourcePath} ${rootPath}/static/${repoName}`,
  };

  return {
    docs: command.docs,
    blog: command.blog,
    src: command.src,
    static: command.static,
  };
};
