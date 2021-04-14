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
            this._moverJogador(this.jogador1, dado1 , dado2);
        } else {
            this._moverJogador(this.jogador2,  dado1 , dado2);
        }
    }

    _moverJogador(jogador, dado1 , dado2){
        this.jogando = true;
        const novaPosicao = jogador.posicao + dado1 + dado2;
        jogador.moverAte(novaPosicao, () => {
            this.jogando = false;
            if (jogador.posicao === 99)
                this.vencedor = jogador;

            for (const cobra of this.cobras) {                
                if((jogador.posicao + 1) == (cobra.cabeça)){
                    //console.log("cobra: "+(cobra.cabeça)+" <-> posJogador"+ (jogador.posicao));
                    jogador.posicao = cobra.cauda-1;
                    jogador.x = this.tabuleiro[cobra.cauda-1].x;
                    jogador.y = this.tabuleiro[cobra.cauda-1].y;
                }
            }

            for (const escada of this.escadas) {              
                if((jogador.posicao + 1 ) == (escada.base)){
                    //console.log("escada: "+(escada.base) +" <->  posJogador"+ (jogador.posicao));
                    jogador.posicao = escada.topo-1;
                    jogador.x = this.tabuleiro[escada.topo-1].x;
                    jogador.y = this.tabuleiro[escada.topo-1].y;
                }
            }

            this.vez = dado1 === dado2 ? this.vez : this.vez * -1;
        });
    }
}
