//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//variavel do raio para usar como parametro para encostar o inicio da bolinha na borda
let raio = diametro / 2;

//variavel da raquete
let xRaquete = 5;
let yRaquete = 180;
let wRaquete = 10;
let hRaquete = 100;

// variavel da raquete oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 180;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(800, 500);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeYX();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  verificaoColisaoRaquete(xRaquete, yRaquete);
  verificaoColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimenteRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  

  function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
  }

  function velocidadeYX() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
  }

  function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
    }
  }
  function mostraRaquete(x, y) {
    rect(x, y, wRaquete, hRaquete);
  }
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 20;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 20;
  }
}

function verificaoColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
 if (colidiu) {
   velocidadeXBolinha *= -1;
   raquetada.play();
 }
  
}

function movimenteRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}




function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20)
  fill(color(255, 140, 0));
  rect(267, 7, 40, 25);
  fill(255);
  text(meusPontos, 287, 26);
  fill(color(255, 140, 0));
  rect(500, 7, 40, 25);
  fill(255);
  text(pontosOponente, 520, 26);
}

function marcaPonto () {
  if(xBolinha > 795){
    meusPontos += 1;
    ponto.play();
  } 
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
    
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 30
    }
}