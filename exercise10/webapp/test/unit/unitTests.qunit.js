/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce03/exercise10/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
