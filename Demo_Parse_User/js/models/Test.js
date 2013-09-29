(function () {
    var Test = Parse.Object.extend("Test",{
        MOVIE : function(){
            return "movie";
        },
        DATE: function () {
            return "date";
        },
        PRICE: function () {
            return "price";
        }
    });

    window.Test = Test;
   // BodeefitWorkouts.User = BodeefitUser;
    //$.extend(BodeefitWorkouts.User, Parse.Events);

}());