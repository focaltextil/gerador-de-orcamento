const fileUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXW_tmCN3io7Khy7aRUTN5Wrwd2bWdqEIXdd7omR9NLTSQHl7gySu_VY_DZvG08vmpPWQcJgU0TsC1/pub?gid=611847897&single=true&output=csv';

async function loadExcelData() {
    try {
        const savedData = sessionStorage.getItem('excelData');
        if (savedData) {
            console.log('Dados carregados do sessionStorage.');
            return JSON.parse(savedData);
        }

        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Erro ao baixar a planilha: ${response.statusText}`);
        }

        const csvData = await response.text();
        const rows = csvData
            .split('\n')
            .filter(row => row.trim() !== '')
            .map(row => {
                return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                    .map(cell => cell.replace(/^"|"$/g, '').trim());
            });

        if (rows.length === 0) {
            throw new Error('O CSV está vazio ou os dados não foram carregados corretamente.');
        }

        const headers = rows.shift();
        const jsonData = rows.map(row => {
            const item = {};
            headers.forEach((header, index) => {
                item[header] = row[index] || '';
            });
            return item;
        });

        sessionStorage.setItem('excelData', JSON.stringify(jsonData));
        return jsonData;
    } catch (error) {
        console.error(`Erro ao carregar os dados: ${error.message}`);
        alert('Erro ao carregar os dados da planilha.');
        return [];
    }
}

function populateDropdown(excelData) {
    if (!excelData || excelData.length === 0) {
        console.error('Os dados estão vazios!');
        return;
    }

    const dropdowns = [
        { id: 'filterSelect1', tipo: 'DIVERSOS' },
        { id: 'filterSelect2', tipo: 'DUBLADOS PROMOCIONAIS' },
        { id: 'filterSelect3', tipo: 'DUBLAGEM' },
        { id: 'filterSelect4', tipo: 'ESPUMAS' },
        { id: 'filterSelect5', tipo: 'ESTAMPARIA' },
        { id: 'filterSelect6', tipo: 'EVA' },
        { id: 'filterSelect7', tipo: 'MALHAS ALGODÃO' },
        { id: 'filterSelect8', tipo: 'MALHAS POLIESTER/ ALGODÃO' },
        { id: 'filterSelect9', tipo: 'METALASSÊ' },
        { id: 'filterSelect10', tipo: 'NÃO TECIDOS' },
        { id: 'filterSelect11', tipo: 'TECIDOS' },
        { id: 'filterSelect12', tipo: 'TECIDOS MALHAS POR KILO (ESTADO SP)' }
    ];

    dropdowns.forEach(dropdownConfig => {
        const dropdown = document.getElementById(dropdownConfig.id);
        const uniqueCategories = [...new Set(excelData.filter(item => item.Tipo === dropdownConfig.tipo).map(item => item.Descrição))];

        if (uniqueCategories.length === 0) {
            console.error(`Não foram encontradas categorias para ${dropdownConfig.tipo}!`);
            return;
        }

        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        });
    });
}

function setupDropdownBehavior() {
    const botoes = document.querySelectorAll(".add-btn");

    botoes.forEach(botao => {
        const selectId = botao.getAttribute("data-target");
        const select = document.getElementById(selectId);

        if (select) {
            select.addEventListener("change", function () {
                const valorPadrao = select.options[0].value;
                botao.style.display = select.value === valorPadrao ? "none" : "block";
            });

            const valorPadrao = select.options[0].value;
            botao.style.display = select.value === valorPadrao ? "none" : "block";
        }

        // Adicionando evento de clique no botão para mostrar o valor selecionado
        botao.addEventListener("click", function () {
            const select = document.getElementById(botao.getAttribute("data-target"));
            if (select) {
                console.log(select.value);
            }
        });
    });
}

window.onload = async function () {
    const excelData = await loadExcelData();
    populateDropdown(excelData);
    setupDropdownBehavior();
};
