if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
}
window.flitsApp.recently_viewed_products = function () {
    var cname = 'flits_recently_products';
    var div_id = 'flits-recently-products';
    var empty_div_id = 'flits-recently-view-empty';
    var single_product_template = "";
    single_product_template = "<li "
            + " class=''"
            + " data-position='{index}'"
            + " id='flits-recently-product-{handle}'>"
            + "<a href='{href}' target='_blank'>"
            + "<div class='flits-row'>"
            + "<div class='flits-col-md-12 flits-text-center'>"
            + "<img class='flits-recently-view-image'/>"
            + "</div>"
            + "</div>"
            + " </a></li>";
    var is_first_time = true;
    var queue = [];
    var limit = 8;
    var days = 15;
    var that = this;
    this.setProductData = function (handle) {
        var URL = "/products/" + handle + ".json";
        var ajax = this.get_ajax_obj();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    var product = res.product;
                    var img_src = product.image.src;
                    var title = product.title;
                    var extidx = img_src.lastIndexOf('.');
                    var extension = img_src.substr(extidx);
                    img_src = img_src.replace(extension,'_200x_crop_center'+extension);
                    var li = document.getElementById("flits-recently-product-" + handle);
                    li.querySelectorAll(".flits-recently-view-image")[0].setAttribute('src', img_src);
                    li.setAttribute('title',title);
//                    li.querySelectorAll(".flits-recently-view-title")[0].innerHTML = title;
                } else {
                    document.getElementById("flits-recently-product-" + handle).remove();
                }

            }
        };
        ajax.open("get", URL, true);
        ajax.send();
    };
    this.get_ajax_obj = function () {
        if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 6 and older
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    };
    this.change_position_of_elments = function () {
        var div = document.getElementById(div_id);
        for (var i = 0; i < div.children.length; i++) {
            div.children[i].setAttribute('data-position', i);
        }
        for (var i = 0; i < div.children.length; i++) {
            if (i > limit) {
                div.children[i].remove();
            }
        }
    };
    this.update_div = function () {
        var div = document.getElementById(div_id);
        if (div == null) {
            return false;
        }
        var display_products = this.get_all_display_product();
        if(display_products.length <= 0){
           document.getElementById(empty_div_id).className = document.getElementById(empty_div_id).className.replace(/\bflits-hidden\b/, "");
        }
        display_products.forEach(function (item, index) {
            var elm = document.getElementById("flits-recently-product-" + item);
            if (elm == null) {
                var single_product = single_product_template.substr(0).replace(/{index}/g, index);
                single_product = single_product.replace(/{handle}/g, item);
                single_product = single_product.replace(/{href}/g, "/products/" + item);
                if (is_first_time) {
                    div.innerHTML = div.innerHTML + single_product;
                } else {
                    div.innerHTML = single_product + div.innerHTML;
                }
                that.setProductData(item);
            } else {
                var old_pos = elm.getAttribute('data-position');
                if (old_pos == index) {
                } else {
                    if (index == 0) {
                        elm.setAttribute('data-position', 0);
                        div.insertBefore(elm, div.firstChild);
                    }
                }
            }
            that.change_position_of_elments();

        });
        is_first_time = false;
//            div.innerHTML = JSON.stringify(queue);
    };
    this.update_products = function () {
        var recent = this.getCookie(cname);
        queue = (recent.trim() === "") ? [] : JSON.parse(recent);
    };
    this.save_products = function () {
        this.setCookie(cname, JSON.stringify(queue), days);
        this.update_div();
    };
    this.isFull = function () {
        return (limit == queue.length);
    };
    this.is_present = function (item) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i] == item) {
                return i;
            }
        }
        return -1;
    };
    this.add_product = function (item) {
        this.update_products();
        var index = this.is_present(item);
        if (index !== -1) {
            this.remove_product(index);
        }
        if (this.isFull()) {
            this.remove_first_product();
        }
        queue.push(item);
        this.save_products();
    };
    this.remove_first_product = function () {
        if (queue.length == 0)
            return undefined;
        var item = queue[0];
        queue.splice(0, 1);
        return item;
    };
    this.remove_product = function (index) {
        if (queue.length == 1) {
            queue = [];
        } else {
            queue.splice(index, 1);
        }
//            this.save_products();
    };
    this.get_all_product = function () {
        this.update_products();
        return queue;
    };
    this.get_all_display_product = function () {
        this.update_products();
        var queue_ = queue.slice();
        return queue_.reverse();
    };
    this.getCookie = function (cname) {
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
    this.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    this.update_products();
    this.update_div();
};