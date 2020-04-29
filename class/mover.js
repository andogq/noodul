class Mover {
    constructor(x, y, mass = 10, tailLength = 20) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.mass = mass;

        this.force = new Vector();

        this.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

        this.tailLength = tailLength;
        this.tail = [];
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
        this.tail.forEach((t) => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(t.x, t.y, 1, 0, 2 * Math.PI)
            ctx.fill();
        });
    }
}