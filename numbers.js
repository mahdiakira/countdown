var fs = require('fs');
var bigNums = [];
var smallNums = [];
var goal;
var multiplesTwo = {};
var multiplesThree = {};
var multiplesFour = {};
var multiplesFive = {};
var multiplesSix = {};

process.argv.forEach(function(val, index, array) {
    var temp = parseInt(val);
    if (Number.isInteger(temp)) {
        if (temp > 100) {
            goal = temp;
        } else if (temp <= 10) {
            smallNums.push(temp);
        } else {
            bigNums.push(temp);
        }
    }
});

//figure out all permutations of smallNums
smallNums.forEach(function(val, index) {
    for (i = 0; i < smallNums.length; i++) {
        if (i != index) {
            var multiple = smallNums[i] * val;
            if (multiplesTwo[multiple] == undefined) {
                multiplesTwo[multiple] = [[index, i]];
            } else {
                multiplesTwo[multiple].push([index, i]);
            }

        }
    }
})

for (var key in multiplesTwo) {
    multiplesTwo[key].forEach(function(val, index) {
        for (i = 0; i < smallNums.length; i++) {
            var tempVal = val.slice();
            if (tempVal.indexOf(i) < 0) {
                var multiple = smallNums[i] * key;
                if (multiplesThree[multiple] == undefined) {
                    tempVal.push(i);
                    multiplesThree[multiple] = [tempVal];
                } else {
                    tempVal.push(i);
                    multiplesThree[multiple].push(tempVal);
                }
            }
        }
    })
};

for (var key in multiplesThree) {
    multiplesThree[key].forEach(function(val, index) {
        for (i = 0; i < smallNums.length; i++) {
            var tempVal = val.slice();
            if (tempVal.indexOf(i) < 0) {
                var multiple = smallNums[i] * key;
                if (multiplesFour[multiple] == undefined) {
                    tempVal.push(i);
                    multiplesFour[multiple] = [tempVal];
                } else {
                    tempVal.push(i);
                    multiplesFour[multiple].push(tempVal);
                }
            }
        }
    })
};

for (var key in multiplesFour) {
    multiplesFour[key].forEach(function(val, index) {
        for (i = 0; i < smallNums.length; i++) {
            var tempVal = val.slice();
            if (tempVal.indexOf(i) < 0) {
                var multiple = smallNums[i] * key;
                if (multiplesFive[multiple] == undefined) {
                    tempVal.push(i);
                    multiplesFive[multiple] = [tempVal];
                } else {
                    tempVal.push(i);
                    multiplesFive[multiple].push(tempVal);
                }
            }
        }
    })
};

for (var key in multiplesFive) {
    multiplesFive[key].forEach(function(val, index) {
        for (i = 0; i < smallNums.length; i++) {
            var tempVal = val.slice();
            if (tempVal.indexOf(i) < 0) {
                var multiple = smallNums[i] * key;
                if (multiplesSix[multiple] == undefined) {
                    tempVal.push(i);
                    multiplesSix[multiple] = [tempVal];
                } else {
                    tempVal.push(i);
                    multiplesSix[multiple].push(tempVal);
                }
            }
        }
    })
};
var allMultiples = Object.assign({}, multiplesTwo, multiplesThree, multiplesFour, multiplesFive, multiplesSix);
//sort arrays and delete duplicates

for (var multiple in allMultiples) {
    var sortedArrays = {};
    allMultiples[multiple].forEach(function(val, index) {
        var dumb = val.sort(function(a, b) {
            return a - b;
        });
        if (sortedArrays[dumb] == undefined) {
            sortedArrays[dumb] = index;
        }
    });
    for (var key in sortedArrays) {
        var stupidArray = [];
        key.split(",").forEach(function(val, index) {
            stupidArray.push(parseInt(val));
        });
        allMultiples[multiple] = [stupidArray];
    };
};
var multiplesWithAdditions = {};
for (var multiple in allMultiples) {
    allMultiples[multiple].forEach(function(val, index) {
        for (i = 0; i < smallNums.length; i++) {
          var tempVal = val.slice();
            if (tempVal.indexOf(i) < 0) {
                var multWithSum = smallNums[i] + multiple;
                if (multiplesWithAdditions[multWithSum] == undefined) {
                    tempVal.push(i);
                    multiplesWithAdditions[multWithSum] = [tempVal];
                } else {
                    tempVal.push(i);
                    multiplesWithAdditions[multWithSum].push(tempVal);
                }
            }
        }
    })
};
fs.writeFile("./all.txt", JSON.stringify(allMultiples), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
})

//is goal closely divisible by a bigNums
bigNums.forEach(function(val) {
    var remainder = goal / val;
    if (remainder < 10) { //less than or equal to a multiple
        // console.log(remainder);
        // console.log(val);
    }
});

var getLargest = function(array) {
    var largest = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i] > largest) {
            largest = array[i];
        }
    }
    return largest;
};

var getSmallest = function(array) {
    var smallest = 101;
    for (i = 0; i < array.length; i++) {
        if (array[i] < smallest) {
            smallest = array[i];
        }
    }
    return smallest;
};

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {
    enumerable: false
});
