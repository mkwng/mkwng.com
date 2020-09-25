$( "#slider1" ).slider({
  range: false,
  values: [ 36 ],
  slide: function(event,ui) {
    if(ui.values >= 0 && ui.values <8) setCalDate(0);
    else if(ui.values >= 8 && ui.values <16) setCalDate(1);
    else if(ui.values >= 16 && ui.values <32) setCalDate(2);
    else if(ui.values >= 32 && ui.values <40) setCalDate(3);
    else if(ui.values >= 40 && ui.values <48) setCalDate(4);
    else if(ui.values >= 48 && ui.values <56) setCalDate(5);
    else if(ui.values >= 56 && ui.values <64) setCalDate(6);
    else if(ui.values >= 64 && ui.values <72) setCalDate(7);
    else if(ui.values >= 72 && ui.values <80) setCalDate(8);
    else if(ui.values >= 80 && ui.values <88) setCalDate(9);
    else if(ui.values >= 88 && ui.values <96) setCalDate(10);
    else if(ui.values >= 96 && ui.values <100) setCalDate(11);
  }
});

$( "#slider2" ).slider({
  range: false,
  values: [ 12 ],
  slide: function(event,ui) {
    if(ui.values == 0) setCalRange("day");
    else if(ui.values > 0 && ui.values <20) setCalRange("days");
    else if(ui.values >= 20 && ui.values <40) setCalRange("week");
    else if(ui.values >= 40 && ui.values <60) setCalRange("weeks");
    else if(ui.values >= 60 && ui.values <80) setCalRange("month");
    else if(ui.values >= 80 && ui.values <=100) setCalRange("months");
  }
});

var $calendar = $(".calendar-month")
var $calLeft, $calRight;

function initCal() {
  left = $calendar.position().left-$calendar.innerWidth() - 10;
  right = $calendar.position().left+$calendar.innerWidth() + 10;
  $calLeft = $calendar.clone().appendTo(".when-group-2 .large-8").css({
    position: "absolute",
    top: $calendar.position().top + "px",
    left: left + "px"
  }).removeClass("day days week weeks month months");
  $calRight = $calendar.clone().appendTo(".when-group-2 .large-8").css({
    position: "absolute",
    top: $calendar.position().top + "px",
    left: right + "px"
  }).removeClass("day days week weeks month months");
}

var $calDateText = $(".when-group-2 .when h3 span");
var $calRangeText = $(".when-group-2 .long h3 span");

function setCalRange(range) {
  switch(range) {
    case "day":
      $calendar.removeClass("day days week weeks month months").addClass("day");
      $calLeft.removeClass("day days week weeks month months");
      $calRight.removeClass("day days week weeks month months");
      $calRangeText.text("Daytrip");
      break;
    case "days":
      $calendar.removeClass("day days week weeks month months").addClass("days");
      $calLeft.removeClass("day days week weeks month months");
      $calRight.removeClass("day days week weeks month months");
      $calRangeText.text("A few days");
      break;
    case "week":
      $calendar.removeClass("day days week weeks month months").addClass("week");
      $calLeft.removeClass("day days week weeks month months");
      $calRight.removeClass("day days week weeks month months");
      $calRangeText.text("A week");
      break;
    case "weeks":
      $calendar.removeClass("day days week weeks month months").addClass("weeks");
      $calLeft.removeClass("day days week weeks month months");
      $calRight.removeClass("day days week weeks month months");
      $calRangeText.text("A few weeks");
      break;
    case "month":
      $calendar.removeClass("day days week weeks month months").addClass("month");
      $calLeft.removeClass("day days week weeks month months");
      $calRight.removeClass("day days week weeks month months");
      $calRangeText.text("A month");
      break;
    case "months":
      $calendar.removeClass("day days week weeks month months").addClass("month");
      $calLeft.removeClass("day days week weeks month months").addClass("month");
      $calRight.removeClass("day days week weeks month months").addClass("month");
      $calRangeText.text("2 months or more");
      break;
    default:
      return;
  }
}

var months = ["January","February","March","April","May","June","July","August","Sept","October","November","December"];
function setCalDate(range) {
  $calendar.find("p").text(months[range]);
  $calLeft.find("p").text(range>0 ? months[range-1] : months[11]);
  $calRight.find("p").text(range<11 ? months[range+1] : months[0]);

  if(range>=0 && range < 2) $calDateText.text("Winter");
  else if(range>=2 && range < 5) $calDateText.text("Spring");
  else if(range>=5 && range < 8) $calDateText.text("Summer");
  else if(range>=8 && range < 11) $calDateText.text("Fall");
  else if(range>=11) $calDateText.text("Winter");
}

function whenQuestion(action) {
  switch(action) {
    case "init":
      initCal();
      $(".when-group-2").hide();
      break;
    case "forward":
      $(".question-time .question-title p").fadeOut();
      $(".when-group-1").css({position:"absolute"}).fadeOut(function() {
        $(".when-group-2").css({position:"relative"}).fadeIn();
      });
      break;
    case "backward":
      $(".when-group-2").css({position:"absolute"}).fadeOut(function() {
        $(".when-group-1").css({position:"relative"}).fadeIn();
        $(".question-time .question-title p").fadeIn();
      });
      break;
    default:
      return false;
  }
}

