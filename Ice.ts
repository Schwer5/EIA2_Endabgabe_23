// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

namespace Eisdiele {
  export class Ice {
    private _scoops: FLAVOUR[];
    private _topping: TOPPING;
    private _decoration: DECORATION;
    private _position: Vector;
    private _price: number;
    private _name: string;

    constructor(scoops: FLAVOUR[], topping: TOPPING, decoration: DECORATION) {
      this._scoops = scoops;
      this._topping = topping;
      this._decoration = decoration;
      this._position = new Vector();
    }

    // Getters
    public get scoops(): FLAVOUR[] {
      return this._scoops;
    }

    public get topping(): TOPPING {
      return this._topping;
    }

    public get decoration(): DECORATION {
      return this._decoration;
    }

    public get position(): Vector {
      return this._position;
    }

    public get price(): number {
      return this._price;
    }

    public get name(): string {
      return this._name;
    }

    // Setters
    public set scoops(value: FLAVOUR[]) {
      this._scoops = value;
    }

    public set topping(value: TOPPING) {
      this._topping = value;
    }

    public set decoration(value: DECORATION) {
      this._decoration = value;
    }

    public set position(value: Vector) {
      this._position = value;
    }

    public set price(value: number) {
      this._price = value;
    }

    public set name(value: string) {
      this._name = value;
    }

    // Functions
    public calculatePrice(): number {
      // Calculate price based on scoops, topping and decoration
      return 1;
    }

    public draw(position: Vector): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      let numberScoops: number = 0
      let fillColors: string[] = [];
      for (let i = 0; i < this.scoops.length; i++) {
        let scoop = this.scoops[i];
        if (scoop != FLAVOUR.NONE) {
          numberScoops++;
          switch (scoop) {
            case FLAVOUR.STRAWBERRY:
              fillColors.push("pink");
              break;
            case FLAVOUR.CHOCOLATE:
              fillColors.push("brown");
              break;
            case FLAVOUR.LEMON:
              fillColors.push("yellow");
              break;
            case FLAVOUR.SMURF:
              fillColors.push("cyan");
              break;
          }
        }
      }
      if (numberScoops == 1) {
        this.drawScoop1(position, fillColors[0]);
      }
      if (numberScoops == 2) {
        this.drawScoop2(position, fillColors[0], fillColors[1]);
      }
      if (numberScoops == 3) {
        this.drawScoop3(position, fillColors[0], fillColors[1], fillColors[2]);
      }
    }
    public drawScoop1(position: Vector, fillColor1: string): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      foregroundCtx.save();
      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "HSL(40,15%,90%)";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor1;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      if (this.topping !== TOPPING.NONE) {
        let imageWidth = 40;
        let imageHeight = 40;
        foregroundCtx.drawImage(images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
      }

      // Check if decoration is not none, then draw the image
      if (this.decoration !== DECORATION.NONE) {
        let imageWidth = 20;
        let imageHeight = 20;
        foregroundCtx.drawImage(images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
      }

      foregroundCtx.restore();
    }


    public drawScoop2(position: Vector, fillColor1: string, fillColor2: string): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      foregroundCtx.save();
      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "HSL(40,15%,90%)";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x + 15, position.y + 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor1;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor2;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      if (this.topping !== TOPPING.NONE) {
        let imageWidth = 40;
        let imageHeight = 40;
        foregroundCtx.drawImage(images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
      }

      // Check if decoration is not none, then draw the image
      if (this.decoration !== DECORATION.NONE) {
        let imageWidth = 20;
        let imageHeight = 20;
        foregroundCtx.drawImage(images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
      }

      foregroundCtx.restore();
    }


    public drawScoop3(position: Vector, fillColor1: string, fillColor2: string, fillColor3: string): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      foregroundCtx.save();
      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "HSL(40,15%,90%)";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor1;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x + 15, position.y - 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor2;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y + 20, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = fillColor3;
      foregroundCtx.fill();
      foregroundCtx.closePath();

      if (this.topping !== TOPPING.NONE) {
        let imageWidth = 40;
        let imageHeight = 40;
        foregroundCtx.drawImage(images[this.topping], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);
      }

      // Check if decoration is not none, then draw the image
      if (this.decoration !== DECORATION.NONE) {
        let imageWidth = 20;
        let imageHeight = 20;
        foregroundCtx.drawImage(images[this.decoration], position.x - imageWidth / 2, position.y - imageHeight / 2 - 20, imageWidth, imageHeight);
      }

      foregroundCtx.restore();
    }
  }

}

