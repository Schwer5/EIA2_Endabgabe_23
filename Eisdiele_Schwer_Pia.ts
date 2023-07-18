// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <18.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1, mein Bruder, chat Gpt 

namespace Eisdiele {
    window.addEventListener("load", handleLoad);

    export enum MOOD {
        HAPPY,
        OKAY,
        NEUTRAL,
        SAD,
        ANGRY
    }
    export enum FLAVOUR {
        STRAWBERRY,
        CHOCOLATE,
        LEMON,
        SMURF
    }
    export enum TOPPING {
        CREAM,
        FRUIT
    }
    export enum DECORATION {
        CHERRY,
        CHOCOSAUCE,
        SPRINKLES,
        GLITTER
    }

    export class Vector {
        private _x: number;
        private _y: number;

        constructor(x: number = 0, y: number = 0) {
            this._x = x;
            this._y = y;
        }

        // Getters
        public get x(): number {
            return this._x;
        }

        public get y(): number {
            return this._y;
        }

        // Setters
        public set x(value: number) {
            this._x = value;
        }

        public set y(value: number) {
            this._y = value;
        }

        public equals(other: Vector, tolerance: number = 0.01): boolean {
            return Math.abs(this._x - other._x) < tolerance && Math.abs(this._y - other._y) < tolerance;
        }
    }

    export let backgroundCtx: CanvasRenderingContext2D;
    export let foregroundCtx: CanvasRenderingContext2D;

    export let Customers: CustomerList;
    export let images: {[key: string]: HTMLImageElement} = {};

    function handleLoad(_event: Event): void {

        let backgroundCanvas: HTMLCanvasElement | null = document.querySelector("#background") as HTMLCanvasElement; //get canvas Element from HTML 
        let foregroundCanvas: HTMLCanvasElement | null = document.querySelector("#foreground") as HTMLCanvasElement; //get canvas Element from HTML
        if (!backgroundCanvas)
            return;
        if (!foregroundCanvas)
            return;
        backgroundCanvas.width = window.innerWidth * 0.48; //give backgroundCanvas width
        backgroundCanvas.height = window.innerHeight * 0.96; //give backgroundCanvas heigth
        foregroundCanvas.width = window.innerWidth * 0.48;  //give foregroundCanvas width
        foregroundCanvas.height = window.innerHeight * 0.96;  //give foregroundCanvas heigth
        backgroundCtx = <CanvasRenderingContext2D>backgroundCanvas.getContext('2d'); //get canvas rendering context
        foregroundCtx = <CanvasRenderingContext2D>foregroundCanvas.getContext('2d');
        Customers = new CustomerList();
        Customers.addCustomer();

        let seat0: HTMLDivElement = document.querySelector("#seat0") as HTMLDivElement; //select divs from html & add click event Listener
        seat0.addEventListener("click", Customers.sendToSeat0);
        let seat1: HTMLDivElement = document.querySelector("#seat1") as HTMLDivElement;
        seat1.addEventListener("click", Customers.sendToSeat1);
        let seat2: HTMLDivElement = document.querySelector("#seat2") as HTMLDivElement;
        seat2.addEventListener("click", Customers.sendToSeat2);
        let seat3: HTMLDivElement = document.querySelector("#seat3") as HTMLDivElement;
        seat3.addEventListener("click", Customers.sendToSeat3);
        let seat4: HTMLDivElement = document.querySelector("#seat4") as HTMLDivElement;
        seat4.addEventListener("click", Customers.sendToSeat4);
        let seat5: HTMLDivElement = document.querySelector("#seat5") as HTMLDivElement;
        seat5.addEventListener("click", Customers.sendToSeat5);

        loadImage("images/fruit.png", "fruit"); //give Picture Data a name
        loadImage("images/cream.png", "cream");
        loadImage("images/cherry.png", "cherry");
        loadImage("images/choco.png", "choco");
        loadImage("images/sprinkles.png", "sprinkles");
        loadImage("images/glitter.png", "glitter");

        drawBackground(); //draw static background

        // let testIce = new Ice([FLAVOUR.CHOCOLATE, FLAVOUR.LEMON], TOPPING.CREAM,DECORATION.GLITTER);
        // testIce.draw()

        setInterval(update, 20); //update
    }

    function update(): void {
        foregroundCtx.clearRect(0, 0, foregroundCtx.canvas.width, foregroundCtx.canvas.height); //clear canvas foreground for moving objects
        Customers.update();

    }

    function loadImage(url: string, imageName: string): void {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            images[imageName] = img;
        };
    }

    function drawBackground(): void {
        let cw = foregroundCtx.canvas.width;
        let ch = foregroundCtx.canvas.height;
        drawSeat(new Vector(0.12 * cw, 0.76 * ch)); //draw the seats on different positions not with pixel
        drawSeat(new Vector(0.27 * cw, 0.76 * ch));
        drawSeat(new Vector(0.41 * cw, 0.76 * ch));
        drawSeat(new Vector(0.55 * cw, 0.76 * ch));
        drawSeat(new Vector(0.70 * cw, 0.76 * ch));
        drawSeat(new Vector(0.84 * cw, 0.76 * ch));
        drawCounter(new Vector(0.05 * cw, 0.8 * ch));
    }
    function drawSeat(position: Vector):void{
        backgroundCtx.save();
        // backgroundCtx.translate(position.x, position.y);

        backgroundCtx.beginPath();
        backgroundCtx.arc(position.x, position.y, 50, 0, 2 * Math.PI);
        backgroundCtx.fillStyle = "HSL(40,95%,70%)";
        backgroundCtx.fill();
        backgroundCtx.closePath();
        backgroundCtx.beginPath();
        backgroundCtx.arc(position.x, position.y, 30, 0, 2 * Math.PI);
        backgroundCtx.fillStyle = "HSL(30,95%,40%)";
        backgroundCtx.fill();
        backgroundCtx.closePath();
        backgroundCtx.restore();
    }
    function drawCounter(position:Vector):void{
        let bw = backgroundCtx.canvas.width;
        let bh = backgroundCtx.canvas.height;
        backgroundCtx.save();
        backgroundCtx.translate(position.x, position.y);
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(0,0); 
        backgroundCtx.lineTo(0.9*bw,0);
        backgroundCtx.lineTo(0.9*bw, 0.1*bh);
        backgroundCtx.lineTo(0, 0.1*bh);
        backgroundCtx.closePath();
        backgroundCtx.fillStyle = "brown";
        backgroundCtx.fill();
        backgroundCtx.closePath();
        backgroundCtx.restore();
    }
}

