document.addEventListener("DOMContentLoaded", function () {
    let user = document.getElementById("user");
    let password = document.getElementById("password");
    let btn_log = document.getElementById("btnlogin");
    let tela = document.getElementById("tela");
    let logged = document.getElementById("logged");
    let logado = sessionStorage.getItem("logado");
    let msg = document.querySelector(".msg");
    let credentials = [];

// -------------------------------------------------------------------
//LENDO DO ARQUIVO GAYZAO

    // fetch("/credenciais/key.json")
    fetch("http://localhost:3000/users")

        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            credentials = data;
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));

  
    btn_log.addEventListener("click", function () {
        if (credentials.length === 0) {
            console.log("Aguarde o carregamento das credenciais.");
            return;
        }

        let username = user.value.trim();
        let userPassword = password.value.trim();

        const userFound = credentials.find(cred => cred.USUARIO === username && cred.PASSWORD === userPassword);

        if (userFound) {
            tela.style.display = "none";
            logged.style.display = "flex";
            sessionStorage.setItem("logado","ok");
        } else {
            msg.style.color = "Red";
            msg.innerHTML = "Usuário ou senha incorretos";

        }
    });

});


