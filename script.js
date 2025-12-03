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
    {
      url: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/480819768_1000296238860384_3580106696157408583_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=y1XQuO9qjXAQ7kNvwGkzc9z&_nc_oc=AdmjIPajkxDFW8aI7EsEE1k4Hw3DaPVzzc8DBDCcgrXddFfjlsE0b13dxT-QFMNS2Ac&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=9SAe8_36taIbpL2bp7I91Q&oh=00_AfllTpHJ9GzFd92dBgu_GkS65lVx0H9pYm2V1b5H67E-uQ&oe=69363C5F",
      category: "floral",
      alt: "Pink bow-trimmed buttercream cake"
    },
    {
      url: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/480570116_1000287478861260_2664845713956705961_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OBe2cwsdq_8Q7kNvwGwYEeX&_nc_oc=Adl-r_kDBefQGXbzf5crnc2_C9BTQfGlIHxBtTql9nuJU8eIwOAQAzvKSeqdIigsXEg&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=ylk_NhfjHnGfsdEqlB79hw&oh=00_AflZKJdVdGiNw1i6G_-PUr2hhaRiCfMKsTKRR9KYxSOTKQ&oe=69362FA4",
      category: "drip",
      alt: "Chocolate drip celebration cake"
    },
    {
      url: "https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/481176147_999753605581314_2217884568539386439_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=idAOfCSNa9kQ7kNvwGbgeh8&_nc_oc=AdkhFY2-aw5mxSxts1qCcgSNYPqb2JLzdLUJ61mcYugX7nDXd5ZnMuFSkoECJ0oFPwk&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=bbSk83TviS_HWwcRiOR0qg&oh=00_Afl19e3U6xZS3OPNIz2l1xr7InF5UnsCbRp8wB4y25aiQA&oe=69364D3A",
      category: "wedding",
      alt: "Textured ivory wedding cake"
    },
    {
      url: "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/481240525_998864599003548_319281431003586274_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-5G3pBjPEEQQ7kNvwE-Ki35&_nc_oc=Adl1YJb9TAGyq5izYKQ_2J19ztDHVo0GPEDsRqfDylwpWVJSKkTkdfxYM-W6qs3HXDE&_nc_zt=23&_nc_ht=scontent-lhr8-1.xx&_nc_gid=0wExzxxSEN4cxPJ_pyNkkw&oh=00_AflShf5DXOQlEDL7vVS6yrB4JMGip29AAT9DZXhx0j7RZA&oe=693646A6",
      category: "kids",
      alt: "Fun pastel birthday cake"
    }
  ];

  if (galleryGrid) {
    galleryItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = `gallery-card reveal`;
      card.dataset.category = item.category;
      card.innerHTML = `<img loading="lazy" src="${item.url}" alt="${item.alt || "Cake"}">`;
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
  const fallbackFeed = [
    { url: galleryItems[0].url, caption: galleryItems[0].alt },
    { url: galleryItems[1].url, caption: galleryItems[1].alt },
    { url: galleryItems[2].url, caption: galleryItems[2].alt },
    { url: galleryItems[3].url, caption: galleryItems[3].alt },
    { url: galleryItems[0].url, caption: "Buttercream bow cake detail" },
    { url: galleryItems[1].url, caption: "Chocolate drip and sprinkles" },
    { url: galleryItems[2].url, caption: "Ivory stacked tiers" },
    { url: galleryItems[3].url, caption: "Pastel birthday stack" },
    { url: galleryItems[0].url, caption: "Celebration cake close-up" }
  ];
  let feedPool = [];
  let feedItems = [];

  const fetchInstagramFeed = async () => {
    const endpoint = "https://r.jina.ai/https://www.instagram.com/bakedbysimi/";
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Instagram request blocked");
    const text = await response.text();

    const urls = Array.from(text.matchAll(/"display_url":"(https:[^"\\]+?)"/g)).map((m) => m[1].replace(/\\u0026/g, "&"));
    const captions = Array.from(text.matchAll(/"accessibility_caption":"([^"\\]+)"/g)).map((m) => m[1].replace(/\\u0026/g, "&"));

    const posts = [];
    urls.forEach((url, idx) => {
      if (posts.find((p) => p.url === url) || posts.length >= 12) return;
      posts.push({ url, caption: captions[idx] || "Fresh from Instagram" });
    });
    return posts.slice(0, 9);
  };

  const renderFeed = () => {
    if (!feedGrid) return;
    feedGrid.innerHTML = "";

    feedItems.forEach((post) => {
      const card = document.createElement("div");
      card.className = "feed-card reveal";
      card.innerHTML = `
        <img loading="lazy" src="${post.url}" alt="${post.caption}">
        <div class="feed-overlay">${post.caption}</div>`;
      card.addEventListener("click", () => openLightbox(post.url, post.caption));
      feedGrid.appendChild(card);
    });
  };

  const refreshTicker = document.getElementById("refreshTicker");
  const shuffleFeed = () => {
    if (!feedPool.length) return;
    const randomPost = feedPool[Math.floor(Math.random() * feedPool.length)];
    feedItems.pop();
    feedItems.unshift(randomPost);
    renderFeed();
    if (refreshTicker) refreshTicker.classList.add("pulse");
    setTimeout(() => refreshTicker?.classList.remove("pulse"), 600);
  };

  const initFeed = async () => {
    if (!feedGrid) return;
    try {
      feedPool = await fetchInstagramFeed();
      if (refreshTicker) refreshTicker.innerHTML = '<span class="dot"></span> Live from Instagram';
    } catch (error) {
      feedPool = fallbackFeed;
      if (refreshTicker) refreshTicker.innerHTML = '<span class="dot"></span> Fresh cake picks';
    }
    feedItems = feedPool.slice(0, 9);
    renderFeed();
    setInterval(shuffleFeed, 12000);
  };

  initFeed();

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
