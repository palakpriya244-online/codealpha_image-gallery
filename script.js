/* ==========================================
   AURORA GALLERY PRO
   PART 1
========================================== */

// Loader

window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader-wrapper");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

// Elements

const galleryItems =
document.querySelectorAll(".gallery-item");

const filterButtons =
document.querySelectorAll(".filter-btn");

const searchInput =
document.getElementById("searchInput");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const closeBtn =
document.querySelector(".close-btn");

const prevBtn =
document.querySelector(".prev-btn");

const nextBtn =
document.querySelector(".next-btn");

const currentImageText =
document.getElementById("currentImage");

const totalImagesText =
document.getElementById("totalImages");

let currentIndex = 0;

let images = [];

// Build image array

galleryItems.forEach((item,index)=>{

    const img =
    item.querySelector("img");

    images.push({

        src: img.src,

        title:
        item.dataset.title,

        element:item

    });

});

// Total Images

if(totalImagesText){

    totalImagesText.textContent =
    images.length;

}

/* ==========================================
   FILTERS
========================================== */

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category =
        button.dataset.filter;

        galleryItems.forEach(item=>{

            if(

                category === "all"

                ||

                item.classList.contains(category)

            ){

                item.style.display =
                "block";

            }

            else{

                item.style.display =
                "none";

            }

        });

    });

});

/* ==========================================
   SEARCH
========================================== */

if(searchInput){

searchInput.addEventListener(

"keyup",

()=>{

const value =
searchInput.value.toLowerCase();

galleryItems.forEach(item=>{

const title =
item.dataset.title
.toLowerCase();

if(

title.includes(value)

){

item.style.display =
"block";

}

else{

item.style.display =
"none";

}

});

});

}
/* ==========================================
   LIGHTBOX OPEN
========================================== */

const viewButtons =
document.querySelectorAll(".view-btn");

viewButtons.forEach((button,index)=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        openLightbox(index);

    });

});

galleryItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        openLightbox(index);

    });

});

function openLightbox(index){

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow =
    "hidden";

}

/* ==========================================
   UPDATE LIGHTBOX
========================================== */

function updateLightbox(){

    lightboxImage.src =

    images[currentIndex].src;

    lightboxImage.alt =

    images[currentIndex].title;

    if(currentImageText){

        currentImageText.textContent =

        currentIndex + 1;

    }

}

/* ==========================================
   NEXT IMAGE
========================================== */

function nextImage(){

    currentIndex++;

    if(

        currentIndex >= images.length

    ){

        currentIndex = 0;

    }

    updateLightbox();

}

/* ==========================================
   PREVIOUS IMAGE
========================================== */

function prevImage(){

    currentIndex--;

    if(

        currentIndex < 0

    ){

        currentIndex =

        images.length - 1;

    }

    updateLightbox();

}

/* ==========================================
   BUTTON EVENTS
========================================== */

if(nextBtn){

    nextBtn.addEventListener(

    "click",

    nextImage

    );

}

if(prevBtn){

    prevBtn.addEventListener(

    "click",

    prevImage

    );

}

/* ==========================================
   CLOSE LIGHTBOX
========================================== */

function closeLightbox(){

    lightbox.classList.remove(

    "show"

    );

    document.body.style.overflow =

    "auto";

}

if(closeBtn){

    closeBtn.addEventListener(

    "click",

    closeLightbox

    );

}

/* ==========================================
   CLICK OUTSIDE TO CLOSE
========================================== */

lightbox.addEventListener(

"click",

(e)=>{

if(

e.target === lightbox

){

closeLightbox();

}

});

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(

"keydown",

(e)=>{

if(

!lightbox.classList.contains(

"show"

)

) return;

if(

e.key === "ArrowRight"

){

nextImage();

}

if(

e.key === "ArrowLeft"

){

prevImage();

}

if(

e.key === "Escape"

){

closeLightbox();

}

});
/* ==========================================
   FAVORITES SYSTEM
========================================== */

const favoriteButtons =
document.querySelectorAll(".fav-btn");

const favoriteContainer =
document.getElementById(
"favoriteContainer"
);

let favorites =

JSON.parse(

localStorage.getItem(
"favorites"
)

) || [];

/* ==========================================
   SAVE FAVORITES
========================================== */

function saveFavorites(){

localStorage.setItem(

"favorites",

JSON.stringify(
favorites
)

);

}

/* ==========================================
   RENDER FAVORITES
========================================== */

function renderFavorites(){

if(!favoriteContainer) return;

favoriteContainer.innerHTML = "";

if(favorites.length === 0){

favoriteContainer.innerHTML = `

<div class="favorite-empty">

No Favorite Images Yet ❤️

</div>

`;

return;

}

favorites.forEach(item=>{

const card =

document.createElement("div");

card.className =

"favorite-card";

card.innerHTML = `

<img src="${item.src}">

<h4>${item.title}</h4>

`;

favoriteContainer.appendChild(
card
);

});

}

/* ==========================================
   ADD FAVORITE
========================================== */

favoriteButtons.forEach(

(button,index)=>{

button.addEventListener(

"click",

(e)=>{

e.stopPropagation();

const imageData = {

src:

images[index].src,

title:

images[index].title

};

const exists =

favorites.some(

fav=>fav.src===imageData.src

);

if(exists){

favorites =

favorites.filter(

fav=>fav.src !== imageData.src

);

button.classList.remove(
"active"
);

}

else{

favorites.push(
imageData
);

button.classList.add(
"active"
);

}

saveFavorites();

renderFavorites();

});

});

/* ==========================================
   LOAD FAVORITES
========================================== */

renderFavorites();

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const backButton =

document.createElement(
"button"
);

backButton.className =
"backToTop";

backButton.innerHTML =

'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(
backButton
);

window.addEventListener(

"scroll",

()=>{

if(

window.scrollY > 500

){

backButton.classList.add(
"show"
);

}

else{

backButton.classList.remove(
"show"
);

}

}

);

backButton.addEventListener(

"click",

()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

);

/* ==========================================
   SCROLL ANIMATION
========================================== */

const observer =

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(

entry.isIntersecting

){

entry.target.classList.add(

"animate-scale"

);

}

});

},

{

threshold:0.1

}

);

galleryItems.forEach(item=>{

observer.observe(item);

});

/* ==========================================
   PARTICLES
========================================== */

const particles =

document.querySelectorAll(
".particle"
);

particles.forEach(

(p,index)=>{

p.style.left =

Math.random()*100 + "%";

p.style.animationDelay =

(index*2)+"s";

}

);

/* ==========================================
   TOUCH SWIPE SUPPORT
========================================== */

let touchStartX = 0;

let touchEndX = 0;

lightbox.addEventListener(

"touchstart",

(e)=>{

touchStartX =

e.changedTouches[0].screenX;

}

);

lightbox.addEventListener(

"touchend",

(e)=>{

touchEndX =

e.changedTouches[0].screenX;

handleSwipe();

}

);

function handleSwipe(){

if(

touchEndX <

touchStartX - 50

){

nextImage();

}

if(

touchEndX >

touchStartX + 50

){

prevImage();

}

}

/* ==========================================
   AUTO SLIDESHOW
========================================== */

let slideshow = null;

function startSlideshow(){

slideshow = setInterval(()=>{

if(

lightbox.classList.contains(
"show"
)

){

nextImage();

}

},4000);

}

startSlideshow();

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(

"🚀 Aurora Gallery Loaded Successfully"

);