const fileData = require('./fileData');

const chapters = ['chapter1.txt', 'chapter2.txt', 'chapter3.txt'];

chapters.forEach(async chapter => {
    let result_path = chapter.slice(0, chapter.lastIndexOf('.')) + '.result.json';
    fileData.getFileAsJSON(result_path)
        .then( data => {
            console.log(`Data retrieved from ${result_path}:\n` + JSON.stringify(data));
        })
        .catch(async () => {
            const res = await fileData.getFileAsJSON(chapter);
            console.log(`File ${chapter} after processing:\n` + JSON.stringify(res));
            fileData.saveJSONToFile(result_path, res);
        });
});