/* ================================================
   Baked by Simi – Interactions & Animations
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* -----------------------------
       Mobile Menu
    ------------------------------ */
    const mobileMenu = document.getElementById("mobileMenu");
    const menuToggle = document.getElementById("menuToggle");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        menuToggle.innerHTML = mobileMenu.classList.contains("open")
            ? '<i class="ri-close-line"></i>'
            : '<i class="ri-menu-3-line"></i>';
    });

    document.querySelectorAll(".mobile-item").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
        });
    });

    /* -----------------------------
       Smooth Scroll (GSAP or fallback)
    ------------------------------ */
    document.querySelectorAll(".nav-link, .mobile-item, .btn").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        link.addEventListener("click", (e) => {
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            if (window.gsap && window.ScrollToPlugin) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 70 },
                    ease: "power2.out",
                });
            } else {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* -----------------------------
       Gallery Loader with categories
    ------------------------------ */
    const galleryGrid = document.getElementById("galleryGrid");
    const galleryItems = [
        { url: "https://images.unsplash.com/photo-1519672860751-0f7f1aa5a94b?auto=format&w=900", category: "floral" },
        { url: "https://images.unsplash.com/photo-1599785209795-129aebdf33fb?auto=format&w=900", category: "drip" },
        { url: "https://images.unsplash.com/photo-1524182576065-23744cf1c7d6?auto=format&w=900", category: "floral" },
        { url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&w=900", category: "kids" },
        { url: "https://images.unsplash.com/photo-1511379922036-126cbf4f043c?auto=format&w=900", category: "wedding" },
        { url: "https://images.unsplash.com/photo-1601612625793-3a3b145fbef4?auto=format&w=900", category: "drip" }
    ];

    if (galleryGrid) {
        galleryItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = `gallery-card reveal`;
            card.dataset.category = item.category;
            card.innerHTML = `<img src="${item.url}" alt="Cake">`;
            galleryGrid.appendChild(card);
        });
    }

    /* -----------------------------
       Filter buttons
    ------------------------------ */
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length && galleryGrid) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter;
                filterButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
                    const cat = card.dataset.category;
                    if (filter === "all" || cat === filter) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    /* -----------------------------
       Lightbox for gallery
    ------------------------------ */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImg && lightboxClose && galleryGrid) {
        galleryGrid.addEventListener("click", (e) => {
            const img = e.target.closest("img");
            if (!img) return;
            lightboxImg.src = img.src;
            lightbox.classList.add("open");
        });

        const closeLightbox = () => lightbox.classList.remove("open");

        lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("open")) {
                closeLightbox();
            }
        });
    }

    /* -----------------------------
       Testimonials slider
    ------------------------------ */
    const testimonials = document.querySelectorAll(".testimonial");
    const testPrev = document.getElementById("testPrev");
    const testNext = document.getElementById("testNext");
    let testIndex = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((t, i) => {
            t.classList.toggle("active", i === index);
        });
    };

    if (testimonials.length) {
        showTestimonial(testIndex);

        if (testPrev && testNext) {
            testPrev.addEventListener("click", () => {
                testIndex = (testIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(testIndex);
            });

            testNext.addEventListener("click", () => {
                testIndex = (testIndex + 1) % testimonials.length;
                showTestimonial(testIndex);
            });
        }

        // Auto-rotate every 8s
        setInterval(() => {
            testIndex = (testIndex + 1) % testimonials.length;
            showTestimonial(testIndex);
        }, 8000);
    }

    /* -----------------------------
       Build Your Cake wizard
    ------------------------------ */
    const stepButtons = document.querySelectorAll(".build-step-btn");
    const panels = document.querySelectorAll(".build-panel");
    const prevBtn = document.getElementById("buildPrev");
    const nextBtn = document.getElementById("buildNext");
    const summaryBox = document.getElementById("buildSummary");
    let currentStep = 1;

    const updateStep = (step) => {
        currentStep = step;
        stepButtons.forEach((btn) => {
            btn.classList.toggle("active", Number(btn.dataset.step) === step);
        });
        panels.forEach((panel) => {
            panel.classList.toggle("hidden", Number(panel.dataset.step) !== step);
        });
        prevBtn.disabled = step === 1;
        nextBtn.textContent = step === 4 ? "Done" : "Next";
    };

    const updateSummary = () => {
        const flavour = document.querySelector('input[name="build_flavour"]:checked')?.value || "Not chosen";
        const size = document.querySelector('input[name="build_size"]:checked')?.value || "Not chosen";
        const theme = document.querySelector('input[name="build_theme"]:checked')?.value || "Not chosen";
        const notes = document.getElementById("build_notes")?.value.trim() || "None yet – add in step 4!";

        summaryBox.querySelector('[data-summary="flavour"]').textContent = flavour;
        summaryBox.querySelector('[data-summary="size"]').textContent = size;
        summaryBox.querySelector('[data-summary="theme"]').textContent = theme;
        summaryBox.querySelector('[data-summary="notes"]').textContent = notes;
    };

    if (stepButtons.length && panels.length && prevBtn && nextBtn && summaryBox) {
        updateStep(1);
        updateSummary();

        stepButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                updateStep(Number(btn.dataset.step));
            });
        });

        prevBtn.addEventListener("click", () => {
            if (currentStep > 1) {
                updateStep(currentStep - 1);
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentStep < 4) {
                updateStep(currentStep + 1);
            } else {
                // Finalise summary
                updateSummary();
            }
        });

        document.querySelectorAll('input[name="build_flavour"], input[name="build_size"], input[name="build_theme"]').forEach((input) => {
            input.addEventListener("change", updateSummary);
        });

        const notesField = document.getElementById("build_notes");
        if (notesField) {
            notesField.addEventListener("input", updateSummary);
        }

        // pipe summary into contact message when user clicks "Send This with Enquiry"
        const buildToEnquiry = document.querySelector(".build-to-enquiry");
        const messageField = document.getElementById("messageField");

        if (buildToEnquiry && messageField) {
            buildToEnquiry.addEventListener("click", () => {
                updateSummary();
                const flavour = summaryBox.querySelector('[data-summary="flavour"]').textContent;
                const size = summaryBox.querySelector('[data-summary="size"]').textContent;
                const theme = summaryBox.querySelector('[data-summary="theme"]').textContent;
                const notes = summaryBox.querySelector('[data-summary="notes"]').textContent;

                const template = `Cake enquiry from Build Your Cake:\n\nFlavour: ${flavour}\nSize: ${size}\nTheme: ${theme}\nNotes: ${notes}\n\nPlease add any extra info here...`;
                if (!messageField.value) {
                    messageField.value = template;
                }
            });
        }
    }

    /* -----------------------------
       FAQ accordion
    ------------------------------ */
    document.querySelectorAll(".faq-item").forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isOpen = answer.style.display === "block";
            document.querySelectorAll(".faq-answer").forEach((a) => (a.style.display = "none"));
            if (!isOpen) {
                answer.style.display = "block";
            }
        });
    });

    /* -----------------------------
       Sprinkles creation
    ------------------------------ */
    const sprinklesLayer = document.getElementById("sprinklesLayer");
    if (sprinklesLayer) {
        const colours = ["#ffb6d9", "#ffd66b", "#c8ffe3", "#fbb1bd", "#b5c7ff"];

        for (let i = 0; i < 40; i++) {
            const s = document.createElement("div");
            s.className = "sprinkle";
            const left = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = 8 + Math.random() * 7;
            const colour = colours[Math.floor(Math.random() * colours.length)];

            s.style.left = `${left}vw`;
            s.style.animationDelay = `${delay}s`;
            s.style.animationDuration = `${duration}s`;
            s.style.backgroundColor = colour;

            sprinklesLayer.appendChild(s);
        }
    }

    /* -----------------------------
       Footer year
    ------------------------------ */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* -----------------------------
       GSAP Animations (if available)
    ------------------------------ */
    if (window.gsap) {
        const plugins = [];
        if (window.ScrollTrigger) plugins.push(ScrollTrigger);
        if (window.ScrollToPlugin) plugins.push(ScrollToPlugin);
        if (plugins.length) gsap.registerPlugin(...plugins);

        // Floating hero cakes
        gsap.utils.toArray(".hero-img").forEach((img, index) => {
            gsap.to(img, {
                y: index % 2 === 0 ? 18 : -18,
                duration: 3 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        // 3D cake viewer rotation
        const cakeViewer = document.getElementById("cakeViewer");
        if (cakeViewer) {
            gsap.to(cakeViewer.querySelector(".cake-card"), {
                rotateY: 10,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            });
        }

        // Reveal elements
        if (window.ScrollTrigger) {
            gsap.utils.toArray(".reveal").forEach((el) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                });
            });

            // Parallax background
            const parallaxBg = document.getElementById("parallaxBg");
            if (parallaxBg) {
                gsap.to(parallaxBg, {
                    y: 80,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                });
            }
        }
    }
});
