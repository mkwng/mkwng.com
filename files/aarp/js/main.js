var i;            //Current question index
var n;            //Number of questions
var $questions;
var $next;
var $prev;
var $inputs;
var $whenQuestions;
var $whenTimeline;


$(document).ready(function() {
  $questions = $(".question");
  $next = $(".button-next");
  $prev = $(".button-prev");
  $inputs = $("input");
  $whenQuestions = $questions.filter(".question-7").find(".question-option");
  $whenTimeline = $(".timeline-background .large-1");
  i = 0;
  n = $questions.size();
  $(window).load(function() {
    $('img').each(function() {
      applyLabel($(this));
    });
    questionInit();
  });
});


function questionInit() {
  $questions.not(":first-child").hide();
  $prev.hide();
  // $inputs.hide();
  $next.click(function() {
    nextQuestion();
  });
  $prev.click(function() {
    prevQuestion();
  });

  $questions.click(function() {
    updateChecked();
    // console.log($(this));
    // if($(this).index()==6) console.log("yes");
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
  $prev.show();

  $questions.eq(current).hide();

  //Last page, submit form
  if(current==n-2) {

    $next.hide();
    $prev.hide();
    submitForm();

  }

  //Branching question
  else if(i==1) {
    var what = $questions.eq(i).find("input:checked").val();
    // console.log(what);
    if(!what) next = current;

    //Skip over the cities questions if it's outdoors
    else if(what=="outdoors" || what=="both") next = 4;
  }

  //Skip over the outdoors questions if it's cities
  else if(i==3) {
    next = 6;
  }

  $questions.eq(next).show();
  i = next;
  
  // console.log(i);
}

function prevQuestion() {

  var current = i;
  var next = i-1;

  $questions.eq(current).hide();

  //First page, no more previous button
  if(next==0) {
    $prev.hide();
  }

  //If you are in the outdoor flow, skip the cities
  else if(i==4) next = 1;
  //If we're going backwards, and we're in the city flow, make sure we skip the outdoor questions
  else if(i==6) {
    var what = $questions.eq(1).find("input:checked").val();
    // console.log("it is " + what);
    if(what=="city") next = 3;
  }

  $questions.eq(next).show();
  i = next;

  // console.log(i);
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
}

function applyLabel(image)
{
    image.wrap('<div class="image-container">');
    var label = $('<div class="image-caption">').html(image.prop('alt'));

    label.insertAfter(image);

    label.css({
        'top': image.height() - label.innerHeight() -3,
        'left': image.width() / 2 - label.innerWidth() / 2
    });
}

var $whenTimelineSlider = $(".timeline-active > .columns");
function moveTimeline(index) {
  $whenTimelineSlider.css("left",25*index+"%");
}





