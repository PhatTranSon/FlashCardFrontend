const axios = require('axios');

exports.formatColor = color => '#' + color;

exports.getPhonetic = (word, callback) => {
    axios
        .get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => {
            //Get the data
            const wordArray = response.data;

            //Check the word
            if (wordArray.length > 0) {
                //Get the first item
                const entry = wordArray[0];

                //Check the phonetic
                const phonetics = entry.phonetics;

                //Check the length 
                if (phonetics.length > 0) {
                    //Get the phonetic and return
                    const phonetic = phonetics[0].text;

                    //Return
                    callback(null, phonetic);
                } else {
                    callback(new Error('No phonetic available not found'), null);
                }
            } else {
                callback(new Error('Word not found'), null);
            }
        })
        .catch(error => {
            console.log(error);
            callback(new Error('Unknown error getting phonetic'), null);
        });
}

exports.shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
