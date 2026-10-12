
/* ==============================================
   KUMARASOORIYAN THANUGIKA
   PORTFOLIO - COMPLETE SCRIPT.JS
============================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       01. MOBILE NAVIGATION
    ========================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    function closeMobileMenu() {
        if (!menuBtn || !navLinks) return;

        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && navLinks) {

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-controls", "navLinks");

        menuBtn.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuBtn.textContent = isOpen ? "✕" : "☰";
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", function (event) {
            if (
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }


    /* ==========================================
       02. SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetID = this.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const targetSection = document.getElementById(
                targetID.substring(1)
            );

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ==========================================
       03. ACTIVE NAVIGATION
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navigationLinks.forEach(link => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
                "active-link",
                linkTarget === "#" + currentSection
            );
        });
    }


    /* ==========================================
       04. NAVBAR SHADOW
    ========================================== */

    const header = document.querySelector("header");

    function updateNavbarShadow() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.style.boxShadow =
                "0 8px 30px rgba(23, 23, 46, 0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    }


    /* ==========================================
       05. SCROLL EVENTS
    ========================================== */

    window.addEventListener("scroll", function () {
        updateActiveNavigation();
        updateNavbarShadow();
    }, { passive: true });

    updateActiveNavigation();
    updateNavbarShadow();


    /* ==========================================
       06. SCROLL REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".stat-card, " +
        ".experience-card, " +
        ".skill-card, " +
        ".featured-project, " +
        ".project-card, " +
        ".education-item, " +
        ".professional-skills, " +
        ".contact-heading, " +
        ".contact-left, " +
        ".contact-form-box"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        const revealObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        revealElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            revealObserver.observe(element);
        });
    }


    /* ==========================================
       07. PROFILE IMAGE
    ========================================== */

    // Rotating profile ring is controlled by CSS.
    // Do not rotate the photo using JavaScript.

    const heroImageBox = document.querySelector(".hero-image-box");
    const profileImage = document.querySelector(".profile-image");

    if (heroImageBox) {
        heroImageBox.classList.add("profile-animation-ready");
    }

    if (profileImage) {

        profileImage.addEventListener("error", function () {
            console.error(
                "Profile image not found. Check the image path in HTML."
            );
        });

        if (
            profileImage.complete &&
            profileImage.naturalWidth === 0
        ) {
            console.error("Profile image failed to load.");
        }
    }


    /* ==========================================
       08. PROJECT CARD EFFECT
    ========================================== */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-7px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });


    /* ==========================================
       09. CONTACT CARD EFFECT
    ========================================== */

    const contactCards = document.querySelectorAll(
        "a.contact-info-card"
    );

    contactCards.forEach(card => {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateX(6px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateX(0)";
        });
    });


    /* ==========================================
       10. CONTACT FORM - FORMSUBMIT
    ========================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        // Configure the form to send submissions to FormSubmit.
        contactForm.action =
            "https://formsubmit.co/KumarasooriyanThanugika@gmail.com";

        contactForm.method = "POST";

        // Make sure fields have names so FormSubmit receives them.
        const formFields = ["name", "email", "subject", "message"];

        formFields.forEach(fieldID => {
            const field = document.getElementById(fieldID);

            if (field && contactForm.contains(field)) {
                field.name = fieldID;
                field.required = true;
            }
        });

        // FormSubmit configuration.
        function addHiddenField(name, value) {

            let field = Array.from(
                contactForm.querySelectorAll('input[type="hidden"]')
            ).find(input => input.name === name);

            if (!field) {
                field = document.createElement("input");
                field.type = "hidden";
                field.name = name;
                contactForm.appendChild(field);
            }

            field.value = value;
        }

        addHiddenField(
            "_subject",
            "New Message From Thanugika Portfolio"
        );

        addHiddenField("_template", "table");
        addHiddenField("_captcha", "true");

        // Important:
        // Do NOT use event.preventDefault() here.
        // The browser must submit the form to FormSubmit.

        contactForm.addEventListener("submit", function () {

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.textContent = "Sending...";
            }

            // Normal browser form submission continues.
        });
    }


    /* ==========================================
       11. BACK TO TOP BUTTON
    ========================================== */

    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.textContent = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    Object.assign(backToTop.style, {
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "45px",
        height: "45px",
        border: "none",
        borderRadius: "50%",
        background: "#7c3aed",
        color: "#ffffff",
        fontSize: "22px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: "999",
        boxShadow: "0 10px 30px rgba(124, 58, 237, 0.30)",
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
        transition: "all 0.3s ease"
    });

    document.body.appendChild(backToTop);

    function updateBackToTop() {

        if (window.scrollY > 600) {
            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";
            backToTop.style.transform = "translateY(0)";
        } else {
            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
            backToTop.style.transform = "translateY(10px)";
        }
    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* ==========================================
       12. CURRENT YEAR
    ========================================== */

    const footerYear = document.querySelector(
        ".footer-content p:first-child"
    );

    if (footerYear) {
        footerYear.textContent =
            "© " +
            new Date().getFullYear() +
            " Kumarasooriyan Thanugika";
    }


    /* ==========================================
       13. PAGE LOAD
    ========================================== */

    window.addEventListener("load", function () {
        document.body.classList.add("page-loaded");

        updateActiveNavigation();
        updateNavbarShadow();
    });

});
