document.addEventListener("DOMContentLoaded",function(){
    function Question(text,options,answer,status,selected){
    this.text=text,
    this.options=options,
    this.answer=answer,
    this.status=status,
    this.selected=selected
    }

    Question.prototype.checkAnswer = function(answer){
        return this.answer === answer; 
    }

    function Quiz(question_list){
        this.question_list=question_list,
        this.getQuestion = function(index){
            return question_list[index];
        }
    }

    let quiz = new Quiz([]);    
    let colors={
            "correct_green" : "#58e07b",            
            "incorrect_red" : "#f27e7e",
            "empty_gray" : "#cededd",
            "border" : "rgba(69, 63, 120,1.0)"
    }

    let question_list = [
            new Question("Giresun ilinin plaka kodu kaçtır?",{a:"27",b:"28",c:"52",d:"55"},"b","notseen",""),
            new Question("İran ülkesinin başkenti neresidir?",{a:"Tahran",b:"Beyrut",c:"Şam",d:"Halep"},"a","notseen",""),
            new Question("1977 yapımı ve serinin ilk filmi olan Star Wars: A New Hope filminin senaristi ve yönetmeni kimdir?",{a:"Stanley Kubrick",b:"Francis Ford Coppola",c:"George Lucas",d:"James Cameron"},"c","notseen",""),
            new Question("2.Dünya Savaşı'nın başlangıç ve bitiş yılları hangisidir?",{a:"1940-1940",b:"1933-1939",c:"1939-1945",d:"1935-1949"},"c","notseen",""),
            new Question("Karadeniz bölgesindeki tek ada hangi ilindir?",{a:"Samsun",b:"Sinop",c:"İstanbul",d:"Giresun"},"d","notseen",""),
            new Question("5*10+1-4*5-(60/3)=?",{a:"10",b:"11",c:"12",d:"20"},"b","notseen","")
        ];
    
    let qindex=0;
    let double_click=false;
    let isFinished=false;
    let interval;
    initQuestions();
    pquestion();
    setQuestionOrder();

    document.getElementById("btn-next").addEventListener("click",function(input){
        qindex++;
        pquestion();
    });

    document.getElementById("btn-previous").addEventListener("click",function(input){
        qindex--;
        pquestion();
    });

    document.getElementById("strip").addEventListener("click",function(event){
        qindex = Array.from(document.querySelectorAll(".strip-element")).indexOf(event.target);
        pquestion(qindex);
    });

    document.getElementById("question-options").addEventListener("click",function(event){
        if(quiz.getQuestion(qindex).checkAnswer(event.target.lastElementChild.textContent)){
            event.target.style.backgroundColor=colors.correct_green;
            quiz.getQuestion(qindex).status="correct";
            document.getElementById("question-options").style.pointerEvents="none";
            quiz.getQuestion(qindex).selected=event.target.lastElementChild.textContent;
        }
        else if(event.target.classList.contains("question-option")){
            event.target.style.backgroundColor=colors.incorrect_red;
            quiz.getQuestion(qindex).status="incorrect";
            document.getElementById("question-options").style.pointerEvents="none";
            quiz.getQuestion(qindex).selected=event.target.lastElementChild.textContent;
        }
        listStrip();
    });

    
    document.getElementById("btn-finish").addEventListener("click",function(x){
        document.getElementById("btn-finish").style.backgroundColor=colors.incorrect_red;
        if(double_click){
            clearInterval(interval);
            finishTest(0.5); 
        }
        double_click=true;
    });

    document.getElementById("btn-close").addEventListener("click",function(x){
        window.close();
    });

    function pquestion(){
        if(qindex<0)
            qindex=0;
        else if(qindex==quiz.question_list.length){
            qindex = quiz.question_list.length-1;
        }
        else{
            if(quiz.getQuestion(qindex).status=="notseen")
                quiz.getQuestion(qindex).status="empty";
            clearOptionsArea();
            print(qindex);
            setQuestionOrder();
            listStrip();
            if(quiz.getQuestion(qindex).status=="empty" && !isFinished)
                document.getElementById("question-options").style.pointerEvents="all";
            else{
                document.getElementById("question-options").style.pointerEvents="none";
            }
        }
        if(qindex==quiz.question_list.length-1){
            document.getElementById("btn-next").style.display="none";
            document.getElementById("btn-finish").style.display="flex";
        }
        else{
            document.getElementById("btn-next").style.display="flex";
            document.getElementById("btn-finish").style.display="none";
        }
        if(double_click){
            double_click=false;
            document.getElementById("btn-finish").style.backgroundColor=colors.border;
        }
    }
    
    function print(index){
        printQuestion(index);
        listOptions(index);
    }
    
    function initQuestions(){
        document.getElementById("statistic-area").style.display="none";
        document.getElementById("container").style.display="flex";
        let temp = question_list.length;
        for(let i=0 ; i<temp ; i++ ){
            let random_temp = randomInt(0,question_list.length-1);
            let question = question_list[random_temp];
            let options = Object.values(question.options);
            
            for(let i in question.options){
                if(i==question.answer){
                    question.answer=question.options[i];
                }
            }

            question_list.splice(random_temp,1);        
            question.options=[];
            for(let i=options.length-1;i>=0;i--){
                random_temp = randomInt(0,i);
                question.options.push(options[random_temp]);
                options.splice(random_temp,1);
            }
            quiz.question_list.push(question);
        }
        printTimer(setTimer(80));
        timer(80);
        timeStripAnimation(80,598);
    }

    function printQuestion(index){
        document.getElementById("question").textContent=quiz.getQuestion(index).text;
    }

    function listOptions(index){
        let char = 97;
        for(let i of quiz.getQuestion(index).options){
            let text = `<div class="question-option" style="${quiz.getQuestion(index).status=="correct"?(i==quiz.getQuestion(index).selected?"background-color:"+colors.correct_green+";":""):quiz.getQuestion(index).status=="incorrect"?(i==quiz.getQuestion(qindex).selected?"background-color:"+colors.incorrect_red+";":""):""};">${String.fromCharCode(char++)}.<span>${i}</span></div>`
            document.getElementById("question-options").insertAdjacentHTML("beforeend",text);
        }
    }

    function clearOptionsArea(){
        document.getElementById("question-options").innerHTML="";
    }

    function setQuestionOrder(){
        document.querySelector("#question-order span").textContent=`${qindex+1} / ${quiz.question_list.length}`;
    }

    function listStrip(){
        document.getElementById("strip").innerHTML="";
        let color;
        let text;
        let j = -1;
        for(let i of quiz.question_list){
            switch(i.status){
                case "empty":
                    color = colors.empty_gray;
                    break;
                case "correct":
                    color = colors.correct_green;
                    break;
                case "incorrect":
                    color = colors.incorrect_red;
                    break;
                default:
                    color = "none";
                    break;
            }
            j++;
            text = `<div class="strip-element" style="background-color:${color};${j==qindex?"transform:scale(1.1)":"a"}"></div>`;
            document.getElementById("strip").insertAdjacentHTML("beforeend",text);
        }
    }

    function finishTest(time){
        double_click=false;
        document.getElementById("container").style.transition=`all ${time}s`;
        document.getElementById("container").style.transform="scale(0.4)";
        document.getElementById("container").style.opacity="0";
        setTimeout(function(){
            document.getElementById("container").style.display="none";
            showStatistics(time);
        },time*1000);
    }

    function showStatistics(time){
        const statistic_area = document.getElementById("statistic-area");
        statistic_area.style.display="flex";
        setTimeout(function(){
            statistic_area.style.transition=`all ${time}s`;
            statistic_area.style.opacity="1";
            statistic_area.style.transform="scale(1)";
        },100);
        printStatistics();
    }

    function timer(time){
        time--;
        interval = setInterval(function(){
        printTimer(setTimer(time--));
        if(time == -1){
            clearInterval(interval);
            timeOut();
        }
        },1000);
    }

    function printTimer(data){
        let text="";
        if(data[0]>0)
            text+=`${data[0]} saat `;
        if(data[1]>0)
            text+=`${data[1]} dakika `;
        if(data[2]>0)
            text+=`${data[2]} saniye`;
        document.querySelector("#timer-time-remaining span").textContent=text;
    }

    function setTimer(value){
        let time_data = [];
        time_data.push(parseInt(value/3600));
        value %= 3600;
        time_data.push(parseInt(value/60));
        value %= 60;
        time_data.push(value);
        return time_data;
    }

    function timeOut(){
        document.querySelector("#timer-time-remaining span").textContent="Süre Bitti";
        document.getElementById("question-options").style.pointerEvents="none";
        isFinished=true;
    }

    function timeStripAnimation(time,px){
        time/=px;
        let wdth=0;
        let temp_interval = setInterval(function(){
            document.getElementById("time-strip").style.width=++wdth+"px";
            if(wdth==px)
                clearInterval(temp_interval);
        },time*1000);
    }

    function printStatistics(){
        let temp = [0,0,0];
        for(let i of quiz.question_list){
            if(i.answer==i.selected)
                temp[0]++
            else if(i.selected=="")
                temp[2]++
            else
                temp[1]++
        }
        document.querySelector("#data-correct span").textContent=temp[0];
        document.querySelector("#data-incorrect span").textContent=temp[1];
        document.querySelector("#data-empty span").textContent=temp[2];
    }

    function randomInt(a,b){
        return parseInt(Math.random()*(b-a+1)+a);
    }
});