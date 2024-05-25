import { Temporizador } from '../types/Temporizador.js';

export class Timer { 

    minutos: number;
    segundos: number;
    minutosElement: HTMLElement;
    segundosElement: HTMLElement;
    temporizador: Temporizador;
    
    constructor(){
        this.temporizador = new Temporizador(0,10,true)
        this.minutosElement = document.querySelector('.minutos') as HTMLElement;
        this.segundosElement = document.querySelector('.segundos') as HTMLElement;
    }

    renderizar() {
        this.temporizador.controle()
        setInterval(() => {
            this.minutos = this.temporizador.retornarTempo().minutos;
            this.segundos = this.temporizador.retornarTempo().segundos;
            this.minutosElement.textContent = this.minutos.toString().padStart(2, '0');
            this.segundosElement.textContent = this.segundos.toString().padStart(2, '0');
        }, 1000)

    }
}

