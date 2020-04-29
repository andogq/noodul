class Mover {
    constructor(x, y, mass = 10, tailLength = 20, thickness = 1) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.mass = mass;

        this.force = new Vector();

        this.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

        this.tailLength = tailLength;
        this.tail = [];

        this.thickness = thickness;
    }

    update(ctx) {
        // Convert force to acceleration
        let acc = this.force.divide(this.mass);
        this.vel.add(acc);
        this.pos.add(this.vel);

        this.tail.push(this.pos.copy());
        if (this.tail.length > this.tailLength) this.tail.shift();

        // Clear the force vector
        this.force = new Vector();

        // Draw
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.moveTo(this.tail[0].x, this.tail[0].y);
        this.tail.forEach((t, i) => {
            if (i != 0) ctx.lineTo(t.x, t.y);
        });
        ctx.stroke();
    }
}