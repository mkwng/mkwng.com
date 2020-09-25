
winTop = 0;
winHeight = 0;
mHeight = 0;
$placeholder = $('<div class="placeholder"></div>');
$ad = $('<div class="article-ad"></div>');
$articleAd = undefined;
stickyState = false;
stickyAdjust = 0;
stickyToggle = function(toggle) {
  if (stickyState == false && toggle == true) {
    stickyState = toggle;
    $section = $(".yt-player").closest(".section-content");
    if(!$section.hasClass("sticky")) {
      $section.closest("section").addClass("sticky");
      $videoButtons = $(".video-buttons").addClass("sticky");
      $videoButtons.data("bar").addClass("sticky");
      $video = $(".yt-player").closest(".section-content").after($placeholder);
      $placeholder.css("height",$video.height());
      $video.addClass("sticky").removeClass("intro");
      $("#logo").addClass("sticky");
      $(".menu-buttons").addClass("sticky");
      // scrollFun();
    }
  } else if(stickyState == true && toggle == false) {
    stickyState = toggle;
    if($section.hasClass("sticky")) {
      $section.closest("section").removeClass("sticky");
      $videoButtons = $(".video-buttons").removeClass("sticky");
      $videoButtons.data("bar").removeClass("sticky").css("top","auto");
      $(".yt-player").closest(".section-content").removeClass("sticky").css("top","auto");
      $("#logo").removeClass("sticky");
      $(".menu-buttons").removeClass("sticky");
      $placeholder.detach();
      // scrollFun();
    }
  }
}

scrollFun = function() {
    winTop = $(".content-container").scrollTop();
    winHeight = $(window).height();
    mHeight = 0; //$(".menu-buttons").height() + parseInt($(".menu-buttons").css("margin-top").replace(/[^-\d\.]/g, ''));

    $("section, .alert").checkViewable();
    $("section.news.tier-1 div.media, section.ad.tier-1 div.media").moveBg();
    $("img.par-bg").parallaxBg();

    $(".article-buttons").keepUp();
    $(".article-ad").keepAd();
    $("#logo").checkBig();

    $("section.video").checkSticky();
    $(".section-content.sticky").css("top",winTop - stickyAdjust);
    $(".timestamp").timestampParallax();
}

createDiamonds = function() {
  $diamonds = $('<div class="after"></div>');
  $line = $('<div class="line"></div>');
  $(".timestamp").each(function() {
    $thisDiamond = $diamonds.clone().appendTo(this);
    var center = 10 + ($("nav").width() - $thisDiamond.outerWidth())/2;
    var left =  -26 - $(this).closest(".header").offset().left;
    $thisDiamond.css({left: left});
    $thisLine = $line.clone().css({
      left: left + $thisDiamond.outerWidth(),
      width: $(this).offset().left - 32
    }).appendTo(this);
  });
}

$(document).ready(function() {
  scrollFun();
  $(".content-container").bind("scroll resize",function() {
    scrollFun();
  });

  createDiamonds();
});

$(".menu-buttons-menu").click(function() {
  $(".container").toggleClass("show-menu");
  setTimeout(function() {
    $(".container").one("click",function(e){
      e.preventDefault();
      $(this).removeClass("show-menu");
    });
  },1);
  return false;
});

$(".menu-buttons-new").click(function() {
  $(".content-container").scrollTo(0,500);
  $(this).removeClass("new-items").find("a").html("0");
});
incrementNew = function() {
  $t = $(".menu-buttons-new");
  $a = $t.find("a");
  $t.addClass("new-items");
  $a.html(parseInt($a.html()) + 1);
}
function randRange(data) {
       var newTime = data[Math.floor(data.length * Math.random())];
       return newTime;
}
function toggleSomething() {
       var timeArray = new Array(20000, 30000, 150000, 85000, 80000, 5000, 55000, 60000);

       // do stuff, happens to use jQuery here (nothing else does)
       incrementNew();

       clearInterval(timer);
       timer = setInterval(toggleSomething, randRange(timeArray));
}
var timer = setInterval(toggleSomething, 5000);
// 1000 = Initial timer when the page is first loaded



