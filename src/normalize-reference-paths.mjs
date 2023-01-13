// TODO
// references to `brand1:/blog/xyz` will be renamed to `blogs/brand1/xyz`
export const normalizeReferencePathsInDocs = async (docsFilePath) => {
    // TODO: iterate doc files and replace txt for each
    await processDocFiles(docsFilePath)
}

export const renameReferencePathsIn = (txt, opts = {}) => {
    const { paths } = opts
    if (!pathName)
    for (let pathName in paths) {
        const pathStr = `${pathName}/blog`
        const replacePathStr = [blogs, pathName]
        txt.replace(pathStr, replacePathStr)
    }
    return txt    
}

export const processFile = async (filename) => {
    try {
        const txt = await readFile(filename);
        const newFileTxt = renameReferencePathsIn(txt)
        await writeFile(newFileTxt)
    } catch (error) {
        console.log(error.message);
        // implement custom error handling and logging here if needed
    }
    return fns.pop?.();
};

export const processDocFiles = async (filePath, opts = {}) => {
    const filenames = await fs.readdir(filePath);
    const fns = filenames.map(filename => () => processFile(filename));
    return Promise.all(fns)
}
