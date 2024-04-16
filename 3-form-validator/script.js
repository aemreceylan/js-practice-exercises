"use strict"
    const email_re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_re = /^[-\._a-zA-Z0-9]*[A-Z]+[-\._a-zA-Z0-9]*$/;
    let pw_hide=true; 
    document.querySelectorAll("input").forEach(function(input){
        input.addEventListener("input",checkInput);  
    });
    
    function checkInput(input){
        input=input.target;
        switch(input.id){
            case "email":
                if(!email_re.test(input.value)){
                    input.style.borderColor="red";
                    input.nextElementSibling.style.color="red";
                    input.nextElementSibling.innerText="Geçersiz e posta!";
                }
                if(email_re.test(input.value)||input.value==""){
                    input.style.borderColor="black"; 
                    input.nextElementSibling.innerText="";
                }
                break;
            case "password":
                if(!password_re.test(input.value)){
                    input.style.borderColor="red";
                    input.nextElementSibling.nextElementSibling.style.color="red";
                    input.nextElementSibling.nextElementSibling.innerText="Geçersiz şifre!";
                }
                if(password_re.test(input.value)||input.value==""){
                    input.style.borderColor="black"; 
                    input.nextElementSibling.nextElementSibling.innerText="";
                } 
                break;
            case "password2":
                if(!password_re.test(input.value)){
                    input.style.borderColor="red";
                    input.nextElementSibling.nextElementSibling.style.color="red";
                    input.nextElementSibling.nextElementSibling.innerText="Geçersiz şifre!";
                }
                if(password_re.test(input.value)||input.value==""){
                    input.style.borderColor="black"; 
                    input.nextElementSibling.nextElementSibling.innerText="";
                } 
                break;
            case "username":
                if(input.value.length==25){
                    input.nextElementSibling.innerText="Username en fazla 25 karakter olabilir!";
                }
                else{
                    input.nextElementSibling.innerText="";
                }
                break;
        }

        if(document.getElementById("password2")!=null){
            if(document.getElementById("password").value!=document.getElementById("password2").value){
            document.getElementById("password2").nextElementSibling.nextElementSibling.innerText="Girilen şifreler eşit olmalı!";
            }
            else{
                document.getElementById("password2").nextElementSibling.nextElementSibling.innerText="";
            }
        }
    }

    if(document.getElementById("button-login")!=null){
        document.getElementById("button-login").addEventListener("click",function(event){
            event.preventDefault();
            });
    }

    if(document.getElementById("button-register")!=null){
        document.getElementById("button-register").addEventListener("click",function(event){
            event.preventDefault();
            localStorage.setItem("register","1");
        });
    }
    
    document.querySelectorAll(".show-hide-password").forEach(function(input){
        input.addEventListener("click",function(event){
            if(pw_hide){
                document.querySelectorAll(".show-hide-password img").forEach(function(e){
                    e.setAttribute("src","images/show.png");
                });
                document.querySelectorAll("input[type=password]").forEach(function(input){
                    input.setAttribute("type","text");
                });
                pw_hide=false;
            }
            else{
                document.querySelectorAll(".show-hide-password img").forEach(function(e){
                    e.setAttribute("src","images/hide.png");
                });
                document.querySelectorAll("input[type=text]").forEach(function(input){
                    input.setAttribute("type","password");
                });
                pw_hide=true;
            }
        });
    });
