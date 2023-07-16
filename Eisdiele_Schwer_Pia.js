"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1
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
    }
    Eisdiele.Vector = Vector;
    function handleLoad(_event) {
        let backgroundCanvas = document.querySelector("#background");
        let foregroundCanvas = document.querySelector("#foreground");
        if (!backgroundCanvas)
            return;
        if (!foregroundCanvas)
            return;
        backgroundCanvas.width = window.innerWidth * 0.48;
        backgroundCanvas.height = window.innerHeight * 0.96;
        foregroundCanvas.width = window.innerWidth * 0.48;
        foregroundCanvas.height = window.innerHeight * 0.96;
        Eisdiele.backgroundCtx = backgroundCanvas.getContext('2d');
        Eisdiele.foregroundCtx = foregroundCanvas.getContext('2d');
        Eisdiele.Customers = new Eisdiele.CustomerList();
        setInterval(update, 100);
    }
    function update() {
        Eisdiele.foregroundCtx.clearRect(0, 0, Eisdiele.foregroundCtx.canvas.width, Eisdiele.foregroundCtx.canvas.height);
        Eisdiele.Customers.update();
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Eisdiele_Schwer_Pia.js.map