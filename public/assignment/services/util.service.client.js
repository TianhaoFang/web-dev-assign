(function () {
    angular
        .module("WebAppMaker")
        .factory("UtilService", UtilService);

    function UtilService() {
        return {
            parseData(httpResponse){
                return httpResponse.data;
            },
            alertError(httpResponse){
                let message = httpResponse.message;
                console.error(httpResponse);
                if(message) alert(message);
                else alert(httpResponse);
            },
            catchWithAlert(callback){
                return callback().catch(this.alertError);
            }
        }
    }
})();