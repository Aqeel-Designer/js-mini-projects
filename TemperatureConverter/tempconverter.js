const textbox = document.getElementById("textbox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelcius = document.getElementById("toCelcius");
const result = document.getElementById("result");
const button = document.getElementById("button");

let temp = 0;

button.onclick = function convert(){
    if(toFahrenheit.checked){
        temp = Number(textbox.value);
        temp = temp*9/5 +32;
        result.textContent = temp.toFixed(1)+"°F";
    } else if(toCelcius.checked){
        temp = Number(textbox.value);
        temp = (temp-32)*(5/9);
        result.textContent = temp.toFixed(1)+"°C"; 
    } else {
        result.textContent = "Select a unit for Conversion";
    }
    result.style.display = "block";
}

