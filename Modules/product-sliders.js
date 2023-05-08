/* --------------------
| Sliders ↓ 
--------------------*/
export function productSliders() {
        
    //@  Main slider ↓
    if (document.querySelector('.main-slider__container')) {
        let mainSlider = new Swiper('.main-slider__container', {
            slidesPerView: 1,
            watchOverflow: true,
            speed: 600,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,

            //| Dots
            thumbs: {

                swiper: {
                    el: '.thumbs__container',
                    slidesPerView: 3, 
                    spaceBetween: 30,
                
                    breakpoints: {
                        320: {
                            spaceBetween: 20,
                        },
                        480: {

                        }
                    }
                }
            },

            breakpoints: {
                320: {
                    spaceBetween: 30,
                },
                480: {

                }
            }
        });
    }

    //@  Tastes slider ↓
    if (document.querySelector('.tastes-product__container')) {
        let tastesSlider = new Swiper('.tastes-product__container', {
            slidesPerView: 5,
            watchOverflow: true,
            spaceBetween: 30,
            speed: 400,
            loopAdditionalSlides: 5,
            preloadImages: false,

            //| Arrows ↓
            navigation: {
                prevEl: '.content-product__tastes .tastes-arrows__prev',
                nextEl: '.content-product__tastes .tastes-arrows__next',
            },

            //| Breakpoints ↓
            breakpoints: {
                320: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                375: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },

                480: {
                    slidesPerView: 5,
                },

                768.8: {
                    slidesPerView: 3.5,
                },

                790: {
                    slidesPerView: 4,
                },

                910: {
                    slidesPerView: 5,
                }
            }
        });
    }
}