/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce03/ex2reiew/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
