/*==========================*/
/* imagesLoaded plugin */
/*==========================*/
/*
 * jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */ (function (c, n) {
    var k = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    c.fn.imagesLoaded = function (l) {
        function m() {
            var b = c(h),
                a = c(g);
            d && (g.length ? d.reject(e, b, a) : d.resolve(e));
            c.isFunction(l) && l.call(f, e, b, a)
        }

        function i(b, a) {
            b.src === k || -1 !== c.inArray(b, j) || (j.push(b), a ? g.push(b) : h.push(b), c.data(b, "imagesLoaded", {
                isBroken: a,
                src: b.src
            }), o && d.notifyWith(c(b), [a, e, c(h), c(g)]), e.length === j.length && (setTimeout(m), e.unbind(".imagesLoaded")))
        }
        var f = this,
            d = c.isFunction(c.Deferred) ? c.Deferred() : 0,
            o = c.isFunction(d.notify),
            e = f.find("img").add(f.filter("img")),
            j = [],
            h = [],
            g = [];
        e.length ? e.bind("load.imagesLoaded error.imagesLoaded", function (b) {
            i(b.target, "error" === b.type)
        }).each(function (b, a) {
            var e = a.src,
                d = c.data(a, "imagesLoaded");
            if (d && d.src === e) i(a, d.isBroken);
            else if (a.complete && a.naturalWidth !== n) i(a, 0 === a.naturalWidth || 0 === a.naturalHeight);
            else if (a.readyState || a.complete) a.src = k, a.src = e
        }) : m();
        return d ? d.promise(f) : f
    }
})(jQuery);


/* Global JS */
/*==========================*/

/* loadImages function */
/* elems are the images, and ch is the container height */
/* Sizes image appropriately to fill as much of the container as possible
   without cropping it, and making sure the image is vertically aligned */
var loadImages = function (elems, ch) {

    $(elems).each(function () {
        $(this).imagesLoaded(function () {
            var i_w = $(this).width(); // image width
            var i_h = $(this).height(); // image height
            var c_h = ch; // container height
            var v_o = (c_h - i_h) / 2; // vertical offset            
            if (i_h > c_h) {
                $(this).css('height', ch).css('width', 'auto');
            } else {
                $(this).css('margin-top', v_o);
            }
            $(this).fadeTo(200, 1); // reveals image with a 200 ms-lomg fade-in.
        });
    });
}



