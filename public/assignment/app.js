require("babel-polyfill");

(function () {
    angular
        .module("WebAppMaker", ['ngRoute', "wbdvDirectives"]);

    async function lott() {
        await new Promise((resolve, reject) => resolve(8));
        return "abcddd";
    }

    lott().then(console.log);
})();