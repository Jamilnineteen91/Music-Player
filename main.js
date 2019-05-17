const app = ()=>{
    const song = document.querySelector('.song');
    const play =document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');

    // Songs
    
    // Length of outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let songDuration = song.duration;
 

    outline.style.strokeDasharray = outlineLength;
    // outline.style.strokeDashoffset=400;

    //Play music
    play.addEventListener('click',() => {
        if (song.paused){
            song.play();
        }else{
            song.pause();
        }
        
    });
    
    song.ontimeupdate = () => {
        let currentTime=song.currentTime;
        // Progress bar
        let progress = outlineLength -currentTime ;
        outline.style.strokeDashoffset=progress;
    }
}



app();