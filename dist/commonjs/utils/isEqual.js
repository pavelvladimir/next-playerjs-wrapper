"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = void 0;

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

/*!
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}       Returns true if they're equal in value
 */
var isEqual = function isEqual(obj1, obj2) {
  /**
   * More accurately check the type of a JavaScript object
   * @param  {Object} obj The object
   * @return {String}     The object type
   */
  function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  function areArraysEqual() {
    // Check length
    if (obj1.length !== obj2.length) return false; // Check each item in the array

    for (var i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    } // If no errors, return true


    return true;
  }

  function areObjectsEqual() {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false; // Check each item in the object

    for (var key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) return false;
      }
    } // If no errors, return true


    return true;
  }

  function areFunctionsEqual() {
    return obj1.toString() === obj2.toString();
  }

  function arePrimitivesEqual() {
    return obj1 === obj2;
  } // Get the object type


  var type = getType(obj1); // If the two items are not the same type, return false

  if (type !== getType(obj2)) return false; // Compare based on type

  if (type === 'array') return areArraysEqual();
  if (type === 'object') return areObjectsEqual();
  if (type === 'function') return areFunctionsEqual();
  return arePrimitivesEqual();
};

exports.isEqual = isEqual;