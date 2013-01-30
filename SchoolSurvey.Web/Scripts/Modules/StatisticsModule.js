/*globals define*/
define("StatisticsModule", [
      "Core",
      "BarChart",
      "loadKoTemplate!Statistics/statisticsTemplate"], function (core, questionFactory, finalQuestionFactory) {
         core.register("StatisticsModule", function (sandbox) {

            var ko = sandbox.getObservable(),
                questionTitle = ko.observable(""),
                questionDescription = ko.observable(""),
                barChartDetails = ko.observable({
                  barValues: ko.observableArray(),
                  title: "Stats"
                }),
                templateName = ko.observable('statisticsTemplate'),
                questionIdArray = [],
                currentIndex = -1,
                incrementIndexAndReload = function() {
                   currentIndex++;
                   if (currentIndex > questionIdArray.length - 1) {
                      currentIndex = 0;
                   }
                   setTimeout(loadStatistics, 10000);
                },
                loadStatistics = function () {
                   if (questionIdArray.length > 0) {
                      var question = questionIdArray[currentIndex];
                      questionTitle(question.title);
                      questionDescription(question.description);

                      sandbox.request({
                         name: "GetStatisticsForQuestion",
                         data: {
                           questionId: question.id 
                         },
                         success: function (serverResponse) {
                            barChartDetails().barValues(serverResponse.map(function (item) {
                               return {
                                  header: item.title,
                                  value: item.count
                               };
                            }));
                            incrementIndexAndReload();
                         },
                         failure: function (errorMessages) {
                         }
                      });
                   }
                },
                loadQuestions = function() {
                   sandbox.request({
                      name: "GetQuestionNumbers",
                      success: function(serverResponse) {
                         questionIdArray = serverResponse;
                         currentIndex = 0;
                         loadStatistics();
                      },
                      failure: function(errorMessages) {
                      }
                   });
                },
                viewModel = {
                   templateName: templateName,
                   questionTitle: questionTitle,
                   questionDescription: questionDescription,
                   barChartDetails: barChartDetails
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