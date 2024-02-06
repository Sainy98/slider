const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientY;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY,
        maxDelta = window.innerHeight / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;
    track.style.transition = 'transform 3.5s ease';
    track.style.transform = `translate(-50%, ${nextPercentage}%)`;


    for (const image of track.getElementsByClassName("image")) {
        const imageTop = image.getBoundingClientRect().top;


        image.style.transition = 'object-position 3.5s ease';
        image.style.objectPosition = `center ${100 + nextPercentage}%`;
    }
}

const handleOnScroll = () => {
    const scrollPosition = window.scrollY;

    const translateY = -scrollPosition * 5; // Adjust the multiplier for the desired parallax effect

    track.style.transform = `translate(-50%, ${translateY}px)`;

    for (const image of track.getElementsByClassName("image")) {
        const imageScrollPosition = (scrollPosition - image.offsetTop) * 5; // Adjust the multiplier for the desired parallax effect
        image.style.transform = `translateY(${imageScrollPosition}px)`;
    }
}

window.addEventListener('scroll', handleOnScroll);
/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
