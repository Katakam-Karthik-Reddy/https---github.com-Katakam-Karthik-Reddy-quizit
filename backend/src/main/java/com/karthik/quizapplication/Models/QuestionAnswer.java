package com.karthik.quizapplication.Models;

import lombok.Data;

@Data
public class QuestionAnswer {
    private Question question;
    private String selectedanswer;
}
