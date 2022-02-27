function homeCtrl($scope, $http, $rootScope) {
    $scope.isLoading = false;
    $scope.list_account = [];
    $scope.role_acc = 1;
    $rootScope.fullName = '';


    $scope.id = -1;
    $scope.index = -1;
    // clear();

    $scope.isLoading = true;
    $http.get('https://621a0d2c81d4074e85b8331c.mockapi.io/students')
        .then(function(response) {
            // $scope.list_subject = response.data;
            $scope.list_account = response.data;
            $scope.isLoading = false;
        })
        .catch(function(error) {
            console.log(error);
            $scope.isLoading = false;
        });





    //Đăng ký tài khoản
    $scope.registerUser = function(event) {
        event.preventDefault();
        $scope.registerError = '';
        if ($scope.Password != $scope.ConfirmPassword) {
            $scope.registerError = "Xác nhận mật khẩu không đúng !";
            return;
        }

        var data = {
            fullname: $scope.fullName,
            email: $scope.email,
            password: $scope.Password
        }

        $http.post('https://621a0d2c81d4074e85b8331c.mockapi.io/students', data)
            .then(function(response) {
                confirm('Đăng ký thành công !');
            })
        document.location = "index.html#!/dangNhap";
    }


    //Đăng nhập
    $scope.list_account = []
    var checkLogin = false;
    $scope.dangNhap = function(event) {
        event.preventDefault();
        $scope.registerError = '';

        $http.get('https://621a0d2c81d4074e85b8331c.mockapi.io/students')
            .then(function(response) {
                $scope.list_account = response.data;
            });
        for (var i = 0; i < $scope.list_account.length; i++) {
            if ($scope.emailLogin == $scope.list_account[i].email && $scope.PasswordLogin == $scope.list_account[i].password) {
                checkLogin = true;
                $rootScope.fullName = $scope.list_account[i].fullname;
                break;
            }

        }

        if (checkLogin == true) {
            alert('Đăng nhập thành công');
            // confirm($scope.fullName);
            document.location = "index.html#!/home";
        }
    }



    //Xóa tài khoản 
    $scope.onDelete = function(index) {
        // confirm(index);
        var id = $scope.list_account[index].id;

        $http.delete('https://621a0d2c81d4074e85b8331c.mockapi.io/students/' + id)
            .then(function(response) {
                alert('Xóa thành công !');
                $scope.list_account.splice(index, 1);
                $scope.index - 1;
            })
    }



    $scope.onFormAccManagerSubmit = function(event) {
        event.preventDefault();

        if ($scope.index == -1) {

            var data = {
                fullname: $scope.nameAccountManager,
                email: $scope.emailAccountManager,
                password: $scope.passAccountManager
            }

            $http.post('https://621a0d2c81d4074e85b8331c.mockapi.io/students/', data)
                .then(function(response) {
                    confirm('Thêm thành công !');
                    $scope.list_account.push(response.data);
                    $scope.index - 1;
                    clearForm();
                });

        } else {
            var data = {
                fullname: $scope.nameAccountManager,
                email: $scope.emailAccountManager,
                password: $scope.passAccountManager
            }

            $http.put('https://621a0d2c81d4074e85b8331c.mockapi.io/students/' + $scope.id, data)
                .then(function(response) {
                    confirm('Cập nhật thành công !');
                    $scope.list_account[$scope.index] = response.data;
                    $scope.index - 1;
                    clearForm();
                });
        }

    }

    //Nút sửa
    $scope.getDataUpdate = function(index) {
        $scope.index = index;
        $scope.id = $scope.list_account[index].id;
        $scope.nameAccountManager = angular.copy($scope.list_account[index].fullname);
        $scope.emailAccountManager = angular.copy($scope.list_account[index].email);
        $scope.passAccountManager = angular.copy($scope.list_account[index].password);
    }

    function clearForm() {
        $scope.nameAccountManager = '';
        $scope.emailAccountManager = '';
        $scope.passAccountManager = '';
    }
}