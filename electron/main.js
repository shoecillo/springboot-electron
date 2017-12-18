
const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

const fs = require('fs')

const xml2js = require('xml2js')

const spawn = require('child_process').spawn;

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./out.log', 'a');
var child = spawn('java', ['-jar', __dirname + '/jar/springboot-electron.jar'], {
  detached: true,
  stdio: ['ignore', out, err]
});
child.unref();



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1280, height: 720 })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

 app.on('quit', function() {
    // Close and destroy the JAVA process
    child.kill('SIGINT');
  })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('open-information-dialog', function(event) {
    const options = {
        type: 'info',
        title: 'Information',
        message: "This is an information dialog. Isn't it nice?",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, function(index) {
        event.sender.send('information-dialog-selection', index)
    })
})

ipc.on('open-file-dialog', function(event) {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function(files) {
        if (files) {
            var file = files[0]
            console.log(file);
            fs.readFile(file, 'utf-8', function(err, data) {
                if (err) {
                    event.sender.send('selected-directory', err)
                    return
                } else {
                    var parser = new xml2js.Parser()
                    parser.parseString(data, function(err, result) {

                        event.sender.send('selected-directory', result)
                    });



                }
            })

        }
    })
})