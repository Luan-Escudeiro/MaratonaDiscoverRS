const Modal={
    open(){
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        document.querySelector('.modal-overlay.active').classList.remove('active');

    }
}

const transactions=[{
    description:"Alo",
    value:0,
    date:"2021"
}]

const Transaction={
    all:transactions,
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()

    },
    remove(){

    },
    ganho(){
        return "ganho"
    },
    gasto(){
        return "gasto"
    },
    total(){
        return "total"
    }
}

const Utils={
    formatCurrency(value){
        const signal = Number(value) <0 ? "-":""
        value=String(value).replace(/\D/g,"")
        value=Number(value)
        value=value.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        })
        return signal + value
    }
}


const DOM={
    updateBalance(){
        document.getElementById('entry').innerHTML = Transaction.ganho()
        document.getElementById('outs').innerHTML = Transaction.gasto()
        document.getElementById('totals').innerHTML = Transaction.total()
    },

    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transactions){
        const tr = document.createElement('tr')
        tr.innerHTML=DOM.innerHTMLTransaction(transactions)
        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transactions){
        const changeClass = transactions.value>0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transactions.value)
    const html=`
    <td class="description">${transactions.description}</td>
    <td class="${changeClass}">${amount}</td>
    <td class="date">${transactions.date}</td>
    <td class="figure"><img src="./assets/minus.svg" alt="Botão de menos"></td>
    `
    return html
    }

}

const Form={
    description:document.querySelector('input#description'),
    amount:document.querySelector('input#amount'),
    date:document.querySelector('input#date'),

    getValues(){
        return{
            description:Form.description.value,
            amount:Form.amount.value,
            date:Form.date.value
        }
    },

    validateFields(){
        const { description,amount,date }= Form.getValues()
        if( description.trim() === ""||amount.trim() === ""||date.trim() === ""){
            throw new Error("Por favor, preencha todos os campos.")
        }
    },
    submit(event){
        event.preventDefault()
        try{
            Form.validateFields()
        }catch(error){
            alert(error.message)
        }
        //Form.formatData()

    }
}

const App={
    init(){
        transactions.forEach(function (transaction) {
            DOM.addTransaction(transaction);
    })
    DOM.updateBalance()
    },
    reload(){
        App.init()
    }
}
App.init()