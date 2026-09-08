document.addEventListener("DOMContentLoaded", () => {
  // Sticky Header
  const header = document.getElementById("header");
  const checkScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      mainNav.classList.toggle("is-open");
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("is-open");
      });
    });
  }

  // FAQ Accordion
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Close all other accordions (optional, but good for clean UX)
      faqButtons.forEach((btn) => {
        if (btn !== button) {
          btn.setAttribute("aria-expanded", "false");
          btn.nextElementSibling.setAttribute("hidden", "");
        }
      });

      // Toggle current
      if (!isExpanded) {
        button.setAttribute("aria-expanded", "true");
        button.nextElementSibling.removeAttribute("hidden");
      } else {
        button.setAttribute("aria-expanded", "false");
        button.nextElementSibling.setAttribute("hidden", "");
      }
    });
  });

  // Intersection Observer for Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));
});
