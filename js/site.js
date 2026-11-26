// Shared site behaviour: analytics tags, Kit email signup and blog links.
(function () {
  "use strict";
  var cfg = window.BOIKANYA_CONFIG || {};

  // Google Analytics / Google Ads (gtag.js). Loads only when an ID is set.
  var tagIds = [cfg.gaMeasurementId, cfg.googleAdsId].filter(Boolean);
  if (tagIds.length) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(tagIds[0]);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    tagIds.forEach(function (id) { window.gtag("config", id); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Kit email signup: show the footer form only once a form ID is configured.
    if (cfg.kitFormId) {
      document.querySelectorAll("[data-kit-signup]").forEach(function (box) {
        var form = box.querySelector("[data-kit-form]");
        if (form) form.action = "https://app.kit.com/forms/" + encodeURIComponent(cfg.kitFormId) + "/subscriptions";
        box.hidden = false;
      });
    }

    // Blog links point at the Kit blog when one is configured.
    if (cfg.blogUrl) {
      document.querySelectorAll("a[data-blog-link]").forEach(function (a) {
        a.href = cfg.blogUrl;
      });
    }

    // Fade sections in as they scroll into view on the new pages
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = document.querySelectorAll(".bk-page main > section:not(.bk-hero) .container > *");
    if (!reduce && "IntersectionObserver" in window && targets.length) {
      document.documentElement.classList.add("bk-anim");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      targets.forEach(function (el) { el.classList.add("bk-reveal"); io.observe(el); });
    }

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
