const canvasWidth = 600, canvasHeight = 380;
const BEETLE_COUNT = 3;

// global count of how many times draw has been called.
let ANIMATION_ITERATIONS = 0;

// returns random true/false value
const randomBool = () => Boolean(Math.round(Math.random()));

// This encapsulates all state for beetle animation.
// beetles are drawn using the drawBeetle helper method.
class Beetle {
    constructor(x, y, vx, vy, scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.velocity = createVector(vx, vy);
        this.rot = 0;

        let colors = {
            shellColor: color(147 + random(-100, 100), 70 + random(-50, 50), random(0, 100)),
            ringColor: [
                color(156 + random(0, 50), 79 + random(0, 100), 9),
                color(198 + random(0, 50), 178, 126),
                color(95 + random(0, -50), 99, 78),
                color(211, 148 + random(0, 100), 127),
                color(182, 148 + random(0, 100), 119),
            ],
            ringColor2: [
                color(177, 117, 49),
                color(232, 178, 116)
            ]
        }
        this.colors = colors;
    }

    updatePos() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.rot = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI/2;
        

        // Every 3/4 second assuming 60fps framerate
        if (ANIMATION_ITERATIONS % 45 == 0) {
            
            // CHANGE to make random velocity increments more pronounced
            let [xInc, yInc] = getRandomVelocity(0.2, 0.5);
            this.velocity.x += xInc;
            this.velocity.y += yInc;
        }
    }

    draw() {
        drawBeetle(this.x, this.y, this.scale, this.rot, this.colors);
    }
}

function getRandomVelocity(min, max) {
    let moveRight = randomBool();
    let xVel = moveRight ? random(min, max) : random(-max, -min);
    let yVel = random(-max, -min);

    return [xVel, yVel];
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(255);

    for (var i = 0; i < BEETLE_COUNT; i++) {
       // change to make initial velocity more pronounced.
        let [vX, vY] = getRandomVelocity(0.5, 1.0);
        let b = new Beetle(
            random(3 * canvasWidth / 4),
            random(3 * canvasHeight/5, canvasHeight),
            vX,
            vY,
            // change to make beetles have larger scale range
            random(0.1, 0.2)
        );
        beetles.push(b);
    }
    frameRate(60);
}

let beetles = [];

function draw() {
    background(255);
    update();
    ANIMATION_ITERATIONS++;
}

function update() {
    beetles.forEach(beetle => {
        beetle.updatePos();
        beetle.draw();
    })
}

