sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("sync.e03.hw1review.controller.Main", {
            onInit: function () {

            },
            onSelectionChange: function ( oEvent ) {
                // debugger;
                let oListItem = oEvent.getParameter("listItem");
                let oContext = oListItem.getBindingContext();
                let carrid = oContext.getProperty("Carrid");
                let connid = oContext.getProperty("Connid");
                
                MessageToast.show("선택하신 라인은 항공사: " + carrid + ", 항공편: " + connid + " 의 정보입니다.");
            
                // Fragment 의 Dialog 를 오픈하도록 한다.
                let oView = this.getView();
                let oDialog = oView.byId("idDialog");
                // View에서 idDialog를 찾는다 가 사실 정석
                // oDialog = this.byId("idDialog");
                // oDialog = this.getView().byId("idDialog");

                let currentModelPath = oContext.getPath(); // 모델의 경로를 가져온다.
                oView.bindElement(currentModelPath);

                if (oDialog) {
                    // Main 화면에서 있을 때
                    // fragment를 load하면 Main 화면에 있게 된다
                    oDialog.open(); // 이미 load한 Fragment를 open
                } else {
                    // Main 화면에서 없을 때
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.hw1review.view.Info",
                        type: "XML",
                        controller: this
                    }).then(    // Load가 완료 됬을 때
                        function (oDialog) { // 어떤 로직을 넣어주기 위해 function
                            oView.addDependent(oDialog);
                            oDialog.open();
                        }
                    );  
                    
                }
            },

            onClosePress: function () {
                let oDialog = this.byId("idDialog");
                if ( oDialog ) {
                    oDialog.close();
                }
            }
        });
    });