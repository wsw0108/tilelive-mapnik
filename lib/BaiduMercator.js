var BaiduMercator = (function() {

    var EARTHRADIUS = 6370996.81,
        MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        LLBAND = [75, 60, 45, 30, 15, 0],
        MC2LL = [
            [1.410526172116255e-8, 0.00000898305509648872,
             -1.9939833816331, 200.9824383106796,
             -187.2403703815547, 91.6087516669843,
             -23.38765649603339, 2.57121317296198,
             -0.03801003308653, 17337981.2],
            [-7.435856389565537e-9, 0.000008983055097726239,
             -0.78625201886289, 96.32687599759846,
             -1.85204757529826, -59.36935905485877,
             47.40033549296737, -16.50741931063887,
             2.28786674699375, 10260144.86],
            [-3.030883460898826e-8, 0.00000898305509983578,
             0.30071316287616, 59.74293618442277,
             7.357984074871, -25.38371002664745,
             13.45380521110908, -3.29883767235584,
             0.32710905363475, 6856817.37],
            [-1.981981304930552e-8, 0.000008983055099779535,
             0.03278182852591, 40.31678527705744,
             0.65659298677277, -4.44255534477492,
             0.85341911805263, 0.12923347998204,
             -0.04625736007561, 4482777.06],
            [3.09191371068437e-9, 0.000008983055096812155,
             0.00006995724062, 23.10934304144901,
             -0.00023663490511, -0.6321817810242,
             -0.00663494467273, 0.03430082397953,
             -0.00466043876332, 2555164.4],
            [2.890871144776878e-9, 0.000008983055095805407,
             -3.068298e-8, 7.47137025468032,
             -0.00000353937994, -0.02145144861037,
             -0.00001234426596, 0.00010322952773,
             -0.00000323890364, 826088.5]],
        LL2MC = [
            [-0.0015702102444, 111320.7020616939,
             1704480524535203, -10338987376042340,
             26112667856603880, -35149669176653700,
             26595700718403920, -10725012454188240,
             1800819912950474, 82.5],
            [0.0008277824516172526, 111320.7020463578,
             647795574.6671607, -4082003173.641316,
             10774905663.51142, -15171875531.51559,
             12053065338.62167, -5124939663.577472,
             913311935.9512032, 67.5],
            [0.00337398766765, 111320.7020202162,
             4481351.045890365, -23393751.19931662,
             79682215.47186455, -115964993.2797253,
             97236711.15602145, -43661946.33752821,
             8477230.501135234, 52.5],
            [0.00220636496208, 111320.7020209128,
             51751.86112841131, 3796837.749470245,
             992013.7397791013, -1221952.21711287,
             1340652.697009075, -620943.6990984312,
             144416.9293806241, 37.5],
            [-0.0003441963504368392, 111320.7020576856,
             278.2353980772752, 2485758.690035394,
             6070.750963243378, 54821.18345352118,
             9540.606633304236, -2710.55326746645,
             1405.483844121726, 22.5],
            [-0.0003218135878613132, 111320.7020701615,
             0.00369383431289, 823725.6402795718,
             0.46104986909093, 2351.343141331292,
             1.58060784298199, 8.77738589078284,
             0.37238884252424, 7.45]
        ],
        MAXEXTENT = 33554432;

    function convertMC2LL(xy) {
        var i, len, table;
        var y_abs = Math.abs(xy[1]);
        for (i = 0, len = MCBAND.length; i < len; i++) {
            if (y_abs >= MCBAND[i]) {
                table = MC2LL[i];
                break;
            }
        }
        var ll = convertor(xy, table);
        var lng = getRange(ll[0], -180.0, 180.0),
            lat = getRange(ll[1], -74.0, 74.0);
        lng = parseFloat(lng.toFixed(6));
        lat = parseFloat(lat.toFixed(6));
        return [lng, lat];
    }

    function convertLL2MC(ll) {
        var i, len, table;
        ll[0] = getLoop(ll[0], -180.0, 180.0);
        ll[1] = getRange(ll[1], -74.0, 74.0);
        var lat = ll[1];
        for (i = 0, len = LLBAND.length; i < len; i++) {
            if (lat >= LLBAND[i]) {
                table = LL2MC[i];
                break;
            }
        }
        if (!table) {
            for (i = LLBAND.length - 1; i >= 0; i--) {
                if (lat <= -LLBAND[i]) {
                    table = LL2MC[i];
                    break;
                }
            }
        }
        var xy = convertor(ll, table);
        var x = parseFloat(xy[0].toFixed(2)),
            y = parseFloat(xy[1].toFixed(2));
        return [x, y];
    }

    function convertor(ll_or_xy, table) {
        var lng_or_x = ll_or_xy[0],
            lat_or_y = ll_or_xy[1];
        var x_or_lng = table[0] + table[1] * Math.abs(lng_or_x);
        var d = Math.abs(lat_or_y) / table[9];
        var y_or_lat = table[2] + table[3] * d + table[4] * d * d +
                table[5] * d * d * d + table[6] * d * d * d * d +
                table[7] * d * d * d * d * d +
                table[8] * d * d * d * d * d * d;
        x_or_lng *= (lng_or_x < 0.0 ? -1 : 1);
        y_or_lat *= (lat_or_y < 0.0 ? -1 : 1);
        return [x_or_lng, y_or_lat];
    }

    function getRange(v, min, max) {
        v = Math.max(v, min);
        v = Math.min(v, max);
        return v;
    }

    function getLoop(v, min, max) {
        var d = max - min;
        while (v > max) {
            v -= d;
        }
        while (v < min) {
            v += d;
        }
        return v;
    }

    // BaiduMercator constructor: precaches calculations
    // for fast tile lookups.
    function BaiduMercator(options) {
        options = options || {};
        this.size = options.size || 256;
    }

    // Convert lon lat to screen pixel value
    //
    // - `ll` {Array} `[lon, lat]` array of geographic coordinates.
    // - `zoom` {Number} zoom level.
    BaiduMercator.prototype.px = function(ll, zoom) {
        var xy = convertLL2MC(ll);
        var s = Math.pow(2, 18 - zoom);
        var x = xy[0] / s;
        var y = xy[1] / s;
        return [x, y];
    };

    // Convert screen pixel value to lon lat
    //
    // - `px` {Array} `[x, y]` array of geographic coordinates.
    // - `zoom` {Number} zoom level.
    BaiduMercator.prototype.ll = function(px, zoom) {
        var s = Math.pow(2, 18 - zoom);
        var x = px[0] * s;
        var y = px[1] * s;
        return convertMC2LL([x, y]);
    };

    // Convert tile xyz value to bbox of the form `[w, s, e, n]`
    //
    // - `x` {Number} x (longitude) number.
    // - `y` {Number} y (latitude) number.
    // - `zoom` {Number} zoom.
    // - `fmt` {String} projection for resulting bbox (LL|MC).
    // - `return` {Array} bbox array of values in form `[w, s, e, n]`.
    BaiduMercator.prototype.bbox = function(x, y, zoom, fmt) {
        // Convert xyz into bbox with format lon/lat
        var ll = [x * this.size, y * this.size]; // lower left
        // Use +x to make sure it's a number to avoid inadvertent concatenation.
        // Use +y to make sure it's a number to avoid inadvertent concatenation.
        var ur = [(+x + 1) * this.size, (+y + 1) * this.size]; // upper right
        var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));

        // If requested reproject to baidu mercator.
        if (fmt === 'MC') {
            return this.convert(bbox, 'MC');
        } else {
            return bbox;
        }
    };

    // Convert bbox to xyx bounds
    //
    // - `bbox` {Number} bbox in the form `[w, s, e, n]`.
    // - `zoom` {Number} zoom.
    // - `fmt` {String} projection of input bbox (LL|MC).
    // - `@return` {Object} XYZ bounds containing minX, maxX, minY, maxY properties.
    BaiduMercator.prototype.xyz = function(bbox, zoom, fmt) {
        // If baidu mercator provided reproject to lon/lat.
        if (fmt === 'MC') {
            bbox = this.convert(bbox, 'LL');
        }

        var ll = [bbox[0], bbox[1]]; // lower left
        var ur = [bbox[2], bbox[3]]; // upper right
        var px_ll = this.px(ll, zoom);
        var px_ur = this.px(ur, zoom);
        // Y = 0 for XYZ is the top hence minY uses px_ur[1].
        var bounds = {
            minX: Math.floor(px_ll[0] / this.size),
            minY: Math.floor(px_ll[1] / this.size),
            maxX: Math.floor((px_ur[0] - 1) / this.size),
            maxY: Math.floor((px_ur[1] - 1) / this.size)
        };
        return bounds;
    };

    // Convert projection of given bbox.
    //
    // - `bbox` {Number} bbox in the form `[w, s, e, n]`.
    // - `to` {String} projection of output bbox (LL|MC). Input bbox
    //   assumed to be the "other" projection.
    // - `@return` {Object} bbox with reprojected coordinates.
    BaiduMercator.prototype.convert = function(bbox, to) {
        if (to === 'MC') {
            return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2,4)));
        } else {
            return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2,4)));
        }
    };

    // Convert lon/lat values to baidu mercator x/y.
    BaiduMercator.prototype.forward = function(ll) {
        return convertLL2MC(ll);
    };

    // Convert baidu mercator x/y values to lon/lat.
    BaiduMercator.prototype.inverse = function(xy) {
        return convertMC2LL(xy);
    };

    return BaiduMercator;

})();

if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = exports = BaiduMercator;
}
