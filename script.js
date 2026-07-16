(() => {
  'use strict';

  const slider   = document.querySelector('.testimonial-slider');
  const tablist  = slider.querySelector('.topic-tabs');
  const tabs     = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels   = Array.from(slider.querySelectorAll('.slide-panel'));
  const pointer  = slider.querySelector('.slider-pointer');

  const getActiveIndex = () => tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');

 
  function activate(index, moveFocus) {
    const total = tabs.length;
    const newIndex = (index + total) % total;

    tabs.forEach((tab, i) => {
      const selected = i === newIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('topic-tab--active', selected);
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== newIndex;
    });

    if (moveFocus) {
      tabs[newIndex].focus();
    }

    movePointer(tabs[newIndex]);
  }

  function movePointer(activeTab) {
    if (!pointer) return;
    const tabRect  = activeTab.getBoundingClientRect();
    const listRect = tablist.getBoundingClientRect();
    const cardRect = slider.querySelector('.slider-card').getBoundingClientRect();
    const centerX  = (tabRect.left + tabRect.width / 2) - cardRect.left;
    pointer.style.left = `${centerX}px`;
  }


  tablist.addEventListener('keydown', (e) => {
    const currentIndex = getActiveIndex();
    let newIndex = null;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = currentIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    activate(newIndex, true);
  });

  /* Also allow arrow keys from inside the card/panel so users don't have
     to Tab back to the tab buttons to switch slides. */
  const card = slider.querySelector('.slider-card');
  if (card) {
    card.addEventListener('keydown', (e) => {
      const currentIndex = getActiveIndex();
      let newIndex = null;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = currentIndex + 1;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = currentIndex - 1;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      activate(newIndex, true);
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i, false));
  });

  const DRAG_THRESHOLD = 50;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let dragMoved = false;

  card.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return;
    isDragging = true;
    dragMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    card.classList.add('is-dragging');
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragMoved = true;
    if (dragMoved) {
      card.style.transform = `translateX(${dx * 0.3}px)`;
    }
  });

  card.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    card.releasePointerCapture(e.pointerId);
    card.classList.remove('is-dragging');
    card.style.transform = '';

    const dx = e.clientX - startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      const dir = dx < 0 ? 1 : -1;
      activate(getActiveIndex() + dir, false);
    }
  });

  card.addEventListener('pointercancel', () => {
    isDragging = false;
    card.classList.remove('is-dragging');
    card.style.transform = '';
  });

  /* Keep the pointer aligned if the layout reflows (resize, font load, etc.) */
  window.addEventListener('resize', () => {
    movePointer(tabs[getActiveIndex()]);
  });

  /* Initial position */
  window.requestAnimationFrame(() => movePointer(tabs[getActiveIndex()]));

  /* Force-play the demo video if browser blocks autoplay, and ensure it loops */
  const demoVideo = document.querySelector('.problem-demo__video');
  if (demoVideo) {
    demoVideo.play().catch(() => {
      /* If autoplay is still blocked, try again on first user interaction */
      const tryPlay = () => {
        demoVideo.play().catch(() => {});
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('keydown', tryPlay);
      };
      document.addEventListener('click', tryPlay);
      document.addEventListener('keydown', tryPlay);
    });

    /* Fallback: if the loop attribute isn't honored, replay manually */
    demoVideo.addEventListener('ended', () => {
      demoVideo.currentTime = 0;
      demoVideo.play().catch(() => {});
    });
  }
})();
