package com.karthik.quizapplication.Services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.karthik.quizapplication.Models.LoginResponceDTO;
import com.karthik.quizapplication.Models.RegisterDTO;
import com.karthik.quizapplication.Models.User;
import com.karthik.quizapplication.Models.UserDTO;
import com.karthik.quizapplication.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    private TokenService tokenService;

    public String registerUser(RegisterDTO registerDTO) {
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            return "userExist";
        } else {
            User newUser = new User();
            newUser.setUsername(registerDTO.getUsername());
            newUser.setEmail(registerDTO.getEmail());
            newUser.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            newUser.setEnabled(true);
            newUser.setCompletedquizs(new ArrayList<>());
            newUser.setRole("USER");
            userRepository.save(newUser);
            return "userRegistered";
        }
    }

    public LoginResponceDTO loginUser(String username, String UserPassword) {
        Authentication auth = customAuthenticationProvider
                .authenticate(new UsernamePasswordAuthenticationToken(username, UserPassword));
        String token = tokenService.generateJWT(auth);
        return new LoginResponceDTO(token);

    }

    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email).get();
        UserDTO userDTO = new UserDTO();
        if (user != null) {
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            return userDTO;
        }
        return new UserDTO();
    }

}
