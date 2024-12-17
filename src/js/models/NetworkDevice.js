export class NetworkDevice {
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