$(function(){

    var unitObject = $('.unitObject li'),
        object = {};

    unitObject.each(function(i){
        var self = $(this),
            selfSpan = self.find('span').text(),
            selfNum = self.find('.num').val(),
            selfText = self.find('.text').val();

        object[i] = {
            self: self,
            selfSpan: selfSpan,
            selfNum: selfNum,
            selfText: selfText
        };
    });



    var prop;

    for(prop in object){
        var objectMain = object[prop],
            objectLength = objectMain.length;
        (function(objectMain){

        }(objectMain));
    }

    var oFalseObject = new Boolean(false); // outputs false object
    var bResult = oFalseObject && true; // outputs true
    var oNumberObject = new Number(55.6); // 55.6 object
    var iNumber = oNumberObject.valueOf(); // 55.6
    var oFixed = oNumberObject.toFixed(2) // 99.60
    var toExponential = oNumberObject.toExponential(1); // 1.0e+2
    var toPrecision = oNumberObject.toPrecision(1); // 6e+1
    var toPrecisionTwo = oNumberObject.toPrecision(2); // 6e+1

    // The toFixed(), toExponential(), and toPrecision()

    var oStringObject = new String('hello world');
    var oStringObjectVal = oStringObject.valueOf(); // hello world
    var oStringObjectString = oStringObject.toString(); // hello world
    var outputs = oStringObjectVal === oStringObjectString; // true
    var charAt = oStringObject.charAt(1); // e
    var charCodeAt = oStringObject.charCodeAt(2); // 101
    var concat = oStringObject.concat(' ,Evgeny'); // hello world ,Evgeny
    var indexof = oStringObject.indexOf('o'); // 4
    var lastIndexof = oStringObject.lastIndexOf('o'); // 7


    // Example:
    var oStringObjectTwo = new String('yellow');

    var localeCompare1 = oStringObjectTwo.localeCompare('brick'); //outputs “1”
    var localeCompare2 = oStringObjectTwo.localeCompare('yellow'); //outputs “0”
    var localeCompare3 = oStringObjectTwo.localeCompare('zoo'); //outputs “-1”

    var oStringObject1 = new String('yellow');
    var oStringObject2 = new String('brick');
    var sTestString = new String();
    var iResult = sTestString.localeCompare('brick');

    /*if(iResult < 0) {
        console.log(oStringObject1 + ' comes before ' + oStringObject2);
    } else if (iResult > 0) {
        console.log(oStringObject1 + ' comes after ' + oStringObject2);
    } else {
        console.log('The two strings are equal');
    }*/

    var unitText = $('.unitText');

    var toString = new String(unitText.text());
    var slice = toString.slice(1, 100);
    unitText.html(slice + '<a href="#">...</a>');


    var array = {
        name: 1
    };

    console.log(array);

    array = undefined;

    console.log(array);

});