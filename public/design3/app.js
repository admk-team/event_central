"use strict";
jQuery(document).ready(function (r) {
    function e() {
        r(window).width() < 991
            ? (r(".has-submenu i").length ||
                  (r("header .has-submenu").append(
                      '<i role="button" class="fa fa-angle-down"></i>'
                  ),
                  r("header .has-submenu i").addClass("hide-drop")),
              r("header .has-submenu i").on("click", function () {
                  r(this).hasClass("animation") ||
                      (r(this).parent().toggleClass("is-open"),
                      r(this).addClass("animation"),
                      r(this)
                          .parent()
                          .siblings()
                          .removeClass("is-open")
                          .find(".fa")
                          .removeClass("hide-drop")
                          .prev(".sub-menu")
                          .slideUp(250),
                      r(this).hasClass("hide-drop")
                          ? (r(this).closest(".sub-menu").length ||
                                r(".has-submenu i")
                                    .addClass("hide-drop")
                                    .next(".sub-menu")
                                    .hide(250),
                            r(this)
                                .removeClass("hide-drop")
                                .prev(".sub-menu")
                                .slideToggle(250))
                          : r(this)
                                .addClass("hide-drop")
                                .prev(".sub-menu")
                                .hide(100)
                                .find(".has-submenu a")
                                .addClass("hide-drop")
                                .prev(".sub-menu")
                                .hide(250)),
                      setTimeout(function () {
                          r("header .codeboxr-main-menu i").removeClass(
                              "animation"
                          );
                      }, 250);
              }))
            : r("header .has-submenu i").remove();
    }
    r(window).on("scroll", function () {
        100 < r(window).scrollTop()
            ? r(".site-header").addClass("showed")
            : r(".site-header").removeClass("showed");
    }),
        r(".burger-menu").on("click", function () {
            r(".canvas-menu-wrapper").toggleClass("open-menu"),
                r("body").toggleClass("no-scroll");
        }),
        r(".close-menu").on("click", function () {
            r(".canvas-menu-wrapper").removeClass("open-menu"),
                r("body").removeClass("no-scroll");
        }),
        r(".canvas-menu-content ul li a").on("click", function () {
            r(".canvas-menu-wrapper").removeClass("open-menu");
        }),
        r(window).on("load", function () {
            e();
        }),
        window.addEventListener(
            "orientationchange",
            function () {
                e();
            },
            !1
        ),
        r(window).on("resize", function () {
            e();
        }),
        0 < r(".testimonial-slider").length &&
            (r(".testimonial-slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !1,
                asNavFor: ".testimonial-slider-nav",
            }),
            r(".testimonial-slider-nav").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: ".testimonial-slider",
                dots: !1,
                centerMode: !0,
                focusOnSelect: !0,
            }));
    for (
        var n = window.location.protocol + "//" + window.location.host,
            s = window.location.pathname.split("/"),
            o = 1;
        o < s.length - 1;
        o++
    )
        (n += "/"), (n += s[o]);
    r("form#cbx-contact-form").validate({
        rules: {
            cbxname: { required: !0 },
            cbxemail: { required: !0, email: !0 },
            cbxmessage: { required: !0 },
            cbxsubject: { required: !0 },
        },
        submitHandler: function (e) {
            var o = r(e);
            return (
                r.ajax({
                    url: n + "/php/contact.php",
                    type: "post",
                    data: o.serialize(),
                    success: function (s) {
                        try {
                            (s = r.parseJSON(s)).validation_error
                                ? r.each(s.error_field, function (e) {
                                      0 ==
                                          r(
                                              "label#" +
                                                  s.error_field[e] +
                                                  "-error"
                                          ).length &&
                                          r("#" + s.error_field[e]).after(
                                              '<label class="error" for="' +
                                                  s.error_field[e] +
                                                  '" id="' +
                                                  s.error_field[e] +
                                                  '-error"></label>'
                                          ),
                                          r(
                                              "label#" +
                                                  s.error_field[e] +
                                                  "-error"
                                          ).text(s.message[s.error_field[e]]);
                                  })
                                : (s.error
                                      ? (r("#cbx-formalert")
                                            .addClass("alert alert-danger")
                                            .html(s.successmessage),
                                        new AWN().alert(
                                            "Something is wrong. Message sending failed!",
                                            { durations: { success: 0 } }
                                        ))
                                      : (r("#cbx-formalert")
                                            .addClass("alert alert-success")
                                            .html(s.successmessage),
                                        new AWN().success(
                                            "Message sent successfully",
                                            { durations: { success: 0 } }
                                        )),
                                  o[0].reset());
                        } catch (e) {
                            o[0].reset();
                        }
                    },
                    error: function (e) {
                        o[0].reset();
                    },
                }),
                !1
            );
        },
    }),
        r("form#cbx-subscribe-form").validate({
            rules: { email: { required: !0, email: !0 } },
            errorPlacement: function (e, s) {
                "email" == s.attr("name")
                    ? r("#cbx-subscribe-form-error").html(e)
                    : e.insertAfter(s);
            },
            submitHandler: function (e) {
                var s = r(e);
                return (
                    r.ajax({
                        url: n + "/php/subscribe.php",
                        type: "post",
                        data: s.serialize(),
                        success: function (e) {
                            s.find("#cbx-subscribe-form-error").html("");
                            try {
                                (e = r.parseJSON(e)).validation_error
                                    ? s
                                          .find("#cbx-subscribe-form-error")
                                          .html(
                                              '<label id="subscribe-error" class="error" for="subscribe">' +
                                                  e.message.email +
                                                  "</label>"
                                          )
                                    : (e.error
                                          ? (s
                                                .find(
                                                    "#cbx-subscribe-form-error"
                                                )
                                                .html(
                                                    '<label id="subscribe-error" class="error" for="subscribe">' +
                                                        e.successmessage +
                                                        "</label>"
                                                ),
                                            new AWN().alert(
                                                "Something is wrong. Message sending failed!",
                                                { durations: { success: 0 } }
                                            ))
                                          : (s
                                                .find(
                                                    "#cbx-subscribe-form-error"
                                                )
                                                .html(
                                                    '<label id="subscribe-success" class="success" for="subscribe">' +
                                                        e.successmessage +
                                                        "</label>"
                                                ),
                                            new AWN().success(
                                                "Message sent successfully",
                                                { durations: { success: 0 } }
                                            )),
                                      s[0].reset());
                            } catch (e) {
                                s[0].reset();
                            }
                        },
                        error: function (e) {
                            s[0].reset();
                        },
                    }),
                    !1
                );
            },
        }),
        new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !1,
            live: !0,
        }).init();
    var a = r("#cbxcountdown"),
        i = a.data("year"),
        c = a.data("month"),
        a = a.data("day"),
        a = new Date(i, c - 1, a);
    r(".cbx-countdown-countdown-container").length &&
        r(".cbx-countdown-countdown-container").final_countdown({
            now: Date.now() / 1e3,
            end: a.getTime() / 1e3,
            selectors: {
                value_seconds:
                    ".cbx-countdown-clock-seconds .cbx-countdown-val",
                canvas_seconds: "cbx-countdown-canvas_seconds",
                value_minutes:
                    ".cbx-countdown-clock-minutes .cbx-countdown-val",
                canvas_minutes: "cbx-countdown-canvas_minutes",
                value_hours: ".cbx-countdown-clock-hours .cbx-countdown-val",
                canvas_hours: "cbx-countdown-canvas_hours",
                value_days: ".cbx-countdown-clock-days .cbx-countdown-val",
                canvas_days: "cbx-countdown-canvas_days",
            },
        }),
        r(".gotome").smoothScroll({ speed: 600 }),
        r("#cbx-memorisinner").magnificPopup({
            delegate: "a",
            type: "image",
            gallery: { enabled: !0 },
            image: { titleSrc: "title" },
        }),
        r(".video-play").each(function () {
            r(".video-play").magnificPopup({ type: "iframe" });
        });
});
