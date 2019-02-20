const button    = document.getElementById("generate");
const num       = document.getElementById("paragraphs");
const dict      = document.getElementById("dict");
const content   = document.getElementById("content");

const queryForData = (e) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText)
            content.innerHTML = "";
            response.forEach(e => {
                content.innerHTML += `<p>${response}</p>`
            });            
        }
    };
    xhttp.open("GET", `/api/generate/paragraphs?count=${num.value}&dictionary=${dict.value}`, true);
    xhttp.send();
};

window.onload   = queryForData
button.onclick  = queryForData