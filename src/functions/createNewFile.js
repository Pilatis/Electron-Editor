const { app } = require('electron')

var file = {}

const createNewFile = () => {
    file = {
        name: 'novo-arquivo.txt',
        content: '',
        saved: false,
        path: app.getPath('documents') + '/novo-arquivo.txt'
    };

    console.log(file)
}

//testers
module.exports = createNewFile;