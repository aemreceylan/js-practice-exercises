"use strict"
document.addEventListener("DOMContentLoaded",function(){
    const ticket_price = 10;
    let selected_seats=JSON.parse(localStorage.getItem("selected_seats"));
    let selected_seats_d=JSON.parse(localStorage.getItem("selected_seats_d"));
    let reserved_seats=JSON.parse(localStorage.getItem("reserved_seats"));
    init();
    
    document.querySelector(".container").addEventListener("click",function(event){
        if(event.target.classList.contains("seat")&&!event.target.classList.contains("reserved")){
            set(event);
            showResults();
        }
    });
    
    document.getElementById("buy").addEventListener("click",function(){
        Array.from(document.querySelectorAll(".selected")).forEach(function(i){
            i.classList.replace("selected","reserved");
            if(reserved_seats.indexOf(i.id)==-1)
                reserved_seats.push(i.id);
            console.log(reserved_seats);
        });
        localStorage.setItem("reserved_seats",JSON.stringify(reserved_seats));
    });

    function showResults(){
        document.getElementById("result-seats").innerText = selected_seats.concat(selected_seats_d).join(",");
        document.getElementById("result-cost").innerText = (selected_seats.length+2*selected_seats_d.length)*ticket_price;
        document.getElementById("result-cost-number").innerText = `(${selected_seats.length+selected_seats_d.length})`;
        
    }

    function set(event){
        event.target.classList.toggle("selected");
        selected_seats = Array.from(document.querySelectorAll(".selected:not(.double)")).map(function(i){
            return i.id;
        });
        selected_seats_d = Array.from(document.querySelectorAll(".selected.double")).map(function(i){
            return i.id;
        });
        localStorage.setItem("selected_seats",JSON.stringify(selected_seats));
        localStorage.setItem("selected_seats_d",JSON.stringify(selected_seats_d));
    }

    function init(){
        if(selected_seats==null)
            selected_seats=[];
        if(selected_seats_d==null)
            selected_seats_d=[];
        if(reserved_seats==null)
            reserved_seats=[];    
        showResults();
        selected_seats.concat(selected_seats_d).forEach(function(i){
            document.getElementById(i).classList.add("selected");
        });
        reserved_seats.forEach(function(i){
            document.getElementById(i).classList.add("reserved");
        });
    }
});

function resetLocaleStorage(){
    localStorage.removeItem("selected_seats");
    localStorage.removeItem("selected_seats_d");
    localStorage.removeItem("reserved_seats");
}