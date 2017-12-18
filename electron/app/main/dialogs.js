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
        if (files) event.sender.send('selected-directory', files)
    })
})