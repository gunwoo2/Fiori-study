    sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
        
    ],
        /**
         
    @param {typeof sap.ui.core.mvc.Controller} Controller*/
      function (Controller, JSONModel) {"use strict";
    
            return Controller.extend("sync.e03.exercise8.controller.Main", {
                onInit: function () {
                    let oModel = new JSONModel({
                        name: "건우"
                    });
                    let oView  = this.getView();
                    oView.setModel(oModel); // JSON Model 정보를 현재 View에 등록
                },
    
                onButtonClick: function () {
                    sap.m.MessageToast.show("버튼을 클릭했습니다!");
                }
            });
        });