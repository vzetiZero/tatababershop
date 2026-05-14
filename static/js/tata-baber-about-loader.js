(function () {
    const config = window.tataBaberConfig || {};
    const table = config.tables && config.tables.aboutImages ? config.tables.aboutImages : 'tata_baber_about_images';
    const localKey = config.localKeys && config.localKeys.aboutImages ? config.localKeys.aboutImages : 'tata_baber_about_images';
    const defaults = config.defaultAboutImages || [];

    const normalizeImages = (images) => {
        const source = Array.isArray(images) && images.length ? images : defaults;
        return source
            .filter((item) => item && item.active !== false && item.image_url)
            .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
            .map((item, index) => ({
                id: item.id || ('about-image-' + index),
                sort_order: Number(item.sort_order || index + 1),
                active: item.active !== false,
                image_url: item.image_url,
                alt_text: item.alt_text || ''
            }));
    };

    const loadImages = async () => {
        const local = config.loadLocal ? config.loadLocal(localKey, null) : null;
        if (local) return normalizeImages(local);

        if (config.isSupabaseConfigured && config.isSupabaseConfigured()) {
            try {
                const rows = await config.supabaseFetch(table + '?select=*&active=eq.true&order=sort_order.asc', {}, false);
                if (Array.isArray(rows) && rows.length) {
                    const images = normalizeImages(rows);
                    if (config.saveLocal) config.saveLocal(localKey, images);
                    return images;
                }
            } catch (error) {
                if (config.isMissingTableError && config.isMissingTableError(error)) {
                    console.info('About images table is missing in Supabase. Using default about images.');
                } else {
                    console.warn('About images fallback to defaults:', error);
                }
            }
        }

        return normalizeImages(defaults);
    };

    const renderImages = (images) => {
        const section = document.querySelector('[data-id="fc33a6d"]');
        const target = section ? section.querySelector('[data-id="d0b5168"] > .elementor-widget-wrap') : null;
        if (!target || !images.length) return;

        target.innerHTML = '';
        target.classList.add('tata-about-images');

        images.forEach((image, index) => {
            const figure = document.createElement('figure');
            figure.className = 'tata-about-image tata-about-image--' + ((index % 2) + 1);

            const img = document.createElement('img');
            img.src = image.image_url;
            img.alt = image.alt_text || 'Tata BarberShop';
            img.loading = index === 0 ? 'eager' : 'lazy';
            img.decoding = 'async';

            figure.appendChild(img);
            target.appendChild(figure);
        });
    };

    const ready = (fn) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
            return;
        }
        fn();
    };

    ready(async () => {
        const images = await loadImages();
        renderImages(images);
    });
})();


