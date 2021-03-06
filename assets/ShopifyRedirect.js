<script>// <![CDATA[
var QueryString = function() {
       // This function is anonymous, is executed immediately and 
       // the return value is assigned to QueryString!
       var queryString = {};
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i = 0; i < vars.length; i++) {
           var pair = vars[i].split("=");
           // If first entry with this name
           if (typeof queryString[pair[0]] === "undefined") {
               queryString[pair[0]] = pair[1];
               // If second entry with this name
           } else if (typeof queryString[pair[0]] === "string") {
               var arr = [queryString[pair[0]], pair[1]];
               queryString[pair[0]] = arr;
               // If third or later entry with this name
           } else {
               queryString[pair[0]].push(pair[1]);
           }
       }
       //call Create Cookie
       Stylinity$createCookie("StylinityBuyNowId", queryString.buynowid);
       //Call Redirect
       Stylinity$redirect(queryString.url);
   }();
   // create Cookie named "StylinityBuyNowId" with the Buy Now Id 

   function Stylinity$createCookie(name, value) {
       var date = new Date();
       date.setTime(date.getTime() + (45 * 24 * 60 * 60 * 1000));
       var expires = "; expires=" + date.toGMTString();
       document.cookie = name + "=" + value + expires + "; path=/";
   }

   // Redirect to product URL

   function Stylinity$redirect(url) {
       window.location.replace(decodeURIComponent(url));
   }
// ]]></script>
 