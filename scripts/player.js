"use strict";

class Player {
    position;
    id;
    role;
    zone;

    constructor(position, id, role, zone) {
        this.position = position;
        this.id = id;
        this.role = role;
        this.zone = zone;
    }
}

export default Player;
