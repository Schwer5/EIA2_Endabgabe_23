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
        _price;
        _name;
        constructor(scoops, topping, decoration) {
            this._scoops = scoops;
            this._topping = topping;
            this._decoration = decoration;
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
        get price() {
            return this._price;
        }
        get name() {
            return this._name;
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
        set price(value) {
            this._price = value;
        }
        set name(value) {
            this._name = value;
        }
        // Functions
        calculatePrice() {
            // Calculate price based on scoops, topping and decoration
            return 1;
        }
        draw(position) {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            let numberScoops = 0;
            let fillColors = [];
            for (let i = 0; i < this.scoops.length; i++) {
                let scoop = this.scoops[i];
                if (scoop != Eisdiele.FLAVOUR.NONE) {
                    numberScoops++;
                    switch (scoop) {
                        case Eisdiele.FLAVOUR.STRAWBERRY:
                            fillColors.push("pink");
                            break;
                        case Eisdiele.FLAVOUR.CHOCOLATE:
                            fillColors.push("brown");
                            break;
                        case Eisdiele.FLAVOUR.LEMON:
                            fillColors.push("yellow");
                            break;
                        case Eisdiele.FLAVOUR.SMURF:
                            fillColors.push("cyan");
                            break;
                    }
                }
            }
            if (numberScoops == 1) {
                this.drawScoop1(position, fillColors[0]);
            }
            if (numberScoops == 2) {
                this.drawScoop2(position, fillColors[0], fillColors[1]);
            }
            if (numberScoops == 3) {
                this.drawScoop3(position, fillColors[0], fillColors[1], fillColors[2]);
            }
        }
        drawScoop1(position, fillColor1) {
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
            Eisdiele.foregroundCtx.fillStyle = fillColor1;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            if (this.topping !== Eisdiele.TOPPING.NONE) {
                let imageWidth = 40;
                let imageHeight = 40;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
            }
            // Check if decoration is not none, then draw the image
            if (this.decoration !== Eisdiele.DECORATION.NONE) {
                let imageWidth = 20;
                let imageHeight = 20;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
            }
            Eisdiele.foregroundCtx.restore();
        }
        drawScoop2(position, fillColor1, fillColor2) {
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
            Eisdiele.foregroundCtx.fillStyle = fillColor1;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = fillColor2;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            if (this.topping !== Eisdiele.TOPPING.NONE) {
                let imageWidth = 40;
                let imageHeight = 40;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
            }
            // Check if decoration is not none, then draw the image
            if (this.decoration !== Eisdiele.DECORATION.NONE) {
                let imageWidth = 20;
                let imageHeight = 20;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
            }
            Eisdiele.foregroundCtx.restore();
        }
        drawScoop3(position, fillColor1, fillColor2, fillColor3) {
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
            Eisdiele.foregroundCtx.fillStyle = fillColor1;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x + 15, position.y - 10, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = fillColor2;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(position.x, position.y + 20, 20, 0, 2 * Math.PI);
            Eisdiele.foregroundCtx.fillStyle = fillColor3;
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.closePath();
            if (this.topping !== Eisdiele.TOPPING.NONE) {
                let imageWidth = 40;
                let imageHeight = 40;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
            }
            // Check if decoration is not none, then draw the image
            if (this.decoration !== Eisdiele.DECORATION.NONE) {
                let imageWidth = 20;
                let imageHeight = 20;
                Eisdiele.foregroundCtx.drawImage(Eisdiele.images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
            }
            Eisdiele.foregroundCtx.restore();
        }
    }
    Eisdiele.Ice = Ice;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Ice.js.map