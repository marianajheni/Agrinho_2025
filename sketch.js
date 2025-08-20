let xCaminhao, yCaminhao;
let xPlantação, yPlantação;
let xSupermercado, ySupermercado;

// Variáveis de estado e animação
let teiaAtiva;
let anguloRoda;
let fatorBalanço;

function setup() {
  createCanvas(800, 600);
  
  // Posições iniciais
  xCaminhao = 150;
  yCaminhao = 450;
  xPlantação = 100;
  yPlantação = 350;
  xSupermercado = 600;
  ySupermercado = 350;

  // Estados iniciais
  teiaAtiva = false;
  anguloRoda = 0;
}

function draw() {
  // Fundo de duas cores para separar campo e cidade
  background(150, 200, 100); // Cor de grama para o campo
  fill(200);
  rect(width / 2, 0, width / 2, height); // Cor cinza claro para a cidade

  // Desenhar os elementos principais com animação
  desenhaPlantaçãoAnimada();
  desenhaCidade();
  desenhaCaminhaoAnimado();
  
  // Desenhar a conexão se a interação já ocorreu
  if (teiaAtiva) {
    desenhaConexoes();
  }
}

function keyPressed() {
  // Move o caminhão com as setas do teclado
  if (keyCode === RIGHT_ARROW) {
    xCaminhao += 10;
    // Ativa a teia quando o caminhão se move em direção à cidade
    teiaAtiva = true;
  } else if (keyCode === LEFT_ARROW) {
    xCaminhao -= 10;
    // Desativa a teia se o caminhão voltar para o ponto de partida
    if (xCaminhao <= xPlantação + 50) {
      teiaAtiva = false;
    }
  }

  // Garante que o caminhão não saia da tela
  xCaminhao = constrain(xCaminhao, 150, width - 100);
}

// Função para desenhar a cena do campo com animação
function desenhaPlantaçãoAnimada() {
  // Balanço das plantas
  fatorBalanço = sin(frameCount * 0.05) * 5; // Aumenta ou diminui a velocidade do balanço
  
  push();
  translate(xPlantação, yPlantação);
  
  // Desenha cada planta com uma leve inclinação
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * 30 + fatorBalanço;
      let y = j * 30 + 50;
      
      stroke(0, 100, 0); // Cor do caule
      strokeWeight(2);
      line(x, y, x, y - 40);
      
      fill(0, 150, 0); // Cor da folha
      noStroke();
      ellipse(x, y - 40, 15, 25);
    }
  }
  
  pop();
  
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("Plantação", xPlantação + 75, yPlantação + 120);
}

// Função para desenhar a cena da cidade
function desenhaCidade() {
  fill(255, 0, 0); // Vermelho
  rect(xSupermercado, ySupermercado, 100, 150);
  fill(255);
  textSize(14);
  text("Supermercado", xSupermercado + 50, ySupermercado + 75);
}

// Função para desenhar o caminhão com animação
function desenhaCaminhaoAnimado() {
  // Corpo do caminhão
  fill(0, 0, 255); // Azul
  rect(xCaminhao, yCaminhao, 60, 40);
  
  // Animação das rodas
  anguloRoda += radians(5); // Aumenta o ângulo de rotação
  
  push();
  translate(xCaminhao + 15, yCaminhao + 40);
  rotate(anguloRoda);
  fill(50); // Preto para as rodas
  ellipse(0, 0, 15, 15);
  pop();
  
  push();
  translate(xCaminhao + 45, yCaminhao + 40);
  rotate(anguloRoda);
  fill(50);
  ellipse(0, 0, 15, 15);
  pop();
}

// Função para desenhar a "teia da conexão"
function desenhaConexoes() {
  // Animação da teia com efeito pulsante
  let pesoLinha = sin(frameCount * 0.1) * 2 + 3; // Deixa a linha pulsar entre 1 e 5
  strokeWeight(pesoLinha);
  stroke(255, 150, 0); // Laranja
  
  // A linha conecta o centro da plantação com o centro do caminhão
  line(xPlantação + 75, yPlantação + 50, xCaminhao + 30, yCaminhao + 20);
}






