// Protfix / Wang Yi Heng Editorial Portfolio Scripts

(function () {
  'use strict';

  // --- 1. Theme Mode Toggle (Wine/Burgundy vs Cream Inverted) ---
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const storageKey = 'protfix-theme';

  function applyTheme(theme, save = true) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark wine theme' : 'Switch to light cream theme'
      );
      const textSpan = themeToggle.querySelector('.theme-toggle-text');
      if (textSpan) {
        textSpan.textContent = isLight ? 'Wine Mode' : 'Cream Mode';
      }
    }

    if (save) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {}
    }
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (e) {}
  if (savedTheme) {
    applyTheme(savedTheme, false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isLight = root.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light', true);
    });
  }

  // --- 2. Interactive Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const filterStatus = document.getElementById('filter-status');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        let matchCount = 0;
        projectCards.forEach(function (card) {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          const isMatch = filter === 'all' || categories.includes(filter);

          if (isMatch) {
            card.classList.remove('is-hidden');
            matchCount++;
          } else {
            card.classList.add('is-hidden');
          }
        });

        if (filterStatus) {
          const filterName = button.textContent.trim();
          filterStatus.textContent = `Showing ${matchCount} ${
            matchCount === 1 ? 'project' : 'projects'
          } for ${filterName}`;
        }
      });
    });
  }

  // --- 3. Interactive Contact Form Validation & Feedback ---
  const inquiryForm = document.getElementById('inquiry-form');
  const formFeedback = document.getElementById('form-feedback');

  if (inquiryForm && formFeedback) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('full-name');
      const emailInput = document.getElementById('email-address');

      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        formFeedback.textContent = 'Please fill out your name and email address.';
        formFeedback.style.color = '#ffb3ba';
        return;
      }

      formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your inquiry has been sent.`;
      formFeedback.style.color = '#fae896';
      inquiryForm.reset();
    });
  }

  // --- 4. Dynamic Footer Year ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
