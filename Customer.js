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
            this.mood = Eisdiele.MOOD.OKAY; //give mood okay for the beginning
            this.velocity = 2; //give velocity two 
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
            if (this.waitingTime > 1000) {
                this.lowerMood();
                this.waitingTime = 0;
            }
        }
        ordering() {
            const bubbleWidth = 100;
            const bubbleHeight = 100;
            const cornerRadius = 5;
            const textOffsetX = 10;
            const textOffsetY = 20;
            const message = this.wish.name;
            // Adjust these to center the bubble on your character
            const bubbleX = this.position.x - bubbleWidth / 2;
            const bubbleY = this.position.y - bubbleHeight - 80;
            // Draw the speech bubble
            Eisdiele.foregroundCtx.beginPath();
            Eisdiele.foregroundCtx.moveTo(bubbleX + cornerRadius, bubbleY);
            Eisdiele.foregroundCtx.arcTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + bubbleHeight, cornerRadius);
            Eisdiele.foregroundCtx.arcTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight, cornerRadius);
            Eisdiele.foregroundCtx.arcTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY, cornerRadius);
            Eisdiele.foregroundCtx.arcTo(bubbleX, bubbleY, bubbleX + bubbleWidth, bubbleY, cornerRadius);
            Eisdiele.foregroundCtx.closePath();
            // Fill the bubble
            Eisdiele.foregroundCtx.fillStyle = 'white';
            Eisdiele.foregroundCtx.fill();
            // Draw the text
            Eisdiele.foregroundCtx.fillStyle = 'black';
            Eisdiele.foregroundCtx.font = '16px Arial';
            Eisdiele.foregroundCtx.fillText(message, bubbleX + textOffsetX, bubbleY + textOffsetY);
            this.wish.draw(new Eisdiele.Vector(this.position.x, this.position.y - 80));
        }
        checkOrder(order) {
            return this.wish.scoops.every((val, index) => val === order.scoops[index]) &&
                this.wish.topping === order.topping &&
                this.wish.decoration === order.decoration;
        }
        eating() {
            // code to manage eating
        }
        async getRandomIce() {
            const response = await fetch("https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=find&collection=IceList");
            const dataJSON = await response.json();
            const data = dataJSON.data;
            const iceList = [];
            // Convert each item to an Ice object using the Ice constructor
            for (let docId in data) {
                let item = data[docId];
                // Map string to ENUM
                let scoops = [];
                let topping = Eisdiele.TOPPING.NONE;
                let decoration = Eisdiele.DECORATION.NONE;
                if (item.Kugel1 == "strawberry") {
                    scoops.push(Eisdiele.FLAVOUR.STRAWBERRY);
                }
                if (item.Kugel1 == "chocolate") {
                    scoops.push(Eisdiele.FLAVOUR.CHOCOLATE);
                }
                if (item.Kugel1 == "lemon") {
                    scoops.push(Eisdiele.FLAVOUR.LEMON);
                }
                if (item.Kugel1 == "smurf") {
                    scoops.push(Eisdiele.FLAVOUR.SMURF);
                }
                if (item.Kugel2 == "strawberry") {
                    scoops.push(Eisdiele.FLAVOUR.STRAWBERRY);
                }
                if (item.Kugel2 == "chocolate") {
                    scoops.push(Eisdiele.FLAVOUR.CHOCOLATE);
                }
                if (item.Kugel2 == "lemon") {
                    scoops.push(Eisdiele.FLAVOUR.LEMON);
                }
                if (item.Kugel2 == "smurf") {
                    scoops.push(Eisdiele.FLAVOUR.SMURF);
                }
                if (item.Kugel3 == "strawberry") {
                    scoops.push(Eisdiele.FLAVOUR.STRAWBERRY);
                }
                if (item.Kugel3 == "chocolate") {
                    scoops.push(Eisdiele.FLAVOUR.CHOCOLATE);
                }
                if (item.Kugel3 == "lemon") {
                    scoops.push(Eisdiele.FLAVOUR.LEMON);
                }
                if (item.Kugel3 == "smurf") {
                    scoops.push(Eisdiele.FLAVOUR.SMURF);
                }
                if (item.Topping == "fruit") {
                    topping = Eisdiele.TOPPING.FRUIT;
                }
                else if (item.Topping == "cream") {
                    topping = Eisdiele.TOPPING.CREAM;
                }
                if (item.Dekoration == "cherry") {
                    decoration = Eisdiele.DECORATION.CHERRY;
                }
                else if (item.Dekoration == "chocosauce") {
                    decoration = Eisdiele.DECORATION.CHOCOSAUCE;
                }
                else if (item.Dekoration == "sprinkles") {
                    decoration = Eisdiele.DECORATION.SPRINKLES;
                }
                else if (item.Dekoration == "glitter") {
                    decoration = Eisdiele.DECORATION.GLITTER;
                }
                // Create an Ice instance
                let ice = new Eisdiele.Ice(scoops, topping, decoration);
                // Add price to the Ice object
                ice.price = item.Preis;
                ice.name = item.icetitle;
                iceList.push(ice);
            }
            // Pick a random item
            const randomIndex = Math.floor(Math.random() * iceList.length);
            return iceList[randomIndex];
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