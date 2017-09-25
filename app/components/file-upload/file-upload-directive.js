'use strict';

angular.module('myApp.fileUpload.fileUploadDirective', [])
    .directive("fileUpload", FileUploadDirective);

function FileUploadDirective() {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            onChange: "="
        },
        template: '<input type="file" name="file" /><label><ng-transclude></ng-transclude></label>',
        link: function (scope, element, attrs) {
            element.bind("change", function () {
                scope.onChange(element.children()[0].files);
            });
        }
    }
}