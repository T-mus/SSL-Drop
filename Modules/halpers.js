/* --------------------
| Halpers modules ↓ 
--------------------*/

export let arrayHelpers = {
    // Sort numbers Array ↓
    sortNumbers (array, type) {
        array.sort((a, b) => type == 1 ? a - b : b - a);
    },

    // Sort alphanumeric Array ↓
    sortAlphanumeric(array, type) {
        array.sort((a, b) => {
            let elm1 = a.match(/\d+/),
                elm2 = b.match(/\d+/);

            return type == 1 ? elm1 - elm2 : elm2 - elm1;
        });
    }
}