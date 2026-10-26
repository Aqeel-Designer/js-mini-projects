const pokemoninput = document.getElementById("pokemonname");
const pokemonimage = document.getElementById("pokemonimage");
const pokemondisplayname = document.getElementById("pokemondisplayname");
const pokemontype = document.getElementById("pokemontype");
const errormessage =document.getElementById("errormessage");

async function fetchDatahtml() {
    const pokemonname = pokemoninput.value.toLowerCase().trim();
        if (pokemonname === "") {
        errormessage.textContent =
            "Please enter a Pokemon name.";
        errormessage.style.display = "block";
        return;
    }
    try {
        const responsehtml = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`);

        if (!responsehtml.ok) {                                    // Check if Pokemon exists
            throw new Error("Pokemon not found");
        }
        const data = await responsehtml.json();                       // Convert response to JSON
        const pokemonsprite = data.sprites.front_default;
        pokemondisplayname.textContent = `Pokemon Name : ${data.name}`;
        pokemontype.textContent = `Pokemon Type : ${data.types[0].type.name}`;
        pokemonimage.src = pokemonsprite;
        pokemonimage.style.display = "block";
        //erase previous errors
        errormessage.textContent = "";     
        errormessage.style.display = "none";
    }
    catch (error) {
        //clear previous pokemon data
        pokemondisplayname.textContent = "";
        pokemontype.textContent = "";
        pokemonimage.src = "";
        pokemonimage.style.display = "none";
        
        //show new error
        errormessage.textContent ="This Pokemon doesn't exist.";
        errormessage.style.display = "block";
    }

}




    // approach of creatin a new element
    //     const oldError = document.getElementById("errormessage");

    //     if (oldError) {
    //         oldError.remove();
    //     }
    // }
    // catch (error) {
    //     const errorh2 = document.createElement("h2");
    //     errorh2.id = "errormessage";
    //     errorh2.textContent = "This Pokemon doesn't Exist";
    //     pokemonimage.after(errorh2);
    // }