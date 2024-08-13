// Função que envia requisições HTTP para consultar CEP
const sendCepRequest = (request => {
    // Variável para realizar requisições HTTP
    const ajax = new XMLHttpRequest();

    // Obtém o valor do campo de input do HTML
    request = document.getElementById('cep-input').value;
    
    // Abre uma conexão HTTP GET para o serviço 'ViaCEP'
    ajax.open('GET', 'https://viacep.com.br/ws/' + request + '/json/');
    // Envia a requisição HTTP
    ajax.send();

    // Verifica se o valor do campo de entrada é valido para um CEP. 
    if (request.length !== 8 || isNaN(request)) {
        document.getElementById('warning').innerText = 'Cep Inválido'
    } else {
        // Limpa qualquer mensagem de aviso anterior, se houver.
        document.getElementById('warning').innerText = ''

        // Função que requisita os dados do CEP
        ajax.onload = (response => {

            response = ajax.responseText;
            
            // Conversão de texto para objeto
            const cepObj = JSON.parse(response);
    
            // Atribuindo os dados em variáveis
            let cep = cepObj.cep;
            let logradouro = cepObj.logradouro;
            let complemento = cepObj.complemento
            let unidade = cepObj.unidade;
            let bairro = cepObj.bairro;
            let localidade = cepObj.localidade;
            let uf = cepObj.uf;
            let ibge = cepObj.ibge;
            let gia = cepObj.gia;
            let ddd = cepObj.ddd;
            let siafi = cepObj.siafi;
            
            /* 
            Atualiza o elemento HTML com id 'cep' com o valor do CEP obtido 
            e aplica uma borda ao estilo do elemento.
            */
            document.getElementById('cep').innerHTML = cep;
            const cepStyle = document.getElementById('cep');
            cepStyle.style.border = '1px solid';
    
            document.getElementById('logradouro').innerHTML = logradouro;
            const logradouroStyle = document.getElementById('logradouro');
            logradouroStyle.style.border = '1px solid';
            
            document.getElementById('complemento').innerHTML = complemento;
            const complementoStyle = document.getElementById('complemento');
            complementoStyle.style.border = '1px solid';
    
            document.getElementById('unidade').innerHTML = unidade;
            const unidadeStyle = document.getElementById('unidade');
            unidadeStyle.style.border = '1px solid';
    
            document.getElementById('bairro').innerHTML = bairro;
            const bairroStyle = document.getElementById('bairro');
            bairroStyle.style.border = '1px solid';
    
            document.getElementById('localidade').innerHTML = localidade;
            const localStyle = document.getElementById('localidade');
            localStyle.style.border = '1px solid';
    
            document.getElementById('uf').innerHTML = uf;
            const ufStyle = document.getElementById('uf');
            ufStyle.style.border = '1px solid';
    
            document.getElementById('ibge').innerHTML = ibge;
            const ibgeStyle = document.getElementById('ibge');
            ibgeStyle.style.border = '1px solid';
    
            document.getElementById('gia').innerHTML = gia;
            const giaStyle = document.getElementById('gia');
            giaStyle.style.border = '1px solid';
    
            document.getElementById('ddd').innerHTML = ddd;
            const dddStyle = document.getElementById('ddd');
            dddStyle.style.border = '1px solid';
    
            document.getElementById('siafi').innerHTML = siafi;
            const siafiStyle = document.getElementById('siafi');
            siafiStyle.style.border = '1px solid';

        });
    };
});
