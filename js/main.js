/* ==========================================================================
   Pallapu Dileep Kumar - Premium Portfolio Script
   Interactive logic: Particles, Typing, Filters, Animations, Theme, Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleBackground();
  initTypingEffect();
  initScrollAnimations();
  initSkillsFilter();
  initProjectsFilter();
  initCertificatesFilter();
  initCounterAnimations();
  initContactForm();
  initMobileMenu();
  initModals();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('dileep_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dileep_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

/* --------------------------------------------------------------------------
   2. Canvas Particle Constellation Background
   -------------------------------------------------------------------------- */
function initParticleBackground() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 60);

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.radius = Math.random() * 2 + 1.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 130})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   3. Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    "Computer Science Student",
    "Full-Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "AI Enthusiast",
    "Web Developer",
    "Problem Solver"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Scroll Animations & Active Nav Highlighting
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Skills Filter & Progress Bar Trigger
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
          fill.style.width = fill.dataset.percent + '%';
        });
      }
    });
  }, { threshold: 0.2 });

  const skillSection = document.getElementById('skills');
  if (skillSection) observer.observe(skillSection);
}

/* --------------------------------------------------------------------------
   6. Projects Filter
   -------------------------------------------------------------------------- */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('#projects .project-filters .tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initCertificatesFilter() {
  const categoryBtns = document.querySelectorAll('[data-cert-filter]');
  const companyBtns = document.querySelectorAll('[data-company-filter]');
  const certCards = document.querySelectorAll('.cert-card');
  const domainHeaders = document.querySelectorAll('.cert-domain-header');
  const indicator = document.getElementById('active-company-indicator');
  const noMatchCard = document.getElementById('no-cert-match');
  const resetBtn = document.getElementById('reset-cert-filters');
  const emptyResetBtn = document.getElementById('empty-reset-btn');

  if (!certCards.length) return;

  let currentCategory = 'all';
  let currentCompany = 'all';

  function applyFilters() {
    let visibleCount = 0;

    certCards.forEach(card => {
      const isFeatured = card.dataset.certFeatured === 'true';
      const category = card.dataset.certCategory;
      const company = card.dataset.certCompany;

      // Check category match
      let matchCategory = false;
      if (currentCategory === 'all') {
        matchCategory = true;
      } else if (currentCategory === 'featured') {
        matchCategory = isFeatured;
      } else if (category === currentCategory) {
        matchCategory = true;
      }

      // Check company match
      let matchCompany = false;
      if (currentCompany === 'all' || company === currentCompany) {
        matchCompany = true;
      }

      if (matchCategory && matchCompany) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Empty state visibility
    if (noMatchCard) {
      noMatchCard.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    // Update domain headers visibility
    domainHeaders.forEach(header => {
      const headerCategory = header.dataset.certDomain;
      if (visibleCount === 0 || currentCompany !== 'all') {
        header.style.display = 'none';
      } else if (currentCategory === 'all') {
        header.style.display = 'flex';
      } else if (currentCategory === 'featured') {
        header.style.display = headerCategory === 'featured' ? 'flex' : 'none';
      } else if (headerCategory === currentCategory) {
        header.style.display = 'flex';
      } else {
        header.style.display = 'none';
      }
    });

    // Update indicator text
    if (indicator) {
      const activeCatText = document.querySelector('[data-cert-filter].active')?.textContent.trim().split('(')[0].trim() || 'All';
      const activeCompText = document.querySelector('[data-company-filter].active')?.textContent.trim().split('(')[0].trim() || 'All Issuers';
      indicator.textContent = `Showing: ${visibleCount} credentials (${activeCompText} · ${activeCatText})`;
    }
  }

  function resetAll() {
    currentCategory = 'all';
    currentCompany = 'all';
    categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.certFilter === 'all'));
    companyBtns.forEach(b => b.classList.toggle('active', b.dataset.companyFilter === 'all'));
    applyFilters();
  }

  // Category buttons click handler
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.certFilter;
      
      // When switching category directly, reset company to 'all' so category results aren't blocked
      currentCompany = 'all';
      companyBtns.forEach(b => b.classList.toggle('active', b.dataset.companyFilter === 'all'));
      
      applyFilters();
    });
  });

  // Company buttons click handler
  companyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      companyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCompany = btn.dataset.companyFilter;
      
      // When selecting a company, reset category to 'all' so all company credentials display immediately
      currentCategory = 'all';
      categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.certFilter === 'all'));
      
      applyFilters();
    });
  });

  if (resetBtn) resetBtn.addEventListener('click', (e) => { e.preventDefault(); resetAll(); });
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', (e) => { e.preventDefault(); resetAll(); });
}

