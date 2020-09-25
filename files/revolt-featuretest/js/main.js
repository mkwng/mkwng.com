$(document).ready(function() {
  $(".feature-image").moveBg();
});

winTop = 0;
winHeight = 0;

$(window).bind("scroll resize",function() {
  winTop = $(window).scrollTop();
  winHeight = $(window).height();

  $(".feature-image").moveBg();

});

(function($){
   $.fn.moveBg = function() {
    $(this).each(function(index) {
      var height = $(this).height();
      var top = $(this).offset().top;
      // index,top + height - winTop,top - winBot
      var ratio = 1-Math.pow((winTop+winHeight-top)/(winHeight+height/2),1);
      $(this).css({"background-position-y":(ratio*100)+"%"});
    });
   };
}(jQuery));