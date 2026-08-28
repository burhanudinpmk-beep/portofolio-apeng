/* =========================================================
   MAIN.JS
   Global Website Logic
========================================================= */


/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const backToTopButton =
        document.querySelector("#back-to-top");

    if (!backToTopButton) {
        return;
    }


    function toggleBackToTop() {

        if (window.scrollY > 500) {

            backToTopButton.classList.add(
                "show"
            );

        } else {

            backToTopButton.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        toggleBackToTop,
        {
            passive: true
        }
    );


    backToTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    toggleBackToTop();

}



/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "#current-year"
        );

    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        (element) => {

            element.textContent =
                currentYear;

        }
    );

}



/* =========================================================
   CERTIFICATE VIEWER
========================================================= */

function initializeCertificateViewer() {

    const modal =
        document.querySelector(
            "#certificate-modal"
        );

    const modalImage =
        document.querySelector(
            "#certificate-modal-image"
        );

    const modalTitle =
        document.querySelector(
            "#certificate-modal-title"
        );

    const modalProvider =
        document.querySelector(
            "#certificate-modal-provider"
        );

    const closeButton =
        document.querySelector(
            "#certificate-modal-close"
        );


    if (
        !modal ||
        !modalImage ||
        !modalTitle ||
        !modalProvider ||
        !closeButton
    ) {
        return;
    }


    let lastFocusedElement = null;



    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openCertificateModal(trigger) {

        const imageSource =
            trigger.dataset.certificate;

        const title =
            trigger.dataset.title ||
            "Certificate";

        const provider =
            trigger.dataset.provider ||
            "";


        if (!imageSource) {
            return;
        }


        lastFocusedElement =
            document.activeElement;


        modalImage.src =
            imageSource;

        modalImage.alt =
            title;


        modalTitle.textContent =
            title;

        modalProvider.textContent =
            provider;


        modal.hidden =
            false;


        document.body.classList.add(
            "modal-open"
        );


        requestAnimationFrame(
            () => {

                modal.classList.add(
                    "open"
                );

                closeButton.focus();

            }
        );

    }



    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeCertificateModal() {

        if (modal.hidden) {
            return;
        }


        modal.classList.remove(
            "open"
        );


        document.body.classList.remove(
            "modal-open"
        );


        window.setTimeout(
            () => {

                modal.hidden =
                    true;

                modalImage.src =
                    "";

                modalImage.alt =
                    "";

                modalTitle.textContent =
                    "Certificate";

                modalProvider.textContent =
                    "";


                if (
                    lastFocusedElement &&
                    typeof lastFocusedElement.focus
                        === "function"
                ) {

                    lastFocusedElement.focus();

                }

            },
            220
        );

    }



    /* =====================================================
       EVENT DELEGATION
       
       Saya gunakan delegation supaya tombol certificate
       tetap bekerja meskipun ada elemen yang dimuat
       setelah DOMContentLoaded.
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const trigger =
                event.target.closest(
                    ".certificate-trigger"
                );


            if (trigger) {

                event.preventDefault();

                openCertificateModal(
                    trigger
                );

                return;

            }


            if (
                event.target.matches(
                    "[data-close-modal]"
                )
            ) {

                closeCertificateModal();

            }

        }
    );



    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    closeButton.addEventListener(
        "click",
        closeCertificateModal
    );



    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !modal.hidden
            ) {

                closeCertificateModal();

            }

        }
    );



    /* =====================================================
       PREVENT RIGHT CLICK ON CERTIFICATE
    ====================================================== */

    modalImage.addEventListener(
        "contextmenu",
        (event) => {

            event.preventDefault();

        }
    );



    /* =====================================================
       PREVENT IMAGE DRAG
    ====================================================== */

    modalImage.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );



    /* =====================================================
       PREVENT SIMPLE COPY ACTION
    ====================================================== */

    modalImage.addEventListener(
        "copy",
        (event) => {

            event.preventDefault();

        }
    );



    /* =====================================================
       PREVENT SIMPLE IMAGE SELECTION
    ====================================================== */

    modalImage.addEventListener(
        "selectstart",
        (event) => {

            event.preventDefault();

        }
    );



    /* =====================================================
       ERROR HANDLING
    ====================================================== */

    modalImage.addEventListener(
        "error",
        () => {

            modalTitle.textContent =
                "Certificate unavailable";

            modalProvider.textContent =
                "The certificate image could not be loaded.";

        }
    );

}



/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeBackToTop();

        initializeCurrentYear();

        initializeCertificateViewer();

    }
);