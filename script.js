// Portfolio Interactions: Dark Mode Toggle, Project Filtering, and Accessibility Enhancements

(function () {
  'use strict';

  // --- 1. Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const storageKey = 'portfolio-theme';

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, save = true) {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      const toggleText = themeToggle.querySelector('.theme-toggle-text');
      if (toggleText) {
        toggleText.textContent = isDark ? 'Light mode' : 'Dark mode';
      }
      themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }

    if (save) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        // LocalStorage may be unavailable in restricted environments
      }
    }
  }

  // Initialize theme from storage or system preference
  let initialTheme;
  try {
    initialTheme = localStorage.getItem(storageKey);
  } catch (e) {
    initialTheme = null;
  }
  if (!initialTheme) {
    initialTheme = getSystemPreference();
  }
  applyTheme(initialTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = root.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }

  // Listen for system theme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    try {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    } catch (err) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // --- 2. Interactive Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const filterStatus = document.getElementById('filter-status');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active filter button state
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

        // Update screen-reader announcement
        if (filterStatus) {
          const filterName = button.textContent.trim();
          filterStatus.textContent = `Showing ${matchCount} ${
            matchCount === 1 ? 'project' : 'projects'
          } for ${filterName}`;
        }
      });
    });
  }

  // --- 3. Dynamic Year in Footer ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

