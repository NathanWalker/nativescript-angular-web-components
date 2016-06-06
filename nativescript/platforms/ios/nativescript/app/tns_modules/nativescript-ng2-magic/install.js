// -----------------------------------------------------------
// version 1.09
// -----------------------------------------------------------
"use strict";

var debugging = false;

var fs = require('fs');
var cp = require('child_process');
var path = require('path');

var isRanFromNativeScript = fs.existsSync("../../app/App_Resources");
var hasNativeScript = fs.existsSync("../../nativescript");

// Figure out angular Seed Path for symlink...
var angularSeedPath = '../../src/';
var seeds = ['client', 'app'];
var seedId = 0;

// Search for the actual seed, depending on where we are run from
for (var i=0;i<seeds.length;i++) {
    if (fs.existsSync(angularSeedPath+seeds[i])) {
        seedId = i; break;
    }
}
angularSeedPath += seeds[seedId] + "/";
var nativescriptClientPath = '../../nativescript/app/' + seeds[seedId] + "/";

if (debugging) {
    console.log("Path is:", angularSeedPath, nativescriptClientPath);
}


// Root SymLink Code for Windows
if (process.argv.length > 2) {
    if (process.argv[2] === 'symlink') {
        createRootSymLink();
        console.log("Created Symlink");
    }
    return 0;
}

if (!hasNativeScript && !isRanFromNativeScript) {
    console.log("Installing NativeScript Angular 2 Template...");
    cp.execSync('tns create nativescript --template  https://github.com/NativeScript/template-hello-world-ng', {cwd: '../..'});
    console.log("Installing NativeScript support files...");
    cp.execSync('npm install', {cwd: '../../nativescript'});

    console.log("Installing support files");
    if (process.platform === 'darwin') {
        try {
            cp.execSync('npm install image-to-ascii-cli', {cwd: '../..'});
        }
        catch (Err) {
            console.log("Install Error", Err);
        }
    }

    console.log("Configuring...");
    if (debugging) {
        cp.execSync('tns plugin add ../node_modules/nativescript-ng2-magic', {cwd: '../../nativescript'});
    } else {
        cp.execSync('tns plugin add nativescript-ng2-magic', {cwd: '../../nativescript'});
    }

    // remove sample component
    if (fs.existsSync('../../nativescript/app/app.component.ts')) {
        console.log("Removing sample component");
        fs.unlinkSync('../../nativescript/app/app.component.ts');
    }



    // We need to create a symlink
    try {
        createSymLink();
    } catch (err) {
        if (debugging) {
            console.log("Symlink error: ", err);
        }
        // Failed, which means they weren't running root; so lets try to get root
        AttemptRootSymlink();
    }

    // Might silent fail on OSX, so we have to see if it exists
    if (!fs.existsSync(nativescriptClientPath)) {
        AttemptRootSymlink();
    }

    // This does not look good on windows; windows ansi support in node sucks...  So we aren't going to do this in windows
    if (process.platform === "darwin") {
        // image to ascii uses GM which may not be installed, so if it isn't installed; don't print the error message
		try {
          var ascii = cp.execSync('image-to-ascii -i https://cdn.filestackcontent.com/XXMT4f8S8OGngNsJj0pr', {cwd: '../image-to-ascii-cli/bin/'}).toString();
          if (ascii.length > 30) {
            console.log(ascii);
          }
	    } 
		catch (err) {
			// Do Nothing; if the site can't be resolved; we don't want to fail the script
		}
    }

    displayFinalHelp();

    if (!fs.existsSync(nativescriptClientPath)) {
        console.log("We were unable to create a symlink  - from -");
        console.log("  ", resolve(angularSeedPath), "    - to - ");
		console.log("  ", resolve(nativescriptClientPath));
        console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
    }


}

