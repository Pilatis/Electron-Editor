const { ipcRenderer } = require('electron');


const title = document.getElementById('title')
const textarea = document.getElementById('textarea');

ipcRenderer.on('set-file', function(event, data) {
    textarea.value = data.content;
    title.innerHTML = data.name + '| Electron Editor'
});

function handleChangeText()