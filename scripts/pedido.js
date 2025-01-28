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

loadExcelData()
    .then(jsonData => {

    })
    .catch(error => {
        console.error('Erro durante a execução:', error);
    });


// -----------------------------------------------------------------------------------------------
// FAZER DROPDOWN

function populateDropdown() {
 
    const savedData = sessionStorage.getItem('excelData');
    
    if (!savedData) {
        console.error('Dados não encontrados no sessionStorage!');
        return;
    }


    const excelData = JSON.parse(savedData);


    if (excelData.length === 0) {
        console.error('Os dados estão vazios!');
        return;
    }


    const dropdown = document.getElementById('filterSelect1');


    const uniqueCategories = [...new Set(excelData.filter(item => item.Tipo === "DIVERSOS").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown2 = document.getElementById('filterSelect2');

    const uniqueCategories2 = [...new Set(excelData.filter(item => item.Tipo === "DUBLADOS PROMOCIONAIS").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown3 = document.getElementById('filterSelect3');

    const uniqueCategories3 = [...new Set(excelData.filter(item => item.Tipo === "DUBLAGEM").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

        
    const dropdown4 = document.getElementById('filterSelect4');

    const uniqueCategories4 = [...new Set(excelData.filter(item => item.Tipo === "ESPUMAS").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

            
    const dropdown5 = document.getElementById('filterSelect5');

    const uniqueCategories5 = [...new Set(excelData.filter(item => item.Tipo === "ESTAMPARIA").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

                
    const dropdown6 = document.getElementById('filterSelect6');

    const uniqueCategories6 = [...new Set(excelData.filter(item => item.Tipo === "EVA").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown7 = document.getElementById('filterSelect7');

    const uniqueCategories7 = [...new Set(excelData.filter(item => item.Tipo === "MALHAS ALGODÃO").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown8 = document.getElementById('filterSelect8');

    const uniqueCategories8 = [...new Set(excelData.filter(item => item.Tipo === "MALHAS POLIESTER/ ALGODÃO").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown9 = document.getElementById('filterSelect9');

    const uniqueCategories9 = [...new Set(excelData.filter(item => item.Tipo === "METALASSÊ").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown10 = document.getElementById('filterSelect10');

    const uniqueCategories10 = [...new Set(excelData.filter(item => item.Tipo === "NÃO TECIDOS").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown11 = document.getElementById('filterSelect11');

    const uniqueCategories11 = [...new Set(excelData.filter(item => item.Tipo === "TECIDOS").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    const dropdown12 = document.getElementById('filterSelect12');

    const uniqueCategories12 = [...new Set(excelData.filter(item => item.Tipo === "TECIDOS MALHAS POR KILO (ESTADO SP)").map(item => item.Descrição))];
    
    
    // ----------------------------------------------------------------------------

    if (uniqueCategories.length === 0) {
        console.error('Não foram encontradas categorias!');
        return;
    }

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown.appendChild(option);
    });

    uniqueCategories2.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown2.appendChild(option);
    });

    uniqueCategories3.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown3.appendChild(option);
    });

    uniqueCategories4.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown4.appendChild(option);
    });

    uniqueCategories5.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown5.appendChild(option);
    });

    uniqueCategories6.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown6.appendChild(option);
    });

    uniqueCategories7.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown7.appendChild(option);
    });

    uniqueCategories8.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown8.appendChild(option);
    });

    uniqueCategories9.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown9.appendChild(option);
    });

    uniqueCategories10.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown10.appendChild(option);
    });

    uniqueCategories11.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown11.appendChild(option);
    });

    uniqueCategories12.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown12.appendChild(option);
    });
}

// ----------------------------------------------------------------------------
//FUNCAO DEIVIDIANA PARA PEGAR O VALOR DO DROPDOWN

document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".add-btn");

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            const selectId = this.getAttribute("data-target");
            const select = document.getElementById(selectId);
            console.log(select.value);
   
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".add-btn");

    if (botoes.length === 0) {
        console.log("Nenhum botão encontrado.");
        return;
    }

    botoes.forEach(botao => {
        const selectId = botao.getAttribute("data-target");
        const select = document.getElementById(selectId);

        if (select) {
    
            select.addEventListener("change", function () {
                const valorPadrao = select.options[0].value;

                if (select.value === valorPadrao) {
                    botao.style.display = "none";
                } else {
                    botao.style.display = "block";
                }
            });

   
            const valorPadrao = select.options[0].value;
            if (select.value === valorPadrao) {
                botao.style.display = "none";
            } else {
                botao.style.display = "block";
            }
        }
    });
});


// ----------------------------------------------------------------------------


window.onload = function() {
    populateDropdown();
};
