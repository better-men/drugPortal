
var _loginInfo = {
    loading: false,
    //userId,userName,title,jsonInfo,phoneNo,email
    user: null
};

var _loginUtils = {
    name: "Menu_Login",
    data() {
        return {

        };
    },
    checkLogin(req, onTrue, onFalse) {
        var curUser = _loginUtils.getUserInfo();
        if (curUser && !isNullOrEmpty(curUser.userId)) {
            setTimeout(function () {
                window.Bingo.HasSignIn = true;
            }, 5000);
            onTrue(false);
        } else {
            req.get(process.env.API_ROOT + window.Bingo.config("apiPath", "") + "getCurrentUser")
                .then(res => {
                    var code = res.data.code;
                    if (isEquals(code, "200")) {
                        _loginUtils.setUserInfo(
                            res.data.data ? res.data.data.user : null
                        );
                        setTimeout(function () {
                            window.Bingo.HasSignIn = true;
                        }, 5000);
                        onTrue(true);
                    } else {
                        onFalse()
                    }
                })
                .catch(function (error) {
                    onFalse();
                });
        }
    },
    login(userId, password, app) {
        var req = app.$http;

        if (_loginInfo.loading) return;
        _loginInfo.loading = true;
        console.log(process.env.API_ROOT + window.Bingo.config("apiPath", "") + "login");
        req.post(process.env.API_ROOT + window.Bingo.config("apiPath", "") + "login", { userId: userId, password: encryptRSA(password) }).then(
            function (res) {
                if (res.data.code == 200 && res.data.data && res.data.data.user) {
                    _loginUtils.setUserInfo(res.data.data.user);
                    setTimeout(function () {
                        window.Bingo.HasSignIn = true;
                    }, 5000);
                    var pathBefore = _loginUtils.getPath();
                    if (!isNullOrEmpty(pathBefore)) {
                        app.$router.push(pathBefore);
                    } else {
                        app.$router.push("/view/index");
                    }
                }else{
                  app.$notify({
                    title: "错误",
                    message: "用户名或登录密码错误",
                    duration: 0
                  });
                }
                _loginInfo.loading = false;
            })
            .catch(function (error) {
                _loginInfo.loading = false;
                app.$notify({
                    title: "错误",
                    message: "登录失败：" + error.message,
                    duration: 0
                });
            });
    },
    logout(app) {
        var req = app.$http;
        req.get(process.env.API_ROOT + window.Bingo.config("apiPath", "") + "logout").then(
            function (res) {
                _loginInfo.loading = false;
                _loginUtils.setUserInfo(null);
                _loginUtils.setPath("");
                window.Bingo.HasSignIn = false;
                app.$router.push("/login");
            })
            .catch(function (error) {
                _loginInfo.loading = false;
                _loginUtils.setUserInfo(null);
                _loginUtils.setPath("");
                window.Bingo.HasSignIn = false;
                app.$router.push("/login");
            });
    },
    getUserInfo() {
        var tmp = sessionStorage.getItem('MenuCurrentUser');
        if (tmp) {
            return JSON.parse(tmp);
        } else {
            return null;
        }
    },
    setUserInfo(user) {
        if (user) {
            sessionStorage.setItem('MenuCurrentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('MenuCurrentUser', '');
        }
    },
    setPath(path) {
        sessionStorage.setItem("LastRouterPath", path);
    },
    getPath() {
        return sessionStorage.getItem("LastRouterPath");
    }
};


export default _loginUtils;
