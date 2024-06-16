const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startcamera = document.getElementById('start');
const captureButton = document.getElementById('boton1');
const context = canvas.getContext('2d');
const limpiarButton=document.getElementById('clean');


startcamera.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
            stream = mediaStream
            video.srcObject = stream;
            video.style.display = 'block';
            startcamera.style.display = 'none';
            captureButton.style.display = 'block';
        })
        .catch((err) => {
            console.error("Error al acceder a la cámara: ", err);
        });
});

captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');  // Convertir el contenido del canvas a una URL de datos

    fetch('/capturar-imagen/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
        },
        body: JSON.stringify({ image: dataURL })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

limpiarButton.addEventListener('click', () => {
    // Detener el flujo de la cámara
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    video.style.display = 'none';
    startcamera.style.display = 'block';
    captureButton.style.display = 'none';
});


