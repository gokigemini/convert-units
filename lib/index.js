var keys = require('lodash.keys');
var each = require('lodash.foreach');

var measures = {
  Length: require('./definitions/length'),
  Area: require('./definitions/area'),
  Mass: require('./definitions/mass'),
  Volume: require('./definitions/volume'),
  Each: require('./definitions/each'),
  Temperature: require('./definitions/temperature'),
  Time: require('./definitions/time'),
  Digital: require('./definitions/digital'),
  PartsPer: require('./definitions/partsPer'),
  Speed: require('./definitions/speed'),
  Pace: require('./definitions/pace'),
  Pressure: require('./definitions/pressure'),
  Current: require('./definitions/current'),
  Voltage: require('./definitions/voltage'),
  Power: require('./definitions/power'),
  'Reactive power': require('./definitions/reactivePower'),
  'Apparent power': require('./definitions/apparentPower'),
  Energy: require('./definitions/energy'),
  'Reactive energy': require('./definitions/reactiveEnergy'),
  VolumeFlowRate: require('./definitions/volumeFlowRate'),
  Illuminance: require('./definitions/illuminance'),
  Frequency: require('./definitions/frequency'),
  Angle: require('./definitions/angle'),
  Charge: require('./definitions/charge'),
  Force: require('./definitions/force'),
  Acceleration: require('./definitions/acceleration'),
  Vibration: require('./definitions/vibration'),
  Density: require('./definitions/density'),
  Humidity: require('./definitions/humidity'),
  'Relative humidity': require('./definitions/relativeHumidity'),
  Torque: require('./definitions/torque'),
  'Gauge pressure': require('./definitions/gaugePressure'),
  Currency: require('./definitions/currency'),
  Percentage: require('./definitions/percentage'),
  'Pulse frequency': require('./definitions/pulseFrequency'),
  Data: require('./definitions/data'),
  'Rotational speed': require('./definitions/rotationalSpeed'),
  Scalar: require('./definitions/scalar'),
  pH: require('./definitions/pH'),
  Concentration: require('./definitions/concentration')
};

// var alias = {
//   'Reactive power': require('./definitions/reactivePower'),
//   'Apparent power': require('./definitions/apparentPower'),
//   'Reactive energy': require('./definitions/reactiveEnergy'),
//   'Relative humidity': require('./definitions/relativeHumidity'),
//   'Gauge pressure': require('./definitions/gaugePressure'),
//   'Pulse frequency': require('./definitions/pulseFrequency')
//   'Rotational speed': require('./definitions/rotationalSpeed')
// };

var Converter = function (numerator, denominator) {
  if (denominator) this.val = numerator / denominator;
  else this.val = numerator;
};

/**
 * Lets the converter know the source unit abbreviation
 */
Converter.prototype.from = function (from) {
  if (this.destination) throw new Error('.from must be called before .to');

  this.origin = this.getUnit(from);

  if (!this.origin) {
    this.throwUnsupportedUnitError(from);
  }

  return this;
};

/**
 * Converts the unit and returns the value
 */
Converter.prototype.to = function (to) {
  if (!this.origin) throw new Error('.to must be called after .from');

  this.destination = this.getUnit(to);

  var result, transform;

  if (!this.destination) {
    this.throwUnsupportedUnitError(to);
  }

  // Don't change the value if origin and destination are the same
  if (this.origin.abbr === this.destination.abbr) {
    return this.val;
  }

  // You can't go from liquid to mass, for example
  if (this.destination.measure != this.origin.measure) {
    throw new Error(
      'Cannot convert incompatible measures of ' + this.destination.measure + ' and ' + this.origin.measure
    );
  }

  /**
   * Convert from the source value to its anchor inside the system
   */
  result = this.val * this.origin.unit.to_anchor;

  /**
   * For some changes it's a simple shift (C to K)
   * So we'll add it when convering into the unit (later)
   * and subtract it when converting from the unit
   */
  if (this.origin.unit.anchor_shift) {
    result -= this.origin.unit.anchor_shift;
  }

  /**
   * Convert from one system to another through the anchor ratio. Some conversions
   * aren't ratio based or require more than a simple shift. We can provide a custom
   * transform here to provide the direct result
   */
  if (this.origin.system != this.destination.system) {
    transform = measures[this.origin.measure]._anchors[this.origin.system].transform;
    if (typeof transform === 'function') {
      result = transform(result);
    } else {
      result *= measures[this.origin.measure]._anchors[this.origin.system].ratio;
    }
  }

  /**
   * This shift has to be done after the system conversion business
   */
  if (this.destination.unit.anchor_shift) {
    result += this.destination.unit.anchor_shift;
  }

  /**
   * Convert to another unit inside the destination system
   */
  return result / this.destination.unit.to_anchor;
};

/**
 * Converts the unit to the best available unit.
 */
Converter.prototype.toBest = function (options) {
  if (!this.origin) throw new Error('.toBest must be called after .from');

  var options = Object.assign(
    {
      exclude: [],
      cutOffNumber: 1
    },
    options
  );

  var best;
  /**
    Looks through every possibility for the 'best' available unit.
    i.e. Where the value has the fewest numbers before the decimal point,
    but is still higher than 1.
  */
  each(
    this.possibilities(),
    function (possibility) {
      var unit = this.describe(possibility);
      var isIncluded = options.exclude.indexOf(possibility) === -1;

      if (isIncluded && unit.system === this.origin.system) {
        var result = this.to(possibility);
        if (!best || (result >= options.cutOffNumber && result < best.val)) {
          best = {
            val: result,
            unit: possibility,
            singular: unit.singular,
            plural: unit.plural
          };
        }
      }
    }.bind(this)
  );

  return best;
};

