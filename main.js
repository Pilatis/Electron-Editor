const { app, BrowserWindow, Menu } = require('electron');
const templateMenu = require('./src/components/Menu')

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        hasShadow: true
    });

    await win.loadFile('./src/pages/editor/index.html')
};

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

// on ready
app.whenReady().then(() => {
    createWindow()
})

// activate
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})