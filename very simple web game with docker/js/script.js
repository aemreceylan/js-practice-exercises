"use strict";
let game;
document.addEventListener("DOMContentLoaded",()=>{ 
    //theme
    (function(){
        const body = document.querySelector("body");
        const header = document.querySelector("header");
        const theme_button = document.querySelector(".header-right .theme");
        const account_button = document.querySelector(".header-right .account");
        const game_area = document.querySelector("main .game-area");
        const start_screen = document.querySelector(".start-screen");
        const play_button = document.querySelector(".play-button");

        const initTheme = ()=>{
            if(!localStorage.getItem("theme")){
                localStorage.setItem("theme","light");
            }
            setTheme();
        }

        const setTheme = ()=>{

            if(localStorage.getItem("theme")=="dark"){
            body.style.backgroundColor="black";
            body.style.color="white";
            header.style.borderBottomColor="white";
            header.style.boxShadow="1px 0 10px 0 white";
            theme_button.style.backgroundColor="white";
            theme_button.style.borderColor="white";
            account_button.style.borderColor="white";
            game_area.style.borderColor="white";
            start_screen.style.borderColor="white";
            play_button.style.borderColor="white";
        }
        else{
            body.style.backgroundColor="white";
            body.style.color="black";
            header.style.borderBottomColor="black";
            header.style.boxShadow="1px 0 10px 0 black";
            theme_button.style.backgroundColor="black";
            theme_button.style.borderColor="black";
            account_button.style.borderColor="black";
            game_area.style.borderColor="black";
            start_screen.style.borderColor="black";
            play_button.style.borderColor="black";
        }
        
        }

        theme_button.addEventListener("click",()=>{
            if(localStorage.getItem("theme")=="light"){
                localStorage.setItem("theme","dark");
                setTheme();
            }
            else if(localStorage.getItem("theme")=="dark"){
                localStorage.setItem("theme","light");
                setTheme();
            }
        });

        initTheme();

    })();

    //game
    game=(function(){ 
        let no=0;
        let dif=1;
        let counter=0;
        let game_div;
        let attinf;
        let config={};

        const setDifficulty = (x)=>{
            if(x>0 && x<10){
                config.difficulty = x;
            }
        }

        const setTime = (x)=>{
            if(x>0){
                config.time = x;
            }
        }

        const setConfig = ()=>{
            config["node_size"] = (Math.min(attinf.width,attinf.height))/10;
            config["theme"] = attinf.theme;
        }

        const random = (a,b)=>{
            return Math.random()*(b-a)+a;
        }

        const counterArea = document.querySelector(".counter span");

        const updateCounter = ()=>{
            counterArea.textContent=counter;
        }
        
        const popNode = ()=>{
            document.querySelector(".node").removeEventListener("click",popNode);
            document.querySelector(".node").remove();
            counter++;
            updateCounter();

        }

        const generateNode = ()=>{
            let node = `<div no="${++no}" style="position:absolute; top:${random(0,attinf.height-config.node_size)}px; left:${random(0,attinf.width-config.node_size)}px; border-radius:100%; background-color:${config.theme=='dark'?'white':'black'}; width:${config.node_size}px; height:${config.node_size}px; cursor:pointer" class="node"></div>`;
            game_div.insertAdjacentHTML("afterbegin",node);
            document.querySelector(".node").addEventListener("click",popNode);
            
        }
        
        let game = document.querySelector(".game");
        const gameOver = ()=>{
            clearInterval(timer);
            clearInterval(step_timer);
            localStorage.setItem("prev",counter);
            game.style.display = "none";
            send();
            document.querySelector(".start-screen").style.display="flex";

        } 

        let step_timer;
        const step = ()=>{
            if(document.querySelector(".node")!=null){
                document.querySelector(".node").removeEventListener("click",popNode);
                gameOver();
            }
            else{
                generateNode();
            }
        }

        let timer;
        const start = ()=>{
            game_div = document.querySelector(".game .game-area");
            attinf = {
                "width":game_div.offsetWidth,
                "height":game_div.offsetHeight,
                "theme":localStorage.getItem("theme")
            };
    
            config={
                "difficulty":5,
                "time":4
            };

            setConfig();
            generateNode();
            let time=0;
            timer = setInterval(()=>{
                time++;
                if(time%(11-config.difficulty)==0)
                    dif++;
            },1000);
            step_timer = setInterval(step,config.time*1000-(config.time*1000*dif*0.1));
        }

        const help = () =>{
            console.log("setTime(...)");
            console.log("setDifficulty(...)");
            console.log("start()");
        }

        const send = () => {        
            console.log(localStorage.getItem("user"));
            if(localStorage.getItem("user")==null)
                localStorage.setItem("user","---");    
            const data = {
                nick:localStorage.getItem("user"),
                score:counter
            }
            fetch("http://localhost:3000/newScore",{
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data)
            });
        };

        return{
            help,setDifficulty,setTime,start
        }

        
    })();

    //play
    document.querySelector(".play-button").addEventListener("click",()=>{
        document.querySelector(".start-screen").style.display="none";
        document.querySelector(".game").style.display="flex";
        game.start();
    });

    //account
    document.querySelector(".account").addEventListener("click",()=>{
        let user = prompt("Nick giriniz");
        if(user==null)
            user="---";
        localStorage.setItem("user",user);

        document.querySelector(".score .prevnick").textContent = localStorage.getItem("user");
        document.querySelector(".score .prev").textContent = "---";


        fetch("http://localhost:3000/scoreTable")
        .then(response=>response.json())
        .then(data=>{
            data.forEach(element => {
                if(element.nick == localStorage.getItem("user")){
                    document.querySelector(".score .prev").textContent = element.score;
                }
            }); 
        }
        );
    });

});