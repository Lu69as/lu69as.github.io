// --------------------------------------------------------------------------------------- //
// Import everything from JSON file                                                       //
// ------------------------------------------------------------------------------------- //
{
    document.querySelector(".portfolioDesc").addEventListener("click", portfolioDescClick)
    function portfolioDescClick(e) {
        if (e.target.classList[0] == "portfolioDesc") {
            document.querySelector(".portfolioDesc").classList.remove("active");
            document.querySelector(".portfolioDesc .img").style.transition = "600ms";
            setTimeout(() => { document.querySelector(".portfolioDesc .img").style.transition = "none"; }, 600);
        }
    }

    function importData(item, type) {
        let gridItem = document.createElement("div");
        if (type == "hobby") {
            gridItem.classList.add("gridItem", "thinBorder");
            gridItem.innerHTML = `
                <h4>${ item.type }</h4>
                <div class="img" style="background-image: url(${ item.image })" title="${ item.link }"></div>
                <h2>${ item.name }</h2>
                <h5>${ item.rating }</h5>
                <p>${ item.description }</p>
                <a href="${ item.link }" target="_blank" rel="noreferrer">Gå til ${ item.name }</a>
            `;
            gridItem.querySelector(".img").addEventListener("click", () => gridItem.querySelector("a").click() );
        }
        else if (type == "portfolio") {
            gridItem.classList.add("item");
            gridItem.innerHTML = `
                <div class="back" style="background-image: url(${ item.image });"></div>
                <span>${ item.tools.split(",")[0] }</span>
                <span>${ item.tools.split(",")[1] }</span>
                
                <a href="${ item.link }" target="_blank" rel="noreferrer">Link</a>
                <p>${ item.description }</p>`;
            
            if (item.relevant) gridItem.innerHTML += `<img class="relevant" src="./img/portfolio/relevant.png">`;

            if (item.list.listItems.length > 0) {
                gridItem.innerHTML += `<br><p>${item.list.title}</p>`;
                let list = document.createElement("ul");
                item.list.listItems.forEach((e) => list.innerHTML += `<li>${e.desc}</li>` );
                gridItem.appendChild(list);
            };

            gridItem.addEventListener("click", () => {
                let portfolioDesc = document.querySelector(".portfolioDesc");
        
                portfolioDesc.firstElementChild.setAttribute("style", `
                    top: ${gridItem.firstElementChild.getBoundingClientRect().y}px;
                    left: ${gridItem.firstElementChild.getBoundingClientRect().x}px;
                    background-image: ${gridItem.firstElementChild.style.backgroundImage};
                    height: ${gridItem.firstElementChild.offsetHeight}px;
                `);
        
                portfolioDesc.lastElementChild.innerHTML = gridItem.innerHTML;
        
                setTimeout(() => {
                    portfolioDesc.classList.add("active")
                }, 20);
            })
        }
        else if (type == "button") {
            gridItem = document.createElement("button")
            gridItem.classList.add("btn1");
            gridItem.innerHTML = `<span>Se mer</span>`;
            gridItem.addEventListener("click", () => gridItem.parentElement.classList.add('showMore'));
            gridItem.setAttribute("title", "Se mer");
        }
        return gridItem;
    };

    fetch('./info.json')
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.media.length; i++)
                document.querySelector("#hobbies .hobbyGrid").appendChild(importData(json.media[i], "hobby"))
            document.querySelector("#hobbies .hobbyGrid").appendChild(importData("", "button"));
    
            for (let i = 0; i < json.portfolio.length; i++)
                document.querySelector("#portfolio .container").appendChild(importData(json.portfolio[i], "portfolio"))
            document.querySelector("#portfolio .container").appendChild(importData("", "button"));
    });
}


// --------------------------------------------------------------------------------------- //
// Check Language Javascript Code                                                         //
// ------------------------------------------------------------------------------------- //
{
    let checkLang = setInterval(() => {
        if (document.querySelector("#about > div > p").innerHTML[0, 1] == "f") {
            document.body.classList.add("english");
            clearInterval(checkLang);
        }
    }, 200);

    document.querySelectorAll("nav .lang a").forEach((e) => {
        e.addEventListener("click", () => { 
            document.cookie = "googtrans=/no/en; Domain=.lukasokken.com" + ";expires=" + new Date(0).toUTCString();
            document.cookie = document.cookie = "googtrans=/" + e.classList[0] + "/" 
                + (e.nextElementSibling || e.previousElementSibling).classList[0];
            location.reload(true);
        });
    });
}

// --------------------------------------------------------------------------------------- //
// Check Light / Dark mode Javascript Code                                                //
// ------------------------------------------------------------------------------------- //
{
    if (localStorage.getItem("color") == "moon")
        document.body.classList.add("dark-mode");
    
    document.querySelectorAll("nav .colorMode svg").forEach((e) => {
        e.addEventListener("click", () => { 
            if (e.classList[0] == "moon") {
                document.body.classList.add("dark-mode");
                localStorage.setItem("color", "moon");
            }
            else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("color", "sun");
            };
        });
    });
}



