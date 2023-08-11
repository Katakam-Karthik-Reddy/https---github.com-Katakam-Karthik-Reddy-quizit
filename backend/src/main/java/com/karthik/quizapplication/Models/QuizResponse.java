package com.karthik.quizapplication.Models;

import java.util.List;

import lombok.Data;

@Data
public class QuizResponse {

    private List<QuestionAnswer> questionanswer;
    private int quiznumber;
    private int numberofcorrectanswers;
    private int totalnumberofquestions;
}
