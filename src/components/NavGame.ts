import { Timer } from './Timer.js';

const acertos: HTMLElement = document.querySelector('#acertos') as HTMLElement;
const erros: HTMLElement = document.querySelector('#erros') as HTMLElement;

const play: HTMLButtonElement = document.querySelector(".play") as HTMLButtonElement;

class NavGame{
    Timer: Timer;
    
    constructor(){
        this.Timer = new Timer()
        // this.Result = new Result()
        // this.Game = new Game()

    }

    renderizar(){
        console.log('renderizando')
        this.Timer.renderizar()
       
        // this.Result.renderizar()
        // this.Game.renderizar()
    }
}

const navGame = new NavGame()
navGame.renderizar()

// let acertosCount: number = 0;
// let errosCount: number = 0;

// const playGame = (): void=>{
//     statusCronos= restart = true
//     acertosCount  =  errosCount =  0

// if(acertosCount >= 12){
//     statusCronos = false
//     result()
// }
// if(errosCount >=25){
//     statusCronos = false
//     result()

// }
    
//     minutos = 2
//     segundos = 0
//     viewDivs()
//     sortearIds();
//     atribuirImagens()
//     controlTempo()
//     controlClicks()
 
// }


// play.forEach((e: HTMLButtonElement): void=>{
//     e.addEventListener('click',(): void=>{
//         if(!statusCronos){
//            restart == false? playGame():Restart()
//         }
        
//     })
// })
