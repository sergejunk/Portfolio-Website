// JavaScript for Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll(".slideshow__slide");
const totalSlides = slides.length;

// Dynamically create dots based on the number of slides
const dotsContainer = document.querySelector(".slideshow__dots");
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.setAttribute("data-slide", i);
  if (i === 0) dot.classList.add("active-dot"); // Mark the first dot as active initially
  dotsContainer.appendChild(dot);
}

// Function to update slide position
const updateSlidePosition = () => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    slide.style.transition = "transform 0.5s ease-in-out";
  });

  // Update the active dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active-dot", index === currentSlide);
  });
};

// Initialize the slideshow positions
const initSlides = () => {
  slides.forEach((slide, index) => {
    slide.style.position = "absolute";
    slide.style.left = "0";
    slide.style.top = "0";
  });
  updateSlidePosition();
};

// Navigate to the previous slide
document.querySelector(".slideshow__prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
});

// Navigate to the next slide
document.querySelector(".slideshow__next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
});

// Add event listener to dots
dotsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("dot")) {
    currentSlide = parseInt(event.target.getAttribute("data-slide"));
    updateSlidePosition();
  }
});

// Initialize slideshow
initSlides();