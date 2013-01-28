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
      totalSpent = ko.observable(0),
      viewModel = {
         templateName: templateName,
         title: title,
         description: description,
         surveyQuestions: surveyQuestions,
         totalSpent: totalSpent
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
      valueChanged = function (itemNumber) {
         var total = surveyQuestions().map(function(item) {
            return item.sliderStuff.currentValue();
         }).integerSum();
                
         if (total > totalSpend) {
            adjustSliders(itemNumber, (total - totalSpend));
            totalSpent(100);
         }
         else {
            totalSpent(totalSpend);
         }
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
         totalSpend = 100;
         title('Success of the school');
         description('In this question you are going to build a successful school. You have 100 success dollars to spend.');

         var questions = ['Academic performance', 'Spiritual development', 'Positive relationships between students', 'Positive relationships between students and teachers', 'Number of subjects offered', 'Community involvement'];
         randomiseArray(questions);

         for (var i = 0; i < questions.length; i++) {
            surveyQuestions.push(questionFactory.create(sandbox, cssClassNameArray[i], questions[i], 0, 100, valueChanged));
         }
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