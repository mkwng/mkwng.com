var HUGE = {};

HUGE.carousel = {
	page:0,
	total:0,
	init: function() {
		this.page = this.getPage();
		
		this.total = this.getTotalImages();
		
		$.event.special.swipe.horizontalDistanceThreshold = 130;
		
		this.showImage(this.page);

		// swipe left for the next image
		$('#carousel').live('swipeleft',function(e) {
            e.preventDefault();
			HUGE.carousel.next();     	
		})
		
		// swipe right for the previous image
		$('#carousel').live('swiperight',function(e) {
            e.preventDefault();
			HUGE.carousel.prev();     	
		})
		    
		// clicking on an image goes to the next image
		$("img#image").click(function(){
		    HUGE.carousel.next();
		})
	},
	showImage: function(page) {
		$("#image").attr("src", "images/" + files[page][1]);
		$("h1").html(files[page][0]);
	},
	getPage: function() {
		var url = window.location.toString();
		page = url.split("?");
		return page[1];
	},
	getTotalImages: function() {
		return files.length;
	},
	next: function() {
		var index = this.page;
		var total = parseInt(HUGE.carousel.getTotalImages());
		index = parseInt(index) + parseInt(1);
		this.page = index;
		
		if(index == total) {
			HUGE.carousel.page = 0;
			index = 0;
		}
		
		
		$("h1").html(files[index][0]);
		$("#image").attr("src", "images/" + files[index][1]);

	},
	prev: function() {
		var index = parseInt(HUGE.carousel.page);
		var total = parseInt(HUGE.carousel.getTotalImages());
		
		if(index > 0) {
			index = index - 1;
		} else {
			index = total-1;
		}
		
		HUGE.carousel.page = index;
		
		$("#image").attr("src", "images/" + files[index][1]);
		$("h1").html(files[index][0]);
	}
}

HUGE.index = {
	init: function() {
		this.getData();
				
		HUGE.static.init();
	},
		
	getData: function() {
		var li = '';
		var output = '';
		
		$.each(files, function(i) {
			li += '<li><a href="carousel.html?' + i + '">' + files[i][0] + '</a></li>';
			i++;
		});
		
		$("#pages ul").html(li);		
	}
}

HUGE.static = {
	init: function() {
		$("h1").html(presentation);
		$("h2").html(client);
		$("h3").html(project);
	}
}

$(document).ready(function() { 
	if($("#index").length > 0) {
		
		HUGE.index.init();
	}
	
	if($("#carousel").length > 0) {
		HUGE.carousel.init();
	}
	
}); 
