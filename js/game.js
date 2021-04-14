import CobrasEscadas from "./CobrasEscadas.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const background = new Image();
background.src = '././imgs/tabuleiro.png';

const tamanhoGame = innerHeight < innerWidth ?
    innerHeight - innerHeight * .15 : innerWidth - innerWidth * .15;

canvas.width = tamanhoGame;
canvas.height = tamanhoGame;

const cobrasEscadas = new CobrasEscadas(tamanhoGame / 10);
const tamanho = tamanhoGame / 10;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortearEJogar() {
    cobrasEscadas.jogar(getRandomInt(1, 6), getRandomInt(1, 6));
}

const btnsJogar = document.getElementsByClassName("btn-jogar");
let jogar = false;
for (const btn of btnsJogar) {
    btn.addEventListener("click", ()=>{
        jogar = true;
    });
}
const imgP1 = new Image();
imgP1.src = '././imgs/player1.png';

const imgP2 = new Image();
imgP2.src = '././imgs/player2.png';

function frameUpdate() {
    context.drawImage(background, 0, 0, tamanhoGame, tamanhoGame);

    if(jogar){
        const resultado = cobrasEscadas.jogar(getRandomInt(1, 6), getRandomInt(1, 6));
        jogar = false;
        console.log(resultado);
    }

    // movimentação do jogador 1
    if (cobrasEscadas.jogador1.posicao != -1) {
        context.drawImage(imgP1, cobrasEscadas.jogador1.x,
            cobrasEscadas.jogador1.y, tamanho, tamanho);
    }
    if (cobrasEscadas.jogador1.podeMover) cobrasEscadas.jogador1.mover();

    // movimentação do jogador 2
    if (cobrasEscadas.jogador2.posicao != -1) {
        context.drawImage(imgP2, cobrasEscadas.jogador2.x,
            cobrasEscadas.jogador2.y, tamanho, tamanho);
    }
    if (cobrasEscadas.jogador2.podeMover) cobrasEscadas.jogador2.mover();

    // debug
    /*
    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";

    for (let i = 0; i < cobrasEscadas.tabuleiro.length; i++) {
        context.rect(cobrasEscadas.tabuleiro[i].x, cobrasEscadas.tabuleiro[i].y, tamanho, tamanho);
        context.font = "15px Arial";
        context.fillText(i, cobrasEscadas.tabuleiro[i].x + 10, cobrasEscadas.tabuleiro[i].y + 35);
    }
    context.stroke();
    */

    window.requestAnimationFrame(frameUpdate);
}

frameUpdate();
