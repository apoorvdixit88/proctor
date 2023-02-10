const form = document.querySelector("#proctoring-form");
const webcamFeed = document.querySelector("#webcam-feed");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  alert("Proctoring Started!");

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const code = document.querySelector("#code").value;

  // sending form data
  const data = { name, email, code };
  // console.log(data);
  try {
    const response = await fetch("http://localhost:3001/api/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    localStorage.setItem("user_proctorid", json._id);
  } catch (error) {
    console.log(error);
  }
});

function sendImageToServer(image, id) {
  fetch("http://localhost:3001/api/userimage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
      id,
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

// Request access to the camera and microphone
window.navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    // Display the camera stream on a video element
    const videoElement = document.getElementById("webcam-feed");
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = (e) => {
      videoElement.play();

      const canvas = document.getElementById("canvas");
      setInterval(function () {
        canvas
          .getContext("2d")
          .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL();

        // data url of the image
        const id = localStorage.getItem("user_proctorid");
        console.log(id);
        if (id) sendImageToServer(image_data_url, id);
      }, 5000);
    };
  })
  .catch((error) => {
    alert("cach");
    console.error(error);
  });
