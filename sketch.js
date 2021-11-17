var helicopteroIMG, helicopteroSprite, pacoteSprite, pacoteIMG, soloSprite;
var pacoteBody, solo;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopteroIMG = loadImage("helicopter.png");
	pacoteIMG = loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	//sprite de pacote
	pacoteSprite = createSprite(width / 2, 80, 10, 10);
	pacoteSprite.addImage(pacoteIMG);
	pacoteSprite.scale = 0.2;

	//sprite de heicoptero
	helicopteroSprite = createSprite(width / 2, 200, 10, 10);
	helicopteroSprite.addImage(helicopteroIMG);
	helicopteroSprite.scale = 0.6;

	//sprite de solo
	soloSprite = createSprite(width / 2, height - 35, width, 10);
	soloSprite.shapeColor = color(255);

	//criação do engine e do mundo
	engine = Engine.create();
	world = engine.world;

	//criação do corpo de física do pacote
	pacoteBody = Bodies.circle(width / 2, 200, 5, {
		//mude a restituição do pacote para que ele não quique
		restitution: 0,
		isStatic: true
	});
	World.add(world, pacoteBody);

	//criação do corpo de física do solo
	solo = Bodies.rectangle(width / 2, 650, width, 10, {
		isStatic: true
	});
	World.add(world, solo);

	//criação do corpo de física da caixa vermeha
	caixaPosicao = width / 2 - 100;
	caixaY = 610;

	caixaEsqSprite = createSprite(caixaPosicao, caixaY, 20, 100);
	caixaEsqSprite.shapeColor = color(255, 0, 0);

	caixaEsqBody = Bodies.rectangle(caixaPosicao + 20, caixaY, 20, 100, {
		isStatic: true
	});
	World.add(world, caixaEsqBody);

	caixaBase = createSprite(caixaPosicao + 100, caixaY + 40, 200, 20);
	caixaBase.shapeColor = color(255, 0, 0);

	caixaBaseBody = Bodies.rectangle(caixaPosicao + 100, caixaY + 45 - 20, 200, 20, {
		isStatic: true
	});
	World.add(world, caixaBaseBody);

	caixaEsqSprite = createSprite(caixaPosicao + 200, caixaY, 20, 100);
	caixaEsqSprite.shapeColor = color(255, 0, 0);

	caixaDirBody = Bodies.rectangle(caixaPosicao + 200 - 20, caixaY, 20, 100, {
		isStatic: true
	});
	World.add(world, caixaDirBody);

	// ativação do engine
	Engine.run(engine);

}

function draw() {
	rectMode(CENTER);
	background(0);

	pacoteSprite.x = pacoteBody.position.x;
	pacoteSprite.y = pacoteBody.position.y;

	drawSprites();
}

function keyPressed() {
	if (keyCode === 39) {
	 helicopteroSprite.x +=29
	 Body.translate(pacoteBody,{
		x:29,y:0
	})
	}
//faça o helicóptero mexer com as setas para os lados
//faça o pacote acompanhar o movimento do helicóptero usando Body.transate
	if (keyCode === 37) {
	 helicopteroSprite.x -=29
	 Body.translate(pacoteBody,{
		 x:-29,y:0
	 })
	}

//faça o pacote cair ao se pressionar a tecla para baixo
	if (keyCode === 40) {
	 Body.setStatic(pacoteBody,false);
	}
}