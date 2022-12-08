import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// import * as fs from "fs";
// import path from "path";

const mergeSingle = (argv) => {
  if (!argv.repo) {
    console.error(`Missing repo with name of repo in config to merge`);
    return;
  }
};

const mergeAll = (argv) => {};

yargs(hideBin(process.argv))
  .command(
    "merge [repo]",
    "merge single repo",
    (yargs) => {
      return yargs.positional("repo", {
        describe: "repository to merge with latest docusaurus",
      });
    },
    mergeSingle
  )
  .command(
    "merge-all",
    "merge all named docusaurus repos in config or by names options",
    () => {},
    mergeAll
  )
  .alias("one", "merge")
  .alias("all", "merge-all")
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Verbose package info",
  })
  .option("names", {
    alias: "n",
    type: "array",
    description: "Names of repos",
  })
  .parse();
