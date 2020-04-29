class Canvas {
    constructor(el) {
        this.el = el;
        this.ctx = this.el.getContext("2d");

        this.resize();

        this.background = "black";
        this.callbacks = [];
        this.objects = [];

        this.update();
    }

    resize() {
        this.height = document.body.clientHeight;
        this.width = document.body.clientWidth;
    }

    update() {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.callbacks.forEach((callback) => callback(this.ctx));
        this.objects.forEach((object) => object.update(this.ctx));

        requestAnimationFrame(this.update.bind(this));
    }

    /*
     *  Getters and setters
     */
    set height(h) {
        this._height = h;
        this.el.height = h;
    }
    get height() {
        return this._height;
    }

    set width(w) {
        this._width = w;
        this.el.width = w;
    }
    get width() {
        return this._width;
    }
}