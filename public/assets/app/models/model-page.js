/*
Page Model
Updated: 2013-09-28
*/

define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	var model = Backbone.Model.extend({
		defaults: {
			id: 0,
			name: '',
			slug: ''
		}
	});
	
	return model;
});