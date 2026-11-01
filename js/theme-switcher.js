/**
 * Dominika Szylar - Artistic Monochromatic Theme Engine
 * Zero zebra stripes, tone-on-tone card blending, Merriweather Light everywhere.
 */

(function () {
  const THEMES = [
    {
      id: "original",
      name: "Oryginał Framer",
      desc: "Surowy pierwotny szablon",
      swatches: ["#ffffff", "#222222", "#737373"]
    },
    {
      id: "kaszmir-piasek",
      name: "1. Ciepły Kaszmir & Piasek",
      desc: "Spójny beż, len, cynamonowy akcent",
      swatches: ["#f5efeb", "#ebe2d8", "#b06543"]
    },
    {
      id: "szalwiowy-spokoj",
      name: "2. Szałwiowa Harmonia",
      desc: "Uspokajająca zieleń SPA i eukaliptus",
      swatches: ["#edf3ee", "#e0ece3", "#2c6148"]
    },
    {
      id: "alabaster-krem",
      name: "3. Kremowy Alabaster",
      desc: "Szlachetna perła, miękki grafit, minimalizm",
      swatches: ["#f9f8f5", "#f0ece5", "#232528"]
    },
    {
      id: "gleboki-mech",
      name: "4. Głęboki Mech & Złoto",
      desc: "Leśna oliwka, szampan, prestiż",
      swatches: ["#f1f4ee", "#e4ebe0", "#193627"]
    },
    {
      id: "pudrowy-kwiat",
      name: "5. Puder & Jedwab",
      desc: "Ciepły różany nude, opieka poporodowa",
      swatches: ["#f8f0ed", "#efe3df", "#9a4f5f"]
    },
    {
      id: "terakota-ziemia",
      name: "6. Terakota & Glinka",
      desc: "Naturalna glina, terapia manualna",
      swatches: ["#f4ece3", "#e8dccf", "#964227"]
    },
    {
      id: "morska-bryza",
      name: "7. Morska Bryza & Mięta",
      desc: "Chłodny błękit, oddech, kojenie bólu",
      swatches: ["#eaf1f2", "#dbe7e9", "#18606b"]
    },
    {
      id: "stary-pergamin",
      name: "8. Stary Pergamin & Antykwa",
      desc: "Kremowy papier, klimat paryskiej biblioteki",
      swatches: ["#f6f2e8", "#ece5d6", "#2c261f"]
    },
    {
      id: "sloneczny-bursztyn",
      name: "9. Słoneczny Bursztyn",
      desc: "Ciepła wanilia, złoto, optymistyczna energia",
      swatches: ["#f7f3e8", "#efe6d4", "#a66b24"]
    },
    {
      id: "ciemny-aksamit",
      name: "10. Ciemny Aksamit & Miedź",
      desc: "Satynowy grafit, miedziany blask, relaks",
      swatches: ["#131217", "#1d1c24", "#d9795f"]
    }
  ];

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || urlParams.get('v');
  }

  function setQueryParam(value) {
    const url = new URL(window.location);
    if (value && value !== 'original') {
      url.searchParams.set('theme', value);
    } else {
      url.searchParams.delete('theme');
      url.searchParams.delete('v');
    }
    window.history.replaceState({}, '', url);
  }

  function applyTheme(themeId) {
    const validTheme = THEMES.find(t => t.id === themeId);
    const activeId = validTheme ? validTheme.id : 'kaszmir-piasek';

    if (activeId === 'original') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', activeId);
    }

    try {
      localStorage.setItem('ds_theme', activeId);
    } catch (e) {}

    setQueryParam(activeId);
    updateActiveButtons(activeId);
  }

  function updateActiveButtons(activeId) {
    const items = document.querySelectorAll('.tsw-theme-item');
    items.forEach(item => {
      if (item.dataset.themeId === activeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const activeObj = THEMES.find(t => t.id === activeId) || THEMES[1];
    const toggleLabel = document.querySelector('.tsw-active-label');
    if (toggleLabel) {
      toggleLabel.textContent = activeObj.name.replace(/^\d+\.\s*/, '');
    }
  }

  function renderWidget() {
    if (document.getElementById('theme-switcher-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'theme-switcher-widget';

    let listHtml = '';
    THEMES.forEach(t => {
      const swatchesHtml = t.swatches
        .map(c => `<span class="tsw-swatch" style="background:${c}"></span>`)
        .join('');

      listHtml += `
        <button type="button" class="tsw-theme-item" data-theme-id="${t.id}">
          <div class="tsw-item-info">
            <span class="tsw-item-title">${t.name}</span>
            <span class="tsw-item-desc">${t.desc}</span>
          </div>
          <div class="tsw-palette-preview">
            ${swatchesHtml}
          </div>
        </button>
      `;
    });

    const themeLink = document.querySelector('link[href*="css/themes.css"]');
    const rootPrefix = themeLink ? themeLink.getAttribute('href').replace('css/themes.css', '') : './';
    const galleryUrl = rootPrefix + 'warianty/index.html';

    widget.innerHTML = `
      <div class="tsw-panel" id="tsw-panel">
        <div class="tsw-header">
          <h4>🎨 Wybierz Wariant</h4>
          <div class="tsw-header-actions">
            <button type="button" class="tsw-copy-btn" id="tsw-copy-link" title="Kopiuj link do obecnego wariantu">🔗 Kopiuj link</button>
            <button type="button" class="tsw-close-btn" id="tsw-close" title="Zamknij">✕</button>
          </div>
        </div>
        <div class="tsw-grid">
          ${listHtml}
        </div>
        <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
          <a href="${galleryUrl}" style="color: #d9795f; text-decoration: none; font-size: 11px; font-weight: 600;">📊 Zobacz zestawienie wszystkich 10 wariantów &rarr;</a>
        </div>
        <div class="tsw-toast" id="tsw-toast">Skopiowano link do schowka!</div>
      </div>
      <button type="button" class="tsw-toggle-btn" id="tsw-toggle">
        <span style="font-size:16px;">🎨</span>
        <span>Styl: <strong class="tsw-active-label">Wybierz</strong></span>
      </button>
    `;

    document.body.appendChild(widget);

    // Event Listeners
    const panel = document.getElementById('tsw-panel');
    const toggleBtn = document.getElementById('tsw-toggle');
    const closeBtn = document.getElementById('tsw-close');
    const copyBtn = document.getElementById('tsw-copy-link');
    const toast = document.getElementById('tsw-toast');

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('is-open');
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.remove('is-open');
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.style.display = 'block';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 2200);
      } catch (err) {
        prompt('Skopiuj ten link:', window.location.href);
      }
    });

    // Theme select clicks
    document.querySelectorAll('.tsw-theme-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.themeId;
        applyTheme(themeId);
      });
    });

    // Keyboard shortcut (Shift + T)
    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 't') {
        panel.classList.toggle('is-open');
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderWidget();

    const paramTheme = getQueryParam('theme');
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('ds_theme');
    } catch (e) {}

    // Default to 'kaszmir-piasek' as the primary refined variant!
    const initialTheme = paramTheme || savedTheme || 'kaszmir-piasek';
    applyTheme(initialTheme);
  });
})();
