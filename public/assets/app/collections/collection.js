/*
Collection
Updated: 2013-09-28
*/

define(['jquery', 'underscore', 'backbone', 'models/model'], function($, _, Backbone, Model) {

	var collection = Backbone.Collection.extend({
		model: Model
	});
	
	function defaults() {
		var models = [
			new Model({name: 'Budget Calculator', description: '', version: '1.0', date: new Date(), author: 'Bit Designer', author_url: 'http://bitdesigner.com'})
		];
		currentCollection = new collection(models);
		return currentCollection;
	}
	
	return {
		initialize: collection,
		defaults: defaults
	}
});