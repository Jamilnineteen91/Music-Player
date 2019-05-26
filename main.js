const app = ()=>{
    let song,play,outline,coverArt,volumeCtrl,outlineLength,playBtn,stopBtn,chevArrows,trackContainer;
    song = document.querySelector('.song');
    play =document.querySelector('.play');
    outline = document.querySelector('.moving-outline circle');
    coverArt = document.querySelector('#cover-art');
    volumeCtrl = document.getElementById('vol-ctrl');
    outlineLength = outline.getTotalLength();
    playBtn=document.getElementById('play');
    stopBtn=document.getElementById('stop');
    chevArrows=document.getElementById('indicator');
    trackContainer=document.querySelector('.track-list-container');

    ///////////////Track-list toggle////////////////////
    chevArrows.addEventListener('click',()=>{
        if (trackContainer.style.visibility=='hidden'){
            trackContainer.style.visibility='visible';
            chevArrows.style.transform="rotate(225deg)"
        }else{
            trackContainer.style.visibility='hidden';
            chevArrows.style.transform="rotate(45deg)"
        }
    });

    // Songs
    
    /////////////////Audio Control//////////////////////
    
    // Buttons
    playBtn.addEventListener('click',()=>{
        if (song.paused){
            song.play();
            coverArt.style.animation='rotation 4s infinite linear';   
        }else{
            song.pause();
            coverArt.style.animationPlayState ='paused';
        }
    });

    stopBtn.addEventListener('click',()=>{
        song.pause();
        song.currentTime=0;
        coverArt.style.animation='none';
    })

    // Volume Control
    volumeCtrl.addEventListener('mousemove',setVolume);
    function setVolume(){
        song.volume=volumeCtrl.value/100;
    };
;
    //Play music
    play.addEventListener('click',() => {
        if (song.paused){
            song.play();
            coverArt.style.animation='rotation 4s infinite linear';
            
        }else{
            song.pause();
            coverArt.style.animationPlayState ='paused';
        } 
    });
    
    /////////////////Seek-bar//////////////////////
    
    // Length of outline
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset= outlineLength;
    
    song.ontimeupdate = () => {
        // Current song time and duration
        let songDuration = parseInt(song.duration);
        let currentTime=song.currentTime;
  
        // Progress bar
        let progress = outlineLength-currentTime*(outlineLength/songDuration);
        outline.style.strokeDashoffset=parseInt(progress);

        // Cover art animation
        if(Math.floor(currentTime)==songDuration){
            coverArt.style.animation='none';
        }
    }
}



app();