$closeButton = $('<div class="article-buttons"><a class="close-button" href="#">Close</a><a class="share-button" href="#">Share</a></div>');
$activeBar = $('<div class="active-bar"></div>');
$spinner = $('<div class="spinner"></div>');
$ytContainer = $('<div id="player"></div>');
animateBarTimeout = setTimeout(function() {},0);
animateBarPrev = 0;
(function($){
  animateBar = function(t,b) {
      var height = $(t).height();
      if (animateBarPrev != height || animateBarPrev == 316){
        animateBarPrev = height;
        animateBarTimeout = setTimeout(function() {animateBar($(t),$(b))},20);
      }
      $(b).css("max-height",height);
  };
  openArticle = function($section) {
      var $article = $section.find(".section-content");
      $article.slideDown(function() {
        $article.find(".section-content-song").addClass("visible");
        var top = $article.find(".section-content-song").length ? $section.position().top + $article[0].offsetTop-100 : $section[0].offsetTop;
        $(".content-container").scrollTo(top,500);
      });
  };
  openVideo = function($section,$thisBar) {
      var $media = $section.find(".media");
      $media.addClass("loading");
      $media.find(".spinner").addClass("visible");
      index = $section.attr("data-video-index");

      $video = $section.find(".section-content");
      $video.append('<div class="yt-player" id="player-'+index+'"></div>');
      $("section.sticky").toggleStick(false);
      stopVideo();
      newVideo(index,'player-'+index,$section.attr("data-video"));
      $media.find('video')[0].pause();
      setTimeout(function() {
        $media.removeClass("loading");
        $media.find(".spinner").removeClass("visible");
        $section.find(".header,.media").slideUp();
        $video.slideDown(function() {
        });
        animateBarPrev = 0;
        animateBar($section,$thisBar);
        $(".content-container").scrollTo($section[0].offsetTop,500);
      },1000);
  };
  addAd = function($section) {
    var $thisAd = $ad.clone();
    if($section.hasClass("push-1") || $section.hasClass("push-2"))
      $thisAd.addClass("left");
    $thisAd.addClass("visible").data("article",$section).prependTo($("#content"));
    $section.data("ad",$thisAd);
  };
  removeAd = function($ad) {
    $ad.data("article").data("ad",undefined);
    $ad.animate({opacity:"0"},500,function() {
      $(this).remove();
    });
  }

   $.fn.checkBig = function() {

    if(winTop>100) {
      $(this).addClass("shrink");
    } else {
      $(this).removeClass("shrink");
    }
   }
   $.fn.checkSticky = function() {
    $(this).each(function() {
      var $section = $(this);
      var $content = $section.find(".section-content");
      var $player = $section.find(".yt-player");
      if(!$player.length) return false;
      if($content.hasClass("sticky")){
        if($(".placeholder").height() > 0 - $(".placeholder").offset().top)
          $section.toggleStick(false);
      } else {
        stickyAdjust = $section.position().top;
        if(player[parseInt($section.attr("data-video-index"))].getPlayerState()!=1) return false;
        if($player.height() < 0 - $content.offset().top)
          $section.toggleStick(true);
      }
    });
   };
   $.fn.toggleStick = function(toggle) {
    $(this).each(function() {
      var $section = $(this);
      var $content = $section.find(".section-content");
      var $player = $section.find(".yt-player");
      if (stickyState == false && toggle == true) {
        stickyState = toggle;
        if(!$content.hasClass("sticky")) {
          $section.addClass("sticky");
          $videoButtons = $(".video-buttons").addClass("sticky");
          $videoButtons.data("bar").addClass("sticky");
          $content.after($placeholder);
          $placeholder.css("height",$content.height());
          $content.addClass("sticky").removeClass("intro");
          $("#logo").addClass("sticky");
          $(".menu-buttons").addClass("sticky");
          // scrollFun();
        }
      } else if(stickyState == true && toggle == false) {
        stickyState = toggle;
        if($content.hasClass("sticky")) {
          $section.removeClass("sticky");
          $videoButtons = $(".video-buttons").removeClass("sticky");
          $videoButtons.data("bar").removeClass("sticky").css("top","auto");
          $content.removeClass("sticky").css("top","auto");
          $("#logo").removeClass("sticky");
          $(".menu-buttons").removeClass("sticky");
          $placeholder.detach();
          // scrollFun();
        }
      }
    });
   };
   $.fn.keepUp = function() {
    $(this).each(function() {
      $t = $(this);
      pTop = $t.data("parent").position().top;
      pHeight = $t.data("parent").height()
      tHeight = $t.height();
      tTop = $t.offset().top;
      if($t.hasClass("sticky")) {
        $t.css({top:winTop - pTop});
      } else if(pTop+pHeight >= winTop + tHeight) {
        var top = stickyState ? winTop - pTop + 115 :  winTop - pTop;
        $t.css({top:Math.max(top,0)});
      } 
    });
   };
   $.fn.keepAd = function() {
    $(this).each(function() {
      var $t = $(this);
      var $article = $(this).data("article");
      var aTop = $article.position().top;
      var tTop = $t.outerHeight(true)

      if($article.hasClass("tier-1") || $article.hasClass("tier-2")) {
        var $content = $article.find(".section-content");
        aTop += $content.position().top;
        var aHeight = $content.find(".section-content-text").outerHeight(true);
      } else {
        var aHeight = $article.outerHeight();
      }
      var tWinTop = stickyState ? winTop + 115 : winTop;
      var tATop = stickyState ? aTop + 115 : aTop;
      if (tTop+winTop >= aTop+aHeight) {
        return false;
      } else if(aTop < winTop) {
        $t.css("top",tWinTop);
      } else {
        $t.css("top",aTop);
      }
    });
   }
   $.fn.moveBg = function() {
    $(this).each(function(index) {
      var height = $(this).height();
      var top = $(this).closest("section").offset().top;
      var num1 = winHeight - top;
      var num2 = top + height;
      var ratio = 1-Math.max(Math.min(num1 / (num1 + num2),1),0);
      $(this).css({"background-position-y":(ratio*100)+"%"});
    });
   };

   $.fn.parallaxBg = function() {
    $(this).each(function(index) {
      $t = $(this);
      tTop = $t.position().top;
      $t.css({
        "margin-top": 0.2*(winTop - tTop)
      });
    });
   };

   $.fn.checkViewable = function() {
    $(this).each(function() {
      $t = $(this);
      var tTop = $t[0].offsetTop;
      var tHeight = $t.height();
      if(tTop-30>winTop+winHeight){
        $t.addClass("future");
      } else if(tTop+tHeight<winTop-30){
        $t.addClass("past");
      } else if(tTop+tHeight>winTop+300 && tTop+300 < winTop+winHeight) {
        $t.removeClass("future past").addClass("present");
        if ($t.find('video').length) {$t.find('video')[0].play();}
      } else {
        $t.removeClass("future past present");
        if ($t.find('video').length) {$t.find('video')[0].pause();}
      }
    });
   },
   $.fn.activeBar = function() {
    var $thisBar;
    var $thisClose;
    $(this).each(function() {
      var $t = $(this);

      $thisBar = $activeBar.clone().css({"max-height":"9999px",left:0 - $t.offset().left}).data("parent",$t);
      $thisClose = $closeButton.clone().data("parent",$t).data("bar",$thisBar);

      if($t.hasClass("video")) {
        $thisClose.addClass("video-buttons");
      }

      $t.append($thisClose);
      $t.prepend($thisBar);
      scrollFun();

      $thisClose.find(".close-button").one("click",function() {

        $mediavid = $thisClose.data("parent").find('video');
        if($mediavid.length) $mediavid[0].play();

        $thisClose.data("parent").closeSection();
        var $bar = $thisClose.data("bar");
        setTimeout(function() {
          $bar.animate({"height":$t.find(".header").height()},function() {$(this).remove();});
        },200);
        $thisClose.fadeOut(function() {$thisClose.remove()});

      });
      // console.log("activeBar:",$thisBar);
    });
    return $thisBar;
   },
   $.fn.closeSection = function() {
    $(this).each(function() {
      var $section = $(this);
      var $article = $section.find(".section-content");
      if($section.data("ad")) removeAd($section.data("ad"));
      $("section").removeClass("future");
      $article.find(".section-content-song").removeClass("visible");
      setTimeout(function() {

        if($section.position().top>=winTop) {
          var top = 0;
        } else
          var top = $article.height();
        if(!$section.hasClass("video")) $(".content-container").scrollTo("-="+top,{duration:500,easing:"swing"});
        if($section.hasClass("video")){
          $section.find(".header,.media").slideDown();
          if ($section.find(".section-content").hasClass("sticky")) {
            stickyToggle(false);
            $(".sticky").removeClass("sticky");
          }
        }
        $section.find(".placeholder").remove();
        $article.slideUp(500,function(){
          $section.removeClass("active").addClass("visited").find(".cta").css({opacity:1,"pointer-events":"auto"});
          $section.find(".yt-player, .fluid-width-video-wrapper").remove();
          player[parseInt($section.attr("data-video-index"))] = undefined;
          scrollFun();
        });
      },200);
    });
    return $(this);
   },
   $.fn.timestampParallax = function() {
    $(this).each(function(i) {
      $t = $(this);
      var tTop = $t.position().top + $t.closest("section").position().top;
      var tHeight = $t.height();
      var num1 = ((winTop+winHeight) - tTop);
      var num2 = (tTop+tHeight - winTop);
      var ratio = Math.max(Math.min(num1 / (num1 + num2),1),0) - .5;
      $t.css({
        'margin-top':-ratio * 50 + "px",
        'margin-bottom':ratio * 50 + "px"
      });

      // if(tTop-30>winTop+winHeight){
      //   $t.addClass("future");
      // } else if(tTop+tHeight<winTop-30){
      //   $t.addClass("past");
      // } else if(tTop+tHeight>winTop+300 && tTop+300 < winTop+winHeight) {
      //   $t.removeClass("future past").addClass("present");
      //   if ($t.find('video').length) {$t.find('video')[0].play();}
      // } else {
      //   $t.removeClass("future past present");
      //   if ($t.find('video').length) {$t.find('video')[0].pause();}
      // }
    });
   },
   $.fn.openSection = function() {
    $(this).each(function() {
      var $section = $(this);
      $section.addClass("active").removeClass("visited");
      var $thisBar = $section.activeBar();
      if($section.hasClass("news")) {
        openArticle($section);
        addAd($section);
      }
      else if($section.hasClass("video"))
        openVideo($section,$thisBar);
      animateBarPrev = 0;
      animateBar($section,$thisBar);
    });
    return $(this);
  }
}(jQuery));