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

                // 선택한 라인의 접근 경로
                let selectedPath = oContext.getPath();
                // 항공편이 보이는 Table의 ID로 화면의 구성요소를 찾는다
                let oConnTable = this.byId("idConnTable");

                // 선택한 라인의 접근 경로를 현재 경로로 취급하도록
                // 테이블에 bindElement 메소드를 호출한다.
                // 이렇게 테이블에서 현재 경로를 설정하면 items에 적은
                // {toConnection} 은 {선택한 항공사/toConnection} 이라고 적은 것과
                // 같도록 된다.
                // 이 /CarrierSet('AA')/ 경로에서 {toConnection}
                oConnTable.bindElement(selectedPath);
        }
        
    });
    });
    // 라디오버튼을 선택하는 순간, oEvent에 선택한 라인에 대한 정보가 들어옴
    //그래서 listitem 이라는 정보를 달라고 해서 oItem에 정보를 받음
    // 겟 바인딩
