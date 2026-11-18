
const BASE_URL = "http://localhost:3000";



async function request(path, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(function () {
        controller.abort();
    }, 8000);

    try {
        const response = await fetch(BASE_URL + path, {
            ...options,
            headers: {
                "Content-Type": "application/json"
            },
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error("Erreur HTTP");
        }

        const data = await response.json();

        return data;

    } finally {
        clearTimeout(timeout);
    }
}



export async function getproduct() {
    try {
        const response = await fetch(`${BASE_URL}/articles`);
        const data = await response.json();

        const container = document.getElementById("products");   

        container.replaceChildren();

        data.forEach(pro => {
            const card = document.createElement("div");
            card.classList.add("product", "card");

            const image = document.createElement("img");
            image.src = pro.image;
            image.alt = pro.title;

            const title = document.createElement("h3");
            title.textContent = pro.title;

            const description = document.createElement("p");
            description.textContent = pro.description;

            const price = document.createElement("span");
            price.classList.add("price");
            price.textContent = `${pro.price} MAD`;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(price);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

getproduct();


