/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['N/record'],function (record) {
    "use strict";

    function saveOrderDetails(context) {
        try {

            var OrderId = context.request.parameters ? (context.request.parameters.internalid) : null;
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: OrderId,
                isDynamic: true // Set to true if you need to interact with sublist data
            });
            var currentMemo = salesOrder.getValue('custbody_comments');
            var oldMemo = salesOrder.getValue('memo');
            salesOrder.setValue({
                fieldId: 'memo',
                value: currentMemo
            });
            salesOrder.setValue({
                fieldId: 'custbody_comments',
                value: oldMemo
            });
            var id = salesOrder.save();
        } catch (error) {
            log.error('Error fetching order details', error);
        }
        return context.response.write(JSON.stringify({ salesorder: OrderId }));
    }
    return {
        service: saveOrderDetails
    };
});
