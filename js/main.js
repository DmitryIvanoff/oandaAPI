    requirejs.config({
    //By default load any module IDs from js/v20
    baseUrl: 'js/v20',
    paths:
        {
        
        }
    });

    define (function(require,exports, module) {
        "use strict"

        var accounts = {};
        var instruments = {};
        var pricing = {};
        var context = require("./context");
        var OandaAPI = new context.Context("mysite.com",80,false,"lol");
        OandaAPI.setToken("5fab1156c59dba001f91c7e329581e6d-fcec4321d69b2953c561bf7b511aface");
        OandaAPI.setUrl("https://api-fxpractice.oanda.com");
        //exports.OandaAPI = OandaAPI;

        function AccsHandler(response){
            accounts.list = JSON.parse(response.rawBody).accounts;
            accounts.summary={};
            $(".accounts_summary li.nav-item").remove();
            $(".accounts_summary .tab-pane").remove();
            accounts.list.forEach(function (item,i,arr){
                var SummaryHandler = function(response){
                    var account = JSON.parse(response.rawBody).account;
                    //console.log(account);
                    accounts.summary[i]=(account);         
                    //console.log(account.instruments)
                    var elem = "<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#"+(i)+"'>"+account.alias+"</a></li>";
                    $(".accounts_summary ul.nav").append(elem);
                    elem = '<div class="tab-pane container" id="'+(i)+'"></div>';
                    $(".accounts_summary .tab-content").append(elem);  
                    //console.log(accounts);
                   //OandaAPI.account.get(accounts.list[0].id,AccountHandler);
                    elem='<h3></h3>' 
                    $(".accounts_summary #"+(i)).append(elem);  
                    $(".accounts_summary #"+(i)+" h3").addClass('panel-heading'); 
                    $(".accounts_summary #"+(i)+" h3").text(account.alias+":");
                    for (var key in account){
                        elem ='<p class="'+key+'">'+key+': '+account[key]+'</p>'
                        $(".accounts_summary #"+(i)).append(elem);
                    }
           
                };
                SummaryHandler.i=accounts.list.length-1-i; 
                $('.accounts_summary .nav-tabs a[href="#'+(i)+'"]').on('show.bs.tab', function(){
                    OandaAPI.account.summary(item.id,SummaryHandler);
                });
                $('.accounts_summary .nav-tabs a[href="#'+(i)+'"]').on('hidden.bs.tab', function(){
                        
                }); 
                OandaAPI.account.summary(item.id,SummaryHandler);
            }) 
            $(".accounts_summary .nav-tabs a").click(function(){
                $(this).tab('show');
            });
            $('.accounts_summary .nav-tabs a[href="#'+0+'"]').tab('show');              
            var queryParams = {
                instruments: "EUR_USD"
            };
            setInterval(function(){
            OandaAPI.pricing.get(accounts.list[accounts.list.length-1].id,queryParams,PricingHandler)},
            1000);
        };

        function InstrumentsHandler(response){
            instruments.instruments = JSON.parse(response.rawBody).instruments;
            //console.log(account.instruments);
            for (let i = 0;i<instruments.length;++i)
            {   
                $(".layout_account .instruments").append("<li>"+instruments[i].displayName+"</li>");
            }
        };
        function AccountHandler(response){
        
            accounts.current = JSON.parse(response.rawBody).account;
            $(".accounts_summary .balance").text("Balance: " + accounts.current.balance +' '+ accounts.current.currency);
        }
        function PricingHandler(response){
            var tempObj = JSON.parse(response.rawBody);
            pricing.time = tempObj.time;
            pricing.prices = tempObj.prices;
            //console.log(pricing);
            $(".layout_pricing p.instrument").text("instrument: " + pricing.prices[0].instrument);
            $(".layout_pricing p.ask").text("ask: " + pricing.prices[0].closeoutAsk);
            $(".layout_pricing p.bid").text("bid: " + pricing.prices[0].closeoutBid);
            $(".layout_pricing p.time").text("time: " + pricing.time)
        };
        OandaAPI.account.list(AccsHandler);

    });