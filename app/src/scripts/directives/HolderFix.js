angular.module ('app').directive ('HolderFix', function () {
  return {
    link: function (scope, element, attrs) {
      Holder.run ({ images: element[0], nocss: true });
    }
  }
});
