sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.exercise12.controller.Main", {
            onInit: function () {
                let data = {
                    Carrid: "AA",
                    Connid: "0017"
                };
                let oModel = new JSONModel( data );
                let oView = this.getView();
                oView.setModel(oModel, "view");
                
                // 끝에 fasle 라고 선언하면 수동으로 변경할 수 있음
                sap.ui.getCore().getMessageManager().registerObject(oView, true);
            },

            onCarridValidError: function ( oEvent ) {
                // 이 부분 주석을 지워주면 수동으로 변경할 수 있음
                // let oSource = oEvent.getSource();
                // oSource.setValueState(sap.ui.coresdsddasd.ValueState.Error);

                let oView = this.getView();
                let oModel = oView.getModel("view");
                let data = oModel.getData();

                sap.m.MessageToast.show( data.Carrid + "항공사 ID값이 잘못되었습니다.");
            }
        });
    });