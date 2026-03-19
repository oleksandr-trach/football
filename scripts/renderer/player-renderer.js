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

        this.context.save();

        let roleName = player.getRoleName(player.role);
        const metrics = this.context.measureText(roleName);

        const width = metrics.width * this.uv.uvLenPx(0.004);
        const height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * this.uv.uvLenPx(0.005)

        let fontSize = this.uv.uvLenPx(0.05);
        this.context.font = fontSize + "px monospace";
        this.context.fillStyle = "#ffffff";
        this.context.shadowColor = "#000000";
        this.context.shadowBlur = 5;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.fillText(
            roleName,
            position.x - (width  / 2),
            position.y + (height / 2)
        );
        this.context.restore();
    }
}

export default PlayerRenderer;
