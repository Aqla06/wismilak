// =============================
// CANVA PRESENTATION
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

    // Batas slide
    if(index < 0){
        index = slides.length - 1;
    }

    if(index >= slides.length){
        index = 0;
    }

    // Hapus active
    slides.forEach(slide => slide.classList.remove("active"));
    thumbs.forEach(thumb => thumb.classList.remove("active"));

    // Tambah active
    slides[index].classList.add("active");
    thumbs[index].classList.add("active");

    currentSlide = index;

    // Update nomor slide
    slideNumber.innerHTML =
        `${currentSlide + 1} / ${slides.length}`;

    // Update progress
    const percent =
        ((currentSlide + 1) / slides.length) * 100;

    progressBar.style.width = percent + "%";

}

// =============================
// NEXT
// =============================

nextBtn.addEventListener("click", () => {

    showSlide(currentSlide + 1);

});

// =============================
// PREVIOUS
// =============================

prevBtn.addEventListener("click", () => {

    showSlide(currentSlide - 1);

});

// =============================
// THUMBNAIL
// =============================

thumbs.forEach((thumb,index)=>{

    thumb.addEventListener("click",()=>{

        showSlide(index);

    });

});

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
// MOUSE WHEEL
// =============================

/*
let wheelLock = false;

document.addEventListener("wheel",(e)=>{

    if(wheelLock) return;

    wheelLock = true;

    setTimeout(()=>{

        wheelLock = false;

    },400);

    if(e.deltaY>0){

        showSlide(currentSlide + 1);

    }else{

        showSlide(currentSlide - 1);

    }

});

*/

// =============================
// START BUTTON
// =============================

if(startBtn){

    startBtn.addEventListener("click",()=>{

        showSlide(1);

    });

}

// =============================
// FULLSCREEN (F)
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
// ESC INFO
// =============================

document.addEventListener("fullscreenchange",()=>{

    console.log("Fullscreen :",document.fullscreenElement);

});

// =============================
// AUTO PLAY (Opsional)
// =============================

// aktifkan jika ingin otomatis
/*
setInterval(()=>{

    showSlide(currentSlide+1);

},7000);
*/

// =============================
// INIT
// =============================

showSlide(0);

// =============================
// TOGGLE SIDEBAR
// =============================

// =============================
// TOGGLE SIDEBAR
// =============================

const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const bottomBar = document.querySelector(".bottom-bar");
const overlays = document.querySelectorAll(".overlay");

toggleBtn.addEventListener("click", () => {

    // Sembunyikan / tampilkan sidebar
    sidebar.classList.toggle("hide");

    // Buat bottom bar menjadi full width
    bottomBar.classList.toggle("full");

    // Geser overlay menjadi full width
    overlays.forEach(overlay => {
        overlay.classList.toggle("full");
    });

});


function perbesarGambar(gambar) {
     const modal = document.getElementById("modalGambar"); 
     const gambarBesar = document.getElementById("gambarBesar"); 
     
     gambarBesar.src = gambar.src; 
     gambarBesar.alt = gambar.alt; 
     modal.style.display = "flex"; 
} 
    
function tutupGambar() { 
    document.getElementById("modalGambar").style.display = "none";
}

/* Klik area hitam untuk menutup */ 
document.getElementById("modalGambar").addEventListener("click", function(e) { 
    if (e.target === this) {
         tutupGambar(); 
        } 
});

/* Tekan ESC untuk menutup */ 
document.addEventListener("keydown", function(e) { 
    if (e.key === "Escape") { 
        tutupGambar(); 
    } 
});