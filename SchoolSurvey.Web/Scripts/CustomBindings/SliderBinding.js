/*globals ko, $, define, require, exports, module*/

define("SliderBinding", ["knockout", 'jqueryui'], function (ko, $) {
   (function () {
      ko.bindingHandlers.slider = {
         init: function (element, valueAccessor) {

            var lock = false,
                sliderInfo = valueAccessor(),
                currentValueSubscription = sliderInfo.currentValue.subscribe(function (newValue) {
                   if (lock === false) {
                      $(element).slider('value', newValue);
                   }
                });

            $(element).slider({
               value: sliderInfo.currentValue(),
               min: sliderInfo.minimumValue,
               max: sliderInfo.maximumValue,
               step: 1,
               slide: function (event, ui) {
                  //$("#amount").val("$" + ui.value);
                  lock = true;
                  sliderInfo.currentValue(ui.value);
                  lock = false;
               }
            });
            
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
               $(element).unbind();
               currentValueSubscription.dispose();
            });

         }
      };
   })();
});