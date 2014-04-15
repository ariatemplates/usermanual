// follow-the-scroll-menu
(function() {
    if(window.ActiveXObject || "ActiveXObject" in window) {
        return; // some crazy stuff in IE, including IE11 which makes the div partially not visible
    }

    window.addEventListener('DOMContentLoaded', function () {
        var toc = document.querySelector('#toc');
        if (!toc) {
            return;
        }

        var tocDefaultTopPosition = toc.getBoundingClientRect().top + window.pageYOffset;

        var checkScroll = function () {
            var reserve = 40;
            var footerVisibleHeight = (window.innerHeight - document.querySelector("#footer").getBoundingClientRect().top);
            var footerIsInViewport = footerVisibleHeight > -reserve; // relying on the fact you can't scroll past the footer

            var offsetTop = window.pageYOffset;
            if (offsetTop > tocDefaultTopPosition) {
                var maxHeight = window.innerHeight;
                if (footerIsInViewport) {
                    maxHeight -= (footerVisibleHeight + reserve);
                }
                var cssText = "max-height: " + maxHeight + "px;";
                cssText += "max-width: 240px; overflow-y: auto; position: fixed; top: 0;";
                toc.style.cssText = cssText;
            } else if (offsetTop <= tocDefaultTopPosition) {
                toc.style.cssText = "";
            }

        };

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
    });
})();

// follow-the-scroll-hash
(function() {
    if (!history.replaceState) {
        return;
    }

    // only of interest with respect to page scroll
    var isElementBeforeViewport = function (el) {
        var rect = el.getBoundingClientRect();
        return rect.bottom < 0;
    };

    // only of interest with respect to page scroll
    var isElementInUpperHalfOfTheViewport = function (el) {
        var rect = el.getBoundingClientRect();
        // not checking rect.top >=0 because top can be partially hidden
        return rect.bottom >=0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)/2;
    };

    // here we're interested about full nice visibility of the element in the menu
    var isFullyVisible = function (el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    window.addEventListener('DOMContentLoaded', function () {
        var h1 = document.querySelector('h1');
        var anchors = [].slice.apply(document.querySelectorAll('h2[id], h3[id], h4[id]'));

        var oldId;
        var checkAnchorsInViewport = function () {
            if (isElementInUpperHalfOfTheViewport(h1)) {
                return;
            }

            var i = 0;
            var newId;
            var elem;
            while (anchors[i] && isElementBeforeViewport(anchors[i])) {
                i++;
            }
            if (anchors[i] && isElementInUpperHalfOfTheViewport(anchors[i])) {
                newId = anchors[i].id;
            } else {
                newId = anchors[i-1] ? anchors[i-1].id : null;
            }

            if (oldId && oldId != newId) {
                elem = document.querySelector('#toc a[href="#'+oldId+'"]');
                if (elem) {
                    elem.style.color = "";
                }
            }
            if (newId) {
                elem = document.querySelector('#toc a[href="#'+newId+'"]');
                if (elem) {
                    elem.style.color = null;
                    elem.style.color = "navy";
                    if (!isFullyVisible(elem)) {
                        elem.scrollIntoView();
                    }
                }
            }
            oldId = newId; // for the next run
        };

        window.addEventListener('scroll', checkAnchorsInViewport);
        window.addEventListener('resize', checkAnchorsInViewport);
    });
})();
