/*globals define*/
define("SurveyModule", [
      "Core",
      "QuestionFactory",
      "SliderBinding",
      "loadKoTemplate!Survey/surveyTemplate"], function (core, questionFactory) {
   core.register("SurveyModule", function (sandbox) {

      var ko = sandbox.getObservable(),
          
          templateName = ko.observable("surveyTemplate"),
          cssClassNameArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
          title = ko.observable(''),
          description = ko.observable(''),
          surveyQuestions = ko.observableArray(),
          viewModel = {
             templateName: templateName,
             title: title,
             description: description,
             surveyQuestions: surveyQuestions
          },
          totalSpend = 100,
          adjustSliders = function (itemNumber, amountToReduceBy) {
             var surveyQuestionArray = surveyQuestions(),
                 i,
                 arrayLength = surveyQuestionArray.length,
                 currentItem,
                 currentItemValue;
             
             while(amountToReduceBy > 0) {
                for(i = 0; i < arrayLength && amountToReduceBy > 0; i++) {
                   currentItem = surveyQuestionArray[i];
                   if (currentItem.questionNumber !== itemNumber) {
                      currentItemValue = currentItem.sliderStuff.currentValue();
                      if (currentItemValue > 0) {
                         currentItem.sliderStuff.currentValue(currentItemValue - 1);
                         amountToReduceBy = amountToReduceBy - 1;
                      }
                   }
                }
             } 
          },
          valueChanged = function (itemNumber, newValue) {
             var total = surveyQuestions().map(function(item) {
                return item.sliderStuff.currentValue();
             }).integerSum();
                
             if (total > totalSpend) {
                adjustSliders(itemNumber, (total - totalSpend));
             }
          },
          loadQuestions = function () {
             totalSpend = 100;
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