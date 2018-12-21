if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
}
window.flitsApp.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
window.flitsApp.get_discount_code = function (event, btn) {
    if (btn.closest('form').querySelector("[name='flits-want-to-use-credit']").checked) {
        event.preventDefault();
    } else {
        return true;
    }
    var old_text = btn.innerHTML;
    var new_text = window.flitsApp.multilang.applying_credit_message;

    if (btn.tagName.toString().toLowerCase() == "input") {
        old_text = btn.value;
        btn.value = new_text;
    } else {
        old_text = btn.innerHTML;
        btn.innerHTML = new_text;
    }
    btn.setAttribute('disabled', true);

    window.flitsApp.getCartData(function (cart) {
        var URL = "/credit/apply_credit";
        var token = document.getElementById("flits-token").value;
        URL = document.getElementById("flits-customer-url").value + URL;
        var ajax = window.flitsApp.get_ajax_obj();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(this.responseText);
                if (btn.tagName.toString().toLowerCase == "input") {
                    btn.value = old_text;
                } else {
                    btn.innerHTML = old_text;
                }

                btn.setAttribute("disabled", false);
                if (res.status) {
                    location.href = "/checkout?discount=" + res.code;
                }
            }
        };
        ajax.open("POST", URL, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        Object.defineProperty(cart, 'cart_token',
                Object.getOwnPropertyDescriptor(cart, 'token'));
        delete cart['token'];
        for (var i = 0; i < cart.items.length; i++) {
            delete cart.items[i]["product_description"];
        }

        var params = "token=" + token + "&data=" + btoa(unescape(encodeURIComponent(JSON.stringify(cart))));
        ajax.send(params);
    }, function () {
        location.href = "/checkout";
    });

};
window.flitsApp.get_ajax_obj = function () {
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
};
(function (funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }
    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function () {
                callback(context);
            }, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("flits_docReady", window);
flits_docReady(function () {
    var is_cart_automatic = document.getElementById('flits-is-cart-automatic').value;
    var checkout_selectors = ["input[name='checkout']", "button[name='checkout']", "[href$='checkout']", "input[name='goto_pp']", "button[name='goto_pp']", "input[name='goto_gc']", "button[name='goto_gc']", ".additional-checkout-button", ".google-wallet-button-holder", ".amazon-payments-pay-button"];
    checkout_selectors.forEach(function (selector) {
        var els = document.querySelectorAll(selector);
        if (typeof els == "object" && els) {
            for (var i = 0; i < els.length; i++) {
                var el = els[i];
                if (typeof el.addEventListener != "function") {
                    return;
                }
                if (is_cart_automatic == 1) {
                    el.parentElement.insertBefore(document.getElementById('flits-cart-automatic-code').children[0], el.parentElement.firstChild)
                }
                el.addEventListener("click", function (ev) {
//                    ev.preventDefault();
                    var btn = this;
                    window.flitsApp.get_discount_code(ev, btn);
                }, false);

            }
        }
    })
//    document.querySelector("form[action='/cart']").addEventListener('submit',);
});

window.flitsApp.getCartData = function (success, error) {
    var cart_url = "/cart.json";
    var cart_ajax = window.flitsApp.get_ajax_obj();
    cart_ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof success == "function") {
                    var res = JSON.parse(this.responseText);
                    success(res);
                }
            } else {
                if (typeof error == "function") {
                    error();
                }
            }
        }
    };
    cart_ajax.open("GET", cart_url, true);
    cart_ajax.send();
};