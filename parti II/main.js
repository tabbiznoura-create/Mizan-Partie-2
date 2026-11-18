import { getproduct } from "./api.js";
const buttons = document.querySelectorAll(".nav-button")
const pages = document.querySelectorAll(".page")

const searchInput = document.getElementById("recherche");
const filterStatus = document.getElementById("filtre-statut");
const sortSelect = document.getElementById("tri");

let allProducts = [];

buttons.forEach(button => {

    button.addEventListener("click", function() {

        const pageId = button.dataset.page;

        pages.forEach(page => {
            page.classList.remove("active")
        })

        buttons.forEach(btn => {
            btn.classList.remove("active")
        })

        document.getElementById(pageId).classList.add("active")
        button.classList.add("active")
    })
})

function displayProducts(products) {

    const container = document.getElementById("products");

    container.replaceChildren();

    products.forEach(pro => {

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
}


function filterAndSortProducts() {

    // Copier tous les articles
    let products = [...allProducts];

    // 1. Recherche par titre
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue !== "") {
        products = products.filter(pro =>
            pro.title.toLowerCase().includes(searchValue)
        );
    }

    // 2. Filtre par statut
    const statusValue = filterStatus.value;

    if (statusValue !== "all") {
        products = products.filter(pro =>
            pro.status === statusValue
        );
    }

    // 3. Tri
    const sortValue = sortSelect.value;

    if (sortValue === "title") {
        products.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    else if (sortValue === "price") {
        products.sort((a, b) =>
            a.price - b.price
        );
    }

    else if (sortValue === "date") {
        products.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    // 4. Afficher les résultats
    displayProducts(products);
}

// Recherche
searchInput.addEventListener("input", filterAndSortProducts);

// Filtre
filterStatus.addEventListener("change", filterAndSortProducts);

// Tri
sortSelect.addEventListener("change", filterAndSortProducts);


async function init() {
    try {
        allProducts = await getproduct();

        displayProducts(allProducts);

    } catch (error) {
        console.error(error);
    }
}

init();