const { app, BrowserWindow, Menu, dialog } = require('electron');
const createMenu = require('./src/components/Menu');
const fs = require('fs');
const path = require('path');

var mainWindow = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    await mainWindow.loadFile('./src/pages/editor/index.html');

    const menu = Menu.buildFromTemplate(createMenu(createNewFile, saveFileAs));
    Menu.setApplicationMenu(menu);

    //mainWindow.webContents.openDevTools();

    createNewFile();
};

var file = {}

function createNewFile() {
    file = {
        name: 'new-file.txt',
        content: '',
        saved: false,
        path: app.getPath('documents') + '/new-file.txt'
    };

    mainWindow.webContents.send('set-file', file);
    console.log(file)
};

// save file in disk
function writeFile(filePath){
    try {
      fs.writeFile(filePath.File.content, ((error) => {
        if (error) throw error;
    
        // file saved
        file.path = filePath;
        file.saved = true;
        file.name = path.basename(filePath);

        console.log(file)
        
      }))
    } catch (error) {
        console.log(error)
    }
}

async function saveFileAs() {
   let dialogFile = await dialog.showSaveDialog({
    defaultPath: file.path
   });

   if (dialogFile.canceled) return false;

   writeFile(dialogFile.filePath);
}

// on ready
app.whenReady().then(() => {
    createWindow()
});

// activate
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

module.exports = createNewFile;