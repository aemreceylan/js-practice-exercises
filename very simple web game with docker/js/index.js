document.addEventListener("DOMContentLoaded",()=>{
    let user = localStorage.getItem("user");
    if(user==null)
        user="---";
    document.querySelector(".score .prev").textContent = "---";
    document.querySelector(".score .prevnick").textContent = user;
    fetch("http://localhost:3000/scoreTable")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(element => {
            if(element.nick == user){
                document.querySelector(".score .prev").textContent = element.score;
            }
        }); 
    }
    );
});

