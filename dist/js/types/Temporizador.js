export class Temporizador {
    minutos;
    segundos;
    onTime;
    constructor(minutos, segundos, onTime) {
        this.minutos = minutos;
        this.segundos = segundos;
        this.onTime = onTime;
    }
    contarTempo() {
        if (this.minutos >= 0 && this.segundos > 0) {
            if (this.segundos == 0) {
                this.segundos = 60;
                this.minutos -= 1;
            }
            this.segundos -= 1;
        }
        else {
            this.onTime = false;
        }
    }
    controle() {
        this.onTime ? setInterval(() => { this.contarTempo(); }, 1000) : null;
    }
    retornarTempo() {
        return { minutos: this.minutos, segundos: this.segundos };
    }
}
