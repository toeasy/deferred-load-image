/**
 * deferred load images
 *
 * @type {{loadImage}}
 */

window.DL_IMAGE = (function () {


    function _src(url) {
        if (!url) {
            return;
        }

        //if need load image from cdn, here handle.
        return url;

    }

    /**
     * if image cached return true,and from cache load image.
     * also delay load.
     */
    function _isInCache(imgFullSrc) {
        let img = new Image();
        img.src = imgFullSrc;
        return (img.complete || img.width);
    }

    /**
     *
     * @param   animation effect.  see  https://daneden.github.io/animate.css
     * @param delay time ,unit ms
     * @returns {Promise.<T>}
     */
    function _loadImage(animation, delay) {

        let imgList = $('img[data-src]');
        let am = animation || 'zoomIn';
        delay = delay || 500;


        function loadImagePromise(img) {
            let src = _src(img.data('src'));
            if (_isInCache(src)) {

                delay = 500;
            } else {
                // console.log('load image from server ' +src);
            }
            return new Promise(function (reslove, reject) {
                let id = img.attr('id');
                setTimeout(function () {
                    reslove(id);
                }, delay);

                img.attr('src', _src(src)).addClass('animated ' + am);

            });
        }


        let loadPromise = $.map(imgList, function (e, i) {
            return function () {
                return loadImagePromise($(e));
            }
        });


        function recordValue(results, value) {
            results.push(value);
            return results;
        }

        // [] to save init value
        let pushValue = recordValue.bind(null, []);

        // return promise object  array.
        let tasks = loadPromise;
        let promise = Promise.resolve();

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            promise = promise.then(task).then(pushValue);
        }

        return promise;
    }


    return {

        loadImage: _loadImage

    }
})();
