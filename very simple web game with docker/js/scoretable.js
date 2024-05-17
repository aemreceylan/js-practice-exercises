(function(){
    document.addEventListener("DOMContentLoaded",()=>{
        fetch("http://localhost:3000/scoreTable")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(element => {
                document.querySelector("table").insertAdjacentHTML("beforeend",
                `<tr>
                    <td>${element.nick}</td>
                    <td>${element.score}</td>
                </tr>
                `);
            });
        }
        );
    });
})();