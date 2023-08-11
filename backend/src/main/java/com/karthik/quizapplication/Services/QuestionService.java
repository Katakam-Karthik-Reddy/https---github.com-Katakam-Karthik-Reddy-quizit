package com.karthik.quizapplication.Services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karthik.quizapplication.Models.CompletedQuiz;
import com.karthik.quizapplication.Models.Question;
import com.karthik.quizapplication.Models.QuestionAnswer;
import com.karthik.quizapplication.Models.QuizResponse;
import com.karthik.quizapplication.Models.QuizResults;
import com.karthik.quizapplication.Models.Quizdata;
import com.karthik.quizapplication.Models.User;
import com.karthik.quizapplication.Repositories.QuestionRepository;
import com.karthik.quizapplication.Repositories.QuizresultsRepository;
import com.karthik.quizapplication.Repositories.UserRepository;

@Service
public class QuestionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizresultsRepository quizresultsRepository;

    public Question getQuestionById(String id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            return (Question) question.get();
        }
        return new Question();
    }

    public List<Question> getRamdomQestions(int count, String category, String difficulty) {

        if (category.equalsIgnoreCase("Mixed")) {
            return questionRepository.getRandomQuestions(count, difficulty);
        } else if (difficulty.equalsIgnoreCase("Mixed")) {
            return questionRepository.getRandomQuestions(category, count);
        }
        return questionRepository.getRandomQuestions(count, category, difficulty);
    }

    public UUID validateQuizdata(List<Quizdata> quizdata, String category, String difficulty, String username) {

        QuizResults newquizresult = new QuizResults();

        HashMap<String, String> questiontoanswer = new HashMap<>();
        int correctanswers = 0;

        for (int index = 0; index < quizdata.size(); index++) {
            Optional<Question> question = questionRepository.findById(quizdata.get(index).getId());
            questiontoanswer.put(question.get().getId(), quizdata.get(index).getSelectedoption());
            if ((question.get().getCorrectanswer().equalsIgnoreCase(quizdata.get(index).getSelectedoption()))) {
                correctanswers++;
            }
        }

        User user = userRepository.findByEmail(username).get();

        UUID id = UUID.randomUUID();
        newquizresult.setId(id);
        newquizresult.setQuestiontoanswer(questiontoanswer);
        newquizresult.setNumberofcorrectanswers(correctanswers);
        newquizresult.setTolalnumberofquestions(quizdata.size());
        newquizresult.setCategory(category);
        newquizresult.setDifficulty(difficulty);
        newquizresult.setQuiznumber(user.getCompletedquizs().size() + 1);
        newquizresult.setDate(new Date(Calendar.getInstance().getTime().getTime()));
        quizresultsRepository.save(newquizresult);

        List<UUID> completedquizids = user.getCompletedquizs();
        completedquizids.add(id);
        user.setCompletedquizs(completedquizids);
        userRepository.save(user);

        return id;
    }

    public QuizResponse getResultByUuid(UUID uuid) {
        Optional<QuizResults> quizResults = quizresultsRepository.findById(uuid);
        if (quizResults.isPresent()) {
            QuizResults quizResults2 = quizResults.get();
            QuizResponse newQuizResponse = new QuizResponse();
            newQuizResponse.setQuestionanswer(getquestiontoanswermap(quizResults2.getQuestiontoanswer()));
            newQuizResponse.setQuiznumber(quizResults2.getQuiznumber());
            newQuizResponse.setNumberofcorrectanswers(quizResults2.getNumberofcorrectanswers());
            newQuizResponse.setTotalnumberofquestions(quizResults2.getTolalnumberofquestions());
            return newQuizResponse;
        }
        return new QuizResponse();
    }

    private List<QuestionAnswer> getquestiontoanswermap(Map<String, String> map) {
        List<QuestionAnswer> resquestiontoanswer = new ArrayList<>();
        for (Map.Entry<String, String> curset : map.entrySet()) {
            QuestionAnswer newQuestionAnswer = new QuestionAnswer();
            newQuestionAnswer.setQuestion(questionRepository.findById(curset.getKey()).get());
            newQuestionAnswer.setSelectedanswer(curset.getValue());
            resquestiontoanswer.add(newQuestionAnswer);
        }
        return resquestiontoanswer;
    }

    public List<CompletedQuiz> getallquizzesbyemailid(String email) {
        User user = userRepository.findByEmail(email).get();
        List<UUID> completeUuids = user.getCompletedquizs();
        List<CompletedQuiz> allcompletedquizzes = new ArrayList<>();
        for (UUID id : completeUuids) {
            QuizResults quizResults = quizresultsRepository.findById(id).get();
            CompletedQuiz completedQuiz = new CompletedQuiz();
            completedQuiz.setQuizid(quizResults.getId().toString());
            completedQuiz.setCategory(quizResults.getCategory());
            completedQuiz.setDifficulty(quizResults.getDifficulty());
            completedQuiz.setDate(quizResults.getDate());
            completedQuiz.setTotalnumberofquestions(quizResults.getTolalnumberofquestions());
            completedQuiz.setNumberofcorrectanswers(quizResults.getNumberofcorrectanswers());
            completedQuiz.setTotalnumberofquizzes(completeUuids.size());
            allcompletedquizzes.add(completedQuiz);
        }
        return allcompletedquizzes;
    }

}
