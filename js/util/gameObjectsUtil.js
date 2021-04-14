import Escada from "../Escada.js";
import Cobra from "../Cobra.js";
import Jogador from "../Jogador.js";

const cobras = [
    new Cobra(16, [4, 5, 17], 6), // cobra marrom e verde - 1        
    new Cobra(49, [12, 29, 33, 32, 48], 11), // cobra amarela e preto - 2       
    new Cobra(46, [24, 37, 36, 35], 25), // cobra vermelha e amarela - 3       
    new Cobra(62, [22, 21, 40, 39, 38, 43, 42, 52], 19), // cobra roxa e branco - 4      
    new Cobra(64, [59, 58, 63], 60), // cobra verde e azul - 5       
    new Cobra(74, [54, 55, 66, 67, 75], 53), // cobra laranja, preto - 6        
    new Cobra(89, [73, 72], 68), // cobra azul e branco - 7       
    new Cobra(92, [93], 88), // cobra verde e verde escuro - 8       
    new Cobra(95, [76, 86, 85, 96], 75), // cobra laranja e amarelo - 9       
    new Cobra(99, [79, 81, 82], 80) // cobra verde amarelo e azul
];

const escadas = [
    new Escada(2, 38), new Escada(15, 26), new Escada(7, 14),
    new Escada(8, 31), new Escada(36, 44), new Escada(21, 42),
    new Escada(78, 98), new Escada(28, 84), new Escada(51, 67),
    new Escada(71, 91), new Escada(87, 94),
];

// Jogadores
const imgP1 = new Image();
imgP1.src = '././imgs/player1.png';

const imgP2 = new Image();
imgP2.src = '././imgs/player2.png';

const jogador1 = new Jogador("Jogador 1", imgP1);
const jogador2 = new Jogador("Jogador 2", imgP2);

export {cobras, escadas, imgP1, imgP2 };
