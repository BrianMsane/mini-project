new Swiper('.card-wrapper',{
    loop: true,
    spaceBetween:  30,

    pagination: {
        el:'.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    navigation:{
        nextE1: '.swiper-button-next',
        prevE1: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});