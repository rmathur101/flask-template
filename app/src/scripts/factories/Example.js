angular.module ('app').factory ('Example', function () {
  var example = {
    exampleFunction: function (x) {
      return x * x;
    }
  };
  return example;
});
