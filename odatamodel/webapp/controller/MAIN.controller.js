sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e03.odatamodel.controller.MAIN", {
            
            onInit: function () {
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");

                // 통화코드 콤보박스를 위해 추가함
                let viewData = {
                    Currency: [
                        { key: 'KRW', name: '원화'},
                        { key: 'USD', name: '달러'},
                        { key: 'CAD', name: '캐나다달러'},
                    ],
                    // CreatMode 가 true 면 (생성일 시) 항공사 ID가 열리도록
                    // false 면 닫히도록 하기 위해 아래 코드를 추가했고 처음 값은 true 로 선언함
                    CreateMode: true
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");
            },

            // 통화 코드를 위해 추가함
            onCurrencyChange: function (oEvent) {
                let oItem = oEvent.getParameter("selectedItem");
                let oNewModel = this.getView().getModel("new");
                oNewModel.setProperty("/Currcode", oItem.getKey());
            },

            onCreate: function () {
                // 아무것도 입력되지 않은 깨끗한 상태의 팝업창
                // 항공사 ID, 항공사명, 통화코드, 웹페이지 주소가 입력 가능해야 함
                let data = {
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""
                };

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                // Carrid 필드 입력할 수 있게 열리는 로직임
                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", true);
                // 항공사 ID, 항공사명, 통화코드, 웹페이지 주소가 입력이 가능해야 함.
                this.openDialog();
            },

            onUpdate: function ( oEvent ) {
                // 내가 선택한 라인의 데이터가 자동으로 입력되어 있는 상태의 팝업창을 원함
                let oButton = oEvent.getSource();
                let oContext = oButton.getBindingContext();
                let path = oContext.getPath();  // 내가 선택한 라인과 모델의 경로 /CarrierSet ('AA')
                let data = oContext.getProperty(); // ?? 무슨 데이터가 들어가는거지?

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                // Carrid 필드 입력할 수 없게 닫히는 로직임
                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", false);

                // 항공사 ID는 입력할 수 없고 (키필드이므로),
                // 항공사명, 통화코드, 웹페이지 주소가 입력 가능해야 함
                this.openDialog();
            },

            openDialog: function () {
                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if ( oDialog ) {   
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.odatamodel.view.New",
                        type: "XML",
                        controller: this            // View의 Controller 를 공유
                    }). then(function (oDialog) {
                        oView.addDependent(oDialog); // View의 Model을 공유
                        oDialog.open();
                    });               
                 }

            },
            onSaveCancel: function ( ){
                   let oDialog = this.getView().byId("idNewDialog");
                   if ( oDialog ) {
                       oDialog.close();
                   }
                    // new 모델의 데이터를 초기화 (무시)
                    // 기존의 new 모델을 교체해버림 =>> 데이터 초기화 (무시)
                    // 빈 값만 있는 정보로 기존의 new 모델의 데이터를 교체해버림
                 let oNewModel = this.getView().getModel("new");
                 oNewModel.setData({
                        Carrid: "",
                        Carrname: "",
                        Currcode: "",
                        Url: ""
                        });
                //let oNewModel = this.getView().getModel("new");
                //oNewModel.setData(this.initAirlineData);
                //this.getView().setModel(oNewModel, "new");
                    
                    // ComboBox 에 선택된 내용을 지우는 과정
                let oComboBox = this.byId("idComboBox");
                oComboBox.setSelectedKey("");
                oComboBox.setSelectedItem("");
                oComboBox.setSelectedItemID("");
            },

            onSaveConfirm: function ( ){
                let oView = this.getView();
                let oNewModel = oView.getModel("new"); // json 모델
                let oModel = oView.getModel();        // oData 모델

                let newData = oNewModel.getData();
                // newData = { Carrid: "", Carrname: "", Currcode: "", Url: "" }
                    
                    
                debugger;

                // view model 을 가져옴
                let oViewmodel = oView.getModel("view");
                let CreateMode = oViewmodel.getProperty("/CreateMode"); // <-- true(생성일 때) 혹은 false(수정일 때) 가 들어가 있음
                    
                if (CreateMode) {
                    // 생성
                    // oModel.create(경로, 신규 데이터, 결과처리);
                    // HTTP Method 에서 POST 방식으로 호출하는 방법
                    oModel.create(
                        "/CarrierSet",
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
                        
                    } else {
                        // 수정
                        // oModel.update(경로, 변경될 데이터, 결과처리)
                        oModel.update(
                        // /CarrierSet('AA') 와 같이 만들기 위해 문자열 /CarrierSet(' 와')의 사이에 항공사 코드(AA) 를 합치는 작업
                        "/CarrierSet('" + newData.Carrid + "')",
                        newData,
                        {
                            success: function( ) {
                                sap.m.MessageToast.show( newData.Carrid + " 항공사가 수정되었습니다.");
                            },
                            error: function( oError ) {
                                sap.m.MessageBox.error( "수정 중 오류가 발생되었습니다.");
                            }

                        }

                    )
                    };

                    // 생성을 위한 팝업창에서 데이터를 저장하면 팝업창이 닫아짐.
                    // 즉 팝업창 닫기가 수행됨.
                this.onSaveCancel();
            },

            onDelete:function( oEvent ) {
                    // oEvent의 getSource()는 이벤트가 발생한 오브젝트를 의미
                debugger;
                let oButton = oEvent.getSource();   // 특정 라인의 버튼
                let oContext = oButton.getBindingContext(); // 그 버튼에 연결된 Model 정보
                let path = oContext.getPath();  // Model 정보의 경로 ( /CarrierSet('AA') )

                let oView = this.getView();
                let oModel = oView.getModel();

                // http mehod 에서 delete에 해당하는 명령
                oModel.remove(
                        // 삭제할 데이터의 경로, 결과처리
                    path, 
                    {
                        
                        success: function(){
                            sap.m.MessageToast.show("항공사 삭제됨");
                        },
                        error: function(oError){
                            sap.m.MessageBox.error("삭제중 오류가 발생되었습니다.");
                        }
                    });
            },

            onRefresh: function () {
                // let oModel = new.sap.ui.model.odata.v2.ODataModel();

                // let 은 변수를 선언하지만 특별하게 타입을 구별하지는 않음
                // 아래와 같이 /** @type {타입} */ 을 적게 되는 경우
                // 그 아래에 나온 let 으로 선안한 변수는
                // 특정 타입으로 지정되어 손쉽게 정보를 얻을 수 있다
                /** @type {sap.ui.model.odata.v2.ODataModel} */
                let oModel = this.getView().getModel();
                oModel.refresh();
            }
        });
    });

    