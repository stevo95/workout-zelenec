const fs       = require('fs');
const { exec } = require('child_process');
const path     = require('path');
const ModClean = require('modclean').ModClean;


const COLOR = {
  YELLOW: '\x1b[33m',
  GREEN:  '\x1b[32m',
  RESET:  '\x1b[0m',
};


const runCmd = (cmd, opts, pipeStdOut = true) => new Promise((resolve, reject) => {
  const childProcess = exec(
    cmd,
    {maxBuffer: 1000 * 1024, ...opts},
    error => {
      if (error) {
        reject(error);
      }
      resolve();
    },
  );

  if (pipeStdOut) {
    childProcess.stdout.on('data', console.log);
  }
});


const runCmds = (...cmds) => cmds.reduce(
  (running, next) => running.then(() => runCmd(next)),
  Promise.resolve(),
);


const runCmdsFrom = (workingDir) => (...cmds) => cmds.reduce(
  (running, next) => running.then(() => runCmd(next, { cwd: workingDir })),
  Promise.resolve(),
);


const throwIfMissingDir = (dirName) => {
  if (!fs.existsSync(dirName)) {
    throw new Error(
      `Cannot find directory "${dirName}".`
      + `\nYou may not be in the right place, you appear to be in "${process.cwd()}"`,
    );
  }
};


const removeDirIfExists = (dirName) => {
  if (fs.existsSync(dirName)) {
    fs.rmdirSync(dirName, { recursive: true, force: true });
  }
};

const removeDirs         = (dirNames) => dirNames.forEach(removeDirIfExists);
const removeFileIfExists = removeDirIfExists;
const removeFiles        = removeDirs;

const cleanNodeModules = async (modulesPath) => {
  let mc = new ModClean({
    cwd:                modulesPath,
    additionalPatterns: ['*.ts', '*.md'],
  });

  try {
    let files   = await mc._find();
    let results = await mc._process(files);

    console.log('Deleted Files Total:', results.deleted.length);
  } catch (error) {
    console.error(error);
  }

  if (mc.errors.length) {
    console.error(`Node module cleanup errors: ${JSON.stringify(mc.errors, null, 4)}`);
  }
};

const zipDirsIn = (dirName) => {
  const childDirs = fs
    .readdirSync(dirName, { withFileTypes: true })
    .filter(child => child.isDirectory());

  return Promise.all(
    childDirs.map(dir => {
      console.log(`Making ${COLOR.YELLOW}${dirName}/${dir.name}.zip${COLOR.RESET}...`);

      return runCmd(
        `touch -t 201201010000 ${dir.name}/`,
        { cwd: dirName, maxBuffer: 50 * 1024 * 1024 },
        false,
      ).then(
        () => runCmd(
          `zip -r -X -q ${dir.name}.zip ${dir.name}`,
          { cwd: dirName, maxBuffer: 50 * 1024 * 1024 },
          false,
        ),
      ).then(
        () => runCmd(
          `touch -t 201201010000 ${dir.name}.zip`,
          { cwd: dirName, maxBuffer: 50 * 1024 * 1024 },
          false,
        ),
      );

    }),
  );
};


const getArg = (args, targetArg) => {
  const argMatch = args.indexOf(targetArg);

  if (argMatch === -1) {
    return undefined;
  }

  return args[argMatch + 1];
};


module.exports = {
  COLOR,
  throwIfMissingDir,
  cleanNodeModules,
  removeDirIfExists,
  removeDirs,
  removeFileIfExists,
  removeFiles,
  runCmd,
  runCmds,
  runCmdsFrom,
  zipDirsIn,
  getArg,
};
