define("FinalQuestionFactory", function (surveyResponseFactory) {
   var create = function (sandbox, question) {
      var ko = sandbox.getObservable(),
          questionText = question.question,
          id = question.id,
          answer = ko.observable("");

      return {
         questionText: questionText,
         id: id,
         answer: answer
      };
   };

   return {
      create: create
   };
});