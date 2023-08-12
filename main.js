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
    const controlClick = [false, false]

    play.addEventListener('click',()=>{
        minutos = 2
        statusCronos = true
    })

    divs.forEach((e)=>{
       
            e.addEventListener('click',()=>{
                if(statusCronos){ 
                    if(controlClick[0] == false){
                        AnimationsVirar(e)
                        controlClick[0] = true;
                        controlClick[1] = e;
                    }else if(controlClick[0] == true && controlClick[1] != e){
                        AnimationsVirar(e)
                        controlClick[0] = false;
                        setTimeout(()=>{
                            if(controlClick[1].id == e.id){
                                controlClick[1].style.visibility = 'hidden';
                                e.style.visibility= 'hidden';
                                acertosCount++
                                acertos.innerHTML = acertosCount
                            }else{
                                AnimationsDesvirar(e)
                                AnimationsDesvirar(controlClick[1])
                                errosCount++
                                erros.innerHTML = errosCount
                            }
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

           if(minutos<=0 && segundos <=0 && statusCronos == true){
                alert('O tempo acabooooouuu!')
                statusCronos = false
                acertos = erros =  0
           }


           if(acertos >= 12){
                alert('Você ganhou!')
                statusCronos = false
                acertos = erros =  0
           }
           
            if(statusCronos == true){
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
