'use strict';

// Initialize highlight.js
window.hljs.initHighlightingOnLoad();

// Generic data-* driven control behaviour
$(function() {
  $('[data-toggle-visible]').each(function() {
    var $element = $(this),
      $target = $($element.data('toggleVisible'));

    $target.addClass('invisible');
    $element.on('click', function() {
      $target.toggleClass('invisible');
    });
  });
});

var optionsChartistGuy = {
  axisX: {
    showLabel: true,
    showGrid: true,
    labelInterpolationFnc: function(n) {
      return n;
    }
  },
  axisY: {
    showLabel: true,
    showGrid: true,
    labelInterpolationFnc: function(n) {
      return Math.round(n / 100000) / 10 + 'm.';
    }
  }
};

var chartistGuyData = {
  labels: ['1st', '2nd', '3rd'],
  series: [
    {
      data: [1283000, 1500000, 5706000]
    },
    {
      data: [1883000, 2050000, 3706000]
    }
  ]
};

var examples = [
  {
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      series: [
        {
          data: [12, 9, 7, 8, 6, 4, 3, 2, 0]
        },
        {
          data: [2, 1, 4, 7, 9, 8, 7, 4, 7]
        },
        {
          data: [1, 2, 4, 5, 6, 8, 9, 10, 11]
        },
        {
          data: [11, 7.5, 5.5, 5, 4, 3.5, 2, 1, 0]
        }
      ]
    },
    options: {
      axisX: {
        offset: 40,
        labelInterpolationFnc: function(value) {
          return 'Week ' + value;
        }
      },
      axisY: {
        offset: 40
      }
    },
    responsiveOptions: [
      [
        Foundation.media_queries.small,
        {
          axisX: {
            offset: 5,
            labelInterpolationFnc: function(value, index) {
              // Interpolation function causes only every 2nd label to be displayed
              if(index % 2 !== 0) {
                return false;
              } else {
                return 'W' + value;
              }
            }
          },
          axisY: {
            offset: 5
          }
        }
      ]
    ]
  },
  {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          data: [1, 2, 2.7, 0, 3, 5, 3, 4, 8, 10, 12, 7]
        },
        {
          data: [0, 1.2, 2, 7, 2.5, 9, 5, 8, 9, 11, 14, 4]
        },
        {
          data: [10, 9, 8, 6.5, 6.8, 6, 5.4, 5.3, 4.5, 4.4, 3, 2.8]
        }
      ]
    },
    options: {},
    responsiveOptions: [
      [
        Foundation.media_queries.small,
        {
          axisX: {
            labelInterpolationFnc: function(value, index) {
              // Interpolation function causes only every 2nd label to be displayed
              if(index % 2 !== 0) {
                return false;
              } else {
                return value;
              }
            }
          }
        }
      ]
    ]
  },
  {
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      series: [
        {
          data: [1, 2, 3, 5, 8, 13]
        }
      ]
    },
    options: {
      axisX: {
        labelInterpolationFnc: function(value) {
          return 'Calendar Week ' + value;
        }
      }
    },
    responsiveOptions: [
      ['screen and (min-width: 641px) and (max-width: 1024px)', {
        showPoint: false,
        axisX: {
          labelInterpolationFnc: function(value) {
            return 'Week ' + value;
          }
        }
      }],
      ['screen and (max-width: 640px)', {
        showLine: false,
        axisX: {
          labelInterpolationFnc: function(value) {
            return 'W' + value;
          }
        }
      }]
    ]
  }
];

var charts = [];

// Create new snap object from SVG
var chartistGuySnap = Snap('#chartist-guy');
// Load Chartist guy SVG
Snap.load($('#chartist-guy').data('svgSrc'), function (fragment) {
  chartistGuySnap.append(fragment);

  // Add line chart to canvas of Chartist guy :-)
  charts.push(window.Chartist('#chart-canvas', chartistGuyData, optionsChartistGuy));
});

// Initialize test line chart with override settings for small breakpoint
charts.push(window.Chartist('#example-chart-one', examples[0].data, examples[0].options, examples[0].responsiveOptions));
charts.push(window.Chartist('#example-chart-two', examples[1].data, examples[1].options, examples[1].responsiveOptions));
charts.push(window.Chartist('#example-chart-three', examples[2].data, examples[2].options, examples[2].responsiveOptions));
// On window resize trigger reflow
$(window).on('resize', function () {
  console.log('Resize');

  charts.forEach(function(e) {
    e.update();
  });
});

