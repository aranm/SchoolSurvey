define("StatisticsScreen", [
   "Core",
   "StatisticsModule"], function (core) {

      core.DataBinding.addMapping("StatisticsModule", "mainTemplatedContent");

      core.ModuleGrouping.registerGroup({
         name: "StatisticsScreen",
         dependsOnModuleGroupings: [],
         startsModules: ["StatisticsModule"]
      });
   });