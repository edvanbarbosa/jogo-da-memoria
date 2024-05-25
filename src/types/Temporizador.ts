export class Temporizador {
    minutos: number;
    segundos: number;
    onTime: boolean;

    constructor(minutos: number, segundos: number, onTime: boolean) {
        this.minutos = minutos
        this.segundos = segundos
        this.onTime = onTime
    }

    contarTempo(): void {
        if (this.minutos >= 0 && this.segundos > 0) {
            if (this.segundos == 0) {
                this.segundos = 60
                this.minutos -= 1
            }

            this.segundos -= 1

        } else {
            this.onTime = false

        }
    }
    controle(): void{
        this.onTime? setInterval(()=> {this.contarTempo()},1000): null;

    }

    retornarTempo(): any {
        return {minutos: this.minutos, segundos: this.segundos}
    }   


}

