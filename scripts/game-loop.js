"use strict";

import Display from "./display.js";
import UV from "./uv.js";
import GridGenerator from "./grid.js";
import Renderer from "./renderer.js";

class GameLoop {
    lastTime = 0;
    fpsInterval = 1000 / 60;

    display;
    uv;
    gridGenerator;
    grid;
    players = [];
    renderer;
    background

    constructor(background) {
        this.background = background;
        this.gameLoop = this.gameLoop.bind(this);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Initialize game loop and start animation
    ///////////////////////////////////////////////////////////////////////////////
    setup() {
        // Initialize display
        this.display = new Display();
        this.uv = new UV(this.display);

        const displayResUV = this.uv.getUV(
            this.display.getWidth(),
            this.display.getHeight()
        );
        this.gridGenerator = new GridGenerator(
            Math.abs(displayResUV.u) * 2,
            Math.abs(displayResUV.v) * 2,
            this.players
        );

        this.grid = this.gridGenerator.getGrid();
        this.renderer = new Renderer(this.display, this.uv);

        // Start game loop
        window.requestAnimationFrame(this.gameLoop);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Main game loop
    ///////////////////////////////////////////////////////////////////////////////
    gameLoop(currentTime) {
        window.requestAnimationFrame(this.gameLoop);

        const elapsed = currentTime - this.lastTime;

        if (elapsed > this.fpsInterval) {
            // We need this delta time to properly calculate elements movement
            const dt = elapsed / 1000;

            // Subtract extra milliseconds from current time to comply with frame schedule
            this.lastTime = currentTime - (elapsed % this.fpsInterval);

            // Update grid on each frame
            this.update(dt);

            // Clear the frame
            this.clear();

            // Draw updated grid
            this.draw();
        }
    }

    clear() {
        this.renderer.clearCanvas();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Update all grid elements before drawing
    ///////////////////////////////////////////////////////////////////////////////
    update(dt) {
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Draw on each frame
    ///////////////////////////////////////////////////////////////////////////////
    draw() {
        this.renderer.drawField(this.background);
        this.renderer.drawGrid(
            this.gridGenerator.getGridWidth(),
            this.gridGenerator.getGridHeight(),
            this.grid
        );
        this.renderer.drawPlayers(this.players);
    }
}

export default GameLoop;
