(function () {
    const bookingUrl = 'https://tata-barber-shop.reservio.com/';
    const siteInfo = {
        name: 'Tata BarberShop',
        logo: 'static/images/tata-logo.png',
        address: 'Husitsk\u00e1 76/27, Praha 3',
        mapUrl: 'https://www.google.com/maps?cid=3900946233643861895&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=vi&source=embed',
        phone: '+420 773 338 678',
        tel: '+420773338678',
        contactEmail: 'tatabarbershopcz@gmail.com',
        rating: '4.8/5',
        reviewCount: '1 822 reviews',
        hoursShort: 'Mon-Sat 09:00-20:00, Sun 10:00-18:30',
        hours: [
            ['Monday', '09:00 - 20:00'],
            ['Tuesday', '09:00 - 20:00'],
            ['Wednesday', '09:00 - 20:00'],
            ['Thursday', '09:00 - 20:00'],
            ['Friday', '09:00 - 20:00'],
            ['Saturday', '09:00 - 20:00'],
            ['Sunday', '10:00 - 18:30']
        ]
    };

    const ready = (fn) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
            return;
        }
        fn();
    };

    const setId = (selector, id) => {
        const element = document.querySelector(selector);
        if (element && !element.id) element.id = id;
        return element;
    };

    const mapAddressLink = (className) => {
        const classAttr = className ? ' class="' + className + '"' : '';
        return '<a' + classAttr + ' href="' + siteInfo.mapUrl + '" target="_blank" rel="noopener">' + siteInfo.address + '</a>';
    };

    const applySiteInfo = () => {
        document.title = siteInfo.name + ' | Barbershop Praha 3';

        document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
            link.href = 'tel:' + siteInfo.tel;
            link.textContent = siteInfo.phone;
        });

        document.querySelectorAll('rs-layer[id$="-layer-6"]').forEach((layer) => {
            layer.innerHTML = mapAddressLink('');
        });

        const footerAddress = document.querySelector('[data-id="4aac570"] .elementor-widget-container');
        if (footerAddress) {
            footerAddress.innerHTML = '<p>' + mapAddressLink('') + '</p>';
        }

        document.querySelectorAll('.wgl-logotype-container img, img[alt="logotype"]').forEach((image) => {
            image.src = siteInfo.logo;
            image.removeAttribute('srcset');
            image.alt = siteInfo.name;
            image.style.height = '56px';
            image.style.width = '56px';
            image.style.objectFit = 'cover';
            image.style.borderRadius = '50%';
            image.style.border = '1px solid rgba(199, 169, 110, 0.62)';
            image.style.boxShadow = 'inset 0 0 0 3px rgba(15, 15, 15, 0.18)';
            image.style.background = '#fff';
        });

        const footerContact = document.querySelector('[data-id="a13f97e"] .elementor-widget-container');
        if (footerContact) {
            footerContact.innerHTML = '<p><a href="tel:' + siteInfo.tel + '">' + siteInfo.phone + '</a><br><a href="' + bookingUrl + '" target="_blank" rel="noopener">Online booking</a></p>';
        }

        const mainContact = document.querySelector('[data-id="e770865"] .elementor-widget-container');
        if (mainContact) {
            const emailLine = siteInfo.contactEmail ? '<a href="mailto:' + siteInfo.contactEmail + '">' + siteInfo.contactEmail + '</a><br>' : '';
            mainContact.innerHTML = '<p>' + emailLine + '<a href="tel:' + siteInfo.tel + '">' + siteInfo.phone + '</a></p>';
        }

        const mainContactForm = document.querySelector('[data-id="f75a09a"] form');
        if (mainContactForm) {
            mainContactForm.setAttribute('action', '#contact');
        }

        const hoursNodes = [
            ['[data-id="8845a21"] .elementor-widget-container', 'Mon - Sat:', '09:00 - 20:00'],
            ['[data-id="89d2377"] .elementor-widget-container', 'Sunday:', '10:00 - 18:30'],
            ['[data-id="6405c07"] .elementor-widget-container', 'Booking:', 'Reservio online']
        ];
        hoursNodes.forEach(([selector, label, value]) => {
            const node = document.querySelector(selector);
            if (node) node.innerHTML = '<span style="color: #969696; margin-right: 8px;">' + label + '</span>' + value;
        });
    };

    ready(function () {
        document.body.classList.add('has-tata-nav');

        setId('[data-id="fc33a6d"]', 'about');
        const contact = setId('[data-id="c6b581f"]', 'contact');
        setId('[data-id="b34328d"]', 'location');
        const services = setId('[data-id="36bdf60"]', 'services');
        const pricing = setId('[data-id="565ff57"]', 'pricing');
        const gallery = setId('[data-id="00284d3"]', 'gallery');

        const topbar = document.createElement('header');
        topbar.className = 'tata-topbar';
        topbar.innerHTML = [
            '<a class="tata-brand" href="#main" aria-label="' + siteInfo.name + ' home">',
            '<span class="tata-brand__mark"><img src="' + siteInfo.logo + '" alt=""></span>',
            '<span>' + siteInfo.name + '</span>',
            '</a>',
            '<nav class="tata-nav" aria-label="Primary">',
            '<a href="#main">Home</a>',
            '<a href="#services">Services</a>',
            '<a href="#pricing">Pricing</a>',
            '<a href="#gallery">Gallery</a>',
            '<a href="#about">About</a>',
            '<a href="#contact">Contact</a>',
            '</nav>',
            '<a class="tata-topbar__cta" href="' + bookingUrl + '">Book Now</a>'
        ].join('');
        document.body.insertBefore(topbar, document.body.firstChild);

        const heroWrapper = document.getElementById('rev_slider_3_1_wrapper');
        if (heroWrapper && !heroWrapper.querySelector('.tata-hero-actions')) {
            const actions = document.createElement('div');
            actions.className = 'tata-hero-actions';
            actions.innerHTML = '<a href="' + bookingUrl + '">Book Now</a><a href="#services">View Services</a>';
            heroWrapper.appendChild(actions);
        }

        const mountHeroContactCard = () => {
            if (!heroWrapper) return;
            document.querySelectorAll('.tata-hero-contact-card').forEach((card) => {
                if (card.parentElement !== heroWrapper) card.remove();
            });
            if (heroWrapper.querySelector('.tata-hero-contact-card')) return;
            const contactCard = document.createElement('aside');
            contactCard.className = 'tata-hero-contact-card';
            contactCard.setAttribute('aria-label', 'Barbershop contact details');
            contactCard.innerHTML = [
                '<span class="tata-hero-contact-card__label">Location</span>',
                '<strong><a class="tata-hero-contact-card__address" href="' + siteInfo.mapUrl + '" target="_blank" rel="noopener">' + siteInfo.address + '</a></strong>',
                '<a href="tel:' + siteInfo.tel + '">' + siteInfo.phone + '</a>',
                '<div class="tata-hero-social-links" aria-label="Social links">',
                '<a class="tata-social-link tata-social-link--facebook" href="https://www.facebook.com/tatabarbershopcz" target="_blank" rel="noopener" aria-label="Tata BarberShop Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>',
                '<a class="tata-social-link tata-social-link--instagram" href="https://www.instagram.com/tata__barbershop" target="_blank" rel="noopener" aria-label="Tata BarberShop Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>',
                '</div>'
            ].join('');
            heroWrapper.appendChild(contactCard);
        };

        mountHeroContactCard();
        window.setTimeout(mountHeroContactCard, 600);
        window.setTimeout(mountHeroContactCard, 1600);
        if (window.tataBaberHeroReady && typeof window.tataBaberHeroReady.finally === 'function') {
            window.tataBaberHeroReady.finally(mountHeroContactCard);
        }

        if (heroWrapper && !document.querySelector('.tata-trust-strip')) {
            const strip = document.createElement('section');
            strip.className = 'tata-trust-strip';
            strip.setAttribute('aria-label', 'Barbershop highlights');
            strip.innerHTML = [
            '<div class="tata-trust-strip__item"><span class="tata-trust-strip__value">' + siteInfo.rating + '</span><span class="tata-trust-strip__label">' + siteInfo.reviewCount + '</span></div>',
            '<div class="tata-trust-strip__item"><span class="tata-trust-strip__value">30 min</span><span class="tata-trust-strip__label">Classic Cut</span></div>',
                '<div class="tata-trust-strip__item"><span class="tata-trust-strip__value">Open</span><span class="tata-trust-strip__label">' + siteInfo.hoursShort + '</span></div>'
            ].join('');
            heroWrapper.insertAdjacentElement('afterend', strip);
        }

        const applyBookingLink = (link) => {
            link.setAttribute('href', bookingUrl);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        };

        document.querySelectorAll('a[href="contacts.html"], a[href="#"], a[href="#booking"]').forEach((link) => {
            const label = (link.textContent || '').trim().toLowerCase();
            if (link.getAttribute('href') === '#booking' || link.getAttribute('href') === 'contacts.html' || /book|choose/.test(label)) {
                applyBookingLink(link);
            }
        });

        document.querySelectorAll('a[href^="mail:"]').forEach((link) => {
            link.setAttribute('href', link.getAttribute('href').replace(/^mail:/, 'mailto:'));
        });

        const serviceCardsSection = document.querySelector('[data-id="9080169"]');
        if (serviceCardsSection) {
            const serviceData = [
                {
                    title: "Men's Haircut",
                    description: 'Classic haircut with clean finishing and styling.',
                    price: '300 Kč',
                    duration: '50 min',
                    tone: 'blue'
                },
                {
                    title: 'Haircut & Beard Trim',
                    description: 'Complete haircut and beard trim package.',
                    price: '450 Kč',
                    duration: '60 min',
                    tone: 'purple'
                },
                {
                    title: 'Kids Haircut (Ages 5 to 10)',
                    description: 'Haircut for children from 5 to 10 years old.',
                    price: '250 Kč',
                    duration: '40 min',
                    tone: 'red'
                },
                {
                    title: 'Beard Trim',
                    description: 'Beard shaping, trimming and clean contour.',
                    price: '150 Kč',
                    duration: '20 min',
                    tone: 'gold'
                },
                {
                    title: 'Long Hair or Scissor Cut',
                    description: 'Long hair cut or full scissor haircut.',
                    price: '400 Kč',
                    duration: '60 min',
                    tone: 'gray'
                }
            ];
            serviceCardsSection.querySelectorAll('.wgl-infobox_wrapper').forEach((card, index) => {
                const data = serviceData[index];
                const column = card.closest('.elementor-column');
                if (!data) {
                    if (column) column.style.display = 'none';
                    return;
                }
                const title = card.querySelector('.wgl-infobox_title-idle');
                const content = card.querySelector('.wgl-infobox_content');
                const link = card.querySelector('.wgl-infobox_button span');
                card.classList.add('tata-service-card', 'tata-service-card--' + data.tone);
                if (title) title.textContent = data.title;
                if (content) content.innerHTML = '<p>' + data.description + '</p>';
                if (link) link.textContent = 'Reserve';
                if (card.querySelector('.tata-service-meta')) return;
                const meta = document.createElement('div');
                meta.className = 'tata-service-meta';
                meta.innerHTML = '<span>' + data.price + '</span><span>Reservio</span>';
                card.appendChild(meta);
            });
        }

        const pricingSection = document.querySelector('[data-id="e1c0b4b"]');
        if (pricingSection && !pricingSection.querySelector('.tata-reservio-pricing')) {
            const pricingContainer = pricingSection.querySelector('.elementor-container');
            if (pricingContainer) {
                const servicesForPricing = [
                    ['01', "Men's Haircut", 'Classic haircut with clean finishing and styling.', '300 Kč', '50 min', 'blue'],
                    ['02', 'Haircut & Beard Trim', 'Complete haircut and beard trim package.', '450 Kč', '60 min', 'purple'],
                    ['03', 'Kids Haircut (Ages 5 to 10)', 'Haircut for children from 5 to 10 years old.', '250 Kč', '40 min', 'red'],
                    ['04', 'Beard Trim', 'Beard shaping, trimming and clean contour.', '150 Kč', '20 min', 'gold'],
                    ['05', 'Long Hair or Scissor Cut', 'Long hair cut or full scissor haircut.', '400 Kč', '60 min', 'gray']
                ];
                pricingContainer.innerHTML = [
                    '<div class="tata-reservio-pricing">',
                    servicesForPricing.map((item) => [
                        '<article class="tata-reservio-service tata-reservio-service--' + item[5] + '">',
                        '<div class="tata-reservio-service__icon">' + item[0] + '</div>',
                        '<div class="tata-reservio-service__body">',
                        '<h3>' + item[1] + '</h3>',
                        '<p>' + item[2] + '</p>',
                        '<a href="https://tata-barber-shop.reservio.com/#services-section" target="_blank" rel="noopener">Show details</a>',
                        '</div>',
                        '<div class="tata-reservio-service__meta"><span>' + item[3] + '</span><small>' + item[4] + '</small></div>',
                        '<a class="tata-reservio-service__button" href="https://tata-barber-shop.reservio.com/#services-section" target="_blank" rel="noopener">Reserve</a>',
                        '</article>'
                    ].join('')).join(''),
                    '</div>'
                ].join('');
            }
        }

        const dedupeGalleryLightbox = () => {
            document.querySelectorAll('#portfolio_module_698cb3e18eb6a .swiper-slide-duplicate a[data-elementor-lightbox-slideshow]').forEach((link) => {
                link.removeAttribute('data-elementor-open-lightbox');
                link.removeAttribute('data-elementor-lightbox-slideshow');
            });
        };

        dedupeGalleryLightbox();
        window.setTimeout(dedupeGalleryLightbox, 500);

        window.setTimeout(function () {
            if (typeof window.tataApplyLanguage === 'function') {
                window.tataApplyLanguage(window.localStorage.getItem('bladehubLang') || 'uk');
            }
        }, 0);

        const pricingCards = document.querySelectorAll('.elementor-widget-wgl-pricing-table');
        if (pricingCards[1] && !pricingCards[1].querySelector('.tata-popular-badge')) {
            pricingCards[1].classList.add('tata-most-popular');
            const badge = document.createElement('div');
            badge.className = 'tata-popular-badge';
            badge.textContent = 'Most Popular';
            const wrapper = pricingCards[1].querySelector('.pricing__wrapper');
            if (wrapper) wrapper.prepend(badge);
        }

        document.querySelectorAll('.wpcf7 form').forEach((form) => {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                let message = form.querySelector('.tata-form-message');
                if (!message) {
                    message = document.createElement('div');
                    message.className = 'tata-form-message';
                    form.appendChild(message);
                }

                const setFormMessage = (text) => {
                    message.textContent = text;
                    if (window.tataApplyLanguage) {
                        window.tataApplyLanguage(window.localStorage.getItem('bladehubLang') || 'uk');
                    }
                };

                const required = Array.from(form.querySelectorAll('[aria-required="true"]'));
                const empty = required.find((input) => !String(input.value || '').trim());
                if (empty) {
                    setFormMessage('Please fill in the required fields before booking.');
                    empty.focus();
                    return;
                }

                if (form.closest('[data-id="c6b581f"]')) {
                    if (!siteInfo.contactEmail) {
                        setFormMessage('Email receiving address is not configured yet.');
                        return;
                    }

                    const name = form.querySelector('[name="label-name"]')?.value || '';
                    const email = form.querySelector('[name="label-email"]')?.value || '';
                    const phone = form.querySelector('[name="label-website"]')?.value || '';
                    const comment = form.querySelector('[name="label-textarea"]')?.value || '';
                    const body = [
                        'Name: ' + name,
                        'Email: ' + email,
                        phone ? 'Phone: ' + phone : '',
                        '',
                        comment
                    ].filter(Boolean).join('\n');

                    setFormMessage('Opening your email app...');
                    window.location.href = 'mailto:' + siteInfo.contactEmail + '?subject=' + encodeURIComponent('New website contact') + '&body=' + encodeURIComponent(body);
                    return;
                }

                setFormMessage('Opening booking calendar...');
                window.open(bookingUrl, '_blank', 'noopener');
            }, true);
        });

        if (!document.querySelector('.tata-floating-actions')) {
            const floating = document.createElement('div');
            floating.className = 'tata-floating-actions';
            floating.innerHTML = '<a class="tata-floating-book" href="' + bookingUrl + '" target="_blank" rel="noopener">Book Now</a><a class="tata-floating-call" href="tel:' + siteInfo.tel + '">Call Now</a>';
            document.body.appendChild(floating);
        }

        document.querySelectorAll('img:not([loading])').forEach((img) => {
            if (!img.closest('#rev_slider_3_1_wrapper')) img.loading = 'lazy';
        });

        applySiteInfo();
    });
})();

