/*globals define*/
define("SurveyModule", [
      "Core",
      "QuestionFactory",
      "SliderBinding",
      "loadKoTemplate!Survey/surveyTemplate",
      'JQueryDictionary'], function (core, questionFactory) {
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
      isFinalQuestion = ko.computed(function () {
         if (questionArray().length == 0) {
            return false;
         }
         else if (currentQuestion() === questionArray()[questionArray().length - 1]) {
            return true;
         }
         else {
            return false;
         }
      }),
      showSurveyFinishedScreen = function() {
             
      },
      saveCurrentQuestion = function () {
         //prepare save data
         var data = {
            userId: userId,
            responses: currentQuestion().responses().map(function (item) {
               return {
                  id: item.id,
                  value: item.sliderStuff.currentValue()
               };
            })
         };
         
         sandbox.request({
            name: "SaveCurrentResponses",
            data: $.toDictionary(data),
            success: function (serverResponse) {
            },
            failure: function (errorMessages) {
            }
         });
         
      },
      moveToNextQuestion = function () {
         var indexOfCurrentQuestion = questionArray().indexOf(currentQuestion());
         
         if (indexOfCurrentQuestion < questionArray().length - 1) {
            saveCurrentQuestion();
            currentQuestion(questionArray()[indexOfCurrentQuestion + 1]);
         }
      },
      finishQuestionPartOfSurvey = function () {
         var indexOfCurrentQuestion = questionArray().indexOf(currentQuestion());

         if (indexOfCurrentQuestion === questionArray().length - 1) {
            saveCurrentQuestion();
            showSurveyFinishedScreen();
         }
      },
      viewModel = {
         templateName: templateName,
         currentQuestion: currentQuestion,
         hasNextQuestion: hasNextQuestion,
         isFinalQuestion: isFinalQuestion,
         moveToNextQuestion: moveToNextQuestion,
         finishQuestionPartOfSurvey: finishQuestionPartOfSurvey, 
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