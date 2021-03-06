// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dashboard', [])

// calender
.controller("dashboardCtrl", function($scope, $ionicHistory, $ionicPopup, $state, $ionicLoading, syncDataFactory, $rootScope, $http, surveyDataManager, $cordovaSQLite, databaseManager) {


  // == take user to home screeen
  $scope.switchUser = function() {
    $ionicHistory.clearCache().then(function() {
      $rootScope.emailId = null;
      $state.transitionTo('home');
    });
  }

  $scope.events = [];
  surveyDataManager.getSurveyDates().then(function(res) {
    if (res) {
      var dateData = res;
      var eventsArray = new Array();
      for (var i = 0; i < res.length; i++) {
        eventsArray.push({
          "date": res.item(i).creationDate
        });
      }
      $scope.events = eventsArray;
    }
  });

  var emailId = $rootScope.emailId;
  if (emailId) {
    surveyDataManager.getResults(emailId.trim()).then(function(res) {
      if (res) {
        var chartData = JSON.parse(res["resultData"]).results;

        //first graph
        var dataArray = new Array();
        for (var i = 0; i < chartData.sections.length; i++) {
          var chartSection = chartData.sections[i][0];
          $scope.labels = chartSection.labels;
          for (var j = 0; j < chartSection.data.length; j++) {
            dataArray.push(chartSection.data[j]);
          }
          $scope.series = chartSection.series;
          $scope.one = true;
          $scope.data = dataArray;
        }

        //second graph
        var dataArray = new Array();
        for (var i = 0; i < chartData.sections.length; i++) {
          var chartSection = chartData.sections[i][1];
          $scope.labels1 = chartSection.labels;
          dataArray.push(chartSection.data);
          $scope.series1 = chartSection.series;
        }
        $scope.two = true;
        $scope.data1 = dataArray;

        //third graph
        var dataArray = new Array();
        for (var i = 0; i < chartData.sections.length; i++) {
          var chartSection = chartData.sections[i][2];
          $scope.labels2 = chartSection.labels;
          dataArray.push(chartSection.data);
          $scope.series2 = chartSection.series;
        }
        $scope.three = true;
        $scope.data2 = dataArray;

        //fourth graph
        var dataArray = new Array();
        for (var i = 0; i < chartData.sections.length; i++) {
          var chartSection = chartData.sections[i][3];
          $scope.labels3 = chartSection.labels;
          for (var k = 0; k < chartSection.data.length; k++) {
            dataArray.push(chartSection.data[k]);
          }
          $scope.series3 = chartSection.series;
          $scope.four = true;
          $scope.data3 = dataArray;
        }

        var dataArray = new Array();
        var labelArray = new Array();
        var seriesArray = new Array();
        for (var i = 0; i < chartData.sections.length; i++) {
          var chartd = chartData.sections[i][4];
          $scope.labels4 = chartd.labels;
          dataArray.push(chartd.data);
          $scope.series4 = chartd.series;
          labelArray.push(chartd.labels);
          seriesArray.push(chartd.series);
        }

        $scope.data4 = dataArray;
        $scope.labels4 = labelArray;
        $scope.series4 = seriesArray;
      }
    });
  }


  // calander//
  $scope.options = {
    defaultDate: new Date(),
    minDate: "2015-01-01",
    maxDate: "2050-12-31",
    disabledDates: [
      "2015-06-22",
      "2015-07-27",
      "2015-08-13",
      "2015-08-15"
    ],
    dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    mondayIsFirstDay: true, //set monday as first day of week. Default is false
    eventClick: function(date) { // called before dateClick and only if clicked day has events
      console.log(date);
    },
    dateClick: function(date) { // called every time a day is clicked
      console.log(date);
    },
    changeMonth: function(month, year) {
      console.log(month, year);
    },
    filteredEventsChange: function(filteredEvents) {
      console.log(filteredEvents);
    },
  };


});

// calander ends here
// calander Widget//
