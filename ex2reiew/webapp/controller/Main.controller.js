sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("sync.e03.ex2reiew.controller.Main", {
            onInit: function () {

            },

            onSelection: function ( oEvent ) {
                debugger;

                // 선택한 행의 모델 경로를 View에 현재 경로로 설정한다.
                let oContext = oEvent.getParameter("rowContext");
                let path = oContext.getPath();
                let oView = this.getView();
                oView.bindElement(path);

                //Fragment에 있는 Dialog 를 불러와 Open 한다.
                let oDialog = oView.byId("idDialog");

                if ( oDialog ) {
                    // View 에 존재하면 오픈
                    oDialog.open();
                } else {
                    // View에 존재하지 않으면, Dialog가 있는 Fragment를 Load 후 Open
                    // sap.ui.core.Fragment.load( );
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.ex2reiew.view.Connection",
                        type: "XML",
                        controller: this
                    }).then(    // Load가 완료 됬을 때
                        function (oDialog) { 
                            oView.addDependent( oDialog ); // View 에 종속시킨다 (View 의 Model 을 이용할 수 있다.)
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
            },
        });
    });
