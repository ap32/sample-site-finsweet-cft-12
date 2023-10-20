const minor = new Set(['@types/node']);

module.exports = {
  target: (dependencyName) => {
    if (minor.has(dependencyName)) return 'minor';
    return 'latest';
  }
}