var AppView = Backbone.View.extend({
	el : 'body',
	initialize : function() {
		this.render();
	},
	template : $('#layout').html(),
	render : function() {
		this.$el.html(this.template);
		return this;
	}
});

$(function() {
	var appView = new AppView();
	var carouselView = new CarouselView({
		currentIndex : 5,
		itemsToScroll : 2,
		pxToScroll : 50,
		elementsToShow : 5,
		totalElements : 11
	});
});