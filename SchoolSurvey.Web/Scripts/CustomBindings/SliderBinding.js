/*globals ko, $, define, require, exports, module*/

define("SliderBinding", ["knockout", 'jqueryui'], function (ko, $) {
   (function () {
      ko.bindingHandlers.slider = {
         init: function (element, valueAccessor) {

            var sliderInfo = valueAccessor();

            $(element).slider({
               value: sliderInfo.currentValue(),
               min: sliderInfo.minimumValue,
               max: sliderInfo.maximumValue,
               step: 1,
               slide: function (event, ui) {
                  //$("#amount").val("$" + ui.value);
                  sliderInfo.currentValue(ui.value);
               }
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
               $(element).unbind();
            });

         }
      };
   })();
});