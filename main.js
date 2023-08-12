const divs = document.querySelectorAll('.game-envelope > div');
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
const NumberidsSorteados = [];
const min = document.querySelector('.minutos');
const seg = document.querySelector('.segundos');
const acertos = document.querySelector('#acertos')
const erros = document.querySelector('#erros')
const play = document.querySelector(".play")
let statusCronos = false;
let segundos = 0;
let minutos = 0;
let acertosCount = 0;
let errosCount = 0;
let NumeroSorteado;

const sortearIds = ()=>{
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

const controlClicks = ()=>{
    let controlClick = [false, false]
    let controlDivs = []
    
        play.addEventListener('click',()=>{
            if(statusCronos == false){
            minutos = 2
            statusCronos = true
            }
        })
    
    
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
                                if(controlDivs[0].id == controlDivs[1].id){
                                    controlDivs.forEach((e)=>{
                                        e.style.visibility = 'hidden';
                                        AnimationsDesvirar(e)
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
                            },1000)
                            
    
                        }
                    }else{
                        alert('Aperte play para começar!')
                    }
            })
    })
}
const controlTempo = ()=>{
    
        setInterval(()=>{

           


          
           
            if(statusCronos == true){
                if(minutos<=0 && segundos <=0){
                    alert('O tempo acabooooouuu!')
                    statusCronos = false
                    acertosCount  =  errosCount =  0
                    minutos = 2
                    segundos = 1
               }
                if(acertosCount >= 12){
                    alert('Você ganhou!')
                    statusCronos = false
                    acertosCount  =  errosCount =  0
                    minutos = 2
                    segundos = 1
               }
               if(errosCount >=25){
                    alert('25 erros é demais da conta!')
                    statusCronos = false
                    acertosCount  =  errosCount =  0
                    minutos = 2
                    segundos = 1
               }
                if (minutos >=0){
                    if (segundos == 0){
                        segundos = 60
                        minutos --
                    }
                    segundos --
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
                }
            }else{
                segundos = segundos
                minutos = minutos
                
            }
            
            
        },1000)
    
}

controlClicks()
controlTempo()
sortearIds();

atribuirImagens()
