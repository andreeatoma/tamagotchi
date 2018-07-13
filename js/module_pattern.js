let modulePattern = (function () {
    let memes = ['cat', 'dog'];

    getMemes = function () {
        return memes;
    }
    return {
        getMemes: getMemes
    };
})();

console.log(modulePattern.getMemes());


