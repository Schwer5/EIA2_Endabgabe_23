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
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            this.drawScoop1(new Eisdiele.Vector(0.5 * cw, 0.2 * ch));
            this.drawScoop2(new Eisdiele.Vector(0.3 * cw, 0.2 * ch));
            this.drawScoop3(new Eisdiele.Vector(0.7 * cw, 0.2 * ch));
        }
        drawScoop1(position) {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            Eisdiele.foregroundCtx.save();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "HSL(40,15%,90%)";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            let imageWidth = 80;
            let imageHeight = 80;
            Eisdiele.foregroundCtx.drawImage(Eisdiele.images["cream"], position.x - imageWidth / 2, position.y - imageHeight / 2 - 40, imageWidth, imageHeight);
            Eisdiele.foregroundCtx.restore();
        }
        drawScoop2(position) {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            Eisdiele.foregroundCtx.save();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "HSL(40,15%,90%)";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x + 15, position.y + 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            let imageWidth = 40;
            let imageHeight = 40;
            Eisdiele.foregroundCtx.drawImage(Eisdiele.images["sprinkles"], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
            Eisdiele.foregroundCtx.restore();
        }
        drawScoop3(position) {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            Eisdiele.foregroundCtx.save();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "HSL(40,15%,90%)";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x + 15, position.y - 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y + 20, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = "pink";
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.restore();
        }
    }
    Eisdiele.Ice = Ice;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Ice.js.map