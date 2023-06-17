class CalcController {
    constructor () {

        this._lastOperator = '';
        this._lasrNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this. initKeyBoard();
        
        
    }

    pasteFromClipBoard(){

        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);



        });
    }

    copyToClipBoard(){

        let input = document.createElement('input');
        
        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    initialize (){
        this.setDisplayDateTime();
        
        setInterval(()=>{

            this.setDisplayDateTime();
          
        }, 1000 );
        
        this.setLastNumberToDisplay();
        this.pasteFromClipBoard();

    }

    initKeyBoard(){

        document.addEventListener('keyup', e=>{

            switch(e.key){
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;    
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':                
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case 'Igual':    
                    this.calc();
                    break;
                case '.':
                case ',':    
                    this.addDot();
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipBoard();
                    break;
            }
    
        });

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        })
    }

    
    clearAll(){
        this._operation = [];
        this._lasrNumber = '';
        this.lastOperation = ''; 

        this.setLastNumberToDisplay();

    }

    clearEntry(){
        this._operation.pop();

        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){

        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
         return (['+', '-', '/', '*', '%'].indexOf(value)> -1);
          

    }

    pushOperation(value){
            this._operation.push(value);

            if(this._operation.length > 3){

                this.calc();

            }


    }

    getResult(){

        console.log('getResult', this._operation)

        return eval(this._operation.join(""));
    }

    calc(){

        let last = "";
        
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lasrNumber];

        }

        if(this._operation.length > 3){
            last = this._operation.pop();

            this._lasrNumber = this.getResult();
        }else if(this._operation.length == 3){
            
            this._lasrNumber = this.getLastItem(false);
        }    

        console.log('_lastOperator', this._lastOperator);
        console.log('_lasrNumber', this._lasrNumber);

        let result = this.getResult();

        if(last == '%') {

            result /= 100;
            this._operation = [result];

        }else{

            this._operation = [result];

            if(last) this._operation.push(last);

        } 

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){

                if(this.isOperator(this._operation[i]) == isOperator ) {
                    lastItem = this._operation[i];
                    break;

                }
          
        }
        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lasrNumber;

        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);


        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    addOperation(value){

        if (isNaN(this.getLastOperation())){
            //String
            if (this.isOperator(value)){
                //Trocar operador
                this.setLastOperation(value);

            }
            else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }



        }else{
            //Number
            if (this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation((newValue));

                //Atualizar display
                this.setLastNumberToDisplay();


            }
            
        }

    }

    setError(){
        this.displayCalc = "Error";
    }

    addDot(){

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.')> -1) return;

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');

        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();

    }

    execBtn(value){

        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;    
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }


    }



    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";
            });

        });
       
        

    }

    setDisplayDateTime(){
        this.displayDate = this.dataAtual.toLocaleDateString(this._locale);
        this.displayTime = this.dataAtual.toLocaleTimeString(this._locale);

    }


    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get dataAtual(){
        return new Date();
    }
    set dataAtual(value){
        return this._currentDate = value;
    }


}