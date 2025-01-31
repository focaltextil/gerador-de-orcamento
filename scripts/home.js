document.addEventListener("DOMContentLoaded", function () {
    let exit_btn = document.getElementById("exit-btn");

    if (exit_btn) {
        exit_btn.addEventListener("click", function () {
            console.log("Cliquei no botão Sair");
            
            window.parent.document.getElementById("tela").style.display = "block";
            window.parent.document.getElementById("logged").style.display = "none";
        });
    };
});
