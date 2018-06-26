    requirejs.config({
    //By default load any module IDs from js/v20
    baseUrl: 'js/v20',
    paths:
        {
        
        }
    });
    define (function(require,exports, module) {
        "use strict"
        var context = require("./context");
        var account;
        var handler = function(response){

                            console.log(response.method);
                            console.log(response.rawBody);
                            console.log("finished!")
                            account = JSON.parse(response.rawBody).account;
                            console.log(account);
                            $(document).ready(function(){
                                $("header p").text(account.balance);
                            });
                        };
        var accountId = "101-004-8523412-001";
        var OandaAPI = new context.Context("mysite.com",80,false,"lol");
        OandaAPI.setToken("5fab1156c59dba001f91c7e329581e6d-fcec4321d69b2953c561bf7b511aface");
        OandaAPI.setUrl("https://api-fxpractice.oanda.com");
        exports.OandaAPI = OandaAPI;
        OandaAPI.account.get(accountId,handler);

    });