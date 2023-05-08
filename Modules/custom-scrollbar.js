//> Beta module ↓
export function createCustomScrollbar(
    sliderArg,
    scrollbarArg,
    thumbArg,
    leftArrowArg,
    rightArrowArg
) {
    let slider = sliderArg,
        scrollbar = scrollbarArg,
        thumb = thumbArg,
        thumbWidth = null,
        thumbLeft = 0,
        leftArrow = leftArrowArg,
        rightArrow = rightArrowArg,
        maxScrollLeft = slider.scrollWidth - slider.offsetWidth,
        minScrollLeft = 0;

    thumbWidth = scrollbar.offsetWidth / slider.scrollWidth * scrollbar.offsetWidth;
    thumb.style.width = thumbWidth + 'px';

    slider.addEventListener('scroll', function () {
        thumbLeft = slider.scrollLeft / maxScrollLeft * 
            (scrollbar.offsetWidth - thumbWidth);
        thumb.style.left = thumbLeft + 'px';

        maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
        minScrollLeft = 0;
    });


    thumb.addEventListener('mousedown', (e) => {
        e.preventDefault();
        let startX = e.clientX,
            startLeft = thumb.offsetLeft;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(e) {
            let deltaX = e.clientX - startX;

            thumbLeft = Math.min(Math.max(startLeft + deltaX, 0),
                scrollbar.offsetWidth - thumbWidth);

            thumb.style.left = thumbLeft + 'px';
            slider.scrollLeft = thumbLeft / (scrollbar.offsetWidth - thumbWidth) *
                (slider.scrollWidth - slider.offsetWidth);
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });


    thumb.addEventListener('touchstart', function (e) {
        e.preventDefault();
        let startX = e.touches[0].clientX,
            startLeft = thumb.offsetLeft;

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);

        function onTouchMove(e) {
            let deltaX = e.touches[0].clientX - startX;

            thumbLeft = Math.min(Math.max(startLeft + deltaX, 0), scrollbar.offsetWidth - thumbWidth);

            thumb.style.left = thumbLeft + 'px';

            slider.scrollLeft = thumbLeft / (scrollbar.offsetWidth - thumbWidth)
                * (slider.scrollWidth - slider.offsetWidth);
        }

        function onTouchEnd() {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
    });


    leftArrow.addEventListener('click', function () {
        if (slider.scrollLeft > minScrollLeft) {
            slider.scrollBy({
                left: -20,
                behavior: 'smooth'
            });
            thumbLeft -= 20 / maxScrollLeft * (scrollbar.offsetWidth - thumbWidth);
            thumb.style.left = thumbLeft + 'px';
            console.log('working');
        }
    });

    rightArrow.addEventListener('click', function () {
        if (slider.scrollLeft < maxScrollLeft) {
            slider.scrollBy({
                left: 20,
                behavior: 'smooth'
            });
            thumbLeft += 20 / maxScrollLeft * (scrollbar.offsetWidth - thumbWidth);
            thumb.style.left = thumbLeft + 'px';
        }
    });

    slider.addEventListener("wheel", (e) => {
        e.preventDefault();

        slider.scrollLeft += e.deltaY;
    });
}