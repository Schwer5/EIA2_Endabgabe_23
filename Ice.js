"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1
var Eisdiele;
(function (Eisdiele) {
    class Ice {
        _scoops;
        _topping;
        _decoration;
        _position;
        constructor(_scoops, _topping, _decoration) {
            this._scoops = _scoops;
            this._topping = _topping;
            this._decoration = _decoration;
            this._position = new Eisdiele.Vector();
        }
        // Getters
        get scoops() {
            return this._scoops;
        }
        get topping() {
            return this._topping;
        }
        get decoration() {
            return this._decoration;
        }
        get position() {
            return this._position;
        }
        // Setters
        set scoops(value) {
            this._scoops = value;
        }
        set topping(value) {
            this._topping = value;
        }
        set decoration(value) {
            this._decoration = value;
        }
        set position(value) {
            this._position = value;
        }
        // Functions
        calculatePrice() {
            // Calculate price based on scoops, topping and decoration
            return 1;
        }
        draw() {
            // Draw ice cream
        }
    }
    Eisdiele.Ice = Ice;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Ice.js.map