/* =========================================================
   NAVBAR INTERACTIONS
   - Mobile menu
   - Sticky/scrolled state
   - Active nav link
   - Close menu after click
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

function getNavbarElements() {
    return {
        header: document.querySelector("#navbar-container"),
        toggle: document.querySelector("#navbar-toggle"),
        menu: document.querySelector("#navbar-menu"),
        links: document.querySelectorAll(".navbar-link")
    };
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const {
        toggle,
        menu,
        links
    } = getNavbarElements();


    if (!toggle || !menu) {
        return;
    }


    if (toggle.dataset.initialized === "true") {
        return;
    }


    function openMenu() {

        menu.classList.add("active");

        toggle.classList.add("active");

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        menu.classList.remove("active");

        toggle.classList.remove("active");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    }


    function toggleMenu() {

        const isOpen =
            menu.classList.contains("active");


        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    /* Toggle button */

    toggle.addEventListener(
        "click",
        toggleMenu
    );


    /* Tutup menu setelah klik link */

    links.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* Tutup jika klik area luar */

    document.addEventListener(
        "click",
        (event) => {

            const isInsideMenu =
                menu.contains(event.target);

            const isToggle =
                toggle.contains(event.target);


            if (
                menu.classList.contains("active") &&
                !isInsideMenu &&
                !isToggle
            ) {
                closeMenu();
            }

        }
    );


    /* Tutup dengan Escape */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("active")
            ) {
                closeMenu();

                toggle.focus();
            }

        }
    );


    /* Jika kembali ke desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        }
    );


    toggle.dataset.initialized = "true";
}


/* =========================================================
   NAVBAR SCROLL STATE
========================================================= */

function initializeNavbarScroll() {

    const { header } =
        getNavbarElements();


    if (!header) {
        return;
    }


    function handleScroll() {

        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    handleScroll();


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

function initializeActiveNavigation() {

    const { links } =
        getNavbarElements();


    if (!links.length) {
        return;
    }


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (!sections.length) {
        return;
    }


    const sectionMap = new Map();


    links.forEach((link) => {

        const href =
            link.getAttribute("href");


        /*
            Mendukung:
            #about
            index.html#about
        */

        if (!href || !href.includes("#")) {
            return;
        }


        const id =
            href.split("#")[1];


        if (id) {
            sectionMap.set(
                id,
                link
            );
        }

    });


    const observerOptions = {

        root: null,

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0

    };


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const currentId =
                            entry.target.id;


                        links.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const currentLink =
                            sectionMap.get(
                                currentId
                            );


                        if (currentLink) {

                            currentLink.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },
            observerOptions
        );


    sections.forEach(
        (section) => {

            observer.observe(section);

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initializeSmoothNavigation() {

    const { links } =
        getNavbarElements();


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    !href.includes("#")
                ) {
                    return;
                }


                const targetId =
                    href.split("#")[1];


                const targetSection =
                    document.getElementById(
                        targetId
                    );


                /*
                    Jika section ada di halaman saat ini,
                    lakukan smooth scroll.
                */

                if (targetSection) {

                    event.preventDefault();


                    const navbarHeight =
                        document
                            .querySelector(
                                "#navbar-container"
                            )
                            ?.offsetHeight || 0;


                    const targetPosition =
                        targetSection
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        navbarHeight;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }
        );

    });

}


/* =========================================================
   INITIALIZE NAVBAR
========================================================= */

function initializeNavbar() {

    initializeMobileMenu();

    initializeNavbarScroll();

    initializeActiveNavigation();

    initializeSmoothNavigation();

}


/* =========================================================
   COMPONENTS READY
========================================================= */

document.addEventListener(
    "componentsReady",
    initializeNavbar
);


/* =========================================================
   FALLBACK
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
            Jika navbar langsung ditulis di HTML,
            bukan dimuat dari components.js
        */

        if (
            document.querySelector(
                "#navbar-toggle"
            )
        ) {

            initializeNavbar();

        }

    }
);