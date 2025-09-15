
const playButton = document.getElementById('play-button');
const video = document.getElementById('video-source');
const asciiOutput = document.getElementById('ascii-output');


const canvas = document.createElement('canvas');
const context = canvas.getContext('2d', { willReadFrequently: true });



const ASCII_CHARS = "`.i";

let isPlaying = false;


playButton.addEventListener('click', () => {
    if (isPlaying) {
        video.pause();
        playButton.textContent = 'Play Video';
    } else {
        
        video.muted = true; 
        video.play();
        playButton.textContent = 'Pause';
        
        renderFrame();
    }
    isPlaying = !isPlaying;
});

function renderFrame() {
    
    if (video.paused || video.ended) {
        return;
    }

    
    const MAX_WIDTH = 200;
    
    
    const aspectRatio = video.videoHeight / video.videoWidth;
    const width = MAX_WIDTH;
    
    const height = (MAX_WIDTH * aspectRatio) * 0.5;

    canvas.width = width;
    canvas.height = height;

    
    context.drawImage(video, 0, 0, width, height);
    
    
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let asciiString = '';

    
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        
        const brightness = (r + g + b) / 3;

        
        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
        const asciiChar = ASCII_CHARS[ASCII_CHARS.length - 1 - charIndex];
        
        asciiString += asciiChar;

        
        if ((i / 4 + 1) % width === 0) {
            asciiString += '\n';
        }
    }

    
    asciiOutput.textContent = asciiString;

    
    requestAnimationFrame(renderFrame);
}
