const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file =/');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file!!');
            resolve('success');
        })
    });
};

const getDogPic = async () => { // always returns a Promise
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed ${data}`);

        const resPro1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resPro2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resPro3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([resPro1, resPro2, resPro3]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!!');
    } catch (err) {
        console.log(err);

        throw err;
    }
    return '2: Ready'
}

(async () => {
    try {
        console.log('1: Will get dog pics!');

        const x = await getDogPic();
        console.log(x);

        console.log('3: Done!');
    } catch (err) {
        console.log('Erro!!!');
    }
})();

/* console.log('1: Will get dog pics!');
getDogPic()
    .then(x => {
        console.log(x);
        console.log('3: Done!');
    }).catch(err => {
        console.log('Erro!!!');
    }); */

/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent
            .get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file!!');
    })
    .catch(err => {
        console.log(err);
    });
*/