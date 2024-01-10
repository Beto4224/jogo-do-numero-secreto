let listaDeNumerosSorteados = [];
let dificuldade = gerarDificuldade();
console.log('A dificuldade é '+ dificuldade);
let numeroSecreto = gerarNumeroAleatorio(dificuldade);
let tentativas  = 1;
console.log('Número secreto é '+ numeroSecreto);
exibirMensagemInicial();

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${dificuldade}`);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarDificuldade() {
    return 10**parseInt(Math.random() * 3 + 1);
}

function gerarNumeroAleatorio(maximo) {
    let numeroSorteado = parseInt(Math.random() * maximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista >= dificuldade){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio(maximo);
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    limparCampo();
    tentativas = 1;
    dificuldade = gerarDificuldade();
    console.log('A dificuldade é '+ dificuldade);
    numeroSecreto = gerarNumeroAleatorio(dificuldade);
    console.log('Número secreto é '+ numeroSecreto); 
    exibirMensagemInicial();
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
        
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}