
const ipc = require('electron').ipcRenderer;

var app = angular.module("electronapp", []);


app.controller("mainCtrl", ["$scope","bridge", function($scope,bridge) {

    var vm = $scope;
    vm.selectedHandling = [];
    vm.selectedItem = "";
    
    vm.foo = process.versions.node;

    vm.openFile = function() 
    {
        ipc.send('open-file-dialog');
    };

    // electron events

    ipc.on('information-dialog-selection', function(event, index) {
        let message = 'You selected '
        if (index === 0) 
        	message += 'yes.';
        else 
        	message += 'no.';

    })

    ipc.on('selected-directory', function(event, meta) {
        console.log(meta);
        bridge.callGet("/hi/shoe").then(function(resp){
        	console.log(resp);
        	vm.selectedItem = resp.data.greet;
        	
        	
        },function(err){
        	console.log(err);
        });
        
        vm.$apply();
        
    });


    
}]);