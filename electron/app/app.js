const ipc = require('electron').ipcRenderer



var app = angular.module("electronapp", []);
app.controller("mainCtrl", ["$scope", function($scope) {

    var vm = $scope;
    vm.selectedHandling = [];
    vm.selectedItem = {};
    ipc.on('information-dialog-selection', function(event, index) {
        let message = 'You selected '
        if (index === 0) message += 'yes.'
        else message += 'no.'

    })

    ipc.on('selected-directory', function(event, meta) {
        console.log(meta);
        vm.selectedHandling = meta.CHandlingDataMgr.HandlingData[0].Item;
        vm.$apply();
    })




    vm.foo = process.versions.node;

    vm.openFile = function() {

        //ipc.send('open-information-dialog')
        ipc.send('open-file-dialog')
    };

    vm.showItem = function(item) {
        vm.selectedItem = item;
        var vals = Object.keys(item).map(function(key) {
            var arr = item[key];
            var ret = "";
            if (arr instanceof Array) {
                ret = arr[0];
                console.log(typeof ret);
                if (typeof ret === 'object') {
                    if (ret.$ != undefined) {
                        if (ret.$.value != undefined) {
                            ret = ret.$.value;
                        } else if (ret.$.x != undefined) {
                            ret = "X=" + ret.$.x + " Y=" + ret.$.y + " Z=" + ret.$.z
                        }


                    }
                }
            } else if (typeof arr === 'string') {
                ret = arr;
            }
            return key + ":" + ret;
        });
        console.log(vals);
    };

}]);