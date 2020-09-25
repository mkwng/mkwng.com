$(function() {
    FastClick.attach(document.body);
});

$("#nav a.click").click(function(e) {
    e.preventDefault();
    $("#nav").toggleClass("show");
});

$("#content a.article").click(function(e) {
    current = this;
    e.preventDefault();
    $(this).toggleClass("open");
    $.scrollTo(current,500,{'axis':'y'});

});