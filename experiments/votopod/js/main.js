//Phase: 1: Submission, 2: Review, 3: Voting, 4: Complete
var phase = 1;

var Map = {
	activeIndex: 0, 
	mapContainer:$("#map"),
	bigmap:$(".map-container-bigmap, .map-container-shadow"),
	labels:$(".map-labels"),
	nav:$(".map-nav"),
	mapTitles:$(".map-title"),

	buildIn: function(opts) {
		var defaults = {
			direction : "none",
			showNav : true
		};
		var options = $.extend(defaults, opts);
		var self = this;
		self.mapContainer.stop().fadeIn(200, function() {
			if(!options.showNav) self.nav.find(".map-nav-left,.map-nav-right").hide();
			else self.nav.find(".map-nav-left,.map-nav-right").show();
			self.nav.fadeIn(200);
		});
		self.bigmap.stop().css({rotateX:"",translateZ:"",scale:"",opacity:"0",translateX:""});
		if(options.direction == "left") {
			self.bigmap.css({
				translateX:"+=400",
				rotateX: -Math.PI/4,
				translateZ: 240,
				scale:.75
			}).animate({
				translateX:0,
				opacity:1
			},300,function() {
				self.labels.fadeIn();
				self.mapTitles.fadeIn();
			});
		}
		else if(options.direction == "right") {
			self.bigmap.css({
				translateX:"-=400",
				rotateX: -Math.PI/4,
				translateZ: 240,
				scale:.75
			}).animate({
				translateX:0,
				opacity:1
			},300,function() {
				self.labels.fadeIn();
				self.mapTitles.fadeIn();
			});
		}
		else {
			self.bigmap.css({
				opacity:1
			}).animate({
				rotateX: -Math.PI/4,
				translateZ: 240,
				scale:.75
			},650,function() {
				self.labels.fadeIn();
				self.mapTitles.fadeIn();
			});
		}
	},
	buildOut: function(opts) {
		var defaults = {
			confirmed: false
		};
		var options = $.extend(defaults, opts);
		var self = this;

		if(self.activeIndex == -1 && !options.confirmed) {
			self.confirmClose();
		}
		else {
			self.labels.fadeOut(100);
			self.nav.fadeOut(100);
			self.mapContainer.stop().fadeOut(300, function() {
				self.labels.hide().find('ol').remove();
				self.mapTitles.find("h2").html('""');
				self.mapTitles.find(".title-author").html("");
				self.mapContainer.find(".error").removeClass("error");
				$(".form-submit").remove();
				self.bigmap.stop().css({
					rotateX: 0,
					translateZ: 0,
					scale:1
				});
			});
		}
	},
	confirmClose: function() {
		var self = this;
		if($(".popup").size()==0){
				var popup = $('<div class="popup" style="display:none"><div class="popup-cover"></div><div class="popup-message"><p>Are you sure?</p><p>You will lose all progress.</p><div class="button-wrap"><a class="confirm-close default-button" href="#">Close</a><a class="confirm-cancel default-button" href="#">Don&apos;t Close</a></div></div></div>');
				popup.appendTo("body").fadeIn(200);
				popup.find(".confirm-cancel").click(function() {
					popup.fadeOut(100, function() {
						popup.remove();
					})
				});
				popup.find(".confirm-close").click(function() {
					popup.fadeOut(100, function() {
						$(".popup").remove();
					})
					self.activeIndex = 0
					self.buildOut({confirmed: true});
				});
			}
	},
	buildLabels: function(contestant) {
		var self = this;

		selected = $(contestant);

		if(selected.size() != 1) {

		} else {

			self.activeIndex = selected.index();

			title = selected.data("name");
			author = selected.data("author");
			roomblock = selected.find(".contestant-area-roomblock");


			roomblock.clone()
				.removeClass("contestant-area-roomblock")
				.addClass("map-labels-roomblock")
				.each(function() {
					$(this).find("li").css({
						left: "",
						top: "",
						rotateY: "",
					});
				})
				.appendTo(".map-labels")
				.find("li").each(function(i) {
					var self = $(this);
					self.find("span.room-name").html(
						self.data("name")
					);
				});
			self.mapTitles.find("h2").html('"'+title+'"');
			self.mapTitles.find(".title-author").html(author);


		}
	},
	buildForm: function() {
		var self=this;

		var submitButton = $('<button id="user-submit" class="form-submit" name="form-submit">Submit</button>').appendTo(self.mapContainer);

		self.activeIndex = -1;

		self.mapTitles.find("h2").html('"<input type="text" id="theme-name" placeholder="Your Theme">"');
		self.mapTitles.find(".title-author").html('<input type="text" id="author-name" placeholder="Your Name">');

		roomblock = $(".contestant-area-roomblock").first();
		roomblock.clone()
			.removeClass("contestant-area-roomblock")
			.addClass("map-labels-roomblock")
			.each(function() {
				$(this).find("li").css({
					left: "",
					top: "",
					rotateY: "",
				});
			})
			.appendTo(".map-labels")
			.find("li").each(function(i) {
				var self = $(this);
				self.data("name","").find("span.room-name").html('<input type="text" id="room-'+(i+1)+'" placeholder="Room Name">');
			});


		self.mapContainer.find('input').each(function() {
			$(this).autoGrowInput({
			    comfortZone: 10,
			    minWidth: 30,
			    maxWidth: 2000
			});
		});


		//Form Validation
		submitButton.unbind("click").click(function() {
			self.validateForm();
		});
	},
	validateForm: function() {
		var self=this;
		var errors = 0;
		self.mapContainer.find('input').each(function() {
			var input = $(this);
			if(input.val().replace(/\W/g, '') == "") {
				errors++;
				if(input.parents("li").size()==1) input.parents("li").addClass("error").errorBounce();
				else input.parent().addClass("error").errorBounce();
			} else {
				if(input.parents("li").size()==1) input.parents("li").removeClass("error");
				else input.parent().removeClass("error");
			}
		});
		console.log(errors + " errors")
		if(errors==0) {

			// $('#id_author').val($('#author-name').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_title').val($('#theme-name').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_1_name').val($('#room-1').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_2_name').val($('#room-2').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_3_name').val($('#room-3').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_4_name').val($('#room-4').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_5_name').val($('#room-5').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_6_name').val($('#room-6').val().replace(/[^a-z 0-9]+/gi,'');
			// $('#id_room_7_name').val($('#room-7').val().replace(/[^a-z 0-9]+/gi,'');
			// $.each("#themeForm input", function() {
			// 	console.log( $(this).val() );
			// });

			popupMessage("Thank you for your submission!");
			self.buildOut({confirmed:true});


			$("#submit").submit();

		}
		else {
			//alert that there are errors
		}
	},
	nextItem: function() {
		var self = this;
		var contestants = $(".contestant");
		var next = ++self.activeIndex >= contestants.size() ? 0 : self.activeIndex;
		console.log(next);
		self.labels.stop().hide().find('ol').stop().remove();
		mapTitles = self.mapContainer.find(".map-title").stop().hide();

		self.bigmap.stop().animate({translateX:"-=400",opacity:"0"},300,function() {
			self.buildIn({direction:"left"});
			self.buildLabels(contestants.eq(next));
		});
	},
	prevItem: function() {
		var self = this;
		var contestants = $(".contestant");
		var next = --self.activeIndex < 0 ? contestants.size()-1 : self.activeIndex;
		console.log(next);
		self.labels.stop().hide().find('ol').stop().remove();
		mapTitles = self.mapContainer.find(".map-title").stop().hide();

		self.bigmap.stop().animate({translateX:"+=400",opacity:"0"},300,function() {
			self.buildIn({direction:"right"});
			self.buildLabels(contestants.eq(next));
		});
	},
}

