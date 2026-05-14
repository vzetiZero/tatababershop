(function () {
    const config = window.tataBaberConfig;
    if (!config) return;
    const heroSettingsTable = config.tables && config.tables.heroSettings ? config.tables.heroSettings : 'tata_baber_hero_settings';
    const heroSlidesTable = config.tables && config.tables.heroSlides ? config.tables.heroSlides : 'tata_baber_hero_slides';
    const aboutImagesTable = config.tables && config.tables.aboutImages ? config.tables.aboutImages : 'tata_baber_about_images';
    const adminTable = config.adminTable || 'admin';

    const state = {
        currentSlides: [],
        aboutImages: []
    };

    const heroForm = document.getElementById('heroSettingsForm');
    const slidesContainer = document.getElementById('heroSlidesList');
    const addSlideBtn = document.getElementById('addHeroSlideBtn');
    const saveSettingsBtn = document.getElementById('saveHeroSettingsBtn');
    const saveSlidesBtn = document.getElementById('saveHeroSlidesBtn');
    const aboutImagesContainer = document.getElementById('aboutImagesList');
    const addAboutImageBtn = document.getElementById('addAboutImageBtn');
    const saveAboutImagesBtn = document.getElementById('saveAboutImagesBtn');
    const syncStatus = document.getElementById('syncStatus');
    const loginView = document.getElementById('loginView');
    const adminView = document.getElementById('adminView');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');

    const setStatus = (text, type) => {
        if (!syncStatus) return;
        syncStatus.textContent = text;
        syncStatus.dataset.type = type || 'info';
    };

    const requireAdmin = config.isSupabaseConfigured();

    const renderSlides = () => {
        if (!slidesContainer) return;
        slidesContainer.innerHTML = '';
        state.currentSlides
            .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
            .forEach((slide, index) => {
                const card = document.createElement('article');
                card.className = 'hero-slide-card';
                card.innerHTML = `
                    <div class="hero-slide-header">
                        <strong>Slide ${index + 1}</strong>
                        <button type="button" class="danger" data-action="remove" data-id="${slide.id}">Remove</button>
                    </div>
                    <label>Tab Title<input type="text" data-field="tab_title" data-id="${slide.id}" value="${slide.tab_title || ''}"></label>
                    <label>Eyebrow<input type="text" data-field="eyebrow" data-id="${slide.id}" value="${slide.eyebrow || ''}"></label>
                    <label>Hero Image URL<input type="text" data-field="image_url" data-id="${slide.id}" value="${slide.image_url || ''}" readonly></label>
                    <label>Upload Hero Image<input type="file" accept="image/*" data-upload="image_url" data-id="${slide.id}"></label>
                    <label>Thumb URL<input type="text" data-field="thumb_url" data-id="${slide.id}" value="${slide.thumb_url || ''}" readonly></label>
                    <label>Upload Thumb Image<input type="file" accept="image/*" data-upload="thumb_url" data-id="${slide.id}"></label>
                    <label>Phone<input type="text" data-field="phone" data-id="${slide.id}" value="${slide.phone || ''}"></label>
                    <label>Email<input type="text" data-field="email" data-id="${slide.id}" value="${slide.email || ''}"></label>
                    <label>Address HTML<textarea data-field="address_html" data-id="${slide.id}" rows="3">${slide.address_html || ''}</textarea></label>
                    <label>Sort Order<input type="number" data-field="sort_order" data-id="${slide.id}" value="${slide.sort_order || index + 1}"></label>
                    <label class="checkbox-row"><input type="checkbox" data-field="active" data-id="${slide.id}" ${slide.active !== false ? 'checked' : ''}> Active</label>
                `;
                slidesContainer.appendChild(card);
            });
    };

    const renderAboutImages = () => {
        if (!aboutImagesContainer) return;
        aboutImagesContainer.innerHTML = '';
        state.aboutImages
            .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
            .forEach((image, index) => {
                const card = document.createElement('article');
                card.className = 'hero-slide-card';
                card.innerHTML = `
                    <div class="hero-slide-header">
                        <strong>About Image ${index + 1}</strong>
                        <button type="button" class="danger" data-about-action="remove" data-id="${image.id}">Remove</button>
                    </div>
                    <label>Image URL<input type="text" data-about-field="image_url" data-id="${image.id}" value="${image.image_url || ''}" readonly></label>
                    <label>Upload Image<input type="file" accept="image/*" data-about-upload="image_url" data-id="${image.id}"></label>
                    <label>Alt Text<input type="text" data-about-field="alt_text" data-id="${image.id}" value="${image.alt_text || ''}"></label>
                    <label>Sort Order<input type="number" data-about-field="sort_order" data-id="${image.id}" value="${image.sort_order || index + 1}"></label>
                    <label class="checkbox-row"><input type="checkbox" data-about-field="active" data-id="${image.id}" ${image.active !== false ? 'checked' : ''}> Active</label>
                `;
                aboutImagesContainer.appendChild(card);
            });
    };

    const collectSettings = () => ({
        locationLabel: heroForm.locationLabel.value.trim() || 'LOCATION',
        wrapperMaxWidth: Number(heroForm.wrapperMaxWidth.value || 1820),
        sideGapDesktop: Number(heroForm.sideGapDesktop.value || 0),
        sideGapTablet: Number(heroForm.sideGapTablet.value || 0),
        sideGapMobile: Number(heroForm.sideGapMobile.value || 0)
    });

    const collectSlides = () => {
        return state.currentSlides.map((slide) => {
            const getField = (field) => slidesContainer.querySelector(`[data-field="${field}"][data-id="${slide.id}"]`);
            const activeInput = getField('active');
            return Object.assign({}, slide, {
                tab_title: getField('tab_title').value.trim(),
                eyebrow: getField('eyebrow').value.trim(),
                image_url: getField('image_url').value.trim(),
                thumb_url: getField('thumb_url').value.trim(),
                phone: getField('phone').value.trim(),
                email: getField('email').value.trim(),
                address_html: getField('address_html').value.trim(),
                sort_order: Number(getField('sort_order').value || 0),
                active: Boolean(activeInput && activeInput.checked)
            });
        });
    };

    const collectAboutImages = () => {
        if (!aboutImagesContainer) return [];
        return state.aboutImages.map((image) => {
            const getField = (field) => aboutImagesContainer.querySelector(`[data-about-field="${field}"][data-id="${image.id}"]`);
            const activeInput = getField('active');
            return Object.assign({}, image, {
                image_url: getField('image_url').value.trim(),
                alt_text: getField('alt_text').value.trim(),
                sort_order: Number(getField('sort_order').value || 0),
                active: Boolean(activeInput && activeInput.checked)
            });
        });
    };

    const normalizeSettings = (value) => {
        if (config.normalizeHeroSettings) {
            return config.normalizeHeroSettings(value);
        }
        return Object.assign({}, config.defaultHeroSettings, value || {});
    };

    const serializeSettings = (value) => {
        if (config.serializeHeroSettings) {
            return config.serializeHeroSettings(value);
        }
        return value;
    };

    const loadLocalState = () => {
        const settings = normalizeSettings(config.loadLocal(config.localKeys.settings, config.defaultHeroSettings));
        const slides = config.loadLocal(config.localKeys.slides, config.defaultHeroSlides);
        const aboutImages = config.loadLocal(config.localKeys.aboutImages, config.defaultAboutImages || []);
        heroForm.locationLabel.value = settings.locationLabel || 'LOCATION';
        heroForm.wrapperMaxWidth.value = settings.wrapperMaxWidth || 1820;
        heroForm.sideGapDesktop.value = settings.sideGapDesktop || 0;
        heroForm.sideGapTablet.value = settings.sideGapTablet || 0;
        heroForm.sideGapMobile.value = settings.sideGapMobile || 0;
        state.currentSlides = Array.isArray(slides) ? slides.map((slide) => Object.assign({}, slide)) : [];
        state.aboutImages = Array.isArray(aboutImages) ? aboutImages.map((image) => Object.assign({}, image)) : [];
        renderSlides();
        renderAboutImages();
    };

    const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Failed to read file.'));
        reader.readAsDataURL(file);
    });

    const uploadSlideAsset = async (slideId, field, file) => {
        if (!file) return;
        setStatus('Uploading ' + file.name + ' ...', 'warning');
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const safeSlideId = String(slideId).replace(/[^a-zA-Z0-9_-]/g, '-');
        const path = 'slides/' + safeSlideId + '/' + field + '-' + Date.now() + '.' + ext;
        let assetUrl = '';

        if (config.isSupabaseConfigured()) {
            assetUrl = await config.supabaseStorageUpload(path, file, file.type || 'application/octet-stream', true);
        } else {
            assetUrl = await readFileAsDataUrl(file);
        }

        const input = slidesContainer.querySelector(`[data-field="${field}"][data-id="${slideId}"]`);
        if (input) {
            input.value = assetUrl;
        }

        const targetSlide = state.currentSlides.find((slide) => slide.id === slideId);
        if (targetSlide) {
            targetSlide[field] = assetUrl;
        }

        config.saveLocal(config.localKeys.slides, collectSlides());
        setStatus('Uploaded ' + file.name + '.', 'success');
    };

    const uploadAboutImage = async (imageId, file) => {
        if (!file) return;
        setStatus('Uploading ' + file.name + ' ...', 'warning');
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const safeImageId = String(imageId).replace(/[^a-zA-Z0-9_-]/g, '-');
        const path = 'about-images/' + safeImageId + '/image-' + Date.now() + '.' + ext;
        let assetUrl = '';

        if (config.isSupabaseConfigured()) {
            assetUrl = await config.supabaseStorageUpload(path, file, file.type || 'application/octet-stream', true);
        } else {
            assetUrl = await readFileAsDataUrl(file);
        }

        const input = aboutImagesContainer.querySelector(`[data-about-field="image_url"][data-id="${imageId}"]`);
        if (input) input.value = assetUrl;

        const targetImage = state.aboutImages.find((image) => image.id === imageId);
        if (targetImage) targetImage.image_url = assetUrl;

        config.saveLocal(config.localKeys.aboutImages, collectAboutImages());
        setStatus('Uploaded ' + file.name + '.', 'success');
    };

    const syncFromSupabase = async () => {
        if (!config.isSupabaseConfigured()) {
            setStatus('Local mode only. Supabase is not configured.', 'warning');
            return;
        }
        try {
            const [settingsRows, slideRows] = await Promise.all([
                config.supabaseFetch(heroSettingsTable + '?select=*&order=updated_at.desc.nullslast&limit=1', {}, false),
                config.supabaseFetch(heroSlidesTable + '?select=*&order=sort_order.asc', {}, false)
            ]);

            const settings = Array.isArray(settingsRows) && settingsRows[0] ? normalizeSettings(settingsRows[0]) : config.defaultHeroSettings;
            const slides = Array.isArray(slideRows) && slideRows.length ? slideRows : config.defaultHeroSlides;
            config.saveLocal(config.localKeys.settings, settings);
            config.saveLocal(config.localKeys.slides, slides);
            try {
                const aboutRows = await config.supabaseFetch(aboutImagesTable + '?select=*&order=sort_order.asc', {}, false);
                if (Array.isArray(aboutRows) && aboutRows.length) {
                    config.saveLocal(config.localKeys.aboutImages, aboutRows);
                }
            } catch (error) {
                console.warn('About images sync failed:', error);
            }
            loadLocalState();
            setStatus('Synced from Supabase.', 'success');
        } catch (error) {
            setStatus('Supabase sync failed. Using local cache.', 'error');
        }
    };

    const saveSettings = async () => {
        const payload = collectSettings();
        config.saveLocal(config.localKeys.settings, payload);

        if (!config.isSupabaseConfigured()) {
            setStatus('Hero settings saved locally.', 'success');
            return;
        }

        try {
            const rows = await config.supabaseFetch(heroSettingsTable + '?select=id&limit=1', {}, true);
            const body = JSON.stringify(serializeSettings(payload));
            if (Array.isArray(rows) && rows[0] && rows[0].id) {
                await config.supabaseFetch(heroSettingsTable + '?id=eq.' + rows[0].id, {
                    method: 'PATCH',
                    headers: { Prefer: 'return=representation' },
                    body: body
                }, true);
            } else {
                await config.supabaseFetch(heroSettingsTable, {
                    method: 'POST',
                    headers: { Prefer: 'return=representation' },
                    body: body
                }, true);
            }
            setStatus('Hero settings saved to Supabase.', 'success');
        } catch (error) {
            setStatus('Saved locally. Supabase update failed.', 'error');
        }
    };

    const saveSlides = async () => {
        const payload = collectSlides();
        state.currentSlides = payload.map((slide) => Object.assign({}, slide));
        config.saveLocal(config.localKeys.slides, payload);

        if (!config.isSupabaseConfigured()) {
            setStatus('Hero slides saved locally.', 'success');
            return;
        }

        try {
            await config.supabaseFetch(heroSlidesTable + '?id=not.is.null', { method: 'DELETE' }, true);
            await config.supabaseFetch(heroSlidesTable, {
                method: 'POST',
                headers: { Prefer: 'return=representation' },
                body: JSON.stringify(payload.map((slide) => ({
                    id: slide.id,
                    sort_order: slide.sort_order,
                    active: slide.active,
                    tab_title: slide.tab_title,
                    eyebrow: slide.eyebrow,
                    image_url: slide.image_url,
                    thumb_url: slide.thumb_url,
                    address_html: slide.address_html,
                    email: slide.email,
                    phone: slide.phone
                })))
            }, true);
            setStatus('Hero slides saved to Supabase.', 'success');
        } catch (error) {
            setStatus('Saved locally. Supabase update failed.', 'error');
        }
    };

    const saveAboutImages = async () => {
        const payload = collectAboutImages();
        state.aboutImages = payload.map((image) => Object.assign({}, image));
        config.saveLocal(config.localKeys.aboutImages, payload);

        if (!config.isSupabaseConfigured()) {
            setStatus('About images saved locally.', 'success');
            return;
        }

        try {
            await config.supabaseFetch(aboutImagesTable + '?id=not.is.null', { method: 'DELETE' }, true);
            if (payload.length) {
                await config.supabaseFetch(aboutImagesTable, {
                    method: 'POST',
                    headers: { Prefer: 'return=representation' },
                    body: JSON.stringify(payload.map((image) => ({
                        id: image.id,
                        sort_order: image.sort_order,
                        active: image.active,
                        image_url: image.image_url,
                        alt_text: image.alt_text
                    })))
                }, true);
            }
            setStatus('About images saved to Supabase.', 'success');
        } catch (error) {
            setStatus('Saved locally. Supabase update failed.', 'error');
        }
    };

    const addSlide = () => {
        const nextIndex = state.currentSlides.length + 1;
        state.currentSlides.push({
            id: 'hero-slide-' + Date.now(),
            sort_order: nextIndex,
            active: true,
            tab_title: 'NEW TAB ' + nextIndex,
            eyebrow: '',
            image_url: './images-tatabarber/banner01.jpg',
            thumb_url: './images-tatabarber/banner01.jpg',
            address_html: '',
            email: '',
            phone: ''
        });
        renderSlides();
    };

    const removeSlide = (id) => {
        state.currentSlides = state.currentSlides.filter((slide) => slide.id !== id);
        renderSlides();
    };

    const addAboutImage = () => {
        const nextIndex = state.aboutImages.length + 1;
        state.aboutImages.push({
            id: 'about-image-' + Date.now(),
            sort_order: nextIndex,
            active: true,
            image_url: '',
            alt_text: ''
        });
        renderAboutImages();
    };

    const removeAboutImage = (id) => {
        state.aboutImages = state.aboutImages.filter((image) => image.id !== id);
        renderAboutImages();
    };

    const checkLogin = async () => {
        if (!requireAdmin) {
            loginView.hidden = true;
            adminView.hidden = false;
            loadLocalState();
            return;
        }

        if (localStorage.getItem(config.adminAuthKey) === 'logged_in') {
            loginView.hidden = true;
            adminView.hidden = false;
            loadLocalState();
            await syncFromSupabase();
            return;
        }

        loginView.hidden = false;
        adminView.hidden = true;
    };

    const doLogin = async () => {
        loginError.textContent = '';
        loginBtn.disabled = true;
        try {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            const rows = await config.supabaseFetch(
                adminTable + '?username=eq.' + encodeURIComponent(username) + '&password=eq.' + encodeURIComponent(password) + '&select=id',
                {},
                true
            );

            if (Array.isArray(rows) && rows.length) {
                localStorage.setItem(config.adminAuthKey, 'logged_in');
                loginView.hidden = true;
                adminView.hidden = false;
                loadLocalState();
                await syncFromSupabase();
            } else {
                loginError.textContent = 'Invalid username or password.';
            }
        } catch (error) {
            loginError.textContent = 'Login failed: ' + error.message;
        } finally {
            loginBtn.disabled = false;
        }
    };

    slidesContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action="remove"]');
        if (button) {
            removeSlide(button.getAttribute('data-id'));
        }
    });

    slidesContainer.addEventListener('change', async (event) => {
        const input = event.target.closest('input[type="file"][data-upload]');
        if (!input || !input.files || !input.files[0]) {
            return;
        }
        input.disabled = true;
        try {
            await uploadSlideAsset(input.getAttribute('data-id'), input.getAttribute('data-upload'), input.files[0]);
        } catch (error) {
            setStatus('Upload failed: ' + error.message, 'error');
        } finally {
            input.value = '';
            input.disabled = false;
        }
    });

    if (aboutImagesContainer) {
        aboutImagesContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-about-action="remove"]');
            if (button) removeAboutImage(button.getAttribute('data-id'));
        });

        aboutImagesContainer.addEventListener('change', async (event) => {
            const input = event.target.closest('input[type="file"][data-about-upload]');
            if (!input || !input.files || !input.files[0]) return;
            input.disabled = true;
            try {
                await uploadAboutImage(input.getAttribute('data-id'), input.files[0]);
            } catch (error) {
                setStatus('Upload failed: ' + error.message, 'error');
            } finally {
                input.value = '';
                input.disabled = false;
            }
        });
    }

    addSlideBtn.addEventListener('click', addSlide);
    saveSettingsBtn.addEventListener('click', saveSettings);
    saveSlidesBtn.addEventListener('click', saveSlides);
    if (addAboutImageBtn) addAboutImageBtn.addEventListener('click', addAboutImage);
    if (saveAboutImagesBtn) saveAboutImagesBtn.addEventListener('click', saveAboutImages);
    loginBtn.addEventListener('click', doLogin);
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(config.adminAuthKey);
        checkLogin();
    });

    checkLogin();
})();


