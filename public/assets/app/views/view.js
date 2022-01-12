/*
View
Updated: 2013-10-04
*/

define(['jquery', 'underscore', 'backbone', 'jquery_ui', 'text!templates/template.html', 'views/app', 'views/calculator', 'collections/collection-page'], function($, _, Backbone, ui, Template, App, Calculator, Collection_Page) {
	
	var view = Backbone.View.extend({
		el: 'body',
		events: {
			'click .calculate': 'calculate',
			'click .report': 'report',
			'click .reset': 'reset'
		},
		initialize: function() {
			this.render();
		},
		template: _.template(Template),
		render: function() {
			var collection_Page = new Collection_Page.defaults();
			var slugPage = 'index';
			// var slugPage = window.location.hash.replace('#', '');
			var modelPage = collection_Page.findWhere({slug: slugPage});
			if(!modelPage) {
				modelPage = collection_Page.findWhere({slug: 'index'});
			}
			this.$el.html(this.template({'name': modelPage.get('name')})); // load template library
			this.$el.prepend($('script.template').html()); // load template via prepend
			$('#content').fadeToggle();
			$('input[type=submit], button').button();
			new App();
			$('.tabs').tabs();
		},
		calculate: function() {
			new Calculator();
		},
		report: function() {
			calculator = new Calculator();
			if(calculator.status !== false) {
				$('#report').dialog({
					position: {
						my:	'left top',
						at:	'left top',
						of: window
					},
					width: 800,
					modal: true
				});
			}
		},
		reset: function() {
			new App();
			$('.tabs').tabs('option', 'active', 0); // switch to tab
		}
	});

	return view;
});