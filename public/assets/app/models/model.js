/*
Model
Updated: 2014-10-15
*/

define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	var model = Backbone.Model.extend({
		defaults: {
			name: 'Budget Calculator',
			description: 'Budget Calculator',
			version: '2.1',
			date: new Date(),
			author: 'Jonathan Feaster, Bit Designer',
			author_url: ''
		}
	});
	
	return model;
});