/*globals define*/
define("SurveyModule", [
      "Core",
      "QuestionFactory",
      "SliderBinding",
      "loadKoTemplate!Survey/surveyTemplate"], function (core, questionFactory) {
   core.register("SurveyModule", function (sandbox) {

      var ko = sandbox.getObservable(),
          
          templateName = ko.observable("surveyTemplate"),
          title = ko.observable(''),
          description = ko.observable(''),
          surveyQuestions = ko.observableArray(),
          viewModel = {
             templateName: templateName,
             title: title,
             description: description,
             surveyQuestions: surveyQuestions
          },
          valueChanged = function (newValue) {
             
          },
          loadQuestions = function () {
             title('Success of the school');
             description('In this question you are going to build a successful school. You have 100 success dollars to spend.');
             surveyQuestions.push(questionFactory.create(sandbox, 'one', 'Academic performance', 0, 100, valueChanged));
             surveyQuestions.push(questionFactory.create(sandbox, 'two', 'Spiritual development', 0, 100, valueChanged));
             surveyQuestions.push(questionFactory.create(sandbox, 'three', 'Positive relationships between students', 0, 100, valueChanged));
             surveyQuestions.push(questionFactory.create(sandbox, 'four', 'Positive relationships between students and teachers', 0, 100, valueChanged));
             surveyQuestions.push(questionFactory.create(sandbox, 'five', 'Number of subjects offered', 0, 100, valueChanged));
             surveyQuestions.push(questionFactory.create(sandbox, 'six', 'Community involvement', 0, 100, valueChanged));
          };

      return {
         activate: function () {
            sandbox.bind(viewModel);
            loadQuestions();
         },
         destroy: function () {
            sandbox.unbind();
         }
      };
   });
});