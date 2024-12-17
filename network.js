class NetworkDevice {
    constructor(id, ip) {
        this.id = id;
        this.ip = ip;
        this.element = document.getElementById(id);
    }

    broadcast(message) {
        this.element.classList.add('broadcasting');
        setTimeout(() => {
            this.element.classList.remove('broadcasting');
        }, 2000);
    }

    receive(message) {
        this.element.classList.add('receiving');
        setTimeout(() => {
            this.element.classList.remove('receiving');
        }, 1000);
    }
}

const devices = {
    device1: new NetworkDevice('device1', '192.168.1.1'),
    device2: new NetworkDevice('device2', '192.168.1.2'),
    device3: new NetworkDevice('device3', '192.168.1.3')
};

function addLogEntry(message, type) {
    const log = document.getElementById('networkLog');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.insertBefore(entry, log.firstChild);
}

function sendBroadcast() {
    const message = document.getElementById('broadcastMessage').value;
    const sourceDevice = document.getElementById('sourceDevice').value;
    
    if (!message) {
        alert('Please enter a message to broadcast');
        return;
    }

    // Simulate broadcast
    devices[sourceDevice].broadcast(message);
    addLogEntry(`${sourceDevice} broadcasting: ${message}`, 'broadcast');

    // Simulate other devices receiving the message
    setTimeout(() => {
        Object.entries(devices).forEach(([id, device]) => {
            if (id !== sourceDevice) {
                device.receive(message);
                addLogEntry(`${id} received broadcast from ${sourceDevice}: ${message}`, 'receive');
            }
        });
    }, 500);

    // Clear input
    document.getElementById('broadcastMessage').value = '';
}