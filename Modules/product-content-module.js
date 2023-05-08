/* --------------------
| Product Conetnt section ↓ 
--------------------*/
export function uploadProductContent(productData) {
    //| Data vars ↓
    let productId = productData.id,
        productUrl = productData.url,
        productImages = productData.images,
        productName = productData.name,
        productSale = productData.sale,
        productPrice = productData.price,
        productOldPrice = productData.oldPrice,
        productTastes = productData.sepTastes;

    //| <2> Product preview subsection ↓
    let preview,
        tempStart = `<div class="product-intro__preview">`,
        tempSlider,
        tempThumb,
        tempEnd = `</div>`

    //todo: <3> Preview -→> Slider ↓
    let sliderStart = `
        <div class="product-intro__slider main-slider">
            <div class="main-slider__container swiper-container">
        `,
        sliderSlides,
        sliderEnd = `</div></div>`;

    // <4> Preview -→> Slider -→> Slides ↓
    let slidesStart = `<div class="main-slider__wrapper swiper-wrapper">`,
        slidesItems = ``,
        slidesEnd = `</div>`;

    productImages.forEach((i)=> {
        slidesItems += `
            <div class="main-slider__slide swiper-slide">
                <div class="main-slider__image"><img src="${i}" alt=""></div>
            </div>
        `;    
    });

    sliderSlides = slidesStart;
    sliderSlides += slidesItems;
    sliderSlides += slidesEnd;
    // <4> ----------------------------- ↑

    tempSlider = sliderStart;
    tempSlider += sliderSlides;
    tempSlider += sliderEnd;
    //todo: <3> ------------------ ↑

    //todo: <3> Preview -→> Thumb ↓
    let thumbStart = `
        <div class="product-intro__thumbs thumbs">
            <div class="thumbs__container swiper-container">
        `,
        thumbSlider,
        thumbEnd = `</div></div>`;

    // <4> Preview -→> Thumb -→> Slider ↓
    let thumbSliderStart = `<div class="thumbs__wrapper swiper-wrapper">`,
        thumbSliderSlides = ``,
        thumbSliderEnd = `</div>`;

    productImages.forEach((i)=> {
        thumbSliderSlides += `
            <div class="thumbs__slide swiper-slide">
                <div class="thumbs__image"><img src="${i}" alt=""></div>
            </div>
        `;    
    });

    thumbSlider = thumbSliderStart;
    thumbSlider += thumbSliderSlides;
    thumbSlider += thumbSliderEnd;
    // <4> ---------------------------- ↑

    tempThumb = thumbStart;
    tempThumb += thumbSlider;
    tempThumb += thumbEnd;
    //todo: <3> ----------------- ↑
    
    preview = tempStart;
    preview += tempSlider;
    preview += tempThumb;
    preview += tempEnd;
    //| <2> -------------------------- ↑ 


    //| <2> Product content subsection ↓
    let content = ``,
        tempContentStart = `<div class="product-intro__content content-product">`,
        tempContentInfo = ``,
        tempContentActions = ``,
        tempContentEnd = `</div>`;

    //todo: <3> Content -→> Info ↓
    let infoStart = `<div class="content-product__info">`,
        infoName = `<h3 class="content-product__name">${productName}</h3>`,
        infoPrices = ``,
        infoTastes = ``,
        infoEnd = `</div>`;

    // <4> Content -→> Info -→> Prices ↓
    let pricesStart = `<div class="content-product__prices">`,
        pricesMain = ``,
        priceMainClass,
        pricesOld = ``,
        priceOldClass,
        pricesEnd = `</div>`;
        
    if(productSale == true) {
        priceMainClass =  `content-product__price _sale`;
        priceOldClass =  `content-product__oldprice _sale`;
    }
    else {
        priceMainClass =  `content-product__price`;
        priceOldClass =  `content-product__oldprice`;
    }

    pricesMain = `<p class="${priceMainClass}">${productPrice} грн.</p>`;
    pricesOld = `<p class="${priceOldClass}">${productOldPrice} грн.</p>`;

    infoPrices += pricesStart;
    infoPrices += pricesMain;
    infoPrices += pricesOld;
    infoPrices += pricesEnd;
    // <4> --------------------------- ↑

    // <4> Content -→> Info -→> Tastes ↓
    let tastesStart = `<div class="content-product__tastes tastes-product">`,
        tastesLabel = `
            <div class="tastes-product__label">
                <p>Вкус:</p>
                <div class="tastes-product__arrows tastes-arrows">
                    <div class="tastes-arrows__prev _icon-common-arrow"></div>
                    <div class="tastes-arrows__next _icon-common-arrow"></div>
                </div>
            </div>
        `,
        tastesSlider = ``,
        tastesEnd = `</div>`;

    //* <5> Content -→> Info -→> Tastes -→> Slider ↓
    let tastesSliderStart = `
        <div class="tastes-product__container swiper-container">
            <div class="tastes-product__wrapper swiper-wrapper">
        `,        
        tastesSliderSlides = ``,
        tastesSliderEnd = `</div></div>`;

    productTastes.forEach((i)=> {
        let tatseTitle = i.name,
            tatseImage = i.image;

        tastesSliderSlides += `
        <div class="tastes-product__slide swiper-slide">
            <div class="tastes-product__image" data-tatse-name="${tatseTitle}">
                <img src="${tatseImage}" alt="">
            </div>
        </div>
        `;
    });

    tastesSlider += tastesSliderStart;
    tastesSlider += tastesSliderSlides;
    tastesSlider += tastesSliderEnd;
    //* <5> -------------------------------------- ↑

    infoTastes += tastesStart;
    infoTastes += tastesLabel;
    infoTastes += tastesSlider;
    infoTastes += tastesEnd;
    // <4> --------------------------- ↑
    
    tempContentInfo += infoStart;
    tempContentInfo += infoName;
    tempContentInfo += infoPrices;
    tempContentInfo += infoTastes;
    tempContentInfo += infoEnd;
    //todo: <3> ---------------- ↑

    //todo: <3> Content -→> Actions ↓
    tempContentActions = `
        <div class="content-product__actions">
            <div class="content-product__counter content-product-counter js-counter-slider" data-counter-number="0">
                <div class="content-product-counter__body">
                    <div class="content-product-counter__item content-product-counter__item_minus _icon-minus js-minus"></div>
                    <div class="content-product-counter__item content-product-counter__item_number js-number"></div>
                    <div class="content-product-counter__item content-product-counter__item_plus _icon-plus js-plus"></div>
                </div>
            </div>

            <div class="content-product__btns">
                <a href="" class="content-product__btn content-product__btn_add btn">
                    <p class="content-product__label btn__text">Добавить в корзину</p>
                    <div class="content-product__icon _icon-cart btn__icon"></div>
                </a>
            </div>
        </div>
    `;
    //todo: <3> ------------------- ↑

    content += tempContentStart; 
    content += tempContentInfo; 
    content += tempContentActions; 
    content += tempContentEnd; 
    //| <2> -------------------------- ↑ 

    //| <2> Uploading ↓ 
    let productParent = document.querySelector('.product-intro__container');
    productParent.insertAdjacentHTML("beforeend", preview);
    productParent.insertAdjacentHTML("beforeend", content);    
}