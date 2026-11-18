async function getproduct(){
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        // console.log(data)

        const container = document.getElementById("products")


        data.products.foreach(pro =>{

            const card = document.createElement("div");
            card.classList.add("product card")

            const title = document.createElement("h3")


            card.innerHTML = `
            <img src="${pro.image}" />
            <p>${pro.description}<p/>
            <span class="price">$${pro.price}</span>
            `

            container.appendChild(container)

        })

    }catch (error) {
        console.error("Error" , error)

    }
}

getproduct()
