'use strict';
myApp.controller('mainCtrl', function ($scope, imageData, PagerService) {



    $scope.searchString = '';
    $scope.startNumber = 0;
    $scope.endNumber = 3000;
    $scope.curPage = 0;
    $scope.pageSize = 8;
    $scope.itemsPerPage = 8;
    $scope.arms = '';
    $scope.pager = {};
    $scope.searchItem = null;
    $scope.clear_items = [];


    $scope.getItemId = function () {

    };

    $scope.init =function () {
        setAllSkins($scope.searchString, $scope.startNumber, $scope.endNumber);
    };

    $scope.$watch('searchString',function (newVal) {

        setAllSkins($scope.searchString,$scope.startNumber, $scope.endNumber)
    });

    function setAllSkins(searchString, startNumber, endNumber) {
        $scope.arms = '';
        var result_asc = [];
        var sort_value_asc = [];
        var resultItems = '';
        $scope.dummyItems = '';
        $scope.pager = {};

        var all_arms = [];
        all_arms = imageData;

        for (var i = 0; i < all_arms.length; i++) {

            if (all_arms[i].name.indexOf(searchString) > -1) {
                    result_asc.push(all_arms[i]);

            }
        }

        $scope.dummyItems =result_asc;
        $scope.setPage = setPage;
        $scope.setPage(1);
        $('.pagination-div').show();
    }

    function setPage(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }
        $scope.pager = PagerService.GetPager($scope.dummyItems.length, page);
        $scope.arms = $scope.dummyItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        setTimeout(function () {
            displaySelectedItems()
        }, 100);
    }
    function displaySelectedItems() {
        for (var k = 0; k < $scope.clear_items.length; k++) {
            $('#item_price_' + $scope.clear_items[k].id).addClass('check');
            $('#item_' + $scope.clear_items[k].id).addClass('check');
        }
    }


});
