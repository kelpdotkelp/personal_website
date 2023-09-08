/*
    Handles all links and the animation of them.
*/
const animLength = 0.4; //sec
const maxSize = 1.3;

pageResume = document.querySelector("#resume");
pageResume.style.display = "none";
pageResume.style.opacity = "0";
pageResume.style.position = "relative";
pageProjects = document.querySelector("#projects");
pageProjects.style.position = "relative";
pageGameDev = document.querySelector("#game-dev");
pageGameDev.style.display = "none";
pageGameDev.style.opacity = "0";
pageGameDev.style.position = "relative";
pagePhotography = document.querySelector("#photography");
pagePhotography.style.display = "none";
pagePhotography.style.opacity = "0";
pagePhotography.style.position = "relative";

currentPage = pageProjects;
nextPage = null;

/*
    Page change animation
*/
pageId = -1;
pageMaxDist = 200; //px
pageAnimDuration = 0.25; //s
pageAnimCallNum = 0;

function pageAnimate() {
    pageAnimCallNum = 0;
    pageId = setInterval(pageRemove, 1000/frameRate);
}

function pageRemove() {
    t = pageAnimCallNum / (pageAnimDuration * frameRate);
    pageAnimCallNum++;
    dist = pageMaxDist*t;
    op = 1 - t;

    if (t <= 1) {
        currentPage.style.top = dist + "px";
        currentPage.style.opacity = parseFloat(op);
    }
    else {
        clearInterval(pageId);
        currentPage.style.top = "0px";
        currentPage.style.display = "none";
        currentPage = nextPage;
        currentPage.style.display = "block";
        
        pageAnimCallNum = 0;
        pageId = setInterval(pageInsert, 1000/frameRate);
    }
}

function pageInsert() {
    t = pageAnimCallNum / (pageAnimDuration * frameRate);
    pageAnimCallNum++;
    dist = pageMaxDist*(1 - t);
    op = t;

    for (i=0; i<pics.length; i++) {
        pics[i].updateBackground();
    }

    if (pageAnimCallNum == 1) {
        currentPage.style.top = pageMaxDist + "px";
        currentPage.style.opacity = "0";
    }
    if (t <= 1) {
        currentPage.style.top = dist + "px";
        currentPage.style.opacity = parseFloat(op);
    }
    else {
        clearInterval(pageId);
        nextPage = null;
        e = currentPage.querySelector(".content-header");
        e.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
}

class Link {
    constructor(element, isPageLink) {
        this.id = -1;
        this.callNum = 0;
        this.state = "idle";

        this.element = element;
        this.element.addEventListener("mouseenter", this);
        this.element.addEventListener("mouseleave", this);
        if (isPageLink) {
            this.element.addEventListener("click", this);
        }
        
        this.frameRate = 60;
    }

    handleEvent(event) {

        if (event.type == "mouseenter" &&
            (this.state == "idle" || this.state == "shrink")) {
            if (this.id != -1) {
                clearInterval(this.id)
                this.id = -1;
            }

            this.state = "grow";
            this.id = setInterval(() => this.grow(), 1000/this.frameRate);
        }

        if (event.type == "mouseleave" && this.state != "shrink") {
            if (this.id != -1) {
                clearInterval(this.id)
                this.id = -1;
            }
            this.state = "shrink";
            this.id = setInterval(() => this.shrink(), 1000/this.frameRate);
        }

        if (event.type == "click" && nextPage == null) {
            switch(this.element.textContent) {
                case "resume": nextPage = pageResume;
                    break;
                case "projects": nextPage = pageProjects;
                    break;
                case "game dev": nextPage = pageGameDev;
                    break;
                case "photography": nextPage = pagePhotography;
                    break;
            }
            pageAnimate();
        }
    }

    grow() {
        t = this.callNum / (animLength * this.frameRate);
        this.callNum += 1;
        let size = 1 + (maxSize - 1)*t;
        this.element.style.transform = "scale(" + size + ")";

        if (t >= 1) {
            clearInterval(this.id);
            this.id = -1;
            this.state = "idle";
        }
    }

    shrink() {
        t = this.callNum / (animLength * this.frameRate);
        this.callNum -= 1;
        let size = 1 + (maxSize - 1)*t;
        this.element.style.transform = "scale(" + size + ")";

        if (t <= 0) {
            clearInterval(this.id);
            this.id = -1;
            this.state = "idle";
        }
    }
}

linksPage = document.getElementsByClassName("page-link");
linksSocial = document.getElementsByClassName("social-link");
linksGame = document.getElementsByClassName("game-link");
list = [];

for (i=0; i<linksPage.length; i++) {
    list.push(new Link(linksPage[i], true));
}
for (i=0; i<linksSocial.length; i++) {
    list.push(new Link(linksSocial[i], false));
}
for (i=0; i<linksGame.length; i++) {
    list.push(new Link(linksGame[i], false));
}