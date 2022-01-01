const celulas = document.querySelectorAll(".celula");
let fimdeJogo = false;
const JOGADOR_x= "X";
const JOGADOR_o= "O";
const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.addEventListener("click", (Event)=> {
    if(Event.target.matches(".celula")){
      Jogar(Event.target.id, JOGADOR_x);
      setTimeout(() => bot(), 500);
    }
    
});

function bot(){
    const posicoesDiponiveis = [];
    for (index in celulas){
        if(!isNaN(index)){
            if(!celulas[index].classList.contains ("X") && !celulas[index].classList.contains ("O")){
                posicoesDiponiveis.push(index);

            }
        }
        
    }
    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDiponiveis.length
    );
        if(!fimdeJogo){
            Jogar(posicoesDiponiveis[posicaoAleatoria], JOGADOR_o);
        }
    
}

function Jogar(id, turno){
    const celula = document.getElementById(id);
    
    celula.textContent = turno;
    celula.classList.add(turno);
    checarVencendor(turno);

}
function checarVencendor(turno){
    const vencedor = COMBINACOES.some((comb)=>{
        return comb.every((index) =>{
            return celulas[index].classList.contains(turno);

        })
    });

    if(vencedor){
        encerraJogo(turno);
    } else if (checarEmpate()){
        encerraJogo();
    }
}

function checarEmpate(){
    let x = 0;
    let o = 0;

    for (index in celulas){

        if(!isNaN(index)){
            if(celulas[index].classList.contains(JOGADOR_x)){
                x++;
            }
            if(celulas[index].classList.contains(JOGADOR_o)){
                o++;
            }
        }
      
        
    }
    return x + o ==+ 9 ? true : false;

}

function encerraJogo(vencedor = null ){
    fimdeJogo = true;
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);


    if (vencedor) {
      h2.innerHTML = "O ganhador foi o: " + vencedor ;
        
    }else {
        h2.innerHTML = "Empate";
    }
    let contador = 3;
    setInterval (() => {
        h3.innerHTML =  "Reiniciando em: " + contador;

    }, 100);


}
