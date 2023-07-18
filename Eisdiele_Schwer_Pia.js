"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <18.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1, mein Bruder, chat Gpt 
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", handleLoad);
    let MOOD;
    (function (MOOD) {
        MOOD[MOOD["HAPPY"] = 0] = "HAPPY";
        MOOD[MOOD["OKAY"] = 1] = "OKAY";
        MOOD[MOOD["NEUTRAL"] = 2] = "NEUTRAL";
        MOOD[MOOD["SAD"] = 3] = "SAD";
        MOOD[MOOD["ANGRY"] = 4] = "ANGRY";
    })(MOOD = Eisdiele.MOOD || (Eisdiele.MOOD = {}));
    let FLAVOUR;
    (function (FLAVOUR) {
        FLAVOUR[FLAVOUR["STRAWBERRY"] = 0] = "STRAWBERRY";
        FLAVOUR[FLAVOUR["CHOCOLATE"] = 1] = "CHOCOLATE";
        FLAVOUR[FLAVOUR["LEMON"] = 2] = "LEMON";
        FLAVOUR[FLAVOUR["SMURF"] = 3] = "SMURF";
    })(FLAVOUR = Eisdiele.FLAVOUR || (Eisdiele.FLAVOUR = {}));
    let TOPPING;
    (function (TOPPING) {
        TOPPING[TOPPING["CREAM"] = 0] = "CREAM";
        TOPPING[TOPPING["FRUIT"] = 1] = "FRUIT";
    })(TOPPING = Eisdiele.TOPPING || (Eisdiele.TOPPING = {}));
    let DECORATION;
    (function (DECORATION) {
        DECORATION[DECORATION["CHERRY"] = 0] = "CHERRY";
        DECORATION[DECORATION["CHOCOSAUCE"] = 1] = "CHOCOSAUCE";
        DECORATION[DECORATION["SPRINKLES"] = 2] = "SPRINKLES";
        DECORATION[DECORATION["GLITTER"] = 3] = "GLITTER";
    })(DECORATION = Eisdiele.DECORATION || (Eisdiele.DECORATION = {}));
    class Vector {
        _x;
        _y;
        constructor(x = 0, y = 0) {
            this._x = x;
            this._y = y;
        }
        // Getters
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        // Setters
        set x(value) {
            this._x = value;
        }
        set y(value) {
            this._y = value;
        }
        equals(other, tolerance = 0.01) {
            return Math.abs(this._x - other._x) < tolerance && Math.abs(this._y - other._y) < tolerance;
        }
    }
    Eisdiele.Vector = Vector;
    Eisdiele.images = {};
    function handleLoad(_event) {
        let backgroundCanvas = document.querySelector("#background"); //get canvas Element from HTML 
        let foregroundCanvas = document.querySelector("#foreground"); //get canvas Element from HTML
        if (!backgroundCanvas)
            return;
        if (!foregroundCanvas)
            return;
        backgroundCanvas.width = window.innerWidth * 0.48; //give backgroundCanvas width
        backgroundCanvas.height = window.innerHeight * 0.96; //give backgroundCanvas heigth
        foregroundCanvas.width = window.innerWidth * 0.48; //give foregroundCanvas width
        foregroundCanvas.height = window.innerHeight * 0.96; //give foregroundCanvas heigth
        Eisdiele.backgroundCtx = backgroundCanvas.getContext('2d'); //get canvas rendering context
        Eisdiele.foregroundCtx = foregroundCanvas.getContext('2d');
        Eisdiele.Customers = new Eisdiele.CustomerList();
        Eisdiele.Customers.addCustomer();
        let seat0 = document.querySelector("#seat0"); //select divs from html & add click event Listener
        seat0.addEventListener("click", Eisdiele.Customers.sendToSeat0);
        let seat1 = document.querySelector("#seat1");
        seat1.addEventListener("click", Eisdiele.Customers.sendToSeat1);
        let seat2 = document.querySelector("#seat2");
        seat2.addEventListener("click", Eisdiele.Customers.sendToSeat2);
        let seat3 = document.querySelector("#seat3");
        seat3.addEventListener("click", Eisdiele.Customers.sendToSeat3);
        let seat4 = document.querySelector("#seat4");
        seat4.addEventListener("click", Eisdiele.Customers.sendToSeat4);
        let seat5 = document.querySelector("#seat5");
        seat5.addEventListener("click", Eisdiele.Customers.sendToSeat5);
        loadImage("images/fruit.png", "fruit"); //give Picture Data a name
        loadImage("images/cream.png", "cream");
        loadImage("images/cherry.png", "cherry");
        loadImage("images/choco.png", "choco");
        loadImage("images/sprinkles.png", "sprinkles");
        loadImage("images/glitter.png", "glitter");
        drawBackground(); //draw static background
        // let testIce = new Ice([FLAVOUR.CHOCOLATE, FLAVOUR.LEMON], TOPPING.CREAM,DECORATION.GLITTER);
        // testIce.draw()
        setInterval(update, 20); //update
    }
    function update() {
        Eisdiele.foregroundCtx.clearRect(0, 0, Eisdiele.foregroundCtx.canvas.width, Eisdiele.foregroundCtx.canvas.height); //clear canvas foreground for moving objects
        Eisdiele.Customers.update();
    }
    function loadImage(url, imageName) {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            Eisdiele.images[imageName] = img;
        };
    }
    function drawBackground() {
        let cw = Eisdiele.foregroundCtx.canvas.width;
        let ch = Eisdiele.foregroundCtx.canvas.height;
        drawSeat(new Vector(0.12 * cw, 0.76 * ch)); //draw the seats on different positions not with pixel
        drawSeat(new Vector(0.27 * cw, 0.76 * ch));
        drawSeat(new Vector(0.41 * cw, 0.76 * ch));
        drawSeat(new Vector(0.55 * cw, 0.76 * ch));
        drawSeat(new Vector(0.70 * cw, 0.76 * ch));
        drawSeat(new Vector(0.84 * cw, 0.76 * ch));
        drawCounter(new Vector(0.05 * cw, 0.8 * ch));
    }
    function drawSeat(position) {
        Eisdiele.backgroundCtx.save();
        // backgroundCtx.translate(position.x, position.y);
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.arc(position.x, position.y, 50, 0, 2 * Math.PI);
        Eisdiele.backgroundCtx.fillStyle = "HSL(40,95%,70%)";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.arc(position.x, position.y, 30, 0, 2 * Math.PI);
        Eisdiele.backgroundCtx.fillStyle = "HSL(30,95%,40%)";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.restore();
    }
    function drawCounter(position) {
        let bw = Eisdiele.backgroundCtx.canvas.width;
        let bh = Eisdiele.backgroundCtx.canvas.height;
        Eisdiele.backgroundCtx.save();
        Eisdiele.backgroundCtx.translate(position.x, position.y);
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.moveTo(0, 0);
        Eisdiele.backgroundCtx.lineTo(0.9 * bw, 0);
        Eisdiele.backgroundCtx.lineTo(0.9 * bw, 0.1 * bh);
        Eisdiele.backgroundCtx.lineTo(0, 0.1 * bh);
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.fillStyle = "brown";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.restore();
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Eisdiele_Schwer_Pia.js.map