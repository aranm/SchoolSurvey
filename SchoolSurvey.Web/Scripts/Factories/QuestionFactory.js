define("QuestionFactory", [], function () {
   var create = function (sandbox, itemNumber, questionTitle, min, max, valueChanged) {
      var ko = sandbox.getObservable(),
          currentValue = ko.observable(0),
          currentValueSubscription = currentValue.subscribe(function(newValue) {
             valueChanged(itemNumber, newValue);
          }),
          sliderStuff = {
             minimumValue: min,
             maximumValue: max,
             currentValue: currentValue
          };
      return {
         questionNumber: itemNumber,
         questionTitle: questionTitle,
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