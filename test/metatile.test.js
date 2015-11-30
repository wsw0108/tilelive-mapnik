var assert = require('assert');
var render = require('../lib/render');

var FULL = 20037508.342789244;
var HALF = 0;
var QUAD = 10018754.171394622;
var QUADX = 10018754.17139462;

var W = -180, S = -85.05112877980659, E = 180, N = 85.0511287798066;
var Q_LNG = 90, Q_LAT = 66.51326044311185;

describe('metatile', function() {
    it('test metatile calculation at z=0', function(done) {
        var tile = {
            width: 256, height: 256,
            tiles: [ [0, 0, 0] ],
            bbox: [ W, S, E, N ],
            x: 0, y: 0
        };
        assert.deepEqual(render.calculateMetatile({ z: 0, x: 0, y: 0, metatile: 1, tileSize: 256 }), tile);
        assert.deepEqual(render.calculateMetatile({ z: 0, x: 0, y: 0, metatile: 2, tileSize: 256 }), tile);
        assert.deepEqual(render.calculateMetatile({ z: 0, x: 0, y: 0, metatile: 3, tileSize: 256 }), tile);
        assert.deepEqual(render.calculateMetatile({ z: 0, x: 0, y: 0, metatile: 4, tileSize: 256 }), tile);
        assert.deepEqual(render.calculateMetatile({ z: 0, x: 0, y: 0, metatile: 13, tileSize: 256 }), tile);
        done();
    });

    it('test metatile calculation at z=1', function(done) {
        // metatile: 1
        {
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 0, metatile: 1, tileSize: 256}), {
                width: 256,
                height: 256,
                tiles: [ [1, 0, 0] ],
                bbox: [ W, HALF, HALF, N ],
                x: 0, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [1, 0, 1] ],
                bbox: [ W, S, HALF, HALF ],
                x: 0, y: 1
            });
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 0, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [1, 1, 0] ],
                bbox: [ HALF, HALF, E, N ],
                x: 1, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [1, 1, 1] ],
                bbox: [ HALF, S, E, HALF ],
                x: 1, y: 1
            });
        }

        var tile = {
            width: 512,
            height: 512,
            tiles: [ [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1] ],
            bbox: [ W, S, E, N ],
            x: 0, y: 0
        };
        // metatile: 2
        {
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 1, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 1, metatile: 2, tileSize: 256 }), tile);
        }

        // metatile: 3
        {
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 1, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 1, metatile: 3, tileSize: 256 }), tile);
        }

        // metatile: 4
        {
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 1, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 1, metatile: 4, tileSize: 256 }), tile);
        }

        // metatile: 13
        {
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 0, y: 1, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 1, x: 1, y: 1, metatile: 13, tileSize: 256 }), tile);
        }
        done();
    });

    it('test metatile calculation at z=2', function(done) {
        // metatile: 1
        {
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 0, 0] ],
                bbox: [ W, Q_LAT, -Q_LNG, N ],
                x: 0, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 0, 1] ],
                bbox: [ W, HALF, -Q_LNG, Q_LAT ],
                x: 0, y: 1
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 0, 2] ],
                bbox: [ W, -Q_LAT, -Q_LNG, HALF ],
                x: 0, y: 2
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 0, 3] ],
                bbox: [ W, S, -Q_LNG, -Q_LAT ],
                x: 0, y: 3
            });

            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 1, 0] ],
                bbox: [ -Q_LNG, Q_LAT, HALF, N ],
                x: 1, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 1, 1] ],
                bbox: [ -Q_LNG, HALF, HALF, Q_LAT ],
                x: 1, y: 1
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 1, 2] ],
                bbox: [ -Q_LNG, -Q_LAT, HALF, HALF ],
                x: 1, y: 2
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 1, 3] ],
                bbox: [ -Q_LNG, S, HALF, -Q_LAT ],
                x: 1, y: 3
            });

            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 2, 0] ],
                bbox: [ HALF, Q_LAT, Q_LNG, N ],
                x: 2, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 2, 1] ],
                bbox: [ HALF, HALF, Q_LNG, Q_LAT ],
                x: 2, y: 1
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 2, 2] ],
                bbox: [ HALF, -Q_LAT, Q_LNG, HALF ],
                x: 2, y: 2
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 2, 3] ],
                bbox: [ HALF, S, Q_LNG, -Q_LAT ],
                x: 2, y: 3
            });

            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 3, 0] ],
                bbox: [ Q_LNG, Q_LAT, E, N ],
                x: 3, y: 0
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 3, 1] ],
                bbox: [ Q_LNG, HALF, E, Q_LAT ],
                x: 3, y: 1
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 3, 2] ],
                bbox: [ Q_LNG, -Q_LAT, E, HALF ],
                x: 3, y: 2
            });
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 1, tileSize: 256 }), {
                width: 256,
                height: 256,
                tiles: [ [2, 3, 3] ],
                bbox: [ Q_LNG, S, E, -Q_LAT ],
                x: 3, y: 3
            });
        }

        // metatile: 2
        {
            var tile = {
                width: 512, height: 512,
                tiles: [ [2, 0, 0], [2, 0, 1], [2, 1, 0], [2, 1, 1] ],
                bbox: [ W, HALF, -HALF, N ],
                x: 0, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 2, tileSize: 256 }), tile);

            var tile = {
                width: 512, height: 512,
                tiles: [ [2, 2, 0], [2, 2, 1], [2, 3, 0], [2, 3, 1] ],
                bbox: [ HALF, HALF, E, N ],
                x: 2, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 2, tileSize: 256 }), tile);

            var tile = {
                width: 512, height: 512,
                tiles: [ [2, 0, 2], [2, 0, 3], [2, 1, 2], [2, 1, 3] ],
                bbox: [ W, S, -HALF, HALF ],
                x: 0, y: 2
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 2, tileSize: 256 }), tile);


            var tile = {
                width: 512, height: 512,
                tiles: [ [2, 2, 2], [2, 2, 3], [2, 3, 2], [2, 3, 3] ],
                bbox: [ HALF, S, E, HALF ],
                x: 2, y: 2
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 2, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 2, tileSize: 256 }), tile);
        }

        // metatile: 3
        {
            var tile = {
                width: 768, height: 768,
                tiles: [ [2, 0, 0], [2, 0, 1], [2, 0, 2], [2, 1, 0], [2, 1, 1], [2, 1, 2], [2, 2, 0], [2, 2, 1], [2, 2, 2] ],
                bbox: [ W, -Q_LAT, Q_LNG, N ],
                x: 0, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 3, tileSize: 256 }), tile);

            var tile = {
                width: 768, height: 256,
                tiles: [ [2, 0, 3], [2, 1, 3], [2, 2, 3] ],
                bbox: [ W, S, Q_LNG, -Q_LAT ],
                x: 0, y: 3
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 3, tileSize: 256 }), tile);

            var tile = {
                width: 256, height: 768,
                tiles: [ [2, 3, 0], [2, 3, 1], [2, 3, 2] ],
                bbox: [ Q_LNG, -Q_LAT, E, N ],
                x: 3, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 3, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 3, tileSize: 256 }), tile);

            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 3, tileSize: 256 }), {
                width: 256, height: 256,
                tiles: [ [2, 3, 3] ],
                bbox: [ Q_LNG, S, E, -Q_LAT ],
                x: 3, y: 3
            });
        }

        // metatile: 4
        {
            var tile = {
                width: 1024, height: 1024,
                tiles: [ [2, 0, 0], [2, 0, 1], [2, 0, 2], [2, 0, 3], [2, 1, 0], [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 2, 0], [2, 2, 1], [2, 2, 2], [2, 2, 3], [2, 3, 0], [2, 3, 1], [2, 3, 2], [2, 3, 3]],
                bbox: [ W, S, E, N ],
                x: 0, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 4, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 4, tileSize: 256 }), tile);
        }

        // metatile: 5
        {
            var tile = {
                width: 1024, height: 1024,
                tiles: [ [2, 0, 0], [2, 0, 1], [2, 0, 2], [2, 0, 3], [2, 1, 0], [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 2, 0], [2, 2, 1], [2, 2, 2], [2, 2, 3], [2, 3, 0], [2, 3, 1], [2, 3, 2], [2, 3, 3]],
                bbox: [ W, S, E, N ],
                x: 0, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 5, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 5, tileSize: 256 }), tile);
        }

        // metatile: 13
        {
            var tile = {
                width: 1024, height: 1024,
                tiles: [ [2, 0, 0], [2, 0, 1], [2, 0, 2], [2, 0, 3], [2, 1, 0], [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 2, 0], [2, 2, 1], [2, 2, 2], [2, 2, 3], [2, 3, 0], [2, 3, 1], [2, 3, 2], [2, 3, 3]],
                bbox: [ W, S, E, N ],
                x: 0, y: 0
            };
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 1, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 2, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 0, y: 3, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 1, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 2, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 1, y: 3, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 1, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 2, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 2, y: 3, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 0, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 1, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 2, metatile: 13, tileSize: 256 }), tile);
            assert.deepEqual(render.calculateMetatile({ z: 2, x: 3, y: 3, metatile: 13, tileSize: 256 }), tile);
        }
            done();
    });

});
