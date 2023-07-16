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
        _leavingList;
        _maxSize;
        constructor() {
            let cw = Eisdiele.foregroundCtx.canvas.width;
            let ch = Eisdiele.foregroundCtx.canvas.height;
            this._maxSize = 6;
            this._waitingList = [];
            this._leavingList = [];
            this._waitingPosList = [new Eisdiele.Vector(0.95 * cw, 0.43 * ch), new Eisdiele.Vector(0.76 * cw, 0.38 * ch), new Eisdiele.Vector(0.63 * cw, 0.36 * ch), new Eisdiele.Vector(0.48 * cw, 0.27 * ch), new Eisdiele.Vector(0.34 * cw, 0.30 * ch), new Eisdiele.Vector(0.22 * cw, 0.25 * ch)];
            this._eatingList = new Array(6);
            this._eatingPosList = [new Eisdiele.Vector(0.12 * cw, 0.76 * ch), new Eisdiele.Vector(0.26 * cw, 0.76 * ch), new Eisdiele.Vector(0.39 * cw, 0.76 * ch), new Eisdiele.Vector(0.53 * cw, 0.76 * ch), new Eisdiele.Vector(0.66 * cw, 0.76 * ch), new Eisdiele.Vector(0.80 * cw, 0.76 * ch)];
        }
        // Getters
        get waitingList() {
            return this._waitingList;
        }
        get eatingList() {
            return this._eatingList;
        }
        get leavingList() {
            return this._leavingList;
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
        set leavingList(value) {
            this._leavingList = value;
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
                if (this.waitingList[i].mood == Eisdiele.MOOD.ANGRY) {
                    this.leavingList.push(this.waitingList[i]);
                    this.waitingList;
                }
            }
            for (let i = 0; i < this.eatingList.length; i++) {
                if (this.eatingList[i] != null) {
                    this.eatingList[i].updatePosition();
                    this.eatingList[i].draw();
                }
            }
        }
        // Functions
        addCustomer() {
            const x = -100;
            const y = window.innerHeight * 0.5;
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
        updateTargetPositions() {
            for (let i = 0; i < this.waitingList.length; i++) {
                this.waitingList[i].targetPosition = this.waitingPosList[i];
            }
        }
        moveCustomerSeating(seatNumber) {
            if (this.waitingList.length > 0) {
                let movingCustomer = this.waitingList[0];
                this.eatingList[seatNumber] = movingCustomer;
                this.waitingList.shift();
                movingCustomer.betterMood();
                this.eatingList[seatNumber].targetPosition = this.eatingPosList[seatNumber];
                this.updateTargetPositions();
            }
        }
        sendToSeat0() {
            Eisdiele.Customers.moveCustomerSeating(0);
        }
        sendToSeat1() {
            Eisdiele.Customers.moveCustomerSeating(1);
        }
        sendToSeat2() {
            Eisdiele.Customers.moveCustomerSeating(2);
        }
        sendToSeat3() {
            Eisdiele.Customers.moveCustomerSeating(3);
        }
        sendToSeat4() {
            Eisdiele.Customers.moveCustomerSeating(4);
        }
        sendToSeat5() {
            Eisdiele.Customers.moveCustomerSeating(5);
        }
    }
    Eisdiele.CustomerList = CustomerList;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=CustomerList.js.map