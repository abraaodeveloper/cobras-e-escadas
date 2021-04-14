export default class Jogador {

    posicaoOndeIr = 0;
    refTabuleiro;
    callback;
    passo = 5;
    qtdPassosVoltando = 0;
    qtdPassosIndo = 0;
    podeMover = false;

    constructor(nome, img, tabuleiro) {
        this.x = -1;
        this.y = -1;
        this.nome = nome;
        this.placar = 0;
        this.posicao = -1;
        this.img = img;
        this.refTabuleiro = tabuleiro;
    }

    setTabuleiro(tabuleiro) {
        this.tabuleiro = tabuleiro;
    }

    moverAte(numeroCasa, callback) {
        this.callback = callback;
        if (this.posicao === -1) {
            this.posicao = 0;
            this.x = this.refTabuleiro[0].x;
            this.y = this.refTabuleiro[0].y;
        }
        this.posicaoOndeIr = numeroCasa;
        this.qtdPassosIndo = this.posicaoOndeIr - this.posicao;

        this.podeMover = true;
        if (this.refTabuleiro.lenght <= this.posicaoOndeIr) {
            this.qtdPassosIndo = (this.refTabuleiro.lenght - 1) - this.posicao;
            this.qtdPassosVoltando = this.posicaoOndeIr - (this.refTabuleiro.lenght - 1);// ver se esse -1 esta coreeto 
        }
    }

    mover() {
        // se chegou em uma outra casa
        if (this.x >= this.refTabuleiro[this.posicao + 1].x
            && this.y >= this.refTabuleiro[this.posicao + 1].y
            && this.x <= this.refTabuleiro[this.posicao + 1].x + this.passo
            && this.y <= this.refTabuleiro[this.posicao + 1].y + this.passo) {
            this.posicao = this.posicao + 1;
            this.x = this.refTabuleiro[this.posicao + 1].x;
            this.y = this.refTabuleiro[this.posicao + 1].y;

            if (this.qtdPassosIndo > 0) {
                this.qtdPassosIndo--;
            } else if (this.qtdPassosVoltando > 0) {
                this.qtdPassosVoltando--;
            }
            if (this.posicao === this.posicaoOndeIr) {

                this.podeMover = false;
                console.log(this.posicaoOndeIr + " - " + this.posicao);
                if (this.callback != null) this.callback();
                this.callback = null;

                return;
            }
        }


        if (this.qtdPassosIndo != 0) {
            this._moverParafrente();
        } else if (this.qtdPassosVoltando != 0) {
            this._moverParaAtras();
        }

        /*
        if (this.x === this.refTabuleiro[this.posicao + 1].x
            && this.y === this.refTabuleiro[this.posicao + 1].y) {
            this.posicao = this.posicao + 1;
            //setTimeout(()=>{}, 1000)
        }
        */
    }

    _moverParafrente() {
        if (this.x === this.refTabuleiro[this.posicao + 1].x) {
            if (this.y < this.refTabuleiro[this.posicao + 1].y) {
                this.y += this.passo;
            } else {
                this.y -= this.passo;
            }
        } else if (this.y === this.refTabuleiro[this.posicao + 1].y) {
            if (this.x < this.refTabuleiro[this.posicao + 1].x) {
                this.x += this.passo;
            } else {
                this.x -= this.passo;
            }
        }
    }

    _moverParaAtras() {
        if (this.x === this.refTabuleiro[this.posicao + 1].x) {
            if (this.y < this.refTabuleiro[this.posicao + 1].y) {
                this.y -= this.passo;
            } else {
                this.y += this.passo;
            }
        } else if (this.y === this.refTabuleiro[this.posicao + 1].y) {
            if (this.x < this.refTabuleiro[this.posicao + 1].x) {
                this.x -= this.passo;
            } else {
                this.x += this.passo;
            }
        }
    }
}