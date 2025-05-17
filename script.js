// Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: light)');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
  }

  themeToggle.addEventListener('click', () => {
    // Toggle dark class on body
    document.body.classList.toggle('dark');
    
    // Play toggle sound effect (optional)
    // playToggleSound();
    
    // Save user preference
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  });

  // Optional: Custom toggle sound effect function
  function playToggleSound() {
    const audio = new Audio();
    audio.src = document.body.classList.contains('dark') 
      ? 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCgAAAAAAAAAGwuTR3gQAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxHYAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' 
      : 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAeAAKysrKysrKysrKysrKysrKysrKysrKysrK1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFycnJycnJycnJycnJycnJycnJycnJycnJyc/////////////////////wAAAABMYXZjNTguMTMAAAAAAAAAAAAAAACQA+gAAAAAAAAAAdnpxk4AAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxHYAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  }
  

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced Skills Progress Animation
const skillBars = document.querySelectorAll('.progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        // Reset the width before animation
        bar.style.width = '0';
        // Force a reflow
        bar.offsetHeight;
        // Add animation class
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        // Set the final width
        requestAnimationFrame(() => {
            bar.style.width = width;
        });
    });

};

// Improved Intersection Observer for skills
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Delay animation slightly to ensure proper rendering
            setTimeout(() => {
                animateSkills();
            }, 100);
            // Unobserve after animation
            observeSkills.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '50px' // Start animation slightly before the element comes into view
});

// Observe all skill sections
document.querySelectorAll('.skills').forEach(skillSection => {
    observeSkills.observe(skillSection);
});

// Re-trigger animations when switching between portrait and landscape
// window.addEventListener('orientationchange', () => {
//     setTimeout(() => {
//         document.querySelectorAll('.skills').forEach(skillSection => {
//             if (isElementInViewport(skillSection)) {
//                 animateSkills();
//             }
//         });
//     }, 100);
// });

// Helper function to check if element is in viewport
// function isElementInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }


// Glow Elements Animation Fix
// const glowElements = document.querySelectorAll('.glow-element');
// let mouseX = 0, mouseY = 0;

// document.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

// function animateGlow() {
//     glowElements.forEach((element, index) => {
//         const speed = 0.05 + (index * 0.01);
//         const rect = element.getBoundingClientRect();
//         const targetX = mouseX - rect.width / 2;
//         const targetY = mouseY - rect.height / 2;

//         const currentX = parseFloat(element.style.left) || rect.left;
//         const currentY = parseFloat(element.style.top) || rect.top;

//         const newX = currentX + (targetX - currentX) * speed;
//         const newY = currentY + (targetY - currentY) * speed;

//         element.style.left = `${newX}px`;
//         element.style.top = `${newY}px`;
//     });
//     requestAnimationFrame(animateGlow);
// }
// animateGlow();

particlesJS("particles-js", {
    particles: {
        number: {
            value: 70,
            density: { enable: true, value_area: 700 }
        },
        color: { value: ["#00f0ff", "#00cc6a", "#4f46e5"] },
        shape: { type: "circle" },
        opacity: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.2, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Scroll to Top Button Functionality
const scrollBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});


scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


const texts = [
    "DEVELOPER.",
    "C-CODER.",
    "FRONT-END DEVELOPER.",
    "PROBLEM SOLVER.",
    "Critical Thinker"
];

const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 1500;

let textIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');
const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');

// Create random color
function getRandomColor() {
    const hue = Math.floor(Math.random() * 60) + 160; // blue-green range
    return `hsl(${hue}, 100%, 70%)`;
}

// Particle effect
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 1000 + 500;
    const color = getRandomColor();

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    particle.style.transform = 'translate(-50%, -50%)';

    setTimeout(() => {
        particle.style.transition = `all ${duration}ms ease-out`;
        particle.style.transform = `translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 80}px)`;
        particle.style.opacity = '0';

        setTimeout(() => {
            particle.remove();
        }, duration);
    }, 10);
}

// Create particles at cursor
function createParticlesAtCursor() {
    const cursorRect = cursor.getBoundingClientRect();
    const x = cursorRect.left;
    const y = cursorRect.top + cursorRect.height / 2;

    for (let i = 0; i < 3; i++) {
        createParticle(x, y);
    }
}

// Typing function
function typeText() {
    if (charIndex === 0) {
        typingElement.innerHTML = ''; // Clear text
    }

    if (charIndex < texts[textIndex].length) {
        const currentText = texts[textIndex];
        const newChar = currentText.charAt(charIndex);
        const coloredChar = `<span style="color:${getRandomColor()}">${newChar}</span>`;
        typingElement.innerHTML += coloredChar;

        // Play typing sound
        // audio.currentTime = 0;
        // audio.play();

        charIndex++;
        setTimeout(typeText, typingSpeed);

        if (Math.random() > 0.6) {
            createParticlesAtCursor();
        }
    } else {
        setTimeout(eraseText, newTextDelay);
    }
}

// Erasing function
function eraseText() {
    if (charIndex > 0) {
        const spans = typingElement.querySelectorAll('span');
        if (spans.length) spans[spans.length - 1].remove();

        charIndex--;
        setTimeout(eraseText, erasingSpeed);

        if (Math.random() > 0.7) {
            createParticlesAtCursor();
        }
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

// Start animation
setTimeout(typeText, 1000);



window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('hidden');
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});
// Contact Form Handling

const contactForm = document.getElementById('contact-form');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;
    const messageBox = document.getElementById('form-message');

    // Reset previous message
    messageBox.style.display = 'none';
    messageBox.className = 'message';

    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        messageBox.textContent = 'Please fill in all fields.';
        messageBox.classList.add('error');
        messageBox.style.display = 'block';
        return;
    }

    // Show sending state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            messageBox.textContent = 'Message sent successfully!';
            messageBox.classList.add('success');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(() => {
        messageBox.textContent = 'There was an error sending your message.';
        messageBox.classList.add('error');
    })
    .finally(() => {
        messageBox.style.display = 'block';
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
});


// Close popup when clicking OK
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
// Disable Right Click & Inspect Element
// document.addEventListener("contextmenu", function (e) {
//     e.preventDefault();
// }, false);

// document.addEventListener("keydown", function (e) {
//     if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
//         e.preventDefault();
//     }
//     if (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I")) {
//         e.preventDefault();
//     }
//     if (e.key === "F12") {
//         e.preventDefault();
//     }
// }, false);
function openProject1Modal() {
    const modalContent = `
      <div class="modal">
        <div class="modal-inner">
          <span class="modal-close" onclick="closeModal()">✖</span>
          <h2>Project 1 Details</h2>
          <p>This is a responsive web application built with HTML, CSS, and JS. It demonstrates basic frontend development.</p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
  }
  function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  }
// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinksList = document.querySelectorAll(".nav-links a");

function highlightNavLink() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinksList.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-link");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// Section Reveal Animation
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target); // Animate only once
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});
// Pseudo-code idea
document.querySelectorAll('.tag-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    document.querySelectorAll('.project-item').forEach(project => {
      project.style.display = project.dataset.tags.includes(tag) ? 'block' : 'none';
    });
  });
});


