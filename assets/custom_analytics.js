$(function() {
    function t(t) {
        var a = {};
        return t && "[object Function]" === a.toString.call(t)
    }

    function a(t) {
        return t.replace(/\w\S*/g, function(t) {
            return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
        })
    }

    function e(t, a) {
        return t && t.length ? t[t.length - 1] : a || void 0
    }

    function i(t) {
        return $(t).is("a") ? $(t) : $(t).parents("a")
    }

    function n(a, e, n, r) {
        $(a).on("click", e, function(a) {
            var e = i($(a.target)),
                o = t(n) ? n(e) : n,
                c = t(r) ? r(e) : r;
            return analytics.track(o, c, {}, function() {
                window.location.href = e.attr("href")
            }), a.preventDefault(), !1
        })
    }

    function r(t, a) {
        var e = document.createElement("iframe"),
            i = "cd-form-" + Math.round(1e4 * Math.random());
        document.body.appendChild(e), e.style.display = "none", e.contentWindow.name = i;
        var n = document.createElement("form");
        n.target = i, n.action = t, n.method = "POST";
        for (var r in a) {
            var o = document.createElement("input");
            o.type = "hidden", o.name = r, o.value = a[r], n.appendChild(o)
        }
        document.body.appendChild(n), n.submit()
    }
    analytics.initialize({
        "Customer.io": {
            siteId: "e8afafea4d70347b33be"
        },
        "Google Analytics": {
            trackingId: "UA-34676548-1",
            classic: !1
        }
    }), window.customer_email && (analytics.alias(customer_email), analytics.identify(customer_email)), $(".mailing-list-link").click(function() {
        analytics.track("Clicked on Join Mailing List")
    }), $(".mailing-list-signup .ml-signup-btn").click(function() {
        var t = $(this).parents(".mailing-list-signup");
        t.find(".form-error").addClass("hidden");
        var a = t.find(".email input").val();
        a ? ($.cookie("joined_mailing_list", !0, {
            expires: 36500,
            path: "/"
        }), analytics.alias(a), analytics.identify(a, {
            email: a
        }), analytics.track("Joined Mailing List", {
            referring_page: document.title.split(" | ")[0]
        }), r("https://docs.google.com/forms/d/1soNyEXmVj6rtZIk07ycQyWQ43vg8BBwHd0Z95oBapt0/formResponse", {
            "entry.659530670": a,
            "entry.1989690552": document.title.split(" | ")[0]
        }), t.html("<center><span class=newsHeader></span><p class=popupthankyou>Thank you for joining us!</p></center>"), $("#newsBox").height(160)) : t.find(".email .form-error").removeClass("hidden")
    }), $(".footer-newsletter-btn").click(function() {
        var t = $(this).parents(".mailing-list-signup"),
            a = $("#footer-newsletter").val();
        a && ($.cookie("joined_mailing_list", !0, {
            expires: 36500,
            path: "/"
        }), analytics.alias(a), analytics.identify(a, {
            email: a
        }), analytics.track("Joined Mailing List", {
            referring_page: document.title.split(" | ")[0]
        }), r("https://docs.google.com/forms/d/1soNyEXmVj6rtZIk07ycQyWQ43vg8BBwHd0Z95oBapt0/formResponse", {
            "entry.659530670": a,
            "entry.1989690552": document.title.split(" | ")[0]
        }), t.html("Thank you for joining us!"))
    }), analytics.trackForm($("form.product-form"), "Added item to cart", function(t) {
        var a = $(t),
            e = {};
        a.find("li.selected").each(function() {
            var t = $(this).parent("ul").attr("data-option-type");
            t && (e[t] = $(this).attr("data-option-title"))
        });
        return a.find(":input").each(function() {
            this.name && (e[this.name] = $(this).val())
        }), e.product_title = unescape(a.attr("data-product-title")), e.product_price = parseInt(a.attr("data-product-price"), 10) / 100, e
    }), n("#page.article", "a[href*=mercer][href*=products]", function(t) {
        return "Clicked Product Link from " + unescape($("#page").attr("data-blog-title")) + " blog"
    }, function(t) {
        var i = {
                product: a(e(t.attr("href").split("/"), "unknown").replace("-", " ")),
                article: unescape($("#page").attr("data-article-title"))
            },
            n = t.find("img");
        if (n.length) {
            var r = n.attr("alt") || n.attr("title");
            r && (i.img_text = r)
        }
        return i
    }), $("#cartform .remove-item").click(function(t) {
        var a = i($(t.target)),
            e = {
                product: unescape(a.attr("data-product-title")),
                variant: unescape(a.attr("data-product-variant")),
                quantity: a.attr("data-quantity")
            };
        return analytics.track("Removed item(s) from cart", e, {}, function() {
            $("#updates_" + a.attr("data-variant-id")).val(0), $("#cartform").submit()
        }), t.preventDefault(), !1
    }), $("#cartform #checkout").click(function(t, a) {
        return "repeat" == a || (analytics.track("Entered Checkout", {}, {}, function() {
            $(t.target).trigger("click", "repeat")
        }), t.preventDefault(), !1)
    }), analytics.trackForm($("#create_customer"), "Registered", function(t) {
        var a = $(t),
            e = a.find(".email").val(),
            i = a.find(".first-name").val(),
            n = a.find(".last-name").val();
        return analytics.alias(e), analytics.identify(e, {
            firstName: i,
            lastName: n,
            email: e
        }), {}
    }), analytics.trackForm($("#customer_login"), "Logged in", function(t) {
        return analytics.identify($("#customer_email").val()), {}
    }), analytics.trackLink($("#featured a"), "Clicked on Homepage Featured Banner Image", function(t) {
        var a = i(t);
        return {
            link: e(a.attr("href").split(".com"), "unknown"),
            img: a.find("img").attr("alt")
        }
    }), analytics.trackLink($("#homepage-promo-images a"), "Clicked on Homepage Promo Banner Image", function(t) {
        var a = i(t);
        return {
            link: e(a.attr("href").split(".com"), "unknown"),
            img: a.find("img").attr("alt")
        }
    }), n("ul.related-products", ".complete-the-look-link", "Clicked on Complete the Look Link", function(t) {
        return {
            original_product: unescape(t.attr("data-orig-product")),
            complete_the_look_product: unescape(t.attr("data-ctl-product"))
        }
    }), analytics.trackLink($(".social-fb"), "Clicked FB Social Icon"), analytics.trackLink($(".social-twitter"), "Clicked Twitter Social Icon"), analytics.trackLink($(".social-pinterest"), "Clicked Pinterest Social Icon"), analytics.trackLink($(".social-instagram"), "Clicked Instagram Social Icon")
});