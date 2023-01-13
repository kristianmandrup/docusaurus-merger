import { writeFile } from "./file-utils.mjs"
import * as path from "path"

// TODO
export const generatePluginConfigFile = (entryConfigList, opts = {}) => {
    const txt = generatePluginConfigFileContents(entryConfigList)
    const rootPath = opts.rootPath || '.'
    const filePath = path.join(rootPath, "plugins.js")
    writeFile(filePath, txt)    
}   

export const generatePluginConfigFileContents = (entryConfigList) => {
    const body = entryConfigList.map(createEntry)
    return [header, body, footer].join("/n")
}

export const createEntry = ({name, path}) => {
    path = path || name
    return `"@docusaurus/plugin-content-docs",
    {
      id: "${name}", // omitted => default instance
      path: "docs/${path}",
      routeBasePath: "${path}",
      sidebarPath: require.resolve("./sidebars/${name}.js"),
    }`
}


export const header = `module.exports = {
    plugins: [
  `

export const footer = `  ],
};
` 