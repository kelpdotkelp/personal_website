
doodle = document.querySelector("#doodle");
image1 = new Image();
image1.src = "./images/doodle0.svg";
image2 = new Image();
image2.src = "./images/doodle1.svg";
imageIndex = 0;

function doodleAnimate() {
    switch(imageIndex) {
        case 0: doodle.src = image1.src; break;
        case 1: doodle.src = image2.src; break;
    }
    imageIndex = (imageIndex + 1) % 2;
}

setInterval(doodleAnimate, 1000/5);