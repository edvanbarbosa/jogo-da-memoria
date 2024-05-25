const divResult: HTMLElement = document.querySelector('.result') as HTMLElement;
const fecharDiv: HTMLElement = document.querySelector('#fechar') as HTMLElement;

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