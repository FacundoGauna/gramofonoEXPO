const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
const enableSoundButton = document.getElementById("enableSound");

let isPlaying = false;
let isDragging = false;
let rotation = null;
let audioUnlocked = false;
let isDraggingNeedle = false; // Nuevo: para controlar el desplazamiento de la página

// Variables para el desplazamiento de la página
let startY = 0;
let scrollY = 0;

// Crea un AudioContext para desbloquear el sonido en móviles
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const musicSource = audioContext.createMediaElementSource(music);
musicSource.connect(audioContext.destination);

// Función para desbloquear el audio (compatible con móvil y PC)
function unlockAudio() {
    console.log("Botón de activación presionado");

    audioContext.resume().then(() => {
        console.log("AudioContext reanudado");

        music.play().then(() => {
            console.log("Audio desbloqueado correctamente");
            music.pause();
            music.currentTime = 0;
            audioUnlocked = true;

            // Ocultar el botón después de desbloquear el audio
            setTimeout(() => {
                enableSoundButton.style.display = "none"; // Ocultar en vez de eliminar
            }, 100);
        }).catch(error => console.log("Error desbloqueando audio:", error));
    }).catch(error => console.log("Error reanudando AudioContext:", error));
}

// Añadir eventos para compatibilidad con móviles y PC
enableSoundButton.addEventListener("click", unlockAudio);
enableSoundButton.addEventListener("touchstart", unlockAudio, { passive: false });

// Ajustar el punto de rotación de la aguja
needle.style.transformOrigin = "top center";

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    isDraggingNeedle = true; // Bloquea el desplazamiento de la página
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
    isDraggingNeedle = false; // Permite el desplazamiento de la página nuevamente
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

// 🔹 Permitir desplazamiento en móviles y PC solo si NO se toca la aguja
document.addEventListener("touchstart", (e) => {
    if (!isDraggingNeedle) {
        startY = e.touches[0].clientY;
        scrollY = window.scrollY;
    }
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    if (!isDraggingNeedle) {
        let deltaY = e.touches[0].clientY - startY;
        window.scrollTo(0, scrollY - deltaY);
    }
}, { passive: false });

// Para el scroll en ordenador (mouse)
document.addEventListener("mousedown", (e) => {
    if (!isDraggingNeedle && e.button === 0) {
        startY = e.clientY;
        scrollY = window.scrollY;
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isDraggingNeedle && e.buttons === 1) {
        let deltaY = e.clientY - startY;
        window.scrollTo(0, scrollY - deltaY);
    }
});
