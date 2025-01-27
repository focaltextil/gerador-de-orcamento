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

        // Salva no sessionStorage
        sessionStorage.setItem('excelData', JSON.stringify(jsonData));
        console.log('Dados salvos no sessionStorage.');

        return jsonData;
    } catch (error) {
        console.error(`Erro ao carregar os dados: ${error.message}`);
        alert('Erro ao carregar os dados da planilha.');
        return [];
    }
}

loadExcelData()
    .then(jsonData => {
        console.log('Dados JSON:', jsonData);
    })
    .catch(error => {
        console.error('Erro durante a execução:', error);
    });


// -----------------------------------------------------------------------------------------------
// FAZER DROPDOWN

function populateDropdown() {
    // Recupera os dados do sessionStorage
    const savedData = sessionStorage.getItem('excelData');
    
    if (!savedData) {
        console.error('Dados não encontrados no sessionStorage!');
        return;
    }

    // Converte os dados para JSON
    const excelData = JSON.parse(savedData);

    // Verifica se os dados têm a estrutura correta
    if (excelData.length === 0) {
        console.error('Os dados estão vazios!');
        return;
    }

    // Pega o dropdown
    const dropdown = document.getElementById('filterSelect1');

    // Pega a primeira coluna (Categoria) dos dados
    const uniqueCategories = [...new Set(excelData.map(item => item.Descrição))];

    // Verifica se encontramos categorias únicas
    if (uniqueCategories.length === 0) {
        console.error('Não foram encontradas categorias!');
        return;
    }

    // Adiciona as opções no dropdown
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown.appendChild(option);
    });
}

// Chama a função para preencher o dropdown assim que a página for carregada
window.onload = function() {
    populateDropdown();
};
