let slideIndex = 0;
// Slideshow setup
showSlides(slideIndex);

// Fungsi untuk beralih slide otomatis
setInterval(function() {
	plusSlides(1);
}, 7000); // Ubah slide setiap 7 detik

// Fungsi untuk menampilkan slide
function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("slide");
	let dots = document.getElementsByClassName("dot");
	
	if (n >= slides.length) {
		slideIndex = 0;
	} else if (n < 0) {
		slideIndex = slides.length - 1;
	} else {
		slideIndex = n;
	}
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex].style.display = "block";  
	dots[slideIndex].className += " active";
}

// Fungsi untuk mengontrol slide manual
function plusSlides(n) {
	showSlides(slideIndex + n);
}

function currentSlide(n) {
	showSlides(n - 1);
}
//special offer and top picks slide
// JavaScript to control special offers slider
let specialOfferIndex = 0;
const specialOfferSlides = document.querySelector('.special-offer-slider');

function plusSlides1(n) {
    showSlides1(specialOfferIndex += n);
}

function currentSlide1(n) {
    showSlides1(specialOfferIndex = n);
}

function showSlides1(n) {
    const slides = specialOfferSlides.querySelectorAll('.menu-cards');
    if (n >= slides.length) { specialOfferIndex = 0; }
    if (n < 0) { specialOfferIndex = slides.length - 1; }
    specialOfferSlides.scrollLeft = slides[specialOfferIndex].offsetLeft - specialOfferSlides.offsetLeft;
}

// JavaScript to control top picks slider
let topPicksIndex = 0;
const topPicksSlides = document.querySelector('.top-picks-slider');

function plusSlides2(n) {
    showSlides2(topPicksIndex += n);
}

function currentSlide2(n) {
    showSlides2(topPicksIndex = n);
}

function showSlides2(n) {
    const slides = topPicksSlides.querySelectorAll('.menu-cards');
    if (n >= slides.length) { topPicksIndex = 0; }
    if (n < 0) { topPicksIndex = slides.length - 1; }
    topPicksSlides.scrollLeft = slides[topPicksIndex].offsetLeft - topPicksSlides.offsetLeft;
}

// Initialize slideshows
showSlides1(specialOfferIndex);
showSlides2(topPicksIndex);

