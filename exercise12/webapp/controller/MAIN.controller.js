sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.exercise12.controller.MAIN", {
            onInit: function () {

                let data = {
                    Carrid: "AA",
                    Connid: "0017"
                };

                let oModel = new JSONModel( data );

                let oView = this.getView();
                oView.setModel(oModel, "view");
            }
        });
    });
