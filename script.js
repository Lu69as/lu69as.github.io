let page = window.location.href;



// --------------------------------------------------------------------------------------- //
// Import all info from json file                                                         //
// ------------------------------------------------------------------------------------- //
{
    fetch('/src/info.json')
        .then((response) => response.json())
        .then((json) => {
            if (page.includes("hobbyer")) {
                document.querySelector(".game").innerHTML = `
                    <div>${ json.media.game.iframe }</div>
                    <div>
                        <h2>Mitt favorittspill</h2>
                        <h3>${ json.media.game.name } - Spilletid: ${ json.media.game.playtime } Timer</h3>
                        <p>${ json.media.game.description }</p>
                        <a href="${ json.media.game.link }" target="_blank" rel="noreferrer">Gå til ${ json.media.game.name }</a>
                    </div>
                `;
                document.querySelector(".series").innerHTML = `
                    <div>${ json.media.series.iframe }</div>
                    <div>
                        <h2>Min favorittserie</h2>
                        <h3>${ json.media.series.name } - ${ json.media.series.rating }</h3>
                        <p>${ json.media.series.description }</p>
                        <a href="${ json.media.series.link }" target="_blank" rel="noreferrer">Gå til ${ json.media.series.name }</a>
                    </div>
                `;
                document.querySelector(".song").innerHTML = `
                    <h2>Min favorittsang</h2>
                    ${ json.media.song }
                `;
                document.querySelector(".movie").innerHTML = `
                    <div>${ json.media.movie.iframe }</div>
                    <div>
                        <h2>Min favorittfilm</h2>
                        <h3>${ json.media.movie.name } - ${ json.media.movie.rating }</h3>
                        <p>${ json.media.movie.description }</p>
                        <a href="${ json.media.movie.link }" target="_blank" rel="noreferrer">Gå til ${ json.media.movie.name }</a>
                    </div>
                `;
                document.querySelector(".sport").innerHTML = `
                    <div>${ json.media.sport.iframe }</div>
                    <div>
                        <h2>Min favorittsport</h2>
                        <h3>${ json.media.sport.name } - ${ json.media.sport.driver }</h3>
                        <p>${ json.media.sport.description }</p>
                        <a href="${ json.media.sport.link }" target="_blank" rel="noreferrer">Gå til ${ json.media.sport.name }</a>
                    </div>
                `;
            }
    
            else if (page.includes("portefolje")) {
                json.portfolio.forEach((e) => {
                    let gridItem = document.createElement("div");
                    gridItem.classList.add("item");
                    gridItem.innerHTML = `
                        <div class="back" style="background-image: url(${ e.image });"></div>
                        <span>${ e.tools.split(",")[0] }</span>
                        <span>${ e.tools.split(",")[1] }</span>
                        
                        <a href="${ e.link }" target="_blank" rel="noreferrer">Link</a>
                        <p>${ e.description }</p>`;
                    
                    if (e.relevant) gridItem.innerHTML += `<img class="relevant" src="/img/portfolio/relevant.png">`;
    
                    gridItem.addEventListener("click", () => {
                        let portfolioDesc = document.querySelector(".portfolioDesc");

                        if (portfolioDesc.getBoundingClientRect().bottom < 0)
                            portfolioDesc.scrollIntoView();
    
                        portfolioDesc.querySelector("img").style.transform = "translateX(-20px)";
                        portfolioDesc.querySelector("img").style.opacity = "0";
                        portfolioDesc.lastElementChild.style.paddingTop = "50px";
                
                        portfolioDesc.querySelector("img").addEventListener("transitionend", () => {
                            portfolioDesc.querySelector("img").setAttribute("src", e.image);
                            portfolioDesc.querySelector("img").style.transform = "translateX(0px)";
                            portfolioDesc.querySelector("img").style.opacity = "1";
    
                            portfolioDesc.lastElementChild.style.paddingTop = "25px";
                            portfolioDesc.lastElementChild.innerHTML = gridItem.innerHTML;
                        });
                    })
                    document.querySelector("#portfolio .container").appendChild(gridItem);
                })
                document.querySelector("#portfolio .container").firstElementChild.click();
            }
    
            else if (page.includes("cv")) {
                json.tools.forEach((e) => {
                    let gridItem = document.createElement("div");
                    gridItem.innerHTML = `
                        <div class="border"></div>
                        <img src="/img/svg-icons/${e.icon}.svg">
                        <h3 class="scroll-count-item" alt="${e.skill}">0</h3>
                        <h4>${e.name}</h4>
                    `
                    document.querySelector(".tools").appendChild(gridItem)
                })
                json.languages.forEach((e) => {
                    let gridItem = document.createElement("div");
                    gridItem.innerHTML = `
                        <div class="border"></div>
                        <img src="/img/svg-icons/${e.icon}.svg">
                        <h3 class="scroll-count-item" alt="${e.skill}">0</h3>
                        <h4>${e.name}</h4>
                    `
                    document.querySelector(".languages").appendChild(gridItem)
                })
            }
    });
}



