const divs = document.querySelectorAll('.game-envelope  div');
const ids = ['html', 'git', 'css',
    'js', 'react', 'python',
    'nodejs', 'c-sharp', 'ts',
    'kotlin', 'java', 'sass',
    'html', 'git', 'css',
    'js', 'react', 'python',
    'nodejs', 'c-sharp', 'ts',
    'kotlin', 'java', 'sass'
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
};
let NumberidsSorteados = [];
let NumeroSorteado;
const viewDivs = () => {
    divs.forEach((e) => {
        if (e.style.visibility != 'visible') {
            e.style.animation = "viewDiv .5s ease-in-out forwards";
            e.style.visibility = 'visible';
        }
        else {
            return;
        }
    });
};
const sortearIds = () => {
    NumberidsSorteados = [];
    for (let i in ids) {
        NumeroSorteado = Math.floor(Math.random() * (ids.length));
        while (NumberidsSorteados.includes(NumeroSorteado)) {
            NumeroSorteado = Math.floor(Math.random() * (ids.length));
        }
        NumberidsSorteados.push(NumeroSorteado);
    }
    divs.forEach((e, index) => {
        e.setAttribute('id', ids[NumberidsSorteados[index]]);
    });
};
const atribuirImagens = () => {
    divs.forEach((e) => {
        e.innerHTML = `<img src="img/${e.id}.png" alt="imagem de ${e.id}">`;
    });
};
const AnimationsVirar = (e) => {
    e.style.animation = 'virar .5s ease-in-out forwards';
    e.style.backgroundColor = colors[e.id];
    e.querySelector('img').style.animation = 'imgAparece 1s ease-in-out forwards';
};
const AnimationsDesvirar = (e) => {
    e.style.animation = 'desvirar .5s ease-in-out forwards';
    e.querySelector('img').style.animation = 'imgDesaparece 1s ease-in-out forwards';
};
const controlClicks = () => {
    let controlClick = [false, false];
    let controlDivs = [];
    divs.forEach((e) => {
        e.addEventListener('click', () => {
            if (statusCronos) {
                if (controlClick[0] == false) {
                    AnimationsVirar(e);
                    controlDivs[0] = e;
                    controlClick[0] = true;
                }
                else if (controlClick[0] == true && controlClick[1] == false) {
                    AnimationsVirar(e);
                    controlDivs[1] = e;
                    controlClick[1] = true;
                    setTimeout(() => {
                        if (controlDivs[0] != controlDivs[1]) {
                            if (controlDivs[0].id == controlDivs[1].id) {
                                controlDivs.forEach((e) => {
                                    e.style.visibility = 'hidden';
                                    AnimationsDesvirar(e);
                                    e.id = '';
                                });
                                acertosCount++;
                                acertos.innerHTML = acertosCount.toString();
                            }
                            else {
                                AnimationsDesvirar(controlDivs[1]);
                                AnimationsDesvirar(controlDivs[0]);
                                errosCount++;
                                erros.innerHTML = errosCount.toString();
                            }
                            controlClick = [false, false];
                        }
                        else {
                            controlClick = [true, false];
                            controlDivs[1] = '';
                        }
                    }, 1000);
                }
            }
            else {
                alert('Aperte play para começar!');
            }
        });
    });
};