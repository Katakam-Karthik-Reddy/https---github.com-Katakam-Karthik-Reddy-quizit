package com.karthik.quizapplication;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.karthik.quizapplication.Models.User;
import com.karthik.quizapplication.Repositories.UserRepository;

@SpringBootApplication
public class QuizapplicationApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizapplicationApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("admin").isPresent())
				return;
			// 1, "admin", passwordEncoder.encode("admin"), roles
			User adminuser = new User();
			adminuser.setUsername("admin");
			adminuser.setEmail("admin@gmail.com");
			adminuser.setPassword(passwordEncoder.encode("admin"));
			adminuser.setRole("ADMIN");
			adminuser.setCompletedquizs(new ArrayList<>());
			adminuser.setEnabled(true);
			userRepository.save(adminuser);

		};
	}
}
