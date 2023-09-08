/*
    Animates and handles the main content.

    Resizes the container-pictures container
    to include the second, shifted picture.
*/

class PicAnim {
    constructor(element) {
        this.id = -1;
        this.callNum = 0;
        this.state = "idle";

        this.element = element;

        this.flipBackground = false;
        if (this.element.parentElement.classList.contains("direction-reverse")) {
            this.flipBackground = true;
        }

        this.bgElements = [];
    }

    update() {
        this.element.children[0].style.transform = "scale(1)";
        this.element.children[1].style.transform = "scale(1)";

        this.updateBackground();

        this.updateSizeSingle(this.element.children[0]);
        this.updateSizeSingle(this.element.children[1]);
    }

    updateSizeSingle(element) {
        element.style.transform = "scale(1)";
        let rect = element.getBoundingClientRect();
        let height = rect.bottom - rect.top;

        innerHeight = (window.innerHeight || document.documentElement.clientHeight);
        let t = 0;
        let size = 0.5;

        if (innerHeight - rect.top > 0) {
            let inViewport = innerHeight - rect.top;
            t = inViewport/(1.2*height);
        }

        if (t <= 1) {
            size = 0.25 + (1 - 0.25)*t;
            element.style.transform = "scale(" + size + ")";
        }
    }

    createBackground() {
        //color1 = "#60b572";
        //color1 = "#488a5f";
        //color1 = "#fcba03";
        let color1 = "#67a682";

        let bg = document.createElement("div");
        this.bgElements.push(bg);
        this.element.appendChild(bg);
        bg.style.position = "absolute";
        bg.style.backgroundColor = color1;

        bg = document.createElement("div");
        this.bgElements.push(bg);
        this.element.appendChild(bg);
        bg.style.position = "absolute";
        bg.style.backgroundColor = color1;

        bg = document.createElement("div");
        this.bgElements.push(bg);
        this.element.appendChild(bg);
        bg.style.position = "absolute";
        bg.style.backgroundColor = color1;

        bg = document.createElement("div");
        this.bgElements.push(bg);
        this.element.appendChild(bg);
        bg.style.position = "absolute";
        bg.style.backgroundColor = color1;
    }

    updateBackground() {
        let pic1 = this.element.children[0];
        let pic1Rect = pic1.getBoundingClientRect();
        let pic1Width = parseFloat(window.getComputedStyle(pic1).width);
        let pic2 = this.element.children[1];
        let pic2Rect = pic2.getBoundingClientRect();
        let pic2Width = parseFloat(window.getComputedStyle(pic2).width)
        let elementWidth = parseFloat(window.getComputedStyle(this.element).width);

        this.bgElements[0].style.top = "0px";
        this.bgElements[0].style.borderRadius = "50%";
        this.bgElements[0].style.width = pic1Width + "px";
        this.bgElements[0].style.height = pic1Width + "px";

        this.bgElements[1].style.width = (window.innerWidth - pic1Rect.right + pic1Width*0.5) + "px";
        this.bgElements[1].style.left = (pic1Width*0.5) + "px";
        this.bgElements[1].style.top = "0px";
        this.bgElements[1].style.height = window.getComputedStyle(pic1).height;

        this.bgElements[2].style.right = "0px";
        this.bgElements[2].style.bottom = "0px";
        this.bgElements[2].style.borderRadius = "50%";
        this.bgElements[2].style.width = pic2Width + "px";
        this.bgElements[2].style.height = pic2Width + "px";

        this.bgElements[3].style.width = (window.innerWidth - pic2Rect.right + pic2Width*0.5) + "px";
        this.bgElements[3].style.left = (elementWidth - pic2Width*0.5) + "px";
        this.bgElements[3].style.bottom = "0px";
        this.bgElements[3].style.height = window.getComputedStyle(pic2).height;
    }
}

pic2 = getComputedStyle(document.querySelector(".pic-2"));
adjustedWidth = parseFloat(pic2.left) + parseFloat(pic2.width);
adjustedHeight = parseFloat(pic2.top) + parseFloat(pic2.height);

elements = document.getElementsByClassName("container-pictures");

for (i=0; i<elements.length; i++) {
    elements[i].style.width = adjustedWidth + "px";
    elements[i].style.height = adjustedHeight + "px";
}

pics = [];
for (i=0; i<elements.length; i++) {
    pics.push(new PicAnim(elements[i]));
    pics[i].createBackground();
}

function update() {
    for (i=0; i<pics.length; i++) {
        pics[i].update();
    }
}

window.onscroll = update;
window.onresize = update;