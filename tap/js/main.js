var navHover;
$(".nav-wrapper").hover(
  function() {
    navHover = setTimeout(function() {
      $(".nav-wrapper").addClass("active");
    },1000)
  },
  function() {
    clearTimeout(navHover);
    $(this).removeClass("active");
  }
);

$(".section-controls a.next").click(function() {
  var $t = $(this);
  $t.parent().siblings(".section-list").css("transform","translate3d(-650px,0,0)");
  return false;
});
$(".section-controls a.prev").click(function() {
  var $t = $(this);
  $t.parent().siblings(".section-list").css("transform","translate3d(0,0,0)");
  return false;
});

$(".box").click(function() {
  $(this).toggleClass("active");
});