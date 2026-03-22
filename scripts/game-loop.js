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
    moves = [
        [["P2", "Z3"], ["P4", "Z13"]],
        [["P1", "Z18"], ["P3", "Z8"]],
        [["P1", "Z17"]],
        [["P1", "Z14"]]
    ];
    move = [];
    animationTime = 0.0;
    moveTime = 0.0;
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
            this.input(dt);

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
    input(dt) {
        this.moveTime += dt;
        if (this.moveTime >= 3.0) {
            this.move = [];
            if (this.moves.length > 0) {
                // Reset animation time
                this.animationTime = 0;
                    let moves = this.moves.shift();
                    for (let i = 0; i < moves.length; i++) {
                        this.move.push(moves[i]);
                    }
            }
            this.moveTime -= 3.0;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Update all grid elements before drawing
    ///////////////////////////////////////////////////////////////////////////////
    update(dt) {
        // If no moves just do nothing
        if (this.move.length === 0) return;
        if (this.animationTime === 2.0) return;

        this.animationTime += dt;

        let t = this.animationTime / 2.0;
        if (t > 1.0) t = 1.0;

        if (this.animationTime >= 2.0) {
            this.animationTime = 2.0;
        }

        for (let i = 0; i < this.move.length; i++) {
            let whichPlayer = this.move[i][0];
            let whereTo = this.move[i][1];

            for (let j = 0; j < this.players.length; j++) {
                if (this.players[j].id === whichPlayer) {
                    this.players[j].zone = whereTo;
                    let targetCenter = this.gridGenerator.zoneCenterMap.get(whereTo);

                    if (this.players[j].position !== targetCenter.position) {
                        let newPosX = this.interpolation(this.players[j].startPosition.x, targetCenter.position.x, t);
                        let newPosY = this.interpolation(this.players[j].startPosition.y, targetCenter.position.y, t);

                        this.players[j].position.x = newPosX;
                        this.players[j].position.y = newPosY;

                        if (t === 1) {
                            this.players[j].startPosition = targetCenter.position;
                        }
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
