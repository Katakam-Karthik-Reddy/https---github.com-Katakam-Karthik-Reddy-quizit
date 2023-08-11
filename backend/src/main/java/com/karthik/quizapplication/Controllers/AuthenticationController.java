package com.karthik.quizapplication.Controllers;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karthik.quizapplication.Models.LoginDTO;
import com.karthik.quizapplication.Models.LoginResponceDTO;
import com.karthik.quizapplication.Models.RegisterDTO;
import com.karthik.quizapplication.Services.UserService;

@RestController
@RequestMapping("/auth")
// @CrossOrigin(value = "*")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDTO registerDTO) {
        String result = userService.registerUser(registerDTO);
        if (result.equalsIgnoreCase("userExist")) {
            return new ResponseEntity<String>("falild, userexist", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponceDTO> login(@RequestBody LoginDTO loginDTO) {
        LoginResponceDTO responce = null;
        try {
            responce = userService.loginUser(loginDTO.getUsername(), loginDTO.getPassword());
        } catch (NoSuchElementException e) {
            return new ResponseEntity<LoginResponceDTO>(responce, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responce, HttpStatus.OK);
    }

}