window.onerror = function (msg, url, line) {
    console.log("Error: " + msg + "<br>");
    console.log("URL: " + url + "<br>");
    console.log("Line: " + line + "<br>");
}


// --------------------------------------------------------------------------------------- //
// Import navbar and footer from files and create link hover effect                       //
// ------------------------------------------------------------------------------------- //
{
    fetch('/src/navbar.html')
      .then(response => { return response.text() })
      .then(html => document.querySelectorAll("nav").forEach((e) => {
        e.innerHTML = html;
        fetch('/src/footer.html')
          .then(response => { return response.text() })
          .then(html => document.querySelectorAll("footer").forEach((e) => {
            e.innerHTML = html;
    
            document.querySelectorAll("a:not(.btn1, .btn2, .readmore, .backTop, .some a)").forEach((e) => e.addEventListener("mouseleave", () => {
                e.style.setProperty('--beforeLeft', 'initial');
                e.addEventListener("transitionend", () => e.style.setProperty('--beforeLeft', '0'), { once: true })
            }));

            document.querySelectorAll("footer .some a").forEach((e) => e.addEventListener("mouseenter", (evt) => {
                if (evt.layerX > e.offsetWidth / 2)
                    e.style.transform = "scale(1.05) rotate(5deg)";
                else
                    e.style.transform = "scale(1.05) rotate(-5deg)";

                e.addEventListener("mouseleave", () => e.style.transform = "scale(1) rotate(0deg)", { once: true })
            }));
        }));
    }));
}


// --------------------------------------------------------------------------------------- //
// Import posts from html into blog page                                                  //
// ------------------------------------------------------------------------------------- //
{
    if (page.includes("aktuelt")) {
        fetch('/aktuelt/posts.html')
            .then(response => { return response.text() })
            .then(html => {
                let articles = document.createElement("body");
                articles.innerHTML = html;

                articles.childNodes.forEach((e) => {
                    if (e.innerHTML == undefined) return;
                    let article = document.createElement("div");
                    article.innerHTML = e.innerHTML;

                    article.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
                        let paper = document.querySelector(".paper")
                        paper.classList.add("open");
                        paper.innerHTML = article.innerHTML;
                        paper.querySelectorAll("h2 a, a:has(img)").forEach((ap) => ap.outerHTML = ap.innerHTML);

                        document.addEventListener("click", (evt) => {
                            if (evt.target.id == "blog" || evt.target.classList[0] == "close") paper.classList.remove("open");
                        });
                        paper.innerHTML += '<div class="close"></div>';
                    }))

                    document.querySelector(".container").appendChild(article)
                })
            });
    }
}



// --------------------------------------------------------------------------------------- //
// Make Items Appear When Visible After Scroll Code - Scroll animation                    //
// ------------------------------------------------------------------------------------- //
{
    function appearItem() {
        let list = document.querySelectorAll(".scroll-appear-item");
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
        });
    } 
    appearItem();
}



