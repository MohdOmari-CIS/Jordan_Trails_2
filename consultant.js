(() => {
    const root = document.documentElement;
    const questionElement = document.getElementById("advisorQuestion");
    const optionsElement = document.getElementById("advisorOptions");
    const followupElement = document.getElementById("advisorFollowup");
    const feedbackElement = document.getElementById("advisorFeedback");
    const nextButton = document.getElementById("advisorNext");
    const backButton = document.getElementById("advisorBack");
    const chat = document.getElementById("advisorChat");
    const resultsSection = document.getElementById("advisorResults");
    const resultList = document.getElementById("advisorResultList");
    const state = {
        language: root.dataset.language === "en" ? "en" : "ar",
        dataset: null,
        index: 0,
        answers: Array(7).fill(null),
        location: null,
        map: null,
        mapOpen: false,
        mapMode: "recommended",
        results: []
    };

    const strings = {
        ar: {
            step: "السؤال {0} من 7",
            chooseAnswer: "اختر إجابة للمتابعة.",
            question1: "ما نوع الرحلات التي تفضلها؟",
            question2: "ما البيئات التي تفضل زيارتها؟",
            question3: "مع من تخطط للرحلة؟",
            question4: "كم المدة المتاحة لرحلتك؟",
            question5: "ما مستوى المغامرة الذي تفضله؟",
            question6: "ما ميزانيتك التقريبية؟",
            question7: "من أين ستبدأ رحلتك؟",
            q1: [
                ["historical", "المواقع الأثرية والتاريخية"],
                ["nature", "الطبيعة والغابات"],
                ["adventure", "المغامرات والتحديات"],
                ["religious", "المواقع الدينية"],
                ["relaxation", "الترفيه والاستجمام"],
                ["marine", "الشواطئ والأنشطة البحرية"],
                ["cultural", "التجارب الثقافية والتراثية"],
                ["all", "مزيج من جميع الأنواع"]
            ],
            q2: [
                ["mountains", "الجبال"], ["forests", "الغابات"], ["desert", "الصحارى"],
                ["valleys", "الأودية والشلالات"], ["sea", "البحر والشواطئ"],
                ["heritage", "المدن والقرى التراثية"], ["archaeological", "المواقع الأثرية"],
                ["no_preference", "لا يوجد تفضيل محدد"]
            ],
            q3: [
                ["solo", "بمفردي"], ["friends", "مع الأصدقاء"], ["family", "مع العائلة"],
                ["partner", "مع شريك حياتي"], ["group", "ضمن مجموعة سياحية"]
            ],
            q4: [
                ["hours", "عدة ساعات"], ["one_day", "يوم واحد"], ["two_days", "يومان"],
                ["three_to_five", "من 3 إلى 5 أيام"], ["week_or_more", "أسبوع أو أكثر"]
            ],
            q5: [
                ["quiet", "هادئ ومريح"], ["light", "أنشطة خفيفة"],
                ["moderate", "مغامرات متوسطة"], ["strong", "مغامرات قوية وتحديات"]
            ],
            q6: [
                ["economy", "اقتصادية"], ["medium", "متوسطة"], ["high", "مرتفعة"],
                ["unspecified", "لا توجد ميزانية محددة"]
            ],
            q7: [
                ["current_location", "تحديد موقعي الحالي"],
                ["governorate", "اختيار محافظة"],
                ["area", "كتابة اسم المدينة أو المنطقة"],
                ["skip", "تخطي السؤال"]
            ],
            currentLocation: "جارٍ طلب إذن الموقع من المتصفح...",
            locationUnavailable: "تعذر الحصول على موقعك. يمكنك اختيار محافظة أو تخطي السؤال.",
            locationDenied: "لم يُسمح بالوصول إلى الموقع. يمكنك اختيار محافظة أو تخطي السؤال.",
            locationUnsupported: "المتصفح لا يدعم تحديد الموقع. يمكنك اختيار محافظة أو تخطي السؤال.",
            locationReady: "تم تحديد موقعك لهذا الترشيح فقط، ولم يتم حفظه.",
            chooseGovernorate: "اختر المحافظة",
            enterArea: "اكتب المدينة أو المنطقة",
            areaPlaceholder: "مثال: عمّان",
            noMatches: "لم نجد وجهة تملك بيانات موثوقة كافية لمطابقة هذه الإجابات. جرّب تعديل إجاباتك أو تصفح المحافظات.",
            noProfiles: "لا توجد ملفات ترشيح جاهزة بعد.",
            fewerThanFive: "تظهر الوجهات المتاحة فقط. لا تُختلق نتائج لإكمال العدد خمسة.",
            profileNotice: "الدرجات أولية وتعتمد فقط على مجالات التفضيل المتاحة في بيانات المشروع. الإجابات المتعلقة بالمدة والمجموعة والمغامرة والميزانية لا تؤثر بعد لعدم توفر بيانات موثقة عنها.",
            provisional: "مطابقة أولية",
            compatibility: "التوافق",
            why: "سبب الترشيح",
            noReason: "تطابق مع التفضيلات المسجلة لهذا المكان.",
            details: "عرض التفاصيل",
            directionsPending: "الاتجاهات غير متاحة حتى يتم توثيق الإحداثيات.",
            gov: "المحافظة",
            noPhoto: "الصورة غير متاحة",
            basedOn: "اعتمادًا على",
            choiceTravel: "نوع الرحلة",
            choiceEnvironment: "البيئة",
            choiceLocation: "محافظة البداية",
            mapAll: "عرض جميع المعالم",
                mapRecommended: "عرض الوجهات المقترحة",
                mapHide: "إخفاء الخريطة",
            mapEmpty: "لم يتم التحقق من إحداثيات المعالم بعد، لذلك لا تظهر علامات على الخريطة.",
                mapPanelLabel: "خريطة الوجهات المقترحة",
                mapRegionLabel: "خريطة تفاعلية للأردن",
            mapAttribution: "© OpenStreetMap contributors",
            mapPermission: "يُطلب إذن الموقع فقط عند اختيار تحديد الموقع الحالي.",
            errorData: "تعذر تحميل بيانات الترشيح. تحقق من خادم المشروع وملف البيانات.",
            missing: "بيانات هذا المجال غير متوفرة لهذا المعلم.",
            pendingDescription: "الوصف السياحي قيد التوثيق.",
            directions: "احصل على الاتجاهات",
            percent: "{0}٪"
        },
        en: {
            step: "Question {0} of 7",
            chooseAnswer: "Choose an answer to continue.",
            question1: "What type of trips do you prefer?",
            question2: "Which environments would you like to visit?",
            question3: "Who are you planning to travel with?",
            question4: "How much time do you have for your trip?",
            question5: "What level of adventure do you prefer?",
            question6: "What is your approximate budget?",
            question7: "Where will your trip start?",
            q1: [
                ["historical", "Archaeological and historic sites"],
                ["nature", "Nature and forests"],
                ["adventure", "Adventure and challenges"],
                ["religious", "Religious sites"],
                ["relaxation", "Leisure and relaxation"],
                ["marine", "Beaches and marine activities"],
                ["cultural", "Cultural and heritage experiences"],
                ["all", "A mix of all types"]
            ],
            q2: [
                ["mountains", "Mountains"], ["forests", "Forests"], ["desert", "Deserts"],
                ["valleys", "Wadis and waterfalls"], ["sea", "Sea and beaches"],
                ["heritage", "Heritage towns and villages"], ["archaeological", "Archaeological sites"],
                ["no_preference", "No specific preference"]
            ],
            q3: [
                ["solo", "On my own"], ["friends", "With friends"], ["family", "With family"],
                ["partner", "With my partner"], ["group", "In a tour group"]
            ],
            q4: [
                ["hours", "A few hours"], ["one_day", "One day"], ["two_days", "Two days"],
                ["three_to_five", "3 to 5 days"], ["week_or_more", "A week or more"]
            ],
            q5: [
                ["quiet", "Relaxed and easy"], ["light", "Light activities"],
                ["moderate", "Moderate adventure"], ["strong", "High-adventure challenges"]
            ],
            q6: [
                ["economy", "Budget"], ["medium", "Moderate"], ["high", "High"],
                ["unspecified", "No specific budget"]
            ],
            q7: [
                ["current_location", "Use my current location"],
                ["governorate", "Choose a governorate"],
                ["area", "Enter a city or area"],
                ["skip", "Skip this question"]
            ],
            currentLocation: "Requesting location permission from your browser...",
            locationUnavailable: "Your location could not be obtained. Choose a governorate or skip this question.",
            locationDenied: "Location permission was not granted. Choose a governorate or skip this question.",
            locationUnsupported: "This browser does not support geolocation. Choose a governorate or skip this question.",
            locationReady: "Your location is being used for this recommendation only; it is not saved.",
            chooseGovernorate: "Choose a governorate",
            enterArea: "Enter the city or area",
            areaPlaceholder: "For example: Amman",
            noMatches: "No destination has enough documented matching data for these answers. Try changing your choices or browse the governorates.",
            noProfiles: "No recommendation profiles are available yet.",
            fewerThanFive: "Only available matches are shown. Results are not invented to fill all five slots.",
            profileNotice: "Scores are preliminary and use only preference fields currently available in the project data. Group, duration, adventure, and budget answers do not affect ranking yet because verified data for those factors is unavailable.",
            provisional: "Preliminary match",
            compatibility: "Compatibility",
            why: "Why it matches",
            noReason: "It matches the preferences currently recorded for this destination.",
            details: "View details",
            directionsPending: "Directions are unavailable until coordinates are verified.",
            gov: "Governorate",
            noPhoto: "Photo unavailable",
            basedOn: "Based on",
            choiceTravel: "Trip type",
            choiceEnvironment: "Environment",
            choiceLocation: "Starting governorate",
            mapAll: "View all attractions",
            mapRecommended: "View recommended destinations",
            mapHide: "Hide map",
            mapEmpty: "Attraction coordinates have not been verified yet, so map pins are not available.",
            mapPanelLabel: "Recommended destinations map",
            mapRegionLabel: "Interactive map of Jordan",
            mapAttribution: "© OpenStreetMap contributors",
            mapPermission: "Location permission is requested only if you choose to use your current location.",
            errorData: "Recommendation data could not be loaded. Check the project server and data file.",
            missing: "This factor is not available for this attraction.",
            pendingDescription: "The visitor description is being verified.",
            directions: "Get directions",
            percent: "{0}%"
        }
    };

    const questions = [
        { prompt: "question1", options: "q1" },
        { prompt: "question2", options: "q2" },
        { prompt: "question3", options: "q3" },
        { prompt: "question4", options: "q4" },
        { prompt: "question5", options: "q5" },
        { prompt: "question6", options: "q6" },
        { prompt: "question7", options: "q7" }
    ];
    const facetWeights = [
        { answerIndex: 0, field: "travelTypes", weight: 30, reasonKey: "choiceTravel" },
        { answerIndex: 1, field: "environments", weight: 20, reasonKey: "choiceEnvironment" },
        { answerIndex: 2, field: "groupTypes", weight: 10 },
        { answerIndex: 3, field: "tripDurations", weight: 15 },
        { answerIndex: 4, field: "adventureLevels", weight: 10 },
        { answerIndex: 5, field: "budgetLevels", weight: 10 },
        { answerIndex: 6, field: "locationGovernorates", weight: 5, reasonKey: "choiceLocation" }
    ];

    const t = (key, ...values) => {
        let value = strings[state.language][key] || key;
        values.forEach((item, index) => { value = value.replace(`{${index}}`, item); });
        return value;
    };
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
    const localized = (arabic, english) => state.language === "en"
        ? (english || arabic || "")
        : (arabic || english || "");

    function renderQuestion() {
        if (!state.dataset) return;
        const question = questions[state.index];
        const answer = state.answers[state.index];
        questionElement.textContent = t(question.prompt);
        document.getElementById("advisorProgressText").textContent = t("step", state.index + 1);
        document.getElementById("advisorProgress").value = state.index + 1;
        document.getElementById("advisorProgress").setAttribute("aria-label", t("step", state.index + 1));
        optionsElement.innerHTML = strings[state.language][question.options].map(([value, label]) => `
            <label class="advisor-option">
                <input type="radio" name="advisorAnswer" value="${escapeHtml(value)}" ${answer && answer.value === value ? "checked" : ""}>
                <span>${escapeHtml(label)}</span>
            </label>`).join("");
        feedbackElement.textContent = "";
        renderFollowup();
        optionsElement.querySelectorAll('input[name="advisorAnswer"]').forEach(input => {
            input.addEventListener("change", () => selectAnswer(input.value));
        });
        backButton.disabled = state.index === 0;
        updateNextState();
    }

    function renderFollowup() {
        followupElement.innerHTML = "";
        const answer = state.answers[state.index];
        if (state.index !== 6 || !answer) {
            updateNextState();
            return;
        }
        if (answer.value === "governorate") {
            const options = state.dataset.governorates.map(governorate =>
                `<option value="${escapeHtml(governorate.id)}" ${answer.detail === governorate.id ? "selected" : ""}>${escapeHtml(localized(governorate.nameAr, governorate.nameEn))}</option>`
            ).join("");
            followupElement.innerHTML = `<label class="sr-only" for="advisorStartingGovernorate">${escapeHtml(t("chooseGovernorate"))}</label>
                <select id="advisorStartingGovernorate"><option value="">${escapeHtml(t("chooseGovernorate"))}</option>${options}</select>`;
            document.getElementById("advisorStartingGovernorate").addEventListener("change", event => {
                answer.detail = event.target.value || null;
                updateNextState();
            });
        } else if (answer.value === "area") {
            followupElement.innerHTML = `<label class="sr-only" for="advisorStartingArea">${escapeHtml(t("enterArea"))}</label>
                <input id="advisorStartingArea" type="text" maxlength="100" placeholder="${escapeHtml(t("areaPlaceholder"))}" value="${escapeHtml(answer.detail || "")}">`;
            document.getElementById("advisorStartingArea").addEventListener("input", event => {
                answer.detail = event.target.value.trim() || null;
                updateNextState();
            });
        } else if (answer.value === "current_location") {
            feedbackElement.textContent = state.location ? t("locationReady") : t("currentLocation");
        }
        updateNextState();
    }

    function updateNextState() {
        const answer = state.answers[state.index];
        let valid = Boolean(answer && answer.value);
        if (state.index === 6 && answer) {
            if (answer.value === "governorate" || answer.value === "area") valid = Boolean(answer.detail);
            if (answer.value === "current_location") valid = Boolean(state.location);
        }
        nextButton.disabled = !valid;
    }

    function selectAnswer(value) {
        const previous = state.answers[state.index];
        state.answers[state.index] = {
            value,
            detail: previous && previous.value === value ? previous.detail : null
        };
        if (state.index === 6 && value === "current_location") requestLocation();
        else renderFollowup();
        updateNextState();
    }

    function requestLocation() {
        state.location = null;
        if (!navigator.geolocation) {
            feedbackElement.textContent = t("locationUnsupported");
            updateNextState();
            return;
        }
        feedbackElement.textContent = t("currentLocation");
        navigator.geolocation.getCurrentPosition(position => {
            if (!state.answers[6] || state.answers[6].value !== "current_location") return;
            state.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            feedbackElement.textContent = t("locationReady");
            updateNextState();
        }, error => {
            if (!state.answers[6] || state.answers[6].value !== "current_location") return;
            feedbackElement.textContent = error.code === error.PERMISSION_DENIED
                ? t("locationDenied")
                : t("locationUnavailable");
            updateNextState();
        }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
    }

    function continueSurvey() {
        if (nextButton.disabled) {
            feedbackElement.textContent = t("chooseAnswer");
            return;
        }
        if (state.index < questions.length - 1) {
            state.index += 1;
            renderQuestion();
            questionElement.focus?.();
            return;
        }
        showResults();
    }

    function haversineKm(from, to) {
        const radians = degrees => degrees * Math.PI / 180;
        const latitudeDelta = radians(to.latitude - from.latitude);
        const longitudeDelta = radians(to.longitude - from.longitude);
        const value = Math.sin(latitudeDelta / 2) ** 2 +
            Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) *
            Math.sin(longitudeDelta / 2) ** 2;
        return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
    }

    function calculateScore(attraction, profile) {
        let possibleWeight = 0;
        let earnedWeight = 0;
        const reasons = [];
        facetWeights.forEach(facet => {
            const answer = state.answers[facet.answerIndex];
            if (!answer || answer.value === "skip" || answer.value === "unspecified" || answer.value === "no_preference") return;

            if (facet.answerIndex === 6) {
                if (answer.value === "governorate" && answer.detail && attraction.governorateId) {
                    possibleWeight += facet.weight;
                    if (attraction.governorateId === answer.detail) {
                        earnedWeight += facet.weight;
                        reasons.push(facet.reasonKey);
                    }
                } else if (answer.value === "current_location" && state.location &&
                    window.JordanMap && window.JordanMap.validCoordinates(attraction)) {
                    possibleWeight += facet.weight;
                    const distance = haversineKm(state.location, attraction);
                    earnedWeight += facet.weight * Math.max(0, 1 - distance / 600);
                    reasons.push(facet.reasonKey);
                }
                return;
            }

            const candidateValues = profile[facet.field];
            if (!Array.isArray(candidateValues) || !candidateValues.length) return;
            possibleWeight += facet.weight;
            const matches = answer.value === "all" || candidateValues.includes(answer.value);
            if (matches) {
                earnedWeight += facet.weight;
                if (facet.reasonKey) reasons.push(facet.reasonKey);
            }
        });
        if (!possibleWeight || !earnedWeight) return null;
        return {
            score: Math.round(earnedWeight / possibleWeight * 100),
            coveredWeight: possibleWeight,
            reasons
        };
    }

    function rankedResults() {
        const profiles = Array.isArray(state.dataset.recommendationProfiles)
            ? state.dataset.recommendationProfiles
            : [];
        const byId = new Map(state.dataset.attractions.map(attraction => [attraction.id, attraction]));
        return profiles
            .filter(profile => profile && profile.status && byId.has(profile.attractionId))
            .map(profile => {
                const attraction = byId.get(profile.attractionId);
                const result = calculateScore(attraction, profile);
                return result ? { attraction, profile, ...result } : null;
            })
            .filter(Boolean)
            .sort((left, right) => right.score - left.score || left.attraction.id.localeCompare(right.attraction.id))
            .slice(0, 5);
    }

    function detailHref(attraction) {
        return `destinations.html?attraction=${encodeURIComponent(attraction.id)}`;
    }

    function mapDirections(attraction) {
        if (!window.JordanMap || !window.JordanMap.validCoordinates(attraction)) {
            return `<span aria-disabled="true">${escapeHtml(t("directionsPending"))}</span>`;
        }
        const destination = `${attraction.latitude},${attraction.longitude}`;
        const google = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
        return `<a href="${escapeHtml(google)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("directions"))}</a>`;
    }

    function renderResults() {
        const resultsNote = document.getElementById("advisorResultsNote");
        resultsNote.textContent = state.results.length < 5
            ? `${t("fewerThanFive")} ${t("profileNotice")}`
            : t("profileNotice");
        if (!state.results.length) {
            resultList.innerHTML = `<p class="advisor-feedback">${escapeHtml(t("noMatches"))}</p>`;
            return;
        }
        resultList.innerHTML = state.results.map(result => {
            const attraction = result.attraction;
            const profileState = result.profile.status === "verified" ? "" : `<span class="pending-badge">${escapeHtml(t("provisional"))}</span>`;
            const image = attraction.image
                ? `<img src="${escapeHtml(attraction.image)}" alt="${escapeHtml(localized(attraction.nameAr, attraction.nameEn))}" loading="lazy">`
                : `<div class="advisor-result-image-placeholder">${escapeHtml(t("noPhoto"))}</div>`;
            const reasons = result.reasons.length
                ? result.reasons.map(reason => t(reason)).join(languageSeparator())
                : t("noReason");
            return `<article class="advisor-result-card">
                ${image}
                <div class="advisor-result-copy">
                    <h4>${escapeHtml(localized(attraction.nameAr, attraction.nameEn))}</h4>
                    <div class="secondary-name">${escapeHtml(localized(attraction.nameEn, attraction.nameAr))}</div>
                    <span class="advisor-score">${escapeHtml(t("compatibility"))}: ${escapeHtml(t("percent", result.score))}</span>
                    ${profileState}
                    <p><strong>${escapeHtml(t("gov"))}:</strong> ${escapeHtml(localized(attraction.governorateAr, attraction.governorateEn))}</p>
                    <p><strong>${escapeHtml(t("why"))}:</strong> ${escapeHtml(reasons)}</p>
                    <p>${escapeHtml(attraction.descriptionAr || attraction.descriptionEn || t("pendingDescription"))}</p>
                    <div class="advisor-result-links">
                        <a href="${detailHref(attraction)}">${escapeHtml(t("details"))}</a>
                        ${mapDirections(attraction)}
                    </div>
                </div>
            </article>`;
        }).join("");
    }

    function languageSeparator() {
        return state.language === "ar" ? "، " : ", ";
    }

    function populateMapFilters() {
        const governorateSelect = document.getElementById("advisorMapGovernorate");
        const categorySelect = document.getElementById("advisorMapCategory");
        const selectedGovernorate = governorateSelect.value;
        const selectedCategory = categorySelect.value;
        const allText = state.language === "en" ? "All governorates" : "كل المحافظات";
        const allCategories = state.language === "en" ? "All categories" : "كل التصنيفات";
        governorateSelect.innerHTML = `<option value="">${escapeHtml(allText)}</option>` +
            state.dataset.governorates.map(governorate =>
                `<option value="${escapeHtml(governorate.id)}">${escapeHtml(localized(governorate.nameAr, governorate.nameEn))}</option>`
            ).join("");
        const categories = [...new Set(state.dataset.attractions.map(place => place.category).filter(value => typeof value === "string" && value))];
        categorySelect.innerHTML = `<option value="">${escapeHtml(allCategories)}</option>` +
            categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
        if ([...governorateSelect.options].some(option => option.value === selectedGovernorate)) {
            governorateSelect.value = selectedGovernorate;
        }
        if ([...categorySelect.options].some(option => option.value === selectedCategory)) {
            categorySelect.value = selectedCategory;
        }
        categorySelect.disabled = categories.length === 0;
    }

    function updateMap() {
        if (!state.map) return;
        const governorate = document.getElementById("advisorMapGovernorate").value;
        const category = document.getElementById("advisorMapCategory").value;
        const source = state.mapMode === "all"
            ? state.dataset.attractions
            : state.results.map(result => result.attraction);
        const places = source.filter(place =>
            (!governorate || place.governorateId === governorate) &&
            (!category || place.category === category)
        );
        state.map.update(places);
        if (state.location) state.map.showUserLocation(state.location.latitude, state.location.longitude);
        if (state.dataset.attractions.every(place => !window.JordanMap.validCoordinates(place))) {
            document.getElementById("advisorMapStatus").textContent = t("mapEmpty");
        }
    }

    function updateMapLabels() {
        document.getElementById("advisorMapPanel").setAttribute("aria-label", t("mapPanelLabel"));
        document.getElementById("advisorMap").setAttribute("aria-label", t("mapRegionLabel"));
    }

    async function openMap() {
        const panel = document.getElementById("advisorMapPanel");
        const toggle = document.getElementById("advisorMapToggle");
        updateMapLabels();
        if (!state.mapOpen) {
            state.mapOpen = true;
            state.mapMode = "recommended";
            panel.hidden = false;
        } else {
            state.mapMode = state.mapMode === "recommended" ? "all" : "recommended";
        }
        toggle.setAttribute("aria-expanded", String(state.mapOpen));
        toggle.textContent = !state.mapOpen ? t("mapAll")
            : state.mapMode === "recommended" ? t("mapAll") : t("mapRecommended");
        if (!state.map) {
            state.map = await window.JordanMap.mount(
                document.getElementById("advisorMap"),
                state.dataset.attractions,
                {
                    language: state.language,
                    statusElement: document.getElementById("advisorMapStatus"),
                    detailHref
                }
            );
        }
        updateMap();
    }

    function showResults() {
        state.results = rankedResults();
        chat.hidden = true;
        resultsSection.hidden = false;
        state.mapMode = "recommended";
        state.mapOpen = false;
        document.getElementById("advisorMapPanel").hidden = true;
        document.getElementById("advisorMapToggle").hidden = !state.results.length;
        document.getElementById("advisorMapToggle").setAttribute("aria-expanded", "false");
        document.getElementById("advisorMapToggle").textContent = t("mapAll");
        renderResults();
        if (state.results.length) openMap();
    }

    function restart() {
        state.index = 0;
        state.answers = Array(7).fill(null);
        state.location = null;
        state.results = [];
        state.mapOpen = false;
        state.mapMode = "recommended";
        resultsSection.hidden = true;
        chat.hidden = false;
        document.getElementById("advisorMapPanel").hidden = true;
        document.getElementById("advisorMapToggle").setAttribute("aria-expanded", "false");
        document.getElementById("advisorMapToggle").textContent = t("mapAll");
        document.getElementById("advisorMapToggle").hidden = false;
        renderQuestion();
        document.getElementById("tripAdvisor").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    nextButton.addEventListener("click", continueSurvey);
    backButton.addEventListener("click", () => {
        if (state.index === 0) return;
        state.index -= 1;
        renderQuestion();
    });
    document.getElementById("advisorRestart").addEventListener("click", restart);
    document.getElementById("advisorMapToggle").addEventListener("click", openMap);
    document.getElementById("advisorMapGovernorate").addEventListener("change", updateMap);
    document.getElementById("advisorMapCategory").addEventListener("change", updateMap);

    new MutationObserver(() => {
        state.language = root.dataset.language === "en" ? "en" : "ar";
        if (!state.dataset) return;
        if (resultsSection.hidden) renderQuestion();
        else {
            renderResults();
            if (state.mapOpen) {
                populateMapFilters();
                updateMapLabels();
                if (state.map) {
                    state.map.setLanguage(state.language);
                    updateMap();
                }
            }
        }
    }).observe(root, { attributes: true, attributeFilter: ["data-language"] });

    fetch("data/attractions.json")
        .then(response => {
            if (!response.ok) throw new Error(`Dataset request failed: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.governorates) || !Array.isArray(data.attractions)) {
                throw new Error("Dataset has an invalid shape.");
            }
            state.dataset = data;
            populateMapFilters();
            renderQuestion();
        })
        .catch(error => {
            console.error("Unable to load recommendation data.", error);
            chat.innerHTML = `<p class="advisor-feedback" role="alert">${escapeHtml(t("errorData"))}</p>`;
        });
})();