$.fn.roomblockHover = function(opts){
	var defaults = {
		callback : function(){
			this.submit();
			// console.log('default');
		}
	};
	var options = $.extend(defaults, opts);

	var subjugate = $(this);
	var area = subjugate.find(".contestant-area").data("color",$(this).css("backgroundColor"));
	var title = subjugate.find(".contestant-title");
	var roomblock = subjugate.find(".contestant-area-roomblock");
	var rooms = roomblock.find("li").each(function(i){
		$(this).data("position", {left: parseInt($(this).css("left")), top: parseInt($(this).css("top")) });
	});


	var mousetip = $('<div class="mousetip">Click to expand</div>');

	subjugate.hover(function() {
			area.css({backgroundColor: "#bb2d69"});
			title.css({backgroundColor: "#ffffff"});

			//Create a tooltip.appendTo("body");
			mousetip.appendTo("body");

			subjugate.stop().mousemove(function(e) {

				mousetip.css({top:e.pageY-40,left:e.pageX-55});

				rooms.each(function(i){
					var distance = 0;
					var currentLi = $(this);

						var x = e.pageX - currentLi.offset().left;
						distance = Math.max(100-Math.abs(x - currentLi.width()/2),0);


					currentLi.stop().animate({
						left: $(this).data("position").left + ((i-3)*20) + (145-currentLi.width())/2 + "px", 
						top: $(this).data("position").top + ((i-3)*15) - Math.pow(distance,3)/10000 + 20 + "px",
						rotateY: -Math.PI/12,
					},100,"linear");

				});
			});
		}, function() {
			area.css({backgroundColor: "#ce3475"});
			title.css({backgroundColor: "#606060"});
			subjugate.stop().unbind("mousemove");
			rooms.stop().each(function(i){
				$(this).stop().animate({
					left: $(this).data("position").left + "px", 
					top: $(this).data("position").top + "px",
					rotateY: 0,
				},150);
			});

			mousetip.remove();
		});
}

$.fn.errorBounce = function(opts){
	var defaults = {
	};

	var options = $.extend(defaults, opts);

	var self = $(this);
	self.animate({top:"-=48px"},80, function() {
		self.animate({top:"+=48px"},80, function() {
			self.animate({top:"-=32px"},80, function() {
				self.animate({top:"+=32px"},80, function() {
					self.animate({top:"-=16px"},80, function() {
						self.animate({top:"+=16px"},80);						
					});					
				});				
			});			
		});
	});
}

