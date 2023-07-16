"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1
var Eisdiele;
(function (Eisdiele) {
    class CustomerList {
        _waitingList;
        _waitingPosList;
        _eatingList;
        _eatingPosList;
        _maxSize;
        constructor() {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            this._maxSize = 6;
            this._waitingList = [];
            this._waitingPosList = [new Eisdiele.Vector(0.95 * cw, 0.43 * ch), new Eisdiele.Vector(0.76 * cw, 0.38 * ch), new Eisdiele.Vector(0.63 * cw, 0.36 * ch), new Eisdiele.Vector(0.48 * cw, 0.27 * ch), new Eisdiele.Vector(0.34 * cw, 0.30 * ch), new Eisdiele.Vector(0.22 * cw, 0.25 * ch)];
            this._eatingList = [];
            this._eatingPosList = [new Eisdiele.Vector(100, 600), new Eisdiele.Vector(200, 600), new Eisdiele.Vector(300, 600), new Eisdiele.Vector(400, 600), new Eisdiele.Vector(500, 600), new Eisdiele.Vector(600, 600)];
        }
        // Getters
        get waitingList() {
            return this._waitingList;
        }
        get eatingList() {
            return this._eatingList;
        }
        get waitingPosList() {
            return this._waitingPosList;
        }
        get eatingPosList() {
            return this._eatingPosList;
        }
        get maxSize() {
            return this._maxSize;
        }
        // Setters
        set waitingList(value) {
            this._waitingList = value;
        }
        set eatingList(value) {
            this._eatingList = value;
        }
        set maxSize(value) {
            this._maxSize = value;
        }
        update() {
            // Generate a random number
            const randomNumber = Math.random();
            // Depending on the value of the randomNumber, add a new customer to the queue
            if (randomNumber < 0.01) { // adjust this condition to control how often new customers are added
                this.addCustomer();
            }
            for (let i = 0; i < this.waitingList.length; i++) {
                this.waitingList[i].updatePosition();
                this.waitingList[i].waitingMood();
                this.waitingList[i].draw();
            }
            for (let i = 0; i < this.eatingList.length; i++) {
                this.waitingList[i].updatePosition();
                this.waitingList[i].draw();
            }
        }
        // Functions
        addCustomer() {
            // Generate a random negative x value and a y value around 50vh
            // const x = Math.random() * 50 -100; // adjust as needed
            const x = 100; // adjust as needed
            // const y = window.innerHeight * 0.5; // 50vh
            const y = 100; // 50vh
            // Create a new customer with the generated position
            const position = new Eisdiele.Vector(x, y);
            const newCustomer = new Eisdiele.Customer();
            newCustomer.position = position;
            if (this.waitingList.length < this.maxSize) {
                let currentSize = this.waitingList.length;
                this.waitingList.push(newCustomer);
                this.waitingList[currentSize].targetPosition = this.waitingPosList[currentSize];
            }
        }
        moveCustomerSeating(seatNumber) {
            if (this._waitingList.length > 0) {
                this._eatingList[seatNumber] = this._waitingList[0];
                this._waitingList.shift();
                this._eatingList[seatNumber].targetPosition = this._eatingPosList[seatNumber];
                // you may need to update the target positions here
            }
        }
        updateTargetPositions() {
            // Update the target positions of the customers in the queue
        }
    }
    Eisdiele.CustomerList = CustomerList;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=CustomerList.js.map