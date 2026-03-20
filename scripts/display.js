"use strict";

class Display {
    canvas;
    context;
    width = 0;
    height = 0;
    minRes = 0;

    ///////////////////////////////////////////////////////////////////////////////
    // Initialize canvas since it is the only display we got :)
    ///////////////////////////////////////////////////////////////////////////////
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        let resultWidth = window.innerWidth * 0.33;

        let drawRatio = (resultWidth) / this.canvas.width;
        let drawWidth = (resultWidth);
        let drawHeight = this.canvas.height * drawRatio;

        this.canvas.style.width = (drawWidth) + "px";
        this.canvas.style.height = (drawHeight) + "px";

        this.width = drawWidth;
        this.height = drawHeight;

        this.context.scale(
            this.canvas.width / drawWidth,
            this.canvas.height / drawHeight
        );

        this.minRes = Math.min(this.getWidth(), this.getHeight())
    }

    getCanvas() {
        return this.canvas;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Canvas width
    ///////////////////////////////////////////////////////////////////////////////
    getWidth() {
        return this.width;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Canvas height
    ///////////////////////////////////////////////////////////////////////////////
    getHeight() {
        return this.height;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Minimum canvas resolution, depending on canvas orientation
    ///////////////////////////////////////////////////////////////////////////////
    getMinRes() {
        return this.minRes;
    }
}

export default Display;
