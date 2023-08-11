package com.karthik.quizapplication.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.karthik.quizapplication.Models.CompletedQuiz;
import com.karthik.quizapplication.Models.Question;
import com.karthik.quizapplication.Models.QuizResponse;
import com.karthik.quizapplication.Models.Quizdata;
import com.karthik.quizapplication.Services.QuestionService;

@RestController
@RequestMapping("/api/question")
public class ApiController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id);
    }

    // @GetMapping("/random/{count}")
    // public List<Question> getRandomQuestions(@RequestParam int count, String
    // category, String difficlty) {
    // System.out.println(count + " " + category + " " + difficlty);
    // return questionService.getRamdomQestions(count);
    // }
    @GetMapping("/random")
    public List<Question> getRandomQuestions(@RequestParam int count, @RequestParam String category,
            @RequestParam String difficulty) {
        return questionService.getRamdomQestions(count, category, difficulty);
    }

    @PostMapping("/validateresults")
    public ResponseEntity<UUID> validingquizdata(@RequestBody List<Quizdata> quizdata, @RequestParam String category,
            @RequestParam String difficulty, Authentication authentication) {
        UUID id = questionService.validateQuizdata(quizdata, category, difficulty, authentication.getName());
        return new ResponseEntity<UUID>(id, HttpStatus.OK);
    }

    @GetMapping("/quizresult/{uuid}")
    public ResponseEntity<QuizResponse> getQuizResult(@PathVariable String uuid) {
        UUID id = UUID.fromString(uuid);
        QuizResponse quizResponse = questionService.getResultByUuid(id);
        return new ResponseEntity<QuizResponse>(quizResponse, HttpStatus.OK);
    }

    @GetMapping("/quizresults")
    public ResponseEntity<List<CompletedQuiz>> getCompletedQuiz(Authentication authentication) {
        List<CompletedQuiz> allquizResults = questionService.getallquizzesbyemailid(authentication.getName());
        return new ResponseEntity<List<CompletedQuiz>>(allquizResults, HttpStatus.OK);
    }

}
