jQuery(function (s) {
    var t = [];
    t.push('<div class="cbx-switcher-area">'),
        t.push('<div class="cbx-switcher-inner">'),
        t.push(
            '<a id="cbx-switcher-btn" class="cbx-switcher-btn" href="#"><span class="fa fa-cog fa-spin" aria-hidden="true"></span></a>'
        ),
        t.push(
            '<div id="cbx-switcher-body" class="cbx-switcher-body cbx-hide">'
        ),
        t.push('<p class="cbx-switcher-text" > Style Switcher</p>'),
        t.push('<ul class="list-unstyled clearfix cbx-switcher-list">'),
        s.each(
            [
                "default",
                "yellow",
                "red",
                "orange",
                "olive",
                "violet",
                "pink",
                "navy",
            ],
            function (c, e) {
                t.push(
                    '<li class="cbx-list-' +
                        e +
                        '"><a title="Color ' +
                        e +
                        '" href="#"  class="cbx-switcher-clr-btn" data-color-name="-' +
                        e +
                        '"></a></li>'
                );
            }
        ),
        t.push("</ul>"),
        t.push("</div></div></div>"),
        (s.fn.SwitcherLoader = function () {
            var c = s(this);
            c.html(t.join(""));
            var e = !0;
            c.find("#cbx-switcher-btn").on("click", function (c) {
                c.preventDefault(),
                    (e =
                        (e
                            ? s("#cbx-switcher-body").animate({ right: 0 }, 500)
                            : s("#cbx-switcher-body").animate(
                                  { right: -280 },
                                  500
                              ),
                        !e));
            }),
                s("a.cbx-switcher-clr-btn").on("click", function (c) {
                    c.preventDefault();
                    c = s(this);
                    s("#cbx-style").attr(
                        "href",
                        "assets/css/style" + c.data("color-name") + ".css?v=2"
                    );
                });
        });
})
