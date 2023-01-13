export const fetchArchive = (gitAccountUrl, name, branch = "main") => {
  const remote = [gitAccountUrl, name].join("/");
  return `git archive --remote=${remote} --format=tar ${branch} > ${name}.tar`;
};

export const extractArchive = (name) => `tar -xf ${name}.tar -C ${name}`;

export const createMoveCommands = (name, rootPath = "root") => {
  const command = {
    docs: (resourcePath = "docs") =>
      `mv ${name}/${resourcePath} ${rootPath}/docs/${name}`,
    blog: (resourcePath = "blog") =>
      `mv ${name}/${resourcePath} ${rootPath}/blogs/${name}`,
    src: (resourcePath = "src") =>
      `mv ${name}/${resourcePath} ${rootPath}/src/${name}`,
    static: (resourcePath = "static") =>
      `mv ${name}/${resourcePath} ${rootPath}/static/${name}`,
  };

  return {
    docs: command.docs,
    blog: command.blog,
    src: command.src,
    static: command.static,
  };
};