/**
 * checks if the unit is from that measurement
 */
Converter.prototype.checkUnitMeasurement = function (checkUnit, checkMeasure) {
  var found = false;

  each(measures, function (systems, measure) {
    // list all measures with systems
    each(systems, function (units, system) {
      // list all units from a system
      if (system == '_anchors') return false;

      each(units, function (unit, testAbbr) {
        if (testAbbr.localeCompare(checkUnit) === 0 && measure.localeCompare(checkMeasure) === 0) {
          found = true;
        }
      });
    });
  });
  return found;
};

/**
 * Finds the unit
 */
Converter.prototype.getUnit = function (abbr) {
  return Converter.units[abbr];
};

/**
 * Finds the unit
 */
Converter.prototype.findUnit = function (abbr) {
  var found;
  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if (system == '_anchors') return false;
      each(units, function (unit, testAbbr) {
        if (testAbbr == abbr) {
          found = {
            abbr: abbr,
            measure: measure,
            system: system,
            unit: unit
          };
          return false;
        }
      });
      if (found) return false;
    });
    if (found) return false;
  });
  return found;
};

var describe = function (resp) {
  return {
    abbr: resp.abbr,
    measure: resp.measure,
    system: resp.system,
    singular: resp.unit.name.singular,
    plural: resp.unit.name.plural
  };
};

/**
 * An alias for getUnit
 */
Converter.prototype.describe = function (abbr) {
  var resp = Converter.prototype.getUnit(abbr);
  var desc = null;

  try {
    desc = describe(resp);
  } catch (err) {
    this.throwUnsupportedUnitError(abbr);
  }

  return desc;
};

/**
 * Detailed list of all supported units
 */
Converter.prototype.list = function (measure) {
  var list = [];

  each(measures, function (systems, testMeasure) {
    if (measure && measure !== testMeasure) return;

    each(systems, function (units, system) {
      if (system == '_anchors') return false;

      each(units, function (unit, abbr) {
        list = list.concat(
          describe({
            abbr: abbr,
            measure: testMeasure,
            system: system,
            unit: unit
          })
        );
      });
    });
  });

  return list;
};

Converter.prototype.throwUnsupportedUnitError = function (what) {
  var validUnits = [];

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if (system == '_anchors') return false;

      validUnits = validUnits.concat(keys(units));
    });
  });

  throw new Error('Unsupported unit ' + what + ', use one of: ' + validUnits.join(', '));
};

Converter.prototype.singleSystem = function (unit) {
  return measures[this.getUnit(unit).measure];
};

/**
 * Returns the abbreviated measures that the value can be
 * converted to.
 */
Converter.prototype.possibilities = function (measure) {
  var possibilities = [];
  if (!this.origin && !measure) {
    each(keys(measures), function (measure) {
      each(measures[measure], function (units, system) {
        if (system == '_anchors') return false;

        possibilities = possibilities.concat(keys(units));
      });
    });
  } else {
    measure = measure || this.origin.measure;
    each(measures[measure], function (units, system) {
      if (system == '_anchors') return false;

      possibilities = possibilities.concat(keys(units));
    });
  }

  return possibilities;
};

Converter.prototype.possibilityOld = function (originSystem) {
  var possibilities = [];
  if (originSystem === 'imperial' && measures[this.origin.measure].imperial === undefined) {
    originSystem = 'metric';
  }

  var measure = this.origin.measure;
  each(measures[measure], function (units, system) {
    if (system == '_anchors') return false;
    if (!originSystem || system === originSystem) possibilities = possibilities.concat(keys(units));
  });
  if (possibilities.length === 0) possibilities = possibilities.concat(this.origin.abbr);

  return possibilities;
};
Converter.prototype.possibility = function (originSystem) {
  var possibilities = [];

  if (originSystem === 'imperial' && measures[this.origin.measure].imperial === undefined) {
    originSystem = 'metric';
  }
  var measure = this.origin.measure;
  possibilities = keys(measures[measure][originSystem]);
  if (possibilities.length === 0) possibilities = [this.origin.abbr];

  return possibilities;
};
/**
 * Returns the abbreviated measures that the value can be
 * converted to.
 */
Converter.prototype.measures = function () {
  return keys(measures);
};

/**
 * Returns list of units from a certain measurement category in metric and/or imperial
 */
Converter.prototype.unitsFromMeasure = function (measure) {
  return measures[measure];
};

Converter.units = {};

Converter.init = function () {
  Converter.units = {};
  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if (system == '_anchors') return false;
      each(units, function (unit, abbr) {
        var rec = Converter.units[abbr];
        if (rec) return;
        Converter.units[abbr] = {
          abbr: abbr,
          measure: measure,
          system: system,
          unit: unit
        };
      });
    });
  });
};

Converter.init();

var convert = function (value) {
  return new Converter(value || 0);
};
module.exports = convert;
