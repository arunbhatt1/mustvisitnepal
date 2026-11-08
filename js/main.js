'use strict';

/**
 * Must Visit Nepal - Main Script
 * Handles partial injection, navigation, package rendering, and dynamic trek templates.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPartials();
  initNewsletter();
  initIndexPackages();
  initTrekDetail();
});

/**
 * Loads shared header and footer partials via fetch, sets active page, and initializes mobile nav.
 */
async function initPartials() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (headerPlaceholder) {
    try {
      const res = await fetch('partials/header.html');
      if (res.ok) {
        headerPlaceholder.innerHTML = await res.text();
        highlightActiveNav();
        setupMobileNav();
      }
    } catch (err) {
      // In local file:// protocol where fetch is restricted by browser CORS,
      // static fallback in HTML remains visible.
      console.warn('Header partial could not be fetched (likely file:// protocol):', err);
      highlightActiveNav();
      setupMobileNav();
    }
  } else {
    highlightActiveNav();
    setupMobileNav();
  }

  if (footerPlaceholder) {
    try {
      const res = await fetch('partials/footer.html');
      if (res.ok) {
        footerPlaceholder.innerHTML = await res.text();
      }
    } catch (err) {
      console.warn('Footer partial could not be fetched:', err);
    }
  }
}

/**
 * Highlights current page in navigation using aria-current="page".
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav a, nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (!linkPath) return;

    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html') ||
      (currentPath === 'trek.html' && linkPath === 'offers.html')
    ) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Sets up accessible mobile navigation hamburger toggle.
 */
function setupMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('open');
    });
  }
}

/**
 * Shared newsletter subscription form handler.
 */
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;

  if (window.attachErrorClearingListeners) {
    window.attachErrorClearingListeners(newsletterForm);
  }

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const rules = {
      newsletter_email: {
        required: true,
        type: 'email',
        label: 'Email',
        requiredMessage: 'Please enter your email address.',
        invalidMessage: 'Please enter a valid email address.'
      }
    };

    const isValid = window.validateForm ? window.validateForm(newsletterForm, rules) : true;
    if (!isValid) return;

    // TODO: connect Formspree/Netlify Forms endpoint here
    const input = newsletterForm.querySelector('#newsletter_email');
    const successBox = document.getElementById('newsletter-success');

    if (successBox) {
      successBox.removeAttribute('hidden');
      successBox.textContent = 'Thank you! You are subscribed to our seasonal trail reports.';
    }

    newsletterForm.reset();
  });
}

/**
 * Loads treks from data/treks.json and renders cards into #packages-container.
 */
