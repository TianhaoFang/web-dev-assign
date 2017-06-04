(function () {
    angular
        .module("WebAppMaker")
        .factory("UtilService", UtilService);

    function UtilService() {
        return {
            parseData(httpResponse){
                return httpResponse.data;
            },
            alertError,
            catchWithAlert(callback){
                let promise = callback();
                promise.catch(alertError);
            }
        }
    }

    function alertError(httpResponse){
        let message = null;
        if(httpResponse && httpResponse.data){
            message = httpResponse.data;
            if(message.message){
                message = message.message;
            }
        }
        console.error(httpResponse);
        if(message) alert(message);
        else alert(httpResponse);
    }
})();