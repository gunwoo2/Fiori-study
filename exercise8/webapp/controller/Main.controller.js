sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    
],
    /**
     
@param {typeof sap.ui.core.mvc.Controller} Controller*/
  function (Controller, JSONModel) {"use strict";

        return Controller.extend("sync.e03.exercise8.controller.Main", {
            onInit: function () {
                let oModel = new JSONModel({
                    name: "건우"
                });
                let oView  = this.getView();
                oView.setModel(oModel); // JSON Model 정보를 현재 View에 등록
            },

            onButtonClick: function() {
                sap.m.MessageToast.show("버튼을 클릭했습니다.");
                // MessageToast.show("버튼을 클릭했습니다.");

                //Popup.fragment.xml 을 팝업창으로 호출하는 로직
                let oView = this.getView();
                let oDialog = this.byId("idDialog");
                let oInput = this.byId("idInput"); // View에서 idInput인 id를 가진 Elemnet를 찾는다.
                let name = oInput.getValue(); // 입력필드의 값을 Name에 저장한다.
                
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
                        name: "sync.e03.exercise8.view.Popup",
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