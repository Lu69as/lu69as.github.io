if (localStorage.getItem("color") == "moon")
    document.body.classList.add("dark-mode");

if (window.location.href.includes("no|en"))
    document.body.classList.add("english");

document.querySelectorAll("nav .colorMode svg").forEach((e) => {
    e.addEventListener("click", () => { 
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("color", e.classList[0])
    })
})

document.querySelectorAll("nav .lang a").forEach((e) => {
    e.addEventListener("click", () => { setTimeout(() => { location.reload(); }, 50); })
})


for(let i = 0; i < 2; i++)
    document.querySelectorAll("#home .readmore span").forEach((e) => { e.parentElement.append(e.cloneNode(e, true)); })

for(let i = 0; i < document.querySelectorAll("#home .readmore span").length; i++)
    document.querySelectorAll("#home .readmore span")[i].style.transform = `rotate(${i * 11 + window.scrollY / 3}deg)`;

document.addEventListener("scroll", () => {
    for(let i = 0; i < document.querySelectorAll("#home .readmore span").length; i++)
        document.querySelectorAll("#home .readmore span")[i].style.transform = `rotate(${i * 11 + window.scrollY / 3}deg)`;
    
    document.querySelectorAll("section article").forEach((e) => {
        if (e.offsetTop - window.scrollY < 500) {
            document.querySelectorAll("nav a").forEach((a) => { a.classList.remove("active") });
            document.querySelector("nav a." + e.id).classList.add("active")
        }
    })
})
document.querySelector("nav a.home").classList.add("active");


document.querySelectorAll("#portfolio h1 div").forEach((e) => {
    e.addEventListener("click", () => {
        let items = document.querySelectorAll("#portfolio .container .item");
        let currentprop = getComputedStyle(items[0]).getPropertyValue("--itemPage");

        if (e.classList.toString().includes("next"))
            currentprop = currentprop >= items.length - getComputedStyle(items[0].parentElement)
                .getPropertyValue("--items-fit") ? 0 : currentprop - 0 + 1;

        else
            currentprop = currentprop < 1 ? items.length - getComputedStyle(items[0].parentElement)
                .getPropertyValue("--items-fit") : currentprop - 1;
        
        items.forEach((i) => i.style.setProperty("--itemPage", currentprop))
    })

    e.addEventListener("mouseenter", () => {
        e.classList.add("pastNextArrow");

        e.addEventListener("animationend", () => {
            e.classList.remove("pastNextArrow");
        })
    })
})

window.onresize = () => {
    document.querySelector("#portfolio .container").style.setProperty("--items-fit", 
        Math.floor(document.querySelector("#portfolio .container").offsetWidth / 335)
    )
}
document.querySelector("#portfolio .container").style.setProperty("--items-fit", 
    Math.floor((window.outerWidth - 300 - 35 * 8 - 335 * document.querySelector("#portfolio .container").style.getPropertyValue("--items-fit")) / 300)
)