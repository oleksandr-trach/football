"use strict";

class UV {
    display;

    constructor(display) {
        this.display = display;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Get pixel in UV coordinate space
    ///////////////////////////////////////////////////////////////////////////////
    getUV(pX, pY) {
        return {
            u: (pX * 2.0 - this.display.getWidth()) / this.display.getMinRes(),
            v: -((pY * 2.0 - this.display.getHeight()) / this.display.getMinRes())
        };
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Revert UV coordinates back to canvas coordinates
    // Formula: u =  (2x - w) / minRes, to x = (u *  minRes + w) / 2
    //          v = -(2y - h) / minRes, to y = (v * -minRes + h) / 2
    ///////////////////////////////////////////////////////////////////////////////
    getPx(u, v) {
        return {
            x: (u * this.display.getMinRes() + this.display.getWidth()) / 2.0,
            y: (v * -this.display.getMinRes() + this.display.getHeight()) / 2.0
        };
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Get length in UV coordinate space
    // @param uvLen - length in UV
    // @return length in canvas pixels
    ///////////////////////////////////////////////////////////////////////////////
    uvLenPx(uvLen) {
        return uvLen * (this.display.getMinRes() / 2.0);
    }
}

export default UV;
