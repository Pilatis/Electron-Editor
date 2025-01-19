const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const createMenu = require('./src/components/Menu');
const fs = require('fs');
const path = require('path');

var mainWindow = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 750,
        height: 600,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        hiddenInMissionControl: true
    });

    await mainWindow.loadFile('./src/pages/editor/index.html');

    const menu = Menu.buildFromTemplate(createMenu(createNewFile, saveFile, saveFileAs, openFile));
    Menu.setApplicationMenu(menu);

    //mainWindow.webContents.openDevTools();

    createNewFile();

    ipcMain.on('update-content', ((event, data) => {
        file.content = data;
    }))
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
};

// save file in disk
function writeFile(filePath){
    try {
      fs.writeFile(filePath, file.content, ((error) => {
        if (error) throw error;
    
        // file saved
        file.path = filePath;
        file.saved = true;
        file.name = path.basename(filePath);

        mainWindow.webContents.send('set-file', file)
        
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

function saveFile() {
    if (file.saved) {
        return writeFile(file.path);
    }

    return saveFileAs()
};

function readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf-8')
    } catch (error) {
        return '';
    }
}

async function openFile() {
   let dialogFile = await dialog.showOpenDialog({
    defaultPath: file.path
   });

   if (dialogFile.canceled) return false;

   file = {
    name: path.basename(dialogFile.filePaths[0]),
    content: readFile(dialogFile.filePaths[0]),
    saved: true,
    path: dialogFile.filePaths[0]
   }

   mainWindow.webContents.send('set-file', file)
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