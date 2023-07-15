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
    })(MOOD || (MOOD = {}));
    let FLAVOUR;
    (function (FLAVOUR) {
        FLAVOUR[FLAVOUR["STRAWBERRY"] = 0] = "STRAWBERRY";
        FLAVOUR[FLAVOUR["CHOCOLATE"] = 1] = "CHOCOLATE";
        FLAVOUR[FLAVOUR["LEMON"] = 2] = "LEMON";
        FLAVOUR[FLAVOUR["SMURF"] = 3] = "SMURF";
    })(FLAVOUR || (FLAVOUR = {}));
    let TOPPING;
    (function (TOPPING) {
        TOPPING[TOPPING["CREAM"] = 0] = "CREAM";
        TOPPING[TOPPING["FRUIT"] = 1] = "FRUIT";
    })(TOPPING || (TOPPING = {}));
    let DECORATION;
    (function (DECORATION) {
        DECORATION[DECORATION["CHERRY"] = 0] = "CHERRY";
        DECORATION[DECORATION["CHOCOSAUCE"] = 1] = "CHOCOSAUCE";
        DECORATION[DECORATION["SPRINKLES"] = 2] = "SPRINKLES";
        DECORATION[DECORATION["GLITTER"] = 3] = "GLITTER";
    })(DECORATION || (DECORATION = {}));
    function handleLoad(_event) {
        setInterval(update, 40);
    }
    function update() {
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Eisdiele_Schwer_Pia.js.map