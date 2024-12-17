import { networkService } from './services/NetworkService.js';
import { networkLogger } from './utils/logger.js';

window.sendBroadcast = function() {
    const message = document.getElementById('broadcastMessage').value;
    const sourceDevice = document.getElementById('sourceDevice').value;
    
    if (!message) {
        alert('Please enter a message to broadcast');
        return;
    }

    try {
        // Send broadcast
        networkService.broadcastMessage(sourceDevice, message);
        
        // Log events
        networkLogger.addEntry(`${sourceDevice} broadcasting: ${message}`, 'broadcast');
        setTimeout(() => {
            Object.keys(networkService.devices).forEach(deviceId => {
                if (deviceId !== sourceDevice) {
                    networkLogger.addEntry(
                        `${deviceId} received broadcast from ${sourceDevice}: ${message}`,
                        'receive'
                    );
                }
            });
        }, 500);

        // Clear input
        document.getElementById('broadcastMessage').value = '';
    } catch (error) {
        console.error('Broadcast failed:', error);
        alert('Failed to send broadcast message');
    }
};