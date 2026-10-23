
document.addEventListener('DOMContentLoaded', () => {
  // 0. File Protocol Compatibility (fixes local file:/// double-clicking)
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href === '/') {
        a.setAttribute('href', location.pathname.includes('/blog/') ? '../../index.html' : (location.pathname.includes('/') && !location.pathname.endsWith('index.html') ? '../index.html' : './index.html'));
      } else {
        const clean = href.replace(/^\//, '');
        const depth = (location.pathname.match(/\//g) || []).length;
        const target = clean.includes('.') ? clean : clean + '/index.html';
        const prefix = location.pathname.includes('/blog/') ? '../../' : (location.pathname.split('/').slice(-2, -1)[0] === 'scratch' ? './' : '../');
        a.setAttribute('href', prefix + target);
      }
    });
  }

  // 1. Mobile Menu Link Cloning (Ensures 100% valid DOM and identical links)
  const desktopNav = document.querySelector('nav[data-framer-name="Desktop"]');
  const phoneNav = document.querySelector('nav[data-framer-name="Phone"]');
  
  if (desktopNav && phoneNav) {
    const desktopLinks = desktopNav.querySelector('.framer-1b6shkl');
    const desktopButton = desktopNav.querySelector('.framer-28cdx0');
    const phoneContainer = phoneNav.querySelector('.framer-1rmhckj');
    
    if (phoneContainer && desktopLinks && desktopButton && !phoneContainer.querySelector('.framer-1b6shkl')) {
      const clonedLinks = desktopLinks.cloneNode(true);
      const clonedButton = desktopButton.cloneNode(true);
      phoneContainer.appendChild(clonedLinks);
      phoneContainer.appendChild(clonedButton);
    }
  }

  // 2. Mobile Menu Toggle
  const menuButtons = document.querySelectorAll('[data-framer-name="Menu Icon"], [data-framer-name="Menu"]');
  
  menuButtons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!phoneNav) return;
      
      const isOpen = phoneNav.classList.contains('framer-v-1clfgnr');
      if (isOpen) {
        phoneNav.classList.remove('framer-v-1clfgnr');
        phoneNav.classList.add('framer-v-8lkanp');
        btn.classList.remove('framer-v-sgx2z6');
        btn.classList.add('framer-v-14br5d7');
      } else {
        phoneNav.classList.remove('framer-v-8lkanp');
        phoneNav.classList.add('framer-v-1clfgnr');
        btn.classList.remove('framer-v-14br5d7');
        btn.classList.add('framer-v-sgx2z6');
      }
    });
  });

  if (phoneNav) {
    phoneNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        phoneNav.classList.remove('framer-v-1clfgnr');
        phoneNav.classList.add('framer-v-8lkanp');
        menuButtons.forEach(btn => {
          btn.classList.remove('framer-v-sgx2z6');
          btn.classList.add('framer-v-14br5d7');
        });
      });
    });
  }

  // 3. Universal Framer Accordion Handler
  document.querySelectorAll('[data-framer-name="Closed"], [data-framer-name="Open"]').forEach(item => {
    item.style.cursor = 'pointer';
    const answer = item.querySelector('[data-framer-name="Answer"]');
    const icon = item.querySelector('svg, [data-framer-name*="Icon"], [data-framer-name*="Arrow"]');

    item.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      
      const isCurrentlyClosed = item.classList.contains('framer-v-czg96') || item.getAttribute('data-framer-name') === 'Closed';
      
      if (isCurrentlyClosed) {
        item.classList.remove('framer-v-czg96');
        item.setAttribute('data-framer-name', 'Open');
        if (answer) {
          answer.style.opacity = '1';
          answer.style.height = 'auto';
        }
        if (icon) {
          icon.style.transition = 'transform 0.25s ease';
          icon.style.transform = 'rotate(180deg)';
        }
      } else {
        item.classList.add('framer-v-czg96');
        item.setAttribute('data-framer-name', 'Closed');
        if (answer) {
          answer.style.opacity = '0';
          answer.style.height = '1px';
        }
        if (icon) {
          icon.style.transition = 'transform 0.25s ease';
          icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // 4. Carousel Handler
  document.querySelectorAll('.framer--carousel-controls').forEach(controls => {
    const carousel = controls.previousElementSibling || controls.parentElement.querySelector('.framer--carousel');
    if (!carousel) return;
    const prevBtn = controls.querySelector('button[aria-label="Previous"]');
    const nextBtn = controls.querySelector('button[aria-label="Next"]');
    
    function updateControls() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (prevBtn) {
        const canPrev = carousel.scrollLeft > 10;
        prevBtn.style.opacity = canPrev ? '1' : '0';
        prevBtn.style.pointerEvents = canPrev ? 'auto' : 'none';
        prevBtn.style.cursor = canPrev ? 'pointer' : 'default';
      }
      if (nextBtn) {
        const canNext = carousel.scrollLeft < maxScroll - 10;
        nextBtn.style.opacity = canNext ? '1' : '0';
        nextBtn.style.pointerEvents = canNext ? 'auto' : 'none';
        nextBtn.style.cursor = canNext ? 'pointer' : 'default';
      }
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        carousel.scrollBy({ left: -360, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        carousel.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }
    carousel.addEventListener('scroll', updateControls);
    updateControls();
  });

  // 5. Netlify Form Ajax Submission
  const contactForm = document.querySelector('form[data-netlify="true"]');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn ? submitBtn.querySelector('p') : null;
      const originalText = submitText ? submitText.textContent : 'Wyślij wiadomość';
      if (submitText) submitText.textContent = 'Wysyłanie...';
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        if (response.ok) {
          contactForm.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; background: #fafafa; border-radius: 12px; border: 1px solid #e5e5e5;">
              <h3 style="font-size: 22px; margin-bottom: 12px; color: #111;">Wiadomość została wysłana!</h3>
              <p style="font-size: 16px; color: #666; line-height: 1.5;">Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe.</p>
            </div>
          `;
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        alert('Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.');
        if (submitText) submitText.textContent = originalText;
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
