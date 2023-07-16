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
        private _maxSize: number;
    
        constructor() {
            let cw = foregroundCtx.canvas.width;
            let ch = foregroundCtx.canvas.height;
            this._maxSize = 6;
            this._waitingList = [];
            this._waitingPosList = [new Vector(0.95 * cw, 0.43 * ch), new Vector(0.76* cw, 0.38 * ch),new Vector(0.63* cw, 0.36* ch),new Vector(0.48* cw, 0.27  * ch),new Vector(0.34* cw, 0.30 * ch),new Vector(0.22* cw, 0.25* ch)];
            this._eatingList = [];
            this._eatingPosList = [new Vector(100, 600), new Vector(200, 600),new Vector(300, 600),new Vector(400, 600),new Vector(500, 600),new Vector(600, 600)];
        }

        // Getters
        public get waitingList(): Customer[] {
            return this._waitingList;
        }
        public get eatingList(): Customer[] {
            return this._eatingList;
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

            for (let i = 0; i <this.waitingList.length; i++) {
                this.waitingList[i].updatePosition()
                this.waitingList[i].waitingMood();
                this.waitingList[i].draw()
            }
            
            for (let i = 0; i <this.eatingList.length; i++) {
                this.waitingList[i].updatePosition()
                this.waitingList[i].draw()
            }
        }

        // Functions
        public addCustomer(): void {
            // Generate a random negative x value and a y value around 50vh
            // const x = Math.random() * 50 -100; // adjust as needed
            const x = 100; // adjust as needed
            // const y = window.innerHeight * 0.5; // 50vh
            const y = 100; // 50vh

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

        public moveCustomerSeating(seatNumber: number): void {
            if (this._waitingList.length > 0) {
                this._eatingList[seatNumber] = this._waitingList[0]
                this._waitingList.shift();
                this._eatingList[seatNumber].targetPosition = this._eatingPosList[seatNumber];
                // you may need to update the target positions here
            }
        }

        public updateTargetPositions(): void {
            // Update the target positions of the customers in the queue
        }
    }

}

