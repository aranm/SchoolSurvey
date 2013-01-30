define("QuestionFactory", ['SurveyResponseFactory'], function (surveyResponseFactory) {
   var randomiseArray =function ( myArray ) {
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
   cssClassNameArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],

   create = function (sandbox, question) {
      var ko = sandbox.getObservable(),
      amountSpent = ko.observable(0),
      responses = ko.observableArray(),
      isValid = ko.computed(function () {
         if (amountSpent() < question.maximumSpend) {
            return false;
         }
         else if (amountSpent() > question.maximumSpend) {
            return false;
         }
         else {
            return true;
         }
      }),
      spendMessage = ko.computed(function () {
         if (amountSpent() < question.maximumSpend) {
            return "You have " + (question.maximumSpend - amountSpent()) + " " + question.spendUnits + " left to spend.";
         }
         else if (amountSpent() > question.maximumSpend) {
            return "You have overspent by " + (amountSpent() - question.maximumSpend) + " " + question.spendUnits + ".";
         }
         else {
            return "You have no " + question.spendUnits + " left to spend - you may continue to the next question";
         }
      }),
      valueChanged = function () {
         amountSpent(responses().map(function(item) {
            return item.sliderStuff.currentValue();
         }).integerSum());
      },
      mySelf = {
         isValid: isValid,
         spendMessage: spendMessage,
         amountSpent: amountSpent,
         questionNumber: question.Id,
         questionTitle: question.title,
         questionDescription: question.description,
         responses: responses,
         destroy: function () {
            responses.forEach(function(item) {
               item.destroy();
            });
         }
      };

      //set up the responses
      randomiseArray(question.responses);
      var count = 0;
      responses(question.responses.map(function (item) {
         return surveyResponseFactory.create(sandbox, cssClassNameArray[count++], item, question.maximumSpend, valueChanged);
      }));

      return mySelf;
   };

   return {
      create: create
   };
});