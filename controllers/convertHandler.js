const { init } = require("../server");

function ConvertHandler() {

  this.validUnits = ['gal','L','mi','km','lbs','kg'];

  this.convertionUnits = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs",
  };

  this.unitSpellings = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms",
  };
  
  this.getNum = function(input) {
    let result = 'invalid number';

    if(input.split('/').length > 2) {
      return 'invalid number';
    }

    if(input.includes('/')) {
      let fraction = input.match(/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?/);

      if(fraction) {
        result = eval(fraction[0]);

        return result;
      }
    }

    let num = input.match(/\d+\.?\d*/);

    if(num) {
      result = num[0];
    } else {
      result = 1;
    }


    
    return result;
  };
  
  this.getUnit = function(input) {
    let validUnits = ['gal','L','mi','km','lbs','kg'];
    let result;

    let unit = input.match(/[a-zA-Z]+/);
    
    if(unit && validUnits.includes(unit[0])) {
      result = unit[0];
    } else {
      result = 'invalid unit';
    }
    
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.convertionUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
