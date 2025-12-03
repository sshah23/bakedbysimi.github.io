/* ================================================
   Baked by Simi – Interactions & Animations
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile Menu */
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

  /* Smooth Scroll */
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

  /* Gallery Loader */
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

  /* Filter buttons */
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length && galleryGrid) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
          const cat = card.dataset.category;
          card.style.display = filter === "all" || cat === filter ? "" : "none";
        });
      });
    });
  }

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  const openLightbox = (src, caption = "") => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add("open");
  };

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  if (galleryGrid) {
    galleryGrid.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (img) openLightbox(img.src, img.alt || "");
    });
  }

  /* Customer Love Wall */
  const testimonialsData = [
    {
      quote: "The cake looked incredible and tasted even better. Everyone asked where we got it from!",
      name: "Sarah",
      tag: "30th birthday",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400",
    },
    {
      quote: "Our wedding cake was perfect – exactly what we imagined. Simi was so easy to work with.",
      name: "Priya & James",
      tag: "Wedding",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400&sat=-40",
    },
    {
      quote: "My son was obsessed with his superhero cake. The details were unreal and the sponge was so light!",
      name: "Aisha",
      tag: "Kids party",
      img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&w=400",
    },
    {
      quote: "Simi sent sketches, flavour notes and storage tips. It felt like ordering from a friend.",
      name: "Louise",
      tag: "Baby shower",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400&sat=40",
    }
  ];

  const slider = document.getElementById("testimonialSlider");
  const dotsWrap = document.getElementById("testDots");
  const testPrev = document.getElementById("testPrev");
  const testNext = document.getElementById("testNext");
  let testIndex = 0;

  const renderTestimonials = () => {
    if (!slider || !dotsWrap) return;
    slider.innerHTML = "";
    dotsWrap.innerHTML = "";

    testimonialsData.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "testimonial-card";
      card.innerHTML = `
        <div class="avatar"><img src="${item.img}" alt="${item.name}"></div>
        <div>
          <div class="stars">${"★".repeat(5)}</div>
          <p class="testimonial-quote">“${item.quote}”</p>
          <p class="testimonial-name">— ${item.name}</p>
          <div class="testimonial-meta"><i class="ri-sparkling-2-line"></i><span>${item.tag}</span></div>
        </div>`;
      slider.appendChild(card);

      const dot = document.createElement("div");
      dot.className = "dot";
      dot.addEventListener("click", () => showTestimonial(index));
      dotsWrap.appendChild(dot);
    });
  };

  const animateCard = (current, next) => {
    if (!window.gsap || !current || !next) return;
    const tl = gsap.timeline();
    tl.to(current, { duration: 0.4, x: -30, opacity: 0, ease: "power2.in" })
      .set(current, { display: "none" })
      .fromTo(next, { display: "grid", x: 30, opacity: 0 }, { duration: 0.6, x: 0, opacity: 1, ease: "power3.out" });
  };

  const showTestimonial = (index) => {
    const cards = slider?.querySelectorAll(".testimonial-card") || [];
    if (!cards.length) return;
    const prevCard = cards[testIndex];
    testIndex = (index + cards.length) % cards.length;
    const nextCard = cards[testIndex];

    cards.forEach((card, i) => {
      card.classList.toggle("active", i === testIndex);
      card.style.display = i === testIndex ? "grid" : "none";
    });

    animateCard(prevCard, nextCard);

    const dots = dotsWrap?.querySelectorAll(".dot") || [];
    dots.forEach((d, i) => d.classList.toggle("active", i === testIndex));
  };

  if (slider && dotsWrap) {
    renderTestimonials();
    showTestimonial(0);

    testPrev?.addEventListener("click", () => showTestimonial(testIndex - 1));
    testNext?.addEventListener("click", () => showTestimonial(testIndex + 1));

    setInterval(() => showTestimonial(testIndex + 1), 7000);
  }

  /* Social-style feed */
  const feedGrid = document.getElementById("feedGrid");
  const feedPool = [
    { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&w=800", caption: "Lemon & raspberry ribbon cake" },
    { url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&w=800", caption: "Pastel bow cupcakes" },
    { url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&w=800", caption: "Berry-studded drip" },
    { url: "https://images.unsplash.com/photo-1524182576065-23744cf1c7d6?auto=format&w=800", caption: "Palette knife florals" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&w=800", caption: "Vanilla bean cupcakes" },
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&w=800", caption: "Chocolate fudge swirls" },
    { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800", caption: "Birthday pastel stack" },
    { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&sat=-20", caption: "Wedding sugar flowers" },
    { url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476e?auto=format&w=800", caption: "Cookie crumble minis" },
    { url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&w=800", caption: "Rainbow sprinkle slice" }
  ];
  let feedItems = feedPool.slice(0, 9);

  const renderFeed = () => {
    if (!feedGrid) return;
    feedGrid.innerHTML = "";

    feedItems.forEach((post) => {
      const card = document.createElement("div");
      card.className = "feed-card reveal";
      card.innerHTML = `
        <img src="${post.url}" alt="${post.caption}">
        <div class="feed-overlay">${post.caption}</div>`;
      card.addEventListener("click", () => openLightbox(post.url, post.caption));
      feedGrid.appendChild(card);
    });
  };

  const refreshTicker = document.getElementById("refreshTicker");
  const shuffleFeed = () => {
    const randomPost = feedPool[Math.floor(Math.random() * feedPool.length)];
    feedItems.pop();
    feedItems.unshift(randomPost);
    renderFeed();
    if (refreshTicker) refreshTicker.classList.add("pulse");
    setTimeout(() => refreshTicker?.classList.remove("pulse"), 600);
  };

  if (feedGrid) {
    renderFeed();
    setInterval(shuffleFeed, 10000);
  }

  /* Build Your Cake wizard */
  const stepButtons = document.querySelectorAll(".build-step-btn");
  const panels = document.querySelectorAll(".build-panel");
  const prevBtn = document.getElementById("buildPrev");
  const nextBtn = document.getElementById("buildNext");
  const summaryBox = document.getElementById("buildSummary");
  let currentStep = 1;

  const updateStep = (step) => {
    currentStep = step;
    stepButtons.forEach((btn) => btn.classList.toggle("active", Number(btn.dataset.step) === step));
    panels.forEach((panel) => panel.classList.toggle("hidden", Number(panel.dataset.step) !== step));
    if (prevBtn) prevBtn.disabled = step === 1;
    if (nextBtn) nextBtn.textContent = step === 4 ? "Done" : "Next";
  };

  const updateSummary = () => {
    const flavour = document.querySelector('input[name="build_flavour"]:checked')?.value || "Not chosen";
    const size = document.querySelector('input[name="build_size"]:checked')?.value || "Not chosen";
    const theme = document.querySelector('input[name="build_theme"]:checked')?.value || "Not chosen";
    const notes = document.getElementById("build_notes")?.value.trim() || "None yet – add in step 4!";

    const setSummaryValue = (key, value) => {
      const target = summaryBox?.querySelector(`[data-summary="${key}"]`);
      if (target) target.textContent = value;
    };

    setSummaryValue("flavour", flavour);
    setSummaryValue("size", size);
    setSummaryValue("theme", theme);
    setSummaryValue("notes", notes);
  };

  if (stepButtons.length && panels.length && prevBtn && nextBtn && summaryBox) {
    updateStep(1);
    updateSummary();

    stepButtons.forEach((btn) => btn.addEventListener("click", () => updateStep(Number(btn.dataset.step))));
    prevBtn.addEventListener("click", () => currentStep > 1 && updateStep(currentStep - 1));
    nextBtn.addEventListener("click", () => {
      if (currentStep < 4) updateStep(currentStep + 1);
      else updateSummary();
    });

    document.querySelectorAll('input[name="build_flavour"], input[name="build_size"], input[name="build_theme"]').forEach((input) =>
      input.addEventListener("change", updateSummary)
    );

    document.getElementById("build_notes")?.addEventListener("input", updateSummary);

    const buildToEnquiry = document.querySelector(".build-to-enquiry");
    const messageField = document.getElementById("messageField");
    buildToEnquiry?.addEventListener("click", () => {
      updateSummary();
      const flavour = summaryBox.querySelector('[data-summary="flavour"]').textContent;
      const size = summaryBox.querySelector('[data-summary="size"]').textContent;
      const theme = summaryBox.querySelector('[data-summary="theme"]').textContent;
      const notes = summaryBox.querySelector('[data-summary="notes"]').textContent;
      const template = `Cake enquiry from Build Your Cake:\n\nFlavour: ${flavour}\nSize: ${size}\nTheme: ${theme}\nNotes: ${notes}\n\nPlease add any extra info here...`;
      if (messageField && !messageField.value) messageField.value = template;
    });
  }

  /* Sprinkles creation */
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

  /* Footer year */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* GSAP Animations */
  if (window.gsap) {
    const plugins = [];
    if (window.ScrollTrigger) plugins.push(ScrollTrigger);
    if (window.ScrollToPlugin) plugins.push(ScrollToPlugin);
    if (plugins.length) gsap.registerPlugin(...plugins);

    if (window.ScrollTrigger) {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
          delay: i * 0.05,
        });
      });

      const parallaxBg = document.getElementById("parallaxBg");
      if (parallaxBg) {
        gsap.to(parallaxBg, {
          y: 80,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
        });
      }
    }
  }
});
