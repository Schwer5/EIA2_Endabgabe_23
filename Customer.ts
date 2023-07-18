// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

namespace Eisdiele {
    export class Customer {
        private _mood: MOOD;
        private _colour: string;
        private _wish: Ice;
        private _position: Vector;
        private _velocity: number;
        private _targetPosition: Vector;
        private _customerIce: Ice;
        private _waitingTime: number;
        private _eatingTime: number;

        constructor() {
            // initialize the variables
            this.mood = MOOD.OKAY //give mood okay for the beginning
            this.velocity = 2; //give velocity two 
            this.waitingTime = 0; 
            this.wish = this.getRandomIce() //give him an ice from IceList
        }

        // Getters
        public get mood(): MOOD {
            return this._mood;
        }

        public get colour(): string {
            return this._colour;
        }

        public get wish(): Ice {
            return this._wish;
        }

        public get position(): Vector {
            return this._position;
        }

        public get velocity(): number {
            return this._velocity;
        }

        public get targetPosition(): Vector {
            return this._targetPosition;
        }

        public get customerIce(): Ice {
            return this._customerIce;
        }

        public get waitingTime(): number {
            return this._waitingTime;
        }

        public get eatingTime(): number {
            return this._eatingTime;
        }

        // Setters
        public set mood(value: MOOD) {
            this._mood = value;
        }

        public set colour(value: string) {
            this._colour = value;
        }

        public set wish(value: Ice) {
            this._wish = value;
        }

        public set position(value: Vector) {
            this._position = value;
        }

        public set velocity(value: number) {
            this._velocity = value;
        }

        public set targetPosition(value: Vector) {
            this._targetPosition = value;
        }

        public set customerIce(value: Ice) {
            this._customerIce = value;
        }

        public set waitingTime(value: number) {
            this._waitingTime = value;
        }

        public set eatingTime(value: number) {
            this._eatingTime = value;
        }

        // Functions
        public updatePosition(): void {
            let currentPosition = this.position;
            let directionVector = new Vector(this.targetPosition.x - currentPosition.x, this.targetPosition.y - currentPosition.y)
            let directionVectorLength = Math.sqrt(directionVector.x * directionVector.x + directionVector.y * directionVector.y)
            let moveVector = new Vector(0, 0);
            if (directionVectorLength > this.velocity) {
                moveVector.x = directionVector.x / directionVectorLength * this.velocity
                moveVector.y = directionVector.y / directionVectorLength * this.velocity
            } else {
                moveVector.x = directionVector.x
                moveVector.y = directionVector.y
            }
            this.position = new Vector(currentPosition.x + moveVector.x, currentPosition.y + moveVector.y)
        }

        public waitingMood(): void {
            this.waitingTime += 1;
            if (this.waitingTime > 1000) {
                this.lowerMood();
                this.waitingTime = 0;
            }
        }

