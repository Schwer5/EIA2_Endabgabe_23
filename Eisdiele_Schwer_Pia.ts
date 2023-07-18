// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <18.07.23>
// Zusammenarbeit mit Theresa Hauser
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1, mein Bruder, chat Gpt 

namespace Eisdiele {
    window.addEventListener("load", handleLoad);

    export interface Item {
        id: number;
        icetitle: string;
        Kugel1: string;
        Kugel2: string;
        Kugel3: string;
        Topping: string;
        Dekoration: string;
        Preis: number;
    }
    
    export enum MOOD {
        HAPPY,
        OKAY,
        NEUTRAL,
        SAD,
        ANGRY
    }
    export enum FLAVOUR {
        NONE = "",
        STRAWBERRY = "strawberry",
        CHOCOLATE = "chocolate",
        LEMON = "lemon",
        SMURF = "smurf"
    }
    
    export enum TOPPING {
        NONE = "",
        CREAM = "cream",
        FRUIT = "fruit"
    }
    
    export enum DECORATION {
        NONE = "",
        CHERRY = "cherry",
        CHOCOSAUCE = "chocosauce",
        SPRINKLES = "sprinkles",
        GLITTER = "glitter"
    }
    
    export class Vector {
        private _x: number; //enthält Eigenschaften für die x- und y-Koordinaten des Vektors sowie Methoden 
        private _y: number; //zum Lesen und Ändern dieser Eigenschaften
        
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
    export let images: { [key: string]: HTMLImageElement } = {}; //Objekt zum Speichern von Bildern
    export let globalData: Item[] = []; //eine Liste von Eisprodukten
    export let globalIce: any; //ein einzelnes Eisobjekt

    export let globalScore: number = 0;
    
