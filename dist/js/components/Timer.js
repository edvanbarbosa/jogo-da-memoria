import { Temporizador } from '../types/Temporizador.js';
export class Timer {
    minutos;
    segundos;
    minutosElement;
    segundosElement;
    temporizador;
    constructor() {
        this.temporizador = new Temporizador(0, 10, true);
        this.minutosElement = document.querySelector('.minutos');
        this.segundosElement = document.querySelector('.segundos');
    }
    renderizar() {
        this.temporizador.controle();
        setInterval(() => {
            this.minutos = this.temporizador.retornarTempo().minutos;
            this.segundos = this.temporizador.retornarTempo().segundos;
            this.minutosElement.textContent = this.minutos.toString().padStart(2, '0');
            this.segundosElement.textContent = this.segundos.toString().padStart(2, '0');
        }, 1000);
    }
}