var initializeContestant = function(contestant) {
	var self = $(contestant);

		//Put the data in.
		self.find("li").each(function(i) {
			var self = $(this);
			var maxLength = Math.ceil(self.width()/10);
			self.find("span.room-name").html(
				//REALLY hack-y way to check the length... Note to self: Do this better.
				self.data("name").length < maxLength ? self.data("name") : self.data("name").substr(0,maxLength-2)+"&hellip;"
			);
		});
		

		self.find("h2").html('"'+(self.data("name").length < 16 ? self.data("name") : self.data("name").substr(0,14)+"&hellip;")+'"');
		self.find(".title-author").html(self.data("author"));

		//Hover interaction, including flying box animation
		self.roomblockHover();


		//The vote button has different interactions
		self.find(".vote-button")
			.hover(function() {
				$(".mousetip").stop().fadeTo(40,0);
			},
			function() {
				$(".mousetip").stop().fadeTo(40,.95);
			})
			.click(function() {
				var self = $(this);
				$("#vote-submit").removeClass("disabled").fadeIn();
				self.toggleClass("selected");
				if(self.hasClass("selected")) {
					$(".vote-button").not(self).removeClass("selected");
				} else {
				$("#vote-submit").addClass("disabled");
				}
				return false;
			});

		//Build in the map view
		self.click(function() {
			contestantClick(this);
			return false;
		});
}

var initializeVote = function() {
	var voteButton = $('<div id="vote-submit" class="vote-submit phase-3 disabled" style="display:none"><p>Submit Your Vote</p><span></span></div>');
	if($("#vote-submit").size()==0) voteButton.appendTo("body").click(function() {
		//Submit the vote

		$("#vote-submit").remove();
		$(".vote-button").addClass("disabled");
		popupMessage("Thank you for your vote!");
	});
}

var mapRoomPositions = {
	0:["155","52",".7",".3"],
	1:["348","154",".75",".33"],
	2:["425","154",".75",".33"],
	3:["343","202",".8",".4"],
	4:["426","202",".8",".4"],
	5:["738","234","1",".5"],
	6:["750","311","1",".5"]
}
var contestantClick = function(contestant) {
	Map.buildLabels(contestant);
	Map.buildIn();

	var flyingBoxes = $(contestant).clone();
	flyingBoxes.css({
			position:"fixed",
			top:$(contestant).offset().top-$(window).scrollTop(),
			left:$(contestant).offset().left,
			margin:"0",
			padding:"0",
			zIndex:"100",
			pointerEvents:"none",
			width:"904px",
			height:"648px",
		})
		.animate({
			top:"80px",
			left:$(".map-container").offset().left,
		},600);

	flyingBoxes.find(".contestant-title").css({visibility:"hidden"});
	flyingBoxes.find(".contestant-area").css({background:"transparent"});
	flyingBoxes.appendTo("body");


	var rooms = flyingBoxes.find("li");

	rooms.stop().each(function(i) {
		var self = $(this).css({position:"absolute"});
		self.css({

		}).animate({
			translateZ: 240,
			rotateY:0,
			rotateX: -Math.PI/4,
			left:mapRoomPositions[i][0],
			top:mapRoomPositions[i][1],
			scaleY:mapRoomPositions[i][3],
			scaleX:mapRoomPositions[i][2],
			opacity:.3
		},600).fadeTo(300,0,function() {flyingBoxes.remove();});
	});

	$(contestant).mouseout();
}

var popupMessage = function(message){
	if($(".popup").size()==0) {
		var popupContainer = $('<div class="popup"></div>');
		var popupCover = $('<div class="popup-cover"></div>');
		var popupMessage = $('<div class="popup-message"><p></p><div class="default-button">Dismiss</div></div>');
		popupCover.appendTo(popupContainer);
		popupMessage.find("p").html(message);
		popupMessage.appendTo(popupContainer);
		popupContainer.appendTo("body").fadeIn(300);
	
		popupContainer.click(function() {
			$(this).fadeOut(300,function() {$(this).remove();});
		});
	}
}

$(document).ready(function() {

	// handle current phase...
	$(".phase-"+phase).show();

	$(".contestant").each(function() {
		initializeContestant(this);
	});

	//Build in the form view
	$(".new-form").click(function() {
		Map.buildForm();
		Map.buildIn({showNav:false});
	});

	if(phase == 3) {
		initializeVote();
	}

	//Map Navigation
	$("#map .map-nav-right").click(function() { Map.nextItem(); });
	$("#map .map-nav-left").click(function() { Map.prevItem(); });
	$(".map-nav-close").click(function() { Map.buildOut(); });
	$(document).keyup(function(e) {
		if (e.keyCode == 13) { $('.form-submit').click(); }     // enter
		if (e.keyCode == 27) { $('.map-nav-close').click(); }   // esc
	});




	
});



