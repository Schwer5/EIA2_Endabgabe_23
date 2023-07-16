// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

namespace Eisdiele {
    export class CustomerList {
        private _waitingList: Customer[];
        private _waitingPosList: Vector[];
        private _eatingList: Customer[];
        private _eatingPosList: Vector[];
        private _leavingList: Customer[];
        private _maxSize: number;

        constructor() {
            let cw = foregroundCtx.canvas.width;
            let ch = foregroundCtx.canvas.height;
            this._maxSize = 6;
            this._waitingList = [];
            this._leavingList = [];
            this._waitingPosList = [new Vector(0.95 * cw, 0.43 * ch), new Vector(0.76 * cw, 0.38 * ch), new Vector(0.63 * cw, 0.36 * ch), new Vector(0.48 * cw, 0.27 * ch), new Vector(0.34 * cw, 0.30 * ch), new Vector(0.22 * cw, 0.25 * ch)];
            this._eatingList = new Array<Customer>(6);
            this._eatingPosList = [new Vector(0.12 * cw, 0.76 * ch), new Vector(0.26 * cw, 0.76 * ch), new Vector(0.39 * cw, 0.76 * ch), new Vector(0.53 * cw, 0.76 * ch), new Vector(0.66 * cw, 0.76 * ch), new Vector(0.80 * cw, 0.76 * ch)];
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
            if (randomNumber < 0.01
            ) { // adjust this condition to control how often new customers are added
                this.addCustomer();
            }

            for (let i = 0; i < this.waitingList.length; i++) {
                this.waitingList[i].updatePosition()
                this.waitingList[i].waitingMood();
                this.waitingList[i].draw()
                if (this.waitingList[i].mood == MOOD.ANGRY)
                {
                    this.leavingList.push(this.waitingList[i])
                    this.waitingList
                }
            }

            for (let i = 0; i < this.eatingList.length; i++) {
                if (this.eatingList[i] != null) {
                    this.eatingList[i].updatePosition()
                    this.eatingList[i].draw()
                }
            }
        }

        // Functions
        public addCustomer(): void {
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
            }
        }


        public updateTargetPositions(): void {
            for (let i = 0; i< this.waitingList.length; i++)
            {
                this.waitingList[i].targetPosition = this.waitingPosList[i]
            }
        }
        public moveCustomerSeating(seatNumber: number): void {
            if (this.waitingList.length > 0) {
                let movingCustomer = this.waitingList[0]
                this.eatingList[seatNumber] = movingCustomer
                this.waitingList.shift()
                movingCustomer.betterMood()
                this.eatingList[seatNumber].targetPosition = this.eatingPosList[seatNumber];

                this.updateTargetPositions();
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