// --------------------------------------------------------------------------------------- //
// Make Items Appear When Visible After Scroll Code - Scroll animation                    //
// ------------------------------------------------------------------------------------- //
{
    function appearItem() {
        let list = document.querySelectorAll("article > h1, .item, .desc, .skills > div, #about > div > p :is(.btn1, .btn2), #resume table td");
        list.forEach((e) => {
            if (e.getBoundingClientRect().y < (window.innerHeight - 75)) {
                let index = Array.from(list).findIndex(elem => elem.innerHTML == e.innerHTML);
                let siblingCount = 0;
    
                for (let i = index; i > 0; i--)
                    if (list[i].getBoundingClientRect().y == e.getBoundingClientRect().y)
                        siblingCount++;
    
                setTimeout(() => {
                    e.style.transform = "translateY(0px)";
                    e.style.opacity = "1";
                }, siblingCount * 100);
            }
            else {
                e.style.transform = "translateY(35px)";
                e.style.opacity = "0";
            }
        })
    } 
    appearItem();
}

// --------------------------------------------------------------------------------------- //
// Read More Circle Home page Javascript Code - Scroll animation                          //
// ------------------------------------------------------------------------------------- //
{
    for(let i = 0; i < 2; i++)
        document.querySelectorAll("#home .readmore span").forEach((e) => { e.parentElement.append(e.cloneNode(e, true)); })
    
    for(let i = 0; i < document.querySelectorAll("#home .readmore span").length; i++)
        document.querySelectorAll("#home .readmore span")[i].style.transform = `rotate(${i * 11 + window.scrollY / 3}deg)`;
    
    function readmoreRotate() {
        for(let i = 0; i < document.querySelectorAll("#home .readmore span").length; i++)
            document.querySelectorAll("#home .readmore span")[i].style.transform = `rotate(${i * 11 + window.scrollY / 3}deg)`;
    }
}

// --------------------------------------------------------------------------------------- //
// Active Navbar Link Javascript Code - Scroll animation                                  //
// ------------------------------------------------------------------------------------- //
{
    document.querySelector("nav a.home").classList.add("active");

    function navbarItemActive() {
        document.querySelectorAll("section article").forEach((e) => {
            if (e.getBoundingClientRect().y < 500) {
                document.querySelectorAll("nav a").forEach((a) => { a.classList.remove("active") });
                document.querySelector("nav a." + e.id).classList.add("active")
            };
        });
    };
}

// --------------------------------------------------------------------------------------- //
// Removing all link changes to navbar links so href stays clean                          //
// ------------------------------------------------------------------------------------- //
{
    document.querySelectorAll("a[href^='#']").forEach((e) => {
        e.addEventListener("click", (evt) => {
            evt.preventDefault();
            let scrollItem = e.getAttribute("href");
            if (scrollItem == "#") scrollItem = "#home";
            document.querySelector(scrollItem).scrollIntoView({ block: "start" })
        })
    })
}

// --------------------------------------------------------------------------------------- //
// Calling All Scroll Animations When Scrolling                                           //
// ------------------------------------------------------------------------------------- //
{
    document.addEventListener("scroll", () => {
        setTimeout(appearItem, 400);
        appearItem();
    
        readmoreRotate();
    
        navbarItemActive();
    });
}



// --------------------------------------------------------------------------------------- //
// Portfolio Image Click Javascript Code                                                  //
// ------------------------------------------------------------------------------------- //
{
    
}



// --------------------------------------------------------------------------------------- //
// Recommendations Slider Javascript Code                                                 //
// ------------------------------------------------------------------------------------- //
{
    function handleRecommendationsMove() {
        let recommedations = document.querySelector(".recommendations");
        recommedations.style.marginLeft = recommedations.getAttribute("page") * -102.5 + "%";
        
        let btns = recommedations.previousElementSibling.querySelectorAll("div");
        btns.forEach((e) => e.style.opacity = "1")
    
        if (recommedations.getAttribute("page") == recommedations.childElementCount - 1)
            btns[1].style.opacity = ".7"
        else if (recommedations.getAttribute("page") == 0)
            btns[0].style.opacity = ".7"
    }
    
    document.querySelectorAll(".recommendations-btns > div").forEach((e) => {
        e.addEventListener("click", () => {
            let recommedations = document.querySelector(".recommendations");
            let page = recommedations.getAttribute("page");

            if (e.getAttribute("page") == "next" && page < recommedations.childElementCount - 1)
                recommedations.setAttribute("page", page - 0 + 1);
        
            else if (e.getAttribute("page") == "past" && page > 0)
                recommedations.setAttribute("page", page - 1);
        
            handleRecommendationsMove();
        })
    })
    
    let mousePos;
    function handleRecommendationsMouseMove() {
        let recommedations = document.querySelector(".recommendations");
        let page = recommedations.getAttribute("page");
    
        if (event.clientX - mousePos < -200 && page < recommedations.childElementCount - 1) {
            recommedations.setAttribute("page", page - 0 + 1);
            document.removeEventListener("mousemove", handleRecommendationsMouseMove, false);
            handleRecommendationsMove();
        }
        else if (event.clientX - mousePos > 200 && page > 0) {
            recommedations.setAttribute("page", page - 1);
            document.removeEventListener("mousemove", handleRecommendationsMouseMove, false);
            handleRecommendationsMove();
        };
    };
    
    document.querySelectorAll(".recommendations .slide").forEach((e) => {
        e.addEventListener("mousedown", () => {
            mousePos = event.clientX;
            document.addEventListener("mousemove", handleRecommendationsMouseMove, false);
            e.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", handleRecommendationsMouseMove, false);
            });
        });
    });
}



// --------------------------------------------------------------------------------------- //
// Contact Cancel button Javascript Code                                                  //
// ------------------------------------------------------------------------------------- //
{
    document.querySelector("#contact form button.cancel").addEventListener("click", () => {
        document.querySelectorAll("#contact form :is(input, textarea)").forEach((e) => {
            e.value = "";
        });
    });
}