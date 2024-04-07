class Music{
    constructor(name,album,singer,src,image){
        this.name = name;
        this.album = album;
        this.singer = singer;
        this.src = src;
        this.image = image;
    }
}

class Player{
    constructor(list=[]){
        this.index = 0;
        this.musicList = list;
    }

    getPlayingMusic(){
        return this.musicList[this.index];
    }

    next(loopCheck,shuffleCheck){
        if(shuffleCheck){
            let temp;
            do{
             temp = this.randInt(this.musicList.length-1);
            }
            while(temp == this.index);
            this.index = temp;
        }
        else{
            if(loopCheck==1 && this.index==this.musicList.length-1){
                this.index=0;    
            }
            else if(loopCheck==2){
            }
            else if(loopCheck==0 && this.index==this.musicList.length-1){
            }
            else{
                this.index++;
            }
        }
    }

    previous(loopCheck,shuffleCheck){
        if(shuffleCheck){
            let temp;
            do{
             temp = this.randInt(this.musicList.length-1);
            }
            while(temp == this.index);
            this.index = temp;
        }
        else{
            if(loopCheck==1 && this.index==0){
                this.index=this.musicList.length-1;    
            }
            else if(loopCheck==2){
            }
            else if(loopCheck==0 && this.index==0){
            }
            else{
                this.index--;
            }
        }
    }

    randInt(max){
        return parseInt(Math.random()*(max+1));
    }
}

let musicListData = [
    new Music("Arms of the Ocean","We'd Rather Burn EP","Blackbriar","music/Blackbriar - Arms of the Ocean (Official Audio).mp3","music/arms_of_the_ocean_blackbriar.jpeg"), 
    new Music("Red Lipstick Murders","Red Lipstick Murders","Seven Day Sleep","music/Seven Day Sleep - Red Lipstick Murders.mp3","music/red_lipstick_murders.jpeg"),
    new Music("Y.O.K.","Y.O.K.","Çilekeş","music/Çilekeş - Y.O.K.mp3","music/yok.jpeg"),
    new Music("Binlerce Özür","Obi","Kafabindünya","music/Binlerce Ozur.mp3","music/binlerce_ozur.jpeg"),
    new Music("Puppe","Rammstein","Rammstein","music/Rammstein - Puppe (Official Lyric Video).mp3","music/puppe.jpeg"),
    new Music("Wicked Game","Greatest Love Songs Vol. 666","HIM","music/Wicked Game.mp3","music/wicked_game_him.jpeg")
    ];

const player = new Player(musicListData);

