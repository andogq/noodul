// Parameters
const parameters = {
    "Object Count": 50,
    "Max Weight": 100,
    "Gravitational Strength": 100,
    "Max Force": 10,
    "Center Weight": 1000,
    "Tail Length": 100
}

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
                dir.normalise().multiply(parameters["Gravitational Strength"] * m1 * m2 / Math.pow(dist, 2));
                object.force.add(dir);
            }
        });

        let dir = Vector.subtract(center, object.pos);
        let dist = dir.magnitude;
        let m = object.mass;
        dir.normalise().multiply(parameters["Gravitational Strength"] * m * parameters["Center Weight"] / Math.pow(dist, 2));
        object.force.add(dir);

        // Restrict magnitude of force
        if (object.force.magnitude > parameters["Max Force"]) {
            object.force.normalise().multiply(parameters["Max Force"]);
        }
        
        object.update(ctx);
    });
}

function start() {
    objects = [];
    for (let i = 0; i < parameters["Object Count"]; i++) {
        objects.push(new Mover(r(canvas.width), r(canvas.height), r(parameters["Max Weight"]), parameters["Tail Length"]));
    }

}

function init() {
    canvas = new Canvas(document.getElementById("game"));
    canvas.callbacks.push(update);

    let edit = document.getElementById("edit");
    Object.keys(parameters).forEach((key) => {
        let row = document.createElement("div");

        let name = document.createElement("h3");
        name.innerText = key;
        row.appendChild(name);

        let input = document.createElement("input");
        input.type = "number";
        input.value = parameters[key];
        input.addEventListener("input", (e) => {
            parameters[key] = Number(e.target.value);
            start();
        });
        row.appendChild(input);

        edit.appendChild(row);
    });

    document.body.addEventListener("click", (e) => {
        if (e.target == edit) edit.classList.add("hidden");
        else edit.classList.remove("hidden");

    });

    start();
}

init();