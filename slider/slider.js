"use strict"
document.addEventListener("DOMContentLoaded", function() {
    const sup_photo1 = document.getElementById("sup-photo");
    const sup_photo2 = document.getElementById("sup-photo2");
    const left_button = document.querySelector(".b-left");
    const right_button = document.querySelector(".b-right");
    let sub_photo_line = document.getElementById("main-slide-sub");
    const photo_list = [
        {"name":"bir",
        "fileName":"bir.jpg"},
        {"name":"iki",
        "fileName":"iki.png"},
        {"name":"uc",
        "fileName":"uc.png"},
        {"name":"dort",
        "fileName":"dort.jpg"},
        {"name":"bes",
        "fileName":"bes.jpg"},
        {"name":"alti",
        "fileName":"alti.png"},
        {"name":"yedi",
        "fileName":"alti.png"},
        {"name":"sekiz",
        "fileName":"alti.png"}
    ];
    let photo_list_count=0;
    let lr=true;
    let timer = setInterval(_timer,1000);
    let timer_count=0;
    let subCount=0;

    function _timer(){
        timer_count++;
        if(timer_count==5){
            right_button.click();
        }
    }

    subPhotoLine();

    sup_photo1.setAttribute("src",`image/${photo_list[0].fileName}`);
    sup_photo2.setAttribute("src",`image/${photo_list[0].fileName}`);

    right_button.addEventListener("click",clickButton);
    left_button.addEventListener("click",clickButton);

    function clickButton(btn){
        timer_count=0;
        if(btn.target.classList.contains("b-left")){
            if(photo_list_count==0)
                photo_list_count=photo_list.length;           
            if(!lr){
                lr=!lr;
                opacityAnimation();
                sup_photo1.setAttribute("src",`image/${photo_list[--photo_list_count].fileName}`);
                sup_photo1.style.opacity=1.0;
                sup_photo1.style.zIndex=0;


            }
            else{
                lr=!lr;
                opacityAnimation();
                sup_photo2.setAttribute("src",`image/${photo_list[--photo_list_count].fileName}`);
                sup_photo2.style.opacity=1.0;
                sup_photo2.style.zIndex=0;
            }
            subCount=photo_list_count;
        }
        else{
            if(photo_list_count==photo_list.length-1)
                photo_list_count=-1;

                if(!lr){
                    lr=!lr;
                    opacityAnimation();
                    sup_photo1.setAttribute("src",`image/${photo_list[++photo_list_count].fileName}`);
                    sup_photo1.style.opacity=1.0;
                    sup_photo1.style.zIndex=0;

                }
                else{
                    lr=!lr;
                    opacityAnimation();
                    sup_photo2.setAttribute("src",`image/${photo_list[++photo_list_count].fileName}`);
                    sup_photo2.style.opacity=1.0;
                    sup_photo2.style.zIndex=0;

                }
                subCount=photo_list_count;
        }
        subPhotoLine();

    }

    function clickSubPhoto(photo){
        for(let i in photo_list){
            if(photo_list[i].name==photo.target.id){
                photo_list_count=i-1;
                right_button.click();
            }
        } 
    }

    function opacityAnimation(){
        if(!lr){
            sup_photo1.style.zIndex=1;
            sup_photo1.style.opacity=0.0;
        }
        else{
            sup_photo2.style.zIndex=1;
            sup_photo2.style.opacity=0.0;
        }
    }


    function subPhotoLine(count=4){
        let subl_button=document.querySelector(".sb-left");
        let subr_button=document.querySelector(".sb-right");

        subPhotoLineReset();
        
        if(count>4 || photo_list.length>5){
            subl_button.style.display="flex";
            subr_button.style.display="flex";
            subl_button.addEventListener("click",clickSubl);
            subr_button.addEventListener("click",clickSubr);
            
            subPhotoLinePrint();

            function clickSubl(){
                subPhotoLineReset();
                --subCount;
                if(subCount==-1)
                    subCount=photo_list.length-1;
                subPhotoLinePrint();
                subl_button.style.display="flex";
                subr_button.style.display="flex";
                subl_button.addEventListener("click",clickSubl);
                subr_button.addEventListener("click",clickSubr);
            }

            function clickSubr(){
                subPhotoLineReset();
                ++subCount;
                if(subCount==photo_list.length)
                    subCount=0;
                subPhotoLinePrint();
                subl_button.style.display="flex";
                subr_button.style.display="flex";
                subl_button.addEventListener("click",clickSubl);
                subr_button.addEventListener("click",clickSubr);
            }
        }
        else{
            for(let i=0; i<=count; i++){
                if(i==photo_list_count)
                    continue;
                let x = `<img src="image/${photo_list[i].fileName}" id="${photo_list[i].name}" alt="">`
                sub_photo_line.insertAdjacentHTML("beforeend",x);
            }
            subl_button.style.display="none";
            subr_button.style.display="none";
            sub_photo_line = document.getElementById("main-slide-sub");
            for(let i of sub_photo_line.children){
                i.addEventListener("click",clickSubPhoto);
            } 
        }

        function subPhotoLinePrint(){
            let max = subCount+4;
            let min = subCount+1;
            for(let i = min; i<=max; i++){
                if(i==photo_list.length){
                    max=max-i;
                    i=0;
                }
                let x = `<img src="image/${photo_list[i].fileName}" id="${photo_list[i].name}" alt="">`
                sub_photo_line.insertAdjacentHTML("beforeend",x);
            }
            sub_photo_line = document.getElementById("main-slide-sub");
            
            for(let i of sub_photo_line.children){
                i.addEventListener("click",clickSubPhoto);
            } 
        }

        function subPhotoLineReset(){
            sub_photo_line.innerHTML="";
            sub_photo_line.innerHTML=`<div class="slide-sub-button-line clearfix">
            <div class="slide-sub-button sb-left"><</div>
            <div class="slide-sub-button sb-right">></div>
            </div>`;
            subl_button=document.querySelector(".sb-left");
            subr_button=document.querySelector(".sb-right");
        }
    }
});
