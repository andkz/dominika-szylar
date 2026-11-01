/**
 * Dominika Szylar - Interactive Theme Switcher Widget
 * Completely self-contained: injects its own scoped CSS, works with zero dependencies.
 */

(function () {
  const THEMES = [
    {
      id: "kaszmir-piasek",
      name: "1. Ciepły Kaszmir & Piasek",
      desc: "Kaszmirowy beż i piasek (domyślny)",
      swatches: ["#faf8f5", "#f3efe8", "#b06543"]
    },
    {
      id: "szalwiowy-spokoj",
      name: "2. Szałwiowa Harmonia",
      desc: "Kojąca, delikatna szałwia",
      swatches: ["#f5f8f5", "#edf3ed", "#2d654a"]
    },
    {
      id: "alabaster-krem",
      name: "3. Kremowy Alabaster",
      desc: "Alabastrowy krem, spokój",
      swatches: ["#faf9f7", "#f2efe9", "#32353c"]
    },
    {
      id: "gleboki-mech",
      name: "4. Głęboki Mech & Złoto",
      desc: "Leśny mech i miękka oliwka",
      swatches: ["#f4f7f3", "#edf2eb", "#1f412c"]
    },
    {
      id: "pudrowy-kwiat",
      name: "5. Puder & Jedwab",
      desc: "Pudrowy nude i różany beż",
      swatches: ["#faf5f3", "#f4ece9", "#9c5364"]
    },
    {
      id: "terakota-ziemia",
      name: "6. Terakota & Glinka",
      desc: "Ciepła terakota i piaskowiec",
      swatches: ["#fbf6f2", "#f4ede6", "#a85536"]
    },
    {
      id: "morska-bryza",
      name: "7. Morska Bryza & Mięta",
      desc: "Chłodna mięta i oddech",
      swatches: ["#f4f8f8", "#ebf2f2", "#19646e"]
    },
    {
      id: "stary-pergamin",
      name: "8. Stary Pergamin & Antykwa",
      desc: "Szlachetny papier i ciepły pergamin",
      swatches: ["#f9f6ef", "#f1ece2", "#2c2620"]
    },
    {
      id: "sloneczny-bursztyn",
      name: "9. Słoneczny Bursztyn",
      desc: "Ciepła wanilia i miodowy krem",
      swatches: ["#faf6ee", "#f3ede2", "#a86c23"]
    },
    {
      id: "ciemny-aksamit",
      name: "10. Ciemny Aksamit & Miedź",
      desc: "Nocny aksamit i grafit z miedzią",
      swatches: ["#141318", "#1a1920", "#d97a5f"]
    }
  ];

  function injectWidgetStyles() {
    if (document.getElementById('tsw-injected-styles')) return;
    const style = document.createElement('style');
    style.id = 'tsw-injected-styles';
    style.textContent = `
      #theme-switcher-widget {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 99999999 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        line-height: 1.4 !important;
      }
      .tsw-toggle-btn {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        background: #1c1a22 !important;
        color: #f7f4fa !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: 999px !important;
        padding: 10px 18px !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.2s ease !important;
        user-select: none !important;
      }
      .tsw-toggle-btn:hover {
        transform: translateY(-2px) !important;
        background: #282532 !important;
        box-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.55) !important;
      }
      .tsw-panel {
        display: none !important;
        position: absolute !important;
        bottom: calc(100% + 12px) !important;
        right: 0 !important;
        width: 360px !important;
        max-width: calc(100vw - 32px) !important;
        max-height: 80vh !important;
        overflow-y: auto !important;
        background: rgba(22, 20, 27, 0.96) !important;
        color: #f5f2f8 !important;
        border: 1px solid rgba(255, 255, 255, 0.16) !important;
        border-radius: 18px !important;
        padding: 16px !important;
        box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
      }
      .tsw-panel.is-open {
        display: block !important;
        animation: tswSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      }
      @keyframes tswSlideUp {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.97);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .tsw-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        margin-bottom: 12px !important;
        padding-bottom: 10px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
      .tsw-header h4 {
        margin: 0 !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-family: inherit !important;
      }
      .tsw-header-actions {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }
      .tsw-close-btn,
      .tsw-copy-btn {
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        color: #c5bed0 !important;
        border-radius: 6px !important;
        padding: 4px 8px !important;
        font-size: 11px !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
        font-family: inherit !important;
      }
      .tsw-close-btn:hover,
      .tsw-copy-btn:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      .tsw-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
      }
      .tsw-theme-item {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 9px 12px !important;
        border-radius: 10px !important;
        background: rgba(255, 255, 255, 0.04) !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
        cursor: pointer !important;
        transition: all 0.18s ease !important;
        text-align: left !important;
        width: 100% !important;
        box-sizing: border-box !important;
        font-family: inherit !important;
      }
      .tsw-theme-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateX(2px) !important;
      }
      .tsw-theme-item.active {
        background: rgba(176, 101, 67, 0.25) !important;
        border-color: #b06543 !important;
      }
      .tsw-item-info {
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      }
      .tsw-item-title {
        font-size: 12.5px !important;
        font-weight: 600 !important;
        color: #ffffff !important;
      }
      .tsw-item-desc {
        font-size: 11px !important;
        color: #9f97ad !important;
      }
      .tsw-palette-preview {
        display: flex !important;
        gap: 4px !important;
        align-items: center !important;
        flex-shrink: 0 !important;
      }
      .tsw-swatch {
        width: 14px !important;
        height: 14px !important;
        border-radius: 50% !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        display: inline-block !important;
      }
      .tsw-toast {
        display: none;
        font-size: 11px !important;
        color: #34d399 !important;
        text-align: center !important;
        margin-top: 8px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || urlParams.get('v');
  }

  function setQueryParam(value) {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set('theme', value);
    } else {
      url.searchParams.delete('theme');
    }
    window.history.replaceState({}, '', url);
  }

  function applyTheme(themeId) {
    const validTheme = THEMES.find(t => t.id === themeId);
    const activeId = validTheme ? validTheme.id : 'kaszmir-piasek';

    document.documentElement.setAttribute('data-theme', activeId);

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

    injectWidgetStyles();

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
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
          <a href="${galleryUrl}" style="color: #e59373; text-decoration: none; font-size: 11px; font-weight: 600;">📊 Zobacz zestawienie wszystkich 10 wariantów &rarr;</a>
        </div>
        <div class="tsw-toast" id="tsw-toast">Skopiowano link do schowka!</div>
      </div>
      <button type="button" class="tsw-toggle-btn" id="tsw-toggle">
        <span style="font-size:15px;">🎨</span>
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

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('is-open');
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.remove('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target)) {
        panel.classList.remove('is-open');
      }
    });

    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
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

    document.querySelectorAll('.tsw-theme-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const themeId = btn.dataset.themeId;
        applyTheme(themeId);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 't') {
        panel.classList.toggle('is-open');
      }
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    renderWidget();
    const paramTheme = getQueryParam('theme');
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('ds_theme');
    } catch (e) {}

    const initialTheme = paramTheme || savedTheme || 'kaszmir-piasek';
    applyTheme(initialTheme);
  }
})();
