angular.module ('app').factory ('Source', function ($resource) {
  return $resource ( '/api/1/sources',
    { id: '@id' }, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
});
