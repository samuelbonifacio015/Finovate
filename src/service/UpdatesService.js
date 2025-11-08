export default class UpdatesService {
    getUpdates() {
        return fetch('data/updates.json').then(res => res.json()).then(d => d.updates);
    }
}