window.onload = carregarDados();

function carregarDados() {
    let input = document.querySelector("#pergunta");
    if(input.value) criarMensagem(input.value, "me");

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://nodered-loja.mybluemix.net/chat?mensagem=${input.value ? input.value : ""}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if(xhr.status == 200) {
            let respostas = JSON.parse(xhr.responseText);
            respostas.forEach(resposta => criarMensagem(resposta.text, "bot"));
        }
    };

    xhr.onloadstart = () => {
        let digitando = document.querySelector("span");
        digitando.classList.add("ativo");
    };

    xhr.onloadend = () => {
        let digitando = document.querySelector("span");
        digitando.classList.remove("ativo");
    };

    xhr.send();
    input.value = "";
}

function criarMensagem(msg, tipo) {
    var chat = document.querySelector(".conversa");
    var div = criarDiv(msg, tipo);
    chat.appendChild(div);
    scrollDivDown(chat);
}

function criarDiv(texto, tipo) {
    var div = document.createElement("div");
    div.classList.add("chat");
    div.classList.add(tipo);
    div.textContent = texto;
    return div;
}

function scrollDivDown(div) {
    for (var i = 0; i < div.offsetHeight; i++) {
        div.scrollTop++;
    }
}