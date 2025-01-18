
const Menu = (createNewFile, saveFileAs) => {
    const whatIsPlataform = process.platform === 'darwin';

    // template menu
    const templateMenu = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Novo', click()  {
                        createNewFile();
                    }
                },
                { label: 'Abrir' },
                { label: 'Salvar' },
                { label: 'Salvar como',
                  click() {
                    saveFileAs();
                  }
                 },
                { label: 'Fechar', role: whatIsPlataform ? 'close' : 'quit' },
            ]
        }
    ];

    return templateMenu
}

module.exports = Menu;