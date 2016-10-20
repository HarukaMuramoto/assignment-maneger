ons.bootstrap().controller('AppController', function($scope) {
  $scope.data = localStorage.getItem('saveData') ? localStorage.getItem('saveData') : [] ;
  $scope.point = localStorage.getItem('levelData') ? localStorage.getItem('levelData') : 0 ;

  $scope.nameData = localStorage.getItem('nameData') ? JSON.parse(localStorage.getItem('nameData')) : [];

  $scope.nameData = [];
  index = 0;

  $scope.title = 'MOFULIST';

  $scope.addTask = function(memo, date, level){
    var vmemo = memo;
    var vdate = date;
    var vlevel = level

    // console.log(vmemo);
    // console.log(vdate);
    // console.log(vlevel);

    var ymd_date = new Date(vdate);
    // var show_date= ymd_date.getFullYear() + ":" + (ymd_date.getMonth()+1) + ":" + ymd_date.getDate();
    var show_date= (ymd_date.getMonth()+1) + "月" + ymd_date.getDate()+ "日";


    $scope.nameData.push({id: index, message: vmemo, date: show_date, level: vlevel});
    localStorage.setItem('nameData',JSON.stringify($scope.nameData));
    index++;
    // alert(index);
    // $scope.nameData.push(vmemo);

    myNavigator.popPage();
    // color(data);
  }
  // $scope.color = function(data) {
  //   if(data.level == 1) {
  //     document.getElementById("task-list").className = "red";
  //   }
  // }

  $scope.deleteTask = function(data){
    // console.log(data.id);
    var index = 1;
    var t;
        for (var i = 0; $scope.nameData.length; i++) {
            t = $scope.nameData[i];
            if (t.id == data.id) {
                index = i;
                break;
            }
        }

        $scope.nameData.splice(index, 1);
  }

  $scope.doneTask = function(data){
    if (data.level == 1) {
      $scope.point = parseInt($scope.point) + 1;
    }
    else if (data.level == 2) {
      $scope.point = parseInt($scope.point) + 2;
    }
    else if (data.level == 3) {
      $scope.point = parseInt($scope.point) + 3;
    }
    else if (data.level == 4) {
      $scope.point = parseInt($scope.point) + 4;
    }
    else {
      $scope.point = parseInt($scope.point) + 5;
    }

    console.log($scope.point);
    localStorage.setItem('levelData', $scope.point);

    var index = 1;
    var t;
        for (var i = 0; $scope.nameData.length; i++) {
            t = $scope.nameData[i];
            if (t.id == data.id) {
                index = i;
                break;
            }
        }
    $scope.nameData.splice(index, 1);

  }

  $scope.level = function() {
    if($scope.point <= 3){
      return 1;
    }
    else if ($scope.point > 3 && $scope.point <= 10) {
      return 2;
    }
    else if ($scope.point > 10 && $scope.point <= 30) {
      return 3;
    }
    else {
      return "Max";
    }
  }

  // $scope.point = function() {
  //   console.log($scope.point);
  //   return $scope.point;
  // }


});








ons.ready(function() {
  console.log("Onsen UI is ready!");
});
