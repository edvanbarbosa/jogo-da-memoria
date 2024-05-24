const divs: NodeListOf<HTMLDivElement> = document.querySelectorAll('.game-envelope  div') as NodeListOf<HTMLDivElement>;
const ids: string[] = ['html','git','css',
            'js','react','python',
            'nodejs','c-sharp','ts',
            'kotlin','java','sass',
            'html','git','css',
            'js','react','python',
            'nodejs','c-sharp','ts',
            'kotlin','java','sass'
        ] as string[];
const colors: object = {
    html: '#ffa88e',
    git: '#F2F2F2',
    css: '#8BBBD9',
    js: '#f0db4f',
    react: '#7c9ecb',
    python: '#4b8bbe',
    nodejs: '#fdefff',
    'c-sharp': '#ce59d4',
    ts: '#007acc',
    kotlin: '#7f52ff',
    java: '#ec8950',
    sass: '#c69',
}
let NumberidsSorteados: number[] = [];
const min: HTMLElement = document.querySelector('.minutos') as HTMLElement;
const seg: HTMLElement = document.querySelector('.segundos') as HTMLElement;
const acertos: HTMLElement = document.querySelector('#acertos') as HTMLElement;
const erros: HTMLElement = document.querySelector('#erros') as HTMLElement;
const play: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
const divResult: HTMLElement = document.querySelector('.result') as HTMLElement;
const fecharDiv: HTMLElement = document.querySelector('#fechar') as HTMLElement;

let [statusCronos, restart]: boolean[] = [false, false];
let segundos: number = 0;
let minutos: number = 0;
let segDjogo: number = 0
let minDjogo: number = -1
let acertosCount: number = 0;
let errosCount: number = 0;
let NumeroSorteado: number;


const viewDivs = (): void=>{
    divs.forEach((e: HTMLElement): void=>{
        if(e.style.visibility != 'visible'){
            e.style.animation = "viewDiv .5s ease-in-out forwards"
            e.style.visibility = 'visible'
        }
        else{
            return
        }
        
       
    })
}

const result = (): void=>{
    divResult.style.display = 'flex' 

    if(acertosCount >= 12){
        divResult.querySelector('.result-envelope').innerHTML = `
            <div class="result-content">
            <h1 style = "color: #d9d38b;">Parabéns!</h1>
            <p>Você conseguiu terminar o jogo em <span id="minutos">${minDjogo}</span> minutos e <span id="segundos" >${segDjogo}</span> segundos.</p>
            <p>Você fez <span id="acertos" style="color:#8bd9b1;">${acertosCount}</span> acertos e <span id="erros" style = "color: #ee8787 ;">${errosCount}</span> erros.</p>
            <button class="restart" onclick="Restart()">Jogar novamente</button>
            </div>`
    }else if(minutos<=0 && segundos <=0 && acertosCount< 12){
        divResult.querySelector('.result-envelope').innerHTML = `
            <div class="result-content">
            <h1 style= "color: #ee8787;">O tempo Acabou :( </h1>

            <p>Você fez <span id="acertos" style="color:#8bd9b1;">${acertosCount}</span> acertos e <span id="erros" style = "color: #ee8787;">${errosCount}</span> erros.</p>
            <button class="restart" onclick="Restart()">Jogar novamente</button>
            </div>`
    }
    else if(errosCount >=25){
        divResult.querySelector('.result-envelope').innerHTML = `
        
        <div class="result-content">
        <h1 style= "color:#ee8787;">25 erros é demais da conta </h1>
        <p>Você fez <span id="acertos" style="color:#8bd9b1;">${acertosCount}</span> acertos e <span id="erros" style = "color: #ee8787 ;">${errosCount}</span> erros.</p>
        <button class="restart" onclick="Restart()">Jogar novamente</button>
        </div>`
    }
    
}

const sortearIds = (): void=>{
    NumberidsSorteados = []
    for(let i in ids){
        NumeroSorteado = Math.floor(Math.random()*(ids.length))

        while(NumberidsSorteados.includes(NumeroSorteado)){
            NumeroSorteado = Math.floor(Math.random()*(ids.length))
        }

        NumberidsSorteados.push(NumeroSorteado);
    }

    divs.forEach((e: HTMLElement,index: number): void=>{
        e.setAttribute('id',ids[NumberidsSorteados[index]])
    })
 
};

