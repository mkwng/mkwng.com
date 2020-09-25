winTop = 0;
winHeight = 0;
mHeight = 0;


state = "home"
$content = $("#content");

scrollFun = function() {
    winTop = $(".work-expanded-inner").scrollTop();
    winHeight = $(".work-expanded-inner").height();
    mHeight = 0;

    $(".plax").moveBg();
}

$(document).ready(function() {
  $("p span").focus();
  $(".vid").fitVids();


  scrollFun();
  $(".work-expanded-inner").bind("scroll resize",scrollFun);


  preload([
      'img/work/aarp/header.jpg',
      'img/work/aarp/body1.jpg',
      'img/work/aarp/endcap.jpg',
      'img/work/aarp/logo-white.svg',
      'img/work/besterday/header.jpg',
      'img/work/besterday/body1.jpg',
      'img/work/besterday/endcap.jpg',
      'img/work/besterday/logo-white.svg',
      'img/work/bluescape/header.jpg',
      'img/work/bluescape/body1.jpg',
      'img/work/bluescape/endcap.jpg',
      'img/work/bluescape/logo-white.svg',
      'img/work/chase/header.jpg',
      'img/work/chase/body1.jpg',
      'img/work/chase/endcap.jpg',
      'img/work/chase/logo-white.svg',
      'img/work/nurun/header.jpg',
      'img/work/nurun/body1.jpg',
      'img/work/nurun/endcap.jpg',
      'img/work/nurun/logo-white.svg',
      'img/work/revolt/header.jpg',
      'img/work/revolt/body1.jpg',
      'img/work/revolt/endcap.jpg',
      'img/work/revolt/logo-white.svg',
      'img/work/xfinity/header.jpg',
      'img/work/xfinity/body1.jpg',
      'img/work/xfinity/endcap.jpg',
      'img/work/xfinity/logo-white.svg',
  ]);

});

showCheck = function(name) {
  if(typeof name == undefined || !name.length) {
    $(".secure").addClass("private");
    $intro.removeClass("visible");
    $("#cb1").attr('checked', false);
    $(".intro-message").typeTo("What, you don't have a name?");
    return;
  } else {
    $(".intro-message").stop().html("");
  }

  switch(name) {
    case "Jennipher Pham":
    case "Square":
    case "Facebook":
    case "Dan Becker":
    case "testing123":
    case "Elizabeth Larki":
    case "Devin Croda":
    case "Kate Wang":
    case "Kyle Scollin":
    case "Renee Park":
case "Bob Wu":
      $(".private").removeClass("private").addClass("secure");
      break;
    default:
      $(".secure").addClass("private");
      break;
  }

  $intro = $(".intro-nda");
  if(!$intro.hasClass("visible")){
    $intro.addClass("visible");
    $intro.find("label span").typeTo(", "+name+",");
  } else {
    $intro.find("label span").typeTo(", "+name+",");
  }
}

var $work = $("#work-expanded");
loadWork = function(work) {
  jQuery.getJSON('work/'+work+'.json',function(data) {
    $work.find(".client img").attr("src","img/work/"+work+"/logo-white.svg");
    $work.find(".client span").html(data.work.title);
    $work.find(".leader").html(data.work.desc);
    $work.find(".work-img.img-header").attr("style","background-image:url('img/work/"+work+"/header.jpg')");
    $work.find(".work-img.img-endcap").attr("style","background-image:url('img/work/"+work+"/endcap.jpg')");
    
    $work.find(".work-text").html("");
    if (typeof data.work.video != "undefined") $work.find(".work-text.body1").append("<div class='vid'>"+data.work.video+"</div>");
    if (typeof data.work.body1 != "undefined") $work.find(".work-text.body1").append(data.work.body1);
    if (typeof data.work.bodyimg != "undefined") $work.find(".work-text.body1").append(data.work.bodyimg);
    if (typeof data.work.body2 != "undefined") $work.find(".work-text.body1").append(data.work.body2);
    if (typeof data.work.body3 != "undefined") $work.find(".work-text.body2").append(data.work.body3);
    if (typeof data.work.site != "undefined") $work.find(".work-text.body2").append("<a target='_blank' class='work-site' href='"+data.work.site+"'>Visit Project</a>");

    setTimeout(function() {
      $("#work-expanded").removeClass("loading");
    },100);
  });

}

$("p span").keypress(function(e) {
  if (e.keyCode == 10 || e.keyCode == 13) {
    e.preventDefault();
    showCheck($(this).html().replace(/^\s+|\s+$/g,''));
  }
});

$("p button").click(function() {
  showCheck($("p span").html().replace(/^\s+|\s+$/g,''))
});

$("#cb1").change(function() {
  if($(this).is(':checked')) {
    setTimeout(function() {$("#work").css("max-height","1200px");},500);
    setTimeout(function() {$.scrollTo('480px',500);},1000)
  }
  else {
    $("#work").css("max-height","0px");
    $.scrollTo(0,500);
  }
});


$("#work a").click(function(e) {
  if(!$(this).hasClass("deactive") && !$(this).hasClass("private")) {
    e.preventDefault();
    crossroads.parse('/work/' + this.href.split('/').pop());
  }
});
$("#work-expanded .close").click(function(e) {
  e.preventDefault();
  crossroads.parse('/');
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}


(function($){
   $.fn.moveBg = function() {
    $(this).each(function(index) {
      var height = $(this).height();
      var top = $(this).position().top;
      var num1 = winHeight - top;
      var num2 = top + height;
      var ratio = 1-Math.max(Math.min(num1 / (num1 + num2),1),0);
      $(this).css({"background-position-y":(ratio*100)+"%"});
    });
   };
}(jQuery));