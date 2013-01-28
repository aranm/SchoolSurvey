/*globals define*/
define("SurveyModule", [
      "Core",
      "QuestionFactory",
      "SliderBinding",
      "loadKoTemplate!Survey/surveyTemplate"], function (core, questionFactory) {
   core.register("SurveyModule", function (sandbox) {

      var ko = sandbox.getObservable(),
      templateName = ko.observable("surveyTemplate"),
      userId = -1,
      title = ko.observable(''),
      description = ko.observable(''),
      questionArray = ko.observableArray(),
      surveyQuestions = ko.observableArray(),
      totalSpent = ko.observable(0),
      currentQuestion = ko.observable(null),
      viewModel = {
         templateName: templateName,
         currentQuestion: currentQuestion,
         title: title,
         description: description,
         surveyQuestions: surveyQuestions,
         totalSpent: totalSpent
      },
      randomiseArray =function ( myArray ) {
         var i = myArray.length, j, tempi, tempj;
         if ( i == 0 ) return false;
         while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) );
            tempi = myArray[i];
            tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
         }
      },
      loadQuestions = function () {
         sandbox.request({
            name: "StartNewSurvey",
            success: function (serverResponse) {
               //store the user Id               
               userId = serverResponse.user;
               
               //randomise the question order
               randomiseArray(serverResponse.questions);

               questionArray(serverResponse.questions.map(function(item) {
                  return questionFactory.create(sandbox, item);
               }));

               if (questionArray().length > 0) {
                  currentQuestion(questionArray()[0]);
               }
            },
            failure: function (errorMessages) {
            }
         });

         //totalSpend = 100;
         //title('Success of the school');
         //description('In this question you are going to build a successful school. You have 100 success dollars to spend.');

         //var questions = ['Academic performance', 'Spiritual development', 'Positive relationships between students', 'Positive relationships between students and teachers', 'Number of subjects offered', 'Community involvement'];
         //randomiseArray(questions);

         //for (var i = 0; i < questions.length; i++) {
         //   surveyQuestions.push(questionFactory.create(sandbox, cssClassNameArray[i], questions[i], 0, 100, valueChanged));
         //}
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