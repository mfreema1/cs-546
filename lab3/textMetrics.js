const createMetrics = text => {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const letters = vowels + consonants;
    text = text.toLowerCase();
    
    res = {};
    labels = ['totalLetters', 'totalNonLetters', 'totalVowels', 'totalConsonants', 'totalWords', 'uniqueWords', 'longWords', 'averageWordLength']
    labels.forEach(label => {
        res[label] = 0; //inflate our zeros
    });

    let words = {};
    let buff = [];
    text.split('').forEach(letter => {
        //letter
        if(letters.indexOf(letter) !== -1) {
            res.totalLetters += 1;
            buff.push(letter);
            //vowels & consonants
            if(vowels.indexOf(letter) !== -1)
                res.totalVowels += 1;
            if(consonants.indexOf(letter) !== -1)
                res.totalConsonants += 1;
        }
        //not a letter
        else {
            res.totalNonLetters += 1;
            if(buff.length) {//repeating non-letters aren't words
                let word = buff.join('');
                if(words[word]) //0 is also 
                    words[word] += 1;
                else
                    words[word] = 1;
                buff = []; //reset the buffer
            }
        }
    });
    //gather up everything we can get easily from the dictionary
    const keys = Object.keys(words);
    res.uniqueWords = keys.length;
    keys.forEach(key => {
        if(key.length >= 6)
            res.longWords += words[key];
        res.totalWords += words[key];
    });
    res.averageWordLength = res.totalLetters / res.totalWords;
    res.wordOccurrences = words;
    return res
};

module.exports = createMetrics;