// --------------------------------------------------------------------------------------- //
// Make Items with numbers wount upwards when Visible After Scroll Code - Scroll animation//
// ------------------------------------------------------------------------------------- //
{
    function countItem() {
        let list = document.querySelectorAll(".scroll-count-item");
        list.forEach((e) => {
            if (e.getBoundingClientRect().y < window.innerHeight && e.innerHTML < 1) {
                console.log(e.getBoundingClientRect().y + " / " + window.innerHeight + " + " + e.innerHTML)
                for (let i = 0; i < e.getAttribute("alt"); i++)
                    setTimeout(() => e.innerHTML = e.innerHTML - 0 + 1, i * 10);
            }
            else if (e.getBoundingClientRect().y > window.innerHeight) e.innerHTML = 0;
        });
    } 
    countItem();
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
// Calling All Scroll Animations When Scrolling                                           //
// ------------------------------------------------------------------------------------- //
{
    document.querySelector(".backTop").addEventListener("click", () => window.scrollTo(0, 0));

    document.addEventListener("scroll", () => {
        setTimeout(appearItem, 400);
        appearItem();
        countItem();
    
        readmoreRotate();

        if (scrollY > 200)
            document.querySelector(".backTop").style.transform = "translateX(0px)";
        else
            document.querySelector(".backTop").style.transform = "translateX(100px)";
    });
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
// Contact buttons and Globe code from amcharts                                           //
// ------------------------------------------------------------------------------------- //
{
    if (window.location.href.includes("kontakt")) {
        document.querySelector("#contact form button.cancel").addEventListener("click", () => {
            document.querySelectorAll("#contact form :is(input, textarea)").forEach((e) => {
                e.value = "";
            });
        });

        document.querySelectorAll(".reason > div").forEach((e) => {
            e.addEventListener("click", () => {
                document.querySelectorAll(".reason > div").forEach((a) => a.classList.remove("active"));
                e.classList.add("active");
                document.querySelector(".window form .hidden-field-emne").value
                    = e.firstElementChild.lastElementChild.innerHTML;
            });
        })
    
        /**
         * ---------------------------------------
         * This demo was created using amCharts 4.
         * 
         * For more information visit:
         * https://www.amcharts.com/
         * 
         * Documentation is available at:
         * https://www.amcharts.com/docs/v4/
         * ---------------------------------------
        */
    
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
    
        var chart = am4core.create("chartdiv", am4maps.MapChart);
    
        // Set map definition
        chart.geodata = am4geodata_worldLow;
    
        // Set projection
        chart.projection = new am4maps.projections.Orthographic();
        chart.panBehavior = "rotateLongLat";
        chart.maxZoomLevel = 1;
        chart.deltaLatitude = -30;
        chart.padding(0);
    
        chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
        chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
    
        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    
        polygonSeries.useGeodata = true;
    
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#222");
        polygonTemplate.stroke = am4core.color("#7A7E85");
        polygonTemplate.strokeWidth = .2;
        polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    
        var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
        graticuleSeries.mapLines.template.line.stroke = am4core.color("#222");
        graticuleSeries.mapLines.template.line.strokeOpacity = 0.1;
        graticuleSeries.fitExtent = false;
    
        let animation;
        setTimeout(function(){
        animation = chart.animate({property:"deltaLongitude", to:100000}, 20000000);
        }, 0)
    
        let animationTimeOut;
        chart.events.on("down", function() {
            // Stop the animation when the user starts interacting with the map
            if (animation) {
                animation.stop();
            }
            clearInterval(animationTimeOut);
        });
        chart.events.on("up", function() {
            animationTimeOut = setTimeout(function(){
                animation = chart.animate({property:"deltaLongitude", to:100000}, 20000000);
            }, 500)
        });
    
        let color = window.getComputedStyle(document.querySelector("body")).getPropertyValue('--secondary');
    
        polygonSeries.data = [{
                "id": "NO",
                "fill": am4core.color(color)
            }, {
                "id": "SE",
                "fill": am4core.color(color)
            }, {
                "id": "DK",
                "fill": am4core.color(color)
            }, {
                "id": "DE",
                "fill": am4core.color(color)
            }, {
                "id": "NL",
                "fill": am4core.color(color)
            }, {
                "id": "BE",
                "fill": am4core.color(color)
            }, {
                "id": "LU",
                "fill": am4core.color(color)
            }, {
                "id": "FR",
                "fill": am4core.color(color)
            }, {
                "id": "GB",
                "fill": am4core.color(color)
            }, {
                "id": "BG",
                "fill": am4core.color(color)
            }, {
                "id": "HR",
                "fill": am4core.color(color)
            }, {
                "id": "SJ",
                "fill": am4core.color(color)
            }, {
                "id": "US",
                "fill": am4core.color(color)
            }, {
                "id": "LT",
                "fill": am4core.color(color)
            }
        ];
    
        // Bind "fill" property to "fill" key in data
        polygonTemplate.propertyFields.fill = "fill";
    }
}