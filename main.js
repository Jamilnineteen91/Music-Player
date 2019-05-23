const app = ()=>{
    const song = document.querySelector('.song');
    const play =document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const coverArt = document.querySelector('#cover-art');
    const volumeCtrl = document.getElementById('vol-ctrl');

    // Songs
    
    // Length of outline
    const outlineLength = outline.getTotalLength();
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset= outlineLength;

    // Volume Control
    volumeCtrl.addEventListener('mousemove',setVolume);
    function setVolume(){
        console.log(song.volume);
        console.log(volumeCtrl.value/100);
        song.volume=volumeCtrl.value/100;
        console.log(song.volume);
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