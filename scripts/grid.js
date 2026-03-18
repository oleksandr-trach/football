"use strict";

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
            { id: "P1", role: "goalkeeper" },
            { id: "P2", role: "forward" }
        ],
        "Z2": [
            { id: "P3", role: "midfielder" }
        ],
        "Z10": [
            { id: "P3", role: "midfielder" }
        ]
    };

    grid = {};

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cellWidth = this.width / this.cols;
        this.cellHeight = this.height / this.rows;

        this.initGrid();
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
    initGrid() {
        let offsetY = this.height / 2;

        for (let i = 0; i < this.rows; i++) {
            if (!this.grid[i]) this.grid[i] = {};

            let offsetX = -this.width / 2;

            for (let j = 0; j < this.cols; j++) {
                let zone = this.zoneMap.zones[i][j];
                let players = this.getPlayers(zone);

                this.grid[i][j] = {
                    "offset_x": offsetX,
                    "offset_y": offsetY,
                    "cell_width": this.cellWidth,
                    "cell_height": this.cellHeight,
                    "center_x": offsetX + (this.cellWidth / 2),
                    "center_y": offsetY - (this.cellHeight / 2)
                };
                offsetX += this.cellWidth;
            }

            offsetY -= this.cellHeight;
        }
    }

    getPlayers(zone) {
        let players = [];

        if (this.data[zone]) {
            this.data[zone].forEach(player => {
                players.push(player);
            });
        }

        return players;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Return prepared and initialized grid
    ///////////////////////////////////////////////////////////////////////////////
    getGrid() {
        return this.grid;
    }
}

export default GridGenerator;
