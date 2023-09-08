const frameRate = 60;

//Subtitle animation
const animSubtitleLength = 0.9; //s
const animSubtitleInitDist = 5; //rem
animSubtitleId = -1;
sub = [
    document.querySelector("#sub1"),
    document.querySelector("#sub2"),
    document.querySelector("#sub3")]

for (i=0; i<sub.length; i++) {
    sub[i].style.position = "relative";
    sub[i].style.opacity = "0";
    sub[i].style.top = animSubtitleInitDist + "rem";
}

animSubtitleCallNum = 0;
animSubtitleIndex = 0; //Which word is currently animating
animSubtitleId = setInterval(animSubtitle, 1000/frameRate);

function animSubtitle() {
    t = animSubtitleCallNum / (animSubtitleLength * frameRate);
    animSubtitleCallNum++;
    dist = animSubtitleInitDist - animSubtitleInitDist*easeInOut(t);
    op = t;

    sub[animSubtitleIndex].style.top = dist + "rem";
    sub[animSubtitleIndex].style.opacity = parseFloat(t);

    if (t >= 1 && animSubtitleIndex < sub.length) {
        animSubtitleIndex += 1;
        animSubtitleCallNum = 0;
    }
    if (animSubtitleIndex >= sub.length) {
        clearInterval(animSubtitleId);
    }
}

function easeInOut(t) {
    return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}