// Constants
const objectCount = 50;
const maxWeight = 100;
const gravitationalStrength = 100;
const maxForce = 10;
const centerWeight = 1000;
const tailLength = 100;

// Globals
let canvas;
let objects = [];

function r(n) {
    return Math.floor(Math.random() * n);
}

function update(ctx) {
    let center = new Vector(canvas.width / 2, canvas.height / 2);

    objects.forEach((object, i) => {
        objects.forEach((o, j) => {
            if (i != j) {
                let dir = Vector.subtract(o.pos, object.pos);
                let dist = dir.magnitude;
                let m1 = object.mass;
                let m2 = o.mass;
                dir.normalise().multiply(gravitationalStrength * m1 * m2 / Math.pow(dist, 2));
                object.force.add(dir);
            }
        });

        let dir = Vector.subtract(center, object.pos);
        let dist = dir.magnitude;
        let m = object.mass;
        dir.normalise().multiply(gravitationalStrength * m * centerWeight / Math.pow(dist, 2));
        object.force.add(dir);

        // Restrict magnitude of force
        if (object.force.magnitude > maxForce) {
            object.force.normalise().multiply(maxForce);
        }
        
        object.update(ctx);
    });
}

function init() {
    canvas = new Canvas(document.getElementById("game"));

    for (let i = 0; i < objectCount; i++) {
        objects.push(new Mover(r(canvas.width), r(canvas.height), r(maxWeight), tailLength));
    }

    canvas.callbacks.push(update);
}

init();