define('SurveyResponseFactory', [], function () {
   var create = function (sandbox, itemNumber, response, maximum, valueChanged) {
      var ko = sandbox.getObservable(),
          currentValue = ko.observable(0),
          currentValueSubscription = currentValue.subscribe(function () {
             valueChanged();
          }),
          sliderStuff = {
             minimumValue: 0,
             maximumValue: maximum,
             currentValue: currentValue
          };
      return {
         id: response.id,
         questionNumber: itemNumber,
         questionTitle: response.questionTitle,
         sliderStuff: sliderStuff,
         destroy: function () {
            currentValueSubscription.dispose();
         }
      };
   };

   return {
      create: create
   };
});