let isSwiping = false;
let startX = 0;
let startY = 0;

const slideshowContainer = document.querySelector('.slideshow__container');

// Detect touch start
slideshowContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
});

// Detect touch end
slideshowContainer.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Check if the gesture is mostly horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe right
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        } else {
            // Swipe left
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        updateSlidePosition();
        updateDots(); // Update dots if applicable
    }

    isSwiping = false;
});
