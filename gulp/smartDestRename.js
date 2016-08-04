'use strict';

var path = require('path'),
  fs = require('fs'),
  glob = require('glob'),
  fs_ex = require('fs-extra'),
  gutil = require('gulp-util'),
  through = require('through2');


var getRightFolders = function(someFolders, folderType, cutType) {
  cutType = cutType || 'head';
  gutil.log('getRightFolders: cutType', gutil.colors.bold.yellow(cutType));
  gutil.log('getRightFolders: folderType', gutil.colors.bold.yellow(folderType));

  var somePathFolders = [];
  if (typeof someFolders === 'string') {
    somePathFolders = someFolders.split(path.sep);
  } else {
    somePathFolders = someFolders;
  }
  gutil.log('getRightFolders: somePathFolders', gutil.colors.bold.yellow(somePathFolders));

  var pathCheck = folderType;
  gutil.log('getRightFolders: pathCheck', gutil.colors.bold.yellow(pathCheck));

  if (somePathFolders.indexOf(pathCheck) === -1) {
    return somePathFolders;

  } else {
    var lastIndex = somePathFolders.length - 1;
    var filteredPathFolders = somePathFolders.filter(function(item, i) {

      if (cutType === 'head') {
        if (item === pathCheck) {
          lastIndex = i + 1;
        }

        if (i <= lastIndex) {
          return true;
        }
        return false;

      } else if (cutType === 'tail') {

        if (item === pathCheck) {
          lastIndex = i + 1;
        }

        if (i >= lastIndex) {
          return true;
        }
        return false;
      }
      return false;
    });
  }

  gutil.log('getRightFolders: filteredPathFolders', gutil.colors.bold.yellow(filteredPathFolders));
  return filteredPathFolders;
};


var getUniqueFolders = function(oldPath, newPath) {
  var oldFileFolder = path.dirname(oldPath);
  var newFileFolder = path.dirname(newPath);
  gutil.log('getUniqueFolders: newFileFolder', gutil.colors.bold.yellow(newFileFolder));
  gutil.log('getUniqueFolders: oldFileFolder', gutil.colors.bold.yellow(oldFileFolder));
  var newFileFolders = newFileFolder.split(path.sep);
  var oldFileFolders = oldFileFolder.split(path.sep);
  gutil.log('getUniqueFolders: newFileFolders', gutil.colors.bold.yellow(newFileFolders));
  gutil.log('getUniqueFolders: oldFileFolders', gutil.colors.bold.yellow(oldFileFolders));
  var uniqueFolders = [];
  if (oldFileFolders.length > newFileFolders.length) {
    uniqueFolders = oldFileFolders.map(function(item, i) {
      if (item !== newFileFolders[i]) {
        return item;
      }
      return '';
    });
  } else {
    uniqueFolders = newFileFolders.map(function(item, i) {
      if (item !== oldFileFolders[i]) {
        return item;
      }
      return '';
    });
  }
  gutil.log('getUniqueFolders: uniqueFolders', gutil.colors.bold.yellow(uniqueFolders));

  uniqueFolders = uniqueFolders.filter(function(item) {
    return !!item;
  });

  gutil.log('getUniqueFolders: uniqueFolders after filtration', gutil.colors.bold.yellow(uniqueFolders));
  return uniqueFolders;
};


var smartDestRename = function(options) {  // works with gulp-concat[refactored] and gulp-sourcemaps[refactored]
  var destination = options.folder;
  var folderType = options.folderType;

  return through.obj(function renameFolderAsFile(file, enc, cb) {
    gutil.log('file.path', gutil.colors.underline.cyan(file.path));
    var losen_folder = '';
    var folders = [];
    if (file.oldPath) {
      gutil.log('file.oldPath', gutil.colors.blue(file.oldPath));
      gutil.log('file.newPath', gutil.colors.blue(file.newPath));
      folders = getUniqueFolders(file.oldPath, file.newPath);
      losen_folder = getRightFolders(folders, folderType, 'tail')[0];
      gutil.log('losen_folder', gutil.colors.green(losen_folder));
      file.path = path.join(path.dirname(file.path), losen_folder, destination, path.basename(file.path));
      gutil.log('file.path2', gutil.colors.green(file.path));
    } else {
      gutil.log('No old file path!!!', gutil.colors.bold.red('WOW!'));
      gutil.log('file.path', gutil.colors.red(file.path));
      folders = getRightFolders(path.dirname(file.path), folderType,  'head');
      file.path = path.join(folders.join(path.sep), destination, path.basename(file.path));
      gutil.log('file.path2', gutil.colors.bold.red(file.path));
    }

    cb(null, file);
  });
};

module.exports = smartDestRename;
