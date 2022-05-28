"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Player", {
  enumerable: true,
  get: function get() {
    return _Player.Player;
  }
});
Object.defineProperty(exports, "usePlayerRef", {
  enumerable: true,
  get: function get() {
    return _Player.usePlayerRef;
  }
});
Object.defineProperty(exports, "PlayerProvider", {
  enumerable: true,
  get: function get() {
    return _PlayerProvider.PlayerProvider;
  }
});
exports.getPlayer = void 0;

var _Player = require("./Player");

var _PlayerProvider = require("./PlayerProvider");

// eslint-disable-next-line react-hooks/rules-of-hooks
var getPlayer = function getPlayer() {
  return (0, _Player.usePlayerRef)(true);
};

exports.getPlayer = getPlayer;