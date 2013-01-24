var CarouselView = Backbone.View.extend({
	el: '#carousel',
	initialize: function() {
		this.currentIndex = this.options.currentIndex;
		this.itemsToScroll = this.options.itemsToScroll;
		this.pxToScroll = this.options.pxToScroll;
		this.elementsToShow = this.options.elementsToShow;
		this.totalElements = this.options.totalElements;
		this.elementsToUse = this.totalElements - this.elementsToShow;
		this.render();
	},
	events: {
		'click button': 'scroll'
	},
	scroll: function(e) {

		var buttonIndex = $(e.currentTarget).index();

		

		if(buttonIndex === 0) {
			if(this.elementsRemainingLeft <= this.itemsToScroll) {
				this.currentIndex -= this.elementsRemainingLeft;
			} else {
				this.currentIndex -= this.itemsToScroll;
			}
		}

		if(buttonIndex === 1) {
			if(this.elementsRemainingRight <= this.itemsToScroll) {
				this.currentIndex += this.elementsRemainingRight;
			} else {
				this.currentIndex += this.itemsToScroll;
			}
		}

		console.log(buttonIndex, this.currentIndex, this.currentIndex * this.pxToScroll);

		this.animate();
	},
	animate : function() {
		this.elementsRemainingRight = this.elementsToUse - this.currentIndex;
		this.elementsRemainingLeft = this.elementsToUse - this.elementsRemainingRight;
		console.log("REMAINING RIGHT:", this.elementsRemainingRight);
		console.log("REMAINING LEFT:", this.elementsRemainingLeft);


		if(this.elementsRemainingRight <=0) {
			this.currentIndex = this.currentIndex + this.elementsRemainingRight;
			this.elementsRemainingRight = this.elementsToUse - this.currentIndex;
			console.log("CORRECTION");
		}



		$('#carouselScroller').stop().animate({
			left: -(this.currentIndex * this.pxToScroll)
		}, 250);

		console.log("REMAINING RIGHT:", this.elementsRemainingRight);
		console.log("REMAINING LEFT:", this.elementsRemainingLeft);
		
	},
	template: $('#carouselWrapperlayout').html(),
	render: function() {
		this.$el.html(this.template);
		this.$el.find('#carouselScroller').append($('#imageList').html());
		this.animate();
		return this;
	}
});