async function initIndexPackages() {
  const container = document.getElementById('packages-container');
  if (!container) return;

  try {
    const res = await fetch('data/treks.json');
    if (!res.ok) throw new Error('Failed to load treks data');
    const treks = await res.json();

    container.innerHTML = treks.map(trek => {
      const priceText = trek.priceUSD ? `$${trek.priceUSD} USD` : 'Contact for pricing';
      return `
        <article class="box">
          <div class="box-image-wrap">
            <picture>
              <source srcset="${trek.image}.webp" type="image/webp">
              <img src="${trek.image}.jpg" alt="${escapeHtml(trek.imageAlt)}" width="840" height="560" loading="lazy">
            </picture>
          </div>
          <div class="box-content">
            <div class="box-meta">
              <span class="badge">${trek.days} Days</span>
              <span class="badge badge-alt">${trek.difficulty}</span>
              <span class="badge badge-alt">${trek.style}</span>
            </div>
            <h3><a href="trek.html?slug=${trek.slug}">${escapeHtml(trek.name)}</a></h3>
            <p>${escapeHtml(trek.summary)}</p>
            <div class="box-footer">
              <span class="price-tag">${priceText}</span>
              <a href="trek.html?slug=${trek.slug}" class="btn">View Trek</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  } catch (err) {
    console.warn('Could not dynamically load index packages:', err);
  }
}

/**
 * Renders single trek details on trek.html based on ?slug=...
 */
async function initTrekDetail() {
  const container = document.getElementById('trek-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'langtang';

  try {
    const res = await fetch('data/treks.json');
    if (!res.ok) throw new Error('Failed to load treks data');
    const treks = await res.json();
    const trek = treks.find(t => t.slug === slug);

    if (!trek) {
      renderTrekNotFound(container, slug);
      return;
    }

    // Dynamic Title & Meta Description
    document.title = `${trek.name} | Must Visit Nepal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${trek.name} - ${trek.days} days teahouse trek in Nepal. ${trek.summary}`);
    }

    const priceText = trek.priceUSD ? `$${trek.priceUSD} USD per person` : 'Custom quote based on group size';

    const highlightsHtml = trek.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('');
    const includedHtml = trek.included.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    const excludedHtml = trek.excluded.map(e => `<li>${escapeHtml(e)}</li>`).join('');
    const permitsHtml = trek.permits.map(p => `<li>${escapeHtml(p)}</li>`).join('');

    const itineraryHtml = trek.itinerary.map(item => `
      <li class="itinerary-item">
        <h3>Day ${item.day}: ${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </li>
    `).join('');

    container.innerHTML = `
      <article class="trek-detail">
        <header class="trek-header">
          <h1>${escapeHtml(trek.name)}</h1>
          <p class="section-intro">${escapeHtml(trek.tagline)}</p>
          <div class="trek-meta-bar">
            <span class="badge">${trek.days} Days</span>
            <span class="badge badge-alt">${trek.difficulty}</span>
            <span class="badge badge-alt">${trek.style} trek</span>
            <span class="badge badge-alt">Max: ${trek.maxAltitudeM} m</span>
            <span class="badge badge-alt">Distance: ~${trek.distanceKm} km</span>
            <span class="badge badge-alt">Season: ${escapeHtml(trek.season)}</span>
          </div>
        </header>

        <figure class="trek-hero-image">
          <picture>
            <source srcset="${trek.image}.webp" type="image/webp">
            <img src="${trek.image}.jpg" alt="${escapeHtml(trek.imageAlt)}" width="840" height="560">
          </picture>
          <figcaption>${escapeHtml(trek.imageAlt)}</figcaption>
        </figure>

        <section class="trek-overview">
          <h2>Trek Overview</h2>
          <p class="trek-summary">${escapeHtml(trek.summary)}</p>
        </section>

        <section class="trek-highlights-box">
          <h2>Key Highlights</h2>
          <ul>${highlightsHtml}</ul>
        </section>

        <section class="itinerary">
          <h2>Day-by-Day Itinerary</h2>
          <ol class="itinerary-list">
            ${itineraryHtml}
          </ol>
        </section>

        <section class="trek-inclusions-grid">
          <div class="inclusion-card included">
            <h3>What Is Included</h3>
            <ul>${includedHtml}</ul>
          </div>
          <div class="inclusion-card excluded">
            <h3>What Is Excluded</h3>
            <ul>${excludedHtml}</ul>
          </div>
        </section>

        <section class="trek-permits-box">
          <h2>Permits &amp; Fees</h2>
          <p>The following official permits are arranged by our office prior to departure:</p>
          <ul>${permitsHtml}</ul>
        </section>

        <div class="trek-cta-bar">
          <div>
            <p><strong>Pricing:</strong> ${priceText}</p>
          </div>
          <a href="booking.html?package=${trek.slug}" class="btn">Book This Trek</a>
          <a href="contact.html" class="btn btn-secondary">Ask a Question</a>
        </div>
      </article>
    `;
  } catch (err) {
    console.error('Error rendering trek details:', err);
  }
}

/**
 * Friendly 404 block for unrecognized trek slug.
 */
function renderTrekNotFound(container, slug) {
  document.title = 'Trek Not Found | Must Visit Nepal';
  container.innerHTML = `
    <div class="form-card container-narrow" style="text-align: left; margin-inline: auto;">
      <h2>Trek Route Not Found</h2>
      <p>We could not find a trek route matching <code>${escapeHtml(slug)}</code>.</p>
      <p>Browse our verified trekking routes below:</p>
      <ul class="mt-1 mb-3" style="padding-left: 1.5rem;">
        <li><a href="trek.html?slug=langtang">Langtang Valley Trek (7 Days)</a></li>
        <li><a href="trek.html?slug=annapurna">Annapurna Base Camp (10 Days)</a></li>
        <li><a href="trek.html?slug=everest">Everest Base Camp (14 Days)</a></li>
        <li><a href="trek.html?slug=tilicho">Tilicho / ABC Circuit (12 Days)</a></li>
      </ul>
      <a href="index.html" class="btn">Return to Home</a>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
