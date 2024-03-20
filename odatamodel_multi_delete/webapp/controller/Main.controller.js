sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.odatamodelmultidelete.controller.Main", {
            onInit: function () {

                let data = {
                    Currency : [
                        { Key: "KRW", Name: "원화"},
                        { Key: "USD", Name: "달러"},
                        { Key: "EUR", Name: "유로"},
                        { Key: "AUD", Name: "호주D"},
                        { Key: "CAD", Name: "캐나다D"}
                    ]
                };

                let oViewModel = new JSONModel(data);
                this.getView().setModel(oViewModel, "view");
            },

            // 여러 줄 삭제시키는 로직
            onDelete: function () {
                let oTable; // oTable 이라는 이름의 변수를 선언
                oTable = this.byId("idTable"); // View 에서 id 속성값이 idTable 인 항목을 찾음

                let aIndex = oTable.getSelectedIndices(); // 선택한 행들의 인덱스들의 정보

                if ( !aIndex || aIndex.length == 0 ){  // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요.");
                    return; // 메시지를 출력하고 중단
                }
            }
        });
    });
