/* =========================================================
   HERO TEXT ANIMATION
   Rotating text:
   System Analysis
   Web Development
   UI/UX Design
   Project Leadership
========================================================= */

const heroTexts = [
    "System Analysis",
    "Web Development",
    "UI/UX Design",
    "Project Leadership"
];

let currentTextIndex = 0;


/* =========================================================
   INITIALIZE TEXT ANIMATION
========================================================= */

function initializeTextAnimation() {

    const animatedText =
        document.querySelector("#animated-text");

    if (!animatedText) {
        return;
    }


    /*
        Hindari initialisasi ganda
    */

    if (
        animatedText.dataset.initialized === "true"
    ) {
        return;
    }


    animatedText.dataset.initialized = "true";


    /*
        Text awal
    */

    animatedText.textContent =
        heroTexts[currentTextIndex];


    /*
        Ganti text setiap 2.5 detik
    */

    setInterval(() => {

        animatedText.classList.add(
            "text-exit"
        );


        setTimeout(() => {

            currentTextIndex =
                (currentTextIndex + 1)
                % heroTexts.length;


            animatedText.textContent =
                heroTexts[currentTextIndex];


            animatedText.classList.remove(
                "text-exit"
            );


            animatedText.classList.add(
                "text-enter"
            );


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    animatedText.classList.remove(
                        "text-enter"
                    );

                });

            });

        }, 350);

    }, 2500);

}



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeTextAnimation
);