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

    constructor(_scoops: FLAVOUR[], _topping: TOPPING, _decoration: DECORATION) {
      this._scoops = _scoops;
      this._topping = _topping;
      this._decoration = _decoration;
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

    // Functions
    public calculatePrice(): number {
      // Calculate price based on scoops, topping and decoration
      return 1;
    }

    public draw(): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      this.drawScoop1(new Vector(0.5 * cw, 0.2 * ch));
      this.drawScoop2(new Vector(0.3 * cw, 0.2 * ch));
      this.drawScoop3(new Vector(0.7 * cw, 0.2 * ch));
    }
    public drawScoop1(position: Vector): void {
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
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();


      let imageWidth = 80; 
      let imageHeight = 80;
      foregroundCtx.drawImage(images["cream"], position.x - imageWidth / 2 , position.y - imageHeight / 2 -40, imageWidth, imageHeight);
      
      foregroundCtx.restore();
    }


    public drawScoop2(position: Vector): void {
      let cw = foregroundCtx.canvas.width;
      let ch = foregroundCtx.canvas.height;
      foregroundCtx.save();
      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "HSL(40,15%,90%)";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x+15, position.y+10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x - 15, position.y - 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      let imageWidth = 40; 
      let imageHeight = 40;
      foregroundCtx.drawImage(images["sprinkles"], position.x - imageWidth / 2, position.y - imageHeight / 2, imageWidth, imageHeight);

      foregroundCtx.restore();
    }


    public drawScoop3(position: Vector): void {
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
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x + 15, position.y - 10, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.beginPath();
      foregroundCtx.arc(position.x, position.y + 20, 20, 0, 2 * Math.PI);
      foregroundCtx.fillStyle = "pink";
      foregroundCtx.fill();
      foregroundCtx.closePath();

      foregroundCtx.restore();
    }
  }

}

