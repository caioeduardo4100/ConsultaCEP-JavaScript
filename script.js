// Função que envia requisições HTTP para consultar CEP
const sendCepRequest = (request => {
    // Variável para realizar requisições HTTP
    const ajax = new XMLHttpRequest();

    // Obtém o valor do campo de input do HTML
    request = document.getElementById('cep-input').value;

    // Formata o campo de entrada removendo o hífen
    request = request.replace(/-/g, '');
    
    // Abre uma conexão HTTP GET para o serviço 'ViaCEP'
    ajax.open('GET', `https://viacep.com.br/ws/${request}/json/`);
    // Envia a requisição HTTP
    ajax.send();

    // Verifica se o valor do campo de entrada é valido para um CEP. 
    if (request.length !== 8 || isNaN(request)) {
        document.getElementById('warning').innerText = 'AVISO: Cep Inválido'
        return;
    } 
        // Limpa qualquer mensagem de aviso anterior, se houver.
        document.getElementById('warning').innerText = ''

        // Função que requisita os dados do CEP
        ajax.onload = (response => {
            response = ajax.responseText;
            if (ajax.status === 200) {
                try {
                    // Conversão de string para objeto
                    const cepObj = JSON.parse(response);

                    // Armazena as informações em objetos
                    const dados = {
                        cep: cepObj.cep,
                        logradouro: cepObj.logradouro,
                        complemento: cepObj.complemento,
                        unidade: cepObj.unidade,
                        bairro: cepObj.bairro,
                        localidade: cepObj.localidade,
                        uf: cepObj.uf,
                        ibge: cepObj.ibge,
                        gia: cepObj.gia,
                        ddd: cepObj.ddd,
                        siafi: cepObj.siafi,
                    };
                    
                    // Função para exibir os dados na tabela
                    const exibirOuAvisar = (elementId, valor) => {
                        const elemento = document.getElementById(elementId);
                        if (!valor) {
                            elemento.innerHTML = 'Sem dados';
                            elemento.style.border = '1px solid red';
                        } else {
                            elemento.innerHTML = valor;
                            elemento.style.border = '1px solid green';
                        }
                    };
                    
// Itera sobre o objeto 'dados' e adiciona seus atributos na função que exibe os dados na tabela
                    for (const campo in dados) {
                        exibirOuAvisar(campo, dados[campo])
                    };

                } catch(error) {
                    console.error(error)
                    document.getElementById('warning').innerText = 'Erro ao processar os dados do CEP.';
            };
        
            // Retorna um erro de requisição
        } else {
            document.getElementById('warning').innerText = `Erro: ${ajax.status} - Falha na requisição.`;
        };
    });

    // Retorna um erro de rede
    ajax.onerror = () => {
        document.getElementById('warning').innerText = 'Erro de rede ao tentar consultar o CEP.';
    };
});
