package com.karthik.quizapplication.Models;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_results")
public class QuizResults {

    @Id
    private UUID id;

    @ElementCollection
    @CollectionTable(name = "question_to_answer", joinColumns = {
            @JoinColumn(name = "questionids") })
    @MapKeyColumn(name = "question_id")
    @Column(name = "selected_answer")
    private Map<String, String> questiontoanswer = new HashMap<String, String>();

    private int quiznumber;
    private String category;
    private String difficulty;
    private int numberofcorrectanswers;
    private int tolalnumberofquestions;
    private Date date;
}
