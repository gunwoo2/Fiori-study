sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.jsonmodel.controller.MAIN", {
            onInit: function () {
                let data = {
                    firstName: "John", // 문자열
                    enabled: true     // boolean 타입 (True / False)
                };

                // sap.ui.model.json.JSONModel 의 객체가 생성되면서
                // 동시에 data 라는 변수에 기록된 Structure 정보가
                // Model 의 데이터로 전달된다.
                let oModel = new JSONModel(data);
                
                // JSON 모델의 바인딩 모델을 ㅇ투웨이에서 원웨이로 변경
                // oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

                // 이 cONTROLLER와 연결된 View 의 기본 모델로 설정
                this.getView().setModel(oModel); 
            }
        });
    });
