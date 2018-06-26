    requirejs.config({
    //By default load any module IDs from js/v20
    baseUrl: 'js/v20',
    paths:
        {
        
        }
    });

    define (function(require) {

        var context = require("./context");
        var ctx = new context.Context("mysite.com",80,false,"lol");
        var accountId = "101-004-8523412-001"
        ctx.setToken("5fab1156c59dba001f91c7e329581e6d-fcec4321d69b2953c561bf7b511aface");
        ctx.setUrl("https://api-fxpractice.oanda.com");
        var handler = function(response)
        {
            //$(document)(response.rawBody);
             console.log(response.method);
             console.log(response.rawBody);
             console.log("finished!")
             var account = JSON.parse(response.rawBody).account;
             console.log(account);
             $(document).ready(function(){
                 $(".account p").text(account.balance);
              
             });
        }
        ctx.account.get(accountId,handler);
    });