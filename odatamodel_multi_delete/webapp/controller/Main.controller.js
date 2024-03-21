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

                debugger; 

                let oTable; // oTable 이라는 이름의 변수를 선언
                oTable = this.byId("idTable"); // View 에서 id 속성값이 idTable 인 항목을 찾음

                let aIndex = oTable.getSelectedIndices(); // 선택한 행들의 인덱스들의 정보

                if ( !aIndex || aIndex.length == 0 ){  // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요.");
                    return; // 메시지를 출력하고 중단
                }

                // oDatat 모델을 View 에서 가져온다
                let oModel = this.getView().getModel();


                // const 는 상수를 선언하는 방법, 상수는 값이 변경되지 않는 특징이 존재함
                for( const index of aIndex ){

                    // 선택된 라인들 중 순서대로 하나씩 모델 연결정보 가져옴
                    let oSelectedContext = oTable.getContextByIndex(index);
                    let carrid = oSelectedContext.getProperty( "Carrid" );

                    // 해당 모델의 정보에 대한 경로
                    let path = oSelectedContext.getPath();

                    // oData 모델의 remove(경로, 결과처리) 메소드를 이용하면,
                    // 해당 데이터를 삭제명령 보낼 수 있다.
                    // 해당 삭제 명령은 이 경우 sap gateway의 YE03_GW005의 
                    // CARRIERSET_DELETE_ENTRY 메소드가 실행된다.
                    oModel.remove(path, {
                        success: function( ){
                            // Exception 이 발생하지 않은 경우
                            sap.m.MessageBox.success(carrid + "삭제 성공");
                            oTable.clearSelection();
                        },
                        error: function ( oError ) {

                        }

                    });
                }
            }
        });
    });
