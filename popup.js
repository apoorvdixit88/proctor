const form = document.querySelector("#proctoring-form");
const webcamFeed = document.querySelector("#webcam-feed");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const code = document.querySelector("#code").value;

  const data = { name, email, code };
  console.log(data);
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

    //   Start webcam and audio check
    //   const constraints = {
    //     video: true,
    //     audio: true,
    //   };

    //  window.navigator.mediaDevices.getUserMedia(constraints)
    //     .then(stream => {
    //       webcamFeed.srcObject = stream;

    //       // Send images to server every 3 minutes (configurable)
    //       setInterval(() => {
    //         const image = webcamFeed.captureImage();
    //         sendImageToServer(image);
    //       }, 3 * 60 * 1000);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
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

      // Create a canvas element to capture an image

      // canvas.width = 100;
      // canvas.height = 100;
      // canvas.width = videoElement.videoWidth;
      // canvas.height = videoElement.videoHeight;
      // console.log(canvas.width,'wid',videoElement.videoHeight);
      // const context = canvas.getContext('2d');
      // console.log('canvas',canvas);

      // Function to capture an image and send it to the server
      // const sendImage = () => {
      // context.drawImage(videoElement, 0, 0, 100, 100);
      // const imageData = canvas.toDataURL();
      // console.log("img", imageData);
      // Send the image to the server,
      // yaha pe local host pe send kara lete, waha se S3 pe bhej skte phir
      // console.log("img", imageData);
      // const xhr = new XMLHttpRequest();
      // xhr.open('POST', 'http://localhost:3001/api/userdata');
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // xhr.send(`image=${encodeURIComponent(imageData)}`);
      // sendImageToServer(imageData);
      // };

      // Schedule the image proctoring
      // sendImage();
      // setInterval(sendImage, 3000);
      // })
    };
  })
  .catch((error) => {
    alert("cach");
    console.error(error);
  });

// function dataURItoBlob(dataURI) {
//   // convert base64/URLEncoded data component to raw binary data held in a string
//   var byteString;
//   if (dataURI.split(",")[0].indexOf("base64") >= 0)
//     byteString = atob(dataURI.split(",")[1]);
//   else byteString = unescape(dataURI.split(",")[1]);
//   // separate out the mime component
//   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//   // write the bytes of the string to a typed array
//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ia], { type: mimeString });
// }

// // bhalooka bucket
// //bhaloo ka mast code
// function dataURItoBlob(dataURI) {
//   var binary = atob(dataURI.split(",")[1]);
//   var array = [];
//   for (var i = 0; i < binary.length; i++) {
//     array.push(binary.charCodeAt(i));
//   }
//   return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
// }
// var albumBucketName = "photosbucket";
// var bucketRegion = "ap-south-1";
// var IdentityPoolId = "ap-south-1:c96da9ee-d9d7-4072-98a1-a9b86e84d135";

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId,
//   }),
// });

// var s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
//   params: { Bucket: albumBucketName },
// });
// // snippet-end:[s3.JavaScript.photoAlbumExample.config]

// // snippet-start:[s3.JavaScript.photoAlbumExample.listAlbums]
// function listAlbums() {
//   s3.listObjects({ Delimiter: "/" }, function (err, data) {
//     if (err) {
//       return alert("There was an error listing your albums: " + err.message);
//     } else {
//       var albums = data.CommonPrefixes.map(function (commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace("/", ""));
//         return getHtml([
//           "<li>",
//           "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
//           "<span onclick=\"viewAlbum('" + albumName + "')\">",
//           albumName,
//           "</span>",
//           "</li>",
//         ]);
//       });
//       var message = albums.length
//         ? getHtml([
//             "<p>Click on an album name to view it.</p>",
//             "<p>Click on the X to delete the album.</p>",
//           ])
//         : "<p>You do not have any albums. Please Create album.";
//       var htmlTemplate = [
//         "<h2>Albums</h2>",
//         message,
//         "<ul>",
//         getHtml(albums),
//         "</ul>",
//         "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
//         "Create New Album",
//         "</button>",
//       ];
//       document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//     }
//   });
// }
// // snippet-end:[s3.JavaScript.photoAlbumExample.listAlbums]

