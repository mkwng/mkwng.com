var myScroll,h;
var $takeover,$content,$flyout;

function loaded () {
  $takeover = $(".takeover");
  $content = $(".content");
  $flyout = $takeover.find(".flyout");
  hideaddrbar();
  setTimeout(function() {hideaddrbar();resizing();},100);
  myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true , bounce: false});
  myScroll.on('scroll', scrollUpdate);
  myScroll.on('scrollEnd', scrollUpdate);

}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function resizing () {
  h = window.innerHeight ? window.innerHeight : $(window).height();
  $("#wrapper,.content").css("min-height",h);
  $(".takeover").css("height",h/2);
  $(".takeover").css("height",h/2);

  $(".articles").css("width",$(window).width());
  $(".articles ul").css("width","888px");

  if(myScroll) myScroll.refresh();
}

function scrollUpdate() {
  var pos = $takeover.position().top;
  if(h - this.y >= pos) {
    $content.css("opacity",1-(h - this.y - pos)/$takeover.height());
    $flyout.css({"height":h,"margin-top":-1*(h-this.y-pos) });
  } else {
    $(".content").css("opacity",1)
    $(".takeover .flyout").css({"height":h,"margin-top":0});
  }
}

$(".more").bind('click touchstart',function() {
  $(this).slideUp();
  $(".hero .hidden").slideDown(function() {
    myScroll.refresh();
  });

});