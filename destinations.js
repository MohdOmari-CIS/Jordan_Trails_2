(() => {
    const app = document.getElementById("destinationApp");
    const breadcrumbs = document.getElementById("breadcrumbs");
    const languageButton = document.getElementById("languageToggle");
    const themeButton = document.getElementById("themeToggle");
    const themeLabel = document.getElementById("themeLabel");
    const params = new URLSearchParams(window.location.search);
    const officialFeeSource = "https://www.mota.gov.jo/Ar/Pages/%d8%b1%d8%b3%d9%88%d9%85_%d8%af%d8%ae%d9%88%d9%84_%d8%a7%d9%84%d9%85%d9%88%d8%a7%d9%82%d8%b9_%d8%a7%d9%84%d8%b3%d9%8a%d8%a7%d8%ad%d9%8a%d8%a9";
    const copy = {
        ar: {
            brand: "دروب الأردن",
            homeLink: "الصفحة الرئيسية",
            footerBrand: "دروب الأردن",
            footerNote: "البيانات التي لم يكتمل التحقق منها موضحة بوضوح.",
            loading: "جارٍ تحميل بيانات الوجهات...",
            loadError: "تعذر تحميل بيانات الوجهات. تحقق من توفر ملف data/attractions.json ثم أعد المحاولة.",
            home: "الرئيسية",
            directory: "محافظات الأردن",
            directoryKicker: "اكتشف المملكة",
            directoryTitle: "وجهات الأردن حسب المحافظة",
            directoryIntro: "اختر محافظة لاستعراض المعالم المدرجة فيها. المعلومات التفصيلية ستظهر عند اكتمال مراجعتها.",
            placeCount: "معلمًا مدرجًا",
            openGovernorate: "استعرض المحافظة ←",
            governorateKicker: "وجهات المحافظة",
            introPending: "النبذة والصورة الرئيسية قيد الإعداد، وستضافان بعد التحقق من مصادر موثوقة.",
            attractionsTitle: "المعالم المدرجة",
            description: "نبذة سياحية",
            searchLabel: "ابحث في معالم المحافظة",
            searchPlaceholder: "اكتب اسم معلم...",
            categoryLabel: "التصنيف السياحي",
            categoryPending: "التصنيفات بانتظار التحقق",
            allCategories: "كل التصنيفات",
            results: "نتيجة",
            noResults: "لا توجد معالم تطابق البحث الحالي.",
            detailsLink: "عرض التفاصيل ←",
            governorateLabel: "المحافظة",
            pendingDescription: "الوصف السياحي قيد التوثيق، ولن نعرض معلومات غير مؤكدة.",
            photoPending: "لا تتوفر صورة موثقة لهذا المعلم بعد.",
            mapTitle: "الموقع والخريطة",
            mapPending: "تعرض الخريطة المنطقة، لكن لا تظهر علامات المعالم ولا تتاح الاتجاهات قبل التحقق من إحداثيات الوصول.",
            mapPrepared: "تظهر على الخريطة المعالم التي تم التحقق من إحداثياتها فقط.",
            detailPending: "بعض تفاصيل هذا المعلم ما زالت قيد التحقق من المصادر الرسمية.",
            city: "المدينة أو المنطقة",
            category: "التصنيف",
            hours: "ساعات الزيارة",
            fees: "رسوم الدخول",
            feesSource: "المصدر: وزارة السياحة والآثار",
            feeCheckedOn: "تاريخ مراجعة صفحة المصدر",
            bestTime: "أفضل وقت للزيارة",
            access: "إمكانية الوصول",
            location: "الموقع الجغرافي",
            history: "لمحة تاريخية",
            activities: "الأنشطة المتاحة",
            nearby: "معالم قريبة",
            gallery: "صور المعلم",
            video: "فيديو",
            directions: "الاتجاهات",
            googleMaps: "الاتجاهات عبر Google Maps",
            appleMaps: "الاتجاهات عبر Apple Maps",
            directionsPending: "الاتجاهات غير متاحة حتى يتم التحقق من موقع الوصول.",
            travelMode: "وسيلة التنقل",
            driving: "السيارة",
            walking: "المشي",
            transit: "النقل العام",
            bicycling: "الدراجة",
            routeNote: "يحدد Google Maps المسار؛ لا يحسب هذا الموقع حركة المرور أو أفضل طريق لحظيًا.",
            backToGovernorate: "العودة إلى المحافظة",
            notFoundTitle: "الوجهة غير موجودة",
            notFoundBody: "لم نعثر على محافظة أو معلم بهذا الرابط.",
            homeButton: "عرض المحافظات",
            statusPending: "قيد التحقق",
            statusVerified: "تم التحقق",
            themeDark: "الوضع الداكن",
            themeLight: "الوضع الفاتح",
            switchLanguage: "Switch language to English",
            switchLight: "تفعيل الوضع الفاتح",
            switchDark: "تفعيل الوضع الداكن",
            mapCoordinates: "الإحداثيات",
            imageOpen: "فتح الصورة بالحجم الكامل"
        },
        en: {
            brand: "Jordan Trails",
            homeLink: "Home",
            footerBrand: "Jordan Trails",
            footerNote: "Unverified information is clearly marked.",
            loading: "Loading destination data...",
            loadError: "Destination data could not be loaded. Check that data/attractions.json is available, then try again.",
            home: "Home",
            directory: "Jordan governorates",
            directoryKicker: "Explore the Kingdom",
            directoryTitle: "Explore Jordan by governorate",
            directoryIntro: "Choose a governorate to browse its listed attractions. Detailed information will appear as it is verified.",
            placeCount: "listed attractions",
            openGovernorate: "Explore governorate →",
            governorateKicker: "Governorate destinations",
            introPending: "The overview and hero image are being prepared and will be added after reliable-source verification.",
            attractionsTitle: "Listed attractions",
            description: "Visitor overview",
            searchLabel: "Search this governorate",
            searchPlaceholder: "Enter an attraction name...",
            categoryLabel: "Tourism category",
            categoryPending: "Categories awaiting verification",
            allCategories: "All categories",
            results: "results",
            noResults: "No attractions match this search.",
            detailsLink: "View details →",
            governorateLabel: "Governorate",
            pendingDescription: "The visitor description is being verified; unconfirmed information is not shown.",
            photoPending: "No verified photo is available for this attraction yet.",
            mapTitle: "Location and map",
            mapPending: "The map shows the area, but attraction pins and directions remain unavailable until visitor access coordinates are verified.",
            mapPrepared: "Only attractions with verified coordinates are shown on the map.",
            detailPending: "Some details for this attraction are still being checked against official sources.",
            city: "City or area",
            category: "Category",
            hours: "Visiting hours",
            fees: "Entrance fee",
            feesSource: "Source: Ministry of Tourism and Antiquities",
            feeCheckedOn: "Source page checked",
            bestTime: "Best time to visit",
            access: "Accessibility",
            location: "Location",
            history: "Historical information",
            activities: "Available activities",
            nearby: "Nearby attractions",
            gallery: "Attraction photos",
            video: "Video",
            directions: "Directions",
            googleMaps: "Directions with Google Maps",
            appleMaps: "Directions with Apple Maps",
            directionsPending: "Directions are unavailable until the visitor access location is verified.",
            travelMode: "Travel mode",
            driving: "Driving",
            walking: "Walking",
            transit: "Transit",
            bicycling: "Bicycling",
            routeNote: "Google Maps calculates the route; this site does not calculate live traffic or the best route.",
            backToGovernorate: "Back to governorate",
            notFoundTitle: "Destination not found",
            notFoundBody: "We could not find a governorate or attraction for this link.",
            homeButton: "Browse governorates",
            statusPending: "Pending verification",
            statusVerified: "Verified",
            themeDark: "Dark mode",
            themeLight: "Light mode",
            switchLanguage: "تغيير اللغة إلى العربية",
            switchLight: "Switch to light mode",
            switchDark: "Switch to dark mode",
            mapCoordinates: "Coordinates",
            imageOpen: "Open full-size image"
        }
    };

    let language = localStorage.getItem("jordan-guide-language") === "en" ? "en" : "ar";
    let dataset = null;
    const text = key => copy[language][key];
    const localized = (arabic, english) => language === "en" ? (english || arabic || "") : (arabic || english || "");
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);

    function updateThemeButton() {
        const dark = document.documentElement.dataset.theme === "dark";
        themeButton.firstChild.textContent = dark ? "☀ " : "☾ ";
        themeLabel.textContent = dark ? text("themeLight") : text("themeDark");
        themeButton.setAttribute("aria-label", dark ? text("switchLight") : text("switchDark"));
        document.querySelector('meta[name="theme-color"]').content = dark ? "#101826" : "#f7f5ef";
    }

    function setLanguage(nextLanguage) {
        language = nextLanguage;
        localStorage.setItem("jordan-guide-language", language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.dataset.language = language;
        document.querySelectorAll("[data-copy]").forEach(element => {
            element.textContent = text(element.dataset.copy);
        });
        languageButton.textContent = language === "ar" ? "EN · English" : "AR · العربية";
        languageButton.setAttribute("aria-label", language === "ar" ? text("switchLanguage") : text("switchLanguage"));
        updateThemeButton();
        if (dataset) renderRoute();
    }

    function countFor(governorateId) {
        return dataset.attractions.filter(attraction => attraction.governorateId === governorateId).length;
    }

    function pageBreadcrumbs(items) {
        breadcrumbs.innerHTML = items.map((item, index) => {
            const separator = index ? `<span aria-hidden="true">/</span>` : "";
            const label = escapeHtml(item.label);
            return separator + (item.href ? `<a href="${item.href}">${label}</a>` : `<span aria-current="page">${label}</span>`);
        }).join("");
    }

    function imagePlaceholder() {
        return `<div class="image-placeholder"><span>${escapeHtml(text("photoPending"))}</span></div>`;
    }

    function attractionCard(attraction) {
        const title = escapeHtml(localized(attraction.nameAr, attraction.nameEn));
        const secondName = escapeHtml(localized(attraction.nameEn, attraction.nameAr));
        const description = attraction.descriptionAr || attraction.descriptionEn;
        const image = attraction.image
            ? `<img src="${escapeHtml(attraction.image)}" alt="${title}" loading="lazy">`
            : imagePlaceholder();
        return `<article class="attraction-card">
            ${image}
            <div class="attraction-copy">
                <h3>${title}</h3>
                <p>${secondName}</p>
                ${description ? `<p>${escapeHtml(localized(attraction.descriptionAr, attraction.descriptionEn))}</p>` : ""}
                <a class="text-link" href="destinations.html?attraction=${encodeURIComponent(attraction.id)}">${escapeHtml(text("detailsLink"))}</a>
            </div>
        </article>`;
    }

    function coordinatesAreVerified(attraction) {
        return Number.isFinite(attraction.latitude) &&
            Number.isFinite(attraction.longitude) &&
            attraction.latitude >= -90 && attraction.latitude <= 90 &&
            attraction.longitude >= -180 && attraction.longitude <= 180 &&
            attraction.navigationStatus === "verified";
    }

    function mapMessage(attractions) {
        const verified = attractions.some(coordinatesAreVerified);
        return verified ? text("mapPrepared") : text("mapPending");
    }

    function mapNotice(attractions) {
        return `<section class="destination-map-section">
            <aside class="map-notice">
                <span class="map-icon" aria-hidden="true">⌖</span>
                <div><strong>${escapeHtml(text("mapTitle"))}</strong><p>${escapeHtml(mapMessage(attractions))}</p></div>
            </aside>
            <div class="jordan-map" id="destinationMap" role="region" aria-label="${escapeHtml(text("mapTitle"))}"></div>
            <p class="map-unavailable" id="destinationMapStatus" role="status" aria-live="polite"></p>
        </section>`;
    }

    function renderDirectory() {
        pageBreadcrumbs([{ label: text("home"), href: "index.html" }, { label: text("directory") }]);
        app.innerHTML = `<section class="page-intro">
            <span class="eyebrow">${escapeHtml(text("directoryKicker"))}</span>
            <h1>${escapeHtml(text("directoryTitle"))}</h1>
            <p>${escapeHtml(text("directoryIntro"))}</p>
        </section>
        <section aria-label="${escapeHtml(text("directoryTitle"))}">
            <div class="governorate-grid">${dataset.governorates.map(governorate => {
                const title = escapeHtml(localized(governorate.nameAr, governorate.nameEn));
                const secondary = escapeHtml(localized(governorate.nameEn, governorate.nameAr));
                return `<a class="governorate-card" href="destinations.html?governorate=${encodeURIComponent(governorate.id)}">
                    <h2>${title}<span class="name-secondary">${secondary}</span></h2>
                    <span class="card-foot"><span>${countFor(governorate.id)} ${escapeHtml(text("placeCount"))}</span><span class="card-arrow">${escapeHtml(text("openGovernorate"))}</span></span>
                </a>`;
            }).join("")}</div>
        </section>`;
    }

    function renderGovernorate(governorate) {
        const label = localized(governorate.nameAr, governorate.nameEn);
        const attractions = dataset.attractions.filter(attraction => attraction.governorateId === governorate.id);
        const categories = [...new Set(attractions.map(attraction => attraction.category).filter(Boolean))].sort();
        pageBreadcrumbs([
            { label: text("home"), href: "index.html" },
            { label: text("directory"), href: "destinations.html?view=governorates" },
            { label }
        ]);
        app.innerHTML = `<section class="province-hero">
            <div class="province-hero-copy">
                <span class="eyebrow">${escapeHtml(text("governorateKicker"))}</span>
                <h1>${escapeHtml(localized(governorate.nameAr, governorate.nameEn))}</h1>
                <p>${escapeHtml(localized(governorate.nameEn, governorate.nameAr))}</p>
                <p>${escapeHtml(text("introPending"))}</p>
            </div>
            ${imagePlaceholder()}
        </section>
        <section aria-labelledby="attractionsHeading">
            <h2 class="section-title" id="attractionsHeading">${escapeHtml(text("attractionsTitle"))}</h2>
            <div class="filter-panel">
                <div class="filter-controls">
                    <label class="field-label" for="attractionSearch">${escapeHtml(text("searchLabel"))}
                        <input id="attractionSearch" type="search" placeholder="${escapeHtml(text("searchPlaceholder"))}" autocomplete="off">
                    </label>
                    <label class="field-label" for="categoryFilter">${escapeHtml(text("categoryLabel"))}
                        <select id="categoryFilter" ${categories.length ? "" : "disabled"}>
                            <option value="">${escapeHtml(categories.length ? text("allCategories") : text("categoryPending"))}</option>
                            ${categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}
                        </select>
                    </label>
                </div>
            </div>
            <p class="result-count" id="resultCount" aria-live="polite"></p>
            <div class="attraction-list" id="attractionList"></div>
        </section>
        ${mapNotice(attractions)}`;

        const search = document.getElementById("attractionSearch");
        const categoryFilter = document.getElementById("categoryFilter");
        const list = document.getElementById("attractionList");
        const resultCount = document.getElementById("resultCount");
        let destinationMap = null;
        function updateList() {
            const query = search.value.trim().toLocaleLowerCase(language);
            const selectedCategory = categoryFilter.value;
            const visible = attractions.filter(attraction => {
                const searchable = `${attraction.nameAr || ""} ${attraction.nameEn || ""}`.toLocaleLowerCase(language);
                return searchable.includes(query) && (!selectedCategory || attraction.category === selectedCategory);
            });
            resultCount.textContent = `${visible.length} ${text("results")}`;
            list.innerHTML = visible.length
                ? visible.map(attractionCard).join("")
                : `<p class="empty-state">${escapeHtml(text("noResults"))}</p>`;
            if (destinationMap) destinationMap.update(visible);
        }
        search.addEventListener("input", updateList);
        categoryFilter.addEventListener("change", updateList);
        updateList();
        if (window.JordanMap) {
            window.JordanMap.mount(
                document.getElementById("destinationMap"),
                attractions,
                {
                    language,
                    statusElement: document.getElementById("destinationMapStatus"),
                    detailHref: attraction => `destinations.html?attraction=${encodeURIComponent(attraction.id)}`
                }
            ).then(map => {
                destinationMap = map;
                if (destinationMap) destinationMap.update(attractions);
            });
        }
    }

    function detailFact(label, value, sourceUrl, sourceCheckedOn) {
        if (value === null || value === undefined || value === "" || (Array.isArray(value) && !value.length)) return "";
        const displayValue = Array.isArray(value) ? value.join(language === "ar" ? "، " : ", ") : value;
        const source = sourceUrl === officialFeeSource
            ? `<a class="detail-source" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text("feesSource"))}</a>
                <span class="detail-source-date">${escapeHtml(text("feeCheckedOn"))}: ${escapeHtml(sourceCheckedOn || "")}</span>`
            : "";
        return `<div class="detail-fact"><span>${escapeHtml(label)}</span><strong>${escapeHtml(displayValue)}</strong>${source}</div>`;
    }

    function hasData(value) {
        return value !== null && value !== undefined && value !== "" &&
            (!Array.isArray(value) || value.length > 0);
    }

    function directionLinks(attraction) {
        if (!coordinatesAreVerified(attraction)) {
            return `<span class="direction-button" aria-disabled="true">${escapeHtml(text("directionsPending"))}</span>`;
        }
        const destination = `${attraction.latitude},${attraction.longitude}`;
        const google = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
        const apple = `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;
        return `<div class="direction-actions">
            <label class="direction-mode" for="directionMode">${escapeHtml(text("travelMode"))}
                <select id="directionMode">
                    <option value="driving">${escapeHtml(text("driving"))}</option>
                    <option value="walking">${escapeHtml(text("walking"))}</option>
                    <option value="transit">${escapeHtml(text("transit"))}</option>
                    <option value="bicycling">${escapeHtml(text("bicycling"))}</option>
                </select>
            </label>
            <a class="direction-button" id="googleDirectionsLink" href="${escapeHtml(google)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text("googleMaps"))}</a>
            <a class="direction-button" id="appleDirectionsLink" href="${escapeHtml(apple)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text("appleMaps"))}</a>
            <p class="route-disclaimer">${escapeHtml(text("routeNote"))}</p>
        </div>`;
    }

    function renderAttraction(attraction) {
        const governorate = dataset.governorates.find(item => item.id === attraction.governorateId);
        const governorateName = governorate ? localized(governorate.nameAr, governorate.nameEn) : localized(attraction.governorateAr, attraction.governorateEn);
        const title = localized(attraction.nameAr, attraction.nameEn);
        pageBreadcrumbs([
            { label: text("home"), href: "index.html" },
            { label: text("directory"), href: "destinations.html?view=governorates" },
            ...(governorate ? [{ label: governorateName, href: `destinations.html?governorate=${encodeURIComponent(governorate.id)}` }] : []),
            { label: title }
        ]);
        const photos = (attraction.gallery || []).filter(Boolean);
        const galleryMarkup = photos.length
            ? `<section class="detail-panel"><h2>${escapeHtml(text("gallery"))}</h2><div class="gallery-grid">${photos.map((photo, index) =>
                `<a href="${escapeHtml(photo)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(text("imageOpen"))}">
                    <img src="${escapeHtml(photo)}" alt="${escapeHtml(title)} ${index + 1}" loading="lazy">
                </a>`).join("")}</div></section>`
            : `<section class="detail-panel">${imagePlaceholder()}</section>`;
        const facts = [
            detailFact(text("governorateLabel"), governorateName),
            detailFact(text("city"), localized(attraction.cityAr, attraction.cityEn)),
            detailFact(text("category"), localized(attraction.categoryAr, attraction.categoryEn) || attraction.category),
            detailFact(text("location"), attraction.locationName),
            detailFact(text("mapCoordinates"), attraction.latitude !== null && attraction.longitude !== null ? `${attraction.latitude}, ${attraction.longitude}` : null),
            detailFact(text("hours"), localized(attraction.visitingHours?.ar, attraction.visitingHours?.en) || attraction.visitingHours),
            detailFact(
                text("fees"),
                localized(attraction.entranceFee?.ar, attraction.entranceFee?.en) || attraction.entranceFee,
                attraction.entranceFeeSource,
                attraction.entranceFeeCheckedOn
            ),
            detailFact(text("bestTime"), localized(attraction.bestVisitingTime?.ar, attraction.bestVisitingTime?.en) || attraction.bestVisitingTime),
            detailFact(text("access"), localized(attraction.accessibility?.ar, attraction.accessibility?.en) || attraction.accessibility)
        ].join("");
        const description = localized(attraction.descriptionAr, attraction.descriptionEn);
        const historical = localized(attraction.historicalInfoAr, attraction.historicalInfoEn);
        const activities = localized(attraction.activitiesAr, attraction.activitiesEn) || attraction.activities;
        const nearby = localized(attraction.nearbyAttractionsAr, attraction.nearbyAttractionsEn) || attraction.nearbyAttractions;
        const videoMarkup = attraction.videoUrl
            ? `<section class="detail-panel"><h2>${escapeHtml(text("video"))}</h2><video class="video-player" controls preload="none" playsinline poster="${attraction.image ? escapeHtml(attraction.image) : ""}"><source src="${escapeHtml(attraction.videoUrl)}" type="video/mp4"></video></section>`
            : "";
        app.innerHTML = `<a class="return-link" href="destinations.html?governorate=${encodeURIComponent(attraction.governorateId)}">← ${escapeHtml(text("backToGovernorate"))}</a>
        <header class="detail-heading">
            <span class="eyebrow">${escapeHtml(governorateName)}</span>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(localized(attraction.nameEn, attraction.nameAr))}</p>
            <span class="pending-badge">${escapeHtml(attraction.verificationStatus === "verified" ? text("statusVerified") : text("statusPending"))}</span>
        </header>
        <div class="detail-layout">
            <div class="detail-main">
                ${galleryMarkup}
                <section class="detail-panel"><h2>${escapeHtml(text("description"))}</h2><p>${escapeHtml(description || text("pendingDescription"))}</p></section>
                ${historical ? `<section class="detail-panel"><h2>${escapeHtml(text("history"))}</h2><p>${escapeHtml(historical)}</p></section>` : ""}
                ${videoMarkup}
                ${hasData(activities) ? `<section class="detail-panel"><h2>${escapeHtml(text("activities"))}</h2><p>${escapeHtml(activities)}</p></section>` : ""}
                ${hasData(nearby) ? `<section class="detail-panel"><h2>${escapeHtml(text("nearby"))}</h2><p>${escapeHtml(nearby)}</p></section>` : ""}
            </div>
            <aside class="detail-side">
                <section class="detail-panel"><h2>${escapeHtml(text("governorateLabel"))}</h2><div class="detail-facts">${facts || `<p>${escapeHtml(text("detailPending"))}</p>`}</div></section>
                <section class="detail-panel"><h2>${escapeHtml(text("directions"))}</h2>${directionLinks(attraction)}</section>
            </aside>
        </div>
        ${mapNotice([attraction])}`;
        const directionMode = document.getElementById("directionMode");
        if (directionMode) {
            directionMode.addEventListener("change", () => {
                const destination = `${attraction.latitude},${attraction.longitude}`;
                document.getElementById("googleDirectionsLink").href =
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(directionMode.value)}`;
                const appleLink = document.getElementById("appleDirectionsLink");
                const appleModes = { driving: "d", walking: "w", transit: "r" };
                appleLink.hidden = !appleModes[directionMode.value];
                if (appleModes[directionMode.value]) {
                    appleLink.href = `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=${appleModes[directionMode.value]}`;
                }
            });
        }
        if (window.JordanMap) {
            window.JordanMap.mount(
                document.getElementById("destinationMap"),
                [attraction],
                {
                    language,
                    statusElement: document.getElementById("destinationMapStatus"),
                    detailHref: place => `destinations.html?attraction=${encodeURIComponent(place.id)}`
                }
            );
        }
    }

    function renderNotFound() {
        pageBreadcrumbs([{ label: text("home"), href: "index.html" }]);
        app.innerHTML = `<section class="not-found"><h1>${escapeHtml(text("notFoundTitle"))}</h1>
            <p>${escapeHtml(text("notFoundBody"))}</p>
            <a class="text-link" href="destinations.html?view=governorates">${escapeHtml(text("homeButton"))}</a>
        </section>`;
    }

    function renderRoute() {
        const attractionId = params.get("attraction");
        const governorateId = params.get("governorate");
        if (attractionId) {
            const attraction = dataset.attractions.find(item => item.id === attractionId);
            if (attraction) {
                document.title = `${localized(attraction.nameAr, attraction.nameEn)} | ${text("brand")}`;
                renderAttraction(attraction);
                return;
            }
        } else if (governorateId) {
            const governorate = dataset.governorates.find(item => item.id === governorateId);
            if (governorate) {
                document.title = `${localized(governorate.nameAr, governorate.nameEn)} | ${text("brand")}`;
                renderGovernorate(governorate);
                return;
            }
        } else if (!params.has("view") || params.get("view") === "governorates") {
            document.title = `${text("directory")} | ${text("brand")}`;
            renderDirectory();
            return;
        }
        renderNotFound();
    }

    languageButton.addEventListener("click", () => setLanguage(language === "ar" ? "en" : "ar"));
    themeButton.addEventListener("click", () => {
        const dark = document.documentElement.dataset.theme !== "dark";
        if (dark) document.documentElement.dataset.theme = "dark";
        else document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("jordan-guide-theme", dark ? "dark" : "light");
        updateThemeButton();
    });
    if (localStorage.getItem("jordan-guide-theme") === "dark") document.documentElement.dataset.theme = "dark";
    setLanguage(language);

    fetch("data/attractions.json")
        .then(response => {
            if (!response.ok) throw new Error(`Dataset request failed: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.governorates) || !Array.isArray(data.attractions)) {
                throw new Error("Dataset is missing governorates or attractions arrays.");
            }
            dataset = data;
            renderRoute();
        })
        .catch(error => {
            console.error("Unable to load destination data.", error);
            app.innerHTML = `<p class="status-message" role="alert">${escapeHtml(text("loadError"))}</p>`;
        });
})();
