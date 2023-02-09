let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

async function a() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
}
a();

function sendImageToServer(image) {
  fetch("http://localhost:3001/api/userdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send image to server");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

setInterval(function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL();

  // data url of the image
  sendImageToServer(image_data_url);
}, 5000);
