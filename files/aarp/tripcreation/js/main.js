function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

preload([
  'img/state1/top1.jpg',
  'img/state1/top2.jpg',
  'img/state1/top3.jpg',
  'img/state1/top4.jpg',
  'img/state1/top5.jpg',
  'img/state1/top6.jpg',
  'img/state1/middle1.jpg',
  'img/state1/middle2.jpg',
  'img/state1/middle3.jpg',
  'img/state1/middle4.jpg',
  'img/state1/middle5.jpg',
]);

$('.top.one, .top.two, .top.thr, .top.fou, .top.fiv, .top.six').click(function() {                             
    this.className = {
       "top six" : "top six",
       "top one" : "top two",
       "top two" : "top thr",
       "top thr" : "top fou",
       "top fou" : "top fiv",
       "top fiv" : "top six",
    }[this.className];
});

$('.middle.one, .middle.two, .middle.thr, .middle.fou, .middle.fiv').click(function() {                             
    this.className = {
       "middle fiv" : "middle fiv",
       "middle one" : "middle two",
       "middle two" : "middle thr",
       "middle thr" : "middle fou",
       "middle fou" : "middle fiv",
    }[this.className];
});

$('.overlay').click(function() {$(this).hide();});



$('.left').click(function() {
  console.log($(this).hasClass("one"));
  if($(this).hasClass("one")) {$(this).removeClass("one").addClass("two");$('.right').removeClass("zer").addClass("fou");}
  else if($(this).hasClass("two")) {$(this).removeClass("two").addClass("thr");$('.right').removeClass("fou").addClass("zer");}
  else if($(this).hasClass("thr")) {$(this).removeClass("thr").addClass("fou");$('.right').removeClass("zer").addClass("one");}
  else if($(this).hasClass("fou")) {$(this).removeClass("fou").addClass("fiv");$('.right').removeClass("one").addClass("two");}
  else if($(this).hasClass("fiv")) {$(this).removeClass("fiv").addClass("six");$('.right').removeClass("two").addClass("thr");}
  else if($(this).hasClass("six")) {
    $('.state-2').hide();
    $('.state-1').show();
  }
  // if ($(this).hasClass("one")) {
  //   $('.right.zer').removeClass("zer").addClass("one");
  // }
});


$('.state-1').on('click','.middle.thr',function() {
  $('.state-1').hide();
  $('.state-2').show();
});
// $('.state-2').on('click','.left.sev',function() {
//   $('.state-1').show();
//   $('.state-2').hide();
// });