"use strict";
// Name:<Pia Schwer>
// Matrikel: <272266>
// Datum: <15.04.23>
// Zusammenarbeit mit Theresa Hauser, Marie Eckl
// Quellen: Stack Overflow, Developer Mozilla,Github Jirka, Vorherige Aufgabe(n) aus EIA1
var L102;
(function (L102) {
    window.addEventListener("load", handleLoad);
    L102.goldenCut = 0.62;
    let movingObjects = [];
    function handleLoad(_event) {
        let backgroundCanvas = document.querySelector("#background");
        let foregroundCanvas = document.querySelector("#foreground");
        if (!backgroundCanvas)
            return;
        if (!foregroundCanvas)
            return;
        L102.backgroundCtx = backgroundCanvas.getContext('2d');
        L102.foregroundCtx = foregroundCanvas.getContext('2d');
        let horizon = L102.backgroundCtx.canvas.height * L102.goldenCut;
        let posMountains = { x: 0, y: horizon };
        drawSky();
        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawTriangle({ x: 0, y: 440 });
        drawTree({ x: 100, y: 200 });
        drawTree({ x: 50, y: 250 });
        drawTree({ x: 20, y: 190 });
        drawLandingArea({ x: 400, y: 500 }, 220, 60);
        drawKiosk({ x: 700, y: 550 });
        drawWindSock({ x: 350, y: 580 });
        for (let index = 0; index < 10; index++) { // 10 Paragleiter erstellen
            let startingPointX = 750 + Math.random() * 20; // Startpunkt zufällig verteilt in der Nähe des Kiosks
            let startingPointY = 490 + Math.random() * 20;
            let color = Math.floor(Math.random() * 360); // Zufällige Farbe
            let saturation = Math.floor(Math.random() * 30) + 90; // Zufällige Sättigung 
            let lightness = Math.floor(Math.random() * 30) + 30; // Zufällige Helligkeit
            let colorHsl = "hsl(" + color + ", " + saturation + "%, " + lightness + "%)"; // Alles zusammenbauen als HSL-String
            let person = new Person({ x: startingPointX, y: startingPointY }, Activity.WALK, colorHsl); // Paragleiter erstellen
            movingObjects.push(person); // Den neuen Paragleiter in die Liste stecken
        }
        ;
        for (let index = 0; index < 10; index++) { // 10 Mosquos erstellen 
            let startingPointX = Math.random() * L102.foregroundCtx.canvas.width; // Startpunkt völlig zufällig
            let startingPointY = Math.random() * L102.foregroundCtx.canvas.height;
            let mosquito = new Mosquito({ x: startingPointX, y: startingPointY }); // ein Mosquo erstellen 
            movingObjects.push(mosquito); // und in die Elonn Mosque liste schieben
        }
        //in den beiden for-Schleifen erstellen wir die 10 Paraglider und Fliegen
        setInterval(update, 40);
    }
    function update() {
        L102.foregroundCtx.clearRect(0, 0, L102.foregroundCtx.canvas.width, L102.foregroundCtx.canvas.height);
        for (let object of movingObjects) {
            object.update();
        }
    }
    function drawSky() {
        console.log("Background");
        let gradient = L102.backgroundCtx.createLinearGradient(0, 0, 0, L102.backgroundCtx.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(L102.goldenCut - 0.1, "white");
        gradient.addColorStop(L102.goldenCut, "HSL(100,80%,20%");
        gradient.addColorStop(1, "HSL(100,90%,40%");
        L102.backgroundCtx.fillStyle = gradient;
        L102.backgroundCtx.fillRect(0, 0, L102.backgroundCtx.canvas.width, L102.backgroundCtx.canvas.height);
        L102.backgroundCtx.restore();
    }
    function drawSun(_position) {
        console.log("sun", _position);
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        let r1 = 10;
        let r2 = 100;
        let gradient = L102.backgroundCtx.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60,100%,90%,1");
        gradient.addColorStop(1, "HSLA(60,50%,50%,0");
        L102.backgroundCtx.fillStyle = gradient;
        L102.backgroundCtx.arc(0, 0, r2, 0, 2 * Math.PI);
        L102.backgroundCtx.fill();
        L102.backgroundCtx.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = L102.backgroundCtx.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L102.backgroundCtx.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L102.backgroundCtx.translate(x, y);
            L102.backgroundCtx.fill(particle);
            L102.backgroundCtx.restore();
        }
        L102.backgroundCtx.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.moveTo(0, 0);
        L102.backgroundCtx.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            L102.backgroundCtx.lineTo(x, y);
        } while (x < L102.backgroundCtx.canvas.width);
        L102.backgroundCtx.lineTo(x, 0);
        L102.backgroundCtx.closePath();
        let gradient = L102.backgroundCtx.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        L102.backgroundCtx.fillStyle = gradient;
        L102.backgroundCtx.fill();
        L102.backgroundCtx.restore();
    }
    function drawLandingArea(_position, _radiusX, _radiusY) {
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.scale(_radiusX / _radiusY, 1);
        L102.backgroundCtx.fillStyle = "green";
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.arc(0, 0, _radiusY, 0, 2 * Math.PI);
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.fill();
        L102.backgroundCtx.restore();
    }
    function drawTriangle(_position) {
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.moveTo(0, 0); // Erster Punkt des Dreiecks
        L102.backgroundCtx.lineTo(400, 0); // Zweiter Punkt des Dreiecks
        L102.backgroundCtx.lineTo(0, -200); // Dritter Punkt des Dreiecks
        L102.backgroundCtx.closePath(); // Schließt den Pfad und führt zum ersten Punkt zurück
        L102.backgroundCtx.fillStyle = "grey";
        L102.backgroundCtx.fill();
        L102.backgroundCtx.restore();
    }
    function drawKiosk(_position) {
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.moveTo(0, 0); //1
        L102.backgroundCtx.lineTo(70, 0); //2
        L102.backgroundCtx.lineTo(70, -50); //3
        L102.backgroundCtx.lineTo(0, -100); //4
        L102.backgroundCtx.fillStyle = "brown";
        L102.backgroundCtx.fill();
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.moveTo(80, -50);
        L102.backgroundCtx.lineTo(-10, -100);
        L102.backgroundCtx.lineWidth = 10;
        L102.backgroundCtx.strokeStyle = "red";
        L102.backgroundCtx.stroke();
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.restore();
    }
    function drawTree(_position) {
        console.log("Tree", _position);
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.fillStyle = "brown";
        L102.backgroundCtx.fillRect(_position.x, _position.y, 15, 100);
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.arc(_position.x + 7, _position.y - 30, 40, 0, 2 * Math.PI);
        L102.backgroundCtx.fillStyle = "green";
        L102.backgroundCtx.fill();
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.restore();
    }
    function drawWindSock(_position) {
        console.log("WindSock", _position);
        L102.backgroundCtx.save();
        L102.backgroundCtx.translate(_position.x, _position.y);
        // Draw the pole
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.moveTo(0, 0);
        L102.backgroundCtx.lineTo(0, -80);
        L102.backgroundCtx.strokeStyle = "black";
        L102.backgroundCtx.lineWidth = 2;
        L102.backgroundCtx.stroke();
        // Draw the windsock
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.ellipse(30, -80, 30, 10, Math.PI, 0, 1.75 * Math.PI);
        L102.backgroundCtx.fillStyle = "red";
        L102.backgroundCtx.fill();
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.beginPath();
        L102.backgroundCtx.ellipse(30, -80, 25, 5, Math.PI, 0, 1.75 * Math.PI);
        L102.backgroundCtx.fillStyle = "white";
        L102.backgroundCtx.fill();
        L102.backgroundCtx.closePath();
        L102.backgroundCtx.restore();
    }
})(L102 || (L102 = {}));
//# sourceMappingURL=L10.2Luftfahrt.js.map