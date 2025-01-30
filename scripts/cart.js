document.addEventListener("DOMContentLoaded", function () {
    atualizarCarrinho();
    configurarBotoes();
    configurarCliente();
    configurarDescontos();
});

// Função para configurar os campos de desconto
function configurarDescontos() {
    const descontoInputs = ['desconto1', 'desconto2', 'desconto3'];

    descontoInputs.forEach(function(id) {
        const descontoInput = document.getElementById(id);

        descontoInput.addEventListener('keydown', function(event) {
            const tecla = event.key;
            const teclasPermitidas = ['ArrowUp', 'ArrowDown', 'Tab', 'ArrowLeft', 'ArrowRight'];

            if (!teclasPermitidas.includes(tecla)) {
                event.preventDefault();
            }
        });

        descontoInput.addEventListener("input", function() {
            aplicarDescontos();
        });
    });
}

// Função para aplicar os três descontos em cascata
function aplicarDescontos() {
    const desconto1 = parseFloat(document.getElementById('desconto1').value) || 0;
    const desconto2 = parseFloat(document.getElementById('desconto2').value) || 0;
    const desconto3 = parseFloat(document.getElementById('desconto3').value) || 0;

    sessionStorage.setItem('desconto1', desconto1);
    sessionStorage.setItem('desconto2', desconto2);
    sessionStorage.setItem('desconto3', desconto3);

    atualizarCarrinho();
}

// Função para obter os descontos do sessionStorage
function obterDescontos() {
    return {
        desconto1: parseFloat(sessionStorage.getItem('desconto1')) || 0,
        desconto2: parseFloat(sessionStorage.getItem('desconto2')) || 0,
        desconto3: parseFloat(sessionStorage.getItem('desconto3')) || 0
    };
}

function obterCarrinho() {
    return JSON.parse(sessionStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho) {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function configurarBotoes() {
    document.querySelectorAll(".add-btn").forEach(botao => {
        const selectId = botao.getAttribute("data-target");
        const select = document.getElementById(selectId);

        if (select) {
            select.addEventListener("change", function () {
                botao.style.display = select.value ? "block" : "none";
            });

            botao.style.display = select.value ? "block" : "none";

            botao.addEventListener("click", function () {
                adicionarAoCarrinho(select.value);
                botao.style.display = "none";
            });
        }
    });
}

function adicionarAoCarrinho(produtoSelecionado) {
    if (!produtoSelecionado) return;

    let carrinho = obterCarrinho();
    let dadosProduto = pegarPrecoPorDescricao(produtoSelecionado);

    carrinho.push({
        descricao: produtoSelecionado,
        precoTab1: dadosProduto.precoTab1,
        precoTab2: dadosProduto.precoTab2
    });

    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

function pegarPrecoPorDescricao(descricao) {
    let exceldata = JSON.parse(sessionStorage.getItem('excelData')) || [];
    let itemEncontrado = exceldata.find(item => item["Descrição"] === descricao);

    return itemEncontrado ? {
        precoTab1: itemEncontrado["PREÇO: TAB 1"] || "R$ 0,00",
        precoTab2: itemEncontrado["PREÇO: TAB 2"] || "R$ 0,00"
    } : { precoTab1: "Preço não encontrado", precoTab2: "Preço não encontrado" };
}

// Função para atualizar o carrinho, considerando os descontos em cascata
function atualizarCarrinho() {
    let carrinho = obterCarrinho();
    let carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>Adicione novos produtos</p>';
        return;
    }

    let carrinhoHtml = `
        <div class="tabela-carrinho">
            <div class="coluna-header">PRODUTO</div>
            <div class="coluna-header">TABELA 1</div>
            <div class="coluna-header">TABELA 2</div>
        </div>
        <hr>
    `;

    let totalTab1 = 0;
    let totalTab2 = 0;

    carrinhoHtml += carrinho.map((produto, index) => {
        let precoTab1 = parseFloat(produto.precoTab1.replace("R$", "").replace(",", "."));
        let precoTab2 = parseFloat(produto.precoTab2.replace("R$", "").replace(",", "."));

        totalTab1 += isNaN(precoTab1) ? 0 : precoTab1;
        totalTab2 += isNaN(precoTab2) ? 0 : precoTab2;

        return `
            <div class="tabela-carrinho">
                <div class="prod-desc">${produto.descricao}</div>
                <div class="coluna">R$ ${produto.precoTab1}</div>
                <div class="coluna">R$ ${produto.precoTab2}</div>
                <div class="coluna">
                    <button class="remover-btn" onclick="removerDoCarrinho(${index})">Remover</button>
                </div>
            </div>
        `;
    }).join('');

    const { desconto1, desconto2, desconto3 } = obterDescontos();

    let totalComDescontoTab1 = totalTab1 * (1 - desconto1 / 100);
    totalComDescontoTab1 = totalComDescontoTab1 * (1 - desconto2 / 100);
    totalComDescontoTab1 = totalComDescontoTab1 * (1 - desconto3 / 100);

    let totalComDescontoTab2 = totalTab2 * (1 - desconto1 / 100);
    totalComDescontoTab2 = totalComDescontoTab2 * (1 - desconto2 / 100);
    totalComDescontoTab2 = totalComDescontoTab2 * (1 - desconto3 / 100);

    carrinhoHtml += `
        <hr>
        <div class="tabela-carrinho">
            <div class="prod-desc"><strong>Total</strong></div>
            <div class="coluna"><strong>R$ ${totalTab1.toFixed(2).replace(".", ",")}</strong></div>
            <div class="coluna"><strong>R$ ${totalTab2.toFixed(2).replace(".", ",")}</strong></div>
            <div class="coluna"></div>
        </div>

        <div class="tabela-carrinho">
            <div class="prod-desc"><strong>Total com Desconto</strong></div>
            <div class="coluna"><strong>R$ ${totalComDescontoTab1.toFixed(2).replace(".", ",")}</strong></div>
            <div class="coluna"><strong>R$ ${totalComDescontoTab2.toFixed(2).replace(".", ",")}</strong></div>
            <div class="coluna"></div>
        </div>

        <hr>
    `;

    carrinhoDiv.innerHTML = carrinhoHtml;
}

function removerDoCarrinho(index) {
    let carrinho = obterCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

function configurarCliente() {
    const clienteElement = document.querySelector(".cliente_input");

    clienteElement.addEventListener("blur", function() {
        sessionStorage.setItem("cliente", clienteElement.value);
    });
}

// -------------------------------------------------------------------------------------



