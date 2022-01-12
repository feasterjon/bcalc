/*
Main
Updated: 2014-10-11
*/

require.config({
	paths: {
		text: '../lib/require/text',
		jquery: '../lib/jquery/jquery.min',
		underscore: '../lib/documentcloud/underscore-min',
		backbone: '../lib/documentcloud/backbone-min',
		jquery_ui: '../lib/jquery/jquery-ui/jquery-ui.min',
		flot: '../lib/flot/jquery.flot.min',
		flot_pie: '../lib/flot/jquery.flot.pie.min'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'jquery_ui': {
			deps: ['jquery']
		},
		'flot': {
			deps: ['jquery']
		},
		'flot_pie': {
			deps: ['flot']
		}
	}
});

require(['views/view'], function(View) {
	
	new View();
});