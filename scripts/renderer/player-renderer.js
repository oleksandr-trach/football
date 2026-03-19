"use strict";

class PlayerRenderer {
    context;
    uv;

    constructor(context, uv) {
        this.context = context;
        this.uv = uv;
    }

    draw(player) {
        this.context.save();

        let position = this.uv.getPx(
            player.position.x,
            player.position.y
        );

        this.context.beginPath();
        this.context.arc(
            position.x,
            position.y,
            this.uv.uvLenPx(0.08),
            0,
            2 * Math.PI
        );
        this.context.fillStyle = player.getColorByRole(player.role);
        this.context.fill();

        this.context.shadowColor = "#000000";
        this.context.shadowBlur = 10;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;

        this.context.lineWidth = 1;
        this.context.strokeStyle = "#ffffff";
        this.context.stroke();

        this.context.restore();
    }
}

export default PlayerRenderer;