const atribuirImagens = (): void=>{
    divs.forEach((e: HTMLElement): void =>{
        e.innerHTML = `<img src="img/${e.id}.png" alt="imagem de ${e.id}">`
    })
}

const AnimationsVirar = (e: HTMLElement): void=>{
     e.style.animation = 'virar .5s ease-in-out forwards'
     e.style.backgroundColor = colors[e.id]
     e.querySelector('img').style.animation = 'imgAparece 1s ease-in-out forwards'
     
}
const AnimationsDesvirar = (e: HTMLElement): void=>{
    e.style.animation = 'desvirar .5s ease-in-out forwards'
    e.querySelector('img').style.animation = 'imgDesaparece 1s ease-in-out forwards'
}


const controlTempo = (): void=>{
        setInterval((): void=>{
            if(statusCronos == true){
                if(minutos<=0 && segundos <=0){
                    statusCronos = false
                    result()
                
               }
                if(acertosCount >= 12){
                    statusCronos = false
                    result()
               }
               if(errosCount >=25){
                    statusCronos = false
                    result()
                
               }
               if(statusCronos == true){
                if (minutos >=0){
                    if (segundos == 0){
                        segundos = 60
                        segDjogo = 0
                        minutos --
                        minDjogo ++
                    }
                    segundos --
                    segDjogo ++
                    if (segundos < 10){
                        seg.innerHTML = `0${segundos}`
                    }else{
                        seg.innerHTML = segundos.toString()
                    }
                    if (minutos < 10){
                        min.innerHTML = `0${minutos}`
                    }else{
                        min.innerHTML = minutos.toString()
                    }
                }else{
                    segundos = 0
                    minutos = 2
                    
                }
            }else{
                return
                
            }
        }
            
        },1000)
    
}

const controlClicks = (): void=>{
    let controlClick: boolean[] = [false, false]
    let controlDivs: any = []
    divs.forEach((e: HTMLDivElement)=>{
       
            e.addEventListener('click',(): any=>{
               
                if(statusCronos){ 
                        if(controlClick[0] == false){
                            AnimationsVirar(e)
                            controlDivs[0] = e
                            controlClick[0] = true
                           
                        }else if(controlClick[0] == true && controlClick[1] == false){
                            AnimationsVirar(e)
                            controlDivs[1] = e  
                            controlClick[1] = true
                            
                            setTimeout((): void=>{
                                if(controlDivs[0]!=controlDivs[1]){
                                    if(controlDivs[0].id == controlDivs[1].id ){
                                        controlDivs.forEach((e: HTMLDivElement): void=>{
                                            e.style.visibility = 'hidden';
                                            AnimationsDesvirar(e)
                                            e.id = ''
                                        })
                                        acertosCount++
                                        acertos.innerHTML = acertosCount.toString()
                                    }else{
                                        AnimationsDesvirar(controlDivs[1])
                                        AnimationsDesvirar(controlDivs[0])
                                        errosCount++
                                        erros.innerHTML = errosCount.toString()
                                    }
                                    controlClick = [false, false]
                                }
                                else{
                                    controlClick = [true,false]
                                    controlDivs[1] =''
                                }
                                
                                
                            },1000)
                            
    
                        }
                    }else{
                        alert('Aperte play para começar!')
                    }
            })
    })
}
const playGame = (): void=>{
    statusCronos= restart = true
    acertosCount  =  errosCount =  0
    
    minutos = 2
    segundos = 0
    viewDivs()
    sortearIds();
    atribuirImagens()
    controlTempo()
    controlClicks()
   
   
    
    
        
   
}

const Restart = (): void=>{
    acertosCount  =  errosCount =  0
    erros.innerHTML = errosCount.toString()
    acertos.innerHTML = acertosCount.toString()
    minutos = 2
    segundos = 0
    minDjogo = -1
    segDjogo = -1
    viewDivs()
    sortearIds();
    atribuirImagens()
    statusCronos = true
    divResult.style.display = 'none'

}

play.forEach((e: HTMLButtonElement): void=>{
    e.addEventListener('click',(): void=>{
        if(!statusCronos){
           restart == false? playGame():Restart()
        }
        
    })
})


