
module.exports = (function () {
    "use strict";
    var shake = {};

    var watchId = null;

    var options = {
        frequency: 1
    };

    var data = null;

    // Start watching the accelerometer for a shake gesture
    shake.startWatch = function (onError) {
    	data = [];

        watchId = navigator.accelerometer.watchAcceleration(assessCurrentAcceleration, onError, options);
    };

    // Stop watching the accelerometer for a shake gesture
    shake.stopWatch = function (onStop) {
    	if (typeof (onStop) !== "function") {
            return;
        }

        if (watchId !== null) {
            navigator.accelerometer.clearWatch(watchId);
            watchId = null;
        }

        onStop(data);
    };

    // Assess the current acceleration parameters to determine a shake
    var assessCurrentAcceleration = function (acceleration) {
    	acceleration.magnitudeSquared = (acceleration.x * acceleration.x) +
        (acceleration.y * acceleration.y) +
        (acceleration.z * acceleration.z);
      acceleration.actualTimestamp = Date.now();
    	data.push(acceleration);
    };

    return shake;
})();
