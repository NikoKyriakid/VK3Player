import * as path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

const mainProcess:any = global;

export default class electronConnector {

    version: string;
    appPath: string;
    indexFile: string;
    debug: boolean;
    win: Electron.BrowserWindow;

    constructor(dist: string, indexFile: string, version: string, debug: boolean) {

        this.debug = debug;
        this.version = version;
        this.indexFile = indexFile;
        this.appPath = path.join(app.getAppPath(), dist || 'bin');
        
        this.win = null;
        mainProcess.commonMemory = {
            path: this.appPath
        };
    }

    public run() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', () => this.createWindow());

        // Quit when all windows are closed.
        app.on('window-all-closed', () => {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.win === null) {
                this.createWindow();
            }
        });

        ipcMain.on('resize', (e, x, y) => {
            this.win.setSize(x, y);
        });

        return this;

    }

    private loadURL() {
        if (!this.win) {
            console.error('No Window Created');
            return false;
        }
        if (!this.indexFile) {
            console.log('No Index File Specified.');
            return false;
        } 
        // and load the index.html of the app.
        this.win.loadURL(`file://${this.appPath}/${this.indexFile}`);
    }

    public openDevTools() {
        if (!this.win) {
            console.error('No Window Created');
            return false;
        }
        if (this.debug) {
            // Open the DevTools.
            this.win.webContents.openDevTools();
        }
    }

    private createWindow() {
        // Create the browser window.
        this.win = new BrowserWindow({
            width: 1280,
            height: 720+1,
            frame: false,
            backgroundColor: 'grey'
        });

        // Emitted when the window is closed.
        this.win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.win = null;
        });

        this.loadURL();
        this.openDevTools();
    }
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
