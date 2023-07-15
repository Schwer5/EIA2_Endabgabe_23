// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1

namespace Eisdiele {
    window.addEventListener("load", handleLoad);

    enum MOOD {
        HAPPY,
        OKAY,
        NEUTRAL,
        SAD,
        ANGRY
    }
    enum FLAVOUR {
        STRAWBERRY,
        CHOCOLATE,
        LEMON,
        SMURF
    }
    enum TOPPING {
        CREAM,
        FRUIT
    }
    enum DECORATION {
        CHERRY,
        CHOCOSAUCE,
        SPRINKLES,
        GLITTER
    }

    function handleLoad(_event: Event): void {
        
        setInterval(update, 40);
    }

    function update(): void {
        
    }
}

