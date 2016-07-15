angular.module('todoApp').controller('MainController', function($http){
  var vm = this;

  vm.message = 'Angular is loaded';

  vm.saveTask = function(){
    var sendData = {};
    sendData.task = vm.tempTask;
    //Add other things here

    $http.post('/addTask', sendData).then(handleSuccess, handleFailure);
  }

  function handleSuccess(response){
    console.log('Success', response);
  }

  function handleFailure(response){
    console.log('Failure', response);
  }
});
