const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");

let isPlaying = false; // Empieza en false para evitar problemas en móviles.
let isDragging = false;
let rotation = null;

// Desbloquear reproducción en móviles
document.addEventListener("touchstart", () => {
    music.play();
    setTimeout(() => {
        music.pause();
        music.currentTime = 0;
    }, 500);

    // Eliminar el listener después de la primera interacción
    document.removeEventListener("touchstart", arguments.callee);
}, { passive: true });

// Ajustar el punto de rotación de la aguja
needle.style.transformOrigin = "top center";

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
}

// Función para mover la aguja (solo hacia la izquierda)
function moveNeedle(e) {
    if (!isDragging) return;

    // Detectar si es touch o mouse y obtener posición X
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Obtener el centro de la pantalla
    let centerX = window.innerWidth / 2;

    // Calcular ángulo basado en la posición del dedo o ratón
    let angle = ((centerX - clientX) / centerX) * 2000; 
    angle = Math.max(30, Math.min(65, angle)); // Limitar entre 0° y 30° (solo a la izquierda)

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
