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
      totalSpent = ko.observable(0),
      currentQuestion = ko.observable(null),
      hasNextQuestion = ko.computed(function () {
         if (questionArray().length == 0) {
            return false;
         }
         else if (currentQuestion() === questionArray()[questionArray().length - 1]) {
            return false;
         }
         else {
            return true;
         }
      }),
      saveCurrentQuestion = function () {
         
      },
      moveToNextQuestion = function () {
         var indexOfCurrentQuestion = questionArray().indexOf(currentQuestion());
         
         if (indexOfCurrentQuestion < questionArray().length - 1) {
            saveCurrentQuestion();
            currentQuestion(questionArray()[indexOfCurrentQuestion + 1]);
         }
      },
      viewModel = {
         templateName: templateName,
         currentQuestion: currentQuestion,
         hasNextQuestion: hasNextQuestion,
         moveToNextQuestion: moveToNextQuestion,
         title: title,
         description: description,
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