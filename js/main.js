    requirejs.config({
    //By default load any module IDs from js/v20
    baseUrl: 'js/v20',
    paths:
        {
        
        }
    });
    define (function(require,exports, module) {
        "use strict"

        var account={
            info:{},
            instruments:[],
            pricing:{},
        };
        var AccountHandler = function(response){
            /*
            console.log(response.method);
            console.log(response.rawBody);
            console.log("finished!")*/
            account.info = JSON.parse(response.rawBody).account;
            //console.log(account);
            $(".layout_account .balance").text("Balance: " + account.info.balance + account.info.currency)
        };
        var InstrumentsHandler = function(response){
            account.instruments = JSON.parse(response.rawBody).instruments;
            //console.log(account.instruments);
            for (let i =0;i<account.instruments.length;++i)
                {   
                    if (account.instruments[i].type=="CURRENCY")
                    {
                        $(".layout_account .instruments").append("<li>"+account.instruments[i].displayName+"</li>");

                    }
                }

        };
        var PricingHandler = function(response){
            account.pricing = JSON.parse(response.rawBody);
            //console.log(account.pricing);
            $(".layout_pricing p.instrument").text("instrument: " + account.pricing.prices[0].instrument);
            $(".layout_pricing p.ask").text("ask: " + account.pricing.prices[0].closeoutAsk);
            $(".layout_pricing p.bid").text("bid: " + account.pricing.prices[0].closeoutBid);
            $(".layout_pricing p.time").text("time: " + account.pricing.time);
        };
        var context = require("./context");
        var accountId = "101-004-8523412-001";
        var OandaAPI = new context.Context("mysite.com",80,false,"lol");
        OandaAPI.setToken("5fab1156c59dba001f91c7e329581e6d-fcec4321d69b2953c561bf7b511aface");
        OandaAPI.setUrl("https://api-fxpractice.oanda.com");
        exports.OandaAPI = OandaAPI;
        OandaAPI.account.get(accountId,AccountHandler);
        OandaAPI.account.instruments(accountId,{},InstrumentsHandler);
                var queryParams = {
                    instruments: "EUR_USD"
                }
        setInterval(function(){
                    OandaAPI.pricing.get(accountId,queryParams,PricingHandler)
                    },1000);
        //OandaAPI.pricing.get(accountId,{},PricingHandler);
        //OandaAPI.account.get(accountId,AccountHandler);

    });