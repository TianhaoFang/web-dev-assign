(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    function FlickrService($http) {
        let urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&test=TEXT";
        let key = "95a749a852b4e95944cca092880cecf3";

        return {
            searchPhotos(searchTerm){
                const url = urlBase.replace("TEXT", searchTerm).replace("API_KEY", key);
                return $http.get(url).then(response => {
                    let data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    return JSON.parse(data);
                })
            }
        };
    }
})();