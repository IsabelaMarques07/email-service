package com.servico.email.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.servico.email.model.EmailModel;
import com.servico.email.repository.EmailRepository;
import com.servico.email.service.EmailService;

@RestController
public class EmailController {
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private EmailRepository emailRepository;
	
	@PostMapping("/send-email")
	public ResponseEntity<EmailModel> sendEmail(@RequestBody EmailModel model){
		emailService.sendEmail(model);
		return new ResponseEntity(model, HttpStatus.OK);
	}
	
	@GetMapping("/emails")
	public List<EmailModel> getEmails(){
		List<EmailModel> emailsList = emailRepository.findAll();
		return emailsList;
	}
}
