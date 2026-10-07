// =============================
// SARAN PRESENTATION
// =============================

const slides = document.querySelectorAll(".slide");
const thumbs = document.querySelectorAll(".thumb");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progressBar = document.querySelector(".progress-bar");
const slideNumber = document.getElementById("slide-number");
const startBtn = document.querySelector(".start-btn");

let currentSlide = 0;

// =============================
// MENAMPILKAN SLIDE
// =============================

function showSlide(index){

    if(index < 0){
        index = slides.length - 1;
    }

    if(index >= slides.length){
        index = 0;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    thumbs.forEach(thumb => thumb.classList.remove("active"));

    slides[index].classList.add("active");
    thumbs[index].classList.add("active");

    currentSlide = index;

    if(slideNumber){
        slideNumber.innerHTML = `${currentSlide + 1} / ${slides.length}`;
    }

    if(progressBar){
        progressBar.style.width =
            ((currentSlide + 1) / slides.length) * 100 + "%";
    }

}

// =============================
// NEXT
// =============================

if(nextBtn){

    nextBtn.addEventListener("click", () => {

        showSlide(currentSlide + 1);

    });

}

// =============================
// PREVIOUS
// =============================

if(prevBtn){

    prevBtn.addEventListener("click", () => {

        showSlide(currentSlide - 1);

    });

}

// =============================
// THUMBNAIL
// =============================

thumbs.forEach((thumb,index)=>{

    thumb.addEventListener("click",()=>{

        showSlide(index);

    });

});

// =============================
// START BUTTON
// =============================

if(startBtn){

    startBtn.addEventListener("click",()=>{

        showSlide(1);

    });

}

// =============================
// KEYBOARD
// =============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        showSlide(currentSlide + 1);

    }

    if(e.key==="ArrowLeft"){

        showSlide(currentSlide - 1);

    }

});

// =============================
// FULLSCREEN
// =============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="f" || e.key==="F"){

        if(!document.fullscreenElement){

            document.documentElement.requestFullscreen();

        }else{

            document.exitFullscreen();

        }

    }

});

// =============================
// TOGGLE SIDEBAR
// =============================

const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const bottomBar = document.querySelector(".bottom-bar");

if(toggleBtn){

    toggleBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("hide");

        bottomBar.classList.toggle("full");

    });

}

// =============================
// INIT
// =============================

showSlide(0);