if (isRanFromNativeScript) {
    if (!fs.existsSync('installed.ns') ) {
        fs.writeFileSync('installed.ns', 'installed');
        fixTsConfig();
        fixNativeScriptPackage();
        fixAngularPackage();
        fixMainFile( figureOutRootComponent());

        // when being run from inside {N} app, the directory is different
        var srcRoot = '../../../src/';
        for (var i=0;i<seeds.length;i++) {
            if (fs.existsSync(srcRoot + seeds[i])) {
                seedId = i; break;
            }
        }
        fixGitIgnore('nativescript/app/' + seeds[seedId]);
        console.log("Completed Install");
    } else {
        console.log("We have already been installed in the NativeScript app as a plugin.");
        return 0;
    }
}

return 0;

/**
 * Searches for the bootstrap file until it finds one....
 * @returns {string}
 */
function figureOutRootComponent() {
    var rootComponents = ['../../../src/bootstrap.ts', '../../../src/app.ts', '../../../boot.ts', '../../../src/main.ts'];
    for (var i=0;i<rootComponents.length; i++) {
        if (fs.existsSync(rootComponents[i])) {
            var result = processBootStrap(rootComponents[i]);
            if (result) { return result; }
        }
    }
    // Return a default component, if we can't find one...
    return {
      name: 'AppComponent',
      path: './client/components/app.component'
    };
}

/**
 * Parses the bootstrap to figure out the default bootstrap component
 * @param file
 * @returns {*}
 */
function processBootStrap(file) {
    var data = fs.readFileSync(file).toString();
    var idx = data.indexOf('bootstrap(');
    if (idx === -1) { return null; }
    else { idx+=10; }

    var odx1 = data.indexOf(',', idx);
    var odx2 = data.indexOf(')', idx);
    if (odx2 < odx1 && odx2 !== -1 || odx1 === -1) { odx1 = odx2; }
    if (odx1 === -1) { return null; }
    var componentRef = data.substring(idx, odx1);
    var exp = "import\\s+\\{("+componentRef+")\\}\\s+from+\\s+[\'|\"](\\S+)[\'|\"][;?]";
    if (debugging) {
        console.log("Searching for", exp);
    }

    var result = function (r) {
      return {
        name: r[1],
        path: r[r.length - 1]
      };
    };
    //noinspection JSPotentiallyInvalidConstructorUsage
    var r = RegExp(exp, 'i').exec(data);
    if (r === null || r.length <= 1) {
      // check if using current style guide with spaces
      exp = "import\\s+\\{\\s+("+componentRef+")\\,\\s+([A-Z]{0,300})\\w+\\s+\\}\\s+from+\\s+[\'|\"](\\S+)[\'|\"][;?]";
      if (debugging) {
        console.log("Searching for", exp);
      }
      r = RegExp(exp, 'i').exec(data);
      if (r === null || r.length <= 1) {
        // try just spaces with no angular cli style (, environment) etc.
        exp = "import\\s+\\{\\s+(" + componentRef + ")\\s+\\}\\s+from+\\s+[\'|\"](\\S+)[\'|\"][;?]";
        if (debugging) {
          console.log("Searching for", exp);
        }
        r = RegExp(exp, 'i').exec(data);
        if (r !== null && r.length > 1) {
          return result(r);
        }
      } else {
        // angular cli
        return result(r);
      }     
      return null;
    }
    return result(r);
}

/**
 * This will attempt to run the install script as root to make a symlink
 *
 */
function AttemptRootSymlink() {

    if (process.platform === 'win32') {
        var curPath = resolve("./");
        if (debugging) {
            console.log("RootSymlink Base path is", curPath);
        }
        cp.execSync("powershell -Command \"Start-Process 'node' -ArgumentList '"+curPath+"/install.js symlink' -verb runas\"");
    } else {        
		console.log("To automatically create a SymLink between your web app and NativeScript, we need root for a second.");
		cp.execSync("sudo "+process.argv[0] + " " + process.argv[1] +" symlink");
    }
}

/**
 * Create the symlink when running as root
 */
function createRootSymLink() {
    var li1 = process.argv[1].lastIndexOf('\\'), li2 = process.argv[1].lastIndexOf('/');
    if (li2 > li1) { li1 = li2; }
    var AppPath = process.argv[1].substring(0,li1);
    var p1 = resolve(AppPath + "/" + nativescriptClientPath);
    var p2 = resolve(AppPath + "/" + angularSeedPath);
    if (debugging) {
        console.log("Path: ", p1, p2);
    }
    fs.symlinkSync(p2,p1,'junction');
}

