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
        var user = new Parse.User();
        //user.set("username", "my name2");
        //user.set("password", "my pass");
        //user.set("email", "email2@example.com");
        user.set("username",$("#username").val());
        user.set("password", $("#password").val());
        user.set("email", $("#username").val() + "@163.com");
        // other fields can be set just like with Parse.Object
        user.set("phone", "415-392-02021");
       // user.set("qq", "12342354");

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                var msg = new Windows.UI.Popups.MessageDialog("sign up success!");
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

    app.start();
})();
