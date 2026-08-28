/* =========================================================
   COMPONENT LOADER
   Memuat navbar.html dan footer.html ke halaman
========================================================= */


/* =========================================================
   HELPER FUNCTION
========================================================= */

async function loadComponent(selector, filePath) {

    const container = document.querySelector(selector);

    // Jika container tidak ditemukan, hentikan proses
    if (!container) {
        return;
    }

    try {

        const response = await fetch(filePath);

        // Cek apakah file berhasil ditemukan
        if (!response.ok) {
            throw new Error(
                `Gagal memuat component: ${filePath}`
            );
        }

        const html = await response.text();

        // Masukkan component ke container
        container.innerHTML = html;

        // Beri tanda component selesai dimuat
        container.setAttribute(
            "data-component-loaded",
            "true"
        );


        /* =================================================
           CUSTOM EVENT
           Memberitahu file JS lain bahwa component
           sudah berhasil dimuat
        ================================================= */

        document.dispatchEvent(
            new CustomEvent(
                "componentLoaded",
                {
                    detail: {
                        selector,
                        filePath
                    }
                }
            )
        );

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="component-error">
                Component gagal dimuat.
            </div>
        `;

    }

}



/* =========================================================
   LOAD ALL COMPONENTS
========================================================= */

async function initializeComponents() {

    await Promise.all([

        loadComponent(
            "#navbar-container",
            "components/navbar.html"
        ),

        loadComponent(
            "#footer-container",
            "components/footer.html"
        )

    ]);


    /* =====================================================
       EVENT SEMUA COMPONENT SELESAI
    ====================================================== */

    document.dispatchEvent(
        new CustomEvent(
            "componentsReady"
        )
    );

}



/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeComponents
);