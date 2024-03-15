sap.ui.define([
    "sap/ui/model/SimpleType",
    "sap/ui/mode/VaildateException"
    ],

    function ( SimpleType ) {
        "use strict";
        return SimpleType.extend("sync.e03.exercise12.model.type.Connid", {

            formatValue: function (oValue) {
                // 입력된 값 그대로 화면에 출력할 경우
                return oValue;

            },
            
            parseValueL: function (oValue) {
                return oValue;
            }
        });
    });