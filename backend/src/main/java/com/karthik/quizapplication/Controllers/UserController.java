package com.karthik.quizapplication.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karthik.quizapplication.Models.UserDTO;
import com.karthik.quizapplication.Services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getuser")
    public UserDTO getUser(Authentication authentication) {
        return userService.findByEmail(authentication.getName());
    }
}
