/*jslint node: true */
"use strict";

var soap = require('soap');
var http = require('http');

var chargeService = {
    ChargeImplService: {
        ChargeImpl: {
            charge : function(args) {
                var request = require('request');
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://167.205.35.221:8080/engine-rest/message',
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

var payService = {
    PayImplService: {
        PayImpl: {
            pay : function(args) {
                var request = require('request');
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://167.205.35.221:8080/engine-rest/message',
                    body: {"message-type" : "pay-trigger",
                    "processVariables" : {
                        "transaction_id" : {"value" : args.arg0, "type": "String"}
                    }}
                }, function(error, response, body){
                    console.log(body);
                });

            }
        }
    }
};

var refundService = {
    RefundImplService: {
        RefundImpl: {
            pay : function(args) {
                var request = require('request');
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://167.205.35.221:8080/engine-rest/message',
                    body: {"message-type" : "refund",
                    "processVariables" : {
                        "customer_id" : {"value" : args.arg0, "type": "Integer"},
                        "transaction_id" : {"value" : args.arg1, "type": "String"},
                        "acc_number" : {"value" : args.arg2, "type": "String"},
                        "bank" : {"value" : args.arg3, "type": "String"},
                        "amount" : {"value" : args.arg4, "type": "Long"}
                    }}
                }, function(error, response, body){
                    console.log(body);
                });

            }
        }
    }
};

var cancelService = {
    CancelImplService: {
        CancelImpl: {
            pay : function(args) {
                var request = require('request');
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://167.205.35.221:8080/engine-rest/message',
                    body: {"message-type" : "refund",
                    "processVariables" : {
                        "customer_id" : {"value" : args.arg0, "type": "Integer"},
                        "transaction_id" : {"value" : args.arg1, "type": "String"}
                    }}
                }, function(error, response, body){
                    console.log(body);
                });

            }
        }
    }
};

var chargeXml = require('fs').readFileSync('charge.xml', 'utf8');
var payXml = require('fs').readFileSync('pay.xml', 'utf8');
var refundXml = require('fs').readFileSync('refund.xml', 'utf8');
var cancelXml = require('fs').readFileSync('cancel.xml', 'utf8');

var server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url);
});

server.listen(8001);
soap.listen(server, '/soap/charge', chargeService, chargeXml);
soap.listen(server, '/soap/pay', payService, payXml);
soap.listen(server, '/soap/refund', refundService, refundXml);
soap.listen(server, '/soap/cancel', cancelService, cancelXml);