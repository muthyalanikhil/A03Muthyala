
QUnit.test("Here's a test that should always pass", function (assert) {
    assert.ok(1 <= "3", "1<3 - the first agrument is 'truthy', so we pass!");
});

QUnit.test('Testing calculateCommonCharecters function used to calculate number of common charecters', function (assert) {
    assert.equal(myApp.calculateCommonCharecters("nik", "nikhil").length, 2, 'Tested with two strings');
    assert.equal(myApp.calculateCommonCharecters("abcd", "abc").length, 1, 'Tested with two strings');
    assert.equal(myApp.calculateCommonCharecters("1234567", "1234").length, 3, 'Tested with two strings');
    assert.equal(myApp.calculateCommonCharecters("nik", "nikhil").length, 2, 'Tested with two strings');
 });

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
