"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1
var Eisdiele;
(function (Eisdiele) {
    class Customer {
        _mood;
        _colour;
        _wish;
        _position;
        _velocity;
        _targetPosition;
        _customerIce;
        _waitingTime;
        _eatingTime;
        constructor() {
            // initialize the variables
            this.mood = Eisdiele.MOOD.OKAY;
            this.velocity = 10;
            this.waitingTime = 0;
        }
        // Getters
        get mood() {
            return this._mood;
        }
        get colour() {
            return this._colour;
        }
        get wish() {
            return this._wish;
        }
        get position() {
            return this._position;
        }
        get velocity() {
            return this._velocity;
        }
        get targetPosition() {
            return this._targetPosition;
        }
        get customerIce() {
            return this._customerIce;
        }
        get waitingTime() {
            return this._waitingTime;
        }
        get eatingTime() {
            return this._eatingTime;
        }
        // Setters
        set mood(value) {
            this._mood = value;
        }
        set colour(value) {
            this._colour = value;
        }
        set wish(value) {
            this._wish = value;
        }
        set position(value) {
            this._position = value;
        }
        set velocity(value) {
            this._velocity = value;
        }
        set targetPosition(value) {
            this._targetPosition = value;
        }
        set customerIce(value) {
            this._customerIce = value;
        }
        set waitingTime(value) {
            this._waitingTime = value;
        }
        set eatingTime(value) {
            this._eatingTime = value;
        }
        // Functions
        updatePosition() {
            let currentPosition = this.position;
            let directionVector = new Eisdiele.Vector(this.targetPosition.x - currentPosition.x, this.targetPosition.y - currentPosition.y);
            let directionVectorLength = Math.sqrt(directionVector.x * directionVector.x + directionVector.y * directionVector.y);
            let moveVector = new Eisdiele.Vector(0, 0);
            if (directionVectorLength > this.velocity) {
                moveVector.x = directionVector.x / directionVectorLength * this.velocity;
                moveVector.y = directionVector.y / directionVectorLength * this.velocity;
            }
            else {
                moveVector.x = directionVector.x;
                moveVector.y = directionVector.y;
            }
            this.position = new Eisdiele.Vector(currentPosition.x + moveVector.x, currentPosition.y + moveVector.y);
        }
        waitingMood() {
            this.waitingTime += 1;
            if (this.waitingTime > 100) {
                this.lowerMood();
                this.waitingTime = 0;
            }
        }
        ordering() {
            // code to manage ordering
        }
        checkOrder(order) {
            return this.wish.scoops.every((val, index) => val === order.scoops[index]) &&
                this.wish.topping === order.topping &&
                this.wish.decoration === order.decoration;
        }
        eating() {
            // code to manage eating
        }
        draw() {
            let centerX = this.position.x;
            let centerY = this.position.y;
            let radius = 36;
            // Draw the face
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            switch (this.mood) {
                case Eisdiele.MOOD.HAPPY:
                    Eisdiele.foregroundCtx.fillStyle = 'green';
                    break;
                case Eisdiele.MOOD.OKAY:
                    Eisdiele.foregroundCtx.fillStyle = 'lightgreen';
                    break;
                case Eisdiele.MOOD.NEUTRAL:
                    Eisdiele.foregroundCtx.fillStyle = 'yellow';
                    break;
                case Eisdiele.MOOD.SAD:
                    Eisdiele.foregroundCtx.fillStyle = 'orange';
                    break;
                case Eisdiele.MOOD.ANGRY:
                    Eisdiele.foregroundCtx.fillStyle = 'red';
                    break;
            }
            Eisdiele.foregroundCtx.fill();
            Eisdiele.foregroundCtx.stroke();
            // Draw the eyes
            let eyeX = radius / 3;
            let eyeY = radius / 3;
            let eyeRadius = radius / 10;
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.arc(centerX - eyeX, centerY - eyeY, eyeRadius, 0, Math.PI * 2);
            Eisdiele.foregroundCtx.arc(centerX + eyeX, centerY - eyeY, eyeRadius, 0, Math.PI * 2);
            Eisdiele.foregroundCtx.fillStyle = 'black';
            Eisdiele.foregroundCtx.fill();
            // Draw the mouth
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.lineWidth = 5;
            Eisdiele.foregroundCtx.lineCap = "round";
            switch (this.mood) {
                case Eisdiele.MOOD.HAPPY:
                    Eisdiele.foregroundCtx.arc(centerX, centerY, 2 * radius / 3, 0, Math.PI, false); // U shape
                    break;
                case Eisdiele.MOOD.OKAY:
                    // Adjust start and end angles for slight smile
                    Eisdiele.foregroundCtx.arc(centerX, centerY, 2 * radius / 3, Math.PI * 0.2, Math.PI * 0.8, false); // Slightly U shape
                    break;
                case Eisdiele.MOOD.NEUTRAL:
                    Eisdiele.foregroundCtx.moveTo(centerX - eyeX, centerY + eyeY);
                    Eisdiele.foregroundCtx.lineTo(centerX + eyeX, centerY + eyeY); // Straight line
                    break;
                case Eisdiele.MOOD.SAD:
                    Eisdiele.foregroundCtx.arc(centerX, centerY + 2 * eyeY, eyeX, 0, Math.PI, true); // Slightly downwards curved line
                    break;
                case Eisdiele.MOOD.ANGRY:
                    Eisdiele.foregroundCtx.arc(centerX, centerY + radius / 2, radius / 2, 0, Math.PI, true); // n shape
                    break;
            }
            Eisdiele.foregroundCtx.stroke();
            // Reset the lineWidth and lineCap
            Eisdiele.foregroundCtx.lineWidth = 1;
            Eisdiele.foregroundCtx.lineCap = "butt";
        }
        lowerMood() {
            switch (this.mood) {
                case Eisdiele.MOOD.HAPPY:
                    this.mood = Eisdiele.MOOD.OKAY;
                    break;
                case Eisdiele.MOOD.OKAY:
                    this.mood = Eisdiele.MOOD.NEUTRAL;
                    break;
                case Eisdiele.MOOD.NEUTRAL:
                    this.mood = Eisdiele.MOOD.SAD;
                    break;
                case Eisdiele.MOOD.SAD:
                    this.mood = Eisdiele.MOOD.ANGRY;
                    break;
                case Eisdiele.MOOD.ANGRY:
                    // Do nothing
                    break;
            }
        }
        betterMood() {
            switch (this.mood) {
                case Eisdiele.MOOD.HAPPY:
                    // Do nothing
                    break;
                case Eisdiele.MOOD.OKAY:
                    this.mood = Eisdiele.MOOD.HAPPY;
                    break;
                case Eisdiele.MOOD.NEUTRAL:
                    this.mood = Eisdiele.MOOD.OKAY;
                    break;
                case Eisdiele.MOOD.SAD:
                    this.mood = Eisdiele.MOOD.NEUTRAL;
                    break;
                case Eisdiele.MOOD.ANGRY:
                    this.mood = Eisdiele.MOOD.SAD;
                    break;
            }
        }
    }
    Eisdiele.Customer = Customer;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Customer.js.map