function drawBeetle(x, y, sc, rot, colors) {
    const beetleShellColor = color(112, 53, 34);
    push();
        fill(beetleShellColor);
        translate(x, y);
        rotate(rot);
        scale(sc);

        // main shell
        beginShape();
        // 214, 65
            curveVertex(0, 0);
            curveVertex(0, 0);
            curveVertex(-55, 12);
            curveVertex(-88, 31);
            curveVertex(-95, 79);
            curveVertex(-94, 157);
            curveVertex(-78, 193);
            curveVertex(-32, 222);
            curveVertex(14, 233);
            curveVertex(64, 232);
            curveVertex(105, 218);
            curveVertex(131, 186);
            curveVertex(147, 140);
            curveVertex(152, 102);
            curveVertex(152, 55); // 131
            curveVertex(146, 40);
            curveVertex(124, 26);
            curveVertex(101, 14); //79
            curveVertex(73, 5);
            curveVertex(56, 1);
            curveVertex(36, 0);
            curveVertex(18, -2);
            //curveVertex(184, 68);
            //curveVertex(184, 68);
            curveVertex(0, 0);
            curveVertex(0, 0);
        endShape();

        // shell coloring 1
        fill(colors.shellColor);
        beginShape();
            curveVertex(-58, 24);
            curveVertex(-58, 24);
            curveVertex(-12, 45);
            curveVertex(10, 76)
            curveVertex(12, 120)
            curveVertex(6, 186)
            curveVertex(-2, 224)
            curveVertex(-33, 219)
            curveVertex(-70, 188)
            curveVertex(-88, 162)
            curveVertex(-92, 115)
            curveVertex(-89, 48)
            curveVertex(-81, 26);
            curveVertex(-58, 24); 
            curveVertex(-58, 24);
        endShape();

        // shell coloring 2

        beginShape();
            curveVertex(111,44);
            curveVertex(111,44); 
            curveVertex(61, 65);
            curveVertex(40, 89);
            curveVertex(29, 141);
            curveVertex(30, 180);
            curveVertex(38, 225);
            curveVertex(62, 228);
            curveVertex(110, 208);
            curveVertex(134, 175);
            curveVertex(142, 140);
            curveVertex(145, 88);
            curveVertex(142, 44);
            curveVertex(111,44);
            curveVertex(111,44);
        endShape();


        // eye 1
        fill(0);
        ellipse(-3, 15, 20, 20);

        // eye 2
        ellipse(75, 18, 20, 20);

        fill(colors.ringColor[0]);
        ellipse(-47, 94, 10, 10);
        ellipse(97, 104, 10, 10);
        

        // circular pattern
        push();
            noFill();
            strokeWeight(8);
            
           // stroke(198, 178, 126);
            stroke(colors.ringColor[1]);
            arc(-47, 94, 30, 30, 0, TWO_PI);
            arc(97, 104, 30, 30, 0, TWO_PI);

            //stroke(95, 99, 78);
            stroke(colors.ringColor[2]);
            arc(-47, 94, 60, 60, 0, TWO_PI);
            arc(97, 104, 60, 60, 0, TWO_PI);

            //stroke(211, 148, 127);
            stroke(colors.ringColor[3])
            arc(-47, 94, 80, 80, 0, TWO_PI);
            arc(97, 104, 80, 80, 0, TWO_PI);

            //stroke(182, 148, 119);
            stroke(colors.ringColor[4])
            arc(-47, 94, 110, 110, PI/6, 2 * PI / 3);
            arc(97, 104, 110, 110, PI / 3, 5 * PI / 6); 
        pop();

        ellipse(61, 208, 20, 20);
        ellipse(-29, 200, 20, 20);

        push();
            noFill();
            strokeWeight(10);

            
            //stroke(177, 117, 49);

            stroke(colors.ringColor2[0]);

            arc(61, 208, 25, 25, 0, TWO_PI);
            arc(-29, 200, 25, 25, 0, TWO_PI);

            //stroke(232, 178, 116);

            stroke(colors.ringColor2[1]);

            arc(61, 208, 70, 70, 4 * PI / 3, 11 * PI / 6);
            arc(-29, 200, 70, 70, 7 * PI / 6, 5 * PI / 3);
        pop();

        // 237, 65
        // 237, 2
        // 

        strokeWeight(8);

        push();
            noFill();
            scale(0.4);
            stroke(71, 46, 47);
            
            beginShape();
                curveVertex(0, 0);
                curveVertex(0, 0);
                curveVertex(-4, -190)
                curveVertex(-15, -190)
                curveVertex(-14, -246)
                curveVertex(-24, -349)
                curveVertex(-32, -433)
                curveVertex(-44, -523)
                curveVertex(-58, -605)
                curveVertex(-99, -700)
                curveVertex(-147, -751)
                curveVertex(-227, -800)
                curveVertex(-272, -819)
                curveVertex(-272, -819)
            endShape();
        pop();

        push();
            noFill();
            translate(75, 5);
            scale(0.4);
            stroke(71, 46, 47);

            beginShape();
                curveVertex(0, 0);
                curveVertex(0, 0)
                curveVertex(1, -55)
                curveVertex(13, -166)
                curveVertex(21, -296)
                curveVertex(35, -412)
                curveVertex(50, -523)
                curveVertex(63, -612)
                curveVertex(96, -685)
                curveVertex(148, -755)
                curveVertex(234, -806)
                curveVertex(283, -826)
                curveVertex(283, -826)
            endShape();
        pop();
    pop();
}