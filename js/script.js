/* ==========================================================================
   PREMIUM DARK-MODE PORTFOLIO - JS INTERACTION & ANIMATION ENGINE
   ========================================================================== */

function initPortfolio() {

    // --- 1. STATE MANAGEMENT ---
    let initialLang = 'ar';
    try {
        initialLang = localStorage.getItem('portfolio-lang') || 'ar';
    } catch (e) {
        console.warn("Local storage access blocked. Defaulting to 'ar'.");
    }

    const activeSectionEl = document.querySelector('.page-section.active');
    const state = {
        lang: initialLang,
        activeSection: activeSectionEl ? activeSectionEl.id : 'home',
        soundEnabled: false,
        isTransitioning: false,
        isMobileMenuOpen: false
    };

    // --- 2. BILINGUAL DICTIONARY ---
    const dictionary = {
        ar: {
                  "loading": "جاري التحميل...",
                  "brand_name": "أحمد.",
                  "nav_home": "الرئيسية",
                  "nav_about": "من أنا",
                  "nav_services": "الخدمات",
                  "nav_portfolio": "أعمالي",
                  "nav_experience": "الخبرة",
                  "nav_education": "الدراسة",
                  "nav_contact": "اتصل بنا",
                  "hero_welcome": "👋 مرحبًا بك في عالمي الرقمي",
                  "hero_title_1": "أنا",
                  "hero_title_2": "أحمد خليفة",
                  "hero_desc": "أقوم بتصميم وتطوير واجهات مستخدم فائقة الجودة تتميز بالحركة الانسيابية والأداء العالي، مدمجة بجماليات العصر الحديث والبرمجة الاحترافية الخالية من الأخطاء.",
                  "hero_btn_works": "شاهد أعمالي",
                  "hero_btn_hire": "تواصل معي",
                  "about_subtitle": "تعرف عليّ",
                  "about_title": "من أنا",
                  "about_headline": "شغوف بابتكار واجهات الويب التي تنبض بالحياة",
                  "about_bio": "أنا مطور واجهات مستخدم ومصمم تفاعلي أعمل في هذا المجال منذ أكثر من 5 سنوات. أركز على سد الفجوة بين التصميم الجمالي والبرمجة عالية الكفاءة. أؤمن بشدة بأن الحركة والترانزيشن ليست مجرد تجميل، بل هي أداة توجه انتباه المستخدم وتثري تجربة تصفحه.",
                  "info_age_label": "العمر:",
                  "info_age_value": "26 عامًا",
                  "info_email_label": "البريد الإلكتروني",
                  "info_email_value": "dev.ahmed@example.com",
                  "info_phone_label": "رقم الهاتف",
                  "info_phone_value": "+966 50 123 4567",
                  "info_loc_label": "العنوان الحالي",
                  "info_loc_value": "الرياض، المملكة العربية السعودية",
                  "btn_download_cv": "تحميل السيرة الذاتية (CV)",
                  "count_projects": "مشروع مكتمل",
                  "count_experience": "سنوات خبرة",
                  "count_clients": "عميل سعيد %",
                  "skills_title": "مهاراتي التقنية",
                  "services_subtitle": "ماذا أقدم",
                  "services_title": "خدماتي المميزة",
                  "serv_front_title": "تطوير الواجهات الأمامية",
                  "serv_front_desc": "بناء واجهات تفاعلية مذهلة خالية من الأخطاء البرمجية باستخدام أحدث معايير الويب الفائقة السلاسة.",
                  "serv_learn_more": "اقرأ المزيد <i class=\"fa-solid fa-arrow-left\"></i>",
                  "serv_uiux_title": "تصميم UI / UX",
                  "serv_uiux_desc": "ابتكار تجارب مستخدم حية وخرائط تدفق وتصاميم بصرية فريدة تضمن ولاء العملاء وسرعة الإنجاز.",
                  "serv_anim_title": "أنيميشن وتفاعلات متقدمة",
                  "serv_anim_desc": "إضفاء الروح والحيوية على صفحات الويب من خلال حركات انتقالية وتفاعلات مخصصة فائقة الأناقة والجودة.",
                  "serv_opt_title": "تحسين الأداء والسرعة",
                  "serv_opt_desc": "تسريع تحميل الصفحات وتنقيتها للوصول إلى أعلى الدرجات في اختبارات Lighthouse وتحقيق استجابة فورية.",
                  "portfolio_subtitle": "أحدث أعمالي",
                  "portfolio_title": "معرض المشاريع",
                  "port_tab_all": "الكل",
                  "port_tab_web": "مواقع ويب",
                  "port_tab_ui": "تصميم واجهات",
                  "port_tab_creative": "تجارب إبداعية",
                  "port_web": "موقع ويب",
                  "proj1_title": "منصة تجارة إلكترونية نيونية",
                  "proj1_desc": "موقع متكامل لبيع المنتجات الرقمية بواجهات نيون متفاعلة وحركات بالغة السلاسة.",
                  "port_uiux": "تصميم واجهات UI/UX",
                  "proj2_title": "تطبيق المحفظة الرقمية الذكية",
                  "proj2_desc": "تصميم واجهات تطبيق هاتف متقدم يهدف لتنظيم الأوراق المالية والمحافظ المشفرة للمستخدمين.",
                  "port_creative": "تجارب إبداعية",
                  "proj3_title": "لوحة الجزيئات الرياضية التفاعلية",
                  "proj3_desc": "تجربة محاكاة رياضية مبنية بالكامل في جافاسكريبت لخلط الجزيئات استجابة للجاذبية والموجات الصوتية.",
                  "proj4_title": "بورتفوليو شركات زجاجي ثلاثي الأبعاد",
                  "proj4_desc": "تصميم موقع متطور لشركات استشارية يعتمد على الجمالية الزجاجية والانتقال بين البطاقات ثلاثية الأبعاد.",
                  "proj5_title": "واجهة لوحة تحكم ذكاء اصطناعي",
                  "proj5_desc": "نظام إدارة وتحليل بيانات ضخمة مبني على خوارزميات الذكاء الاصطناعي مع رسوم بيانية حية.",
                  "proj6_title": "مولد الفنون الكسورية التفاعلي",
                  "proj6_desc": "لوحة فنية مخصصة تتيح للمتصفح توليد خطوط كسورية ملونة مبهرة استنادًا للمس والاحتكاك.",
                  "experience_subtitle": "مسيرتي المهنية",
                  "experience_title": "الخبرة العملية",
                  "time_present": "الآن",
                  "role1_title": "مطور واجهات تفاعلية أول",
                  "role1_comp": "استوديو سايبر تك الرقمي",
                  "role1_desc": "أقود فريق التطوير الأمامي لبناء منصات تجارية كبرى، مع التركيز على تحسين أداء الحركة وتقليل أوقات تحميل العناصر بنسبة 40%.",
                  "timeline_more": "التفاصيل والمهام <i class=\"fa-solid fa-chevron-down\"></i>",
                  "bullet1_1": "إدارة وبناء الهيكل الأمامي للمشاريع المعقدة باستخدام معايير CSS Grid الحديثة.",
                  "bullet1_2": "تأمين استجابة الصفحات بنسبة 100% وتوافقها التام مع كافة الهواتف والأجهزة اللوحية.",
                  "bullet1_3": "برمجة انتقالات سينمائية مميزة باستخدام محركات الحركة والتفاعل المباشر.",
                  "role2_title": "مطور واجهات ويب",
                  "role2_comp": "مؤسسة الحلول السحابية الذكية",
                  "role2_desc": "قمت بتطوير أكثر من 25 موقع تعريفي وتطبيقات لوحات تحكم متقدمة، مع دمج التقنيات السلسة والرسومات البيانية الحية.",
                  "bullet2_1": "تحويل ملفات Figma و Adobe XD إلى صفحات ويب دقيقة البكسلات.",
                  "bullet2_2": "كتابة أكواد جافاسكريبت نقية ومنظمة وسريعة التنفيذ لتوفير تفاعلات ديناميكية للمستخدم.",
                  "bullet2_3": "تطوير مكتبات ومكونات فرعية قابلة لإعادة الاستخدام لتقليص حجم الملفات الكلي.",
                  "role3_title": "مصمم واجهات ومطور مبتدئ",
                  "role3_comp": "وكالة الإبداع الرقمية للبرمجيات",
                  "role3_desc": "بدأت مسيرتي بالمشاركة في تصميم واجهات المستخدم والمساعدة في كتابة كود الهياكل الأساسية والأنماط التجميلية للمواقع.",
                  "bullet3_1": "تصميم نماذج أولية سلكية وتدفقات مستخدم مريحة وجذابة.",
                  "bullet3_2": "تطوير صفحات هبوط جذابة باستخدام تقنيات HTML5 و CSS3 التفاعلية.",
                  "bullet3_3": "تنظيف وتعديل الأكواد القديمة وحل مشكلات التوافقية مع المتصفحات القديمة.",
                  "education_subtitle": "التحصيل الأكاديمي",
                  "education_title": "الدراسة والتعليم",
                  "edu1_degree": "بكالوريوس علوم الحاسب",
                  "edu1_inst": "جامعة الملك سعود",
                  "edu1_desc": "تخصصت في هندسة البرمجيات وبنيت عدة مشاريع تخرج ممتازة تركز على واجهات الويب وتفاعل الإنسان مع الحاسوب (HCI) بتقدير ممتاز.",
                  "edu2_degree": "الشهادة المتقدمة لتطوير الواجهات",
                  "edu2_inst": "أكاديمية يوداسيتي الاحترافية (Nanodegree)",
                  "edu2_desc": "دراسة مكثفة في جافاسكريبت المتقدمة، وبناء هياكل المواقع الحديثة، وطرق ضغط وتوفير مساحات التحميل السحابية للوصول لـ 100% أداء.",
                  "edu3_degree": "شهادة تصميم تجربة المستخدم المحترفة",
                  "edu3_inst": "شركة جوجل العالمية (Google UX Professional)",
                  "edu3_desc": "تدريب عملي مكثف شمل أبحاث المستخدم وتصميم الواجهات السلكية وتأمين سهولة الوصول الفائقة للأفراد ذوي الاحتياجات الخاصة.",
                  "contact_subtitle": "تواصل معي",
                  "contact_title": "اتصل بنا",
                  "contact_headline": "دعنا نصنع شيئًا مبهرًا معًا!",
                  "contact_subtext": "هل لديك فكرة مشروع إبداعي أو ترغب في استشارتي بخصوص تطوير واجهاتك الأمامية؟ لا تتردد بالاتصال بي فورًا وسأرد عليك خلال 24 ساعة كحد أقصى.",
                  "form_lbl_name": "الاسم الكريم",
                  "err_name": "الرجاء إدخال الاسم",
                  "form_lbl_email": "البريد الإلكتروني",
                  "err_email": "الرجاء إدخال بريد إلكتروني صحيح",
                  "form_lbl_subject": "موضوع الرسالة",
                  "form_lbl_msg": "نص الرسالة",
                  "err_message": "الرجاء كتابة نص الرسالة",
                  "btn_send": "إرسال الرسالة الآن",
                  "success_title": "تم الإرسال بنجاح!",
                  "success_desc": "شكرًا لتواصلك معي. لقد تلقيت رسالتك وسأقوم بالرد عليك في أقرب وقت ممكن.",
                  "success_close_btn": "حسنًا"
        },
        en: {
                  "loading": "Loading...",
                  "brand_name": "Ahmed.",
                  "nav_home": "Home",
                  "nav_about": "About",
                  "nav_services": "Services",
                  "nav_portfolio": "Portfolio",
                  "nav_experience": "Experience",
                  "nav_education": "Education",
                  "nav_contact": "Contact",
                  "hero_welcome": "👋 Welcome to my digital world",
                  "hero_title_1": "I am",
                  "hero_title_2": "Ahmed Khalifa",
                  "hero_desc": "I design and develop top-quality user interfaces with fluid motion and high performance, integrated with modern aesthetics and professional bug-free programming.",
                  "hero_btn_works": "View My Works",
                  "hero_btn_hire": "Contact Me",
                  "about_subtitle": "Get to know me",
                  "about_title": "About Me",
                  "about_headline": "Passionate about creating vibrant web interfaces",
                  "about_bio": "I am a frontend developer and interactive designer with over 5 years of experience. I bridge the gap between aesthetic design and high-efficiency programming. I firmly believe motion is a tool that directs user attention and enriches the browsing experience.",
                  "info_age_label": "Age:",
                  "info_age_value": "26 Years",
                  "info_email_label": "Email:",
                  "info_email_value": "dev.ahmed@example.com",
                  "info_phone_label": "Phone:",
                  "info_phone_value": "+966 50 123 4567",
                  "info_loc_label": "Location:",
                  "info_loc_value": "Riyadh, Saudi Arabia",
                  "btn_download_cv": "Download CV",
                  "count_projects": "Completed Projects",
                  "count_experience": "Years Experience",
                  "count_clients": "Happy Clients %",
                  "skills_title": "Technical Skills",
                  "services_subtitle": "What I offer",
                  "services_title": "My Services",
                  "serv_front_title": "Frontend Development",
                  "serv_front_desc": "Building stunning, bug-free interactive interfaces using the latest ultra-smooth web standards.",
                  "serv_learn_more": "Read More <i class=\"fa-solid fa-arrow-right\"></i>",
                  "serv_uiux_title": "UI / UX Design",
                  "serv_uiux_desc": "Innovating live user experiences, flow maps, and unique visual designs that ensure customer loyalty and rapid delivery.",
                  "serv_anim_title": "Advanced Animation & Interactions",
                  "serv_anim_desc": "Bringing webpages to life through ultra-elegant, high-quality transitions and custom interactions.",
                  "serv_opt_title": "Performance & Speed Optimization",
                  "serv_opt_desc": "Accelerating and refining page loads to reach top scores in Lighthouse testing and achieve instant responsiveness.",
                  "portfolio_subtitle": "Latest Works",
                  "portfolio_title": "Projects Portfolio",
                  "port_tab_all": "All",
                  "port_tab_web": "Websites",
                  "port_tab_ui": "UI Design",
                  "port_tab_creative": "Creative Exps",
                  "port_web": "Website",
                  "proj1_title": "Neon E-Commerce Platform",
                  "proj1_desc": "A full digital products platform with interactive neon interfaces and smooth motions.",
                  "port_uiux": "UI/UX Design",
                  "proj2_title": "Smart Digital Wallet App",
                  "proj2_desc": "Advanced mobile UI design aiming to organize financial assets and crypto wallets.",
                  "port_creative": "Creative Exps",
                  "proj3_title": "Interactive Math Particles",
                  "proj3_desc": "A mathematical simulation built purely in JS to mix particles reacting to gravity and sound.",
                  "proj4_title": "3D Glassy Corporate Portfolio",
                  "proj4_desc": "An advanced consulting company website based on glassmorphism and 3D card transitions.",
                  "proj5_title": "AI Dashboard UI",
                  "proj5_desc": "A big data management and analysis system built on AI algorithms with live charts.",
                  "proj6_title": "Interactive Fractal Art Generator",
                  "proj6_desc": "A customized art canvas letting users generate stunning colorful fractal lines using touch.",
                  "experience_subtitle": "My Career",
                  "experience_title": "Work Experience",
                  "time_present": "Present",
                  "role1_title": "Senior Interactive Frontend Developer",
                  "role1_comp": "Cyber Tech Digital Studio",
                  "role1_desc": "Leading the frontend team to build major e-commerce platforms, focusing on motion performance and reducing load times by 40%.",
                  "timeline_more": "Details <i class=\"fa-solid fa-chevron-down\"></i>",
                  "bullet1_1": "Managing and building frontend architecture for complex projects using modern CSS Grid.",
                  "bullet1_2": "Ensuring 100% responsiveness and full compatibility with all phones and tablets.",
                  "bullet1_3": "Programming cinematic transitions using direct interaction motion engines.",
                  "role2_title": "Web Frontend Developer",
                  "role2_comp": "Smart Cloud Solutions Foundation",
                  "role2_desc": "Developed over 25 corporate websites and advanced dashboard apps, integrating smooth tech and live charts.",
                  "bullet2_1": "Translating Figma and Adobe XD files into pixel-perfect web pages.",
                  "bullet2_2": "Writing pure, organized, fast JS code to provide dynamic user interactions.",
                  "bullet2_3": "Developing reusable sub-components and libraries to shrink total file sizes.",
                  "role3_title": "UI Designer & Junior Developer",
                  "role3_comp": "Creative Digital Software Agency",
                  "role3_desc": "Started my journey participating in UI design and helping write core structural code and site aesthetics.",
                  "bullet3_1": "Designing comfortable and attractive wireframes and user flows.",
                  "bullet3_2": "Developing attractive landing pages using interactive HTML5 and CSS3.",
                  "bullet3_3": "Cleaning legacy code and resolving compatibility issues with old browsers.",
                  "education_subtitle": "Academic Achievements",
                  "education_title": "Education & Studies",
                  "edu1_degree": "Bachelor of Computer Science",
                  "edu1_inst": "King Saud University",
                  "edu1_desc": "Specialized in Software Engineering and built several excellent graduation projects focusing on web UIs and HCI with honors.",
                  "edu2_degree": "Advanced Frontend Development Cert",
                  "edu2_inst": "Udacity Nanodegree",
                  "edu2_desc": "Intensive study in advanced JS, building modern site structures, compression methods, and reaching 100% performance.",
                  "edu3_degree": "Professional UX Design Cert",
                  "edu3_inst": "Google UX Professional",
                  "edu3_desc": "Practical intensive training covering user research, wireframing, and ensuring high accessibility for people with disabilities.",
                  "contact_subtitle": "Contact Me",
                  "contact_title": "Get In Touch",
                  "contact_headline": "Let's create something amazing together!",
                  "contact_subtext": "Do you have a creative project idea or want a consultation regarding your frontend? Do not hesitate to contact me immediately and I will reply within 24 hours.",
                  "form_lbl_name": "Full Name",
                  "err_name": "Please enter your name",
                  "form_lbl_email": "Email Address",
                  "err_email": "Please enter a valid email",
                  "form_lbl_subject": "Message Subject",
                  "form_lbl_msg": "Message Content",
                  "err_message": "Please write your message",
                  "btn_send": "Send Message Now",
                  "success_title": "Sent Successfully!",
                  "success_desc": "Thank you for contacting me. I have received your message and will reply as soon as possible.",
                  "success_close_btn": "OK"
        }
    };


    // --- 3. DYNAMIC TRANSLATION SYSTEM ---
    function translateDOM() {
        const dict = dictionary[state.lang];
        
        // Update language attribute and text direction
        document.documentElement.setAttribute('lang', state.lang);
        document.documentElement.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');

        // Translate nodes with [data-key] attributes
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (dict[key]) {
                // If it is an input or textarea, translate placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.setAttribute('placeholder', dict[key]);
                } else {
                    el.innerHTML = dict[key];
                }
            }
        });

        // Translate specific form validator floating labels
        const nameField = document.getElementById('form-name');
        const emailField = document.getElementById('form-email');
        const msgField = document.getElementById('form-message');

        if (nameField) nameField.placeholder = " ";
        if (emailField) emailField.placeholder = " ";
        if (msgField) msgField.placeholder = " ";

        // Manage Language selector active states in sidebar
        const arSelect = document.getElementById('lang-ar');
        const enSelect = document.getElementById('lang-en');
        if (arSelect && enSelect) {
            if (state.lang === 'ar') {
                arSelect.classList.add('active');
                enSelect.classList.remove('active');
            } else {
                enSelect.classList.add('active');
                arSelect.classList.remove('active');
            }
        }

        // Update mobile lang button label
        const mobileLangLabel = document.querySelector('.mobile-lang-label');
        if (mobileLangLabel) {
            mobileLangLabel.innerText = state.lang === 'ar' ? 'EN' : 'عربي';
        }
        
        // Re-initialize dynamic phrases typing on Home Screen
        initHeroTyping();
    }


    // --- 4. WEB AUDIO SYNTHESIZER ---
    let audioCtx = null;
    let ambientOscillator = null;
    let ambientGain = null;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Play navigation sweep effect
    function playSweepSound() {
        if (!state.soundEnabled) return;
        try {
            initAudioContext();
            
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.55);
            
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.6);
        } catch (e) {
            console.log("Audio synthesis blocked:", e);
        }
    }

    // Play hover beep sound
    function playHoverBeep() {
        if (!state.soundEnabled) return;
        try {
            initAudioContext();
            
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.08);
        } catch (e) {
            console.log("Audio synthesis blocked:", e);
        }
    }

    // Start spatial drone soundscape
    function playAmbientDrone() {
        try {
            initAudioContext();
            
            ambientOscillator = audioCtx.createOscillator();
            ambientGain = audioCtx.createGain();
            
            // Low frequencies synthesizer
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 220;
            
            ambientOscillator.connect(filter);
            filter.connect(ambientGain);
            ambientGain.connect(audioCtx.destination);
            
            ambientOscillator.type = 'sawtooth';
            ambientOscillator.frequency.value = 55; // Deep bass note (A1)
            
            // Modulate pitch slightly for drone atmosphere
            const modulationOsc = audioCtx.createOscillator();
            const modulationGain = audioCtx.createGain();
            modulationOsc.frequency.value = 0.25; // 4 seconds cycles
            modulationGain.gain.value = 1.5; // slight pitch modulation
            modulationOsc.connect(modulationGain);
            modulationGain.connect(ambientOscillator.frequency);
            modulationOsc.start();
            
            // Slow volume fade-in
            ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
            ambientGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2.5);
            
            ambientOscillator.start();
        } catch (e) {
            console.log("Drone blocked:", e);
        }
    }

    function stopAmbientDrone() {
        if (ambientOscillator && ambientGain) {
            try {
                ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
                setTimeout(() => {
                    ambientOscillator.stop();
                    ambientOscillator = null;
                }, 800);
            } catch(e) {}
        }
    }


    // --- 5. INERTIAL CUSTOM CURSOR SYSTEM ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const mouse = { x: -100, y: -100 };
    const cursor = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        if (cursorDot) {
            cursorDot.style.left = `${mouse.x}px`;
            cursorDot.style.top = `${mouse.y}px`;
        }
    });

    // Animate custom cursor outline with linear interpolation (Lerp)
    function animateCursorOutline() {
        const ease = 0.16; // Lerping velocity factor
        
        const dx = mouse.x - cursor.x;
        const dy = mouse.y - cursor.y;
        
        cursor.x += dx * ease;
        cursor.y += dy * ease;
        
        if (cursorOutline) {
            cursorOutline.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`;
        }
        
        requestAnimationFrame(animateCursorOutline);
    }
    requestAnimationFrame(animateCursorOutline);

    // Attach cursor scaling states on interactive hover targets
    function attachCursorHovers() {
        document.querySelectorAll('.hover-target, a, button, .glow-card, .timeline-expand-btn, .filter-tab').forEach(item => {
            // Mouse Enter
            item.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover-state');
                playHoverBeep();
            });
            // Mouse Leave
            item.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover-state');
            });
        });
    }
    attachCursorHovers();


    // --- 6. DYNAMIC HTML5 PARTICLES BACKGROUND ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = (Math.random() * 0.4) - 0.2;
            this.color = 'rgba(0, 242, 254, ' + (Math.random() * 0.25 + 0.05) + ')';
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Boundaries bounces
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Repulsion physics from mouse cursor
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const force = (120 - distance) / 120; // 0 (far) to 1 (near)
                const dirX = dx / distance;
                const dirY = dy / distance;
                
                // Float away in opposite direction
                this.x -= dirX * force * 2.5;
                this.y -= dirY * force * 2.5;
            }
            
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    const alpha = (110 - distance) / 110 * 0.12;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.65;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);


    // --- 7. HYBRID SPA / MPA ADAPTIVE ROUTING SYSTEM ---
    const curtain = document.getElementById('transition-curtain');
    const isSPA = document.getElementById('home') && document.getElementById('about') && document.getElementById('services');
    
    function navigateToSection(targetId) {
        if (state.isTransitioning || (!isSPA && state.activeSection === targetId)) return;
        
        state.isTransitioning = true;
        playSweepSound();
        
        // Mobile Sidebar automatic fold
        if (state.isMobileMenuOpen) {
            toggleMobileMenu(false);
        }

        if (isSPA) {
            // SPA Virtual Routing Mode
            // STEP 1: Activate Sweep Curtain
            curtain.classList.remove('sweep-out');
            curtain.classList.add('sweep-active');

            // STEP 2: Swap sections inside curtain (fully blacked out)
            setTimeout(() => {
                // Remove active section class
                const currentSection = document.getElementById(state.activeSection);
                if (currentSection) {
                    currentSection.classList.remove('active');
                }

                // Set state & activate target section
                state.activeSection = targetId;
                const newSection = document.getElementById(targetId);
                if (newSection) {
                    newSection.classList.add('active');
                    window.scrollTo({ top: 0 }); // reset scroll position
                }

                // Sync navigation links active status
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('data-section') === targetId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Trigger Section Specific Animations
                if (targetId === 'about') {
                    triggerAboutAnimations();
                }

                // Update URL Hash safely without breaking custom router
                history.pushState(null, null, `#${targetId}`);

                // STEP 3: Sweep out curtain to reveal new layout
                curtain.classList.remove('sweep-active');
                curtain.classList.add('sweep-out');
                
                setTimeout(() => {
                    curtain.classList.remove('sweep-out');
                    state.isTransitioning = false;
                }, 600); // end of entrance sweep

            }, 600); // end of exit sweep
        } else {
            // MPA Standalone Redirect Mode
            curtain.classList.remove('sweep-out');
            curtain.classList.add('sweep-active');
            
            setTimeout(() => {
                const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('/html/');
                let targetUrl = '';
                if (targetId === 'home') {
                    targetUrl = isRoot ? '#' : '../index.html';
                } else {
                    targetUrl = isRoot ? `html/${targetId}.html` : `${targetId}.html`;
                }

                if (targetUrl === '#') {
                    curtain.classList.remove('sweep-active');
                    curtain.classList.add('sweep-out');
                    setTimeout(() => curtain.classList.remove('sweep-out'), 600);
                    state.isTransitioning = false;
                } else {
                    window.location.href = targetUrl;
                }
            }, 600);
        }
    }

    // Intercept clicks on links
    document.querySelectorAll('.nav-link, [data-target-section]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = trigger.getAttribute('data-section') || trigger.getAttribute('data-target-section');
            if (sectionId) {
                navigateToSection(sectionId);
            }
        });
    });

    // Support browser Back/Forward actions inside SPA
    if (isSPA) {
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            navigateToSection(hash);
        });

        // Initial SPA deep link check
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            setTimeout(() => {
                navigateToSection(initialHash);
            }, 800);
        }
    }


    // --- 8. SECTION SPECIFIC TRIGGER ANIMS (About Screen) ---
    function triggerAboutAnimations() {
        // 1. Skill progress bars growth
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const pct = bar.getAttribute('data-percent');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${pct}%`;
            }, 250);
        });

        // 2. Metric numbers count up
        document.querySelectorAll('.counter-num').forEach(numNode => {
            const target = parseInt(numNode.getAttribute('data-target'), 10);
            let count = 0;
            const speed = target / 40; // duration split
            numNode.innerText = '0';

            const interval = setInterval(() => {
                count += speed;
                if (count >= target) {
                    numNode.innerText = target;
                    clearInterval(interval);
                } else {
                    numNode.innerText = Math.floor(count);
                }
            }, 25);
        });
    }


    // --- 9. HERO DUAL-TYPING ANIMATOR ---
    let typingInterval = null;
    
    function initHeroTyping() {
        if (typingInterval) clearInterval(typingInterval);
        
        const typingText = document.getElementById('typing-text');
        if (!typingText) return;

        const arPhrases = ["مطور واجهات تفاعلية", "مصمم تجربة مستخدم (UI/UX)", "مبتكر تجارب رقمية ثلاثية الأبعاد"];
        const enPhrases = ["Interactive Frontend Developer", "UI/UX Experience Designer", "3D Digital Experience Innovator"];
        const phrases = state.lang === 'ar' ? arPhrases : enPhrases;

        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                typingText.innerText = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingText.innerText = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = 90; // moderate typing speed
            
            if (isDeleting) {
                typeSpeed /= 2; // speed delete
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                typeSpeed = 2000; // wait when typing completes
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typeSpeed = 400; // wait before starting new word
            }

            typingInterval = setTimeout(type, typeSpeed);
        }
        type();
    }


    // --- 10. INTERACTIVE 3D HERO TILT CARD ---
    const tiltCard = document.getElementById('hero-tilt-card');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            // Mouse coordinate positions inside card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Map boundaries to degrees (-15 to 15 degrees max)
            const rotateX = -15 * ((y - rect.height / 2) / (rect.height / 2));
            const rotateY = 15 * ((x - rect.width / 2) / (rect.width / 2));
            
            tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Set dynamic glow variables
            tiltCard.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
            tiltCard.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
        });

        tiltCard.addEventListener('mouseleave', () => {
            // Restore neutral 3D tilt
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            tiltCard.style.setProperty('--glow-x', '50%');
            tiltCard.style.setProperty('--glow-y', '50%');
        });
    }


    // --- 11. GLOWING SERVICES MOUSE GLOW PARADIGM ---
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // --- 12. SERVICES DETAILS DIALOG (Modal) ---
    const servicesModal = document.getElementById('services-modal');
    const modalBody = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const serviceDetailsData = {
        frontend: {
            ar: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-code"></i>
                    <h3 class="modal-service-title">تطوير الواجهات الأمامية</h3>
                </div>
                <p class="modal-service-desc">
                    أقوم ببرمجة الواجهات الأمامية باستخدام أحدث التقنيات مع كتابة كود برمجى خالى تماماً من الأخطاء (Pixel-Perfect) ليتوافق الكود مع كافة المتصفحات والهواتف المحمولة.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">ما ستحصل عليه في هذه الخدمة:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> كود نظيف مكتوب باستخدام معايير BEM البرمجية.</li>
                        <li><i class="fa-solid fa-square-check"></i> استجابة كاملة للموبايل والتابلت والشاشات الكبيرة جداً.</li>
                        <li><i class="fa-solid fa-square-check"></i> تكامل فوري وسهل مع الباك إند ولغات البرمجة المتنوعة.</li>
                        <li><i class="fa-solid fa-square-check"></i> أنيميشن تفاعلية خفيفة لا تسبب ثقلاً في تحميل المتصفح.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">يبدأ السعر من</span>
                        <span class="price-value">$450</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">اطلب الخدمة الآن</a>
                </div>
            `,
            en: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-code"></i>
                    <h3 class="modal-service-title">Frontend Engineering</h3>
                </div>
                <p class="modal-service-desc">
                    I program bulletproof web interfaces utilizing the latest layout mechanisms, delivering pixel-perfect responsiveness with zero render block errors.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">Key deliverables in this service:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> Exceptionally clean styling trees employing BEM logic structures.</li>
                        <li><i class="fa-solid fa-square-check"></i> Bulletproof responsiveness optimized for ultra-high mobile engagement.</li>
                        <li><i class="fa-solid fa-square-check"></i> Seamless code architectures supporting straightforward backend hookups.</li>
                        <li><i class="fa-solid fa-square-check"></i> Highly refined CSS micro-animations that prevent main-thread layout delays.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">Price starts at</span>
                        <span class="price-value">$450</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">Request Service</a>
                </div>
            `
        },
        uiux: {
            ar: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-pen-nib"></i>
                    <h3 class="modal-service-title">تصميم واجهات المستخدم (UI/UX)</h3>
                </div>
                <p class="modal-service-desc">
                    أقوم بابتكار تصاميم مريحة وسهلة الاستخدام للمواقع وتطبيقات الهواتف تركز على فهم سلوك المستخدم لتحقيق أعلى معدلات التحويل وزيادة الأرباح.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">ما ستحصل عليه في هذه الخدمة:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> دراسة وأبحاث مكثفة لفهم منافسيك والجمهور المستهدف.</li>
                        <li><i class="fa-solid fa-square-check"></i> خرائط تدفق المستخدم ونماذج سلكية (Wireframes) واضحة.</li>
                        <li><i class="fa-solid fa-square-check"></i> تصميم واجهات ملونة وجذابة مبنية على أحدث صيحات الموضة.</li>
                        <li><i class="fa-solid fa-square-check"></i> نموذج تجريبي تفاعلي حي (Prototype) لتجربته قبل البرمجة.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">يبدأ السعر من</span>
                        <span class="price-value">$600</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">اطلب الخدمة الآن</a>
                </div>
            `,
            en: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-pen-nib"></i>
                    <h3 class="modal-service-title">UI / UX Designing</h3>
                </div>
                <p class="modal-service-desc">
                    I shape highly functional design shells focused on user behaviors, optimizing interaction paths to boost conversion rates and user loyalty.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">Key deliverables in this service:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> Structured competitor analysis and client targeting research.</li>
                        <li><i class="fa-solid fa-square-check"></i> Informative user flow maps and high fidelity architectural wireframes.</li>
                        <li><i class="fa-solid fa-square-check"></i> Captivating grid UI components reflecting modern spatial trends.</li>
                        <li><i class="fa-solid fa-square-check"></i> Dynamic prototyping showcasing exact interactions prior to engineering.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">Price starts at</span>
                        <span class="price-value">$600</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">Request Service</a>
                </div>
            `
        },
        animations: {
            ar: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <h3 class="modal-service-title">أنيميشن وتفاعلات متقدمة</h3>
                </div>
                <p class="modal-service-desc">
                    أقوم بتحويل الصفحات الجامدة إلى لوحات فنية تفاعلية مبهرة تتحرك مع الفأرة واللمس والنزول بالصفحة لجذب انتباه الزائر وتخليد تجربته.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">ما ستحصل عليه في هذه الخدمة:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> أنيميشن نزول سلسة ومثيرة (Scroll Triggered) للعناصر.</li>
                        <li><i class="fa-solid fa-square-check"></i> لوحات تفاعلية Canvas ومؤثرات خلفية مدهشة.</li>
                        <li><i class="fa-solid fa-square-check"></i> انتقالات متقدمة بين الصفحات (Page Sweeps) لا تشعر بالملل.</li>
                        <li><i class="fa-solid fa-square-check"></i> الحفاظ على 60 إطار في الثانية (FPS) وعدم تقطيع الحركات.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">يبدأ السعر من</span>
                        <span class="price-value">$350</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">اطلب الخدمة الآن</a>
                </div>
            `,
            en: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <h3 class="modal-service-title">Cinematic Web Animations</h3>
                </div>
                <p class="modal-service-desc">
                    I transform static code blocks into responsive animated canvases reactively responding to scrolling, hover trails, and touch inputs.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">Key deliverables in this service:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> Enticing scroll-triggered animations showcasing products sequentially.</li>
                        <li><i class="fa-solid fa-square-check"></i> High fidelity HTML5 Canvas dynamic particle swarm backgrounds.</li>
                        <li><i class="fa-solid fa-square-check"></i> Advanced page-level sweep indicators supporting zero reload sweeps.</li>
                        <li><i class="fa-solid fa-square-check"></i> Optimized animation loops locking smooth rendering feeds at 60 FPS.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">Price starts at</span>
                        <span class="price-value">$350</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">Request Service</a>
                </div>
            `
        },
        optimization: {
            ar: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-gauge-high"></i>
                    <h3 class="modal-service-title">تحسين الأداء والسرعة</h3>
                </div>
                <p class="modal-service-desc">
                    أقوم بدراسة وفحص سرعة موقعك وإجراء تعديلات تقنية متطورة لتقليص أوقات التحميل وتصدر تصنيف جوجل للأداء السريع.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">ما ستحصل عليه في هذه الخدمة:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> ضغط وتقليل حجم الصور والملفات البرمجية لنسبة تصل إلى 70%.</li>
                        <li><i class="fa-solid fa-square-check"></i> تصفية الأكواد القديمة غير المستخدمة وتسريع تحميل البنية الأساسية.</li>
                        <li><i class="fa-solid fa-square-check"></i> بلوغ درجة 95+ في مؤشر أداء Google Lighthouse.</li>
                        <li><i class="fa-solid fa-square-check"></i> استجابة وتحميل فوري يمنع الزوار من الهروب ومغادرة الموقع.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">يبدأ السعر من</span>
                        <span class="price-value">$300</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">اطلب الخدمة الآن</a>
                </div>
            `,
            en: `
                <div class="modal-service-header">
                    <i class="fa-solid fa-gauge-high"></i>
                    <h3 class="modal-service-title">Performance Tuning</h3>
                </div>
                <p class="modal-service-desc">
                    I thoroughly inspect and modify code loading trees, compressing assets, and eliminating render-blocking behaviors to secure top SEO speeds.
                </p>
                <div class="modal-service-details">
                    <h4 class="modal-details-title">Key deliverables in this service:</h4>
                    <ul class="modal-bullets-list">
                        <li><i class="fa-solid fa-square-check"></i> Compressing code matrices and styling libraries by up to 70%.</li>
                        <li><i class="fa-solid fa-square-check"></i> Eliminating stale unused layouts to streamline initial paint milestones.</li>
                        <li><i class="fa-solid fa-square-check"></i> Securing 95+ ratings in Google Core Web Vitals diagnostics.</li>
                        <li><i class="fa-solid fa-square-check"></i> Accelerating interactions, keeping bounce rates to a absolute minimum.</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="price-label">Price starts at</span>
                        <span class="price-value">$300</span>
                    </div>
                    <a href="#contact" class="btn btn-primary hover-target modal-contact-trigger">Request Service</a>
                </div>
            `
        }
    };

    function openServicesModal(serviceKey) {
        const content = serviceDetailsData[serviceKey][state.lang];
        modalBody.innerHTML = content;
        
        servicesModal.classList.add('active');
        document.body.classList.add('modal-open');
        attachCursorHovers(); // re-hook cursor scaling inside modal

        // Connect contact links inside modal
        modalBody.querySelector('.modal-contact-trigger').addEventListener('click', (e) => {
            e.preventDefault();
            closeServicesModal();
            setTimeout(() => {
                navigateToSection('contact');
            }, 300);
        });
    }

    function closeServicesModal() {
        if (servicesModal) {
            servicesModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    document.querySelectorAll('[data-service]').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            openServicesModal(key);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeServicesModal);
    if (servicesModal) {
        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) closeServicesModal();
        });
    }


    // --- 13. PORTFOLIO SORT FILTER & INTERACTIVE LIGHTBOX ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Portfolio Sorting logic
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger tiny entrance visual
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox triggers & structures
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxMedia = document.getElementById('lightbox-media-wrapper');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxTags = document.getElementById('lightbox-tags');
    
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    const lightboxNextBtn = document.getElementById('lightbox-next-btn');
    
    let activeProjectIdx = 0;
    const projectData = [];

    // Harvest project configurations from HTML for lightbox portability
    portfolioCards.forEach((card, idx) => {
        const previewEl = card.querySelector('.project-preview');
        const previewBg = previewEl ? previewEl.style.background : '';
        const svgEl = previewEl ? previewEl.querySelector('.project-svg-mock') : null;
        const previewSvg = svgEl ? svgEl.innerHTML : '';
        
        const catEl = card.querySelector('.project-category');
        const titEl = card.querySelector('.project-title');
        const descEl = card.querySelector('.project-desc');
        
        const categoryKey = catEl ? catEl.getAttribute('data-key') : '';
        const titleKey = titEl ? titEl.getAttribute('data-key') : '';
        const descKey = descEl ? descEl.getAttribute('data-key') : '';
        const tags = Array.from(card.querySelectorAll('.project-tags span')).map(span => span.innerText);

        projectData.push({
            bg: previewBg,
            svg: previewSvg,
            categoryKey: categoryKey,
            titleKey: titleKey,
            descKey: descKey,
            tags: tags
        });

        // Click handler to open lightbox
        const trigger = card.querySelector('.lightbox-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(idx);
            });
        }
    });

    function openLightbox(idx) {
        if (!lightbox) return;
        activeProjectIdx = idx;
        renderLightboxProject();
        lightbox.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    function renderLightboxProject() {
        const dict = dictionary[state.lang];
        const proj = projectData[activeProjectIdx];
        if (!proj || !lightboxMedia) return;

        // Draw preview mock
        lightboxMedia.style.background = proj.bg;
        lightboxMedia.innerHTML = `<div class="project-svg-mock" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; opacity:0.8;">${proj.svg}</div>`;

        // Load bilingual text strings
        if (lightboxCategory) lightboxCategory.innerText = dict[proj.categoryKey] || proj.categoryKey;
        if (lightboxTitle) lightboxTitle.innerText = dict[proj.titleKey] || proj.titleKey;
        if (lightboxDesc) lightboxDesc.innerText = dict[proj.descKey] || proj.descKey;

        // Render technical tag pills
        if (lightboxTags) lightboxTags.innerHTML = proj.tags.map(tag => `<span>${tag}</span>`).join('');
    }

    function navigateLightbox(dir) {
        activeProjectIdx = (activeProjectIdx + dir + projectData.length) % projectData.length;
        renderLightboxProject();
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    
    // Wire LTR vs RTL relative directions for navigation buttons
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => navigateLightbox(state.lang === 'ar' ? 1 : -1));
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => navigateLightbox(state.lang === 'ar' ? -1 : 1));
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }


    // --- 14. INTERACTIVE TIMELINE ACCORDIANS ---
    document.querySelectorAll('.timeline-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.timeline-item');
            const drawer = item.querySelector('.timeline-details-drawer');
            
            if (item.classList.contains('expanded')) {
                // Collapse drawer
                drawer.style.height = '0px';
                item.classList.remove('expanded');
            } else {
                // Expand drawer dynamically measuring scrollHeight
                const originalHeight = drawer.scrollHeight;
                drawer.style.height = `${originalHeight}px`;
                item.classList.add('expanded');
                
                // Adjust height dynamically after expanding just in case
                setTimeout(() => {
                    if (item.classList.contains('expanded')) {
                        drawer.style.height = 'auto';
                    }
                }, 400);
            }
        });
    });

    // Handle timeline alignment changes
    function adjustTimelineConnectors() {
        document.querySelectorAll('.timeline-item.expanded').forEach(item => {
            const drawer = item.querySelector('.timeline-details-drawer');
            if (drawer) drawer.style.height = 'auto';
        });
    }


    // --- 15. CONTACT FORM SECURITY VALIDATIONS ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            const nameField = document.getElementById('form-name');
            const emailField = document.getElementById('form-email');
            const msgField = document.getElementById('form-message');

            // Check Name
            if (nameField.value.trim() === '') {
                nameField.closest('.input-group').classList.add('invalid');
                isFormValid = false;
            } else {
                nameField.closest('.input-group').classList.remove('invalid');
            }

            // Check Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                emailField.closest('.input-group').classList.add('invalid');
                isFormValid = false;
            } else {
                emailField.closest('.input-group').classList.remove('invalid');
            }

            // Check Message
            if (msgField.value.trim() === '') {
                msgField.closest('.input-group').classList.add('invalid');
                isFormValid = false;
            } else {
                msgField.closest('.input-group').classList.remove('invalid');
            }

            if (isFormValid) {
                triggerSuccessFeedback();
            }
        });
    }

    // Dynamically remove error classes on field focus inputs
    document.querySelectorAll('.input-group input, .input-group textarea').forEach(field => {
        field.addEventListener('input', () => {
            field.closest('.input-group').classList.remove('invalid');
        });
    });


    // --- 16. CANVAS SUCCESS CONFETTI SIMULATOR ---
    const successOverlay = document.getElementById('success-overlay');
    const successCloseBtn = document.getElementById('success-close-btn');
    const confettiCanvas = document.getElementById('confetti-canvas');
    let cCtx = null;
    if (confettiCanvas) {
        cCtx = confettiCanvas.getContext('2d');
    }
    
    let confettiArray = [];
    let confettiInterval = null;

    function resizeConfettiCanvas() {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    }
    window.addEventListener('resize', resizeConfettiCanvas);

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * (confettiCanvas ? confettiCanvas.width : 500);
            this.y = Math.random() * -100 - 20; // start above screen
            this.size = (Math.random() * 8) + 5;
            this.color = `hsl(${Math.random() * 360}, 90%, 65%)`; // vibrant neon colors
            this.velocity = (Math.random() * 3) + 2;
            this.drift = (Math.random() * 2) - 1;
            this.rotation = Math.random() * Math.PI;
            this.rotationSpeed = (Math.random() * 0.05) - 0.025;
        }

        draw() {
            if (!cCtx) return;
            cCtx.save();
            cCtx.translate(this.x, this.y);
            cCtx.rotate(this.rotation);
            cCtx.fillStyle = this.color;
            cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            cCtx.restore();
        }

        update() {
            this.y += this.velocity;
            this.x += this.drift;
            this.rotation += this.rotationSpeed;
            this.draw();
        }
    }

    function triggerSuccessFeedback() {
        if (!successOverlay) return;
        successOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        
        resizeConfettiCanvas();
        confettiArray = [];
        for (let i = 0; i < 120; i++) {
            confettiArray.push(new ConfettiPiece());
        }

        if (confettiInterval) clearInterval(confettiInterval);
        
        function animateConfetti() {
            if (!cCtx || !confettiCanvas) return;
            cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let activeConfetti = false;
            
            for (let i = 0; i < confettiArray.length; i++) {
                confettiArray[i].update();
                if (confettiArray[i].y < confettiCanvas.height) {
                    activeConfetti = true;
                }
            }

            if (activeConfetti && successOverlay.classList.contains('active')) {
                requestAnimationFrame(animateConfetti);
            }
        }
        requestAnimationFrame(animateConfetti);
    }

    function closeSuccessFeedback() {
        if (successOverlay) {
            successOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
        
        // Reset and clear contact form fields
        if (contactForm) {
            contactForm.reset();
        }
        document.querySelectorAll('.input-group').forEach(gp => gp.classList.remove('invalid'));
    }

    if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessFeedback);


    const langBtn = document.getElementById('lang-toggle-btn');
    const mobileLangBtn = document.getElementById('mobile-lang-toggle-btn');
    const musicBtn = document.getElementById('music-toggle');

    function toggleLanguage() {
        state.lang = state.lang === 'ar' ? 'en' : 'ar';
        try {
            localStorage.setItem('portfolio-lang', state.lang);
        } catch (e) {
            console.warn("Local storage save blocked:", e);
        }
        translateDOM();
    }

    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    if (mobileLangBtn) {
        mobileLangBtn.addEventListener('click', toggleLanguage);
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            state.soundEnabled = !state.soundEnabled;
            
            if (state.soundEnabled) {
                musicBtn.classList.add('playing');
                musicBtn.setAttribute('title', state.lang === 'ar' ? "إيقاف الصوت" : "Mute Soundscape");
                playAmbientDrone();
            } else {
                musicBtn.classList.remove('playing');
                musicBtn.setAttribute('title', state.lang === 'ar' ? "تشغيل صوت هادئ" : "Activate Ambient Soundscape");
                stopAmbientDrone();
            }
        });
    }


    // --- 18. MOBILE BURGER NAVIGATION DRAWER ---
    const menuBurger = document.getElementById('menu-burger');
    const sidebarNav = document.querySelector('.sidebar-nav');

    function toggleMobileMenu(forceState) {
        const toggleTo = forceState !== undefined ? forceState : !state.isMobileMenuOpen;
        
        state.isMobileMenuOpen = toggleTo;
        if (menuBurger && sidebarNav) {
            if (toggleTo) {
                menuBurger.classList.add('active');
                sidebarNav.classList.add('active');
            } else {
                menuBurger.classList.remove('active');
                sidebarNav.classList.remove('active');
            }
        }
    }

    if (menuBurger) menuBurger.addEventListener('click', () => toggleMobileMenu());

    // Auto-close menu burger when clicking main contents outside sidebar
    const mainContentEl = document.querySelector('.main-content');
    if (mainContentEl) {
        mainContentEl.addEventListener('click', () => {
            if (state.isMobileMenuOpen) {
                toggleMobileMenu(false);
            }
        });
    }


    // --- 19. FINAL PRE-LOADER TIMEOUT & START ---
    const loaderWrapper = document.getElementById('loader-wrapper');

    function hideLoader() {
        // Slow down pre-loader slightly to give standard transitions breath
        setTimeout(() => {
            if (loaderWrapper) {
                loaderWrapper.classList.add('fade-out');
            }
            
            // Set initial state
            translateDOM();

            // Sweep out transition curtain if it was pre-loaded as active on page start
            if (curtain && curtain.classList.contains('sweep-active')) {
                curtain.classList.remove('sweep-active');
                curtain.classList.add('sweep-out');
                setTimeout(() => {
                    curtain.classList.remove('sweep-out');
                }, 600);
            }

            // Run entrance animations automatically for Standalone MPA pages on loader teardown
            if (!isSPA) {
                if (state.activeSection === 'about') {
                    triggerAboutAnimations();
                }
            }
            
            // Allow interactions
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.remove();
                }
            }, 600);

        }, 1200);
    }

    // Trigger loader fade-out immediately (giving a beautiful 1.2s visual breathing room)
    hideLoader();

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