/**
 * Create Symlink
 */
function createSymLink() {
    if (debugging) {
        console.log("Attempting to Symlink", angularSeedPath, nativescriptClientPath);
    }
    fs.symlinkSync(resolve(angularSeedPath),resolve(nativescriptClientPath),'junction');
}

/**
 * This fixes the TS Config file in the nativescript folder
 */
function fixTsConfig() {
    var tsConfig={}, tsFile = '../../tsconfig.json';
    if (fs.existsSync(tsFile)) {
        tsConfig = require(tsFile);
    }
    if (!tsConfig.compilerOptions) {
        tsConfig.compilerOptions = {
            module: 'commonjs',
            target: 'es5',
            sourceMap:true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        };
    }

    // See: https://github.com/NativeScript/nativescript-angular/issues/205
    tsConfig.compilerOptions.noEmitHelpers = false;
    tsConfig.compilerOptions.noEmitOnError = false;

    if (!tsConfig.exclude) {
        tsConfig.exclude = [];
    }
    if (tsConfig.exclude.indexOf('node_modules') === -1) {
        tsConfig.exclude.push('node_modules');
    }
    if (tsConfig.exclude.indexOf('platforms') === -1) {
        tsConfig.exclude.push('platforms');
    }

    fs.writeFileSync(tsFile, JSON.stringify(tsConfig, null, 4), 'utf8');
}

/**
 * Fix the NativeScript Package file
 */
function fixNativeScriptPackage() {
    var packageJSON = {}, packageFile = '../../package.json';
    packageJSON.name = "NativeScriptApp";
    packageJSON.version = "0.0.0";
  
    // var AngularJSON = {};
    if (fs.existsSync(packageFile)) {
        packageJSON = require(packageFile);
    } else {
        console.log("This should not happen, your are missing your package.json file!");
        return;
    }
    // if (fs.existsSync('../angular2/package.json')) {
    //     AngularJSON = require('../angular2/package.json');
    // } else {
    //     // Copied from the Angular2.0.0-beta-16 package.json, this is a fall back
    //     AngularJSON.peerDependencies = {
    //         "es6-shim": "^0.35.0",
    //         "reflect-metadata": "0.1.2",
    //         "rxjs": "5.0.0-beta.6",
    //         "zone.js": "^0.6.12"
    //     };
    // }

    packageJSON.nativescript['tns-ios'] = { version: "2.0.0" };
    packageJSON.nativescript['tns-android'] = {version: "2.0.0" };

    // Copy over all the Peer Dependencies
    // for (var key in AngularJSON.peerDependencies) {
    //     if (AngularJSON.peerDependencies.hasOwnProperty(key)) {
    //         packageJSON.dependencies[key] = AngularJSON.peerDependencies[key];
    //     }
    // }


    // TODO: Can we get these from somewhere rather than hardcoding them, maybe need to pull/download the package.json from the default template?
    if (!packageJSON.devDependencies) {
        packageJSON.devDependencies = {};
    }
    packageJSON.devDependencies["babel-traverse"] = "6.9.0";
    packageJSON.devDependencies["babel-types"] = "6.9.0";
    packageJSON.devDependencies.babylon = "6.8.0";
    packageJSON.devDependencies.filewalker = "0.1.2";
    packageJSON.devDependencies.lazy = "1.0.11";
    packageJSON.devDependencies["nativescript-dev-typescript"] = "^0.3.2";
    packageJSON.devDependencies.typescript = "^1.8.10";

    fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 4), 'utf8');
}

/**
 * Fix the Angular Package
 */
