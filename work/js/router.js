
var route1 = crossroads.addRoute('/work/{id}', function(id){
  loadWork(id);
  $(".work-expanded-inner").scrollTo(0);
  $("#work-expanded").addClass("show");
  $("body").css("overflow","hidden");
  setTimeout(function() {
    scrollFun();
    $(".vid").fitVids();
  },100);
});
var route2 = crossroads.addRoute('/', function(id){
  $("#work-expanded").removeClass("show").addClass("loading");
  $("body").css("overflow","auto");
});