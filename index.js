const cityInput = document.querySelector(".cityNameInput");
const subButton = document.querySelector(".subButton");
const card = document.querySelector(".weatherFacts");
const apikey = "7c181d301bb175a7141df2e70bb68567";


subButton.addEventListener("click", event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        
    }
    else{
        displayError("Enter a city");
    }
});

async function FetchApi(){

}

function displayError(msg){
const ErrorMsg = document.createElement("p");
ErrorMsg.textContent = msg;

card.textContent = "";
card.appendChild(ErrorMsg);
}