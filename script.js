if (localStorage.getItem("color") == "moon")
    document.body.classList.add("dark-mode");

setTimeout(() => {
    if (window.location.href.includes("no|en") || document.querySelector("#about > p").innerHTML[0, 1] == "f")
        document.body.classList.add("english");
}, 1000);

document.querySelectorAll("nav .lang a").forEach((e) => {
    e.addEventListener("click", () => { setTimeout(() => { location.reload(); }, 50); })
})

document.querySelectorAll("nav .colorMode svg").forEach((e) => {
    e.addEventListener("click", () => { 
        if (e.classList[0] == "moon") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("color", "moon");
        }
        else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("color", "sun");
        }
    })
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