/*
App
Updated: 2013-10-01
*/

define(['jquery', 'underscore', 'backbone', 'jquery_ui', 'views/calculator', 'collections/collection-app'], function($, _, Backbone, ui, Calculator, Collection_App) {

	var view = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			this.form_income();
			this.form_deductions();
			this.form_items();
			this.data.each(function(item){
				// build percent fields
				if(item.get('category_id') == 2 || item.get('category_id') == 4) {
					elements = $('#' + item.get('slug') + '-percent');
					elements.spinner({max: 100, min: 0});
					$('.form-deductions-amount, .form-items-amount').hide();
				}
				// build amount fields
				if(item.get('category_id') == 1 || item.get('slug') == 'deductions-misc') {
					elements = $('#' + item.get('slug'));
					elements.spinner({min: 0});
				}
				elements.keypress(function(event) { // enter is pressed on fields
					if(event.which == 13) {
						new Calculator();
					}
				});
			});
		},
		data: new Collection_App.defaults(),
		form_income: function() {
			// build income form
			var output = '';
			output += '<div class="item">';
			output += '<div class="h1">' + this.data.findWhere({category_id: 1}).get('label') + ' (&#37; ' + this.data.findWhere({category_id: 1}).get('percent') + ')</div>';
			output += '\r<div class="input"><label for="' + this.data.findWhere({category_id: 1}).get('slug') + '" class="symbol">&#36;</label><input type="text" id="' + this.data.findWhere({category_id: 1}).get('slug') + '" name="' + this.data.findWhere({category_id: 1}).get('slug') + '" value="' + this.data.findWhere({category_id: 1}).get('data') + '" /></div>'; // amount fields
			output += '</div>';
			$('#form-income').html('<div class="form">' + output + '</div>');
		},
		form_deductions: function() {
			// build deductions form
			var output = '';
			this.data.each(function(item){
				if(item.get('category_id') == 2) {
					output += '<div class="item">';
					output += '<div class="h1">' + item.get('label') + '</div>';
					if(item.get('slug') == 'deductions-misc') {
						output += '\r<div class="input"><label for="' + item.get('slug') + '" class="symbol">&#36;</label><input type="text" id="' + item.get('slug') + '" name="' + item.get('slug') + '" value="' + item.get('data') + '" /></div>'; // amount fields
					}
					else {
						output += '\r<div class="input"><label for="' + item.get('slug') + '-percent' + '" class="symbol">&#37;</label><input type="text" id="' + item.get('slug') + '-percent' + '" name="' + item.get('slug') + '-percent' + '" value="' + item.get('percent') + '" /></div>'; // percent fields
						output += '\r<div class="input form-deductions-amount"><label for="' + item.get('slug') + '" class="symbol">&#36;</label><input type="text" id="' + item.get('slug') + '" name="' + item.get('slug') + '" value="' + item.get('data') + '" style="border:none;" readonly="readonly" /></div>'; // amount fields
					}
					output += '</div>';
				}
			});
			$('#form-deductions').html('<div class="form">' + output + '</div>');
		},
		form_items: function() {
			// build items form
			var output = '';
			this.data.each(function(item){
				if(item.get('category_id') == 4) {
					output += '<div class="item">';
					output += '<div class="h1">' + item.get('label') + '</div>';
					output += '\r<div class="input"><label for="' + item.get('slug') + '-percent' + '" class="symbol">&#37;</label><input type="text" id="' + item.get('slug') + '-percent' + '" name="' + item.get('slug') + '-percent' + '" value="' + item.get('percent') + '" /></div>'; // percent fields
					output += '\r<div class="input form-items-amount"><label for="' + item.get('slug') + '" class="symbol">&#36;</label><input type="text" id="' + item.get('slug') + '" name="' + item.get('slug') + '" value="' + item.get('data') + '" style="border:none;" readonly="readonly" /></div>'; // amount fields
					output += '</div>';
				}
			});
			$('#form-items').html('<div class="form">' + output + '</div>');
		}
	});
	
	return view;
});