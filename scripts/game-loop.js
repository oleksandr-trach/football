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
    moves = [];
    animationTime = 0.0;
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

            // Initiate grid changes
            this.input();

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
    // Here we are going to initiate changes
    ///////////////////////////////////////////////////////////////////////////////
    input() {
        this.moves = [
            ["P2", "Z3"],
            ["P1", "Z18"]
        ];
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Update all grid elements before drawing
    ///////////////////////////////////////////////////////////////////////////////
    update(dt) {
        this.animationTime += dt;

        let t = this.animationTime / 3;
        if (t > 1.0) t = 1.0;

        if (this.animationTime >= 3.0) this.animationTime -= 3.0;

        for (let i = 0; i < this.moves.length; i++) {
            let whichPlayer = this.moves[i][0];
            let whereTo = this.moves[i][1];

            for (let j = 0; j < this.players.length; j++) {
                if (this.players[j].id === whichPlayer) {
                    this.players[j].zone = whereTo;
                    let targetCenter = this.gridGenerator.zoneCenterMap.get(whereTo);

                    if (this.players[j].position.x !== targetCenter.position.x || this.players[j].position.y !== targetCenter.position.y) {
                        let newPosX = this.interpolation(this.players[j].startPosition.x, targetCenter.position.x, t);
                        let newPosY = this.interpolation(this.players[j].startPosition.y, targetCenter.position.y, t);

                        this.players[j].position.x = newPosX;
                        this.players[j].position.y = newPosY;
                    }
                }
            }
        }
    }

    interpolation(v0, v1, t) {
        let smoothT = t * t * (3.0 - 2.0 * t);
        return v0 + smoothT * (v1 - v0);
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
