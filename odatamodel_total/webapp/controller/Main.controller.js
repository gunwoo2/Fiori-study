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

        return Controller.extend("sync.e03.odatamodeltotal.controller.Main", {
            // onInit: function () {
            //         this.getView().setModel(new JSONModel({
            //             EditMode: false
            //         }), "view");
            // },
            onInit: function () {
                // 공통적으로 사용할 데이터 정의
                let data = this.initAirlineData;
            
                // 새로운 JSON 모델 생성 및 뷰에 연결
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");
            
                // 통화코드 콤보박스 데이터 설정
                let viewData = {
                    Currency: [
                        { key: 'KRW', name: '원화'},
                        { key: 'USD', name: '달러'},
                        { key: 'CAD', name: '캐나다달러'},
                    ],
                    // CreatMode 가 true 면 (생성일 시) 항공사 ID가 열리도록
                    // false 면 닫히도록 설정
                    CreateMode: true
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");
            
                // EditMode 초기값 설정
                oViewModel.setProperty("/EditMode", false);
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

                // debugger;

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
            },

            onDelete: function () {
                
                // debugger; 

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

                // debugger;

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

                // debugger;

                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if ( oDialog ) {   
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.odatamodeltotal.view.New",
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
                    
                    
                // debugger;

                // view model 을 가져옴
                let oViewmodel = oView.getModel("view");
                let CreateMode = oViewmodel.getProperty("/CreateMode"); // <-- true(생성일 때) 혹은 false(수정일 때) 가 들어가 있음
                    
                if (CreateMode) {
                    // debugger;
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
                                // debugger;
                                sap.m.MessageToast.show(oData.Carrid + "항공사가 생성되었습니다.");
                            },
                            
                            error: function (oError) {
                                // debugger;
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

            onDeleteone:function( oEvent ) {
                    // oEvent의 getSource()는 이벤트가 발생한 오브젝트를 의미
                // debugger;
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


            
        });
    });