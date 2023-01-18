const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = []

btnDeleteAll.onclick = () => {
    itensDB = []
    updateDB()
}
texto.addEventListener('keypress', e => {
    if (e.key == 'Enter' && texto.value !== ''){
        setItemDB()
    }
})

btnInsert.onclick = () => {
    if (texto.value !== ''){
        setItemDB()
    }
}
function setItemDB(){
    if(itensDB.length >= 30){
        alert('Limite máximo de 30 itens atingidos!')
        return
    }
    itensDB.push({ 'item': texto.value, 'status': ''})
    updateDB()
}
function updateDB(){
    localStorage.setItem('lista-de-tarefa', JSON.stringity(itensDB))
    loadItens()
}
function loadItens(){
    ul.innerHTML = "";
    itensDB = JSON.parse(localStorage.getItem('lista-de-tarefa'))  ?? []
    itensDB.forEach((item, i) => {
        insertIemTela(item.item, item.status, i)        
    })
}
function insertIemTela(text, status, i){
    const li = document.createElement('li')
    li.innerHTML =  `
        <div class="divLi">
            <input type="checkbox" ${status} data-i=${i} onchange=done(this)
            <span data-si=${i}>${text}</span>
            <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'>
        </div>`
    ul.appendChild(li)

    if(status){
        document.querySelector(`[data-si="${i}"]`).classList.add('line-throught')
    } else{
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-throught')
    }
    texto.value = ''
}
function done(chk, i){
    if(chk,checked){
        itensDB[i].status = 'checked'
    } else {
        itensDB[i].status = ''
    }
    updateDB()
}
function removeItem(i){
    itensDB.splice(i, 1)
    updateDB()
}
loadItens()