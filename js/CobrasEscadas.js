import { cobras, escadas, imgP1, imgP2  } from "./util/gameObjectsUtil.js";
import Jogador from "./Jogador.js";

export default class CobrasEscadas {

    tabuleiro = []; // posições 
    vez = 1;
    
    vencedor = null;

    constructor(tamanho) {
        this.cobras = cobras;
        this.escadas = escadas;
        this.gerarTabuleiro(tamanho);
        this.jogando = false;

        this.jogador1 = new Jogador("Jogador1", imgP1, this.tabuleiro);
        this.jogador2 = new Jogador("Jogador2", imgP1, this.tabuleiro);
    }

    gerarTabuleiro(tamanho) {
        let direcao = 1;
        for (let y = 9; y >= 0; y--) {
            if (direcao == 1) {
                for (let x = 0; x < 10; x++)
                    this.tabuleiro.push({ x: parseInt(x * tamanho), y: parseInt(y * tamanho) });
            } else {
                for (let x = 9; x >= 0; x--)
                    this.tabuleiro.push({ x: parseInt(x * tamanho), y: parseInt(y * tamanho) });
            }
            direcao *= -1; // inverte direção
        }
    }

    jogar(dado1, dado2) {

        if (this.jogando) return false;
        if (this.vencedor != null) {
            return this.vencedor.nome + " Venceu!"
        }

        if (this.vez === 1) {
            this.jogando = true;
            const novaPosicao = this.jogador1.posicao + dado1 + dado2;
            this.jogador1.moverAte(novaPosicao, () => {
                this.jogando = false;
                console.log("passou na callback");
                if (this.jogador1.posicao === 99)
                    this.vencedor = jogador1;

                this.vez = dado1 === dado2 ? this.vez : this.vez * -1;
            });

        } else {
            this.jogando = true;
            const novaPosicao = this.jogador2.posicao + dado1 + dado2;
            this.jogador2.moverAte(novaPosicao, () => {
                this.jogando = false;
                if (this.jogador2.posicao === 99)
                    this.vencedor = jogador2;

                this.vez = dado1 === dado2 ? this.vez : this.vez * -1;
            });
        }
    }
}