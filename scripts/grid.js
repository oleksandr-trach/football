"use strict";

import Vec2 from "./vec2.js";
import Player from "./player.js";

class GridGenerator {
    width = 0;
    height = 0;

    cols = 3;
    rows = 6;

    cellWidth = 0;
    cellHeight = 0;

    // Zones map by i, j coordinate
    zoneMap = {
        "zones": [
            ["Z1", "Z2", "Z3"],
            ["Z4", "Z5", "Z6"],
            ["Z7", "Z8", "Z9"],
            ["Z10", "Z11", "Z12"],
            ["Z13", "Z14", "Z15"],
            ["Z16", "Z17", "Z18"]
        ]
    };

    data = {
        "Z5": [
            { id: "P1", role: "GK" },
        ],
        "Z2": [
            { id: "P2", role: "RM" }
        ],
        "Z10": [
            { id: "P3", role: "CDM" }
        ],
        "Z15": [
            { id: "P4", role: "ST" }
        ]
    };

    grid = {};

    constructor(width, height, players) {
        this.width = width;
        this.height = height;

        this.cellWidth = this.width / this.cols;
        this.cellHeight = this.height / this.rows;

        this.initGrid(players);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // You will not believe it, it is a grid width
    ///////////////////////////////////////////////////////////////////////////////
    getGridWidth() {
        return this.width;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // The same for height
    ///////////////////////////////////////////////////////////////////////////////
    getGridHeight() {
        return this.height;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Initialize grid and prepare the data
    ///////////////////////////////////////////////////////////////////////////////
    initGrid(players) {
        let offsetY = this.height / 2;

        for (let i = 0; i < this.rows; i++) {
            if (!this.grid[i]) this.grid[i] = {};

            let offsetX = -this.width / 2;

            for (let j = 0; j < this.cols; j++) {
                let zone = this.zoneMap.zones[i][j];

                let centerPosition = new Vec2(
                    offsetX + (this.cellWidth / 2),
                    offsetY - (this.cellHeight / 2)
                );

                this.getPlayers(zone, centerPosition, players);

                this.grid[i][j] = {
                    "offset_x": offsetX,
                    "offset_y": offsetY,
                    "cell_width": this.cellWidth,
                    "cell_height": this.cellHeight,
                    "cell_center": centerPosition,
                    "players": players
                };
                offsetX += this.cellWidth;
            }

            offsetY -= this.cellHeight;
        }
    }

    getPlayers(zone, centerPosition, players) {
        if (this.data[zone]) {
            this.data[zone].forEach(playerData => {
                // Create new player
                let player = new Player(
                    centerPosition,
                    playerData.id,
                    playerData.role,
                    zone
                );

                // Add player to cell players list
                players.push(player);
            });
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Return prepared and initialized grid
    ///////////////////////////////////////////////////////////////////////////////
    getGrid() {
        return this.grid;
    }
}

export default GridGenerator;
