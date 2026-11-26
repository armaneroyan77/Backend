
// my-require.js

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const myCache = {};

function resolveFilename(request, fromDir) {

    const filename = path.resolve(fromDir, request);
    function resolveAsFile(basePath) {

        if (
            fs.existsSync(basePath) &&
            fs.statSync(basePath).isFile()
        ) {
            return basePath;
        }

        if (
            fs.existsSync(basePath + '.js') &&
            fs.statSync(basePath + '.js').isFile()
        ) {
            return basePath + '.js';
        }

        if (
            fs.existsSync(basePath + '.json') &&
            fs.statSync(basePath + '.json').isFile()
        ) {
            return basePath + '.json';
        }

        return null;
    }

    const file = resolveAsFile(filename);

    if (file) {
        return file;
    }

    if (
        fs.existsSync(filename) &&
        fs.statSync(filename).isDirectory()
    ) {

        const packagePath = path.join(
            filename,
            'package.json'
        );

        if (fs.existsSync(packagePath)) {

            const packageData = JSON.parse(
                fs.readFileSync(packagePath, 'utf8')
            );

            if (packageData.main) {

                const mainPath = path.resolve(
                    filename,
                    packageData.main
                );

                const mainFile = resolveAsFile(mainPath);

                if (mainFile) {
                    return mainFile;
                }
            }
        }

        const indexPath = path.join(
            filename,
            'index.js'
        );

        if (
            fs.existsSync(indexPath) &&
            fs.statSync(indexPath).isFile()
        ) {
            return indexPath;
        }
    }

    const error = new Error(
        `Cannot find module '${request}'`
    );
    error.code = 'MODULE_NOT_FOUND';
    throw error;
}

function checkCache(filename) {
    return Object.hasOwn(myCache, filename);
}

function loadModule(filename) {
    const module = {
        exports: {},
        filename: filename,
        loaded: false
    };
    myCache[filename] = module;
    try {
        const extension = path.extname(filename);
        if (extension === '.json') {
            const text = fs.readFileSync(
                filename,
                'utf8'
            );
            module.exports = JSON.parse(text);
            module.loaded = true;
            return module.exports;
        }

        if (extension === '.js') {
            const code = fs.readFileSync(filename,'utf8');
            const compiledFunction = vm.compileFunction(
                code,
                [
                    'exports',
                    'require',
                    'module',
                    '__filename',
                    '__dirname'
                ],
                {
                    filename
                }
            );
            const localRequire = (request) => {
              return myRequire(
                request,
                path.dirname(filename)
              );
            };
            compiledFunction.call(
              module.exports,
              module.exports,
              localRequire,
              module,
              filename,
              path.dirname(filename)
            );
            module.loaded = true;
            return module.exports;

        }

        throw new Error(`Unsupported file extension: ${extension}`);

    } catch (error) {
        delete myCache[filename];
        throw error;
    }

}
function myRequire(request, fromDir = process.cwd()) {
    const filename = resolveFilename(
        request,
        fromDir
    );

    if (checkCache(filename)) {
        return myCache[filename].exports;
    }

    return loadModule(filename);
}

myRequire.cache = myCache;

module.exports = myRequire;
