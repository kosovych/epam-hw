module.exports = (str) => {
  return /^[A-Z][/s,:,./?!a\-zA\-Z0-9]{5,59}/gm.test(str);
};

