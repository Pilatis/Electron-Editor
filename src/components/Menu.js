const createNewFile = require('../functions/createNewFile')

const Menu = () => {
    const whatIsPlataform = process.platform === 'darwin';

    // template menu
    const templateMenu = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Novo', click()  {
                        createNewFile()
                    }
                },
                { label: 'Abrir' },
                { label: 'Salvar' },
                { label: 'Salvar como' },
                { label: 'Fechar', role: whatIsPlataform ? 'close' : 'quit' },
            ]
        }
    ];

    return templateMenu
}

module.exports = Menu();