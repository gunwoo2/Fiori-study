/*global QUnit*/

sap.ui.define([
	"synce03/jsonmodel/controller/MAIN.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MAIN Controller");

	QUnit.test("I should test the MAIN controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});