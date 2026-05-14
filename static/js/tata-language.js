(function () {
    const storageKey = 'bladehubLang';
    const defaultLang = 'en';
    const supported = ['cs', 'en', 'uk', 'de', 'es', 'ru'];

    const dictionaries = {
        cs: {
            'Home': 'Domu',
            'Services': 'Sluzby',
            'Pricing': 'Cenik',
            'Gallery': 'Galerie',
            'About': 'O nas',
            'Contact': 'Kontakt',
            'Book Now': 'Rezervovat',
            'BOOK NOW': 'REZERVOVAT',
            'View Services': 'Zobrazit sluzby',
            'VIEW SERVICES': 'ZOBRAZIT SLUZBY',
            'Call Now': 'Zavolat',
            'CALL NOW': 'ZAVOLAT',
            'Client Rating': 'Hodnoceni',
            'Classic Cut': 'Klasicky strih',
            'Open': 'Otevreno',
            'Open Slots': 'Volne terminy',
            'Today': 'Dnes',
            'Location': 'Adresa',
            'location': 'adresa',
            'contacts': 'kontakt',
            'working hours': 'oteviraci doba',
            'subscribe': 'odber',
            'Your email address will not be published. Required fields are marked *': 'Vase e-mailova adresa nebude zverejnena. Povinna pole jsou oznacena *',
            'Your Name': 'Vase jmeno',
            'Your Email': 'Vas e-mail',
            'Phone': 'Telefon',
            'Your Phone': 'Vas telefon',
            'Book Appointment': 'Rezervovat termin',
            'Book an Appointment': 'Rezervovat termin',
            'Your Comment': 'Vase zprava',
            'Get in Touch': 'Odeslat zpravu',
            'Please fill in the required fields before booking.': 'Vyplnte prosim povinna pole.',
            'Opening booking calendar...': 'Oteviram rezervacni kalendar...',
            'Email receiving address is not configured yet.': 'Prijimaci e-mail jeste neni nastaven.',
            'Opening your email app...': 'Oteviram e-mailovou aplikaci...',
            'Online booking': 'Online rezervace',
            'Most Popular': 'Nejoblibenejsi',
            'Choose a Plan': 'Vybrat plan',
            'who we are': 'kdo jsme',
            'premium services': 'profesionalni sluzby',
            'services what we can offer for you.': 'sluzby, ktere vam muzeme nabidnout.',
            'Read More': 'Vice informaci',
            'Reserve': 'Rezervovat',
            'Reservio': 'Reservio',
            'Show details': 'Zobrazit podrobnosti',
            "Střih Vlasů / MEN'S HAIRCUT": "Strih vlasu / MEN'S HAIRCUT",
            'Stříhání & Úprava Vousů / Haircut & Beard Trim': 'Strihani a uprava vousu / Haircut & Beard Trim',
            'Střih Vlasů - Děti (od 5 do 10 let)': 'Strih vlasu - deti (od 5 do 10 let)',
            'Úprava Vousů / Beard Trim': 'Uprava vousu / Beard Trim',
            'Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors': 'Dlouhe vlasy - nebo jen nuzkami / Long hair or with scissors',
            'Classic haircut with clean finishing and styling.': 'Klasicky strih s cistym dokoncenim a stylingem.',
            'Complete haircut and beard trim package.': 'Kompletni balicek strihu vlasu a upravy vousu.',
            'Haircut for children from 5 to 10 years old.': 'Strih pro deti od 5 do 10 let.',
            'Beard shaping, trimming and clean contour.': 'Tvarovani vousu, zkraceni a cista kontura.',
            'Long hair cut or full scissor haircut.': 'Strih dlouhych vlasu nebo kompletni strih nuzkami.',
            'Get full range of premium services.': 'Kompletni nabidka profesionalnich sluzeb.',
            'Great Style. Great Haircuts. Awesome Barbers. At TATA Barbershop, we strive to create the traditional barbershop look and feel with the highest level of skill, service and style to keep you looking and feeling your best.': 'Skvely styl. Skvele strihy. Vyborni barberi. V Tata BarberShop vytvarime tradicni atmosferu barbershopu s vysokou urovni dovednosti, sluzeb a stylu.'
        },
        de: {
            'Home': 'Startseite',
            'Services': 'Leistungen',
            'Pricing': 'Preise',
            'Gallery': 'Galerie',
            'About': 'Uber uns',
            'Contact': 'Kontakt',
            'Book Now': 'Jetzt buchen',
            'BOOK NOW': 'JETZT BUCHEN',
            'View Services': 'Leistungen ansehen',
            'VIEW SERVICES': 'LEISTUNGEN ANSEHEN',
            'Call Now': 'Jetzt anrufen',
            'CALL NOW': 'JETZT ANRUFEN',
            'Client Rating': 'Bewertung',
            'Classic Cut': 'Klassischer Schnitt',
            'Open': 'Geoffnet',
            'Open Slots': 'Freie Termine',
            'Today': 'Heute',
            'Location': 'Standort',
            'location': 'standort',
            'contacts': 'kontakt',
            'working hours': 'offnungszeiten',
            'subscribe': 'abonnieren',
            'Your email address will not be published. Required fields are marked *': 'Ihre E-Mail-Adresse wird nicht veroffentlicht. Pflichtfelder sind mit * markiert',
            'Your Name': 'Ihr Name',
            'Your Email': 'Ihre E-Mail',
            'Phone': 'Telefon',
            'Your Phone': 'Ihre Telefonnummer',
            'Book Appointment': 'Termin buchen',
            'Book an Appointment': 'Termin buchen',
            'Your Comment': 'Ihre Nachricht',
            'Get in Touch': 'Nachricht senden',
            'Please fill in the required fields before booking.': 'Bitte fullen Sie die Pflichtfelder aus.',
            'Opening booking calendar...': 'Buchungskalender wird geoffnet...',
            'Email receiving address is not configured yet.': 'Empfanger-E-Mail ist noch nicht eingerichtet.',
            'Opening your email app...': 'E-Mail-App wird geoffnet...',
            'Online booking': 'Online-Buchung',
            'Most Popular': 'Beliebt',
            'Choose a Plan': 'Plan wahlen',
            'who we are': 'uber uns',
            'premium services': 'premium-services',
            'services what we can offer for you.': 'leistungen, die wir ihnen anbieten konnen.',
            'Read More': 'Mehr erfahren',
            'Reserve': 'Reservieren',
            'Reservio': 'Reservio',
            'Show details': 'Details anzeigen',
            "Střih Vlasů / MEN'S HAIRCUT": "Herrenhaarschnitt / MEN'S HAIRCUT",
            'Stříhání & Úprava Vousů / Haircut & Beard Trim': 'Haarschnitt & Bartpflege / Haircut & Beard Trim',
            'Střih Vlasů - Děti (od 5 do 10 let)': 'Kinderhaarschnitt (5 bis 10 Jahre)',
            'Úprava Vousů / Beard Trim': 'Bartpflege / Beard Trim',
            'Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors': 'Lange Haare oder Scherenschnitt / Long hair or with scissors',
            'Classic haircut with clean finishing and styling.': 'Klassischer Haarschnitt mit sauberem Finish und Styling.',
            'Complete haircut and beard trim package.': 'Komplettpaket aus Haarschnitt und Bartpflege.',
            'Haircut for children from 5 to 10 years old.': 'Haarschnitt fur Kinder von 5 bis 10 Jahren.',
            'Beard shaping, trimming and clean contour.': 'Bartformung, Trimmen und saubere Kontur.',
            'Long hair cut or full scissor haircut.': 'Schnitt fur lange Haare oder kompletter Scherenschnitt.',
            'Get full range of premium services.': 'Das komplette Angebot professioneller Services.',
            'Great Style. Great Haircuts. Awesome Barbers. At TATA Barbershop, we strive to create the traditional barbershop look and feel with the highest level of skill, service and style to keep you looking and feeling your best.': 'Guter Stil. Gute Haarschnitte. Erfahrene Barbiere. Bei Tata BarberShop verbinden wir klassische Barbershop-Atmosphare mit professionellem Service und sauberem Stil.'
        },
        es: {
            'Home': 'Inicio',
            'Services': 'Servicios',
            'Pricing': 'Precios',
            'Gallery': 'Galeria',
            'About': 'Nosotros',
            'Contact': 'Contacto',
            'Book Now': 'Reservar',
            'BOOK NOW': 'RESERVAR',
            'View Services': 'Ver servicios',
            'VIEW SERVICES': 'VER SERVICIOS',
            'Call Now': 'Llamar',
            'CALL NOW': 'LLAMAR',
            'Client Rating': 'Valoracion',
            'Classic Cut': 'Corte clasico',
            'Open': 'Abierto',
            'Open Slots': 'Citas libres',
            'Today': 'Hoy',
            'Location': 'Ubicacion',
            'location': 'ubicacion',
            'contacts': 'contacto',
            'working hours': 'horario',
            'subscribe': 'suscribirse',
            'Your email address will not be published. Required fields are marked *': 'Tu correo electronico no sera publicado. Los campos obligatorios estan marcados con *',
            'Your Name': 'Tu nombre',
            'Your Email': 'Tu correo',
            'Phone': 'Telefono',
            'Your Phone': 'Tu telefono',
            'Book Appointment': 'Reservar cita',
            'Book an Appointment': 'Reservar cita',
            'Your Comment': 'Tu mensaje',
            'Get in Touch': 'Enviar mensaje',
            'Please fill in the required fields before booking.': 'Completa los campos obligatorios.',
            'Opening booking calendar...': 'Abriendo calendario de reservas...',
            'Email receiving address is not configured yet.': 'El correo receptor aun no esta configurado.',
            'Opening your email app...': 'Abriendo tu app de correo...',
            'Online booking': 'Reserva online',
            'Most Popular': 'Mas popular',
            'Choose a Plan': 'Elegir plan',
            'who we are': 'quienes somos',
            'premium services': 'servicios premium',
            'services what we can offer for you.': 'servicios que podemos ofrecerte.',
            'Read More': 'Leer mas',
            'Reserve': 'Reservar',
            'Reservio': 'Reservio',
            'Show details': 'Ver detalles',
            "Střih Vlasů / MEN'S HAIRCUT": "Corte de hombre / MEN'S HAIRCUT",
            'Stříhání & Úprava Vousů / Haircut & Beard Trim': 'Corte y arreglo de barba / Haircut & Beard Trim',
            'Střih Vlasů - Děti (od 5 do 10 let)': 'Corte infantil (de 5 a 10 anos)',
            'Úprava Vousů / Beard Trim': 'Arreglo de barba / Beard Trim',
            'Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors': 'Pelo largo o corte con tijeras / Long hair or with scissors',
            'Classic haircut with clean finishing and styling.': 'Corte clasico con acabado limpio y peinado.',
            'Complete haircut and beard trim package.': 'Paquete completo de corte y arreglo de barba.',
            'Haircut for children from 5 to 10 years old.': 'Corte para ninos de 5 a 10 anos.',
            'Beard shaping, trimming and clean contour.': 'Perfilado, recorte y contorno limpio de barba.',
            'Long hair cut or full scissor haircut.': 'Corte de pelo largo o corte completo con tijeras.',
            'Get full range of premium services.': 'Servicio completo de barberia premium.',
            'Great Style. Great Haircuts. Awesome Barbers. At TATA Barbershop, we strive to create the traditional barbershop look and feel with the highest level of skill, service and style to keep you looking and feeling your best.': 'Gran estilo. Grandes cortes. Barberos expertos. En Tata BarberShop combinamos ambiente clasico de barberia con servicio profesional y mucho estilo.'
        },
        ru: {
            'Home': 'Glavnaya',
            'Services': 'Uslugi',
            'Pricing': 'Ceny',
            'Gallery': 'Galereya',
            'About': 'O nas',
            'Contact': 'Kontakt',
            'Book Now': 'Zapisatsya',
            'BOOK NOW': 'ZAPISATSYA',
            'View Services': 'Smotret uslugi',
            'VIEW SERVICES': 'SMOTRET USLUGI',
            'Call Now': 'Pozvonit',
            'CALL NOW': 'POZVONIT',
            'Client Rating': 'Reyting',
            'Classic Cut': 'Klassicheskaya strizhka',
            'Open': 'Otkryto',
            'Open Slots': 'Svobodnye terminy',
            'Today': 'Segodnya',
            'Location': 'Adres',
            'location': 'adres',
            'contacts': 'kontakt',
            'working hours': 'chasy raboty',
            'subscribe': 'podpiska',
            'Your email address will not be published. Required fields are marked *': 'Vash email ne budet opublikovan. Obyazatelnye polya otmecheny *',
            'Your Name': 'Vashe imya',
            'Your Email': 'Vash email',
            'Phone': 'Telefon',
            'Your Phone': 'Vash telefon',
            'Book Appointment': 'Zapisatsya',
            'Book an Appointment': 'Zapisatsya',
            'Your Comment': 'Vashe soobshchenie',
            'Get in Touch': 'Otpravit',
            'Please fill in the required fields before booking.': 'Zapolnite obyazatelnye polya.',
            'Opening booking calendar...': 'Otkryvaem kalendar zapisey...',
            'Email receiving address is not configured yet.': 'Email poluchatelya eshche ne nastroen.',
            'Opening your email app...': 'Otkryvaem pochtovoe prilozhenie...',
            'Online booking': 'Onlayn zapis',
            'Most Popular': 'Populyarno',
            'Choose a Plan': 'Vybrat plan',
            'who we are': 'o nas',
            'premium services': 'professionalnye uslugi',
            'services what we can offer for you.': 'uslugi, kotorye my mozhem vam predlozhit.',
            'Read More': 'Podrobnee',
            'Reserve': 'Zapisatsya',
            'Reservio': 'Reservio',
            'Show details': 'Podrobnee',
            "Střih Vlasů / MEN'S HAIRCUT": "Muzhskaya strizhka / MEN'S HAIRCUT",
            'Stříhání & Úprava Vousů / Haircut & Beard Trim': 'Strizhka i korrektsiya borody / Haircut & Beard Trim',
            'Střih Vlasů - Děti (od 5 do 10 let)': 'Detskaya strizhka (ot 5 do 10 let)',
            'Úprava Vousů / Beard Trim': 'Korrektsiya borody / Beard Trim',
            'Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors': 'Dlinnye volosy ili strizhka nozhnitsami / Long hair or with scissors',
            'Classic haircut with clean finishing and styling.': 'Klassicheskaya strizhka s akkuratnym finishom i stylingom.',
            'Complete haircut and beard trim package.': 'Polnyy paket strizhki i korrektsii borody.',
            'Haircut for children from 5 to 10 years old.': 'Strizhka dlya detey ot 5 do 10 let.',
            'Beard shaping, trimming and clean contour.': 'Forma borody, podstriganie i chistyy kontur.',
            'Long hair cut or full scissor haircut.': 'Strizhka dlinnykh volos ili polnaya strizhka nozhnitsami.',
            'Get full range of premium services.': 'Polnyy spektr professionalnykh uslug.',
            'Great Style. Great Haircuts. Awesome Barbers. At TATA Barbershop, we strive to create the traditional barbershop look and feel with the highest level of skill, service and style to keep you looking and feeling your best.': 'Stilnye strizhki i opytnye barbery. V Tata BarberShop my sozdaiem klassicheskuyu atmosferu barbershopa s professionalnym servisom i vnimaniem k stilyu.'
        },
        uk: {
            'Home': 'Holovna',
            'Services': 'Posluhy',
            'Pricing': 'Tsiny',
            'Gallery': 'Halereya',
            'About': 'Pro nas',
            'Contact': 'Kontakt',
            'Book Now': 'Zabronyuvaty',
            'BOOK NOW': 'ZABRONYUVATY',
            'View Services': 'Dyvytysya posluhy',
            'VIEW SERVICES': 'DYVYTYSYA POSLUHY',
            'Call Now': 'Zatelefonuvaty',
            'CALL NOW': 'ZATELEFONUVATY',
            'Client Rating': 'Reitynh',
            'Classic Cut': 'Klasychna stryzhka',
            'Open': 'Vidkryto',
            'Open Slots': 'Vilni terminy',
            'Today': 'Sohodni',
            'Location': 'Adresa',
            'location': 'adresa',
            'contacts': 'kontakt',
            'working hours': 'hodyny roboty',
            'subscribe': 'pidpyska',
            'Your email address will not be published. Required fields are marked *': 'Vash email ne bude opublikovano. Oboviazkovi polia poznacheni *',
            'Your Name': 'Vashe imia',
            'Your Email': 'Vash email',
            'Phone': 'Telefon',
            'Your Phone': 'Vash telefon',
            'Book Appointment': 'Zabronyuvaty',
            'Book an Appointment': 'Zabronyuvaty',
            'Your Comment': 'Vashe povidomlennia',
            'Get in Touch': 'Nadislati',
            'Please fill in the required fields before booking.': 'Zapovnit oboviazkovi polia.',
            'Opening booking calendar...': 'Vidkryvaiemo kalendar bronuvan...',
            'Email receiving address is not configured yet.': 'Email otrymuvacha shche ne nalashtovano.',
            'Opening your email app...': 'Vidkryvaiemo poshtovyi dodatok...',
            'Online booking': 'Onlain broniuvannia',
            'Most Popular': 'Populiarno',
            'Choose a Plan': 'Obraty plan',
            'who we are': 'pro nas',
            'premium services': 'profesiini posluhy',
            'services what we can offer for you.': 'posluhy, yaki my mozhemo vam zaproponuvaty.',
            'Read More': 'Dokladnishe',
            'Reserve': 'Zabronyuvaty',
            'Reservio': 'Reservio',
            'Show details': 'Dokladnishe',
            "Střih Vlasů / MEN'S HAIRCUT": "Cholovicha stryzhka / MEN'S HAIRCUT",
            'Stříhání & Úprava Vousů / Haircut & Beard Trim': 'Stryzhka ta korektsiia borody / Haircut & Beard Trim',
            'Střih Vlasů - Děti (od 5 do 10 let)': 'Dytiacha stryzhka (vid 5 do 10 rokiv)',
            'Úprava Vousů / Beard Trim': 'Korektsiia borody / Beard Trim',
            'Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors': 'Dovhe volossia abo stryzhka nozhnitsiamy / Long hair or with scissors',
            'Classic haircut with clean finishing and styling.': 'Klasychna stryzhka z okhainym finishom i stylingom.',
            'Complete haircut and beard trim package.': 'Povnyi paket stryzhky ta korektsii borody.',
            'Haircut for children from 5 to 10 years old.': 'Stryzhka dlia ditei vid 5 do 10 rokiv.',
            'Beard shaping, trimming and clean contour.': 'Formuvannia borody, pidstryhannia ta chystyi kontur.',
            'Long hair cut or full scissor haircut.': 'Stryzhka dovhoho volossia abo povna stryzhka nozhnitsiamy.',
            'Get full range of premium services.': 'Povnyi spektr profesiinykh posluh.',
            'Great Style. Great Haircuts. Awesome Barbers. At TATA Barbershop, we strive to create the traditional barbershop look and feel with the highest level of skill, service and style to keep you looking and feeling your best.': 'Stylni stryzhky ta dosvidcheni barbery. U Tata BarberShop my poiednuiemo klasychnu atmosferu barbershopu z profesiinym servisom i uvahoiu do styliu.'
        },
        en: {}
    };

    const getTextNodes = (root) => {
        const nodes = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || parent.closest('script, style, textarea, input, select')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        while (walker.nextNode()) nodes.push(walker.currentNode);
        return nodes;
    };

    const sourceText = (node) => {
        if (!node.__tataSourceText) node.__tataSourceText = node.nodeValue;
        return node.__tataSourceText;
    };

    const translateValue = (value, dictionary) => {
        const trimmed = value.trim();
        if (!trimmed) return value;
        const lookupKey = trimmed.replace(/\s+/g, ' ');
        const translated = dictionary[lookupKey] || dictionary[trimmed];
        if (!translated) return value;
        return value.replace(trimmed, translated);
    };

    const applyLanguage = (lang) => {
        const target = supported.includes(lang) ? lang : defaultLang;
        const dictionary = dictionaries[target] || {};
        window.localStorage.setItem(storageKey, target);
        document.documentElement.lang = target;
        getTextNodes(document.body).forEach((node) => {
            node.nodeValue = target === 'en' ? sourceText(node) : translateValue(sourceText(node), dictionary);
        });
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((field) => {
            if (!field.__tataSourcePlaceholder) field.__tataSourcePlaceholder = field.getAttribute('placeholder') || '';
            const source = field.__tataSourcePlaceholder;
            field.setAttribute('placeholder', target === 'en' ? source : translateValue(source, dictionary));
        });
        document.querySelectorAll('input[type="submit"][value]').forEach((field) => {
            if (!field.__tataSourceValue) field.__tataSourceValue = field.getAttribute('value') || '';
            const source = field.__tataSourceValue;
            field.setAttribute('value', target === 'en' ? source : translateValue(source, dictionary));
        });
        document.querySelectorAll('option').forEach((option) => {
            if (!option.__tataSourceText) option.__tataSourceText = option.textContent;
            const source = option.__tataSourceText;
            option.textContent = target === 'en' ? source : translateValue(source, dictionary);
        });
        updateSwitcher(target);
    };

    const closeMenu = () => {
        const toggle = document.getElementById('lang-toggle');
        const menu = document.getElementById('lang-menu');
        if (menu) menu.hidden = true;
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const toggle = document.getElementById('lang-toggle');
        const menu = document.getElementById('lang-menu');
        if (!toggle || !menu) return;
        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        toggle.setAttribute('aria-expanded', String(willOpen));
    };

    const updateSwitcher = (lang) => {
        const classByLang = {
            cs: 'language-flag--czech',
            en: 'language-flag--english',
            uk: 'language-flag--ukraine',
            de: 'language-flag--germany',
            es: 'language-flag--spain',
            ru: 'language-flag--russia'
        };
        const toggleFlag = document.querySelector('#lang-toggle .language-flag');
        if (toggleFlag) toggleFlag.className = 'language-flag ' + (classByLang[lang] || classByLang.en);
        document.querySelectorAll('.lang-menu__option').forEach((option) => {
            option.classList.toggle('is-active', option.getAttribute('data-lang-option') === lang);
        });
    };

    const detectLangFromClick = (target) => {
        const option = target.closest('.lang-menu__option, [data-lang], [data-lang-option], [class*="language-flag--"], a[href*="/cs"], a[href*="/de"], a[href*="/es"], a[href*="/ru"], a[href*="/uk"], a[href*="/en"]');
        if (!option) return null;
        const optionLang = option.getAttribute('data-lang-option');
        if (supported.includes(optionLang)) return optionLang;
        const dataLang = option.getAttribute('data-lang');
        if (supported.includes(dataLang)) return dataLang;
        const className = option.className || '';
        if (className.includes('czech')) return 'cs';
        if (className.includes('germany')) return 'de';
        if (className.includes('spain')) return 'es';
        if (className.includes('russia')) return 'ru';
        if (className.includes('ukraine')) return 'uk';
        if (className.includes('english')) return 'en';
        const href = option.getAttribute('href') || '';
        const match = href.match(/\/(cs|de|es|ru|uk|en)(\/|$)/);
        return match ? match[1] : null;
    };

    document.addEventListener('click', (event) => {
        const toggle = event.target.closest('#lang-toggle');
        if (toggle) {
            event.preventDefault();
            event.stopImmediatePropagation();
            toggleMenu();
            return;
        }

        const lang = detectLangFromClick(event.target);
        if (!lang) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        applyLanguage(lang);
        closeMenu();
    }, true);

    document.addEventListener('click', (event) => {
        if (!event.target.closest('#lang-switcher')) closeMenu();
    });

    const ready = () => {
        const initial = window.localStorage.getItem(storageKey) || defaultLang;
        applyLanguage(initial);
        const observer = new MutationObserver(() => applyLanguage(window.localStorage.getItem(storageKey) || defaultLang));
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    window.tataApplyLanguage = applyLanguage;
})();
