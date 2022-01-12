/*
App Model
Updated: 2013-10-01
*/

define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	var model = Backbone.Model.extend({
		defaults: {
			label: '',
			data: 0.00,
			slug: '',
			percent: 0,
			category_id: 4
		}
	});
	
	return model;
});