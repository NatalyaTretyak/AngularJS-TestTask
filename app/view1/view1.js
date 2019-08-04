'use strict';
const items = [
  {
    section: 'Calendar',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Profile',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Property',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Contacts',
    permission: { view: false, edit: false, remove: false }
  }
];

angular
  .module('myApp.view1', ['ngRoute'])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'MyController'
      });
    }
  ])

  .controller('MyController', [
    '$scope',
    function($scope) {
      $scope.editAllDisable = true;
      $scope.removeAllDisable = true;
      $scope.items = items;

      $scope.changeView = function(section) {
        // if one of views is unchecked - 'Check all for view', 'Check all for edit' are unchecked
        // relevant edit and remove are unchecked too
        if (section.permission.view === false) {
          $scope.edit = false;
          $scope.remove = false;
          section.permission.edit = false;
          section.permission.remove = false;
        }
        // if every separate view is checked - 'Check all for view', 'Check all for edit' are checked too
        let allTrue = items.every(item => item.permission.view === true);
        if (allTrue === true) {
          $scope.view = true;
          $scope.editAllDisable = false;
        }

        // if at least one of views is unchecked - 'Check all for view' is unchecked too,
        // relevant edit and 'Check all for edit', relevant remove, and 'Check all for remove' are disabled
        let someFalse = items.some(item => item.permission.view === false);
        if (someFalse === true) {
          $scope.view = false;
          $scope.removeAllDisable = true;
          $scope.editAllDisable = true;
        }
      };

      $scope.changeEdit = function(section) {
        // if edit is unchecked - remove is disabled
        if (section.permission.edit === false) {
          section.permission.remove = false;
        }
        // if at least one of edits is unchecked - 'Check all for edit' is unchecked too,
        // relevant remove, and 'Check all for remove' are disabled
        let someFalse = items.some(item => item.permission.edit === false);
        if (someFalse === true) {
          $scope.edit = false;
          $scope.remove = false;
          $scope.removeAllDisable = true;
        }
        // if all of edit checkboxes are checked - 'Check all for edit' is checked,
        // 'Check all for remove' is enabled
        let allTrue = items.every(item => item.permission.edit === true);
        if (allTrue === true) {
          $scope.edit = true;
          $scope.removeAllDisable = false;
        }
      };

      $scope.changeAllView = function(condition) {
        // if 'Check all for view' is checked - 'Check all for edit' is enabled
        $scope.editAllDisable = !condition;

        items.forEach(item => {
          // if 'Check all for view' is unchecked - 'Check all for edit', 'Check all for remove' are disabled
          // separate edit and separate remove are unchecked
          if (condition === false) {
            item.permission.edit = condition;
            item.permission.remove = condition;
            $scope.removeAllDisable = !condition;
          }
          // for each separate view set the same condition as 'Check all for view' cond.
          item.permission.view = condition;
        });
        // make 'Check all for edit', 'Check all for remove' unchecked
        if (condition === false) {
          $scope.edit = condition;
          $scope.remove = condition;
        }
      };

      $scope.changeAllEdit = function(condition) {
        // if 'Check all for edit' is checked - 'Check all for remove' is disabled
        $scope.removeAllDisable = !condition;

        // if 'Check all for edit' is unchecked - 'Check all for remove' is disabled,
        // separate removes are unchecked
        items.forEach(item => {
          if (condition === false) {
            item.permission.remove = condition;
          }
          // for each separate edit set the same condition as 'Check all for edit' condition
          item.permission.edit = condition;
        });
        // uncheck 'Check all for remove'
        if (condition === false) {
          $scope.remove = condition;
        }
      };

      $scope.changeAllRemove = function(condition) {
        // if 'Check all for remove' is checked - every separate remove is checked too
        items.forEach(item => {
          item.permission.remove = condition;
        });
      };

      $scope.changeRemove = function() {
        // if at least one of removes is unchecked - 'Check all for remove' is unchecked too
        let someFalse = items.some(item => item.permission.remove === false);
        if (someFalse === true) {
          $scope.remove = false;
        }
        // if every separate remove is checked - 'Check all for remove' is checked too
        let allTrue = items.every(item => item.permission.remove === true);
        if (allTrue === true) {
          $scope.remove = true;
        }
      };

      $scope.save = function() {
        let serialItems = angular.toJson(items);
        localStorage.setItem('items', serialItems);
      };
    }
  ]);
