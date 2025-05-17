document.addEventListener('DOMContentLoaded', function () {
  initFilterNavigation();
  setupVideos();
  setupModalEvents();
});

// Filter navigation functionality
function initFilterNavigation() {
  const filterItems = document.querySelectorAll('.filter-nav li');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterItems.forEach(item => {
    item.addEventListener('click', function () {
      filterItems.forEach(item => item.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(galleryItem => {
        const categories = galleryItem.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          galleryItem.style.display = 'block';
          setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'scale(1)';
          }, 50);
        } else {
          galleryItem.style.opacity = '0';
          galleryItem.style.transform = 'scale(0.8)';
          setTimeout(() => {
            galleryItem.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Setup project details modal
function openProjectDetails(projectId) {
  const modal = document.getElementById(projectId);
  if (!modal) return;
  
  // First make it visible, then add the show class for animation
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Allow scrolling in the modal but prevent body scrolling
  document.body.style.overflow = 'hidden';
  modal.style.overflow = 'auto';
  
  // Add escape key handler specifically for this modal
  const escHandler = function(e) {
    if (e.key === 'Escape') {
      closeProjectDetails(projectId);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
  
  // Add click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeProjectDetails(projectId);
    }
  });
}

function closeProjectDetails(projectId) {
  const modal = document.getElementById(projectId);
  if (!modal) return;
  
  modal.classList.remove('show');
  
  // Wait for animation to complete before hiding
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  document.body.style.overflow = 'auto';
}

// Setup modal image viewer
function openModal(imgSrc) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  modalImg.src = imgSrc;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  document.body.style.overflow = 'auto';
}

// Video modal viewer
function openVideoModal(video) {
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  if (!videoModal || !modalVideo) return;
  
  modalVideo.src = video.querySelector('source').src;
  videoModal.style.display = 'block';
  
  setTimeout(() => {
    videoModal.classList.add('show');
  }, 10);
  
  document.body.style.overflow = 'hidden';
  modalVideo.play().catch(err => console.error('Video play error', err));
}

function closeVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  if (!videoModal || !modalVideo) return;
  
  modalVideo.pause();
  videoModal.classList.remove('show');
  
  setTimeout(() => {
    videoModal.style.display = 'none';
  }, 300);
  
  modalVideo.src = '';
  document.body.style.overflow = 'auto';
}

// Play/pause embedded videos with custom play button
function playPauseVideo(video, playButton) {
  if (!video) return;
  if (!playButton) playButton = video.parentElement.querySelector('.play-button');

  if (video.paused) {
    document.querySelectorAll('video').forEach(v => {
      if (v !== video && !v.paused) {
        v.pause();
        const btn = v.parentElement.querySelector('.play-button');
        if (btn) resetPlayButton(btn);
      }
    });

    video.play().then(() => {
      if (playButton) {
        playButton.style.opacity = '0';
        setTimeout(() => {
          playButton.style.display = 'none';
        }, 300);
      }
      video.setAttribute('controls', '');
    });
  } else {
    video.pause();
    resetPlayButton(playButton);
  }
}

function resetPlayButton(playButton) {
  if (playButton) {
    playButton.style.display = 'flex';
    setTimeout(() => {
      playButton.style.opacity = '1';
    }, 10);
  }
}

// Setup video elements
function setupVideos() {
  const videoContainers = document.querySelectorAll('.project-media');

  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    if (!video) return;

    video.removeAttribute('controls');

    video.addEventListener('loadedmetadata', function () {
      if (this.videoHeight > this.videoWidth) {
        container.classList.add('vertical-video');
      }
      if (!this.getAttribute('poster') || this.getAttribute('poster') === '') {
        this.setAttribute('poster', 'public/images/video-placeholder.jpg');
      }
    });

    const playButton = container.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', function (e) {
        e.stopPropagation();
        playPauseVideo(video, playButton);
      });
    }

    container.addEventListener('click', function () {
      playPauseVideo(video, playButton);
    });

    video.addEventListener('click', function (e) {
      e.stopPropagation();
      openVideoModal(this);
    });

    video.addEventListener('ended', function () {
      resetPlayButton(playButton);
    });
  });

  if (!document.getElementById('videoModal')) {
    const videoModal = document.createElement('div');
    videoModal.id = 'videoModal';
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
      <span class="video-close" onclick="closeVideoModal()">&times;</span>
      <video id="modalVideo" controls></video>
    `;
    document.body.appendChild(videoModal);
  }
}

// Set up event listeners for all detail buttons
function setupDetailButtons() {
  const detailButtons = document.querySelectorAll('.btn-details');
  
  detailButtons.forEach(button => {
    // Extract projectId from the onclick attribute or data attribute
    let projectId;
    if (button.hasAttribute('onclick')) {
      const onclickValue = button.getAttribute('onclick');
      const match = onclickValue.match(/'([^']+)'/);
      if (match && match[1]) {
        projectId = match[1];
      }
    } else if (button.hasAttribute('data-project')) {
      projectId = button.getAttribute('data-project');
    }
    
    if (projectId) {
      // Remove the inline onclick to prevent duplicate calls
      button.removeAttribute('onclick');
      
      // Add event listener
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openProjectDetails(projectId);
      });
    }
  });
}

// Handle modal background close & ESC key
function setupModalEvents() {
  // Set up detail buttons
  setupDetailButtons();
  
  // Create 'X' close buttons for project modals if they don't have them
  document.querySelectorAll('.project-modal').forEach(modal => {
    const closeBtn = modal.querySelector('.close');
    if (!closeBtn) {
      const newCloseBtn = document.createElement('span');
      newCloseBtn.className = 'close';
      newCloseBtn.innerHTML = '&times;';
      newCloseBtn.onclick = function() {
        closeProjectDetails(modal.id);
      };
      const modalContent = modal.querySelector('.project-modal-content');
      if (modalContent) {
        modalContent.prepend(newCloseBtn);
      }
    }
  });
  
  // Global click handlers
  window.addEventListener('click', function (event) {
    const imageModal = document.getElementById('modal');
    if (event.target === imageModal) closeModal();

    const videoModal = document.getElementById('videoModal');
    if (event.target === videoModal) closeVideoModal();
  });

  // Global escape key handler
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
      closeVideoModal();
    }
  });
  
  // Add scrollbar styles for project modals
  const style = document.createElement('style');
  style.textContent = `
    .project-modal {
      overflow-y: auto;
      max-height: 100vh;
    }
    .project-modal-content {
      margin: 7rem auto;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
      scrollbar-width: thin;
    }
    .project-modal-content::-webkit-scrollbar {
      width: 8px;
    }
    .project-modal-content::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.1);
      border-radius: 4px;
    }
    .project-modal-content::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.3);
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);
}
// Modified hardware.js functions to improve modal experience