        public ordering(): void {
            const bubbleWidth = 100;
            const bubbleHeight = 100;
            const cornerRadius = 5;
            const textOffsetX = 10;
            const textOffsetY = 20;
            const message = "Bitte ein";
    
            // Adjust these to center the bubble on your character
            const bubbleX = this.position.x - bubbleWidth / 2;
            const bubbleY = this.position.y - bubbleHeight - 80;
    
            // Draw the speech bubble
            foregroundCtx.beginPath();
            foregroundCtx.moveTo(bubbleX + cornerRadius, bubbleY);
            foregroundCtx.arcTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + bubbleHeight, cornerRadius);
            foregroundCtx.arcTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight, cornerRadius);
            foregroundCtx.arcTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY, cornerRadius);
            foregroundCtx.arcTo(bubbleX, bubbleY, bubbleX + bubbleWidth, bubbleY, cornerRadius);
            foregroundCtx.closePath();
    
            // Fill the bubble
            foregroundCtx.fillStyle = 'white';
            foregroundCtx.fill();
    
            // Draw the text
            foregroundCtx.fillStyle = 'black';
            foregroundCtx.font = '16px Arial';
            foregroundCtx.fillText(message, bubbleX + textOffsetX, bubbleY + textOffsetY);

            this.wish.draw();
        }
    

        public checkOrder(order: Ice): boolean {
            return this.wish.scoops.every((val, index) => val === order.scoops[index]) &&
                this.wish.topping === order.topping &&
                this.wish.decoration === order.decoration;
        }

        public eating(): void {
            // code to manage eating
        }

        public getRandomIce() {
            // Get a random number of scoops (between 1 and 4)
            let numScoops = Math.floor(Math.random() * 4) + 1;
            let scoops: FLAVOUR[] = [];
        
            // Assign each scoop a random flavour
            for (let i = 0; i < numScoops; i++) {
                let randomFlavour = Math.floor(Math.random() * Object.keys(FLAVOUR).length/2);
                scoops.push(randomFlavour);
            }
        
            // Assign a random topping
            let randomTopping = Math.floor(Math.random() * Object.keys(TOPPING).length/2);
        
            // Assign a random decoration
            let randomDecoration = Math.floor(Math.random() * Object.keys(DECORATION).length/2);
        
            let ice = new Ice(scoops, randomTopping, randomDecoration);
        
            return ice;
        }
        
        public draw() {
            let centerX = this.position.x;
            let centerY = this.position.y;
            let radius = 36;

            // Draw the face
            foregroundCtx.beginPath();
            foregroundCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            switch (this.mood) {
                case MOOD.HAPPY:
                    foregroundCtx.fillStyle = 'green';
                    break;
                case MOOD.OKAY:
                    foregroundCtx.fillStyle = 'lightgreen';
                    break;
                case MOOD.NEUTRAL:
                    foregroundCtx.fillStyle = 'yellow';
                    break;
                case MOOD.SAD:
                    foregroundCtx.fillStyle = 'orange';
                    break;
                case MOOD.ANGRY:
                    foregroundCtx.fillStyle = 'red';
                    break;
            }
            foregroundCtx.fill();
            foregroundCtx.stroke();

            // Draw the eyes
            let eyeX = radius / 3;
            let eyeY = radius / 3;
            let eyeRadius = radius / 10;
            foregroundCtx.beginPath();
            foregroundCtx.arc(centerX - eyeX, centerY - eyeY, eyeRadius, 0, Math.PI * 2);
            foregroundCtx.arc(centerX + eyeX, centerY - eyeY, eyeRadius, 0, Math.PI * 2);
            foregroundCtx.fillStyle = 'black';
            foregroundCtx.fill();

            // Draw the mouth
            foregroundCtx.beginPath();
            foregroundCtx.lineWidth = 5;
            foregroundCtx.lineCap = "round";
            switch (this.mood) {
                case MOOD.HAPPY:
                    foregroundCtx.arc(centerX, centerY, 2 * radius / 3, 0, Math.PI, false); // U shape
                    break;
                case MOOD.OKAY:
                    // Adjust start and end angles for slight smile
                    foregroundCtx.arc(centerX, centerY, 2 * radius / 3, Math.PI * 0.2, Math.PI * 0.8, false); // Slightly U shape
                    break;
                case MOOD.NEUTRAL:
                    foregroundCtx.moveTo(centerX - eyeX, centerY + eyeY);
                    foregroundCtx.lineTo(centerX + eyeX, centerY + eyeY); // Straight line
                    break;
                case MOOD.SAD:
                    foregroundCtx.arc(centerX, centerY + 2 * eyeY, eyeX, 0, Math.PI, true); // Slightly downwards curved line
                    break;
                case MOOD.ANGRY:
                    foregroundCtx.arc(centerX, centerY + radius / 2, radius / 2, 0, Math.PI, true); // n shape
                    break;
            }
            foregroundCtx.stroke();

            // Reset the lineWidth and lineCap
            foregroundCtx.lineWidth = 1;
            foregroundCtx.lineCap = "butt";
        }

        lowerMood(): void {
            switch (this.mood) {
                case MOOD.HAPPY:
                    this.mood = MOOD.OKAY;
                    break;
                case MOOD.OKAY:
                    this.mood = MOOD.NEUTRAL;
                    break;
                case MOOD.NEUTRAL:
                    this.mood = MOOD.SAD;
                    break;
                case MOOD.SAD:
                    this.mood = MOOD.ANGRY;
                    break;
                case MOOD.ANGRY:
                    // Do nothing
                    break;
            }
        }
        betterMood(): void {
            switch (this.mood) {
                case MOOD.HAPPY:
                    // Do nothing
                    break;
                case MOOD.OKAY:
                    this.mood = MOOD.HAPPY;
                    break;
                case MOOD.NEUTRAL:
                    this.mood = MOOD.OKAY;
                    break;
                case MOOD.SAD:
                    this.mood = MOOD.NEUTRAL;
                    break;
                case MOOD.ANGRY:
                    this.mood = MOOD.SAD;
                    break;
            }

        }

    }

}