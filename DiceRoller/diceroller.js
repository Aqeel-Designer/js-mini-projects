function rollDice(){
    const numOfDice = document.getElementById("numOfDice").value;
    const diceResult = document.getElementById("diceResult");
    const diceImaegs = document.getElementById("diceImages");
    const values =[];
    const images = [];
    for (let i=0;i<numOfDice;i++){
        const value = Math.floor(Math.random()*6)+1;
        values.push(value);
        images.push(`<img src="images/${value}.png" alt="Dice ${value}">`)
    }
    diceResult.textContent=`Your rolled: ${values.join(", ")}`;
    diceImaegs.innerHTML = images.join(" ");
}