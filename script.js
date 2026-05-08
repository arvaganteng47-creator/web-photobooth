// script.js

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const downloadBtn = document.getElementById("downloadBtn");
const filters = document.querySelectorAll(".filters button");
const bgUpload = document.getElementById("bgUpload");

let currentFilter = "none";

navigator.mediaDevices.getUserMedia({
    video:{
        width:1920,
        height:1080
    },
    audio:false
})
.then(stream=>{
    video.srcObject = stream;
});

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{

        currentFilter = btn.dataset.filter;

        video.style.filter = currentFilter;

    });
});

captureBtn.addEventListener("click",()=>{

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.filter = currentFilter;

    ctx.drawImage(video,0,0,canvas.width,canvas.height);

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "white";
    flash.style.zIndex = 9999;
    flash.style.opacity = "1";
    flash.style.transition = "0.5s";

    document.body.appendChild(flash);

    setTimeout(()=>{
        flash.style.opacity = "0";
    },50);

    setTimeout(()=>{
        flash.remove();
    },500);

});

downloadBtn.addEventListener("click",()=>{

    const link = document.createElement("a");

    link.download = "luxury-photobooth.png";

    link.href = canvas.toDataURL();

    link.click();

});

bgUpload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(event){

            document.body.style.backgroundImage = `url(${event.target.result})`;

            document.body.style.backgroundSize = "cover";

            document.body.style.backgroundPosition = "center";

        }

        reader.readAsDataURL(file);

    }

});