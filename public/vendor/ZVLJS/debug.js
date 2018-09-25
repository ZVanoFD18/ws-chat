'use strict';
ZVLJS.override(ZVLJS, {
    isDebug : true,
    debug(place, values) {
        console.log(place, values)
    }
});