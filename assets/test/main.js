$(document).ready(function () {
    $("#resultDiv").hide();
    $("#flamesDiv").hide();
});

$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        if ($(this).attr("value") == "myCheckBox") {
            $("#flamesDiv").toggle();
        }
    });
});

$(document).ready(function () {
    $('body').addClass('js');
    var $menu = $('#menu'),
        $menulink = $('.menu-link');

    $menulink.click(function () {
        $menulink.toggleClass('active');
        $menu.toggleClass('active');
        return false;
    });
});

var navigateTo = {
    homePage: function () {
        window.location.href = '/'
    },
    myWorksPage: function () {
        window.location.href = '/myWorks'
    },
    contactsPage: function () {
        window.location.href = '/contact'
    },
    gbAppPage: function () {
        window.location.href = '/index'
    }
}

var myApp = {

    launch: function () {
        myApp.calculateFlames();
        myApp.updateResult();
    },

    calculateCommonCharecters: function (firstName, secondName) {

        var a = firstName;
        var b = secondName;

        str1 = a.split("");
        str2 = b.split("");

        var output1 = str1.filter(function (val) {
            return str2.indexOf(val) == -1;
        });
        var output2 = str2.filter(function (val) {
            return str1.indexOf(val) == -1;
        });

        return output1.concat(output2);
    },

    calculateFlames: function () {
        var a = $('#firstName').val();
        var b = $('#secondName').val();
        var count = myApp.calculateCommonCharecters(a, b).length;
        var value;
        if (count == 3 || count == 5) {
            value = "FRIENDSHIP";
        } else if (count == 10) {
            value = "LOVE";
        } else if (count == 8 || count == 12 || count == 13) {
            value = "AFFECTION";
        } else if (count == 6 || count == 11) {
            value = "MARRIED";
        } else if (count == 2 || count == 4 || count == 7 || count == 9) {
            value = "ENEMIES";
        } else if (count == 1) {
            value = "SIBLINGS";
        } else {
            value = "Sorry..!! Enter something";
        }
        return value;
    },

    updateResult: function () {
        $("#resultDiv").show();
        $('#result').html(myApp.calculateFlames());
    }
}