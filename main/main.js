//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

var path = require('path')
const {app,BrowserWindow,Menu,ipcMain,dialog} = require('electron')
var java = require("java");
java.classpath.push(__dirname + "/src"); // load every classpath at the begining

var mvn = require('node-java-maven');
mvn(function(err, mvnResults) {
   if (err) {
      return console.error('could not resolve maven dependencies', err);
   }
   mvnResults.classpath.forEach(function(c) {
      console.log('adding ' + c + ' to classpath');
      java.classpath.push(c);
   });
});

/*
// + add this to main/package.json for maven dependencies:

   {
     "groupId": "path.to.class.package",
     "artifactId": "package-name",
     "version": "1.0",
   }

*/

var win = null

// Quit when all windows are closed.
app.on('window-all-closed', function() {
   if (process.platform != 'darwin') {
      app.quit();
}
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
   // Create the browser window.
   win = new BrowserWindow({titleBarStyle: 'hidden', width: 800, height: 800, icon: path.join(__dirname, 'icons/png/icon.png'),
      webPreferences: { // <--- (1) Additional preferences
         nodeIntegration: false,
         preload: __dirname + '/preload.js' // <--- (2) Preload script
      }
   });

   win.loadURL('http://localhost:3000');

   // open debug console on startup
   win.webContents.openDevTools();

   // when window is closed
   win.on('closed', function() {
      win = null;
   });

   // when window finished loading
   win.webContents.on('did-finish-load', function() {
     win.webContents.send('log', 'whoooooooh!');

   });

   setMainMenu()
});


function setMainMenu() {

   const template = [
      {
        label: 'MenuItem1',
        submenu: [
          {
            label: 'Hello',
            accelerator: 'Shift+CmdOrCtrl+H',
            click() {
               console.log("menu click")

               // send events to renderer/index
               win.webContents.send('MenuItem1/Hello', 'w h o o o o o o o h? ');
            }
          }
        ]
      },
      {
         label: 'MenuItem2',
         submenu: [
            {
               label: 'Reload',
               accelerator: 'Ctrl+R',
               click: (e) => { win.reload() }
            },
            { type: 'separator' },
            { role: 'quit'}
        ]
      }
   ];

   Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// listening to signals from renderer
ipcMain.on('MenuItem1/Hello', function (event, arg) {

   // we show a simple button
   dialog.showMessageBox(
      win,
      {type:"question", buttons: ['button0', 'button1', 'button2'], title:'MenuItem/Hello', message:arg},
      (response) => { // when button is clicked

         // response ~ /[0-2]/ (rank in button list)
         win.webContents.send('log', ["response",response]);
         var expr = "3+"+response+"*8"

         // here we call some java code
         var Calculator = java.import("de.lipros.electron.java.example.SimpleCalculator");
         var result = Calculator.calculateSync(Calculator.getFormatedListSync(expr));

         // printing results in terminal
         const javaLangSystem = java.import('java.lang.System');
         javaLangSystem.out.printlnSync('Hello from Java World!'+expr+"="+result);

         // sending result to renderer to store data or anything
         win.webContents.send('helloJava', 'Hello from Java World!'+expr+"="+result)
      }
   );
})
