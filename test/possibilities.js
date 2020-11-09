var convert = require('../lib'),
  assert = require('assert-diff'),
  tests = {};

assert.options.strict = true;

tests['l possibilities'] = function () {
  var actual = convert().from('l').possibilities(),
    expected = [
      'mm³',
      'cm³',
      'ml',
      'cl',
      'dl',
      'l',
      'kl',
      'm³',
      'km³',
      'krm',
      'tsk',
      'msk',
      'kkp',
      'glas',
      'kanna',
      'tsp',
      'Tbs',
      'in³',
      'fl-oz',
      'cup',
      'pnt',
      'qt',
      'gal',
      'ft³',
      'yd³'
    ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['kg possibilities'] = function () {
  var actual = convert().from('kg').possibilities(),
    expected = ['mcg', 'mg', 'g', 'kg', 'mt', 'oz', 'lb', 't'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['m possibilities'] = function () {
  var actual = convert().from('m').possibilities(),
    expected = ['mm', 'cm', 'm', 'km', 'in', 'yd', 'ft-us', 'ft', 'fathom', 'mi', 'nMi'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['each possibilities'] = function () {
  var actual = convert().possibilities('each'),
    expected = ['ea', 'dz'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['mass possibilities'] = function () {
  var actual = convert().possibilities('mass'),
    expected = ['mcg', 'mg', 'g', 'kg', 'mt', 'oz', 'lb', 't'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['volume possibilities'] = function () {
  var actual = convert().possibilities('volume'),
    expected = [
      'mm³',
      'cm³',
      'ml',
      'cl',
      'dl',
      'l',
      'kl',
      'm³',
      'km³',
      'krm',
      'tsk',
      'msk',
      'kkp',
      'glas',
      'kanna',
      'tsp',
      'Tbs',
      'in³',
      'fl-oz',
      'cup',
      'pnt',
      'qt',
      'gal',
      'ft³',
      'yd³'
    ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['volume flow rate possibilities'] = function () {
  var actual = convert().possibilities('volumeFlowRate'),
    expected = [
      'mm3/s',
      'cm3/s',
      'ml/s',
      'cl/s',
      'dl/s',
      'l/s',
      'l/min',
      'l/h',
      'kl/s',
      'kl/min',
      'kl/h',
      'm3/s',
      'm3/min',
      'm3/h',
      'km3/s',
      'tsp/s',
      'Tbs/s',
      'in3/s',
      'in3/min',
      'in3/h',
      'fl-oz/s',
      'fl-oz/min',
      'fl-oz/h',
      'cup/s',
      'pnt/s',
      'pnt/min',
      'pnt/h',
      'qt/s',
      'gal/s',
      'gal/min',
      'gal/h',
      'ft3/s',
      'ft3/min',
      'ft3/h',
      'yd3/s',
      'yd3/min',
      'yd3/h'
    ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['length possibilities'] = function () {
  var actual = convert().possibilities('length'),
    expected = ['mm', 'cm', 'm', 'km', 'in', 'yd', 'ft-us', 'ft', 'fathom', 'mi', 'nMi'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['temperature possibilities'] = function () {
  var actual = convert().possibilities('temperature'),
    expected = ['C', 'K', 'F', 'R'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['time possibilities'] = function () {
  var actual = convert().possibilities('time'),
    expected = ['ns', 'mu', 'ms', 's', 'min', 'h', 'd', 'week', 'month', 'year'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['digital possibilities'] = function () {
  var actual = convert().possibilities('digital'),
    expected = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'B', 'KB', 'MB', 'GB', 'TB'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['partsPer possibilities'] = function () {
  var actual = convert().possibilities('partsPer'),
    expected = ['ppm', 'ppb', 'ppt', 'ppq'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['pressure possibilities'] = function () {
  var actual = convert().possibilities('pressure'),
    expected = ['Pa', 'kPa', 'MPa', 'hPa', 'bar', 'torr', 'psi', 'ksi'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['speed possibilities'] = function () {
  var actual = convert().possibilities('speed'),
    expected = ['m/s', 'km/h', 'm/h', 'knot', 'ft/s'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['pace possibilities'] = function () {
  var actual = convert().possibilities('pace'),
    expected = ['s/m', 'min/km', 'min/mi', 's/ft'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['current possibilities'] = function () {
  var actual = convert().possibilities('current'),
    expected = ['A', 'mA', 'kA'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['voltage possibilities'] = function () {
  var actual = convert().possibilities('voltage'),
    expected = ['V', 'mV', 'kV'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['power possibilities'] = function () {
  var actual = convert().possibilities('power'),
    expected = ['W', 'mW', 'kW', 'MW', 'GW'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['reactive power possibilities'] = function () {
  var actual = convert().possibilities('reactivePower'),
    expected = ['VAR', 'mVAR', 'kVAR', 'MVAR', 'GVAR'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['apparent power possibilities'] = function () {
  var actual = convert().possibilities('apparentPower'),
    expected = ['VA', 'mVA', 'kVA', 'MVA', 'GVA'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['energy possibilities'] = function () {
  var actual = convert().possibilities('energy'),
    expected = ['Wh', 'mWh', 'kWh', 'MWh', 'GWh', 'J', 'kJ'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['reactive energy possibilities'] = function () {
  var actual = convert().possibilities('reactiveEnergy'),
    expected = ['VARh', 'mVARh', 'kVARh', 'MVARh', 'GVARh'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['reactive energy possibilities'] = function () {
  var actual = convert().possibilities('frequency'),
    expected = ['Hz', 'mHz', 'kHz', 'MHz', 'GHz', 'THz', 'rpm', 'deg/s', 'rad/s'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['illuminance possibilities'] = function () {
  var actual = convert().possibilities('illuminance'),
    expected = ['lx', 'ft-cd'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['angle possibilities'] = function () {
  var actual = convert().possibilities('angle'),
    expected = ['rad', 'deg', 'grad', 'arcmin', 'arcsec'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['charge possibilities'] = function () {
  var actual = convert().possibilities('charge'),
    expected = ['c', 'mC', 'μC', 'nC', 'pC'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['force possibilities'] = function () {
  var actual = convert().possibilities('force'),
    expected = ['N', 'kN', 'lbf'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['acceleration possibilities'] = function () {
  var actual = convert().possibilities('acceleration'),
    expected = ['g-force', 'm/s²'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['all possibilities'] = function () {
  var actual = convert().possibilities(),
    // Please keep these sorted for maintainability
    expected = [
      'A',
      'arcmin',
      'arcsec',
      'B',
      'C',
      'F',
      'R',
      'GB',
      'Gb',
      'K',
      'KB',
      'Kb',
      'MB',
      'MPa',
      'Mb',
      'N',
      'Pa',
      'TB',
      'Tb',
      'ac',
      'b',
      'bar',
      'c',
      'cl',
      'cl/s',
      'cm',
      'cm²',
      'cm³',
      'cm3/s',
      'cup',
      'cup/s',
      'd',
      'deg',
      'deg/s',
      'dl',
      'dl/s',
      'ea',
      'dz',
      'fl-oz',
      'fl-oz/h',
      'fl-oz/min',
      'fl-oz/s',
      'ft-us',
      'ft',
      'fathom',
      'ft-cd',
      'ft/s',
      'ft²',
      'ft³',
      'ft3/h',
      'ft3/min',
      'ft3/s',
      'g',
      'g-force',
      'gal',
      'gal/h',
      'gal/min',
      'gal/s',
      'glas',
      'grad',
      'GHz',
      'GVA',
      'GVAR',
      'GVARh',
      'GW',
      'GWh',
      'h',
      'hPa',
      'ha',
      'Hz',
      'in',
      'in²',
      'in³',
      'in3/h',
      'in3/min',
      'in3/s',
      'J',
      'kA',
      'kPa',
      'kanna',
      'kg',
      'kkp',
      'kJ',
      'kN',
      'kl',
      'kl/h',
      'kl/min',
      'kl/s',
      'km',
      'km/h',
      'km²',
      'km³',
      'km3/s',
      'knot',
      'krm',
      'ksi',
      'kHz',
      'kV',
      'kVA',
      'kVAR',
      'kVARh',
      'kW',
      'kWh',
      'l',
      'l/h',
      'l/min',
      'l/s',
      'lb',
      'lbf',
      'lx',
      'm',
      'm/h',
      'm/s',
      'm/s²',
      'm²',
      'm³',
      'm3/h',
      'm3/min',
      'm3/s',
      'mA',
      'mC',
      'mcg',
      'mg',
      'mi',
      'mi²',
      'min',
      'min/km',
      'min/mi',
      'ml',
      'ml/s',
      'mm',
      'mm²',
      'mm³',
      'mm3/s',
      'month',
      'ms',
      'msk',
      'mt',
      'mu',
      'nC',
      'mHz',
      'MHz',
      'mV',
      'mVA',
      'MVA',
      'mVAR',
      'MVAR',
      'mVARh',
      'MVARh',
      'mW',
      'MW',
      'mWh',
      'MWh',
      'nMi',
      'ns',
      'oz',
      'pC',
      'pnt',
      'pnt/h',
      'pnt/min',
      'pnt/s',
      'ppb',
      'ppm',
      'ppq',
      'ppt',
      'psi',
      'qt',
      'qt/s',
      'rad',
      'rad/s',
      'rpm',
      's',
      's/m',
      's/ft',
      't',
      'Tbs',
      'Tbs/s',
      'THz',
      'torr',
      'tsk',
      'tsp',
      'tsp/s',
      'V',
      'VA',
      'VAR',
      'VARh',
      'W',
      'week',
      'Wh',
      'yd',
      'yd²',
      'yd³',
      'yd3/h',
      'yd3/min',
      'yd3/s',
      'year',
      'μC'
    ];

  try {
    assert.deepEqual(actual.sort(), expected.sort());
  } catch (e) {
    // This gets too long, and gets truncated
    process.stderr.write(e + '\n');
    throw e;
  }
};

module.exports = tests;
