// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

namespace Eisdiele {
    export class CustomerList {
        private _waitingList: Customer[]; //was hat er
        private _waitingPosList: Vector[];
        private _eatingList: Customer[];
        private _eatingPosList: Vector[];
        private _leavingList: Customer[];
        private _leavingPosList: Vector[];
        private _maxSize: number;

        constructor() {
            let cw = foregroundCtx.canvas.width;
            let ch = foregroundCtx.canvas.height;
            this._maxSize = 6;
            this._waitingList = [];
            this._waitingPosList = [
                new Vector(0.95 * cw, 0.43 * ch),
                new Vector(0.76 * cw, 0.38 * ch),
                new Vector(0.63 * cw, 0.36 * ch),
                new Vector(0.48 * cw, 0.27 * ch),
                new Vector(0.34 * cw, 0.30 * ch),
                new Vector(0.22 * cw, 0.25 * ch)
            ];
            this._eatingList = new Array<Customer>(6);
            this._eatingPosList = [
                new Vector(0.12 * cw, 0.76 * ch),
                new Vector(0.27 * cw, 0.76 * ch),
                new Vector(0.41 * cw, 0.76 * ch),
                new Vector(0.55 * cw, 0.76 * ch),
                new Vector(0.70 * cw, 0.76 * ch),
                new Vector(0.84 * cw, 0.76 * ch)
            ];

            this._leavingList = [];
            this._leavingPosList = [new Vector(0.5 * cw, -0.1 * ch), new Vector(-0.1 * cw, 0.5 * ch)];
        }

        // Getters
        public get waitingList(): Customer[] {
            return this._waitingList;
        }
        public get eatingList(): Customer[] {
            return this._eatingList;
        }
        public get leavingList(): Customer[] {
            return this._leavingList;
        }

        public get waitingPosList(): Vector[] {
            return this._waitingPosList;
        }
        public get eatingPosList(): Vector[] {
            return this._eatingPosList;
        }
        public get leavingPosList(): Vector[] {
            return this._leavingPosList;
        }

        public get maxSize(): number {
            return this._maxSize;
        }

        // Setters
        public set waitingList(value: Customer[]) {
            this._waitingList = value;
        }
        public set eatingList(value: Customer[]) {
            this._eatingList = value;
        }
        public set leavingList(value: Customer[]) {
            this._leavingList = value;
        }

        public set maxSize(value: number) {
            this._maxSize = value;
        }

        public update(): void {
            // Generate a random number
            const randomNumber = Math.random();

            // Depending on the value of the randomNumber, add a new customer to the queue
            if (randomNumber < 0.002
            ) { // adjust this condition to control how often new customers are added
                this.addCustomer();
            }

            for (let i = 0; i < this.waitingList.length; i++) {
                let customer = this.waitingList[i]
                customer.waitingMood()
                customer.updatePosition()
                customer.draw()
                if (customer.mood == MOOD.ANGRY) {
                    customer.targetPosition = this.leavingPosList[0]
                    this.leavingList.push(customer)
                    this.waitingList.splice(i, 1)
                }
            }

            for (let i = 0; i < this.eatingList.length; i++) {
                if (this.eatingList[i] != null) {
                    let customer = this.eatingList[i]
                    customer.waitingMood()
                    customer.updatePosition()
                    customer.draw()
                    if (customer.mood == MOOD.ANGRY) {
                        customer.targetPosition = this.leavingPosList[0]
                        this.leavingList.push(customer)
                        delete this.eatingList[i]
                    }
                    if (customer.position.equals(customer.targetPosition)) {
                        customer.ordering()
                    }


                }
            }

            for (let i = 0; i < this.leavingList.length; i++) {
                let customer = this.leavingList[i]
                customer.updatePosition()
                customer.draw()
            }

            this.updateTargetPositions()
        }

        public async addCustomer(): Promise<void> {
            const x = -100;
            const y = window.innerHeight * 0.5;

            // Create a new customer with the generated position
            const position = new Vector(x, y);
            const newCustomer = new Customer();
            newCustomer.position = position;
            if (this.waitingList.length < this.maxSize) {
                let currentSize: number = this.waitingList.length;
                this.waitingList.push(newCustomer);
                this.waitingList[currentSize].targetPosition = this.waitingPosList[currentSize];
                newCustomer.wish = await newCustomer.getRandomIce();
            }
        }


        public updateTargetPositions(): void {
            for (let i = 0; i < this.waitingList.length; i++) {
                this.waitingList[i].targetPosition = this.waitingPosList[i]
            }
            for (let i = 0; i < this.eatingList.length; i++) {
                if (this.eatingList[i] != null) {
                    this.eatingList[i].targetPosition = this.eatingPosList[i]
                }
            }
        }
        public moveCustomerSeating(seatNumber: number): void {
            if (this.waitingList.length > 0) {
                if (this.eatingList[seatNumber] == null) {
                    let movingCustomer = this.waitingList[0]
                    this.eatingList[seatNumber] = movingCustomer
                    this.waitingList.shift()
                    movingCustomer.betterMood()
                    this.eatingList[seatNumber].targetPosition = this.eatingPosList[seatNumber];

                    this.updateTargetPositions();
                } else {
                    let customer = this.eatingList[seatNumber];
                    if (customer.checkOrder(globalIce)) {
                        customer.mood = MOOD.HAPPY
                        globalScore += customer.wish.price;
                        customer.targetPosition = this.leavingPosList[1]
                        this.leavingList.push(customer)
                        delete this.eatingList[seatNumber]
                        document.getElementById("counter")!.innerText = '€' + globalScore;
                    } else {
                        customer.mood = MOOD.ANGRY
                        customer.targetPosition = this.leavingPosList[0]
                        this.leavingList.push(customer)
                        delete this.eatingList[seatNumber]
                    }
                    globalIce = new Ice([FLAVOUR.NONE, FLAVOUR.NONE, FLAVOUR.NONE], TOPPING.NONE, DECORATION.NONE);

                }
            }
        }

        public sendToSeat0(): void {
            Customers.moveCustomerSeating(0)
        }
        public sendToSeat1(): void {
            Customers.moveCustomerSeating(1)
        }
        public sendToSeat2(): void {
            Customers.moveCustomerSeating(2)
        }
        public sendToSeat3(): void {
            Customers.moveCustomerSeating(3)
        }
        public sendToSeat4(): void {
            Customers.moveCustomerSeating(4)
        }
        public sendToSeat5(): void {
            Customers.moveCustomerSeating(5)
        }
    }

}

