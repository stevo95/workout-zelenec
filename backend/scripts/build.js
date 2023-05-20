'use strict';

/*
 This script builds this AWS Function App into a deployable form
 */

const tools = require('./scriptTools');
const fs    = require('fs');
const path  = require('path');

const watch = !!process.argv.find(arg => arg === '--watch');

// Paths
const runningDir = process.cwd();

const projDir = {
  root:         runningDir,
  tsConfigFile: path.join(runningDir, 'tsconfig.json'),
  lambdasDir:   path.join(runningDir, 'lambdas'),
  layersDir:    path.join(runningDir, 'layers'),
  build:        path.join(runningDir, 'build'),
};

const buildDir = {
  root:         projDir.build,
  lambdasDir:   path.join(projDir.build, 'lambdas'),
  layersDir:    path.join(projDir.build, 'layers'),
  npmDepsLayer: path.join(projDir.build, 'layers', 'lambdas_example_npm_packages', 'nodejs', 'node_modules'),
};


// Path Validation
tools.throwIfMissingDir(projDir.lambdasDir);
tools.throwIfMissingDir(projDir.layersDir);

// Build App
const commands = {
  installProdDeps:   `npx yarn install --production --modules-folder ${buildDir.npmDepsLayer}`,
  compileTypescript: `npx tsc --project ${projDir.tsConfigFile}`,
};

const buildApp = () => {
  tools.removeDirIfExists(buildDir.root);

  return tools.runCmds(
    commands.compileTypescript,
    commands.installProdDeps,
  ).then(
    () => Promise.all([
      new Promise(
        (resolve) => {
          tools.removeDirIfExists(path.join(buildDir.npmDepsLayer, '@types'));
          resolve();
        },
      ),
      tools.cleanNodeModules(buildDir.npmDepsLayer),
    ]),
  ).then(
    () => Promise.all([
      tools.zipDirsIn(buildDir.lambdasDir),
      tools.zipDirsIn(buildDir.layersDir),
    ]),
  );
};


if (watch) {
  console.log(`Watching: ${projDir.root}`);
  fs.watch(
    projDir.root,
    {
      persistent: true,
      interval:   1000,
    },
    () => {
      console.log('\n---\n');
      buildApp().catch(console.error);
    },
  );
} else {
  buildApp(); // Don't catch so that the command errors out
}
