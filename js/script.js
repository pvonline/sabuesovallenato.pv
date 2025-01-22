
/* ------ Inicio Reloj Digital ------*/

const $tiempo = document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');

function digitalClock(){
    let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    diaSemana = f.getDay();

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2)

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    let showSemana = (semana[diaSemana]);
    $fecha.innerHTML = `${showSemana}  ${dia}-${mes}-${anio}`
}
setInterval(() => {
    digitalClock()
}, 1000);
/* ------ Final Reloj Digital -------*/


/*----- inicio Reproductor webSim.AI -------*/

document.addEventListener('DOMContentLoaded', async () => {
    const audio = document.getElementById('audioElement');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    let isPlaying = false;

    audio.src = 'https://stream.zeno.fm/v5ecixm4fvduv';
    audio.preload = 'auto';
    audio.crossOrigin = "anonymous";
    audio.autoplay = true;

    async function forcePlay() {
        try {
            audio.volume = 0.7;
            audio.load();
            await Promise.any([audio.play(), new Promise(resolve => setTimeout(() => resolve(audio.play()), 100)), new Promise(resolve => setTimeout(() => resolve(audio.play()), 500))]);
            isPlaying = true;
            playButton.classList.add('playing');
            console.log("Autoplay started successfully");
        } catch (error) {
            console.log("Autoplay attempt failed:", error);
            const retryPlayback = async () => {
                try {
                    await audio.play();
                    isPlaying = true;
                    playButton.classList.add('playing');
                } catch (err) {
                    console.error("Retry playback failed:", err);
                    setTimeout(forcePlay, 500);
                }
            };
            document.addEventListener('click', retryPlayback, {
                once: true
            });
            document.addEventListener('touchstart', retryPlayback, {
                once: true
            });
            document.addEventListener('keydown', retryPlayback, {
                once: true
            });
            setTimeout(forcePlay, 100);
        }
    }

    await forcePlay();

    function initAudio() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        forcePlay();
    }
    initAudio();

    audio.addEventListener('error', e => {
        console.error('Audio error:', e);
        setTimeout(() => {
            audio.load(); 
            forcePlay();
        }, 1000);
    });

    playButton.addEventListener('click', forcePlay);
    pauseButton.addEventListener('click', () => {
        audio.pause();
        isPlaying = false;
        playButton.classList.remove('playing');
    });

    volumeSlider.addEventListener('input', e => {
        const value = e.target.value;
        audio.volume = value / 100;
        volumeValue.textContent = value;
        volumeSlider.style.background = `linear-gradient(to right, var(--primary-color) ${value}%, rgba(255,255,255,0.1) ${value}%)`;
    });

    audio.volume = 0.7;
    volumeSlider.value = 70;
    volumeValue.textContent = "70";
});

/*----- final Reproductor webSim.AI -------*/





