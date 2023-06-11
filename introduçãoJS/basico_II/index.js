/*function calc(x1, x2, operator) {
    return eval (`${x1} ${operator} ${x2} `);
}

let resultado = calc(1, 2, "-");
console.log(resultado)
*/

//=======================================================
// FUNÇÃO ANONIMA

/*(function (x1, x2, operator) {
    return eval (`${x1} ${operator} ${x2} `);
;})(2,5, "*");
*/

//======================================================
//ARROW FUNCION

/*let calc = (x1, x2 , operator) => {
    return eval (`${x1} ${operator} ${x2}`)
}
let resultado = calc(5, 2, "*")
console.log(resultado)
*/

//=================================================
//DANDO ENVENTOS AS AÇOES

/*window.addEventListener('focus', Event=>{

    console.log("focus");

});
document.addEventListener('click', Event =>{

    console.log("CLICK");

});
*/
//==================================================
//CONVERTENDO DATA

/*let agora = new Date ();

console.log(agora.toLocaleDateString("pt-BR"))
*/

//==================================================
//TRABALHANDO COM ARRAYS

/*let carros = ["Palio 98", "Toro", "Uno", true];

console.log(carros);
console.log(carros.length);
console.log(carros[1])
carros.forEach(function(value, index){

    console.log(index, value);
});
*/

//===================================================
//TRABALANDO COM OBJETOS

/*let celular = function (){
    
    this.cor = "verde";
    this.ligar = function()
    {
        console.log("Uma ligação")
        return "LIGANDO"
    }

    
};
let objeto = new celular();

console.log(objeto.ligar);
*/

//CRIANDO A CLASSE CELULAR

class celular{
    constructor(){
        this.cor = "Verde"

    }
    ligar(){
        console.log("Fazendo uma ligação")
        return 'LIGANDO'
    }
}

let objeto = new celular();
console.log(objeto.cor)
console.log(objeto.ligar)