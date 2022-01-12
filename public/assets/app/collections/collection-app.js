/*
App Collection
Updated: 2014-10-11
*/

define(['jquery', 'underscore', 'backbone', 'models/model-app'], function($, _, Backbone, Model) {

	var collection = Backbone.Collection.extend({
		model: Model
	});
	
	function defaults() {
		var models = [
			new Model({label: 'Income (Gross)', data: 0.00, slug: 'income-gross', percent: 100, category_id: 1}),
			new Model({label: 'Offerings', data: 0.00, slug: 'offerings', percent: 10, category_id: 2}),
			new Model({label: 'Estimated Taxes', data: 0.00, slug: 'taxes', percent: 20, category_id: 2}),
			new Model({label: 'Miscellaneous', data: 0.00, slug: 'deductions-misc', percent: 0, category_id: 2}),
			new Model({label: 'Income (Net)', data: 0.00, slug: 'income-net', percent: 100, category_id: 3}),
			new Model({label: 'Housing', data: 0.00, slug: 'housing', percent: 35, category_id: 4}),
			new Model({label: 'Utilities', data: 0.00, slug: 'utilities', percent: 8, category_id: 4}),
			new Model({label: 'Food', data: 0.00, slug: 'food', percent: 10, category_id: 4}),
			new Model({label: 'Transport', data: 0.00, slug: 'transport', percent: 15, category_id: 4}),
			new Model({label: 'Clothing', data: 0.00, slug: 'clothing', percent: 4, category_id: 4}),
			new Model({label: 'Personal', data: 0.00, slug: 'personal', percent: 5, category_id: 4}),
			new Model({label: 'Savings', data: 0.00, slug: 'savings', percent: 5, category_id: 4}),
			new Model({label: 'Debt', data: 0.00, slug: 'debt', percent: 10, category_id: 4}),
			new Model({label: 'Medical', data: 0.00, slug: 'medical', percent: 8, category_id: 4}),
			new Model({label: 'Miscellaneous', data: 0.00, slug: 'misc', percent: 0, category_id: 4})
		];
		currentCollection = new collection(models);
		return currentCollection;
	}
	
	return {
		initialize: collection,
		defaults: defaults
	}
});