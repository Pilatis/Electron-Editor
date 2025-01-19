
const Menu = (createNewFile, saveFile, saveFileAs, openFile) => {
    const whatIsPlataform = process.platform === 'darwin';

    // template menu
    const templateMenu = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Novo',
                    accelerator: 'CmdOrCtrl+N',
                    click() {
                        createNewFile();
                    }
                },
                {
                    label: 'Abrir',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        openFile()
                    }
                },
                {
                    label: 'Salvar',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                        saveFile();
                    }
                },
                {
                    label: 'Salvar como',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click() {
                        saveFileAs();
                    }
                },
                { label: 'Fechar', role: whatIsPlataform ? 'close' : 'quit' },
            ]
        },
        {
            label: 'Editar',
            submenu: [
                {
                    label: 'Desfazer',
                    accelerator: 'CmdOrCtrl+Z'
                },
                {
                    label: 'Recortar',
                    accelerator: 'CmdOrCtrl+X'

                },
                {
                    label: 'Copiar',
                    accelerator: 'CmdOrCtrl+C'
                },
                {
                    label: 'Colar',
                    accelerator: 'CmdOrCtrl+V'
                },
            ]
        }
    ];

    return templateMenu
}

module.exports = Menu;