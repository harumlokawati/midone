package com.payme.paymentgateway.businesslogic;

import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;   

import com.payme.paymentgateway.connection.*;
import com.payme.paymentgateway.mailing.*;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.ejb.Stateless;
import javax.inject.Named;
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
import java.util.Map;
import java.util.logging.Logger;

@Stateless
@Named
public class PaymentBusinessLogic {
  private final static Logger LOGGER = Logger.getLogger("Payment");

  public void SendPaymentData(DelegateExecution delegateExecution) throws Exception {
	  Map<String, Object> variables = delegateExecution.getVariables();
	  String email = variables.get("email").toString();
	  
	  JSONObject body = new JSONObject();
	  
	  body.put("customer", variables.get("customer_id"));
	  body.put("type", "payment");
	  body.put("status", "0");
	  body.put("amount", variables.get("amount"));
	  body.put("paymentMethod", variables.get("payment_method"));
	  body.put("paymentProvider", variables.get("payment_provider"));
	  LOGGER.info(body.toString());
	  

	  
	  HTTPConnection con = new HTTPConnection();
	  String resp = con.POST("http://localhost:3000/transaction", body.toString());
	  LOGGER.info(resp);
	  JSONParser parser = new JSONParser();
	  JSONObject jsonResp = (JSONObject) parser.parse(resp);
      GoogleMail mailing = new GoogleMail(email , "[PAYME] Payment Code", "Payment request accepted, waiting for your payment with code : "+jsonResp.get("_id"));
      mailing.Send();

      delegateExecution.setVariable("transactionId", jsonResp.get("_id"));
  }

  public void FraudCheck(DelegateExecution delegateExecution) {
	  Map<String, Object> variables = delegateExecution.getVariables();
	  Integer customer = (Integer) variables.get("customer_id");
	  Integer amount = (Integer) variables.get("amount");
	  boolean fraud = false;
	  
	  if((amount > 1000)&&(customer > 1000)) {
		  fraud = true;
	  }
	  delegateExecution.setVariable("fraud", fraud);
  }
  
  public void SaveTransaction(DelegateExecution delegateExecution) throws Exception {
	  LOGGER.info("Save Transaction...");
	  Map<String, Object> variables = delegateExecution.getVariables();
	  String transaction_id = variables.get("transaction_id").toString();
	  HTTPConnection con = new HTTPConnection();
	  JSONObject body = new JSONObject();
	  body.put("status", 1);
	  String resp = con.PUT("http://localhost:3000/transactionstatus/"+transaction_id, body.toString());
	  LOGGER.info(resp);
	  
  }
  
  public void PaymentProcessRequest(DelegateExecution delegateExecution) {
	  LOGGER.info("Process Payment");
  }
  
  public void SendInvoice(DelegateExecution delegateExecution) throws Exception {
	  LOGGER.info("Send Invoice...");

	  Map<String, Object> variables = delegateExecution.getVariables();
	  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
	  LocalDateTime now = LocalDateTime.now(); 

	  JSONObject body = new JSONObject();

	  body.put("customer", variables.get("customer_id"));
	  body.put("type", "payment");
	  body.put("amount", variables.get("amount"));
	  body.put("paymentMethod", variables.get("payment_method"));
	  body.put("paymentProvider", variables.get("payment_provider"));
	  body.put("note", variables.get("payment done")); 
	  body.put("time", dtf.format(now));
	  
	  LOGGER.info(body.toString());
	  HTTPConnection con = new HTTPConnection();
	  String resp = con.POST("http://localhost:3000/invoice", body.toString());
	  JSONParser parser = new JSONParser();
	  JSONObject jsonResp = (JSONObject) parser.parse(resp);
	  
	  String email = variables.get("email").toString();
	  
	  String email_text = "----------------------INVOICE----------------------\n";
	  email_text += "Invoice ID : " + jsonResp.get("_id") + "\n";
	  email_text += "Transaction ID : " + variables.get("transaction_id") + "\n";
	  email_text += "Type : Payment \n";
	  email_text += "Method : " + variables.get("payment_method") + "\n";
	  email_text += "Provider : " + variables.get("payment_provider") + "\n";
	  email_text += "Payment done in : " + dtf.format(now) + "\n";
	  
      GoogleMail mailing = new GoogleMail(email, "[PAYME] Invoice Payment", variables.toString());
      mailing.Send();
  }
}