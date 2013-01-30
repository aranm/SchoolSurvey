require(["knockout", "highcharts"], function (ko) {
   ko.bindingHandlers.barChart = {
      init: function (element, valueAccessor) {
         var subscriptionArray = [],
            value = ko.utils.unwrapObservable(valueAccessor()),
            chart = new Highcharts.Chart({
               chart: {
                  renderTo: $(element)[0],
                  defaultSeriesType: 'column'
               },
               xAxis: {
                  categories: [],
                  title: {
                     text: 'Area',
                     style: {
                        color: '#89A54E'
                     }
                  }
               },
               yAxis: {
                  min: 0,
                  max: 20,
                  title: {
                     text: 'Spend',
                     style: {
                        color: '#89A54E'
                     }
                  }
               },
               legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'top',
                  x: -100,
                  y: 100,
                  floating: true,
                  borderWidth: 1,
                  backgroundColor: '#FFFFFF',
                  shadow: true,
                  enabled: false
               },
               series: [{
                  data: []
               }],
               credits: {
                  //this turns off the high charts url
                  enabled: false
               },
               title: {
                  text: value.title
               }
            });
         
            //we are going to manage changes to the observable ourselves
         subscriptionArray.push(value.barValues.subscribe(function () {
            //remove all elements from the chart
            chart.series[0].remove();

            //add the new bar elements
            chart.xAxis[0].setCategories(value.barValues().map(function (item) {
               return item.header;
            }), false);

            //round the highest value up to the next ten
            var max = Math.max.apply(null, value.barValues().map(function (item) { return item.value; }));
            max = Math.round((max + 5) / 10) * 10;
            chart.yAxis[0].setExtremes(0, max, true, false);
            
            
            chart.addSeries({
               data: value.barValues().map(function (item) {
                  return item.value;
               })
            });
         }));
         
            //handle disposal (if KO removes by the template binding)
         ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).unbind();
            subscriptionArray.forEach(function(item) {
               item.dispose();
            });
            //destory the chart
            chart.destroy();
         });
      }
   };
});