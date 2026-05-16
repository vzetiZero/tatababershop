(function () {
    const config = window.tataBaberConfig || {};
    const slidesKey = config.localKeys ? config.localKeys.slides : 'tata_baber_hero_slides';
    const heroSlidesTable = config.tables && config.tables.heroSlides ? config.tables.heroSlides : 'tata_baber_hero_slides';
    const defaultSettings = config.defaultHeroSettings || {};
    const defaultSlides = config.defaultHeroSlides || [];

    const assignOriginalText = (element) => {
        if (!element || !element.dataset.heroOriginalText) {
            return;
        }
        element.innerHTML = element.dataset.heroOriginalText;
    };

    const saveOriginalText = (element) => {
        if (!element || element.dataset.heroOriginalText) return;
        element.dataset.heroOriginalText = element.innerHTML;
    };

    const normalizeSettings = (value) => {
        if (config.normalizeHeroSettings) {
            return config.normalizeHeroSettings(value);
        }
        return Object.assign({}, defaultSettings, value || {});
    };
    const normalizeSlides = (slides) => {
        const fallback = defaultSlides.map((slide) => Object.assign({}, slide));
        if (!Array.isArray(slides) || slides.length === 0) return fallback;
        const source = slides
            .filter((slide) => slide)
            .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
        return source.map((slide, index) => {
            const fixedSlide = fallback[index] || {};
            return Object.assign({}, fixedSlide, slide, {
                image_url: slide.image_url || '',
                thumb_url: slide.thumb_url || slide.image_url || '',
                active: slide.active !== undefined ? slide.active : fixedSlide.active !== false,
                id: slide.id || fixedSlide.id || ('hero-slide-' + (index + 1)),
                tab_title: fixedSlide.tab_title || '',
                eyebrow: fixedSlide.eyebrow || '',
                sort_order: Number(slide.sort_order || fixedSlide.sort_order || index + 1)
            });
        }).filter((slide) => slide.active !== false);
    };

    const loadHeroSettings = async function () {
        return normalizeSettings(defaultSettings);
    };

    const loadHeroSlides = async function () {
        if (config.isSupabaseConfigured && config.isSupabaseConfigured()) {
            try {
                const rows = await config.supabaseFetch(heroSlidesTable + '?select=*&active=eq.true&order=sort_order.asc', {}, false);
                if (Array.isArray(rows) && rows.length) {
                    const slides = normalizeSlides(rows);
                    config.saveLocal(slidesKey, slides);
                    return slides;
                }
            } catch (error) {
                const message = 'Hero slides table is missing in Supabase. Using default hero slides.';
                if (config.isMissingTableError && config.isMissingTableError(error)) {
                    console.info(message);
                } else {
                    console.warn('Hero slides fallback to defaults:', error);
                }
            }
        }
        const local = config.loadLocal ? config.loadLocal(slidesKey, null) : null;
        if (local) {
            return normalizeSlides(local);
        }
        return normalizeSlides(defaultSlides);
    };

    const setSlideTitles = (slideEl, titles, keys) => {
        const primary = slideEl.querySelector('[id$="-layer-0"]');
        const secondary = slideEl.querySelector('[id$="-layer-1"]');
        const tertiary = slideEl.querySelector('[id$="-layer-2"]');

        [primary, secondary, tertiary].forEach(saveOriginalText);

        if (primary) {
            primary.innerHTML = titles[0] || '';
            primary.setAttribute('data-actions', "o:mouseenter;a:jumptoslide;slide:" + (keys[0] || 'rs-7') + ';');
            primary.style.display = titles[0] ? '' : 'none';
        }
        if (secondary) {
            secondary.innerHTML = titles[1] || '';
            secondary.setAttribute('data-actions', "o:mouseenter;a:jumptoslide;slide:" + (keys[1] || 'rs-10') + ';');
            secondary.style.display = titles[1] ? '' : 'none';
        }
        if (tertiary) {
            tertiary.innerHTML = titles[2] || '';
            tertiary.setAttribute('data-actions', "o:mouseenter;a:jumptoslide;slide:" + (keys[2] || 'rs-11') + ';');
            tertiary.style.display = titles[2] ? '' : 'none';
        }
    };

    const updateSlideIdentity = (slideEl, oldKey, newKey) => {
        if (!slideEl) return;
        slideEl.setAttribute('data-key', newKey);
        const allWithId = slideEl.querySelectorAll('[id]');
        allWithId.forEach((node) => {
            if (node.id) {
                node.id = node.id.replace(oldKey.replace('rs-', 'slide-'), newKey.replace('rs-', 'slide-'));
            }
        });
    };

    const applySlideData = (slideEl, slideData, settings, titles, slideKeys, slideKey) => {
        slideEl.setAttribute('data-title', slideData.tab_title || '');
        if (slideData.thumb_url) {
            slideEl.setAttribute('data-thumb', slideData.thumb_url);
        }

        const image = slideEl.querySelector('.rev-slidebg');
        if (image && slideData.image_url) {
            image.setAttribute('data-lazyload', slideData.image_url);
            image.setAttribute('src', slideData.image_url);
            image.removeAttribute('srcset');
            image.classList.remove('rs-lazyload');
            image.setAttribute('loading', 'eager');
            image.setAttribute('fetchpriority', 'high');
            image.style.visibility = 'visible';
            image.style.opacity = '1';
            slideEl.style.backgroundImage = 'url("' + slideData.image_url + '")';
            slideEl.style.backgroundSize = 'cover';
            slideEl.style.backgroundPosition = 'center';
        }

        const locationLayer = slideEl.querySelector('[id$="-layer-4"]');
        if (locationLayer) {
            saveOriginalText(locationLayer);
            locationLayer.innerHTML = settings.locationLabel || 'LOCATION';
        }

        const eyebrowLayer = slideEl.querySelector('[id$="-layer-3"]');
        if (eyebrowLayer) {
            saveOriginalText(eyebrowLayer);
            eyebrowLayer.innerHTML = slideData.eyebrow || '';
            eyebrowLayer.style.display = slideData.eyebrow ? '' : 'none';
        }

        setSlideTitles(slideEl, titles, slideKeys);
        updateSlideIdentity(slideEl, slideEl.getAttribute('data-key') || 'rs-7', slideKey);
    };

    const applyWrapperSettings = (wrapper, settings) => {
        if (!wrapper) return;
        const maxWidth = Number(settings.wrapperMaxWidth || 1820);
        const desktopGap = Number(settings.sideGapDesktop || 0);
        const tabletGap = Number(settings.sideGapTablet || desktopGap);
        const mobileGap = Number(settings.sideGapMobile || tabletGap);
        wrapper.style.maxWidth = maxWidth + 'px';
        wrapper.style.marginLeft = 'auto';
        wrapper.style.marginRight = 'auto';
        wrapper.style.paddingLeft = desktopGap + 'px';
        wrapper.style.paddingRight = desktopGap + 'px';

        let styleTag = document.getElementById('tata-baber-responsive-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'tata-baber-responsive-style';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = [
            '@media (max-width: 1200px) {',
            '#rev_slider_3_1_wrapper {',
            'padding-left: ' + tabletGap + 'px !important;',
            'padding-right: ' + tabletGap + 'px !important;',
            '}',
            '}',
            '@media (max-width: 767px) {',
            '#rev_slider_3_1_wrapper {',
            'padding-left: ' + mobileGap + 'px !important;',
            'padding-right: ' + mobileGap + 'px !important;',
            '}',
            '}'
        ].join('');
    };

    const applyHeroData = (settings, slides) => {
        const wrapper = document.getElementById('rev_slider_3_1_wrapper');
        const moduleEl = document.getElementById('rev_slider_3_1');
        const slidesRoot = moduleEl ? moduleEl.querySelector('rs-slides') : null;
        if (!wrapper || !moduleEl || !slidesRoot) {
            return;
        }

        const templates = Array.from(slidesRoot.querySelectorAll('rs-slide'));
        if (!templates.length) {
            return;
        }

        const baseTemplate = templates[0].cloneNode(true);
        const slideKeys = slides.map((slide, index) => 'rs-' + (7 + (index * 3)));
        const titleSet = [
            slides[0] ? slides[0].tab_title : '',
            slides[1] ? slides[1].tab_title : '',
            slides[2] ? slides[2].tab_title : ''
        ];
        const firstImage = (slides.find((slide) => slide && slide.image_url) || {}).image_url;
        if (firstImage) {
            wrapper.style.backgroundImage = 'url("' + firstImage + '")';
            wrapper.style.backgroundSize = 'cover';
            wrapper.style.backgroundPosition = 'center';
            moduleEl.style.backgroundImage = 'url("' + firstImage + '")';
            moduleEl.style.backgroundSize = 'cover';
            moduleEl.style.backgroundPosition = 'center';
        }

        slidesRoot.innerHTML = '';
        slides.forEach((slide, index) => {
            const slideEl = baseTemplate.cloneNode(true);
            const slideKey = slideKeys[index] || ('rs-' + (7 + index));
            applySlideData(slideEl, slide, settings, titleSet, slideKeys, slideKey);
            slidesRoot.appendChild(slideEl);
        });

        applyWrapperSettings(wrapper, settings);
    };

    window.tataBaberHeroReady = (async function () {
        const [settings, slides] = await Promise.all([loadHeroSettings(), loadHeroSlides()]);
        applyHeroData(settings, slides);
        return { settings: settings, slides: slides };
    })();
    window.bladehubHeroReady = window.tataBaberHeroReady;
})();


