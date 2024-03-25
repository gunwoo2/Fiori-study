    sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel"
    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller, Fragment, JSONModel ) {
            "use strict";
    
            return Controller.extend("sync.e03.ex3.controller.View1", {
    
                initAirlineData: {
                    Carrid: "",
                    Connid: ""
                  
                },
    
                onInit: function () {
                    let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");

                // 통화코드 콤보박스를 위해 추가함
                let viewData = {
                    Distid: [
                        { key: 'KM', name: '킬로미터'},
                        { key: 'MI', name: '마일'},    
                    ],
                    // CreatMode 가 true 면 (생성일 시) 항공사 ID가 열리도록
                    // false 면 닫히도록 하기 위해 아래 코드를 추가했고 처음 값은 true 로 선언함
                    CreateMode: true
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");
                    
                },
    
                onCreate: function () {
                    // 아무것도 입력되지 않은 깨끗한 상태의 팝업창
                    let data = {
                        Carrid: "",
                        Connid: ""
                    
                    };
    
                    let oNewModel = new JSONModel(data);
                    this.getView().setModel(oNewModel, "new");
    
                    let oViewModel = this.getView().getModel("view");
    
                    // 항공사ID, 항공사명, 통화코드, 웹페이지주소가 입력이 가능해야 한다.
                    this.openDialog();
                },
    
                openDialog: function () {
                    let oView = this.getView();
                    let oDialog = oView.byId("idNewDialog");
    
                    if (oDialog) {
                        oDialog.open();
                    } else {
                        Fragment.load({
                            id: oView.getId(),
                            name: "sync.e03.ex3.view.New",
                            type: "XML",
                            controller: this                // View의 Main Controller 를 공유
                        }).then(function (oDialog) {
                            oView.addDependent(oDialog);    // View의 Model을 공유, 현재 경로 포함
                            oDialog.open();
                        });
                    }
                },

                onSaveConfirm: function () {
                    let oView = this.getView();
                    let oNewModel = oView.getModel("new");  // JSON  Model
                    let oModel = oView.getModel();          // OData Model
    
                    let newData = oNewModel.getData();
                    // newData = { Carrid:"~~", Carrname:"~~~", ... }
    
                    debugger;
    
                    let oViewModel = oView.getModel("view");
    
                    
                        // 생성
                        // oModel.create(경로, 신규 데이터, 결과처리);
                        // HTTP Method 에서 POST 방식으로 호출하는 방법
                        oModel.create(
                            // 경로, 신규데이터, 결과처리
                            "/ConnectionSet",
                            newData,
                            {
                                success: function (oData, oResponse) {
                                    // oData : 생성된 데이터 내용
                                    // oResponse : 응답결과
                                    debugger;
                                    sap.m.MessageToast.show(oData.Carrid + "항공사가 생성되었습니다.");
                                },
                                error: function (oError) {
                                    debugger;
                                    sap.m.MessageBox.error("생성 중 오류가 발생되었습니다.");
                                }
                            }
                        );
                    
    
    
    
    
                    // 생성을 위한 팝업창 닫기
                    this.onSaveCancel();
                },
    
                onSaveCancel: function () {
                    let oDialog = this.getView().byId("idNewDialog");
                    if (oDialog) {
                        oDialog.close();
                    }
    
                    // 빈값만 있는 정보로 새로운 JSONModel을 만들어서
                    // 기존의 new 모델을 교체해버림 =>> 데이터 초기화
                    let oNewModel = this.getView().getModel("new");
                    oNewModel.setData({
                        Carrid: "",
                        Connid: ""
                    });

                    let oComboBox = this.byId("idComboBox");
                    oComboBox.setSelectedKey("");
                    oComboBox.setSelectedItem("");
                    oComboBox.setSelectedItemID("");
                },  
    
    
                onDelete: function () {
    
                    debugger;
    
                    let oTable; // oTable 이라는 이름의 변수를 선언
                    oTable = this.byId("idTable"); // View 에서 id 속성값이 idTable 인 항목을 찾음
    
                    let aIndex = oTable.getSelectedIndices(); // 선택한 행들의 인덱스들의 정보
    
                    if (!aIndex || aIndex.length == 0) {  // 선택된 항목이 없을 때
                        sap.m.MessageBox.information("삭제할 라인을 선택하세요.");
                        return; // 메시지를 출력하고 중단
                    }
    
                    // oDatat 모델을 View 에서 가져온다
                    let oModel = this.getView().getModel();
    
    
                    // const 는 상수를 선언하는 방법, 상수는 값이 변경되지 않는 특징이 존재함
                    for (const index of aIndex) {
    
                        // 선택된 라인들 중 순서대로 하나씩 모델 연결정보 가져옴
                        let oSelectedContext = oTable.getContextByIndex(index);
                        let carrid = oSelectedContext.getProperty("Carrid");
    
                        // 해당 모델의 정보에 대한 경로
                        let path = oSelectedContext.getPath();
    
                        // oData 모델의 remove(경로, 결과처리) 메소드를 이용하면,
                        // 해당 데이터를 삭제명령 보낼 수 있다.
                        // 해당 삭제 명령은 이 경우 sap gateway의 YE03_GW005의 
                        // CARRIERSET_DELETE_ENTRY 메소드가 실행된다.
                        oModel.remove(path, {
                            success: function () {
                                // Exception 이 발생하지 않은 경우
                                sap.m.MessageBox.success(carrid + "항공사를 성공적으로 삭제하였습니다.");
                                oTable.clearSelection();
                            },
                            error: function (oError) {
    
                            }
    
                        });
                    }
    
                },
                onCurrencyChange: function (oEvent) {
                    let oItem = oEvent.getParameter("selectedItem");
                    let oNewModel = this.getView().getModel("new");
                    oNewModel.setProperty("/Distid", oItem.getKey());
                },
            });
        });