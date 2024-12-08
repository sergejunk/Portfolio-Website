/*=============== SHOW MENU ===============*/
// Grabbing elements for menu toggle functionality
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
// Adds the 'show-menu' class to display the navigation menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
// Removes the 'show-menu' class to hide the navigation menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
// Grabbing all navigation links
const navLink = document.querySelectorAll('.nav__link');

// Removes the 'show-menu' class when a navigation link is clicked
function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}

// Adds the click event to each navigation link
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// Grabbing all sections with an id attribute
const sections = document.querySelectorAll('section[id]');

// Highlights the current active section link in the navigation menu
window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset; // Get current scroll position

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 10; // Adjust offset slightly
    const sectionId = current.getAttribute('id');

    // Check if the current section is in the viewport
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link'); // Add active class
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link'); // Remove active class
    }
  });
}

/*==================== CHANGE BACKGROUND HEADER ====================*/
// Changes header background when scrolling past 80px
function scrollHeader() {
  const header = document.getElementById('header');
  if (this.scrollY >= 80) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
// Displays the "scroll up" button when scrolled down 350px
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

/*==================== ABOUT TABS ====================*/
// Tab functionality for the "About" section
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

// Add click event to each tab
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    // Hide all tab contents
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('tab__active');
    });

    // Show the clicked tab's content
    target.classList.add('tab__active');

    // Remove active class from all tabs
    tabs.forEach((tab) => {
      tab.classList.remove('tab__active');
    });

    // Add active class to the clicked tab
    tab.classList.add('tab__active');
  });
});

/*=============== CONTACT FORM =============== */
// Contact form submission with EmailJS
const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactSubject = document.getElementById('contact-subject'),
  contactMessage = document.getElementById('contact-message'),
  errorMessage = document.getElementById('error-message');

// Handles form submission
const sendEmail = (e) => {
  e.preventDefault(); // Prevent default form submission

  // Check if all input fields are filled
  if (
    contactName.value === '' ||
    contactEmail.value === '' ||
    contactSubject.value === '' ||
    contactMessage.value === ''
  ) {
    errorMessage.textContent = 'Write all the input fields'; // Show error message
  } else {
    // Use EmailJS to send form data
    emailjs
      .sendForm(
        'service_euult8q', // Your EmailJS service ID
        'template_sc5l1no', // Your EmailJS template ID
        '#contact-form', // Form selector
        'b-3ofQcuAotCOUnjM' // Your EmailJS public key
      )
      .then(
        () => {
          errorMessage.classList.add('color-first'); // Highlight success message
          errorMessage.textContent = 'Message sent ✔'; // Show success message

          // Clear success message after 5 seconds
          setTimeout(() => {
            errorMessage.textContent = '';
          }, 5000);
        },
        (error) => {
          alert('SOMETHING WENT WRONG...', error); // Alert on error
        }
      );

    // Clear form fields
    contactName.value = '';
    contactEmail.value = '';
    contactSubject.value = '';
    contactMessage.value = '';
  }
};

// Add event listener to the form
contactForm.addEventListener('submit', sendEmail);