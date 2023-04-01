/*var consultaCEP  = fetch('https://viacep.com.br/ws/05542000/json/')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw Error('Esse cel não existe!')
    } else
    console.log(r)
})
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processamento consluído!'));
*/

async function buscaEndereco(cep) {
    
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error ('CEP não existente.')
        }

        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')
        var bairro = document.getElementById('bairro')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

/*
let ceps = ['05542000','01001000']
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
console.log(conjuntoCeps)
Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
*/

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))
