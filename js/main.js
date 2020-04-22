window.onload = carregarDados();
var session_id = '';

function carregarDados() {
    let input = document.querySelector("#pergunta");
    if(input.value) criarMensagem(input.value, "me");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://nodered-loja.mybluemix.net/chat-1tdsa?mensagem=${input.value ? input.value : ""}&session_id=${session_id}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if(xhr.status == 200) {
            let resultado = JSON.parse(xhr.responseText);
            resultado.respostas.forEach(resposta => {
                if(resposta.text) criarMensagem(resposta.text, "bot");
            });
            session_id = resultado.session_id;
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

const input = document.querySelector("#pergunta");
input.addEventListener("keypress", function(event) {
    if(event.keyCode === 13) {
        carregarDados();
    }
});