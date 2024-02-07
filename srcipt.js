const track = document.getElementById("image-track");
let isScrolling = true; // Variable to track if scrolling is enabled

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientY;
    isScrolling = true; // Ensure scrolling is enabled when clicking
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY,
        maxDelta = window.innerHeight / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;
    track.style.transition = 'transform 1.5s';
    track.style.transform = `translate(-50%, ${nextPercentage}%)`;

    for (const image of track.getElementsByClassName("image")) {
        const imageTop = image.getBoundingClientRect().top;

        image.style.transition = 'transform 1.5s';
        image.style.transform = `translateY(${nextPercentage * 2.5}px)`; // Adjust the multiplier for the desired parallax effect
    }
};

const handleOnScroll = () => {
    if (!isScrolling) return; // Check if scrolling is enabled
    const scrollPosition = window.scrollY;

    const translateY = scrollPosition * 0; // Adjust the multiplier for the desired parallax effect

    track.style.transition = 'transform 1.5s';
    track.style.transform = `translate(-50%, ${translateY}px)`;

    // Add parallax effect to images
    const images = track.getElementsByClassName("image");
    for (const image of images) {
        const parallaxValue = 10; // Adjust the intensity of the parallax effect
        const translateY = -scrollPosition * parallaxValue; // Calculate the vertical translation based on scroll position
        image.style.transition = 'transform 1.5s';
        image.style.transform = `translateY(${translateY}px)`; // Apply the vertical translation to create the parallax effect
    }
};

// Event listener for smooth scrolling on scroll
window.addEventListener('scroll', handleOnScroll);

// Event listener to stop scrolling when clicking on an image
for (const image of track.getElementsByClassName("image")) {
    image.addEventListener('click', () => {
        isScrolling = false; // Disable scrolling when clicking on an image
    });
}

// Event listeners for mouse and touch interactions
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
