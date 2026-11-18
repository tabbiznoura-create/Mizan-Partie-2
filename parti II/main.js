const buttons = document.querySelectorAll(".nav-button")
const pages = document.querySelectorAll(".page")

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