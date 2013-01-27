define("HomeScreen", [
   "Core",
   "loadKoTemplate!Survey/surveyTemplate",
   "SurveyModule"], function (core) {

      core.DataBinding.addMapping("SurveyModule", "mainTemplatedContent");

      core.ModuleGrouping.registerGroup({
         name: "HomeScreen",
         dependsOnModuleGroupings: [],
         startsModules: ["SurveyModule"]
      });
   });