/*
Calculator
Updated: 2013-10-11
*/

define(['jquery', 'underscore', 'backbone', 'jquery_ui', 'flot', 'flot_pie', 'collections/collection-app'], function($, _, Backbone, ui, plot, pie, Collection_App) {

	var view = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			var output = '';
			var tabs = $('.tabs'); // query tabs
			
			var error = 0;
			var error_class = 'ui-state-error';
			$('.' + error_class).removeClass(error_class);
			this.data.each(function(item){
				if(item.get('category_id') == 2 || item.get('category_id') == 4) {
					if(item.get('slug') != 'deductions-misc') {
						element = $('#' + item.get('slug') + '-percent');
						element_val = parseFloat(element.val());
						item.set({percent: element_val}); // set percentages
						if(isNaN(item.get('percent'))) { // number validation
							element.parent().addClass(error_class);
							error++;
						}
					}
				}
				if(item.get('category_id') == 1 || item.get('slug') == 'deductions-misc') {
					element = $('#' + item.get('slug'));
					element_val = parseFloat(element.val().replace(/,/g,''));
					item.set({data: element_val}); // set amounts
					if(isNaN(item.get('data'))) { // number validation
							element.parent().addClass(error_class);
							error++;
					}
				}
			});
			
			if(error == 0) {
				
				var sum_percent_items = 0;
				this.data.each(function(item){
					if(item.get('category_id') == 4) {
						sum_percent_items += item.get('percent'); // sum items percentages
					}
				});
				if(sum_percent_items == 100) {
					
					var income_gross = this.data.findWhere({category_id: 1}).get('data'); // get Income (Gross) amount
					var offerings = parseFloat((this.data.findWhere({slug: 'offerings'}).get('percent') * .01) * income_gross); // calculate Offerings amount
					this.data.findWhere({slug: 'offerings'}).set({data: offerings}); // set Offerings amount
					var taxes = parseFloat((this.data.findWhere({slug: 'taxes'}).get('percent') * .01 ) * income_gross); // calculate Taxes amount
					this.data.findWhere({slug: 'taxes'}).set({data: taxes}); // set Taxes amount
					var misc = parseFloat((this.data.findWhere({slug: 'deductions-misc'}).get('data') / income_gross) * 100); // calculate Deductions Miscellaneous percentage
					if((misc % 1) != 0) { // is decimal
						misc = misc.toFixed(2);
					}
					this.data.findWhere({slug: 'deductions-misc'}).set({percent: misc}); // set Deductions Miscellaneous percentage
					var income_net = parseFloat(income_gross - offerings - taxes - this.data.findWhere({slug: 'deductions-misc'}).get('data')); // calculate Income (Net) amount
					this.data.findWhere({category_id: 3}).set({data: income_net}); // set Income (Net) amount
					var income_net_percent = Math.round(parseFloat((income_net / income_gross) * 100)); // calculate Income (Net) percent
					this.data.findWhere({category_id: 3}).set({percent: income_net_percent}); // set Income (Net) percent
					
					tabs.tabs('option', 'active', 2); // switch to tab
					
					$('.deductions-table').html('<table class="items c"><caption>Deductions</caption><tr><th>Item</th><th>&#37; Allocation</th><th>&#36; Amount</th></tr></table>') // deductions table
					
					$('.items-table').html('<table class="items c"><caption>Items</caption><tr><th>Item</th><th>&#37; Allocation</th><th>&#36; Amount</th></tr></table>') // items table
					
					this.data.each(function(item){
						if(item.get('category_id') == 4) {
							item.set({data: (item.get('percent') * .01) * income_net}); // get amounts
						}
						item.set({data: item.get('data').toFixed(2)});
						$('#' + item.get('slug')).val(item.get('data')); // update items fields
						$('.' + item.get('slug')).html('<p><span class="label">' + item.get('label') + ' (&#37; ' + item.get('percent') + ')</span><span class="value">&#36;' + item.get('data') + '</span></p>'); // income items
						if(item.get('category_id') == 2) {
							$('.deductions-table table').append('<tr><td>' + item.get('label') + '</td><td>' + item.get('percent') + '</td><td>' + item.get('data') + '</td></tr>'); // deductions table items
						}
						if(item.get('category_id') == 4) {
							$('.items-table table').append('<tr><td>' + item.get('label') + '</td><td>' + item.get('percent') + '</td><td>' + item.get('data') + '</td></tr>'); // items table items
						}
					});
					
					this.plot(); // plot chart
					$('.form-deductions-amount, .form-items-amount').show(); // reveal amounts
					
					this.status = true;	
				}
				else {
					
					tabs.tabs('option', 'active', 2); // switch to tab
					var diff_percent_items = 100 - sum_percent_items;
					
					if (diff_percent_items < 0) {
						alert('ERROR:\nYour items % sum is not equal to 100.\nYou have to subtract ' + Math.abs(diff_percent_items) + '%.');
						this.status = false;
					}
					else {
						alert('ERROR:\nYour items % sum is not equal to 100.\nYou have to add ' + Math.abs(diff_percent_items) + '%.');
						this.status = false;
					}
				}
			}
			else {
				alert('ERROR:\nOne or more fields has an invalid entry.');
				this.status = false;
			}
		},
		data: new Collection_App.defaults(),
		status: false,
		plot: function() {
			// plot chart
			$.plot($('.items-chart'), this.data.toJSON().slice(5), { // chart
				series: {
					pie: {
						show: true,
						radius: 1,
						label: {
							show: true,
							radius: 3/4,
							formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:#000000;font-weight:bold;">' + label + '<br />' + Math.round(series.percent) + '&#37;</div>';
							}
						}
					}
				},
				legend: {
					show: false
				}
			});
		}
	});
	
	return view;
});