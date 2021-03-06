module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    if (val === null) return true;

    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    if (val === null) return true;

    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    if (val === null) return true;

    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    if (val === null) return true;

    // should parse
    return Number.isInteger(val);
  });

  zSchema.registerFormat('date', function(val) {
    if (val === null) return true;

    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    if (val === null) return true;

    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    if (val === null) return true;

    // should parse as a string
    return typeof val === 'string';
  });
};
