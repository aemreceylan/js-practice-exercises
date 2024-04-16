window.addEventListener("storage",function(event){
    if(event.key=="register")
        document.querySelector("iframe").src="register.html";
    this.localStorage.setItem("register","0");
});
