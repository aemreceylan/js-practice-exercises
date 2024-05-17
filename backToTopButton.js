document.addEventListener("DOMContentLoaded",function(){
    const style =  `<style>
    #backToTopButton{
        position:fixed;
        right:1em;
        bottom:1em;
        height:50px;
        width:50px;
        border-radius:100%;
        background-color:white;
        opacity:0.7;
        display:none;
        transition: all 0.5s;
        color:white;
        display:none;
        justify-content:center;
        align-items:center;
        font-size:150%;
        font-weight:150%;
        border:1px solid rgba(0,0,0,0.5);
    }
    #backToTopButton:hover{
        opacity:1.0;
        transition: all 0.5s;
    }
</style>;`
const button_s =`<div id="backToTopButton"><img src="image/icons/backToTopButton.png"></img></div>` 
document.head.insertAdjacentHTML("beforeend",style);
document.body.insertAdjacentHTML("beforeend",button_s);

const button = document.getElementById("backToTopButton");

document.addEventListener("scroll",function(){
    if(window.scrollY>window.innerHeight/2){
        button.style.display="flex";
    }
    else{
        button.style.display="none";
    }
});

button.addEventListener("click",function(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    });
})
});

