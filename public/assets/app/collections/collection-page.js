/*
Page Collection
Updated: 2013-09-28
*/

define(['jquery', 'underscore', 'backbone', 'models/model-page'], function($, _, Backbone, Model) {

	var collection = Backbone.Collection.extend({
		model: Model
	});
	
	function defaults() {
		var models = [
			new Model({id: 1, name: 'Budget Calculator', slug: 'index'}),
			new Model({id: 2, name: 'Secondary Page', slug: 'secondary'}),
			new Model({id: 3, name: 'Tertiary Page', slug: 'tertiary'})
		];
		currentCollection = new collection(models);
		return currentCollection;
	}
	
	return {
		initialize: collection,
		defaults: defaults
	}
});