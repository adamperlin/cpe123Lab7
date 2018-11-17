const NUM_OF_HEART_LEAVES = 70;
const NUM_OF_SPEAR_LEAVES = 30;
const NUM_OF_CLOVERS = 50;
var heartX,heartY,heartScale,heartRot,heartColor;
var spearX,spearY,spearScale,spearRot,spearFillingColor;
var cloverX,cloverY,cloverScale,cloverColor;
const BEETLE_COUNT = 5;
const KEEP_BEETLES_ON_SCREEN = true;

// global count of how many times draw has been called.
let ANIMATION_ITERATIONS = 0;

// returns random true/false value
const randomBool = () => Boolean(Math.round(Math.random()));
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
        if (KEEP_BEETLES_ON_SCREEN) {
            if (this.x <= 0 || this.x >= width) {
                this.velocity.x = -this.velocity.x;
            }
    
            if (this.y <= 0 || this.y >= height) {
                this.velocity.y = -this.velocity.y;
            }
        }

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
	createCanvas(600,380);
	heartX = new Array(NUM_OF_HEART_LEAVES);
	heartY = new Array(NUM_OF_HEART_LEAVES);
	heartScale = new Array(NUM_OF_HEART_LEAVES);
	heartRot = new Array(NUM_OF_HEART_LEAVES);
	heartColor = new Array(NUM_OF_HEART_LEAVES);

	spearX = new Array(NUM_OF_SPEAR_LEAVES);
	spearY = new Array(NUM_OF_SPEAR_LEAVES);
	spearScale = new Array(NUM_OF_SPEAR_LEAVES);
	spearRot = new Array(NUM_OF_SPEAR_LEAVES);
	spearFillingColor = new Array(NUM_OF_SPEAR_LEAVES);

	cloverX = new Array(NUM_OF_CLOVERS);
	cloverY = new Array(NUM_OF_CLOVERS);
	cloverScale = new Array(NUM_OF_CLOVERS);
	cloverColor = new Array(NUM_OF_CLOVERS);

	for (var i = 0 ; i < NUM_OF_HEART_LEAVES; i++){
		heartX[i] = random(-1,width);
		heartY[i] = random(-height,200);
		heartScale[i] = random(0,.6);
		heartRot[i] = random(-PI,PI);
		heartColor[i] = color(random(9,120),random(90,170), random(30,140));
	}for (var i = 0 ; i < NUM_OF_SPEAR_LEAVES; i++){
		spearX[i] = random(-1,width);
		spearY[i] = random(-height+200,100);
		spearScale[i] = random(0.1,.55);
		spearRot[i] = random(-PI,PI);
		spearFillingColor[i] = color(random(80,160),random(150,255), random(100,180));
	}for (var i = 0; i < NUM_OF_CLOVERS; i++){
		cloverX[i] = random(-1,width);
		cloverY[i] = random(-200,210);
		cloverScale[i] = random(.15);
		cloverColor[i] = color(random(30,130),random(100,235), random(80,200));
	}
	for (var i = 0; i < BEETLE_COUNT; i++) {
       // change to make initial velocity more pronounced.
        let [vX, vY] = getRandomVelocity(0.5, 1.0);
        let b = new Beetle(
            random(3 * width / 4),
            random(3 * height/5, height),
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
	background(73,32,34);
	update();
    ANIMATION_ITERATIONS++;
	push();
		noStroke();
		fill(10,79,73);
		rect(0,-250,width,height);
	pop();
	drawLeaves();
}

function drawLeaves() {
	for (var i = 0; i < NUM_OF_SPEAR_LEAVES; i++){
		spearLeaf(spearX[i],spearY[i],spearScale[i],spearRot[i],spearFillingColor[i]);
	}for (var i = 0; i < NUM_OF_HEART_LEAVES; i++){
		heartShapedLeaf(heartX[i],heartY[i],heartScale[i],heartRot[i],heartColor[i]._getRed(),heartColor[i]._getGreen(),heartColor[i]._getBlue());
	}for (var i = 0; i < 10; i++){
		spearLeaf(spearX[i],spearY[i],.2,spearRot[i]+.5,spearFillingColor[i]);
	}for (var i = 0 ; i < NUM_OF_CLOVERS; i++){
		fill(cloverColor[i]);
		drawClover(cloverX[i],cloverY[i],cloverScale[i]);
	}
	heartShapedLeaf(102,270,.55,5/8*PI,19,53,59);
	heartShapedLeaf(520,110,.5,0,75,145,88);
	spearLeaf(210,0,.4,0,color(175,232,156));	
	drawClover(width/2,height-50,.11);
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

function drawClover(x, y, sc) {
   let rot = 0;
   for (var i = 0; i < 3; i++) {
        push();
            translate(x, y);
            rotate(rot);
            scale(sc+(.01*i));
            
            beginShape();
                curveVertex(0, 0);
                curveVertex(0, 0);
                curveVertex(-34, -25)
                curveVertex(-63, -39)
                curveVertex(-94, -54)
                curveVertex(-121, -64)
                curveVertex(-153, -41)
                curveVertex(-172, 4)
                curveVertex(-172, 49)
                curveVertex(-167, 77)
                curveVertex(-151, 100)
                curveVertex(-122, 122)
                curveVertex(-92, 122)
                curveVertex(-59, 104)
                curveVertex(-26, 64)
                curveVertex(-6, 31)
                curveVertex(0, 0);
                curveVertex(0, 0);
            endShape();
        pop();
        rot += 2 * Math.PI / 3;
    }
}

function spearLeaf(x,y,s,r,lightGreen) {
	var smLeaf_X,smLeaf_Y,smLeaf_S,smLeaf_R;
	push();
		translate(x,y);
		scale(s);
		rotate(r);
		fill(37,112,87);
		beginShape();
			curveVertex(0,0);
			curveVertex(0,0);
			curveVertex(-89,44);
			curveVertex(-164,139);
			curveVertex(-196,264);
			curveVertex(-175,426);
			curveVertex(-112,541);
			curveVertex(-29,471);
			curveVertex(48,340);
			curveVertex(85,226);
			curveVertex(93,110);
			curveVertex(85,44);
			curveVertex(50,10);
			curveVertex(50,10);
		endShape();

		smLeaf_X = 15;
		smLeaf_Y = 10;
		smLeaf_S = .9;
		smLeaf_R = 1;
		
		// to fill in the little leaves
		for (var i = 0; i < 5; i++){
			smallPointyLeaf(smLeaf_X,smLeaf_Y,smLeaf_S,0,lightGreen);
			smLeaf_X -= 25;
			smLeaf_Y += (100 - (10*i));
			smLeaf_S -= .07;
		}

		smLeaf_S = .4;
		smLeaf_X = -100;

		for (var i = 0 ; i < 6; i ++){
			smallPointyLeaf(smLeaf_X,smLeaf_Y,smLeaf_S,smLeaf_R,lightGreen);
			smLeaf_X += (5 + (i*7));
			smLeaf_Y -= (55 + (10*i));
			smLeaf_S += .1;
			smLeaf_R += .05;
		}
		smallPointyLeaf(-95,430,.4,.5,lightGreen);
		
	pop();
}

function smallPointyLeaf(x,y,s,r,col) {
	push();
		fill(col);
		translate(x,y);
		rotate(r);
		scale(s);
		beginShape();
			curveVertex(0,0);//224,97
			curveVertex(0,0);
			curveVertex(3,57);
			curveVertex(24,121);
			curveVertex(64,205);
			curveVertex(63,153);
			curveVertex(44,66);
			curveVertex(21,23);
			curveVertex(21,23);
		endShape();
	pop();
}

function heartShapedLeaf(x,y,s,r,COL_R,COL_G,COL_B) {
	push();
		
		translate(x,y);
		scale(s);
		rotate(r);
		fill(COL_R,COL_G,COL_B);
		stroke(COL_R/1.5,COL_G/1.3,COL_B/1.6);
		strokeWeight(2);
		beginShape();
			curveVertex(0,0);//162,11
			curveVertex(0,0);
			curveVertex(-17,42);
			curveVertex(-41,15);
			curveVertex(-83,9);
			curveVertex(-125,31);
			curveVertex(-146,103);
			curveVertex(-98,187);
			curveVertex(-14,208);
			curveVertex(69,145);
			curveVertex(86,59);
			curveVertex(50,32);
			curveVertex(14,34);
			curveVertex(-9,44);
			curveVertex(4,13);
			curveVertex(6,5);
			curveVertex(6,5);
		endShape();
		strokeWeight(5);
		if ( COL_G >150){
			stroke(COL_R /3.1, COL_G / 2, COL_B/2,90);
		} else {
			stroke(COL_R *3.1, COL_G * 2, COL_B*2,90);
		}
		line(-12,43,-55,204);
		bezier(-15,52,13,55,51,73,84,101);
		bezier(-22,68,-52,52,-79,44,-135,54);
		bezier(-24,90,-4,104,21,125,40,170);
		bezier(-36,118,-72,110,-106,117,-135,135);
		bezier(-35,132,-24,140,-11,169,-6,202);
		bezier(-43,150,-73,157,-86,170,-97,187);
		bezier(-46,170,-40,185,-37,194,-34,206);
		bezier(-51,182,-57,187,-60,191,-65,202);
	pop();
}
function update() {
    beetles.forEach(beetle => {
        beetle.updatePos();
        beetle.draw();
    })
}
