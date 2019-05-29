const app = ()=>{
    let outline,coverArt,volumeCtrl,outlineLength,playBtn,stopBtn,nextBtn,prevBtn,chevArrows,trackContainer,curSong,playIcon;
    curSong = document.querySelector('.cur-song');
    outline = document.querySelector('.moving-outline circle');
    coverArt = document.querySelector('#cover-art');
    volumeCtrl = document.getElementById('vol-ctrl');
    outlineLength = outline.getTotalLength();
    playBtn=document.getElementById('play');
    stopBtn=document.getElementById('stop');
    nextBtn=document.getElementById('next');
    prevBtn=document.getElementById('prev');
    chevArrows=document.getElementById('indicator');
    trackContainer=document.querySelector('.track-list-container');
    playIcon=document.querySelectorAll('i')[1];
    
    /////////////////Default Settings////////////////////
    let tracks=document.querySelectorAll('.song');
    curSong.src=tracks[0].src;
    coverArt.src=tracks[0].parentElement.parentElement.querySelector('img').src;
    coverArt.style.animation='none';
    
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

    coverArt.addEventListener('click',()=>{
        if (curSong.paused){
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear'; 
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');  
        }else{
            curSong.pause();
            coverArt.style.animationPlayState ='paused';
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        };
    })
    
    trackContainer.addEventListener('dblclick',function(e){
        const x = e.target.tagName;
        curSong.currentTime=0;
        coverArt.style.animation='none';
        if (x=='H6'|| x=='P'){
            const track=e.target.parentNode.querySelector('source');
            curSong.src=track.src;
            coverArt.src=track.parentElement.parentElement.querySelector('img').src;
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear';
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }else{
            //pass
        }
    })
    
    /////////////////Audio Control//////////////////////
    
    // Play button
    playBtn.addEventListener('click',()=>{
        if (curSong.paused){
            curSong.play();
            coverArt.style.animation='rotation 4s infinite linear';
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');   
        }else{
            curSong.pause();
            coverArt.style.animationPlayState ='paused';
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        };
    });

    // Stop button
    stopBtn.addEventListener('click',()=>{
        curSong.pause();
        curSong.currentTime=0;
        coverArt.style.animation='none';
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    })

    // Next button
    nextBtn.addEventListener('click',()=>{
        var i=0;
        let found=false;
        while (found!=true && i<tracks.length-1){
            if(tracks[i].src==curSong.src){
                curSong.src=tracks[i+1].src;
                coverArt.src=tracks[i+1].parentElement.parentElement.querySelector('img').src;
                curSong.play();
                coverArt.style.animation='rotation 4s infinite linear';
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                found=true;
                i=0;
            }else{
                //pass
            }
            i++;
        }
    });

    // Prev button
    prevBtn.addEventListener('click',()=>{
        var i=1;
        let found=false;
        while (found!=true && i<=tracks.length-1){
            if(tracks[i].src==curSong.src){
                curSong.src=tracks[i-1].src;
                coverArt.src=tracks[i-1].parentElement.parentElement.querySelector('img').src;
                curSong.play();
                coverArt.style.animation='rotation 4s infinite linear';
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                found=true;
                i=1;
            }else{
                //pass
            }
            i++;
        }
    });

    // Volume Control
    volumeCtrl.addEventListener('mousemove',setVolume);
    function setVolume(){
        curSong.volume=volumeCtrl.value/100;
    };

    
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

    // let buffer=document.querySelector('.track-outline');
    // function svgClick (e){
    //     console.log(e);
    //     let percent = e.offsetX/this.offsetWidth;
    //     currentTime=percent*songDuration;
    //     console.log(percent);
    //     console.log(currentTime)
    // };
}



app();