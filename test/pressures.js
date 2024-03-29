var convert = require('../lib'),
  assert = require('assert'),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require('../lib/percentError');

tests['Pa to Pa'] = function () {
  assert.strictEqual(convert(1).from('Pa').to('Pa'), 1);
};

tests['Pa to kPa'] = function () {
  assert.strictEqual(convert(2000).from('Pa').to('kPa'), 2);
};
tests['Pa to in.wg.'] = function () {
  assert.strictEqual(convert(2000).from('Pa').to('in.wg.'), 8.029286007980799);
};
tests['Pa to WC'] = function () {
  assert.strictEqual(convert(2000).from('Pa').to('WC'), 8.029286007980799);
};
tests['in.wg. to Pa'] = function () {
  assert.strictEqual(convert(8.029286007980799).from('in.wg.').to('Pa'), 2000);
};
tests['WC to Pa'] = function () {
  assert.strictEqual(convert(8.029286007980799).from('WC').to('Pa'), 2000);
};
tests['mbar to bar'] = function () {
  assert.strictEqual(convert(8000).from('mbar').to('bar'), 8);
};
tests['mbar to Pa'] = function () {
  assert.strictEqual(convert(8).from('mbar').to('Pa'), 800);
};
tests['mbar to psi'] = function () {
  assert.strictEqual(convert(1).from('mbar').to('psi'), 0.014503768077999999);
};
tests['mbar to WC'] = function () {
  assert.strictEqual(convert(1).from('mbar').to('WC'), 0.40146430039903996);
};
0.401865
tests['WC to in.wg.'] = function () {
  assert.strictEqual(convert(1).from('WC').to('in.wg.'), 1);
};
tests['in.wg. to WC'] = function () {
  assert.strictEqual(convert(1).from('in.wg.').to('WC'), 1);
};
tests['kPa to Pa'] = function () {
  assert.strictEqual(convert(1).from('kPa').to('Pa'), 1000);
};

tests['kPa to hPa'] = function () {
  assert.strictEqual(convert(20).from('kPa').to('hPa'), 200);
};

tests['kPa to MPa'] = function () {
  assert.strictEqual(convert(8000).from('kPa').to('MPa'), 8);
};

tests['kPa to bar'] = function () {
  assert.strictEqual(convert(6000).from('kPa').to('bar'), 60);
};

tests['kPa to torr'] = function () {
  var expected = 3990.33,
    actual = convert(532).from('kPa').to('torr');
  assert.ok(percentError(expected, actual) < ACCURACY, 'Expected: ' + expected + ', Actual: ' + actual);
};

tests['psi to psi'] = function () {
  assert.strictEqual(convert(10).from('psi').to('psi'), 10);
};

tests['psi to ksi'] = function () {
  assert.strictEqual(convert(10000).from('psi').to('ksi'), 10);
};

tests['Pa to psi'] = function () {
  var expected = 1.450377,
    actual = convert(10000).from('Pa').to('psi');
  assert.ok(percentError(expected, actual) < ACCURACY, 'Expected: ' + expected + ', Actual: ' + actual);
  assert.strictEqual(convert(1).from('GB').to('B'), 1073741824);
};

tests['torr to ksi'] = function () {
  var expected = 1,
    actual = convert(51714.931860168974).from('torr').to('ksi');
  assert.ok(percentError(expected, actual) < ACCURACY, 'Expected: ' + expected + ', Actual: ' + actual);
};

tests['psi to hPa'] = function () {
  var expected = 689.47573,
    actual = convert(10).from('psi').to('hPa');
  assert.ok(percentError(expected, actual) < ACCURACY, 'Expected: ' + expected + ', Actual: ' + actual);
};

module.exports = tests;