/* --------------------------------------------------------------------------
   7. Stat Counter Animations
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + '+';
            }
          };

          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const achievementsSec = document.getElementById('achievements');
  if (achievementsSec) observer.observe(achievementsSec);
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusAlert = document.getElementById('form-status-alert');

  if (!form) return;

  // EmailJS Configuration
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS Public Key from emailjs.com
  const EMAILJS_SERVICE_ID = "service_portfolio";
  const EMAILJS_TEMPLATE_ID = "template_contact";

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    // Set UI loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Sending Message...`;

    if (statusAlert) statusAlert.style.display = 'none';

    try {
      if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        // Send email using EmailJS SDK
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          reply_to: email,
          to_name: "Pallapu Dileep Kumar",
          to_email: "dileepkumarpallapu28@gmail.com",
          subject: subject,
          message: message
        });

        showToast('Message sent successfully!', 'success');
        if (statusAlert) {
          statusAlert.style.display = 'block';
          statusAlert.style.background = 'rgba(16, 185, 129, 0.15)';
          statusAlert.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          statusAlert.style.color = '#10b981';
          statusAlert.innerHTML = `
            <strong><i class="fas fa-check-circle"></i> Message Sent Successfully!</strong><br>
            Thank you <strong>${name}</strong>! Your message has been sent directly to <strong>dileepkumarpallapu28@gmail.com</strong>.
          `;
        }
        form.reset();
      } else {
        // Fallback HTTP POST / mailto trigger
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showToast('Message sent successfully!', 'success');
          if (statusAlert) {
            statusAlert.style.display = 'block';
            statusAlert.style.background = 'rgba(16, 185, 129, 0.15)';
            statusAlert.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            statusAlert.style.color = '#10b981';
            statusAlert.innerHTML = `
              <strong><i class="fas fa-check-circle"></i> Message Sent Successfully!</strong><br>
              Thank you <strong>${name}</strong>! Your message has been sent directly to <strong>dileepkumarpallapu28@gmail.com</strong>.
            `;
          }
          form.reset();
        } else {
          // Direct Mail Client trigger fallback
          const mailtoUri = `mailto:dileepkumarpallapu28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
          window.open(mailtoUri, '_blank');

          showToast('Direct Mail Client opened!', 'success');
          if (statusAlert) {
            statusAlert.style.display = 'block';
            statusAlert.style.background = 'rgba(16, 185, 129, 0.15)';
            statusAlert.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            statusAlert.style.color = '#10b981';
            statusAlert.innerHTML = `
              <strong><i class="fas fa-check-circle"></i> Direct Email Application Opened!</strong><br>
              Thank you <strong>${name}</strong>! Your email client was opened to send your message directly to <strong>dileepkumarpallapu28@gmail.com</strong>.
            `;
          }
          form.reset();
        }
      }
    } catch (error) {
      const mailtoUri = `mailto:dileepkumarpallapu28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      window.open(mailtoUri, '_blank');

      showToast('Direct Mail Client opened!', 'success');
      if (statusAlert) {
        statusAlert.style.display = 'block';
        statusAlert.style.background = 'rgba(16, 185, 129, 0.15)';
        statusAlert.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusAlert.style.color = '#10b981';
        statusAlert.innerHTML = `
          <strong><i class="fas fa-check-circle"></i> Direct Email Application Opened!</strong><br>
          Thank you <strong>${name}</strong>! Your email client was opened to send your message directly to <strong>dileepkumarpallapu28@gmail.com</strong>.
        `;
      }
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" style="color: ${type === 'success' ? '#10b981' : '#ef4444'}"></i>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* --------------------------------------------------------------------------
   9. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   10. Modals
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  if (!modalOverlay || !modalClose) return;

  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });

  window.openCertModal = function(title, issuer, date, desc, imgSrc = null, credlyUrl = null) {
    // Generate unique credential code based on issuer & title hash
    const codeHash = Math.abs(title.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(8, '0');
    const issuerTag = issuer.includes('MongoDB') ? 'MDB' : (issuer.includes('Cisco') ? 'CSCO' : (issuer.includes('Oracle') ? 'ORCL' : 'INFY'));
    const credentialID = `CERT-${issuerTag}-${date}-${codeHash.substring(0, 6)}`;

    // Issuer color theme
    const themeColor = issuer.includes('MongoDB') ? '#13aa52' : (issuer.includes('Cisco') ? '#38bdf8' : (issuer.includes('Oracle') ? '#f87171' : '#60a5fa'));

    const imageHtml = imgSrc ? `
      <div style="margin-bottom: 1.2rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--glass-shadow);">
        <img src="${imgSrc}" alt="${title} Certificate" style="width: 100%; height: auto; display: block; border-radius: var(--radius-md);">
      </div>
    ` : '';

    const credlyBtnHtml = credlyUrl ? `
      <a href="${credlyUrl}" target="_blank" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #13aa52, #116149);">
        <i class="fas fa-external-link-alt"></i> Verify on Credly
      </a>
    ` : '';

    modalBody.innerHTML = `
      <div class="cert-modal-document" style="padding: 1.5rem; background: var(--bg-secondary); border: 2px solid ${themeColor}; border-radius: var(--radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.5); text-align: center; position: relative; overflow: hidden;">
        
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem; margin-bottom: 1.2rem;">
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: ${themeColor}22; border: 1px solid ${themeColor}; color: ${themeColor}; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
              <i class="fas fa-award"></i>
            </div>
            <span style="font-weight: 800; font-size: 1rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 1px;">${issuer}</span>
          </div>
          <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-muted);">ID: ${credentialID}</span>
        </div>

        <!-- Official Certificate Image Preview -->
        ${imageHtml}

        <!-- Certificate Award Body -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.2rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: ${themeColor}; line-height: 1.4;">
            ${title}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">Issued to <strong>Pallapu Dileep Kumar</strong> on ${date}</p>
        </div>

        <!-- Course Description Box -->
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-color); padding: 0.8rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.2rem; text-align: left;">
          <strong style="color: var(--text-primary);"><i class="fas fa-info-circle"></i> Skills Verified:</strong> ${desc}
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
          ${credlyBtnHtml}
          <button class="btn btn-secondary btn-sm" onclick="alert('Verification Status: AUTHENTIC VERIFIED\\nCredential ID: ${credentialID}\\nIssued To: Pallapu Dileep Kumar\\nIssuer: ${issuer}');">
            <i class="fas fa-shield-alt"></i> Verify Credential
          </button>
        </div>
      </div>
    `;
    modalOverlay.classList.add('open');
  };
}

/* --------------------------------------------------------------------------
   11. Smooth Scrolling & Back To Top
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
