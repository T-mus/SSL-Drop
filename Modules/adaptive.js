export function dynamicAdaptive(currentParent, newParent, moveObject, places, viewportWidth) {
    let firstPositon = currentParent,
        lastPosition = newParent,
        moveItem = moveObject,
        positions = places,
        breakpoint = viewportWidth;

    //Todo: Прослуховуємо зміни розмірів екрана ↓
    window.addEventListener('resize', movingBlock);

    //Todo: Основна функція ↓
    function movingBlock() {
        let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewportWidth <= breakpoint) {
            if (!moveItem.classList.contains('done')) {
                lastPosition.insertBefore(moveItem, lastPosition.children[positions.end]);
                moveItem.classList.add('done');
            }
        }
        else {
            if (moveItem.classList.contains('done')) {
                firstPositon.insertBefore(moveItem, firstPositon.children[positions.start]);
                moveItem.classList.remove('done');
            }
        }
    }
    movingBlock();
}

/* export function dynamicAdaptive() {
    let firstPositon = document.querySelector('.parent-wrapper'),
        lastPosition = document.querySelector('.new-wrapper'),
        moveItem = document.querySelector('.move-item');

    //Todo: Прослуховуємо зміни розмірів екрана ↓
    window.addEventListener('resize', movingBlock);

    //Todo: Основна функція ↓
    function movingBlock() {
        let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewportWidth <= 768.8) {
            if (!moveItem.classList.contains('done')) {
                purpleParent.insertBefore(moveItem, purpleParent.children[1]);
                moveItem.classList.add('done');
            }
        }
        else {
            if (moveItem.classList.contains('done')) {
                pincParent.insertBefore(moveItem, pincParent.children[2]);
                moveItem.classList.remove('done');
            }
        }
    }
    movingBlock();
}
 */