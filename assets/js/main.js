/**
 * MANGO DIGITAL — Script Principal (Vanilla JavaScript)
 * Funcionalidades frontend: Navegación, FAQ accordion, filtros, formulario, interacción
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFaqAccordion();
  initPortfolioFilters();
  initHeroPresenceFlow();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initBudgetCalculator();
});

/**
 * 1. Sticky Header con detección de scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Menú Móvil con gestión de accesibilidad
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    // Cambiar icono hamburguesa / cerrar
    const icon = toggleBtn.querySelector('svg');
    if (icon) {
      if (isOpen) {
        icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      } else {
        icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    }
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Cerrar al hacer clic en un enlace del drawer
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Cerrar al hacer clic en el backdrop oscuro
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      toggleMenu(false);
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. FAQ Accordion accesible
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Opcional: cerrar los demás items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/**
 * 4. Filtro de proyectos en portfolio
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 5. Secuencia visual interactiva del Hero: Presencia Digital Conectada
 */
function initHeroPresenceFlow() {
  const nodes = document.querySelectorAll('.chain-node');
  if (!nodes.length) return;

  let currentIndex = 0;
  
  // Resaltado cíclico sutil para ilustrar el flujo integral
  setInterval(() => {
    nodes.forEach((n, idx) => {
      if (idx === currentIndex) {
        n.style.borderColor = 'rgba(0, 153, 255, 0.7)';
        n.style.backgroundColor = 'rgba(0, 153, 255, 0.12)';
      } else {
        n.style.borderColor = '';
        n.style.backgroundColor = '';
      }
    });
    currentIndex = (currentIndex + 1) % nodes.length;
  }, 2200);
}

/**
 * 6. Formulario de Contacto Frontend con validación y respuesta clara
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener campos
    const name = form.querySelector('#contactName')?.value.trim();
    const email = form.querySelector('#contactEmail')?.value.trim();
    const phone = form.querySelector('#contactPhone')?.value.trim();
    const service = form.querySelector('#contactService')?.value;
    const privacy = form.querySelector('#contactPrivacy')?.checked;

    // Validación básica de campos obligatorios
    if (!name || !email || !privacy) {
      showFeedback('Por favor, completa los campos requeridos y acepta la política de privacidad.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Por favor, introduce un correo electrónico válido.', 'error');
      return;
    }

    // Estado visual de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando mensaje...';
    }

    // Simulación de respuesta inmediata frontend (preparado para backend Laravel / API)
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      showFeedback(`¡Gracias por contactar, ${name}! Hemos recibido tu consulta sobre "${service || 'Presencia Digital'}". Nuestro equipo de Mango Digital en Tarragona te responderá en menos de 24 horas laborables.`, 'success');
      form.reset();
    }, 800);
  });

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * 7. Botón Back to Top
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 8. Scroll suave para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 9. Calculadora de Presupuesto Interactiva
 */
