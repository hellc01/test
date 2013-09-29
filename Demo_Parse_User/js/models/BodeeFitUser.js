(function () {
    var BodeefitUser = Parse.User.extend({
        getFirstName: function () {
            var nameObj = this.splitName();
            return nameObj.firstname;
        },
        getLastName: function () {
            var nameObj = this.splitName();
            return nameObj.lastname;
        },
        splitName: function () {
            var fullname = this.get('name'),
				firstname,
				lastname = fullname;

            if (!fullname) return { firstname: '', lastname: '' };

            if (fullname.indexOf(' ') > -1) {
                fullnameArr = fullname.split(' ');
                firstname = fullnameArr[0];
                lastname = fullname.replace(firstname + ' ', '');
            }
            return { firstname: firstname, lastname: lastname };
        },
        subscribeToMailingList: function () {
            if (!this.get('email')) return false;
            $.ajax("/signup/emailSubscribe", {
                data: {
                    email: this.get('email'),
                    firstname: this.getFirstName(),
                    lastname: this.getLastName()
                },
                type: "POST"
            });
        },
        unsubscribeFromMailingList: function () {
            if (!this.get('email')) return false;
            $.ajax("/signup/emailUnsubscribe", {
                data: {
                    email: this.get('email')
                },
                type: "POST"
            });
        },
        setFullname: function (fullname) {
            this.set("fullname", fullname);
        },
        setSignupSrc: function (signupSrc) {
            this.set("signupSrc", signupSrc);
        },
        setFacebookId: function (facebookId) {
            this.set("facebookId", facebookId);
        },
        setTimezone: function (timezone) {
            this.set("timezone", timezone);
        },
        getFullname: function () {
            return this.get("fullname");
        },
        getSignupSrc: function () {
            return this.get("signupSrc");
        },
        getFacebookId: function () {
            return this.get("facebookId");
        },
        getTimezone: function () {
            return this.get("timezone");
        }
    }, {
        logOut: function () {
            this.trigger('logout');
            Parse.User.logOut();
        },
        logIn: function (username, password, config) {
            Parse.User.logIn(username, password, {
                success: function (data) {
                    this.trigger('login', data);
                    if (config && config.success && typeof (config.success) == "function") {
                        config.success(data);
                    }
                }.bind(this),
                error: function (error) {
                    //this.trigger('login', error);
                    if (config && config.error && typeof (config.error) == "function") {
                        config.error(error);
                    }
                }.bind(this)
            })
        }
    });


    window.User = BodeefitUser;
   // BodeefitWorkouts.User = BodeefitUser;
    //$.extend(BodeefitWorkouts.User, Parse.Events);

}());