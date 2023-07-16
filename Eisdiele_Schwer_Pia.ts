// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

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
    }

    export let backgroundCtx: CanvasRenderingContext2D;
    export let foregroundCtx: CanvasRenderingContext2D;

    export let Customers: CustomerList;


    function handleLoad(_event: Event): void {

        let backgroundCanvas: HTMLCanvasElement | null = document.querySelector("#background") as HTMLCanvasElement;
        let foregroundCanvas: HTMLCanvasElement | null = document.querySelector("#foreground") as HTMLCanvasElement;
        if (!backgroundCanvas)
        return;
        if (!foregroundCanvas)
            return;
        backgroundCanvas.width = window.innerWidth*0.48;
        backgroundCanvas.height = window.innerHeight*0.96;
        foregroundCanvas.width = window.innerWidth*0.48;
        foregroundCanvas.height = window.innerHeight*0.96;
        backgroundCtx = <CanvasRenderingContext2D>backgroundCanvas.getContext('2d');
        foregroundCtx = <CanvasRenderingContext2D>foregroundCanvas.getContext('2d');
        Customers = new CustomerList();

        setInterval(update, 100);
    }

    function update(): void {
        foregroundCtx.clearRect(0, 0, foregroundCtx.canvas.width, foregroundCtx.canvas.height);
        Customers.update();
        
    }
}

