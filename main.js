
let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector(".img-logo");

console.dir(logo);

window.addEventListener( "scroll", () =>{

    let scroll = window.scrollY;

    if(scroll > 0){
        navbar.classList.add("nav-scroll");

        logo.src = "http://127.0.0.1:5500/media/logo.w.png";
 

        links.forEach( (link)=> {
            link.style.color = "rgb(250,250,250)"

            link.addEventListener("mouseenter", ()=>{

                link.style.borderBottom = "4px solid white"
            } )

            link.addEventListener("mouseleave", ()=>{

                link.style.borderBottom = "transparent"
            } )

        })

    }else{
        navbar.classList.remove("nav-scroll")

        logo.src = "http://127.0.0.1:5500/media/logo.b.png";

        links.forEach( (link)=> {
            link.style.color = "rgb(26,26,26)"

            link.addEventListener("mouseenter", ()=>{

                link.style.borderBottom = "4px solid rgb(204,186,120)"
            } )

            link.addEventListener("mouseleave", ()=>{

                link.style.borderBottom = "transparent"
            } )

        })

    }

} )



let firstNumber = document.querySelector("#firstNumber");
console.log("firstNumber:", firstNumber);

let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");

function createInterval(number, element, timing) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < number) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, timing);
}

let confirm = false;


if (firstNumber && secondNumber && thirdNumber) {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && confirm === false) {
                createInterval(1000, firstNumber, 10);
                createInterval(2000, secondNumber, 5);
                createInterval(100, thirdNumber, 100);
                confirm = true;
            }
        });
    });

    observer.observe(firstNumber);

} else {
    
    console.warn("Elementi numerici non trovati. Observer non attivato.");
}
