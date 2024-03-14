sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e03.exercise11.controller.MAIN", {
            onInit: function () {

            },

            onSelectionChange: function (oEvent) {
                // 선택한 item 정보를 event로 부터 가져옴
                let oItem = oEvent.getParameter("listItem");

                // 선택한 라인에서 출력되는 데이터의 Model의 내용을 가져옴
                let oContext = oItem.getBindingContext();

                // 해당 Model 내용의 Carrid 속성을 화면에 출력함
                // 이때 oContext가 의미하는 것은 다음과 같음
                // 게이트웨이를 보면 properties가 존재함
                // 이때 properties의 그룹에서 Carrid 의 이름을 가진 정보를 가져와서
                // 메시지토스트로 화면에 띄우겠다
                sap.m.MessageToast.show(oContext.getProperty("Carrid"))
        }
        
    });
    });
    // 라디오버튼을 선택하는 순간, oEvent에 선택한 라인에 대한 정보가 들어옴
    //그래서 listitem 이라는 정보를 달라고 해서 oItem에 정보를 받음
    // 겟 바인딩