function initBudgetCalculator() {
  const calcContainer = document.getElementById('budgetCalculator');
  if (!calcContainer) return;

  // Elementos del DOM
  const baseCards = calcContainer.querySelectorAll('.calc-radio-card[data-type="base"]');
  const urgencyCards = calcContainer.querySelectorAll('.calc-radio-card[data-type="urgency"]');
  const moduleCards = calcContainer.querySelectorAll('.calc-check-card');
  const pagesSlider = document.getElementById('extraPagesRange');
  const pagesBadge = document.getElementById('extraPagesCount');
  const pagesCostLabel = document.getElementById('extraPagesCost');

  const totalAmountEl = document.getElementById('calcTotalAmount');
  const deliveryBadgeEl = document.getElementById('calcDeliveryBadge');
  const breakdownListEl = document.getElementById('calcBreakdownList');

  const openModalBtn = document.getElementById('openQuoteModalBtn');
  const quoteModal = document.getElementById('quoteModal');
  const closeModalBtn = document.getElementById('closeQuoteModalBtn');
  const quoteForm = document.getElementById('calculatorQuoteForm');
  const quoteSummaryField = document.getElementById('quoteSummaryField');
  const copyQuoteBtn = document.getElementById('copyQuoteBtn');
  const printQuoteBtn = document.getElementById('printQuoteBtn');
  const toastEl = document.getElementById('calcToast');

  // Estado de la calculadora
  const state = {
    baseId: 'web-profesional',
    baseName: 'Web Profesional Completa',
    basePrice: 890,
    baseDelivery: '3 a 4 semanas',
    extraPages: 0,
    pagePrice: 50,
    modules: [],
    urgencyMultiplier: 1.0,
    urgencyName: 'Estándar',
    urgencyNotice: '',
    total: 890
  };

  // Base selection handler
  baseCards.forEach(card => {
    card.addEventListener('click', () => {
      baseCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      state.baseId = card.dataset.id || 'web-profesional';
      state.baseName = card.dataset.name || 'Web Profesional Completa';
      state.basePrice = parseFloat(card.dataset.price) || 890;
      state.baseDelivery = card.dataset.delivery || '3 a 4 semanas';

      calculateTotal();
    });
  });

  // Slider extra pages
  if (pagesSlider && pagesBadge) {
    pagesSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 0;
      state.extraPages = val;
      pagesBadge.textContent = `${val} ${val === 1 ? 'página' : 'páginas'}`;
      if (pagesCostLabel) {
        pagesCostLabel.textContent = val > 0 ? `+${val * state.pagePrice} €` : '0 €';
      }
      calculateTotal();
    });
  }

  // Modules checkbox handler
  moduleCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      card.classList.toggle('checked', checkbox.checked);

      updateModulesState();
      calculateTotal();
    });
  });

  function updateModulesState() {
    state.modules = [];
    moduleCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        state.modules.push({
          id: card.dataset.id,
          name: card.dataset.name,
          price: parseFloat(card.dataset.price) || 0
        });
      }
    });
  }

  // Urgency selection handler
  urgencyCards.forEach(card => {
    card.addEventListener('click', () => {
      urgencyCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      state.urgencyMultiplier = parseFloat(card.dataset.multiplier) || 1.0;
      state.urgencyName = card.dataset.name || 'Estándar';
      state.urgencyNotice = card.dataset.notice || '';

      calculateTotal();
    });
  });

  // Format currency
  function formatMoney(amount) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Calculate & Render
  function calculateTotal() {
    let subtotal = state.basePrice;

    // Extra pages
    const pagesCost = state.extraPages * state.pagePrice;
    subtotal += pagesCost;

    // Addons
    const modulesCost = state.modules.reduce((sum, mod) => sum + mod.price, 0);
    subtotal += modulesCost;

    // Urgency
    let urgencyExtra = 0;
    if (state.urgencyMultiplier > 1.0) {
      urgencyExtra = Math.round(subtotal * (state.urgencyMultiplier - 1));
    }
    const finalTotal = subtotal + urgencyExtra;
    state.total = finalTotal;

    // Update total amount in UI
    if (totalAmountEl) {
      totalAmountEl.textContent = formatMoney(finalTotal);
    }

    // Delivery text
    if (deliveryBadgeEl) {
      let deliveryText = state.baseDelivery;
      if (state.urgencyMultiplier > 1.0) {
        deliveryText = `⚡ Express: ~${Math.max(1, Math.round(parseInt(state.baseDelivery, 10) / 2 || 2))} semanas (prioritario)`;
      } else {
        deliveryText = `⏱️ Plazo estimado: ${state.baseDelivery}`;
      }
      deliveryBadgeEl.textContent = deliveryText;
    }

    // Update Breakdown
    if (breakdownListEl) {
      breakdownListEl.innerHTML = '';

      // Base
      appendBreakdownItem(state.baseName, formatMoney(state.basePrice));

      // Extra pages
      if (state.extraPages > 0) {
        appendBreakdownItem(`${state.extraPages} Páginas adicionales`, `+${formatMoney(pagesCost)}`);
      }

      // Modules
      state.modules.forEach(mod => {
        appendBreakdownItem(mod.name, `+${formatMoney(mod.price)}`);
      });

      // Urgency
      if (urgencyExtra > 0) {
        appendBreakdownItem('Entrega Express Prioritaria (+15%)', `+${formatMoney(urgencyExtra)}`);
      }
    }

    // Update quote summary text
    generateQuoteSummaryText();
  }

  function appendBreakdownItem(name, price) {
    const li = document.createElement('li');
    li.className = 'calc-breakdown-item';
    li.innerHTML = `
      <span class="calc-item-name">${escapeHtml(name)}</span>
      <span class="calc-item-price">${price}</span>
    `;
    breakdownListEl.appendChild(li);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function generateQuoteSummaryText() {
    let summary = `PRESUPUESTO ESTIMADO — MANGO DIGITAL\n`;
    summary += `----------------------------------------\n`;
    summary += `• Proyecto base: ${state.baseName} (${formatMoney(state.basePrice)})\n`;
    if (state.extraPages > 0) {
      summary += `• Páginas extra: ${state.extraPages} (+${formatMoney(state.extraPages * state.pagePrice)})\n`;
    }
    if (state.modules.length > 0) {
      summary += `• Módulos opcionales:\n`;
      state.modules.forEach(m => {
        summary += `   - ${m.name}: +${formatMoney(m.price)}\n`;
      });
    }
    summary += `• Tipo de entrega: ${state.urgencyName}\n`;
    summary += `• Plazo estimado: ${state.baseDelivery}\n`;
    summary += `----------------------------------------\n`;
    summary += `TOTAL ESTIMADO: ${formatMoney(state.total)} (+ IVA orientativo)\n`;

    if (quoteSummaryField) {
      quoteSummaryField.value = summary;
    }

    return summary;
  }

  // Toast feedback
  function showToast(message) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-text').textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // Copy Quote Breakdown
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', () => {
      const summaryText = generateQuoteSummaryText();
      navigator.clipboard.writeText(summaryText)
        .then(() => showToast('✓ Presupuesto copiado al portapapeles'))
        .catch(() => showToast('Presupuesto generado correctamente'));
    });
  }

  // Print Quote
  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Modal Open & Close
  if (openModalBtn && quoteModal) {
    openModalBtn.addEventListener('click', () => {
      generateQuoteSummaryText();
      quoteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstInput = quoteModal.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    });
  }

  if (closeModalBtn && quoteModal) {
    closeModalBtn.addEventListener('click', () => {
      quoteModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && quoteModal.classList.contains('open')) {
        quoteModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Quote Form Submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = quoteForm.querySelector('#calcName');
      const emailInput = quoteForm.querySelector('#calcEmail');
      const phoneInput = quoteForm.querySelector('#calcPhone');

      if (!nameInput.value.trim()) {
        nameInput.focus();
        return;
      }
      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        emailInput.focus();
        return;
      }

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando solicitud...';

      setTimeout(() => {
        const refNumber = 'MG-' + Math.floor(100000 + Math.random() * 900000);
        quoteModal.querySelector('.calc-modal-content').innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(0, 153, 255, 0.1); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="kicker" style="color: var(--color-primary);">Propuesta Recibida</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">¡Gracias, ${escapeHtml(nameInput.value.trim())}!</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
              Hemos recibido tu configuración estimada de <strong>${formatMoney(state.total)}</strong>. Uno de nuestros consultores de Tarragona revisará los detalles y te enviará una propuesta formal cerrada a <strong>${escapeHtml(emailInput.value.trim())}</strong> en menos de 24 horas laborables.
            </p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: #64748B;">
              <strong>Referencia:</strong> <span style="font-family: monospace; color: var(--color-dark);">${refNumber}</span> · Sin compromiso ni permanencia.
            </div>
            <button type="button" class="btn btn-primary" onclick="document.getElementById('quoteModal').classList.remove('open'); document.body.style.overflow = '';">
              Entendido, volver a la web
            </button>
          </div>
        `;
      }, 700);
    });
  }

  // Ejecutar cálculo inicial
  calculateTotal();
}

