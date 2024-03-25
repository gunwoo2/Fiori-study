sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.ea.fcl.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
                this._bDescendingSort = false;
                this.oCarrierTable = this.oView.byId("idCarrierTable");
            },

            onSearch: function ( oEvent ) {
                var aFilter = [],
				    sQuery = oEvent.getParameter("query");
                // aFilter, sQuery 체인건거랑 동일함

			if (sQuery && sQuery.length > 0) {
                // Carrname 항공사명으로 검색가능하게끔 만든다.
				var oFilter = new sap.ui.model.Filter("Carrname", FilterOperator.Contains, sQuery);
                aFilter.push(oFilter);
			}

			this.oCarrierTable.getBinding("items").filter(aFilter, "Application");
		
            },

            onSort: function ( oEvent ) {
                // sort 정보를 역으로 바꾸기 위해 ! 를 사용한다.
                // 내림차순인 경우 오름차순으로 바꾸고
                // 오름차순인 경우 내림차순으로 바꾸기 위해 true <=> false 로 전환한다.
                this._bDescendingSort = !this._bDescendingSort;
                var oBinding = this.oCarrierTable.getBinding("items"),
                    oSorter = new sap.ui.mode.Sorter("Carrname", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },
            
        });
    });
