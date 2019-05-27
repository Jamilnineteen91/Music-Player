const app = ()=>{
    let song,outline,coverArt,volumeCtrl,outlineLength,playBtn,stopBtn,chevArrows,trackContainer,curSong;
    curSong = document.querySelector('.cur-song');
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
    let tracks=document.querySelectorAll('.song');
    console.log(tracks)
    console.log(tracks[0].parentElement.parentElement.querySelector('img').src);
    curSong.src=tracks[0].src;
    coverArt.src=tracks[0].parentElement.parentElement.querySelector('img').src;


  
    let trackList=document.querySelector('.track-info');
    
    document.addEventListener('click',function(e){
        const x = e.target.tagName;
        curSong.currentTime=0;
        coverArt.style.animation='none';
        if (x=='H6'||x=='P'){
            const track=e.target.parentNode.querySelector('source');
            curSong.src=track.src;
            coverArt.src=track.parentElement.parentElement.querySelector('img').src;
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear';
        }
    })

    
    /////////////////Audio Control//////////////////////
    
    // Buttons
    playBtn.addEventListener('click',()=>{
        if (curSong.paused){
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear';   
        }else{
            curSong.pause();
            coverArt.style.animationPlayState ='paused';
        }
    });

    stopBtn.addEventListener('click',()=>{
        curSong.pause();
        curSong.currentTime=0;
        coverArt.style.animation='none';
    })

    // Volume Control
    volumeCtrl.addEventListener('mousemove',setVolume);
    function setVolume(){
        curSong.volume=volumeCtrl.value/100;
    };
;
    //Play music

    coverArt.addEventListener('click',() => {
        if (curSong.paused){
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear';
        }else{
            curSong.pause();
            coverArt.style.animationPlayState ='paused';
        } 
    });
    
    /////////////////Seek-bar//////////////////////
    
    // Length of outline
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset= outlineLength;
    
    curSong.ontimeupdate = () => {
        // Current song time and duration
        let songDuration = parseInt(curSong.duration);
        let currentTime=curSong.currentTime;
  
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