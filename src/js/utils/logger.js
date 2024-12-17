export class Logger {
    constructor(elementId) {
        this.logElement = document.getElementById(elementId);
    }

    addEntry(message, type) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        this.logElement.insertBefore(entry, this.logElement.firstChild);
    }
}

export const networkLogger = new Logger('networkLog');