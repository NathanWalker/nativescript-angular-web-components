var fs = require('fs');
var path = require('path');

var fixTsConfig = function () {
  var tsConfig = 'nativescript/tsconfig.json';
  fs.readFile(tsConfig, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    // temporary fix until this: https://github.com/NativeScript/nativescript-angular/issues/205
    var fix = '{\n' +
      '  "compilerOptions": {\n' +
      '    "module": "commonjs",\n' +
      '    "target": "es5",\n' +
      '    "sourceMap": true,\n' +
      '    "experimentalDecorators": true,\n' +
      '    "emitDecoratorMetadata": true\n' +
      '  },\n' +
      '  "exclude": [\n' +
      '    "node_modules",\n' +
      '    "platforms"\n' +
      '  ]\n' +
      '}';

    fs.writeFile(tsConfig, fix, 'utf8', function (err) {
      if (err) return console.log(err);
      fixPackage();
    });
  });
};

var fixPackage = function () {
  var packagePath = 'nativescript/package.json';
  fs.readFile(packagePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var fix = '{\n' +
      '  "nativescript": {\n' +
      '    "id": "org.nativescript.nativescript",\n' +
      '    "tns-ios": {\n' +
      '      "version": "2.0.0"\n' +
      '    }\n' +
      '  },\n' +
      '  "dependencies": {\n' +
      '    "angular2": "2.0.0-beta.16",\n' +
      '    "es6-shim": "^0.35.0",\n' +
      '    "nativescript-angular": "0.0.46",\n' +
      '    "nativescript-ng2-magic": "1.1.4",\n' +
      '    "reflect-metadata": "0.1.2",\n' +
      '    "rxjs": "5.0.0-beta.2",\n' +
      '    "tns-core-modules": "^2.0.0 || 2.0.0-angular-4",\n' +
      '    "zone.js": "^0.6.12"\n' +
      '  },\n' +
      '  "devDependencies": {\n' +
      '    "babel-traverse": "6.7.6",\n' +
      '    "babel-types": "6.7.7",\n' +
      '    "babylon": "6.7.0",\n' +
      '    "filewalker": "0.1.2",\n' +
      '    "lazy": "1.0.11",\n' +
      '    "nativescript-dev-typescript": "^0.3.2",\n' +
      '    "typescript": "^1.8.10"\n' +
      '  }\n' +
      '}';

    fs.writeFile(packagePath, fix, 'utf8', function (err) {
      if (err) return console.log(err);
      fixMain();
    });
  });
};

var fixMain = function () {
  var mainPath = 'nativescript/app/main.ts';
  fs.readFile(mainPath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var fix = '// this import should be first in order to load some required settings (like globals and reflect-metadata)\n' +
      'import {nativeScriptBootstrap} from "nativescript-angular/application";\n' +
      'import {NS_ROUTER_PROVIDERS, NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";\n' +
      'import {MagicService} from "nativescript-ng2-magic";\n' +
      'MagicService.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;\n' +
      '\n' +
      '// import your root component here\n' +
      'import {AppComponent} from "./client/components/app.component";\n' +
      '\n' +
      'nativeScriptBootstrap(AppComponent, [NS_ROUTER_PROVIDERS], { startPageActionBarHidden: false });';


    fs.writeFile(mainPath, fix, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
};

var startFixes = function () {
  fs.unlink('nativescript/app/app.component.ts', function () {
    fixTsConfig();
  });
};

startFixes();


// global helpers
function copyFileSync(source, target) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

