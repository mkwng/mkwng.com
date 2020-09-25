
$("section.video").ready(function() {
  $media = $(this).find(".media");
  $media.addClass("loading");
  $media.find(".spinner").addClass("visible");
  setTimeout(function() {
    $media.removeClass("loading");
    $media.find(".spinner").removeClass("visible");
    var video = $media.find("video").addClass("visible").get(0);
    // video.playbackRate = 0.25;
    video.pause();
  },1000);
});

// slideStatus = setTimeout(function(){},0);
//     $(".article-buttons").each(function() {
//       $t = $(this);
//       pTop = $t.data("parent").offset().top;
//       pHeight = $t.data("parent").height()
//       tHeight = $t.height();
//       if(pTop>mHeight) {
//         $t.css({top:pTop});
//       } else if(pTop + pHeight < tHeight + mHeight) {
//         // console.log("true");
//         $t.css({top:pTop + pHeight - tHeight});
//       }else 
//       $t.css({top:mHeight});
//     });
  // $("section.video").each(function() {
  //   $media = $(this).find(".media");
  //   $media.addClass("loading");
  //   $media.find(".spinner").addClass("visible");

  //   var slidePos = 0;

  //   $imgs = $(this).find("img.preview");

  //   function autoSlide() {
  //     $imgs.eq(slidePos).css("opacity","1");
  //     var remove = slidePos % $imgs.length - 2;
  //     if (remove < 0) remove += 16;
  //     $imgs.eq(remove).css("opacity","0");
  //     slidePos = (slidePos+1) % 16;
  //     slideStatus = setTimeout(autoSlide,1000);
  //   }

  //   slideStatus = setTimeout(function() {
  //     $media.removeClass("loading");
  //     $media.find(".spinner").removeClass("visible");
  //     autoSlide();
  //   },1000);

  // });

var ytReady = false;
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


player = new Array();
function onYouTubeIframeAPIReady() {
  ytReady =true;
}

function newVideo(index,id,video) {
  if (ytReady) {
    player[index] = new YT.Player(id, {
      videoId: video,
      playerVars: {
        'controls': 0,
        'showinfo':0,
        'enablejsapi':1,
        'modestbranding':1,
        'rel':0,
        'autohide':1,
        'autoplay':1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

function onPlayerReady(event) {
  $(".section-content").fitVids();
}


var done = false;
function onPlayerStateChange(event) {
    if(event.data === 0) {          
      $(".video-buttons").find(".close-button").click();
    }
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}
function stopVideo() {
  element = null;
  for (var i = 1; i <= 3; i++) {
    element = player[i];
    // Do something with element i.
    if(typeof element != "undefined")
      element.stopVideo();
  }
}










