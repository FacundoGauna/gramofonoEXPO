const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
const enableSoundButton = document.getElementById("enableSound");

let isPlaying = false;
let isDragging = false;
let rotation = null;
let audioUnlocked = false;

// Crea un AudioContext para desbloquear el sonido en móviles
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const musicSource = audioContext.createMediaElementSource(music);
musicSource.connect(audioContext.destination);

// Botón para desbloquear el audio
enableSoundButton.addEventListener("click", function () {
    console.log("Botón de activación presionado");

    audioContext.resume().then(() => {
        console.log("AudioContext reanudado");

        music.play().then(() => {
            console.log("Audio desbloqueado correctamente");
            music.pause();
            music.currentTime = 0;
            audioUnlocked = true;

            // Retrasar la eliminación del botón para asegurar que el desbloqueo funciona
            setTimeout(() => {
                enableSoundButton.style.display = "none"; // Ocultar el botón en vez de eliminarlo
            }, 100);
        }).catch(error => console.log("Error desbloqueando audio:", error));
    }).catch(error => console.log("Error reanudando AudioContext:", error));
});

// Ajustar el punto de rotación de la aguja
needle.style.transformOrigin = "top center";

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
}

// Función para mover la aguja (solo hacia la izquierda)
function moveNeedle(e) {
    if (!isDragging || !audioUnlocked) return;

    // Detectar si es touch o mouse y obtener posición X
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Obtener el centro de la pantalla
    let centerX = window.innerWidth / 2;

    // Calcular ángulo basado en la posición del dedo o ratón
    let angle = ((centerX - clientX) / centerX) * 2000; 
    angle = Math.max(30, Math.min(65, angle)); // Limitar entre 30° y 65° (solo a la izquierda)

    // Aplicar la rotación sin afectar la posición de la aguja
    needle.style.transform = `rotate(${angle}deg)`;

    // Activar música cuando la aguja está sobre el vinilo
    if (angle >= 45) { 
        if (!isPlaying) {
            isPlaying = true;
            music.play().catch(error => console.log("Error al reproducir:", error));
            rotateDisc();
        }
    } else {
        if (isPlaying) {
            isPlaying = false;
            music.pause();
            cancelAnimationFrame(rotation);
        }
    }
}

// Función para detener el arrastre
function stopDrag(e) {
    e.preventDefault();
    isDragging = false;
}

// Agregar eventos de ratón y táctiles
needle.addEventListener("mousedown", startDrag);
needle.addEventListener("touchstart", startDrag, { passive: false });

document.addEventListener("mousemove", moveNeedle);
document.addEventListener("touchmove", moveNeedle, { passive: false });

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

// Función para girar el disco (sin impulsos)
function rotateDisc() {
    let deg = 0;
    function animate() {
        if (isPlaying) {
            deg += 1; // Incrementar el ángulo de rotación de forma constante
            disc.style.transform = `rotate(${deg}deg)`; // Girar el disco
            rotation = requestAnimationFrame(animate); // Solicitar el siguiente frame para continuar la animación
        }
    }
    animate();
}
