// Configuration JSON
const config = [
    {
        imageUrl: "assets/evet.jpg",
        soundUrl: "assets/evet.mp3"
    },
    {
        imageUrl: "assets/hayir.jpg",
        soundUrl: "assets/hayir.mp3"
    },
    {
        imageUrl: "assets/hoscakal.jpg",
        soundUrl: "assets/hoscakal.mp3"
    },
    {
        imageUrl: "assets/karga-mi-o.jpeg",
        soundUrl: "assets/karga-mi-o.mp3"
    },
    {
        imageUrl: "assets/sen-deli-misin.jpg",
        soundUrl: "assets/sen-deli-misin.mp3"
    }
];

// Duration to display each image in milliseconds
const displayDuration = 15000;

const slideshow = document.getElementById('slideshow');
const slide = document.getElementById('slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playPauseBtn = document.getElementById('playPause');

let audio = null;
let currentIndex = 0;
let isPlaying = false; // Initially paused to avoid autoplay issues
let timeoutId = null;

function showSlide(index) {
    const { imageUrl, soundUrl } = config[index];

    // Set the background image
    slide.style.backgroundImage = `url(${imageUrl})`;

    // Stop and replace the previous sound
    if (audio) {
        pauseAudio()
        audio.remove();
    }
    audio = new Audio(soundUrl);
    audio.loop = true;

    // Play audio if the slideshow is playing
    if (isPlaying) {
        playAudio()
    }

    currentIndex = index;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % config.length;
    showSlide(currentIndex);
    restartSlideshow();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + config.length) % config.length;
    showSlide(currentIndex);
    restartSlideshow();
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? "Pause" : "Play";

    if (isPlaying) {
        restartSlideshow();
        playAudio()
    } else {
        clearTimeout(timeoutId);
        pauseAudio();
    }
}

function playAudio() {
    if (!audio) return;
    audio.play().catch(err => {
        console.warn('Audio playback failed:', err);
    });
}

function pauseAudio() {
    if (!audio) return;
    audio.pause();
}

function restartSlideshow() {
    clearTimeout(timeoutId);
    if (isPlaying) {
        timeoutId = setTimeout(nextSlide, displayDuration);
    }
}

// Button event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', togglePlayPause);

// Add play/pause toggle on slide click
slide.addEventListener('click', togglePlayPause);

// Start the slideshow after the first interaction
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        playPauseBtn.textContent = "Pause";
        showSlide(0); // Start the slideshow
        timeoutId = setTimeout(nextSlide, displayDuration);
    }
}, { once: true });

if (config.length > 0) {
    showSlide(0)
}
