async function init(){
    const select = document.querySelector('#select')
    const http = "http://localhost:3333"

    const response = await axios.get(http, '/missas')
    const missas = response.data

    const tabela = '<table><tr><th>Missa</th> <th>Pessoas</th></tr>'
    missas.map(missa => {
        tabela += '<tr>'
        tabela += `<td>${missa.semana}, ${missa.dia}, ${missa.horas}</td>`
        tabela += `<td>${missa.numero}</td>`
        tabela += '</tr>'
    })
    tabela += '</table>'

    select.innerHTML = tabela
}

init()