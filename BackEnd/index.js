const Crawler = require("crawler")
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const baseUrl = 'https://glmerj.org.br'

const glmerjCadLimit = 7

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET');
    app.use(cors());
    next();
});

app.get('/brother/:brotherId', (req, res) => { 
    init(req.params.brotherId, res)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const init = async (cadastro, response) => {
    const id = await standardizeCadastro(cadastro)

    crawler.queue([{
        uri: `${baseUrl}/qrcode/${id}`,
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                crawled($, response)
            }
            done();
        }
    }]);
}


const standardizeCadastro = (cadastro) => {
    console.log('cadastro', cadastro)
    const onlyNumbersCad = cadastro.replace(/[^0-9]+/g, '').match(/[0-9]{0,7}/)[0]
    
    console.log('onlyNumbersCad', onlyNumbersCad)
    
    console.log(onlyNumbersCad.length < glmerjCadLimit && onlyNumbersCad[0] != 0)
    if (onlyNumbersCad.length < glmerjCadLimit && onlyNumbersCad[0] != 0) {
        console.log(zeroPad(onlyNumbersCad))
        return zeroPad(onlyNumbersCad)
    }

    return onlyNumbersCad
}

const zeroPad = (num)  => {
    return num.toString().padStart(7, '0')
}

var crawler = new Crawler({
    maxConnections: 10
});

const crawled = ($, response) => {
    const getInput = (label) => {
        return $(`label:contains(${label})`).siblings('input').val()
    }

    const nome = getInput('Nome')
    const cadastro = getInput('Número de Cadastro')
    const loja = getInput('Loja')
    const situacao = getInput('Situação')
    let foto =  $('.col-md-12 img').eq(1).prop('src')

    if (foto) {
        foto = foto.replace('../', '')
    }

    const result = [{
        foto: `${baseUrl}/${foto}`,
        nome: nome,
        cadastro: cadastro,
        loja: loja,
        situacao: situacao,
    }]
    console.log(result)
    response.status(200).json(result)
}



