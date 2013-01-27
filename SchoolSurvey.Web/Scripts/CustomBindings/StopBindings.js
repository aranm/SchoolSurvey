/*globals ko, $, define, require, exports, module*/
(function () {
   var registration = function (ko) {
      ko.bindingHandlers.stopBindings = {
         init: function () {
            return { controlsDescendantBindings: true };
         }
      };

      ko.virtualElements.allowedBindings.stopBindings = true;
   };

   if (typeof require === "function") {
      require(["knockout"], function (ko) {
         registration(ko);
      });
   }
   else {
      registration(ko);
   }
})();