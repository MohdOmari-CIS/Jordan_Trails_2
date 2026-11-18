(() => {
    let leafletStylesPromise;
    let leafletPromise;

    function loadLeaflet() {
        if (!leafletStylesPromise) {
            leafletStylesPromise = new Promise((resolve, reject) => {
                const stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                stylesheet.onload = resolve;
                stylesheet.onerror = () => reject(new Error("Leaflet styles could not be loaded."));
                document.head.appendChild(stylesheet);
            }).catch(error => {
                leafletStylesPromise = null;
                throw error;
            });
        }
        return leafletStylesPromise.then(() => {
            if (window.L) return window.L;
            if (!leafletPromise) {
                leafletPromise = new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                    script.onload = () => {
                        if (!window.L) reject(new Error("Leaflet did not initialize."));
                        else resolve(window.L);
                    };
                    script.onerror = () => reject(new Error("Leaflet could not be loaded."));
                    document.head.appendChild(script);
                }).catch(error => {
                    leafletPromise = null;
                    throw error;
                });
            }
            return leafletPromise;
        });
    }

    function validCoordinates(place) {
        return Number.isFinite(place.latitude) &&
            Number.isFinite(place.longitude) &&
            place.latitude >= -90 && place.latitude <= 90 &&
            place.longitude >= -180 && place.longitude <= 180 &&
            place.navigationStatus === "verified";
    }

    function popupContent(L, place, language, detailHref) {
        const content = document.createElement("div");
        const title = document.createElement("strong");
        title.textContent = language === "en" ? (place.nameEn || place.nameAr) : (place.nameAr || place.nameEn);
        content.appendChild(title);
        if (place.image) {
            const image = document.createElement("img");
            image.src = place.image;
            image.alt = title.textContent;
            image.width = 150;
            image.loading = "lazy";
            image.style.display = "block";
            image.style.maxWidth = "150px";
            image.style.margin = "6px 0";
            content.appendChild(image);
        }
        const governorate = document.createElement("div");
        governorate.textContent = language === "en" ? (place.governorateEn || "") : (place.governorateAr || "");
        content.appendChild(governorate);
        if (detailHref) {
            const link = document.createElement("a");
            link.href = detailHref;
            link.textContent = language === "en" ? "View details" : "عرض التفاصيل";
            content.appendChild(link);
        }
        return L.popup().setContent(content);
    }

    async function mount(container, places, options) {
        const settings = options || {};
        const status = settings.statusElement || null;
        let language = settings.language === "en" ? "en" : "ar";
        const detailHref = typeof settings.detailHref === "function" ? settings.detailHref : null;
        try {
            const L = await loadLeaflet();
            const map = L.map(container, { scrollWheelZoom: false }).setView([31.2, 36.2], 7);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
            }).addTo(map);
            const markers = L.featureGroup().addTo(map);
            let userMarker = null;
            let currentPlaces = places || [];

            function update(nextPlaces) {
                markers.clearLayers();
                currentPlaces = nextPlaces || [];
                const available = currentPlaces.filter(validCoordinates);
                available.forEach(place => {
                    const marker = L.marker([place.latitude, place.longitude]);
                    marker.bindPopup(popupContent(L, place, language, detailHref && detailHref(place)));
                    markers.addLayer(marker);
                });
                if (available.length) {
                    map.fitBounds(markers.getBounds().pad(0.15), { maxZoom: 12 });
                    if (status) status.textContent = "";
                } else if (status) {
                    status.textContent = language === "en"
                        ? "No verified attraction coordinates are available for this view yet."
                        : "لا تتوفر إحداثيات معالم موثقة لهذا العرض حتى الآن.";
                }
            }

            function showUserLocation(latitude, longitude) {
                const point = [latitude, longitude];
                map.setView(point, 11);
                if (userMarker) map.removeLayer(userMarker);
                userMarker = L.circleMarker(point, {
                    radius: 8,
                    color: "#17251f",
                    fillColor: "#e8c18c",
                    fillOpacity: 0.9
                }).addTo(map);
                userMarker.bindPopup(language === "en" ? "Your approximate location" : "موقعك التقريبي");
            }

            function setLanguage(nextLanguage) {
                language = nextLanguage === "en" ? "en" : "ar";
                update(currentPlaces);
                if (userMarker) {
                    userMarker.bindPopup(language === "en" ? "Your approximate location" : "موقعك التقريبي");
                }
            }

            update(places);
            window.requestAnimationFrame(() => map.invalidateSize());
            return { update, showUserLocation, setLanguage, map };
        } catch (error) {
            if (status) {
                status.textContent = language === "en"
                    ? "The map could not be loaded. Check your internet connection and try again."
                    : "تعذر تحميل الخريطة. تحقق من اتصال الإنترنت ثم أعد المحاولة.";
            }
            console.error("Unable to initialize the map.", error);
            return null;
        }
    }

    window.JordanMap = { mount, validCoordinates };
})();
