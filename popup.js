const form = document.querySelector('#proctoring-form');
const webcamFeed = document.querySelector('#webcam-feed');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const code = document.querySelector('#code').value;
  
  const data = { name, email, code };
  
  try {
    const response = await fetch('https://your-backend-server.com/proctoring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    
    if (!response.ok) {
      throw new Error(json.message);
    }
    
    // Start webcam and audio check
    const constraints = {
      video: true,
      audio: true,
    };
    
   window.navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        webcamFeed.srcObject = stream;
        
        // Send images to server every 3 minutes (configurable)
        setInterval(() => {
          const image = webcamFeed.captureImage();
          sendImageToServer(image);
        }, 3 * 60 * 1000);
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
});

function sendImageToServer(image) {
  fetch('https://your-backend-server.com/proctoring/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send image to server');
      }
    })
    .catch(error => {
      console.error(error);
    });
}


// Request access to the camera and microphone
window.navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    // Display the camera stream on a video element
    const videoElement = document.getElementById('webcam-feed');
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = (e) => {
      videoElement.play();
  };
    
    // Create a canvas element to capture an image
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    
    // Function to capture an image and send it to the server
      const sendImage = () => {
      context.drawImage(videoElement, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Send the image to the server
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://example.com/save-image');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(`image=${encodeURIComponent(imageData)}`);
    };
    
    // Schedule the image proctoring
    setInterval(sendImage, 3000);
  })
  .catch(error => {
    alert('cach')
    console.error(error);
  });