document.addEventListener("DOMContentLoaded",function(){
    const audio = document.querySelector("#audio-player");
    const play_btn = document.querySelector("#play-btn img");
    const slider = document.querySelector("#range input");
    const volume_icon = document.querySelector("#volume img");
    const volume_input = document.querySelector("#volume input");
    let volume_value = 100;
    let loopCheck=0;
    let shuffleCheck=false;
    const loop_btn = document.querySelector("#loop-btn img");
    const shuffle_btn = document.querySelector("#shuffle-btn img");
    let isListedTracks=false;
    let list_ul = document.querySelector("#list ul");
    let list_element = document.querySelector("#list");
    let next_btn = document.querySelector("#next-btn img");
    let prev_btn = document.querySelector("#prev-btn img");

    insertMusic();

    audio.addEventListener("loadeddata",(e)=>{
        insertInfo();
        slider.max=parseInt(audio.duration);
        document.querySelector("#duration span").textContent = calculateTime(parseInt(audio.duration));
    });

    audio.addEventListener("ended",()=>{
        if(player.index!=player.musicList.length-1 || loopCheck==1){
            next_btn.click();
            play_btn.click();
        }
        else{
            prev_btn.click();
            play_btn.src="images/play.png";
        }
    });

    audio.addEventListener("timeupdate",()=>{
        slider.value = parseInt(audio.currentTime);
        document.querySelector("#current span").textContent = calculateTime(parseInt(audio.currentTime));
    });

    play_btn.addEventListener("click",(e)=>{
        if(audio.paused){
            audio.play();
            e.target.src="images/pause.png";
        }
        else{
            audio.pause();
            e.target.src="images/play.png";
        }
    });

    prev_btn.addEventListener("click",()=>{
        if(audio.currentTime<7){
            let tmp = audio.paused;
            player.previous(loopCheck,shuffleCheck);
            insertMusic();
            tmp?"":play_btn.click();
            prevDoubleCheck=false;
        }
        else
            audio.currentTime=0;
        if(isListedTracks){
            listTracks();
        }
    });

    next_btn.addEventListener("click",()=>{
        let tmp = audio.paused;
        player.next(loopCheck,shuffleCheck);
        insertMusic();
        tmp?"":play_btn.click();
        if(isListedTracks){
            listTracks();
        }
        
    });

    slider.addEventListener("input",(e)=>{
        audio.currentTime = e.target.value;
    });

    volume_input.addEventListener("input",(e)=>{
        volume_value = e.target.value/100;
        audio.volume = volume_value;
        if(e.target.value==0){
            volume_icon.src="images/mute.png";
        }
        else if(e.target.value<=50){
            volume_icon.src="images/volume-down.png";
        }
        else{
            volume_icon.src="images/volume-up.png";
        }
    });

    volume_icon.addEventListener("click",()=>{
        if(audio.muted){
            if(volume_value==0)
                volume.value++;
            audio.muted=false;
            audio.volume=volume_value;
            volume_input.value=volume_value*100;
            volume_icon.src=`images/${volume_value<=0.5?"volume-down.png":"volume-up.png"}`;
        }
        else{
            volume_value = audio.volume;
            audio.muted=true;
            volume_input.value=0;
            volume_icon.src="images/mute.png";
        }
    });

    loop_btn.addEventListener("click",()=>{
        loopCheck++;
        if(loopCheck == 1){
            loop_btn.style.opacity="1.0";
        } 
        else if(loopCheck == 2){
            loop_btn.style.border="1px solid black";
            loop_btn.style.borderRadius="50%";
        }
        else{
            loop_btn.style.border="none";
            loop_btn.style.opacity="0.5";
            loopCheck=0;
        } 
    });

    shuffle_btn.addEventListener("click",()=>{
        if(!shuffleCheck){
            shuffleCheck = true;
            shuffle_btn.style.opacity="1.0";
        } 
        else{
            shuffleCheck = false;
            shuffle_btn.style.opacity="0.5";
        }
    });

    document.querySelector("#list-btn img").addEventListener("click",()=>{
        if(isListedTracks){
            list_ul.innerHTML="";
            isListedTracks=false;
            list_element.style.opacity="0";
        }
        else{
            listTracks();
            isListedTracks=true;
            list_element.style.opacity="1";
        }
        
    });

    function insertMusic(){
        audio.src = player.getPlayingMusic().src;
    }

    function insertInfo(){
        let music = player.getPlayingMusic();
        document.querySelector("#music-name span").textContent=music.name;
        document.querySelector("#album-name span").textContent=music.album;
        document.querySelector("#singer-name span").textContent=music.singer;
        document.querySelector("#image img").src=music.image;
    }

    function calculateTime(time){
        let min = parseInt(time/60);
        time = time%60;
        return min+`:${time<10?"0":""}`+time;
    }

    function listTracks(){
        list_ul.innerHTML="";
        for(let i in player.musicList){
            let text = `
                <li id="li-${i}" lino="${i}" style="${player.getPlayingMusic()==player.musicList[i]?"background-color:black;color:white;":""}">
                    <audio src=""></audio>                    
                    <div class="list-element">
                        <div class="left-container">
                            <div class="left"><span>${player.musicList[i].name}</span></div>
                            <div class="middle"><span>${player.musicList[i].singer}</span></div>   
                        </div>
                        <div class="right" style="${player.getPlayingMusic()==player.musicList[i]?"border-color:white":""}"><span></span></div>
                    </div>
                </li>
            ` 
            list_ul.insertAdjacentHTML("beforeend",text);
            let audio = document.querySelector(`#li-${i} audio`);
            audio.src=player.musicList[i].src;
            audio.addEventListener("loadeddata",function(){
                document.querySelector(`#li-${i} .right span`).textContent = calculateTime(parseInt(document.querySelector(`#li-${i} audio`).duration));
                document.querySelector(`#li-${i}`).addEventListener("click",()=>{
                    player.index=document.querySelector(`#li-${i}`).getAttribute("lino");
                    insertMusic();
                    play_btn.click();
                    listTracks();
                });  
            });
        }
    }
});