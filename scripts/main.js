"use strict";

import GameLoop from "./game-loop.js";

const background = new Image();
background.src = "./assets/field.svg"
background.onload = function() {
    const gameLoop = new GameLoop(background);
    gameLoop.setup();
};
