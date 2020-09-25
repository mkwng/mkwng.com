var i, n;            //Current index & number of questions
var $questions, $next, $prev, $inputs, $skip, $inter;


$(document).ready(function() {
  //Initialize the variables
  $questions = $(".question");
  $next = $(".button-next");
  $prev = $(".button-prev");
  $inputs = $("input").hide();
  $skip = $("a.skip");
  i = 0;
  n = $questions.size();
  $inter = $(".interstitial")

  //Once everything starts loading...
  $(window).load(function() {
    $('img.clickable')
      .each(function() {applyLabel($(this));});   //Add captions to each image
    environmentQuestion("init");
    whenQuestion("init");
    questionInit();                               //Initiate all questions
    centerForm();                                 //Center the form
  });
});


function questionInit() {
  //Set up and initialization
  $questions.not(":first-child").css("opacity",.05).hide();          //Hide all but the first
  $prev.hide();                                   //Hide the previous button

  // checkContinue();                                //Check to see if continue button is enabled or disabled

  //Navigation
  $skip.click(nextQuestion);
  $next.click(function() {if(!$(this).hasClass("disabled")) nextQuestion();} );
  $prev.click(function() {if(!$(this).hasClass("disabled")) prevQuestion();} );
  $questions.click(updateChecked);
}

function nextQuestion() {


  var current = i;
  var next = i+1; 
  var interstitial = 0;
  var proceed = 1;
  var flavor;

  switch(current)
  { 
    case 0:
      updatePagination(0);
      $next.text("Continue");
      break;
    case 1:
      if(!$envGroup2.is(":visible")){
        environmentQuestion("next");
        proceed=0;
      } else {
        updatePagination(1);
        interstitial=1;
        flavor="Looks like you're a lover of nature";
      }
      break;
    case 2:
        updatePagination(2);
      break;
    case 3:
      if(!$(".when-group-2").is(":visible")){
        if($("#when-yes").is(':checked')) {
          whenQuestion("forward");
          // checkContinue();
          proceed=0;
        } else {
          $next.text("See destinations");
          updatePagination(3);
        }
      } else {
        updatePagination(3);
        interstitial=1;
        flavor="Tip: Travel is cheaper in the fall";
        $next.text("See destinations");
      }
      break;
    case 4:
      proceed=3;
      loadOut();
      submitForm();
    default:
  }

  if (proceed){    
    $prev.show();                                   //Show the "Go back" button
    $questions.eq(current).hide().css("opacity",0); //Hide current question
    if(interstitial) {
      $prev.addClass("disabled");
      $next.addClass("disabled");
      $questions.eq(next).show();
      $inter.find("h2").text(flavor);
      $inter.appendTo(".question-spacer").fadeIn().delay(2000).fadeOut(function() {
        $questions.eq(next).animate({opacity:1});
        $(this).remove();
        $prev.removeClass("disabled");
        // $next.removeClass("disabled");
      });
    }
    else $questions.eq(next).show().animate({opacity:1});
  } else return;
 
  i = next;
  checkContinue();
}

function prevQuestion() {

  var current = i;
  var next = i-1;
  var proceed = 1;


  switch(current)
  {
    case 1:
      if($envGroup2.is(":visible")) {
        proceed=0;
        environmentQuestion("prev");
      } else {
        updatePagination();
        $prev.hide();
        $next.text("Get Started");
      }
      break;
    case 2:
      updatePagination(0);
      break;
    case 3:
      if($(".when-group-2").is(":visible")){
        proceed=0;
        whenQuestion("backward");
      } else {
        updatePagination(1);
      }
      break;
    case 4:
      updatePagination(2);
      $next.text("Continue");
      break;
    default:
      return false;
  }

  if (proceed){   
    $questions.eq(current).hide().css("opacity",0); //Hide current question
    $questions.eq(next).show().animate({opacity:1});
    i = next;
  }
  
  // checkContinue();
    console.log(i);

}

