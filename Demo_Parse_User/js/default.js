// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());


            $("#createUser").click(createUser);
            $("#login").click(login);
            $("#currentUser").click(showCurrentUser);
            $("#logout").click(logout);
            $("#saveObject").click(saveObject);
        }

        Parse.initialize("7LFTNtCElIjZChyxghgOtgXcIB2k2zlpN0Cq5J5X", "hVKkjXUpL7RehKzDmbwKDMXpt28cHOqevHNXNVMp");
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    
    function createUser() {
        console.log("create User");
        
        //var user = new Parse.User();
        //user.set("username", "my name2");
        //user.set("password", "my pass");
        //user.set("email", "email2@example.com");
        //user.set("username",$("#username").val());
        //user.set("password", $("#password").val());
        //user.set("email", $("#username").val() + "@163.com");
        // other fields can be set just like with Parse.Object
        //user.set("phone", "415-392-02021");
        // user.set("qq", "12342354");
        var user = new User();
        user.setUsername($("#username").val());
        user.setPassword($("#password").val());
        user.setFacebookId("234234");
        user.setFullname("hellc green");
        user.setSignupSrc("win8 pc");
        user.setTimezone("bj");
        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                var msg = new Windows.UI.Popups.MessageDialog("sign up success!" + " user:" + user.get("username"));
                msg.showAsync();

                console.log("success");
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                var msg = new Windows.UI.Popups.MessageDialog("sign up failed!");
                msg.showAsync();

                console.log(error.message);
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    function login() {
        var username = $("#username_login").val();
        var password = $("#password_login").val();



        Parse.User.logIn(username, password, {
            success: function (user) {
                var msg = new Windows.UI.Popups.MessageDialog("login success! username is " + user.get("username"));
                msg.showAsync();
            },
            error: function (user, error) {
                var msg = new Windows.UI.Popups.MessageDialog("login failed! username is " + user.get("username") + " error is " + error.message + " error code is " + error.code);
                msg.showAsync();
            }
        });

        //Parse.User.logIn("myname", "mypass", {
        //    success: function (user) {
        //        // Do stuff after successful login.
        //    },
        //    error: function (user, error) {
        //        // The login failed. Check error to see why.
        //    }
        //});
    }

    function showCurrentUser() {
        var user = Parse.User.current();

        var msg = new Windows.UI.Popups.MessageDialog("current user'name:" + ((user==null)?"no user":user.get("username")));
        msg.showAsync();
    }

    function logout() {
        Parse.User.logOut();
        var user = Parse.User.current();
        var msg = new Windows.UI.Popups.MessageDialog("xx2:" + user);
        msg.showAsync();
    }

    function saveObject() {
        var test = new Test();
        console.log("1: " + Test.PRICE);
        console.log("2: " + test.PRICE);
        //test.set(test.MOVIE, "bianxingjingang");
        //test.set(test.PRICE, "20.0");
        test.set("price", 23);
        test.set("asd", 23);
        test.save({}, {
            success : function(test){
                console.log("success");
            },
            error: function (test,error) {
                console.log("error")
            }
        });
        //test.set("xxx", "sdf");
        //test.fetch({
        //    success: function () {
        //        console.log("fetch success");
        //    },
        //    error: function () {
        //        console.log("fetch error");
        //    },
        //    change: function () {
        //        console.log("fetch change");
        //    }
        //});

    }
    //test
    //test2
    //test5
    //test6
    app.start();
})();
