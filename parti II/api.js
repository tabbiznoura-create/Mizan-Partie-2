
const BASE_URL = "http://localhost:3000";


export async function getproduct() {
    try {
        const data = await request("/articles");
        return data;

    } catch (error) {
        console.error("Erreur GET articles :", error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const data = await request(`/articles/${id}`);
        return data;

    } catch (error) {
        console.error("Erreur GET article :", error);
        throw error;
    }
}


export async function addProduct(product) {
    return await request("/articles", {
        method: "POST",
        body: JSON.stringify(product)
    });
}

export async function request(path, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(function () {
        controller.abort();
    }, 8000);

    try {
        const response = await fetch(BASE_URL + path, {
            ...options,
           headers: {
    "Content-Type": "application/json",
    ...options.headers
},
            signal: controller.signal
        });

        if (!response.ok) {
            throw {
                type: "http",
                status: response.status,
                message: "Erreur HTTP : " + response.status
            }
        }
         let data;

        try {
            data = await response.json();

        } catch (error) {
            throw {
                type: "parse",
                status: response.status,
                message: "Impossible de lire les données JSON"
            };
        }

        return data;
 } catch (error) {

        // Timeout
        if (error.name === "AbortError") {
            throw {
                type: "timeout",
                status: null,
                message: "La requête a dépassé 8 secondes"
            };
        }

 // Erreurs déjà normalisées
        if (error.type) {
            throw error;
        }

        // Offline
        if (!navigator.onLine) {
            throw {
                type: "offline",
                status: null,
                message: "Aucune connexion Internet"
            };
        }

        // Network error
        throw {
            type: "network",
            status: null,
            message: "Erreur de connexion au serveur"
        };

    } finally {
        clearTimeout(timeout);
    }
}