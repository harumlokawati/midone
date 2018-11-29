/*jslint node: true */
"use strict";

var soap = require('soap');
var http = require('http');

var service = {
    ChargeImplService: {
        ChargeImpl: {
            charge : function(args) {
                // var n = 1*args.a + 1*args.b;
                // return { sumres : n };

                var request = require('request');
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://167.205.35.221/',
                    body: {"message-type" : "start-payment",
                    "processVariables" : {
                        "customer_id" : {"value" : args.arg0, "type" : "Integer"},
                        "bill_name" : {"value" : args.arg1, "type": "String"},
                        "payment_method" : {"value" : args.arg2, "type": "String"},
                        "email" : {"value" : args.arg3, "type": "String"},
                        "payment_provider" : {"value" : args.arg4, "type": "String"},
                        "amount" : {"value" : args.arg5, "type": "Long"}
                    }}
                }, function(error, response, body){
                    console.log(body);
                });

            }
        }
    }
};

var xml = require('fs').readFileSync('charge.xml', 'utf8');

var server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url);
});

server.listen(8001);
soap.listen(server, '/midone', service, xml);