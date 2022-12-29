var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });

  var swiper2 = new Swiper(".product-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 17,
    freeMode: true,
    navigation: {
  nextEl: ".product-swiper-button-next",
  prevEl: ".product-swiper-button-prev",
},
  });


document.querySelectorAll('.fa-heart').forEach((heart)=> {
  heart.addEventListener('click', (e)=>{
   e.target.classList.toggle('red-heart');
  })
})