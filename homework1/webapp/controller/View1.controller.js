sap.ui.define([
        "sap/ui/core/mvc/Controller"
    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller) {
            "use strict";
    
            return Controller.extend("sync.e03.homework1.controller.View1", {
    
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
                    // sap.m.MessageToast.show(oContext.getProperty("Carrid"))
                    sap.m.MessageToast.show("선택하신 라인은 항공사: " + oContext.getProperty("Carrid") + ", 항공편: " + oContext.getProperty("Connid") + "의 정보입니다.");

            },
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            onButtonClick: function() {
                //Popup.fragment.xml 을 팝업창으로 호출하는 로직
                let oView = this.getView();
                let oDialog = this.byId("idDialog");
                let oInput = this.byId("idInput"); // View에서 idInput인 id를 가진 Elemnet를 찾는다.
                let name = "건우"
                
                if ( oDialog ){
                    // 팝업창의 텍스트 Element 중 id 가 idNAMEText 인 항목을 찾아서
                    let oNameText = this.byId("idNAMEText");
                    oNameText.setText(name); // 이름이 입력된 입력필드의 값을 전달함

                    oDialog.open(); // Fragment를 Load 한 적이 있으면 byId로 찾을 수 있다.
                                    // 그렇게 찾은 Fragment를 팝업창으로 보여준다.
                } else { 
                    // Popup.fragment.xml 파일을 읽어옴
                    // Controller도 연결함
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sync.e03.homework1.view.info",
                        type: "XML",
                        controller: this
                    });

                    // Fragment Load 가 완료되면 Main View에 연결함 ( Main View의 모델도 이용 가능)
                    oFragment.then(function( oDialog ) {
                        oView.addDependent(oDialog); // View 에 연결

                        let oNameText = oView.byId("idNAMEText");
                        oNameText.setText(name);

                        oDialog.open(); // 팝업창 출력
                    }); 
                }
            },

            onDialogClose: function() {
                let oDialog = this.byId("idDialog");
                if ( oDialog ){
                    oDialog.close(); // 팝업창이 닫침.
                }
            }
            
        });
        });
        // 라디오버튼을 선택하는 순간, oEvent에 선택한 라인에 대한 정보가 들어옴
        //그래서 listitem 이라는 정보를 달라고 해서 oItem에 정보를 받음
        // 겟 바인딩