module.exports = function HomeModel ({ name = 'yo-ccit', message = 'CloudCodeIt', generator = 'yo-generator' } = {}) {
  return {
    name: name,
    message: message,
    generator: generator
  };
};
