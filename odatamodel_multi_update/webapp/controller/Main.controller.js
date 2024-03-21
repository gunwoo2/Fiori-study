sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.odatamodelmultiupdate.controller.Main", {
            onInit: function () {
                    this.getView().setModel(new JSONModel({
                        EditMode: false
                    }), "view");
            },
                

            // 수정 버튼 누르면 수정모드로 변경되게 함 true를 통해 바뀜
            onEdit: function () {
                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", true);

            },

            // 취소 버튼 누르면 조회모드로 변경되게 함
            // 그리고 취소 버튼을 누르면 수정모드에서 바꿨을 때 
            // 내용을 삭제하고 조회모드로 변경됨
            onCancel: function() {
                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", false);

                /** @type {sap.ui.model.odata.v2.ODataModel} */
                let oModel = this.getView().getModel(); // Odata Model
                oModel.resetChanges(); // 원복 데이터로 복원함

            },

            // 리프레시 버튼 (값이 변경된게 있을 시 새로고침을 하면 데이터를 새로 불러와서 화면에 띄움)
            onRefresh: function () {
                let oModel = this.getView().getModel(); // Odata Model
                oModel.resetChanges();
                oModel.refresh(true, true);
              
            },

            onSave: function () {
                let oView = this.getView();
                let oTable = oView.byId("idTable");
                let aIndex = oTable.getSelectedIndices();

                // !aIndex 의 뜻 : aIndex 라는 변수가 없거나, 사용불가능할 때
                // aIndex.length == 0 : 사용은 가능하나, 배열이 비어있을 때
                // aIndex 라는 변수가 없거나, 사용이 불가능하거나,
                // 배열이 비어있거나, 할 때 { } 의 문장을 실행한다.
                if ( !aIndex || aIndex.length == 0){
                    sap.m.MessageBox.information("저장할 데이터를 선택하세요.");
                    return; // 중단
                }

                // 여기가 실행된다는 것은 aIndex 에 한 줄 이상 있다는 뜻

                let oModel = oView.getModel();
                let successCount = 0;
                let errorCount = 0;

                // 선택한 라인마다 전부 oModel.update(경로, 변경할 데이터, 결과처리);
                // 배열 aIndex 의 인덱스 정보를 index 변수에 전달하면서 반복
                for( const index of aIndex ){
                    let oContext = oTable.getContextByIndex(index);
                    let carrid = oContext.getProperty("Carrid");
                    let path = oContext.getPath();
                    let data = oContext.getProperty(); // 변경된 데이터

                    oModel.update( path , data , {
                        success: function () {
                            successCount++;
                            // successCount = successCount + 1;
                            if ( aIndex.length == successCount ){
                                // 모두 성공했을 떄
                                sap.m.MessageBox.success( 
                                    successCount + 
                                    " 건의 데이터가 변경이 완료되었습니다."
                                );
                            } else if ( aIndex.length == successCount + errorCount ) {
                                // 일부는 에러가 발생했을 때
                                sap.m.MessageBox.warning(
                                    "성공 " + successCount + "건 , 실패 " + errorCount + "건이 발생했습니다." 
                                );
                            }
                        },
            error: function () {
                errorCount++;

                    if ( aIndex.length == errorCount ) {
                        // 모두 실패했을 떄
                        sap.m.MessageBox.error(errorCount + "건의 데이터가 변경실패 하였습니다.")
                        } else if ( aIndex.length == successCount + errorCount ) {
                        // 일부는 성공했을 때
                       sap.m.MessageBox.warning(
                        "성공 " + successCount + "건 , 실패 " + errorCount + "건이 발생했습니다." 
                        );
                    }
                }
                });
                }
            }

        });
    });