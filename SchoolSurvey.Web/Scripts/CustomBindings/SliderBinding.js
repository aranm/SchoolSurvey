/*globals ko, $, define, require, exports, module*/

define("SliderBinding", ["knockout", 'jqueryui'], function (ko, $) {
   (function () {
      ko.bindingHandlers.slider = {
         init: function (element, valueAccessor) {

            var sliderInfo = valueAccessor();

            $(element).slider({
               value: 100,
               min: 0,
               max: 500,
               step: 50,
               values: [ 0, 300 ],
               //value: 0,
               //min: sliderInfo.minimumValue,
               //max: sliderInfo.maximumValue,
               //step: 1,
               slide: function (event, ui) {
                  //$("#amount").val("$" + ui.value);
                  sliderInfo.currentValue(ui.value);
               }
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
               $(element).unbind();
            });

         },

         update: function (element, valueAccessor) {

            var sliderInfo = valueAccessor();

            $(element).slider({
               value: 100,
               min: sliderInfo.min,
               max: sliderInfo.max,
               step: 1,
               slide: function (event, ui) {
                  //$("#amount").val("$" + ui.value);
               }
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
               $(element).unbind();
            });

         }
      };
   })();
});