function fixAngularPackage() {
    var packageJSON = {}, packageFile = '../../../package.json';
    if (fs.existsSync(packageFile)) {
        packageJSON = require(packageFile);
    } else {
        console.log("This should not happen, your are missing your main package.json file!");
        return;
    }

    if (!packageJSON.scripts) {
        packageJSON.scripts = {};
    }

    packageJSON.scripts["start.ios"] = "cd nativescript && tns emulate ios";
    packageJSON.scripts["start.livesync.ios"] = "cd nativescript && tns livesync ios --emulator --watch";
    packageJSON.scripts["start.android"] = "cd nativescript && tns emulate android";
    packageJSON.scripts["start.livesync.android"] = "cd nativescript && tns livesync android --emulator --watch";

    fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 4), 'utf8');
}

/**
 * Fix the Main NativeScript File
 * @param component
 */
function fixMainFile(component) {
  var mainTS = '', mainFile = '../../app/main.ts';
  if (fs.existsSync(mainFile)) {
    mainTS = fs.readFileSync(mainFile).toString();
  } 

  if (mainTS.indexOf('MagicService') === -1) {
    // has not been previously modified
    var fix = '// this import should be first in order to load some required settings (like globals and reflect-metadata)\n' +
      'import {nativeScriptBootstrap} from "nativescript-angular/application";\n' +
      'import {NS_ROUTER_PROVIDERS, NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";\n' +
      'import {MagicService} from "nativescript-ng2-magic";\n' +
      'MagicService.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;\n' +
      '\n' +
      '// import your root component here\n' +
      'import {' + component.name + '} from "' + component.path + '";\n' +
      '\n' +
      'nativeScriptBootstrap(' + component.name + ', [NS_ROUTER_PROVIDERS], { startPageActionBarHidden: false });';


    fs.writeFileSync(mainFile, fix, 'utf8');
  }
}

/**
 * Fix .gitignore
 * @param path
 */
function fixGitIgnore(ignorePattern) {
  var fileString = '', ignoreFile = '../../../.gitignore';
  if (fs.existsSync(ignoreFile)) {
    fileString = fs.readFileSync(ignoreFile).toString();
  } 

  if (fileString.indexOf(ignorePattern) === -1) {
    // has not been previously modified
    var fix = fileString +
      '\n' +
      ignorePattern;


    fs.writeFileSync(ignoreFile, fix, 'utf8');
  }
}

/**
 * Display final help screen!
 */
function displayFinalHelp()
{
    console.log("-------------- Welcome to the Magical World of NativeScript -----------------------------");
    console.log("To finish, follow this guide https://github.com/NathanWalker/nativescript-ng2-magic#usage");
    console.log("After you have completed the steps in the usage guide, you can then:");
    console.log("");
    console.log("Run your app in the iOS Simulator with these options:");
    console.log("  npm run start.ios");
    console.log("  npm run start.livesync.ios");
    console.log("");
    console.log("Run your app in an Android emulator with these options:");
    console.log("  npm run start.android");
    console.log("  npm run start.livesync.android");
    console.log("-----------------------------------------------------------------------------------------");
    console.log("");
}

function splitPath(v) {
    var x;
    if (v.indexOf('/') !== -1) {
        x = v.split('/');
    } else {
        x = v.split("\\");
    }
    return x;
}

function resolve(v) {
    var cwdPath = splitPath(process.argv[1]);
    // Kill the Script name
    cwdPath.length = cwdPath.length - 1;

    var resolvePath = splitPath(v);

    // Eliminate a trailing slash/backslash
    if (cwdPath[cwdPath.length-1] === "") { cwdPath.pop(); }

    if (v[0] === '/' || v[0] === "\\") { cwdPath = []; }
    for (var i=0;i<resolvePath.length;i++) {
        if (resolvePath[i] === '.' || resolvePath[i] === "") { continue; }
        if (resolvePath[i] === '..') { cwdPath.pop(); }
        else { cwdPath.push(resolvePath[i]); }
    }
    if (process.platform === 'win32') {
        var winResult = cwdPath.join("\\");
        if (winResult[winResult.length-1] === "\\") { winResult = winResult.substring(0, winResult.length - 1); }
        return winResult;
    } else {
		var result = cwdPath.join('/');
		if (result[0] !== '/') { result = '/' + result; }
		if (result[result.length-1] === '/') { result = result.substring(0, result.length - 1); }
        return result;
    }

}
