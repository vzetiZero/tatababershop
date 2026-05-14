window.tataBaberConfig = (function () {
    const config = {
        supabaseUrl: 'https://dyyihoawqcerigmgnjbg.supabase.co',
        supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eWlob2F3cWNlcmlnbWduamJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MjAyMzQsImV4cCI6MjA5NDI5NjIzNH0.PsGYEGy8zJyrFq0hPyzybgLRv7_Hrtv15ex7armQN7M',
        supabaseServiceKey: '',
        adminTable: 'admin',
        tables: {
            heroSettings: 'tata_baber_hero_settings',
            heroSlides: 'tata_baber_hero_slides',
            aboutImages: 'tata_baber_about_images'
        },
        storageBucket: 'tata-baber',
        adminAuthKey: 'tata_baber_admin_auth',
        localKeys: {
            settings: 'tata_baber_hero_settings',
            slides: 'tata_baber_hero_slides',
            aboutImages: 'tata_baber_about_images'
        },
        defaultHeroSettings: {
            locationLabel: 'LOCATION',
            wrapperMaxWidth: 1820,
            sideGapDesktop: 0,
            sideGapTablet: 0,
            sideGapMobile: 0
        },
        defaultHeroSlides: [
            {
                id: 'hero-slide-1',
                sort_order: 1,
                active: true,
                tab_title: 'BARBERING',
                eyebrow: 'MAKE YOUR STYLE MORE EXPRESSIVE',
                title_primary: 'BARBERING',
                title_secondary: 'GROOMING & SHAVING',
                title_tertiary: 'MANICURE & SPA',
                image_url: './images-tatabarber/banner01.jpg',
                thumb_url: './images-tatabarber/banner01.jpg',
                address_html: 'Husitsk\u00e1 27, Praha 3',
                email: '',
                phone: '+420 773 338 678'
            },
            {
                id: 'hero-slide-2',
                sort_order: 2,
                active: true,
                tab_title: 'GROOMING & SHAVING',
                eyebrow: 'FROM FADES TO BUZZ CUTS',
                title_primary: 'BARBERING',
                title_secondary: 'GROOMING & SHAVING',
                title_tertiary: 'MANICURE & SPA',
                image_url: './images-tatabarber/banner01.jpg',
                thumb_url: './images-tatabarber/banner01.jpg',
                address_html: 'Husitsk\u00e1 27, Praha 3',
                email: '',
                phone: '+420 773 338 678'
            },
            {
                id: 'hero-slide-3',
                sort_order: 3,
                active: true,
                tab_title: 'MANICURE & SPA',
                eyebrow: 'PREMIUM CARE FOR EVERY DETAIL',
                title_primary: 'BARBERING',
                title_secondary: 'GROOMING & SHAVING',
                title_tertiary: 'MANICURE & SPA',
                image_url: './images-tatabarber/banner02.jpg',
                thumb_url: './images-tatabarber/banner02.jpg',
                address_html: 'Husitsk\u00e1 27, Praha 3',
                email: '',
                phone: '+420 773 338 678'
            }
        ],
        defaultAboutImages: [
            {
                id: 'about-image-1',
                sort_order: 1,
                active: true,
                image_url: 'wp-content/uploads/2023/04/about-3-1.jpg',
                alt_text: 'Tata BarberShop haircut detail'
            },
            {
                id: 'about-image-2',
                sort_order: 2,
                active: true,
                image_url: 'wp-content/uploads/2023/04/about-3-2.jpg',
                alt_text: 'Tata BarberShop grooming tools'
            }
        ]
    };

    config.normalizeHeroSettings = function (value) {
        const source = value || {};
        return Object.assign({}, config.defaultHeroSettings, {
            locationLabel: source.locationLabel || source.location_label || config.defaultHeroSettings.locationLabel,
            wrapperMaxWidth: Number(source.wrapperMaxWidth ?? source.wrapper_max_width ?? config.defaultHeroSettings.wrapperMaxWidth),
            sideGapDesktop: Number(source.sideGapDesktop ?? source.side_gap_desktop ?? config.defaultHeroSettings.sideGapDesktop),
            sideGapTablet: Number(source.sideGapTablet ?? source.side_gap_tablet ?? config.defaultHeroSettings.sideGapTablet),
            sideGapMobile: Number(source.sideGapMobile ?? source.side_gap_mobile ?? config.defaultHeroSettings.sideGapMobile)
        });
    };

    config.serializeHeroSettings = function (value) {
        const settings = config.normalizeHeroSettings(value);
        return {
            location_label: settings.locationLabel,
            wrapper_max_width: settings.wrapperMaxWidth,
            side_gap_desktop: settings.sideGapDesktop,
            side_gap_tablet: settings.sideGapTablet,
            side_gap_mobile: settings.sideGapMobile
        };
    };

    config.isSupabaseConfigured = function () {
        return Boolean(config.supabaseUrl && (config.supabaseAnonKey || config.supabaseServiceKey));
    };

    config.isMissingTableError = function (error) {
        const message = error && error.message ? error.message : String(error || '');
        return message.includes('PGRST205') || message.includes('Could not find the table');
    };

    config.resolveKey = function () {
        return config.supabaseServiceKey || config.supabaseAnonKey;
    };

    config.loadLocal = function (key, fallback) {
        try {
            const raw = window.localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch (error) {
            return fallback;
        }
    };

    config.saveLocal = function (key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('Failed to persist local hero data:', error);
        }
    };

    config.supabaseFetch = async function (endpoint, options, requireService) {
        if (!config.isSupabaseConfigured()) {
            throw new Error('Supabase is not configured.');
        }
        const key = config.resolveKey(Boolean(requireService));
        if (!key) {
            throw new Error('Missing Supabase key.');
        }

        const headers = Object.assign({
            apikey: key,
            Authorization: 'Bearer ' + key
        }, (options && options.headers) || {});

        if (options && options.body && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(config.supabaseUrl.replace(/\/$/, '') + '/rest/v1/' + endpoint, Object.assign({}, options || {}, {
            headers: headers
        }));

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || ('Supabase request failed with status ' + response.status));
        }

        const text = await response.text();
        return text ? JSON.parse(text) : null;
    };

    config.supabaseStorageUpload = async function (path, file, contentType, requireService) {
        if (!config.isSupabaseConfigured()) {
            throw new Error('Supabase is not configured.');
        }
        const key = config.resolveKey(Boolean(requireService));
        if (!key) {
            throw new Error('Missing Supabase key.');
        }

        const uploadUrl = config.supabaseUrl.replace(/\/$/, '') + '/storage/v1/object/' + config.storageBucket + '/' + path;
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                apikey: key,
                Authorization: 'Bearer ' + key,
                'Content-Type': contentType || 'application/octet-stream',
                'x-upsert': 'true'
            },
            body: file
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || ('Supabase storage upload failed with status ' + response.status));
        }

        return config.supabaseUrl.replace(/\/$/, '') + '/storage/v1/object/public/' + config.storageBucket + '/' + path;
    };

    return config;
})();

window.bladehubHeroConfig = window.tataBaberConfig;

