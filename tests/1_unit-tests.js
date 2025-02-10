const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    
    test('convertHandler should correctly read a whole number input', function(done){
        let input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        done();
    });
    
    test('convertHandler should correctly read a decimal number input', function(done){
        let input = '0.32L';
        assert.equal(convertHandler.getNum(input), 0.32);
        done();
    });
    
    test('convertHandler should correctly read a fractional input', function(done){
        let input = '1/2L';
        assert.equal(convertHandler.getNum(input), 0.5);
        done();
    });
    
    test('convertHandler should correctly read a fractional input with a decimal', function(done){
        let input = '1.5/5L';
        assert.equal(convertHandler.getNum(input), 0.3);
        done();
    });
    
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done){
        let input = '3/2/3L';
        assert.equal(convertHandler.getNum(input), 'invalid number');
        done();
    });
    
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done){
        let input = 'L';
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });
    
    test('convertHandler should correctly read each valid input unit', function(done){
        assert.equal(convertHandler.getUnit('gal'), 'gal');
        assert.equal(convertHandler.getUnit('L'), 'L');
        assert.equal(convertHandler.getUnit('mi'), 'mi');
        assert.equal(convertHandler.getUnit('km'), 'km');
        assert.equal(convertHandler.getUnit('lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('kg'), 'kg');
        done();
    });
    
    test('convertHandler should correctly return an error for an invalid input unit', function(done){
        assert.deepEqual(convertHandler.getUnit('foo'), 'invalid unit');
        done();
    });
    
    test('convertHandler should return the correct return unit for each valid input unit', function(done){
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        done();
    });
    
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done){
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        done();
    });
    
    test('convertHandler should correctly convert gal to L', function(done){
        let input = 1;
        let unit = 'gal';
        let expected = 3.78541;
        assert.approximately(convertHandler.convert(input, unit), expected, 0.1);
        done();
    });
    
    test('convertHandler should correctly convert L to gal', function(done){
        let input = 1;
        let unit = 'L';
        let expected = 0.26417;
        assert.approximately(convertHandler.convert(input,unit), expected, 0.1);
        done();
    });
    
    test('convertHandler should correctly convert mi to km', function(done){
        let input = 1;
        let unit = 'mi';
        let expected = 1.60934;
        assert.approximately(convertHandler.convert(input,unit), expected, 0.1);
        done();
    });
    
    test('convertHandler should correctly convert km to mi', function(done){
        let input = 1;
        let unit = 'km';
        let expected = 0.62137;
        assert.approximately(convertHandler.convert(input,unit), expected, 0.1);
        done();
    });
    
    test('convertHandler should correctly convert lbs to kg', function(done){
        let input = 1;
        let unit = 'lbs';
        let expected = 0.45359;
        assert.approximately(convertHandler.convert(input,unit), expected, 0.1);
        done();
    });
    
    test('convertHandler should correctly convert kg to lbs', function(done){
        let input = 1;
        let unit = 'kg';
        let expected = 2.20462;
        assert.approximately(convertHandler.convert(input,unit), expected, 0.1);
        done();
    });
});