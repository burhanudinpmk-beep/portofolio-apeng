/* =========================================================
   THEME SYSTEM
   Light Mode / Dark Mode
========================================================= */


/* =========================================================
   CONSTANT
========================================================= */

const THEME_KEY = "portfolio-theme";



/* =========================================================
   GET SAVED THEME
========================================================= */

function getSavedTheme() {

    return localStorage.getItem(THEME_KEY);

}



/* =========================================================
   GET SYSTEM THEME
========================================================= */

function getSystemTheme() {

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";

}



/* =========================================================
   GET CURRENT THEME
========================================================= */

function getCurrentTheme() {

    const savedTheme = getSavedTheme();

    if (savedTheme) {
        return savedTheme;
    }

    return getSystemTheme();

}



/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(theme) {

    const html = document.documentElement;

    if (theme === "dark") {

        html.classList.add("dark");

    } else {

        html.classList.remove("dark");

    }

    updateThemeButton(theme);

}



/* =========================================================
   SAVE THEME
========================================================= */

function saveTheme(theme) {

    localStorage.setItem(
        THEME_KEY,
        theme
    );

}



/* =========================================================
   UPDATE BUTTON ACCESSIBILITY
========================================================= */

function updateThemeButton(theme) {

    const themeToggle =
        document.querySelector("#theme-toggle");

    if (!themeToggle) {
        return;
    }


    const isDark =
        theme === "dark";


    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );


    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}



/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    const html =
        document.documentElement;


    const isDark =
        html.classList.contains("dark");


    const newTheme =
        isDark
            ? "light"
            : "dark";


    applyTheme(newTheme);

    saveTheme(newTheme);

}



/* =========================================================
   INITIALIZE BUTTON
========================================================= */

function initializeThemeToggle() {

    const themeToggle =
        document.querySelector("#theme-toggle");


    if (!themeToggle) {
        return;
    }


    /* Hindari event listener ganda */

    if (
        themeToggle.dataset.initialized === "true"
    ) {
        return;
    }


    themeToggle.addEventListener(
        "click",
        toggleTheme
    );


    themeToggle.dataset.initialized =
        "true";


    updateThemeButton(
        document.documentElement
            .classList
            .contains("dark")
            ? "dark"
            : "light"
    );

}



/* =========================================================
   INITIAL THEME
========================================================= */

function initializeTheme() {

    const theme =
        getCurrentTheme();

    applyTheme(theme);

}



/* =========================================================
   LOAD THEME AS EARLY AS POSSIBLE
========================================================= */

initializeTheme();



/* =========================================================
   NAVBAR COMPONENT READY
========================================================= */

document.addEventListener(
    "componentsReady",
    () => {

        initializeThemeToggle();

    }
);



/* =========================================================
   FALLBACK
   Jika navbar tidak memakai component loader
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeThemeToggle();

    }
);



/* =========================================================
   SYSTEM THEME CHANGE
========================================================= */

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemTheme.addEventListener(
    "change",
    (event) => {

        /*
           Jangan mengikuti perubahan sistem
           kalau user sudah memilih tema manual.
        */

        if (getSavedTheme()) {
            return;
        }


        applyTheme(
            event.matches
                ? "dark"
                : "light"
        );

    }
);