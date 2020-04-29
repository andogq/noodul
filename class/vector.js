class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v = new Vector()) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v = new Vector()) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(n = 1) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    divide(n = 1) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    normalise() {
        let magnitude = this.magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    /*
     * Getters and setters
     */
    get magnitude() {
        return Math.hypot(this.x, this.y);
    }

    /*
     * Static
     */
    static add(v1 = new Vector(), v2 = new Vector()) {
        let v = v1.copy();
        v.add(v2);
        return v;
    }


    static subtract(v1 = new Vector(), v2 = new Vector()) {
        let v = v1.copy();
        v.subtract(v2);
        return v;
    }
}