module.exports = function (params) {
  const originalLength = Object.keys(params).length;
  const checkValidFormat = Object.values(params).filter((value) => value);
  return originalLength === checkValidFormat.length;
};
