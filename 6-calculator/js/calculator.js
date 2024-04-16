"use strict"
document.addEventListener("DOMContentLoaded",function(){

    const input_text_area = document.querySelector("#display-input-area textarea");
    const result_area = document.getElementById("result-area");
    const display_results_area = document.getElementById("display-results-area"); 
    let text_data;
    let memory = [];
    let hindex;
    let tindex;
    let tmpindex;
    let index;
    let result;
    let is_parenthes;
    let phindex;
    let ptindex;
    let start;
    let end;
    let is_absolute;
    let is_factorial= false;
    let memory_count=0;
    let input_area_is_open=true;
    let text_pointer;

    for (let i of document.getElementsByClassName("numpad-button")){
        i.addEventListener("click",clickNumpadButton);
    }

    document.getElementById("minimalize-input-area-inputs").addEventListener("click",function(event){
        if(input_area_is_open){
            document.getElementById("input-area").style.display="none";
            input_area_is_open = false;
        }
        else{
             document.getElementById("input-area").style.display="block";
             input_area_is_open = true;
        }
    });

    input_text_area.addEventListener("keyup",function(event){
        if(event.key=="Enter"){
           eventKeyEnter();
        }
        else
            calculate(takeInput());
    });

    function eventKeyEnter(){
        calculate(takeInput());
        memory_count++;
        if(memory_count>5){
            memory.shift();
            memory.push([takeInput(),text_data]);
        }
        else
            memory.push([takeInput(),text_data]);
        input_text_area.value="";
        result_area.innerText="";
        display_results_area.innerHTML="";
        listMemory();
    }

    function clickNumpadButton(event){
        input_text_area.focus();
        text_pointer = input_text_area.selectionStart+1;
        switch(event.target.id){
            case "0":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"0"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "1":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"1"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "2":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"2"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "3":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"3"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "4":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"4"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "5":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"5"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "6":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"6"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "7":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"7"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "8":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"8"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "9":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"9"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case ".":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"."+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "del":
                input_text_area.value=input_text_area.value.slice(0,input_text_area.selectionStart-1)+input_text_area.value.slice(input_text_area.selectionStart);
                text_pointer-=2;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;    
            case "left":
                input_text_area.setSelectionRange(text_pointer-2,text_pointer-2);
                break;
            case "right":
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "+":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"+"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "-":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"-"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "*":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"*"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "/":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"/"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "%":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"%"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "!":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"!"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "(":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"("+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case ")":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+")"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "sin":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"sin"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=2;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "cos":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"cos"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=2;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "tan":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"tan"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=2;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "cot":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"cot"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=2;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "^":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+"^"+input_text_area.value.toString().slice(input_text_area.selectionStart);
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "M1":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+memory[0][1]+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=memory[0][1].toString().length-1;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "M2":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+memory[1][1]+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=memory[1][1].toString().length-1;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "M3":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+memory[2][1]+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=memory[2][1].toString().length-1;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;  
            case "M4":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+memory[3][1]+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=memory[3][1].toString().length-1;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;  
            case "M5":
                input_text_area.value=input_text_area.value.toString().slice(0,input_text_area.selectionStart)+memory[4][1]+input_text_area.value.toString().slice(input_text_area.selectionStart);
                text_pointer+=memory[4][1].toString().length-1;
                input_text_area.setSelectionRange(text_pointer,text_pointer);
                break;
            case "enter":
                eventKeyEnter();
                break;
            case "C":
                input_text_area.value="";
                calculate(takeInput);
                break;
            case "CE":
                input_text_area.value="";
                calculate(takeInput);
                memory=[];
                display_results_area.innerHTML="";
                break;                                                                                 
        }
        calculate(takeInput());

    }

    function takeInput(){
        return input_text_area.value;
    }

    function sonucYaz(){
        result_area.innerText = text_data;
    }

    function calculate(data){
        text_data=data.toString();
        absolute();
        factorial();
        trigonometry();
        parenthes();
        power();
        mulDiv();
        mod();
        add();
        sub();
        sonucYaz();
    }

    function power(){
        findStartEnd();
        index = text_data.toString().slice(start,end).indexOf("^");
        if(index != -1)
            index +=text_data.toString().slice(0,start).length;
        while(index!=-1){
            finder();
            result = Number(text_data.toString().slice(hindex,index))**Number(text_data.toString().slice(index+1,tindex+1));
            operation();
            if(is_parenthes){
                findParenthes();
                findStartEnd();
            }
            index = text_data.toString().slice(start,end).indexOf("^");
            if(index != -1)
                index +=text_data.toString().slice(0,start).length;
        }
    }

    function mod(){
        findStartEnd();
        index = text_data.toString().slice(start,end).indexOf("%");
        if(index != -1)
            index +=text_data.toString().slice(0,start).length;
        while(index!=-1){
            finder();
            result = Number(text_data.toString().slice(hindex,index))%Number(text_data.toString().slice(index+1,tindex+1));
            operation();
            if(is_parenthes){
                findParenthes();
                findStartEnd();
            }
            index = text_data.toString().slice(start,end).indexOf("%");
            if(index != -1)
                index +=text_data.toString().slice(0,start).length;
        }
    }

    function add(){
        findStartEnd();
        index = text_data.toString().slice(start,end).indexOf("+");
        if(index != -1)
            index +=text_data.toString().slice(0,start).length;
        while(index!=-1){
            finder();
            result = Number(text_data.toString().slice(hindex,index))+Number(text_data.toString().slice(index+1,tindex+1));
            operation();
            if(is_parenthes){
                findParenthes();
                findStartEnd();
            }
            index = text_data.toString().slice(start,end).indexOf("+");
            if(index != -1)
                index +=text_data.toString().slice(0,start).length;
        } 
    }

    function sub(){
        findStartEnd();
        index = text_data.toString().slice(start,end).indexOf("-");
        if(index != -1)
            index +=text_data.toString().slice(0,start).length;
        while(index!=-1){
            finder();
            result = Number(text_data.toString().slice(hindex,index))-Number(text_data.toString().slice(index+1,tindex+1));
            operation();
            if(is_parenthes){
                findParenthes();
                findStartEnd();
            }
            index = text_data.toString().slice(start,end).indexOf("-");
            if(index != -1)
                index +=text_data.toString().slice(0,start).length;
            if(hindex==0)
                break;
        }   
    }

    function finder(){
        tmpindex = index;
        while(text_data.toString().charCodeAt(--tmpindex)>=48 && text_data.toString().charCodeAt(tmpindex) <= 57 || text_data.toString().charAt(tmpindex) ==".");
        hindex = tmpindex+1;
        tmpindex = index;
        if(!is_factorial){
            while(text_data.toString().charCodeAt(++tmpindex)>=48 && text_data.toString().charCodeAt(tmpindex) <= 57 || text_data.toString().charAt(tmpindex) ==".");
            tindex = tmpindex-1; 
        }
        else
            tindex=index;
    }

    function operation(){
        if(is_absolute)
            result*=-1;
        if(text_data.toString().length<=3){
            text_data = result;
        }
            
        else
            text_data=text_data.toString().slice(0,hindex) + result + text_data.toString().slice(tindex+1);
    }

    function mulDiv(){
        index=0;
        findStartEnd();
        while(true){
            if(is_parenthes){
                findParenthes();
                findStartEnd();
            }
            if(index == -1)
                return;
            if(text_data.toString().slice(start,end).indexOf("*")==-1&&text_data.toString().slice(start,end).indexOf("/")==-1)
                return;
            else{
                if(text_data.toString().slice(start,end).indexOf("*")==-1){
                    index = text_data.toString().slice(start,end).indexOf("/")+text_data.toString().slice(0,start).length;
                    finder();
                    result = Number(text_data.toString().slice(hindex,index))/Number(text_data.toString().slice(index+1,tindex+1));
                }
                else{
                    if(text_data.toString().slice(start,end).indexOf("/")==-1){
                        index = text_data.toString().slice(start,end).indexOf("*")+text_data.toString().slice(0,start).length;
                        finder();
                        result = Number(text_data.toString().slice(hindex,index))*Number(text_data.toString().slice(index+1,tindex+1));
                    }
                    else{
                        if(text_data.toString().slice(start,end).indexOf("*")<text_data.toString().slice(start,end).indexOf("/")){
                            index = text_data.toString().slice(start,end).indexOf("*")+text_data.toString().slice(0,start).length;
                            finder();
                            result = Number(text_data.toString().slice(hindex,index))*Number(text_data.toString().slice(index+1,tindex+1));
                        }
                        else{
                            index = text_data.toString().slice(start,end).indexOf("/")+text_data.toString().slice(0,start).length;
                            finder();
                            result = Number(text_data.toString().slice(hindex,index))/Number(text_data.toString().slice(index+1,tindex+1));                    
                        }
                    }
                } 
            }
            operation();
        }
    }

    function parenthes(){
        is_parenthes = true;
        findParenthes();
        while(phindex!=-1){
            factorial();
            power(); 
            mulDiv();
            mod();
            add();
            sub();
            text_data=text_data.toString().replace("(","");
            text_data=text_data.toString().replace(")","");
            findParenthes();
        }
        is_parenthes = false;
    }
    
    function findParenthes(){
        phindex = text_data.toString().indexOf("(");
        ptindex = text_data.toString().indexOf(")",phindex);
    }
    
    function findStartEnd(){
        start = 0;
        end = text_data.length;
        if(is_parenthes){
            start = phindex+1;
            if(ptindex == -1)
                ptindex=end
            end = ptindex;
        }
    }

    function absolute(){
        is_absolute = true;
        is_parenthes = true;
        phindex = text_data.toString().indexOf("|");
        ptindex = text_data.toString().indexOf("|",phindex);
        while(phindex!=-1){
            text_data=text_data.toString().replace("|","");
            text_data=text_data.toString().replace("|","");
            phindex = text_data.toString().indexOf("|");
            ptindex = text_data.toString().indexOf("|",phindex);
        }
        is_absolute = false;
        is_parenthes = false;
    }

    function trigonometry(){
        let info;
        is_parenthes = true;
        while(true){
            findStartEnd();
            index = text_data.length;
            if(text_data.toString().slice(start,end).indexOf("sin")!=-1){
                index = text_data.toString().slice(start,end).indexOf("sin");
                info = "sin";
            }
            if(text_data.toString().slice(start,end).indexOf("cos")!=-1 && text_data.toString().slice(start,end).indexOf("cos")<index){
                index = text_data.toString().slice(start,end).indexOf("cos");
                info = "cos";
            }
            if(text_data.toString().slice(start,end).indexOf("tan")!=-1 && text_data.toString().slice(start,end).indexOf("tan")<index){
                index = text_data.toString().slice(start,end).indexOf("tan");
                info = "tan";
            }
            if(text_data.toString().slice(start,end).indexOf("cot")!=-1 && text_data.toString().slice(start,end).indexOf("cot")<index){
                index = text_data.toString().slice(start,end).indexOf("cot");
                info = "cot";
            }
            if (index == text_data.length)
                break;

            switch(info){
                case "sin":
                    result = Math.sin(Number(text_data.toString().slice(index+4,Number(text_data.toString().indexOf(")",index+4)))));
                    break;
                case "cos":
                    result = Math.cos(Number(text_data.toString().slice(index+4,Number(text_data.toString().indexOf(")",index+4)))));
                    break;
                case "cot":
                    result = 1/Math.tan(Number(text_data.toString().slice(index+4,Number(text_data.toString().indexOf(")",index+4)))));
                    break;
                case "tan":
                    result = Math.tan(Number(text_data.toString().slice(index+4,Number(text_data.toString().indexOf(")",index+4)))));
                    break;
                default:
                    break;
            }
            tindex = Number(text_data.toString().indexOf(")",index+4));
            phindex = Number(text_data.toString().indexOf("(",index));
            ptindex = tindex;
            hindex=index;
            if(tindex!=-1){
                operation();
            }
            else
                text_data=text_data.toString().slice(start,end).replace(info,"");
        }
        is_parenthes = false;
    }

    function factorial(){
        is_factorial = true;
        while(true){
            findStartEnd();
            index = text_data.toString().slice(start,end).indexOf("!");
            if(index == -1)
                break;
            finder();
            let number = Number(text_data.toString().slice(hindex,index));
            result = 1;
            for(let i = 2 ; i<=number ; i++)
                result *= i;
            
            findStartEnd();
            operation();
        }
        is_factorial = false;
    }

    function listMemory(){
        let j = 0;
        for(let i of memory){
            let data = `<div class="memory-item clearfix" id="${++j}"><span>${i[0]}</span><div>${i[1]}</div></div>`;
            display_results_area.insertAdjacentHTML("afterbegin",data);
        }
    }
});