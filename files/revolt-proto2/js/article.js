
$(".cta, section h1, .media").click(function() {
  $section = $(this).closest("section");

  $section.not(".active").openSection();
  $section.not(".active").find(".cta").css({"opacity":0,"pointer-events":"none"});


});


