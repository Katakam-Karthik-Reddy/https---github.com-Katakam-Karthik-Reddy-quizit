package com.karthik.quizapplication.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
// @CrossOrigin("*")
public class AdminController {

    @CrossOrigin(value = "*")
    @GetMapping("/say")
    public String Admin() {
        return "This is admin";
    }
}
