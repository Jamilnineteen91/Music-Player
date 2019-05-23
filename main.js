const app = ()=>{
    const song = document.querySelector('.song');
    const play =document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const coverArt = document.querySelector('#cover-art');
    const volumeCtrl = document.getElementById('vol-ctrl');
    const outlineLength = outline.getTotalLength();
    const playBtn=document.getElementById('play');
    const stopBtn=document.getElementById('stop');
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