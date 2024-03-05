let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
// Func com Parametro
function exibirTextonNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;  
    responsiveVoice.speak(texto,  'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextonNaTela('h1','Jogo do Número Secreto');
    exibirTextonNaTela('p','Escolha um numero entre 1 a 100');
}
exibirMensagemInicial();
// Func sem parametro e sem retorno
function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextonNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você decobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextonNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextonNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextonNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Func com retorno
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);   //numero é gerado
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){  // se o numero for repetido
        return gerarNumeroAleatorio();                           //gerar novo numero
    }else{                                                  //se o numero for novo
        listaDeNumerosSorteados.push(numeroEscolhido);   //add a lista      
        console.log(listaDeNumerosSorteados)              //lista de numeros anteriores
        return numeroEscolhido;
    }
}   

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}