function submitForm() {
  var url = "form.php"; 
    $.ajax({
           type: "POST",url: url,
           data: $("form").serialize(),             //Serializes the form's elements.
         });
    return false;                                   //Avoid to execute the actual submit of the form.
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
        'top': image.height() - label.innerHeight(),
        'left': 0
    });
}


function checkContinue() {
  var numChecked = 0;
  numChecked = $questions.eq(i).find("input:checked").length;
  if(i==1 && $envGroup1.is(":visible")) {console.log("yes");$next.removeClass("disabled");}
  else if(!numChecked && i!=0) $next.addClass("disabled");
  else $next.removeClass("disabled");
}

var $envGroup1 = $(".env-group-1"); 
var $envGroup2 = $(".env-group-2"); 
function environmentQuestion(action) {
  switch(action) {
    case "init":
      $envGroup2.hide();
      break;
    case "next":
      $envGroup1.css({position:"absolute",top:0}).animate({left:"-=1200px"},800, function() {$(this).hide();checkContinue();});
      $envGroup2.show().css({position:"relative",left:"1200px"}).animate({left:"0px"},800);
      break;
    case "prev":
      $envGroup1.show().css({position:"relative",left:"-1200px"}).animate({left:"0px"},800);
      $envGroup2.css({position:"absolute",top:0}).animate({right:"-=1200px",left:"+=1200px"},800, function() {$(this).hide();checkContinue();})
      break;
    default:
      return;
  }
}

var $page = $(".question-pagination .page"); 
function updatePagination(i) {
  $page.removeClass("active complete");
  $page.eq(i).addClass("active");
}

var $people = $(".question-illustration img");
function peopleActive(i) {
  switch(i) {
    case 0: //Myself
      $people.eq(0).addClass("hovering");
      $people.eq(1).addClass("removing");
      $people.eq(2).addClass("removing");
      $people.eq(3).addClass("removing");
      $people.eq(4).addClass("removing");
      $people.eq(5).addClass("removing");
      $people.eq(6).addClass("removing");
      break;
    case 1: //partner
      $people.eq(0).addClass("hovering");
      $people.eq(1).addClass("hovering");
      $people.eq(2).addClass("removing");
      $people.eq(3).addClass("removing");
      $people.eq(4).addClass("removing");
      $people.eq(5).addClass("removing");
      $people.eq(6).addClass("removing");
      break;
    case 2: //family
      $people.eq(0).addClass("hovering");
      $people.eq(1).addClass("hovering");
      $people.eq(2).addClass("hovering");
      $people.eq(3).addClass("hovering");
      $people.eq(4).addClass("removing");
      $people.eq(5).addClass("hovering");
      $people.eq(6).addClass("hovering");
      break;
    case 3: //group
      $people.eq(0).addClass("hovering");
      $people.eq(1).addClass("hovering");
      $people.eq(2).addClass("hovering");
      $people.eq(3).addClass("hovering");
      $people.eq(4).addClass("hovering");
      $people.eq(5).addClass("removing");
      $people.eq(6).addClass("removing");
      break;
    default:
      $people.removeClass("hovering removing");
  }
}
$(".question-who .question-option").each(function(index) {
  $(this).hover(function() {
    peopleActive(index);
  }, function() {
    peopleActive();
  }).click(function() {
    $people.filter(".removing").removeClass("permanent");
    $people.filter(".hovering").addClass("permanent");
  });
});

var $form = $("form");
var $window = $(window);
function centerForm() {
  $form.css({
    left: ($window.width()-$form.outerWidth())/2 + "px",
    top: ($window.height()-$form.outerHeight())/2 + "px",
    margin: 0
  });
}

function loadOut() {
  $("form").fadeOut();
  $inter.find("h2").text("Finding destinations...");
  $inter.find("p").text("One second as we personalize your results");
  $inter.appendTo("body").fadeIn().delay(2000).fadeOut(function() {
    $("body").css("background","url(img/bg.jpg) no-repeat center top, url(img/bg-pattern.gif) repeat-x top");
    $("#cover").fadeOut();
  });
}