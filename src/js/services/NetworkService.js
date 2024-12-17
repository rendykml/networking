import { NetworkDevice } from '../models/NetworkDevice.js';

class NetworkService {
    constructor() {
        this.devices = {
            device1: new NetworkDevice('device1', '192.168.1.1'),
            device2: new NetworkDevice('device2', '192.168.1.2'),
            device3: new NetworkDevice('device3', '192.168.1.3')
        };
    }

    broadcastMessage(sourceDeviceId, message) {
        const sourceDevice = this.devices[sourceDeviceId];
        
        if (!sourceDevice) {
            throw new Error('Invalid source device');
        }

        // Broadcast from source
        sourceDevice.broadcast(message);

        // Simulate network delay for receiving devices
        setTimeout(() => {
            Object.entries(this.devices).forEach(([id, device]) => {
                if (id !== sourceDeviceId) {
                    device.receive(message);
                }
            });
        }, 500);
    }
}

export const networkService = new NetworkService();