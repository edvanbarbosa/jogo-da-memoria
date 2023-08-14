const divs = document.querySelectorAll('.game-envelope  div');
const ids = ['html','git','css',
            'js','react','python',
            'nodejs','c-sharp','ts',
            'kotlin','java','sass',
            'html','git','css',
            'js','react','python',
            'nodejs','c-sharp','ts',
            'kotlin','java','sass'
        ];
const colors = {
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
let NumberidsSorteados = [];
const min = document.querySelector('.minutos');
const seg = document.querySelector('.segundos');
const acertos = document.querySelector('#acertos')
const erros = document.querySelector('#erros')
const play = document.querySelectorAll("button")
const divResult = document.querySelector('.result')
const fecharDiv = document.querySelector('#fechar')
let statusCronos = restart = false;
let segundos = 0;
let minutos = 0;
let segDjogo = 0
let minDjogo = -1
let acertosCount = 0;
let errosCount = 0;
let NumeroSorteado;


const viewDivs = ()=>{
    divs.forEach(e=>{
        if(e.style.visibility != 'visible'){
            e.style.animation = "viewDiv .5s ease-in-out forwards"
            e.style.visibility = 'visible'
        }
        else{
            return
        }
        
       
    })
}

const result = ()=>{
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

const sortearIds = ()=>{
    NumberidsSorteados = []
    for(i in ids){
        NumeroSorteado = Math.floor(Math.random()*(ids.length))
        while(NumberidsSorteados.includes(NumeroSorteado)){
            NumeroSorteado = Math.floor(Math.random()*(ids.length))
        }
        NumberidsSorteados.push(NumeroSorteado);
    }
    divs.forEach((e,index)=>{
        e.setAttribute('id',ids[NumberidsSorteados[index]])
    })
 
};

const atribuirImagens = ()=>{
    divs.forEach(e =>{
        e.innerHTML = `<img src="img/${e.id}.png" alt="imagem de ${e.id}">`
    })
}

const AnimationsVirar = (e)=>{
     e.style.animation = 'virar .5s ease-in-out forwards'
     e.style.backgroundColor = colors[e.id]
     e.querySelector('img').style.animation = 'imgAparece 1s ease-in-out forwards'
     
}
const AnimationsDesvirar = (e)=>{
    e.style.animation = 'desvirar .5s ease-in-out forwards'
    e.querySelector('img').style.animation = 'imgDesaparece 1s ease-in-out forwards'
}


const controlTempo = ()=>{
        setInterval(()=>{
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
                        seg.innerHTML = segundos
                    }
                    if (minutos < 10){
                        min.innerHTML = `0${minutos}`
                    }else{
                        min.innerHTML = minutos
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

const controlClicks = ()=>{
    let controlClick = [false, false]
    let controlDivs = []
    divs.forEach((e)=>{
       
            e.addEventListener('click',()=>{
               
                if(statusCronos){ 
                        if(controlClick[0] == false){
                            AnimationsVirar(e)
                            controlDivs[0] = e
                            controlClick[0] = true
                           
                        }else if(controlClick[0] == true && controlClick[1] == false){
                            AnimationsVirar(e)
                            controlDivs[1] = e  
                            controlClick[1] = true
                            
                            setTimeout(()=>{
                                if(controlDivs[0]!=controlDivs[1]){
                                    if(controlDivs[0].id == controlDivs[1].id ){
                                        controlDivs.forEach((e)=>{
                                            e.style.visibility = 'hidden';
                                            AnimationsDesvirar(e)
                                            e.id = ''
                                        })
                                        acertosCount++
                                        acertos.innerHTML = acertosCount
                                    }else{
                                        AnimationsDesvirar(controlDivs[1])
                                        AnimationsDesvirar(controlDivs[0])
                                        errosCount++
                                        erros.innerHTML = errosCount
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
const playGame = ()=>{
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

const Restart = ()=>{
    acertosCount  =  errosCount =  0
    erros.innerHTML = errosCount
    acertos.innerHTML = acertosCount
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

play.forEach(e=>{
    e.addEventListener('click',()=>{
        if(!statusCronos){
           restart == false? playGame():Restart()
        }
        
    })
})


