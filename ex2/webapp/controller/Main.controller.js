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

        return Controller.extend("sync.e03.ex2.controller.Main", {
            onInit: function() {
                // 뷰 모델 생성
                var oViewModel = new JSONModel({
                    Seatsmax: 0, // 총 좌석 수
                    Seatsocc: 0, // 예약된 좌석 수
                    RemainingSeats: 0 // 잔여 좌석 수
                });
                this.getView().setModel(oViewModel, "view");
            },
    
            // 화면이 그려진 후 호출되는 함수
            onAfterRendering: function() {
                // 뷰 모델 가져오기
                var oViewModel = this.getView().getModel("view");
    
                // Seatsmax와 Seatsocc 값 가져오기
                var seatsMax = oViewModel.getProperty("/Seatsmax");
                var seatsOcc = oViewModel.getProperty("/Seatsocc");
    
                // 잔여 좌석 수 계산
                var remainingSeats = seatsMax - seatsOcc;
    
                // 뷰 모델에 잔여 좌석 수 저장
                oViewModel.setProperty("/RemainingSeats", remainingSeats);
            },

            onSelectionChange: function ( oEvent ) {

                debugger;
                
                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if ( oDialog ) {   
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.ex2.view.Conn",
                        type: "XML",
                        controller: this            // View의 Controller 를 공유
                    }). then(function (oDialog) {
                        oView.addDependent(oDialog); // View의 Model을 공유
                        oDialog.open();
                    });               
                 }
                
            },

            onClosePress: function () {
                let oDialog = this.byId("idDialog");
                if ( oDialog ) {
                    oDialog.close();
                }
            },
            
            onSelectionChange2: function (oEvent) {
                // // 선택한 item 정보를 event로 부터 가져옴
                // let oItem = oEvent.getParameter("listItem");

                // // 선택한 라인에서 출력되는 데이터의 Model의 내용을 가져옴
                // let oContext = oItem.getBindingContext();

                // // 해당 Model 내용의 Carrid 속성을 화면에 출력함
                // // 이때 oContext가 의미하는 것은 다음과 같음
                // // 게이트웨이를 보면 properties가 존재함
                // // 이때 properties의 그룹에서 Carrid 의 이름을 가진 정보를 가져와서
                // // 메시지토스트로 화면에 띄우겠다
                // sap.m.MessageToast.show(oContext.getProperty("Carrid"))

                // // 선택한 라인의 접근 경로
                // let selectedPath = oContext.getPath();
                // // 항공편이 보이는 Table의 ID로 화면의 구성요소를 찾는다
                // let oConnTable = this.byId("idConnTable");

                // // 선택한 라인의 접근 경로를 현재 경로로 취급하도록
                // // 테이블에 bindElement 메소드를 호출한다.
                // // 이렇게 테이블에서 현재 경로를 설정하면 items에 적은
                // // {toConnection} 은 {선택한 항공사/toConnection} 이라고 적은 것과
                // // 같도록 된다.
                // // 이 /CarrierSet('AA')/ 경로에서 {toConnection}
                // oConnTable.bindElement(selectedPath);
                 // Fragment 의 Dialog 를 오픈하도록 한다.
                 let oView = this.getView();
                 let oDialog = oView.byId("idDialog");
                 // View에서 idDialog를 찾는다 가 사실 정석
                 // oDialog = this.byId("idDialog");
                 // oDialog = this.getView().byId("idDialog");
 
                 let currentModelPath = oContext.getPath(); // 모델의 경로를 가져온다.
                 oView.bindElement(currentModelPath);
 
                 if (oDialog) {
                     // Main 화면에서 있을 때
                     // fragment를 load하면 Main 화면에 있게 된다
                     oDialog.open(); // 이미 load한 Fragment를 open
                 } else {
                     // Main 화면에서 없을 때
                     Fragment.load({
                         id: oView.getId(),
                         name: "sync.e03.hw1review.view.Info",
                         type: "XML",
                         controller: this
                     }).then(    // Load가 완료 됬을 때
                         function (oDialog) { // 어떤 로직을 넣어주기 위해 function
                             oView.addDependent(oDialog);
                             oDialog.open();
                         }
                     );  
                     
                 }
        }
            
        });
    });

