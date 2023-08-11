package com.karthik.quizapplication.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.karthik.quizapplication.Models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {

    @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty AND category = :category ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    public List<Question> getRandomQuestions(@Param("count") int count, @Param("category") String category,
            @Param("difficulty") String difficulty);

    @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    public List<Question> getRandomQuestions(@Param("count") int count, @Param("difficulty") String difficulty);

    @Query(value = "SELECT * FROM questions WHERE category = :category ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    public List<Question> getRandomQuestions(@Param("category") String category, @Param("count") int count);
}