var w = $(window);
var header = $("#header");
var about = $("#about");
var contact = $("#contact");
var noMessages = ["Why are you even here, then?","I feel like I'm wasting my bandwith on you.","That makes me kind of sad, honestly.","Well, we can still be friends&hellip;",":'(","You're always welcome to reconsider.","I can't believe you clicked that.","Seriously, get in touch.","Damn it.","Well, that sucks.","Hey, if you change your mind, I'm here.","Sending you to foxnews.com&hellip;"]

var ss = $(".work-detail-screenshot");
var sf = $(".work-detail-frame");
var se = $(".work-detail-empty");
var sc = $(".work-detail-container");
var ssPos;
var delta;


$(document).ready(function() {
	resizeHeader();
	w.resize(resizeHeader);

	if(!Modernizr.touch) headerParallax();
	w.scroll(function() {
		if(!Modernizr.touch) headerParallax();
		ssPos = ss.outerHeight() - parseInt(se.css("top"));
		// console.log(ssPos);
		lockScreenshotFrame();
	});
	// }


	w.on('touchmove',function() {
		ssPos = ss.outerHeight() - parseInt(se.css("top"));
		console.log(ssPos);
		lockScreenshotFrame();
	});
	w.on('touchend',function() {
		// alert("hello");
		curScroll = w.scrollTop();
		test();
		// var t=setTimeout(function(){alert("Hello")},3000)
		// setTimeout(function() {
		// 	delta = curScroll - w.scrollTop();
		// 	alert(delta);
		// 	if(Math.abs(delta)>0) momentumScrollFix();
		// },10);
	});
	function test() {
		setTimeout(function() {console.log("debugging");},300);
	}

	$("a.comingsoon").click(function() {
		return false;
	});
	simple_tooltip("a.comingsoon","tooltip");


	contact.find(".no").click(contactButtonNo);

	var p=0
	header.find(".header-link-1").click(function() {
		replaceContent($(this),"a little of everything, from IA to visual design, and even a little development");
		if(++p>2) showProfiles();
		console.log(p);
	});
	header.find(".header-link-2").click(function() {
		replaceContent($(this),"great people and companies like Sony, Google, and Apple");
		if(++p>2) showProfiles();
		console.log(p);
	});
	header.find(".header-link-3").click(function() {
		replaceContent($(this),"next on the list? Let’s get in contact.");
		if(++p>2) showProfiles();
		console.log(p);
	});

	function showProfiles() {
		setTimeout(function() {$(".profiles").slideDown("slow");},500);
	}

});

var i = 0;
function replaceContent(originalContent,newText) {
	originalContent.wrap('<span class="new new-'+i+'" />').remove();
	$(".new-"+i).html(newText);
	i++;
}

function momentumScrollFix() {
	alert("yes");
}

function lockScreenshotFrame() {
	wScroll = w.scrollTop();
	if (wScroll>ssPos) sf.css({position:"absolute",top:ssPos-parseInt(sc.css("margin-top"))+"px"});
		else sf.css({position:"fixed",top:"0px"});
}

function simple_tooltip(target_items, name){
 $(target_items).each(function(i){
		$("body").append("<div class='"+name+"' id='"+name+i+"'><p>"+$(this).attr('title')+"</p></div>");
		var my_tooltip = $("#"+name+i);

		$(this).removeAttr("title").mouseover(function(){
				my_tooltip.stop().css({display:"none"}).fadeIn(400);
		}).mousemove(function(kmouse){
				my_tooltip.css({left:kmouse.pageX-45, top:kmouse.pageY-50});
		}).mouseout(function(){
				my_tooltip.stop().fadeOut(400);
		});
	});
}

function resizeHeader() {
	var winHeight = $(window).height();
	header.css("line-height",winHeight-110+"px");
	headerSpace();
	return false;
}
function headerSpace() {
	var headerHeight = header.outerHeight();
	header.css("position","fixed");
	var headerWidth = header.outerWidth();
	header.css({left:"50%",marginLeft:-1*headerWidth/2,top:"0px"});
	about.css("margin-top",headerHeight);
	return false;
}
function headerParallax() {
	wScroll = w.scrollTop();
	header.css({"top":-0.5*wScroll+"px"});
	return false;
}

function contactButtonNo() {
	contact.find("h1").html(noMessages[Math.floor(Math.random()*noMessages.length)]);
	console.log(noMessages.length);
	return false;
}