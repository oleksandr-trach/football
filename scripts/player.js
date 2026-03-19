"use strict";

class Player {
    position;
    id;
    role;
    roleColorMap = new Map([
        ["GK", "#474747"],
        ["RB", "#972f2f"],
        ["LB", "#a16666"],
        ["CB", "#85358a"],
        ["CDM", "#46a869"],
        ["CM", "#1330c1"],
        ["RM", "#ba581f"],
        ["LM", "#99159f"],
        ["CAM", "#7c7c7c"],
        ["RW", "#2aac9d"],
        ["LW", "#751515"],
        ["ST", "#728588"]
    ]);
    zone;

    constructor(position, id, role, zone) {
        this.position = position;
        this.id = id;
        this.role = role;
        this.zone = zone;
    }

    getColorByRole(role) {
        if (this.roleColorMap.get(role)) {
            return this.roleColorMap.get(role);
        }

        return "#ffffff";
    }
}

export default Player;
