// $$('.preso').tap(function(e) {
//   console.log(e);
// });

var swipeController = $(".preso").hammer();

swipeController.on('swipe',function(ev) {
  ev.gesture.preventDefault();
  if (ev.gesture.direction == "up") {
    next();
  }
    else if(ev.gesture.direction == "down") {
    prev();
  }
});
function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, false);
$(document).keydown(function(e){
    if (e.keyCode == 38)
       prev();
    else if(e.keyCode == 40)
      next();
});

$(document).ready(function() {
    winTop = $(".preso.active").scrollTop();
    winHeight = $(".preso.active").height();
    mHeight = 0;
    index = 0;
})

$(".nav-list button").click(function() {
  $t = $(this);
  if($t.hasClass("active")) { return false; }
  else if($t.hasClass("nav-story")) {
    $(".nav-list button").removeClass("active");
    $t.addClass("active");
    $(".preso").removeClass("active").filter("#story").addClass("active");
  }
  else if($t.hasClass("nav-solution")) {
    $(".nav-list button").removeClass("active");
    $t.addClass("active");
    $(".preso").removeClass("active").filter("#solution").addClass("active");
  }
  else if($t.hasClass("nav-resource")) {
    $(".nav-list button").removeClass("active");
    $t.addClass("active");
    $(".preso").removeClass("active").filter("#resource").addClass("active");
  }

  $(".preso").scrollTo(0);
  index = 0;
});


var next = function() {
  if (index+1 >= $(".preso.active .slide").length ) {
    return false;
  }
  index++;
  $(".preso.active").scrollTo(index * winHeight, 300);
}
var prev = function() {
  if (index == 0) return false;
  index--;
  $(".preso.active").scrollTo(index * winHeight, 300);
}


$("#solution .slide-03 .slide-diagram").click(function() {
  $t = $(this);
  if(!$t.find(".odopod").hasClass("active")) {
    $t.find(".odopod").addClass("active");
    return false;
  } else if(!$t.find(".huge").hasClass("active")) {
    $t.find(".huge").addClass("active");
    return false;
  }
});

$("#solution .slide-04 ul").click(function() {
  $li = $(this).find("li");
  var i = $li.filter(".active").index();
  var l = $li.length;
  $li.removeClass("active");
  $li.eq((i+1)%l).addClass("active");
});



$(".slide.work-slide").click(function() {
  $works = $(this).find(".works");
  var i = $works.filter(".active").index();
  var l = $works.length;
  $works.removeClass("active");
  $works.eq((i+1)%l).addClass("active");
});

$(".work-list li a").click(function(e) {
  e.preventDefault();
  $t = $(this);
  if($t.hasClass("work-bluescape")) {
    $("#resource").scrollTo(".work.bluescape",300);
    index = 1;
  } else if($t.hasClass("work-xfinity")) {
    $("#resource").scrollTo(".work.xfinity",900);
    index = 6;
  } else if($t.hasClass("work-besterday")) {
    $("#resource").scrollTo(".work.besterday",1500);
    index = 11;
  }
});
