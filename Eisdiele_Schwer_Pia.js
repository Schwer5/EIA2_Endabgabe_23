"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <18.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1, mein Bruder, chat Gpt 
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", handleLoad);
    let MOOD;
    (function (MOOD) {
        MOOD[MOOD["HAPPY"] = 0] = "HAPPY";
        MOOD[MOOD["OKAY"] = 1] = "OKAY";
        MOOD[MOOD["NEUTRAL"] = 2] = "NEUTRAL";
        MOOD[MOOD["SAD"] = 3] = "SAD";
        MOOD[MOOD["ANGRY"] = 4] = "ANGRY";
    })(MOOD = Eisdiele.MOOD || (Eisdiele.MOOD = {}));
    let FLAVOUR;
    (function (FLAVOUR) {
        FLAVOUR["NONE"] = "";
        FLAVOUR["STRAWBERRY"] = "strawberry";
        FLAVOUR["CHOCOLATE"] = "chocolate";
        FLAVOUR["LEMON"] = "lemon";
        FLAVOUR["SMURF"] = "smurf";
    })(FLAVOUR = Eisdiele.FLAVOUR || (Eisdiele.FLAVOUR = {}));
    let TOPPING;
    (function (TOPPING) {
        TOPPING["NONE"] = "";
        TOPPING["CREAM"] = "cream";
        TOPPING["FRUIT"] = "fruit";
    })(TOPPING = Eisdiele.TOPPING || (Eisdiele.TOPPING = {}));
    let DECORATION;
    (function (DECORATION) {
        DECORATION["NONE"] = "";
        DECORATION["CHERRY"] = "cherry";
        DECORATION["CHOCOSAUCE"] = "chocosauce";
        DECORATION["SPRINKLES"] = "sprinkles";
        DECORATION["GLITTER"] = "glitter";
    })(DECORATION = Eisdiele.DECORATION || (Eisdiele.DECORATION = {}));
    class Vector {
        _x; //enthält Eigenschaften für die x- und y-Koordinaten des Vektors sowie Methoden 
        _y; //zum Lesen und Ändern dieser Eigenschaften
        constructor(x = 0, y = 0) {
            this._x = x;
            this._y = y;
        }
        // Getters
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        // Setters
        set x(value) {
            this._x = value;
        }
        set y(value) {
            this._y = value;
        }
        equals(other, tolerance = 0.01) {
            return Math.abs(this._x - other._x) < tolerance && Math.abs(this._y - other._y) < tolerance;
        }
    }
    Eisdiele.Vector = Vector;
    Eisdiele.images = {}; //Objekt zum Speichern von Bildern
    Eisdiele.globalData = []; //eine Liste von Eisprodukten
    Eisdiele.globalScore = 0;
    async function handleLoad(_event) {
        loaddata();
        let addtask = document.querySelector('#addrecipe');
        addtask.addEventListener('click', logaddtask);
        let backgroundCanvas = document.querySelector("#background"); //get canvas Element from HTML 
        let foregroundCanvas = document.querySelector("#foreground"); //get canvas Element from HTML
        if (!backgroundCanvas)
            return;
        if (!foregroundCanvas)
            return;
        backgroundCanvas.width = window.innerWidth * 0.48; //give backgroundCanvas width
        backgroundCanvas.height = window.innerHeight * 0.96; //give backgroundCanvas heigth
        foregroundCanvas.width = window.innerWidth * 0.48; //give foregroundCanvas width
        foregroundCanvas.height = window.innerHeight * 0.96; //give foregroundCanvas heigth
        Eisdiele.backgroundCtx = backgroundCanvas.getContext('2d'); //get canvas rendering context
        Eisdiele.foregroundCtx = foregroundCanvas.getContext('2d');
        Eisdiele.Customers = new Eisdiele.CustomerList();
        Eisdiele.globalIce = new Eisdiele.Ice([FLAVOUR.NONE, FLAVOUR.NONE, FLAVOUR.NONE], TOPPING.NONE, DECORATION.NONE);
        Eisdiele.Customers.addCustomer();
        let seat0 = document.querySelector("#seat0"); //select divs from html & add click event Listener
        seat0.addEventListener("click", Eisdiele.Customers.sendToSeat0);
        let seat1 = document.querySelector("#seat1");
        seat1.addEventListener("click", Eisdiele.Customers.sendToSeat1);
        let seat2 = document.querySelector("#seat2");
        seat2.addEventListener("click", Eisdiele.Customers.sendToSeat2);
        let seat3 = document.querySelector("#seat3");
        seat3.addEventListener("click", Eisdiele.Customers.sendToSeat3);
        let seat4 = document.querySelector("#seat4");
        seat4.addEventListener("click", Eisdiele.Customers.sendToSeat4);
        let seat5 = document.querySelector("#seat5");
        seat5.addEventListener("click", Eisdiele.Customers.sendToSeat5);
        let fruit = document.querySelector("#fruit");
        fruit.addEventListener("click", addToIce_fruit);
        let cream = document.querySelector("#cream");
        cream.addEventListener("click", addToIce_cream);
        let strawberry = document.querySelector("#strawberry");
        strawberry.addEventListener("click", addToIce_strawberry);
        let chocolate = document.querySelector("#chocolate");
        chocolate.addEventListener("click", addToIce_chocolate);
        let lemon = document.querySelector("#lemon");
        lemon.addEventListener("click", addToIce_lemon);
        let smurf = document.querySelector("#smurf");
        smurf.addEventListener("click", addToIce_smurf);
        let cherry = document.querySelector("#cherry");
        cherry.addEventListener("click", addToIce_cherry);
        let chocosauce = document.querySelector("#chocosauce");
        chocosauce.addEventListener("click", addToIce_chocosauce);
        let sprinkles = document.querySelector("#sprinkles");
        sprinkles.addEventListener("click", addToIce_sprinkles);
        let glitter = document.querySelector("#glitter");
        glitter.addEventListener("click", addToIce_glitter);
        loadImage("images/fruit.png", "fruit"); //give Picture Data a name
        loadImage("images/cream.png", "cream");
        loadImage("images/cherry.png", "cherry");
        loadImage("images/choco.png", "choco");
        loadImage("images/sprinkles.png", "sprinkles");
        loadImage("images/glitter.png", "glitter");
        drawBackground(); //draw static background
        // let testIce = new Ice([FLAVOUR.CHOCOLATE, FLAVOUR.LEMON], TOPPING.CREAM,DECORATION.GLITTER);
        // testIce.draw()
        setInterval(update, 20); //Funktion wird in regelmäßigen Abständen aufgerufen, um die Anzeige der Eisdiele zu aktualisieren. Sie löscht den Vordergrund-Canvas, aktualisiert den Zustand der Kunden und zeichnet das Eis auf dem Vordergrund-Canvas.
    }
    async function logaddtask() {
        const inputTodo = document.querySelector('#inputIce');
        const inputValue = inputTodo.value;
        const selectKugel1 = document.querySelector('#selectscoop1');
        const Kugel1Value = selectKugel1.value;
        const selectKugel2 = document.querySelector('#selectscoop2');
        const Kugel2Value = selectKugel2.value;
        const selectKugel3 = document.querySelector('#selectscoop3');
        const Kugel3Value = selectKugel3.value;
        const selectTopping = document.querySelector('#selecttopping');
        const toppingValue = selectTopping.value;
        const selectDecoration = document.querySelector('#selectdecoration');
        const decorationValue = selectDecoration.value;
        const selectPrice = document.querySelector('#inputPrice');
        const PriceValue = parseInt(selectPrice.value);
        let newid = 0;
        let idExists = true; //hier wird idExists auf false gesetzt, um zu überprüfen, 
        while (idExists) { //ob die aktuelle Nummer (newid) einzigartig ist. 
            newid = newid + 1; //Wir gehen zunächst davon aus, dass sie einzigartig ist, 
            idExists = false; //indem wir idExists auf false setzen. Dann überprüfen wir das, 
            for (let docId in Eisdiele.globalData) { //indem wir alle vorhandenen IDs in data durchgehen. Wenn wir eine gleiche ID finden, 
                let item = Eisdiele.globalData[docId]; //setzen wir idExists auf true, um zu zeigen, dass die aktuelle Nummer doch nicht einzigartig ist.
                if (item.id == newid) { // Dann suchen wir weiter nach einer einzigartigen Nummer.
                    idExists = true;
                }
            }
        }
        const newItem = {
            id: newid,
            icetitle: inputValue,
            Kugel1: Kugel1Value,
            Kugel2: Kugel2Value,
            Kugel3: Kugel3Value,
            Topping: toppingValue,
            Dekoration: decorationValue,
            Preis: PriceValue,
        };
        Eisdiele.globalData.push(newItem);
        createtask(newItem);
        await fetch(`https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=insert&collection=IceList&data=${JSON.stringify(newItem)}`);
        inputTodo.value = '';
        selectKugel1.value = '';
        selectKugel2.value = '';
        selectKugel3.value = '';
        selectTopping.value = '';
        selectDecoration.value = '';
        selectPrice.value = '';
    }
    async function createtask(item) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('inputtask');
        newDiv.innerHTML = `
        <p><strong>${item.icetitle}</strong></p>
        Kugel 1: <span id="scoop1">${item.Kugel1}</span></br>
        Kugel 2: <span id="scoop2">${item.Kugel2}</span></br>
        Kugel 3: <span id="scoop3">${item.Kugel3}</span></br>
        Topping: <span id="topping">${item.Topping}</span></br>
        Dekoration: <span id="decoration">${item.Dekoration}</span>
        Preis: <span id="price">${item.Preis}</span>
        <button id="deletetask"><i class="fas fa-trash"></i></button>
        `;
        let deleteButton = newDiv.querySelector('#deletetask');
        if (deleteButton) {
            deleteButton.addEventListener('click', function (event) {
                deletetaskdom(event);
                deleteDataFromServer(item.id);
            });
        }
        let container = document.querySelector('#task-container');
        container && container.appendChild(newDiv);
    }
    async function loaddata() {
        const response = await fetch("https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=find&collection=IceList");
        const dataJSON = await response.json();
        let data = dataJSON.data;
        for (let docId in data) {
            let item = data[docId];
            Eisdiele.globalData.push(item);
            createtask(item);
        }
    }
    function addToIce_fruit() {
        Eisdiele.globalIce.topping = TOPPING.FRUIT;
    }
    function addToIce_cream() {
        Eisdiele.globalIce.topping = TOPPING.CREAM;
    }
    function addToIce_strawberry() {
        if (Eisdiele.globalIce.scoops[0] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[0] = FLAVOUR.STRAWBERRY;
        }
        else if (Eisdiele.globalIce.scoops[1] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[1] = FLAVOUR.STRAWBERRY;
        }
        else if (Eisdiele.globalIce.scoops[2] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[2] = FLAVOUR.STRAWBERRY;
        }
    }
    function addToIce_chocolate() {
        if (Eisdiele.globalIce.scoops[0] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[0] = FLAVOUR.CHOCOLATE;
        }
        else if (Eisdiele.globalIce.scoops[1] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[1] = FLAVOUR.CHOCOLATE;
        }
        else if (Eisdiele.globalIce.scoops[2] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[2] = FLAVOUR.CHOCOLATE;
        }
    }
    function addToIce_lemon() {
        if (Eisdiele.globalIce.scoops[0] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[0] = FLAVOUR.LEMON;
        }
        else if (Eisdiele.globalIce.scoops[1] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[1] = FLAVOUR.LEMON;
        }
        else if (Eisdiele.globalIce.scoops[2] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[2] = FLAVOUR.LEMON;
        }
    }
    function addToIce_smurf() {
        if (Eisdiele.globalIce.scoops[0] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[0] = FLAVOUR.SMURF;
        }
        else if (Eisdiele.globalIce.scoops[1] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[1] = FLAVOUR.SMURF;
        }
        else if (Eisdiele.globalIce.scoops[2] == FLAVOUR.NONE) {
            Eisdiele.globalIce.scoops[2] = FLAVOUR.SMURF;
        }
    }
    function addToIce_cherry() {
        Eisdiele.globalIce.decoration = DECORATION.CHERRY;
    }
    function addToIce_chocosauce() {
        Eisdiele.globalIce.decoration = DECORATION.CHOCOSAUCE;
    }
    function addToIce_sprinkles() {
        Eisdiele.globalIce.decoration = DECORATION.SPRINKLES;
    }
    function addToIce_glitter() {
        Eisdiele.globalIce.decoration = DECORATION.GLITTER;
    }
    function deletetaskdom(event) {
        const target = event.target;
        const divToDelete = target.closest('div');
        divToDelete && divToDelete.remove();
    }
    async function deleteDataFromServer(id) {
        for (let i = 0; i < Eisdiele.globalData.length; i++) {
            let item = Eisdiele.globalData[i];
            if (item.id == id) {
                const deleteUrl = `https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=delete&collection=IceList&id=${item.id}`;
                await fetch(deleteUrl);
                Eisdiele.globalData.splice(i, 1); // Remove the item from the globalData array
                break;
            }
        }
    }
    function update() {
        Eisdiele.foregroundCtx.clearRect(0, 0, Eisdiele.foregroundCtx.canvas.width, Eisdiele.foregroundCtx.canvas.height); //clear canvas foreground for moving objects
        Eisdiele.Customers.update();
        Eisdiele.globalIce.draw(new Vector(0.5 * Eisdiele.foregroundCtx.canvas.width, 0.95 * Eisdiele.foregroundCtx.canvas.height));
    }
    function loadImage(url, imageName) {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            Eisdiele.images[imageName] = img;
        };
    }
    function drawBackground() {
        let cw = Eisdiele.foregroundCtx.canvas.width;
        let ch = Eisdiele.foregroundCtx.canvas.height;
        drawSeat(new Vector(0.12 * cw, 0.76 * ch)); //draw the seats on different positions not with pixel
        drawSeat(new Vector(0.27 * cw, 0.76 * ch));
        drawSeat(new Vector(0.41 * cw, 0.76 * ch));
        drawSeat(new Vector(0.55 * cw, 0.76 * ch));
        drawSeat(new Vector(0.70 * cw, 0.76 * ch));
        drawSeat(new Vector(0.84 * cw, 0.76 * ch));
        drawCounter(new Vector(0.05 * cw, 0.8 * ch));
    }
    function drawSeat(position) {
        Eisdiele.backgroundCtx.save();
        // backgroundCtx.translate(position.x, position.y);
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.arc(position.x, position.y, 50, 0, 2 * Math.PI);
        Eisdiele.backgroundCtx.fillStyle = "HSL(40,95%,70%)";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.arc(position.x, position.y, 30, 0, 2 * Math.PI);
        Eisdiele.backgroundCtx.fillStyle = "HSL(30,95%,40%)";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.restore();
    }
    function drawCounter(position) {
        let bw = Eisdiele.backgroundCtx.canvas.width;
        let bh = Eisdiele.backgroundCtx.canvas.height;
        Eisdiele.backgroundCtx.save();
        Eisdiele.backgroundCtx.translate(position.x, position.y);
        Eisdiele.backgroundCtx.beginPath();
        Eisdiele.backgroundCtx.moveTo(0, 0);
        Eisdiele.backgroundCtx.lineTo(0.9 * bw, 0);
        Eisdiele.backgroundCtx.lineTo(0.9 * bw, 0.1 * bh);
        Eisdiele.backgroundCtx.lineTo(0, 0.1 * bh);
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.fillStyle = "brown";
        Eisdiele.backgroundCtx.fill();
        Eisdiele.backgroundCtx.closePath();
        Eisdiele.backgroundCtx.restore();
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Eisdiele_Schwer_Pia.js.map