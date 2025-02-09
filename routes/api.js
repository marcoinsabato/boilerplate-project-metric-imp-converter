'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.route('/api/convert').get(function (req, res) {

    let input = req.query.input;

    if(!input) {
      return res.send('invalid input');
    }

    
    let convertHandler = new ConvertHandler();

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    };
  })
  

};