    async function handleLoad(_event: Event) {
        
        loaddata();
        let addtask: HTMLElement = <HTMLElement>document.querySelector('#addrecipe');
        addtask.addEventListener('click', logaddtask);
        
        
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
        globalIce = new Ice([FLAVOUR.NONE, FLAVOUR.NONE, FLAVOUR.NONE], TOPPING.NONE, DECORATION.NONE);
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

        let fruit: HTMLDivElement = document.querySelector("#fruit") as HTMLDivElement;
        fruit.addEventListener("click", addToIce_fruit)
        let cream: HTMLDivElement = document.querySelector("#cream") as HTMLDivElement;
        cream.addEventListener("click", addToIce_cream)
        let strawberry: HTMLDivElement = document.querySelector("#strawberry") as HTMLDivElement;
        strawberry.addEventListener("click", addToIce_strawberry)
        let chocolate: HTMLDivElement = document.querySelector("#chocolate") as HTMLDivElement;
        chocolate.addEventListener("click", addToIce_chocolate)
        let lemon: HTMLDivElement = document.querySelector("#lemon") as HTMLDivElement;
        lemon.addEventListener("click", addToIce_lemon)
        let smurf: HTMLDivElement = document.querySelector("#smurf") as HTMLDivElement;
        smurf.addEventListener("click", addToIce_smurf)
        let cherry: HTMLDivElement = document.querySelector("#cherry") as HTMLDivElement;
        cherry.addEventListener("click", addToIce_cherry)
        let chocosauce: HTMLDivElement = document.querySelector("#chocosauce") as HTMLDivElement;
        chocosauce.addEventListener("click", addToIce_chocosauce)
        let sprinkles: HTMLDivElement = document.querySelector("#sprinkles") as HTMLDivElement;
        sprinkles.addEventListener("click", addToIce_sprinkles)
        let glitter: HTMLDivElement = document.querySelector("#glitter") as HTMLDivElement;
        glitter.addEventListener("click", addToIce_glitter)

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

    async function logaddtask(): Promise<void> {

        const inputTodo = document.querySelector('#inputIce') as HTMLInputElement;
        const inputValue = inputTodo.value;

        const selectKugel1 = document.querySelector('#selectscoop1') as HTMLSelectElement;
        const Kugel1Value = selectKugel1.value;

        const selectKugel2 = document.querySelector('#selectscoop2') as HTMLSelectElement;
        const Kugel2Value = selectKugel2.value;

        const selectKugel3 = document.querySelector('#selectscoop3') as HTMLSelectElement;
        const Kugel3Value = selectKugel3.value;

        const selectTopping = document.querySelector('#selecttopping') as HTMLSelectElement;
        const toppingValue = selectTopping.value;

        const selectDecoration = document.querySelector('#selectdecoration') as HTMLSelectElement;
        const decorationValue = selectDecoration.value;

        const selectPrice = document.querySelector('#inputPrice') as HTMLInputElement;
        const PriceValue = parseInt(selectPrice.value);


        let newid = 0;
        let idExists = true//hier wird idExists auf false gesetzt, um zu überprüfen, 
        while (idExists) {//ob die aktuelle Nummer (newid) einzigartig ist. 
            newid = newid + 1//Wir gehen zunächst davon aus, dass sie einzigartig ist, 
            idExists = false//indem wir idExists auf false setzen. Dann überprüfen wir das, 
            for (let docId in globalData) {//indem wir alle vorhandenen IDs in data durchgehen. Wenn wir eine gleiche ID finden, 
                let item = globalData[docId]//setzen wir idExists auf true, um zu zeigen, dass die aktuelle Nummer doch nicht einzigartig ist.
                if (item.id == newid) {// Dann suchen wir weiter nach einer einzigartigen Nummer.
                    idExists = true;
                }
            }
        } 

        const newItem: Item = {
            id: newid,
            icetitle: inputValue,
            Kugel1: Kugel1Value,
            Kugel2: Kugel2Value,
            Kugel3: Kugel3Value,
            Topping: toppingValue,
            Dekoration: decorationValue,
            Preis: PriceValue,
        };
        globalData.push(newItem);

        createtask(newItem);
        await fetch(`https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=insert&collection=IceList&data=${JSON.stringify(newItem)}`);

        inputTodo.value = '';
        selectKugel1.value = '';
        selectKugel2.value = '';
        selectKugel3.value = '';
        selectTopping.value = '';
        selectDecoration.value = '';
        selectPrice.value='';
    }

    async function createtask(item: Item): Promise<void> {
        let newDiv = document.createElement('div');
        newDiv.classList.add('inputtask')
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
    async function loaddata(): Promise<void> {
        const response = await fetch("https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=find&collection=IceList");
        const dataJSON = await response.json();
        let data = dataJSON.data;
        for (let docId in data) {
            let item = data[docId]

            globalData.push(item);

            createtask(item);
        }
    }

    function addToIce_fruit(): void{
        globalIce.topping = TOPPING.FRUIT;
    }
    function addToIce_cream(): void{
        globalIce.topping = TOPPING.CREAM;
    }
    function addToIce_strawberry(): void{
        if (globalIce.scoops[0] == FLAVOUR.NONE){
            globalIce.scoops[0] = FLAVOUR.STRAWBERRY; 
        }
        else if (globalIce.scoops[1] == FLAVOUR.NONE){
            globalIce.scoops[1] = FLAVOUR.STRAWBERRY; 
        }
        else if (globalIce.scoops[2] == FLAVOUR.NONE){
            globalIce.scoops[2] = FLAVOUR.STRAWBERRY; 
        }
        
    }
    function addToIce_chocolate(): void{
        if (globalIce.scoops[0] == FLAVOUR.NONE){
            globalIce.scoops[0] = FLAVOUR.CHOCOLATE; 
        }
        else if (globalIce.scoops[1] == FLAVOUR.NONE){
            globalIce.scoops[1] = FLAVOUR.CHOCOLATE; 
        }
        else if (globalIce.scoops[2] == FLAVOUR.NONE){
            globalIce.scoops[2] = FLAVOUR.CHOCOLATE; 
        }
    }
    function addToIce_lemon(): void{
        if (globalIce.scoops[0] == FLAVOUR.NONE){
            globalIce.scoops[0] = FLAVOUR.LEMON; 
        }
        else if (globalIce.scoops[1] == FLAVOUR.NONE){
            globalIce.scoops[1] = FLAVOUR.LEMON; 
        }
        else if (globalIce.scoops[2] == FLAVOUR.NONE){
            globalIce.scoops[2] = FLAVOUR.LEMON; 
        }
    }
    function addToIce_smurf(): void{
        if (globalIce.scoops[0] ==  FLAVOUR.NONE){
            globalIce.scoops[0] = FLAVOUR.SMURF; 
        }
        else if (globalIce.scoops[1] ==  FLAVOUR.NONE){
            globalIce.scoops[1] = FLAVOUR.SMURF; 
        }
        else if (globalIce.scoops[2] ==  FLAVOUR.NONE){
            globalIce.scoops[2] = FLAVOUR.SMURF; 
        }
    }
    function addToIce_cherry(): void{
        globalIce.decoration = DECORATION.CHERRY
    }
    function addToIce_chocosauce(): void{
        globalIce.decoration = DECORATION.CHOCOSAUCE 
    }
    function addToIce_sprinkles(): void{
        globalIce.decoration = DECORATION.SPRINKLES
    }
    function addToIce_glitter(): void{
        globalIce.decoration = DECORATION.GLITTER
    }

    function deletetaskdom(event: Event): void {
        const target = event.target as HTMLElement;
        const divToDelete = target.closest('div');
        divToDelete && divToDelete.remove();
    }

    async function deleteDataFromServer(id: number): Promise<void> {
        for (let i = 0; i < globalData.length; i++) { 
            let item = globalData[i] 
            if (item.id == id) {
                const deleteUrl = `https://webuser.hs-furtwangen.de/~schwerpi/Database/?command=delete&collection=IceList&id=${item.id}`;
                await fetch(deleteUrl);
                globalData.splice(i, 1); // Remove the item from the globalData array
                break;
            }
        }
    }

    function update(): void {
        foregroundCtx.clearRect(0, 0, foregroundCtx.canvas.width, foregroundCtx.canvas.height); //clear canvas foreground for moving objects
        Customers.update();
        globalIce.draw(new Vector(0.5 * foregroundCtx.canvas.width, 0.95 * foregroundCtx.canvas.height));
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
    function drawSeat(position: Vector): void {
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
    function drawCounter(position: Vector): void {
        let bw = backgroundCtx.canvas.width;
        let bh = backgroundCtx.canvas.height;
        backgroundCtx.save();
        backgroundCtx.translate(position.x, position.y);
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(0, 0);
        backgroundCtx.lineTo(0.9 * bw, 0);
        backgroundCtx.lineTo(0.9 * bw, 0.1 * bh);
        backgroundCtx.lineTo(0, 0.1 * bh);
        backgroundCtx.closePath();
        backgroundCtx.fillStyle = "brown";
        backgroundCtx.fill();
        backgroundCtx.closePath();
        backgroundCtx.restore();
    }
}

