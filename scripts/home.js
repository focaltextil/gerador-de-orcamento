document.addEventListener("DOMContentLoaded", function () {
    let nike = sessionStorage.getItem("nikename");
    let nome = document.querySelector('.nikename');
    let exit_btn = document.querySelector('#exit-btn');

    nome.innerHTML = `Bem Vindo ${nike}`;

    exit_btn.addEventListener("click", function () {
        
        window.location.reload();

    });
});
