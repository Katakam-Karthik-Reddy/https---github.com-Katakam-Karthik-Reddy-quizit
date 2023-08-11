package com.karthik.quizapplication.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {

    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "question")
    private String question;
    @Column(name = "correctanswer")
    private String correctanswer;
    @Column(name = "incorrectanswers")
    private String[] incorrectanswers;
    @Column(name = "difficulty")
    private String difficulty;
    @Column(name = "category")
    private String category;

}