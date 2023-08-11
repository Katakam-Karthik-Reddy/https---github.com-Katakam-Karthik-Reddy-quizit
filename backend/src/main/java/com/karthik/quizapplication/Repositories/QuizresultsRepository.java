package com.karthik.quizapplication.Repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karthik.quizapplication.Models.QuizResults;

@Repository
public interface QuizresultsRepository extends JpaRepository<QuizResults, UUID> {

    Optional<QuizResults> findById(UUID id);

}