// Enhanced project details modal function
function openProjectDetails(projectId) {
  const modal = document.getElementById(projectId);
  if (!modal) return;
  
  // Create and add a fullscreen backdrop for better closing on mobile
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.onclick = () => closeProjectDetails(projectId);
  
  // Make sure there isn't already a backdrop
  if (!modal.querySelector('.modal-backdrop')) {
    modal.insertBefore(backdrop, modal.firstChild);
  }
  
  // First make it visible, then add the show class for animation
  modal.style.display = 'block';
  document.body.classList.add('modal-open'); // Prevent body scrolling
  
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Add escape key handler specifically for this modal
  const escHandler = function(e) {
    if (e.key === 'Escape') {
      closeProjectDetails(projectId);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
  
  // Add accessible focus trap
  trapFocus(modal);
  
  // Add visible close instruction for mobile users
  const closeInstruction = document.createElement('div');
  closeInstruction.className = 'close-instruction';
  closeInstruction.textContent = 'Tap outside or press ESC to close';
  
  const modalContent = modal.querySelector('.project-modal-content');
  if (modalContent && !modalContent.querySelector('.close-instruction')) {
    modalContent.appendChild(closeInstruction);
  }
}

function closeProjectDetails(projectId) {
  const modal = document.getElementById(projectId);
  if (!modal) return;
  
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
  
  // Wait for animation to complete before hiding
  setTimeout(() => {
    modal.style.display = 'none';
    
    // Remove the backdrop if it exists
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    
    // Remove close instruction
    const instruction = modal.querySelector('.close-instruction');
    if (instruction) {
      instruction.remove();
    }
  }, 300);
}

// Focus trap for accessibility
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Set initial focus
  setTimeout(() => {
    firstElement.focus();
  }, 100);
  
  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      // Shift + Tab
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // Tab
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

// Enhanced setup for modal events
function setupModalEvents() {
  // Set up detail buttons
  setupDetailButtons();
  
  // Create a more visible close button for each modal
  document.querySelectorAll('.project-modal').forEach(modal => {
    const modalContent = modal.querySelector('.project-modal-content');
    const existingClose = modal.querySelector('.close');
    
    if (existingClose) {
      existingClose.remove(); // Remove the old close button
    }
    
    if (modalContent) {
      // Create a more visible and accessible close button
      const newCloseBtn = document.createElement('button');
      newCloseBtn.className = 'close-button';
      newCloseBtn.setAttribute('aria-label', 'Close modal');
      newCloseBtn.innerHTML = '<i class="fas fa-times"></i>';
      newCloseBtn.onclick = function() {
        closeProjectDetails(modal.id);
      };
      
      // Add it to the modal content
      modalContent.insertBefore(newCloseBtn, modalContent.firstChild);
    }
  });
  
  // Add click events to close modals when clicking outside content
  document.querySelectorAll('.project-modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeProjectDetails(modal.id);
      }
    });
  });
  
  // Global escape key handler
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Close any open project modals
      document.querySelectorAll('.project-modal.show').forEach(modal => {
        closeProjectDetails(modal.id);
      });
      
      // Also handle other modals
      closeModal();
      closeVideoModal();
    }
  });
}