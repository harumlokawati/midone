package com.payme.paymentgateway.mailing;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class GoogleMail {
	private String receiver;
	private String message;
	private String subject;
	
	public GoogleMail(String receiver, String subject, String message){
		this.receiver = receiver;
		this.message = message;
		this.subject = subject;
	}

	public void Send() {
		final String username = "mailpaymegateway@gmail.com";
        final String password = "AnarchyintheUK77!";

        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
          new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
          });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("mailpaymegateway@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                InternetAddress.parse(this.receiver));
            message.setSubject(this.subject);
            message.setText(this.message);

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
	}
}