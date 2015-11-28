/* jshint node: true */

exports = module.exports = {

    // tms style -> web-mercator style
    fromTMS: function(coords) {
        var z = coords[0],
            x = coords[1],
            y = coords[2];
        var adjustedY = (1 << z) - y - 1;
        return [z, x, adjustedY];
    },

    // web-mercator style -> tms style
    toTMS: function(coords) {
        return fromTMS(coords);
    },

    // baidu style -> web-mercator style
    fromBAIDU: function(coords) {
        var z = coords[0],
            x = coords[1],
            y = coords[2];
        var adjustedX = x + (1 << (z - 1));
        var adjustedY = (1 << (z - 1)) - y - 1;
        return [z, adjustedX, adjustedY];
    },

    // web-mercator style -> baidu style
    toBAIDU: function(coords) {
        var z = coords[0],
            x = coords[1],
            y = coords[2];
        var adjustedX = x - (1 << (z - 1));
        var adjustedY = (1 << (z - 1)) - y - 1;
        return [z, adjustedX, adjustedY];
    }

};
