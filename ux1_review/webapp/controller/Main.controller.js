sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.ux1review.controller.Main", {
            onInit: function () {
                let data = {
                    num1: 0,
                    num2: 0,
                    add: 0,
                    subtract: 0,
                    multi: 0,
                    divide: 0
                };

                let oModel = new JSONModel( data );
                this.getView().setModel( oModel );

            },

            onAdd: function () {
                sap.m.MessageToast.show("덧셈 테스트");

                let oView = this.getView();
                let oModel = oView.getModel();


                let num1 = parseFloat(oModel.getProperty("/num1"));

                let oInput2 = oView.byId("idNum2Input");
                let num2 = parseFloat(oInput2.getValue());

                let result = num1 + num2;
                oModel.setProperty("/add", result);
            },

            onSubtract: function () {
                sap.m.MessageToast.show("뺄셈 테스트");

                let oView = this.getView();
                let oModel = oView.getModel();


                let num1 = parseFloat(oModel.getProperty("/num1"));

                let oInput2 = oView.byId("idNum2Input");
                let num2 = parseFloat(oInput2.getValue());

                let result = num1 - num2;
                oModel.setProperty("/subtract", result);
            },

            onMulti: function () {
                sap.m.MessageToast.show("곱셈 테스트");

                let oView = this.getView();
                let oModel = oView.getModel();


                let num1 = parseFloat(oModel.getProperty("/num1"));

                let oInput2 = oView.byId("idNum2Input");
                let num2 = parseFloat(oInput2.getValue());

                let result = num1 * num2;
                oModel.setProperty("/multi", result);
            },

            onDivide: function () {
                sap.m.MessageToast.show("나눗셈 테스트");

                let oView = this.getView();
                let oModel = oView.getModel();


                let num1 = parseFloat(oModel.getProperty("/num1"));

                let oInput2 = oView.byId("idNum2Input");
                let num2 = parseFloat(oInput2.getValue());

                if ( num2 == 0){
                    sap.m.MessageBox.error("0으로 나눌 수 없습니다. ");
                }               

                let result = num1 / num2;
                oModel.setProperty("/divide", result);
            },
        });
    });
