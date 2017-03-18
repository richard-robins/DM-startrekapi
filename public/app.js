angular
    .module('startrek', [])

    .service('mainService', function($http){
        this.getPeople = function(){
            return $http.get('/api/people/')
                .then(response => {
                    console.log(response);
                    return response.data.results;
                }, error => console.log(error));
        };

        this.createPerson = function(newPerson){
            return $http.post('/api/people', newPerson)
                .then(response => {
                    console.log(response);
                    return response.data;
                }, error => console.log(error));
        };
    })

    .controller('mainController', function($scope, mainService){
        $scope.test = 'live long and prosper';

        mainService.getPeople().then(people => {
            $scope.people = people;
        });

        $scope.createPerson = function(newPerson){
            mainService.createPerson(newPerson).then(createdPerson => {
                $scope.people.push(createdPerson);
            });
        };
    });
