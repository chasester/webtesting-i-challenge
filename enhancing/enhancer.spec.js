const enhancer = require('./enhancer.js');
// test away!
var weapons =
[
    {name: "The Indurible Durability", duriblity: Math.random()*1000000%100+5, enhancement: Math.random()*1000000%20+1},
    {name: "Hammer Time", duriblity: Math.random()*1000000%20+40, enhancement: Math.random()*1000000%20+1},
    {name: "The Soul Crusher", duriblity: Math.random()*1000000%20+50, enhancement: Math.random()*1000000%20+1},
    {name: "Blade Of Untold Epectations", duriblity: Math.random()*1000000%20+20, enhancement: Math.random()*1000000%20+1},
    {name: "Fragile Iron Hammer", duriblity: Math.random()*1000000%20+10, enhancement: Math.random()*1000000%20+1},
    {name: "Bikini Striker", duriblity: Math.random()*1000000%50+2, enhancement: Math.random()*1000000%20+1},
]
weapons = weapons.map(x=> {for(let i = 0; i < x.enhancement-1; i++) enhancer.succeed(x)}); //bring the weapon up the the enhanced spec;
var testweapons = [

    {name: "Blade of Testing", duriblity: 100, enhancement: 20},
    {name: "Debugging Hammer", duriblity: 10, enhancement: 14},
    {name: "Coders Revenge", duriblity: 50, enhancement: 17},
    {name: "Hours Alone In The Dark", duriblity: 20, enhancement: 5},
    {name: "Divide By Zero", duriblity: 100, enhancement: 0}
]

var testweaponsFail = [
    {name: "Blade of Testing", duriblity: 90, enhancement: 19},
    {name: "Debugging Hammer", duriblity: 5, enhancement: 14},
    {name: "Coders Revenge", duriblity: 40, enhancement: 16},
    {name: "Hours Alone In The Dark", duriblity: 15, enhancement: 5},
    {name: "Divide By Zero", duriblity: 95, enhancement: 0}
]

describe('sum function', () => {
    //console.log(testweapons);
    //console.log(enhancer.repair(x));
   
        //testweapons.forEach(x=> console.log(isEquivalent(enhancer.repair(x), {...x})));
    testweapons.forEach(x=> 
        it(`Repairs ${x.name}`, () => { 
        expect(isEquivalent(enhancer.repair(x), {...x, duriblity: 100})).toBe(true) // .toBe() looks for strict equality!
        }
    ));

    testweapons.forEach(x=> 
        it(`Enhances ${x.name}[${x.enhancement}] => [${Math.min(x.enhancement+1, 20)}]`, () => {
            expect(isEquivalent(enhancer.succeed(x), {...x, enhancement: Math.min(x.enhancement+1, 20)})).toBe(true) // .toBe() looks for strict equality!
        }
    ));

    testweapons.forEach((x,i)=> 
        it(`Fails To Enhance ${x.name}[${x.enhancement}] => [${Math.min(x.enhancement+1, 20)}]`, () => {
            expect(isEquivalent(enhancer.fail(x), testweaponsFail[i])).toBe(true) // .toBe() looks for strict equality!
        }
    ));

    testweapons.forEach((x,i)=> 
    it(`Get Name ${x.name}`, () => {
        expect(enhancer.get(x)).toBe(`${x.name} ${x.enhancement>0 ? `[+${x.enhancement}]`: ""}`) // .toBe() looks for strict equality!
        console.log(enhancer.get(x))
    }
));
  });


  //taken from:
  //http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html

  function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }