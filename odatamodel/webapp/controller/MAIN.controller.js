sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.odatamodel.controller.MAIN", {
            initAirlineData: {
                Carrid: "",
                Carrname: "",
                Currcode: "",
                Url: ""
            },
            
            onInit: function () {
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");
            },

            onCreate: function () {
                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if ( oDialog ) {   
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.odatamodel.view.New",
                        type: "XML",
                        controller: this            // View의 Controller 를 공유
                    }). then(function (oDialog) {
                        oView.addDependent(oDialog); // View의 Model을 공유
                        oDialog.open();
                    });               
                 }

                },
                onSaveCancel: function ( ){
                    let oDialog = this.getView().byId("idNewDialog");
                    if ( oDialog ) {
                        oDialog.close();
                    }

                    // new 모델의 데이터를 초기화
                    // 기존의 new 모델을 교체해버림 =>> 데이터 초기화
                    let oNewModel = new JSONModel(this.initAirlineData);
                    //let oNewModel = this.getView().getModel("new");
                    //oNewModel.setData(this.initAirlineData);
                    this.getView().setModel(oNewModel, "new");
                }     
        });
    });

    