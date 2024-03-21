sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.input.controller.View1", {
            onInit: function () {
                let data = {
                    value1: 0,
                    value2: 0,
                    result: 0
                }
                let oModel = new JSONModel( data );
                
                // 기본 모델로 사용하고자 이름을 주지 않는다
                this.getView().setModel(oModel);

                // 메시지 매니저 사용하기 위해 추가
                // 화면에 오류가 발생한 부분을 메시지와 함께 표시해주는 기능
                let oMsgManager = sap.ui.getCore().getMessageManager();
                oMsgManager.registerObject(this.getView(), true);
            },

            onAdd: function () {
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                if ( value1 == "" ){
                    value1 = 0;
                }

                // 가져온 값을 정수로 취급하면, 소수가 없어진다.
                // let result = parseInt(value1) + parseInt(value2);
                let result = parseFloat(value1) + parseFloat(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==> " + result);
            },

            onSub: function () {
                sap.m.MessageToast.show("빼기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                if ( value1 == "" ){
                    value1 = 0;
                }

                // 가져온 값을 정수로 취급하면, 소수가 없어진다.
                // let result = parseInt(value1) + parseInt(value2);
                let result = parseFloat(value1) - parseFloat(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==> " + result);
            },

            onMul: function () {
                sap.m.MessageToast.show("곱하기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                if ( value1 == "" ){
                    value1 = 0;
                }

                // 가져온 값을 정수로 취급하면, 소수가 없어진다.
                // let result = parseInt(value1) + parseInt(value2);
                let result = parseFloat(value1) * parseFloat(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==> " + result);
            },

            onDiv: function () {
                sap.m.MessageToast.show("나누기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                if ( value1 == "" ){
                    value1 = 0;
                }

                if ( value2 === "" || parseFloat(value2) === 0) {
                    sap.m.MessageToast.show("0으로 나눌 수 없습니다.");
                    return;
                }
            
                let result = parseFloat(value1) / parseFloat(value2);
            
                // 계산 결과를 기록
                oText.setText("나누기 결과는 ==> " + result);
                
            },

            onMod: function () {
                sap.m.MessageToast.show("나머지 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                if ( value1 == "" ){
                    value1 = 0;
                }

                if ( value2 === "" || parseFloat(value2) === 0) {
                    sap.m.MessageToast.show("0으로 나눌 수 없습니다.");
                    return;
                }
            
                let result = parseFloat(value1) % parseFloat(value2);
            
                // 계산 결과를 기록
                oText.setText("나머지 결과는 ==> " + result);
                
            },

            

            onAddJSON: function () {
                sap.m.MessageToast.show("JSON으로 더하기 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model 만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = data.value1;
                let value2 = data.value2;

                // if ( value1 === "" || value2 === "") {
                //     sap.m.MessageToast.show("공백은 사용할 수 없습니다 값을 입력해주세요.");
                //     return;
                // }

                let result = value1 + value2
                // let result = parseInt(value1) + parseInt(value2)

                data.result = result;

                oModel.setData(data);
            },

            onSubJSON: function () {
                sap.m.MessageToast.show("JSON으로 빼기 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model 만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = data.value1;
                let value2 = data.value2;
                let result = value1 - value2
                // let result = parseInt(value1) + parseInt(value2)

                data.result = result;

                oModel.setData(data);
            },

            onMulJSON: function () {
                sap.m.MessageToast.show("JSON으로 곱하기 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model 만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = data.value1;
                let value2 = data.value2;
                let result = value1 * value2
                // let result = parseInt(value1) + parseInt(value2)

                data.result = result;

                oModel.setData(data);
            },

            onDivJSON: function () {
                sap.m.MessageToast.show("JSON으로 나누기 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model 만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = data.value1;
                let value2 = data.value2;

                if ( value2 === "" || value2 === 0) {
                    sap.m.MessageToast.show("0으로 나눌 수 없습니다.");
                    return;
                }

                let result = value1 / value2
                // let result = parseInt(value1) + parseInt(value2)

                data.result = result;

                oModel.setData(data);
            },

            onModJSON: function () {
                sap.m.MessageToast.show("JSON으로 나머지 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model 만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = data.value1;
                let value2 = data.value2;

                if ( value2 === "" || value2 === 0) {
                    sap.m.MessageToast.show("0으로 나눌 수 없습니다.");
                    return;
                }

                let result = value1 % value2
                // let result = parseInt(value1) + parseInt(value2)

                data.result = result;

                oModel.setData(data);
            },


            onValidError : function ( oEvent) {
                oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
            }
        });
    });
