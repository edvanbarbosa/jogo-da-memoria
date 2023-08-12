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

    divs.forEach((e)=>{
        e.addEventListener('click',()=>{
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
                    }else{
                        AnimationsDesvirar(e)
                        AnimationsDesvirar(controlClick[1])
                    }
                },1000)
            }
        })
    })
}
controlClicks()

sortearIds();

atribuirImagens()
