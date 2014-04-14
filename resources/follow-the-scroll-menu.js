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
    });
})();
