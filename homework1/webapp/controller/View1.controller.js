sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sync.e03.homework1.controller.View1", {
            onInit: function () {
                
            },

            onSelectionChange: function ( oEvent ) {
                // 선택한 Item 정보를 Event 로부터 가져옴
                let oItem = oEvent.getParameter("listItem");

                // 선택한 라인에서 출력되는 데이터의 Model 내용
                let oContext = oItem.getBindingContext();

                // 해당 Model 내용의 Carrid 속성과 Connid 속성을 화면에 출력
                let oCarrid   = oContext.getProperty("Carrid");
                let oConnid   = oContext.getProperty("Connid");
                
                
                // 메시지 토스트로 항공사 코드와 항공편 코드 출력
                sap.m.MessageToast.show("선택하신 라인은 항공사: " + oCarrid + ", 항공편 " + oConnid + " 의 정보입니다.");

                //----------------------------------------------------                      
                // ---------------------------------------------------------------------------
                // Info.fragment.xml 을 팝업창으로 호출하는 로직
                // 출력할 데이터를 객체로 표현
                let oData = {
                    Carrid: oContext.getProperty("Carrid"),
                    Connid: oContext.getProperty("Connid"),
                    Fltime: oContext.getProperty("Fltime"),
                    Deptime: oContext.getProperty("Deptime"),
                    Arrtime: oContext.getProperty("Arrtime"),
                    Distance: oContext.getProperty("Distance"),
                    Distid: oContext.getProperty("Distid"),
                };
                let oView = this.getView();
                let oDialog = this.byId("idDialog");

                // 이미 로드된 Fragment가 없으면 새로 로드
                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(oView.getId(), "sync.e03.homework1.view.info", this);       
                }

                // Fragment에 데이터 바인딩
                oDialog.setModel(new sap.ui.model.json.JSONModel(oData));

                // Fragment를 팝업창으로 열기
                oDialog.open();
                },

                onDialogClose: function() {
                let oDialog = this.byId("idDialog");
                if ( oDialog ) {
                    oDialog.close(); // 팝업창을 닫는다.
                }
                }

            });
        });