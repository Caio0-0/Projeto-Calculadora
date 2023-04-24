const previousOperationText = document.querySelector('#previo')
const currentOperationText= document.querySelector("#corrent")
const buttons = document.querySelectorAll("#butao-con button")

class Calculadora{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }
    //Adicionar um digito para tela da calculadora
    addDigit(digit){
        //checar se a current tem um ponto
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }
        
        this.currentOperation = digit
        this.updateScreen()
    }
    //Processar todos os metodos da calculadora
    processOperation(operation){
        //Checar se current ta vazio
        if(this.currentOperationText.innerText =='' && operation !='C'){
            if(this.previousOperationText.innerText !==''){
                this.changeOperation(operation)
            }
            return
        }
        //pegar valores do carrunt e do previo
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue,operation,current,previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue,operation,current,previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue,operation,current,previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue,operation,current,previous)
                break
            case "DEL":
                this.processDelOpera()
                break
            case "CE":
                this.processClearCurrentOpera()
                break
            case "C":
                this.processClearAllOpera()
                break
            case "=":
                this.processEqualOpera()
                break
            default:
                return
            
        }
    }
    //Carregar valores para a tala da calculadora
    updateScreen(operationValue = null, operation =null, carrunt=null,previous = null){
        
        if(operationValue == null){
            this.currentOperationText.innerText += this.currentOperation
        }else{
            //verificar se o valor é zero 
            if(previous === 0){
                operationValue = carrunt
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    changeOperation(operation){
        const mathOperations = ["*","/","+","-"]
        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation
    }
    processDelOpera(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1)
    }
    processClearCurrentOpera(){
        this.currentOperationText.innerText = ""
    }
    processClearAllOpera(){
        this.previousOperationText.innerText = ""
        this.currentOperationText.innerText = ""
    }
    processEqualOpera(){
        const operation = previousOperationText.innerText.split(' ')[1]
        this.processOperation(operation)
    }
}


const calc = new Calculadora(previousOperationText,currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener('click',(e)=>{

        const value = e.target.innerText

        if(+value >= 0 || value == "."){
            calc.addDigit(value)

        }else{
            calc.processOperation(value)
        }
    })
})