// // snippet-start:[s3.JavaScript.photoAlbumExample.createAlbum]
// function createAlbum(albumName) {
//   albumName = albumName.trim();
//   if (!albumName) {
//     return alert("Album names must contain at least one non-space character.");
//   }
//   if (albumName.indexOf("/") !== -1) {
//     return alert("Album names cannot contain slashes.");
//   }
//   var albumKey = encodeURIComponent(albumName);
//   s3.headObject({ Key: albumKey }, function (err, data) {
//     if (!err) {
//       return alert("Album already exists.");
//     }
//     if (err.code !== "NotFound") {
//       return alert("There was an error creating your album: " + err.message);
//     }
//     s3.putObject({ Key: albumKey }, function (err, data) {
//       if (err) {
//         return alert("There was an error creating your album: " + err.message);
//       }
//       alert("Successfully created album.");
//       viewAlbum(albumName);
//     });
//   });
// }
// // snippet-end:[s3.JavaScript.photoAlbumExample.createAlbum]

// // snippet-start:[s3.JavaScript.photoAlbumExample.viewAlbum]
// function viewAlbum(albumName) {
//   var albumPhotosKey = encodeURIComponent(albumName) + "/";
//   s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
//     if (err) {
//       return alert("There was an error viewing your album: " + err.message);
//     }
//     // 'this' references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     var bucketUrl = href + albumBucketName + "/";

//     var photos = data.Contents.map(function (photo) {
//       var photoKey = photo.Key;
//       var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//       return getHtml([
//         "<span>",
//         "<div>",
//         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//         "</div>",
//         "<div>",
//         "<span onclick=\"deletePhoto('" +
//           albumName +
//           "','" +
//           photoKey +
//           "')\">",
//         "X",
//         "</span>",
//         "<span>",
//         photoKey.replace(albumPhotosKey, ""),
//         "</span>",
//         "</div>",
//         "</span>",
//       ]);
//     });
//     var message = photos.length
//       ? "<p>Click on the X to delete the photo</p>"
//       : "<p>You do not have any photos in this album. Please add photos.</p>";
//     var htmlTemplate = [
//       "<h2>",
//       "Album: " + albumName,
//       "</h2>",
//       message,
//       "<div>",
//       getHtml(photos),
//       "</div>",
//       '<input id="photoupload" type="file" accept="image/*">',
//       '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
//       "Add Photo",
//       "</button>",
//       '<button onclick="listAlbums()">',
//       "Back To Albums",
//       "</button>",
//     ];
//     document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//   });
// }
// // snippet-end:[s3.JavaScript.photoAlbumExample.viewAlbum]

// // snippet-start:[s3.JavaScript.photoAlbumExample.addPhoto]
// function addPhoto(albumName, photo, i) {
//   var albumPhotosKey = encodeURIComponent(albumName) + "/";

//   var photoKey = albumPhotosKey + "elitmusTest" + i;

//   // Use S3 ManagedUpload class as it supports multipart uploads
//   var upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: albumBucketName,
//       Key: photoKey,
//       ContentType: "image/jpeg",
//       Body: photo,
//     },
//   });

//   var promise = upload.promise();

//   promise.then(
//     function (data) {
//       console.log("Successfully uploaded photo.");
//     },
//     function (err) {
//       return alert("There was an error uploading your photo: ", err.message);
//     }
//   );
// }

// // snippet-end:[s3.JavaScript.photoAlbumExample.addPhoto]

// // snippet-start:[s3.JavaScript.photoAlbumExample.deletePhoto]
// function deletePhoto(albumName, photoKey) {
//   s3.deleteObject({ Key: photoKey }, function (err, data) {
//     if (err) {
//       return alert("There was an error deleting your photo: ", err.message);
//     }
//     alert("Successfully deleted photo.");
//     viewAlbum(albumName);
//   });
// }
// // snippet-end:[s3.JavaScript.photoAlbumExample.deletePhoto]

// // snippet-start:[s3.JavaScript.photoAlbumExample.deleteAlbum]
// function deleteAlbum(albumName) {
//   var albumKey = encodeURIComponent(albumName) + "/";
//   s3.listObjects({ Prefix: albumKey }, function (err, data) {
//     if (err) {
//       return alert("There was an error deleting your album: ", err.message);
//     }
//     var objects = data.Contents.map(function (object) {
//       return { Key: object.Key };
//     });
//     s3.deleteObjects(
//       {
//         Delete: { Objects: objects, Quiet: true },
//       },
//       function (err, data) {
//         if (err) {
//           return alert("There was an error deleting your album: ", err.message);
//         }
//         alert("Successfully deleted album.");
//         listAlbums();
//       }
//     );
//   });
// }
// function getHtml(template) {
//   return template.join("\n");
// }
