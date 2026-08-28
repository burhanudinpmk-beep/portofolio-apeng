/* =========================================================
   SCROLL ANIMATION
   - Reveal elements on scroll
   - One-time animation
   - Auto stagger
   - Back to top button
   - Reduced motion support
========================================================= */


/* =========================================================
   INITIALIZE SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) {
        return;
    }


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach((element) => {

            element.classList.add("active");

        });

        return;
    }


    /* =====================================================
       FALLBACK
       Jika browser tidak mendukung IntersectionObserver
    ====================================================== */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {

            element.classList.add("active");

        });

        return;
    }


    /* =====================================================
       INTERSECTION OBSERVER
    ====================================================== */

    const observerOptions = {

        root: null,

        threshold: 0.12,

        rootMargin:
            "0px 0px -40px 0px"

    };


    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "active"
                    );


                    /*
                        Animasi hanya sekali.
                        Setelah tampil, hentikan observasi.
                    */

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            observerOptions

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}



/* =========================================================
   AUTO STAGGER
========================================================= */

function initializeAutoStagger() {

    /*
        Container yang ingin diberi stagger otomatis
    */

    const staggerContainers =
        document.querySelectorAll(
            `
            .projects-grid,
            .about-cards,
            .certifications-grid,
            .skills-grid
            `
        );


    staggerContainers.forEach((container) => {

        const revealChildren =
            container.querySelectorAll(".reveal");


        revealChildren.forEach(
            (element, index) => {

                /*
                    Maksimal delay agar tidak terasa lambat
                */

                const delay =
                    Math.min(
                        index * 100,
                        400
                    );


                element.style.transitionDelay =
                    `${delay}ms`;

            }
        );

    });

}



/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

function initializeBackToTop() {

    const backToTop =
        document.querySelector("#back-to-top");


    if (!backToTop) {
        return;
    }


    /* =====================================================
       SHOW / HIDE BUTTON
    ====================================================== */

    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    /* Initial state */

    updateBackToTop();


    /* Listen scroll */

    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    /* =====================================================
       CLICK BACK TO TOP
    ====================================================== */

    backToTop.addEventListener(
        "click",
        () => {

            const prefersReducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}



/* =========================================================
   SAFETY FALLBACK
   Mencegah halaman tetap putih jika JS bermasalah
========================================================= */

function revealVisibleElementsImmediately() {

    const revealElements =
        document.querySelectorAll(".reveal");


    revealElements.forEach((element) => {

        const rect =
            element.getBoundingClientRect();


        const isVisible =
            rect.top < window.innerHeight
            &&
            rect.bottom > 0;


        if (isVisible) {

            element.classList.add(
                "active"
            );

        }

    });

}



/* =========================================================
   INITIALIZE
========================================================= */

function initializeScrollAnimations() {

    initializeAutoStagger();

    initializeScrollReveal();

    initializeBackToTop();


    /*
        Safety untuk elemen yang sudah terlihat
        saat halaman pertama kali dibuka.
    */

    requestAnimationFrame(() => {

        revealVisibleElementsImmediately();

    });

}



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeScrollAnimations
);