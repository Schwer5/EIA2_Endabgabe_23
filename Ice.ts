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
          // Draw ice cream
        }
      }
      
}

