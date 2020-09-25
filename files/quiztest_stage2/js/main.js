var i;            //Current question index
var n;            //Number of questions
var $questions;
var $next;
var $prev;
var $inputs;
var $whenQuestions;
var $whenTimeline;
var $whenTimelineSlider;
var $skip;


$(document).ready(function() {
  $questions = $(".question");
  $next = $(".button-next");
  $prev = $(".button-prev");
  $inputs = $("input");
  $whenQuestions = $questions.filter(".question-7").find(".question-option");
  $whenTimeline = $(".timeline-background .large-1");
  $whenTimelineSlider = $(".timeline-active > .columns")
  $skip = $("a.skip")
  i = 0;
  n = $questions.size();
  $(window).load(function() {
    $('img.clickable').each(function() {
      applyLabel($(this));
    });
    questionInit();
  });
});


function questionInit() {
  $questions.not(":first-child").hide();
  $prev.hide();

  checkContinue();

  $skip.click(function() {
    nextQuestion();
  });
  $next.click(function() {
    if(!$(this).hasClass("disabled")) nextQuestion();
  });
  $prev.click(function() {
    prevQuestion();
  });

  $questions.click(function() {
    updateChecked();
  });

  $whenQuestions.click(function() {
    moveTimeline($(this).index()-1)
  });
  $whenTimeline.click(function() {
    var i = Math.floor($(this).index()/3);
    $whenQuestions.filter(":eq("+i+")").find("input").prop('checked',true);
    $whenQuestions.filter(":eq("+i+")").click();
  });

}

function nextQuestion() {


  var current = i;
  var next = i+1; 
  $prev.show();                     //Show the "Go back" button
  $questions.eq(current).hide();    //Hide the previous question

  switch(current)
  {
    case 2:
      var what = $questions.eq(i).find("input:checked").val();
      //Skip over the cities questions if it's outdoors
      if(what=="outdoors" || what=="both") next = 5;
      break;
    case 4:
      next = 7;
      break;
    case n-3:
      $next.text("See destinations");
      break;
    case n-2:
      $next.hide();
      $prev.hide();
      submitForm();
      $("form").fadeOut();
      $("#cover").fadeOut();
      $("body").css("background","url(img/bg.jpg) no-repeat center top, url(img/bg-pattern.gif) repeat-x top");
      break;
    default:
      $next.text("Continue");
  }

  $questions.eq(next).show();



  i = next;
  checkContinue();
  
}

function prevQuestion() {

  var current = i;
  var next = i-1;

  $questions.eq(current).hide();

  switch(current)
  {
    case 1:
      $prev.hide();
      break;
    case 2:
      break;
    case 5:         //If you are in the outdoor flow, skip the cities
      next = 2;
      $next.text("Continue");
      break;
    case 7:         //If we're going backwards, and we're in the city flow, make sure we skip the outdoor questions
      var what = $questions.eq(2).find("input:checked").val();
      if(what=="city") next = 4;
      $next.text("Continue");
      break;
    default:
      $next.text("Continue");
  }

  $questions.eq(next).show();
  i = next;
  checkContinue();

}

function submitForm() {
  var url = "form.php"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("form").serialize(), // serializes the form's elements.
           success: function(data)
           {
               // alert(data); // show response from the php script.
           }
         });

    return false; // avoid to execute the actual submit of the form.
}

function updateChecked() {
    var $checked = $inputs.filter(":checked");
    $checked.parents("div").addClass("active");
    $inputs.not(":checked").parents("div").removeClass("active");
    checkContinue();
}

function applyLabel(image)
{
    image.wrap('<div class="image-container">');
    var label = $('<div class="image-caption">').html(image.prop('alt'));

    label.insertAfter(image);

    label.css({
        'width': image.width(),
        'top': image.height() - label.innerHeight() -3,
        'left': 0
    });
}

function moveTimeline(index) {
  $whenTimelineSlider.css("left",25*index+"%");
}

function checkContinue() {
  var numChecked = 0;

  numChecked = $questions.eq(i).find("input:checked").length;

  console.log(numChecked);

  if(!numChecked && i!=0) $next.addClass("disabled");
  else $next.removeClass("disabled");

}

