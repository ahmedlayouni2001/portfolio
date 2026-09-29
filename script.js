(() => {
  /* ── Language switch (EN / FR) ── */
  const FR = window.I18N_FR || {};
  const nodes = document.querySelectorAll("[data-i18n]");
  const EN = {};
  nodes.forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

  const META = {
    en: { title: "Ahmed Layouni · AI & Data Engineer" },
    fr: { title: "Ahmed Layouni · Ingénieur IA & Data" },
  };

  /* CV button: English CV on the English page, French CV on the French page.
     If Ahmed_Layouni_CV_FR.pdf is not uploaded yet, the English one is used. */
  const CV = { en: "Ahmed_Layouni_CV_EN.pdf", fr: "Ahmed_Layouni_CV_FR.pdf" };
  let frCvExists = null;
  function checkFrCv() {
    if (frCvExists !== null) return Promise.resolve(frCvExists);
    return fetch(CV.fr, { method: "HEAD" })
      .then((r) => (frCvExists = r.ok))
      .catch(() => (frCvExists = false));
  }
  function setCv(lang) {
    const apply = (file) => document.querySelectorAll("[data-cv]").forEach((a) => (a.href = file));
    if (lang !== "fr") return apply(CV.en);
    checkFrCv().then((ok) => {
      if (document.documentElement.lang === "fr") apply(ok ? CV.fr : CV.en);
    });
  }

  function setLang(lang) {
    const dict = lang === "fr" ? FR : EN;
    nodes.forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    document.documentElement.lang = lang;
    setCv(lang);
    document.title = META[lang].title;
    document.querySelectorAll(".lang button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang))
    );
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  let initial = "en";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") initial = saved;
    else if ((navigator.language || "").toLowerCase().startsWith("fr")) initial = "fr";
  } catch (e) {}
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "fr") initial = q;
  if (initial !== "en") setLang(initial);

  document.querySelectorAll(".lang button").forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );

  /* ── Mobile menu ── */
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ── Nav border + active section ── */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navMap = {};
  links.querySelectorAll("a").forEach((a) => { navMap[a.getAttribute("href").slice(1)] = a; });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        Object.values(navMap).forEach((a) => a.classList.remove("active"));
        navMap[e.target.id] && navMap[e.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));

  /* ── Reveal on scroll ── */
  const rev = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => rev.observe(el));

  /* ── Certificate lightbox ── */
  const box = document.getElementById("lightbox");
  const boxImg = document.getElementById("lightboxImg");
  document.querySelectorAll(".cert").forEach((c) =>
    c.addEventListener("click", () => {
      boxImg.src = c.dataset.full;
      boxImg.alt = c.dataset.alt;
      box.showModal();
    })
  );
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.classList.contains("lightbox__close")) box.close();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
