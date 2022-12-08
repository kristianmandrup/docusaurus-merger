# Merge multiple Docusaurus sources into one

## Scaffold generator

The scaffold generator will generate a minimal root Docusaurus project

```bash
/docs
/blogs
/src
  /pages
  /components
/static
docusaurus.config.js
```

To run the generator, first define a `docusaurus-merge.config.yaml` file as follows

```yaml
account: https://github.com/kristianmandrup
repositories:
  - name: Brand one
    repo: brand1
    docs:
      - docs
      - more-docs
    sidebars:
      - sidebar.js
    blogs:
      - blog
  - name: Brand two
    repo: brand2
    docs:
      - docs
    sidebars:
      - sidebar.js
```

After the generator has run, the merged docusaurus structure will look as follows

```bash
/docs
  /brand1
    /docs
    /more-docs
  /brand2
    /docs

/blogs
  /brand1
    ...
  /brand2
    ...
/src
  /pages
    /brand1
      ...
    /brand2
      ...
    index.js (re-export brand1, brand2)
  /components
    /brand1
      ...
    /brand2
      ...
    index.js (re-export brand1, brand2)
/static
  /brand1
    ...
  /brand2
docusaurus.config.js
```

The `docusaurus.config.js` file references the following files

- `config/presets.js` containing the `presets` docusaurus config entry
- `config/plugins.js` containing the `plugins` docusaurus config entry
- `config/theme-config.js` containing the `themeConfig` docusaurus config entry

The generator will do the following:

- each `blog` folder copied to `blogs/<name>`
- each `docs` folder copied to `docs/<name>`
- each `src` folder copied to `src/<name>`
- each `static` folder copied to `static/<name>`

This will be based on running `git archive` commands to fetch a single directory at a time as a zip

## Strategy

Copy entire tar for each repo then copy needed folders and files as needed.
This tool will take this approach as it should be the more simple and efficient.

```bash
# extract brand2
git archive --remote=https://github.com/abc/brand1 --format=tar main > brand1.tar
tar -xf brand1.tar -C brand1
mv brand1/docs root/docs/brand1
mv brand1/blog root/blogs/brand1
mv brand1/src root/src/brand1
mv brand1/static root/static/brand1
```

## Generate a plugins file with aggregated plugins

Generate a `plugins.js` file with a `'@docusaurus/plugin-content-docs'` plugin entry for each `docs` entry in the `docusaurus-merge.config.yaml` file, each referencing a `docs/<name>` entry.

```js
module.exports = {
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "product", // omitted => default instance
        path: "docs/product",
        routeBasePath: "product",
        sidebarPath: require.resolve("./sidebars/product.js"),
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "docs/community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./sidebars/community.js"),
        // ... other options
      },
    ],
  ],
};
```

## Generate aggregated navbar (top menu)

Generate the full navbar by aggregating navbar for each repo.

Each repo will have category at the top level of the navbar with the navbar of that repo included as category items.

```js
themeConfig: {
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // ... category for each repo included
          {
            to: '/docs/brand1/intro',   // To highlight the navbar item, you must link to a document, not a top-level directory
            position: 'left',
            label: 'Brand1',
            activeBaseRegex: `/docs/brand1/`,
          },
          {
            to: '/docs/brand2/intro',   // To highlight the navbar item, you must link to a document, not a top-level directory
            position: 'left',
            label: 'Brand2',
            activeBaseRegex: `/docs/brand2/`,
          },
        ]
      }
}
```

## Update references

The navbar Items will reference the original file structure, so an intelligent find and replace will be required so that:

- references to `brand1:/blog/xyz` will be renamed to `blogs/brand1/xyz`
- references to `brand1:/docs/xyz` will be renamed to `docs/brand1/xyz`
