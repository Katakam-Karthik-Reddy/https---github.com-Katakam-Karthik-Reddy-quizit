package com.karthik.quizapplication.Models;

import java.util.Date;

import lombok.Data;

@Data
public class CompletedQuiz {

    private String quizid;
    private String category;
    private String difficulty;
    private Date date;
    private int totalnumberofquestions;
    private int numberofcorrectanswers;
    private int totalnumberofquizzes;
}
