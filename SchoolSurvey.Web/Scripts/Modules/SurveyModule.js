/*globals define*/
define("SurveyModule", [
      "Core",
      "QuestionFactory",
      "FinalQuestionFactory",
      "SliderBinding",
      "loadKoTemplate!Survey/surveyTemplate",
      "loadKoTemplate!Survey/startTemplate",
      "loadKoTemplate!Survey/finalQuestionTemplate",
      "loadKoTemplate!Survey/finishTemplate",
      'JQueryDictionary'], function (core, questionFactory, finalQuestionFactory) {
   core.register("SurveyModule", function (sandbox) {

      var ko = sandbox.getObservable(),
      templateName = ko.observable('startTemplate'),
      surveyIsRunning = ko.computed(function () {
         if (templateName() === 'surveytemplate') {
            return true;
         }
         else {
            return false;
         }
      }),
      userId = -1,
      title = ko.observable(''),
      description = ko.observable(''),
      questionArray = ko.observableArray(),
      finalQuestionArray = ko.observableArray(),
      totalSpent = ko.observable(0),
      currentQuestion = ko.observable(null),
      canMoveToNextStep = ko.computed(function () {
         if (currentQuestion() === null) {
            return false;
         }
         return currentQuestion().isValid();
      }),
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
         templateName('finalQuestionTemplate');
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
         if (canMoveToNextStep() === true) {
            var indexOfCurrentQuestion = questionArray().indexOf(currentQuestion());

            if (indexOfCurrentQuestion < questionArray().length - 1) {
               saveCurrentQuestion();
               currentQuestion(questionArray()[indexOfCurrentQuestion + 1]);
            }
         }
      },
      finishQuestionPartOfSurvey = function () {
         var indexOfCurrentQuestion = questionArray().indexOf(currentQuestion());

         if (indexOfCurrentQuestion === questionArray().length - 1) {
            saveCurrentQuestion();
            showSurveyFinishedScreen();
         }
      },
      finishFinalQuestionPartOfSurvey = function () {
         //prepare save data
         var data = {
            userId: userId,
            responses: finalQuestionArray().map(function (item) {
               return {
                  id: item.id,
                  response: item.answer()
               };
            })
         };

         sandbox.request({
            name: "SaveFinalQuestions",
            data: $.toDictionary(data),
            success: function (serverResponse) {
               templateName('finishTemplate');
            },
            failure: function (errorMessages) {
            }
         });

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

               finalQuestionArray(serverResponse.finalQuestions.map(function(item) {
                  return finalQuestionFactory.create(sandbox, item);
               }));

               if (questionArray().length > 0) {
                  currentQuestion(questionArray()[0]);
               }
            },
            failure: function (errorMessages) {
            }
         });
      },
      startSurvey = function () {
         templateName('surveyTemplate');
         loadQuestions();
      },
      viewModel = {
         templateName: templateName,
         startSurvey: startSurvey,
         canMoveToNextStep: canMoveToNextStep,
         surveyIsRunning: surveyIsRunning, 
         currentQuestion: currentQuestion,
         hasNextQuestion: hasNextQuestion,
         isFinalQuestion: isFinalQuestion,
         moveToNextQuestion: moveToNextQuestion,
         finishQuestionPartOfSurvey: finishQuestionPartOfSurvey,
         finishFinalQuestionPartOfSurvey: finishFinalQuestionPartOfSurvey,
         finalQuestionArray: finalQuestionArray,
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
      };

      return {
         activate: function () {
            sandbox.bind(viewModel);
         },
         destroy: function () {
            sandbox.unbind();
         }
      };
   });
});