import { readFile } from "./file-utils.mjs"

// TODO
export const generateNavbarItems = (projectFilePaths) => {
    const navBarItemsList = projectFilePaths.reduce((acc, projFilePath) => {
        const txt = readNavBarFile(projFilePath)
        const navbarItemsTxt = fetchNavbarItems(txt)
        acc.push(navbarItemsTxt)
        return acc
    }, [])   
    return navBarItemsList.join(",\n")
}

const readNavBarFile = (projectFilePath) => {
    const navBarFile = path.join(projectFilePath, `navbar.js`)
    return readFile(navBarFile)
}


export const fetchNavbarItems = (navbarFileContents) => {
    const regExp = /items:\s*\[(\.)]/
    const matches = navbarFileContents.match(regExp)
    const hasMatches = matches && matches.length > 1
    return hasMatches ? matches[1] : ""
}

