/**
 * Dominika Szylar - Multi-Variant Theme Switcher Engine
 * Zero remote dependencies, local-first
 */

(function () {
  const THEMES = [
    {
      id: "original",
      name: "Oryginał Framer",
      desc: "Pierwotny szablon Framera",
      font: "Inter / Geist",
      swatches: ["#ffffff", "#0a0a0a", "#222222"]
    },
    {
      id: "sage-wellness",
      name: "1. Sage & Clean Wellness",
      desc: "Szałwiowa zieleń, świeży medyczny ład",
      font: "Plus Jakarta Sans",
      swatches: ["#f8faf8", "#2e684d", "#182e22"]
    },
    {
      id: "warm-earth",
      name: "2. Warm Sand & Earth",
      desc: "Ciepły beż, cynamon, holistyczny",
      font: "Playfair Display + Inter",
      swatches: ["#faf6f0", "#bf6640", "#38271d"]
    },
    {
      id: "nordic-pure",
      name: "3. Nordic Minimalist",
      desc: "Czysta biel, architektoniczny ład",
      font: "Geist Pure",
      swatches: ["#ffffff", "#0f172a", "#e2e8f0"]
    },
    {
      id: "forest-gold",
      name: "4. Forest Deep & Gold",
      desc: "Butelkowa zieleń, złoto, prestiż VIP",
      font: "Cormorant + Inter",
      swatches: ["#fbfbf9", "#153727", "#c9b788"]
    },
    {
      id: "soft-blush",
      name: "5. Soft Blush & Power",
      desc: "Pudrowy róż, zgaszony wrzos, kobiety",
      font: "Outfit Rounded",
      swatches: ["#fdf9f8", "#a35667", "#302023"]
    },
    {
      id: "athletic-energy",
      name: "6. Athletic Energy",
      desc: "Węglowy antracyt, dynamiczna limonka",
      font: "Syne Grotesk",
      swatches: ["#0f1216", "#10b981", "#1e232b"]
    },
    {
      id: "ocean-petrol",
      name: "7. Ocean Petrol & Ice",
      desc: "Morski petrol, mięta, terapia bólu",
      font: "DM Sans",
      swatches: ["#f4f8f9", "#196f7c", "#0e2a30"]
    },
    {
      id: "editorial-vogue",
      name: "8. Editorial Vogue",
      desc: "Wysoki kontrast, styl luksusowego magazynu",
      font: "Cinzel + Inter",
      swatches: ["#faf8f5", "#111111", "#ded7c8"]
    },
    {
      id: "terracotta-craft",
      name: "9. Terracotta Craft",
      desc: "Rdzawa glinka, naturalny len, manualna",
      font: "Fraunces + Inter",
      swatches: ["#f7f2eb", "#9b442a", "#302018"]
    },
    {
      id: "obsidian-luxe",
      name: "10. Modern Obsidian Dark",
      desc: "Satynowy ciemny luksus, ciepła miedź",
      font: "Satoshi",
      swatches: ["#0c0d10", "#e07a5f", "#1a1d24"]
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
    const activeId = validTheme ? validTheme.id : 'original';

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

    const activeObj = THEMES.find(t => t.id === activeId) || THEMES[0];
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
            <span class="tsw-item-desc">${t.desc} &bull; <i>${t.font}</i></span>
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
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
          <a href="${galleryUrl}" style="color: #60a5fa; text-decoration: none; font-size: 11px; font-weight: 600;">📊 Zobacz zestawienie wszystkich wariantów &rarr;</a>
        </div>
        <div class="tsw-toast" id="tsw-toast">Skopiowano link do schowka!</div>
      </div>
      <button type="button" class="tsw-toggle-btn" id="tsw-toggle">
        <span style="font-size:16px;">🎨</span>
        <span>Wariant: <strong class="tsw-active-label">Wybierz</strong></span>
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
        alert('Skopiuj ten adres URL: ' + window.location.href);
      }
    });

    // Theme select clicks
    document.querySelectorAll('.tsw-theme-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.themeId;
        applyTheme(themeId);
      });
    });

    // Keyboard shortcut (Shift + T to toggle)
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

    const initialTheme = paramTheme || savedTheme || 'original';
    applyTheme(initialTheme);
  });
})();
