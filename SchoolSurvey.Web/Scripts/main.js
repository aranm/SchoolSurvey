/// <reference path='Business/PresetGoals/DataLoadGoalGroup.js' />
/// <reference path='Business/GoalCategorisationStructure/DataLoadCategorisationStructure.js' />
/// <reference path='Modules/GoalAndActivtityEntry/LearningGoalsModule.js' />
require.config({
   waitSeconds: 0,
   paths: {
      //3rd Party libraries
      'knockout': 'knockout-2.2.1.debug',
      'jquery': 'jquery-1.9.0',
      'jqueryui': 'jquery-ui-1.10.0',
      'touch-punch' : 'jquery.ui.touch-punch',
      'ArrayExtension': 'Utilities/ArrayExtension',

      //Framework
      'Core': 'Framework/Core',
      'Core.DataBinding': 'Framework/Core.DataBinding',
      'Core.Communication': 'Framework/Core.Communication',
      'Core.Controls': 'Framework/Core.Controls',
      'Core.ModuleGrouping': 'Framework/Core.ModuleGrouping',
      'Core.Ajax': 'Framework/Core.Ajax',
      'Core.DomManipulation': 'Framework/Core.DomManipulation',
      'Core.Error': 'Framework/Core.Error',
      'Core.Navigation': 'Framework/Core.Navigation',
      'Core.Observable': 'Framework/Core.Observable',
      'Core.PageData': 'Framework/Core.PageData',
      'Core.Singleton': 'Framework/Core.Singleton',
      'Core.Storage': 'Framework/Core.Storage',
      'Sandbox': 'Framework/Sandbox',

      //CustomBindings
      'StopBindings': 'CustomBindings/StopBindings',
      'SliderBinding': 'CustomBindings/SliderBinding',

      //Configuration
      'AjaxConfiguration': 'Configuration/AjaxConfiguration',
      'RoutingConfiguration': 'Configuration/RoutingConfiguration',

      //Module Groupings
      'HomeScreen': 'ModuleGroupings/HomeScreen',

      //Modules
      'SurveyModule': 'Modules/SurveyModule',

      //Factories
      'QuestionFactory': 'Factories/QuestionFactory'
   },
   shim: {
      'jquery': {
         exports: 'jQuery'
      },
      'jqueryui': {
         deps: ['jquery'],
         exports: 'jQuery'
      },
      'touch-punch': {
         deps: ['jqueryui'],
         exports: 'jQuery'
      }
   },
   loadKoTemplate: {
      templatePath: 'templates/',
      extension: '.html'
   }
});


define('CoreScripts', [
         'Core',
         'jquery',
         'knockout',
         'jqueryui',
         'touch-punch',
         'stringTemplateEngine',
         'ArrayExtension',
         'Core.DataBinding',
         'Core.Ajax',
         'Core.Communication',
         'Core.Controls',
         'Core.ModuleGrouping',
         'Core.DomManipulation',
         'Core.Error',
         'Core.ModuleGrouping',
         'Core.Navigation',
         'Core.Observable',
         'Core.PageData',
         'Core.Singleton',
         'Core.Storage',
         'Sandbox',
         'text',
         'loadKoTemplate',
         'StopBindings',
         'SliderBinding'], function (core, jquery) {
            return {
               core: core,
               jquery: jquery
            };
         });

require(['CoreScripts', 'jquery', 'AjaxConfiguration', 'RoutingConfiguration', 'SliderBinding'], function (coreScripts, $, ajaxConfiguration, routingConfiguration) {
   //Configuration
   ajaxConfiguration.configure();
   routingConfiguration.configure();

   //open the home screen
   coreScripts.core.Communication.notify('OpenHomeScreen');
   
   $(function () {
      $("#slider").slider({
         value: 100,
         min: 0,
         max: 500,
         step: 50,
         slide: function (event, ui) {
            $("#amount").val("$" + ui.value);
         }
      });
      $("#amount").val("$" + $("#slider").slider("value"));
   });
});