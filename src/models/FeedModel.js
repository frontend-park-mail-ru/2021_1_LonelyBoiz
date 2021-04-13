import HttpRequests from '../utils/requests.js';
import { parseJson, getAllUsers } from '../utils/helpers.js';

class FeedModel {
    static instance = null;

    constructor() {
        this.feed = undefined;
        this.curr = undefined;
        this.len = 0;
    }

    static getInstance() {
        if (!FeedModel.instance) {
            FeedModel.instance = new FeedModel();
        }

        return FeedModel.instance;
    }

    resetFeed() {
        this.feed = undefined;
        this.curr = undefined;
        this.len = 0;
    }

    getCurrent() {
        if (this.feed === undefined || this.curr >= this.len) {
            return {};
        }

        const current = this.curr;

        return this.feed.json[current];
    }

    reactCurrent(reaction) {
        if (this.feed === undefined || this.curr >= this.len) {
            return Promise.reject(new Error('Feed is empty'));
        }

        const body = {
            userId: this.getCurrent().json.id,
            reaction: reaction
        };

        return HttpRequests.post('/likes', body)
            .then(parseJson)
            .then(response => {
                this.curr += 1;
                return response;
            });
    }

    get(count = 20) {
        if (this.feed !== undefined && this.curr < this.len) {
            return Promise.resolve(this.feed);
        }

        return HttpRequests.get('/feed?count=' + count)
            .then(parseJson)
            .then(getAllUsers)
            .then(feed => {
                this.feed = feed;
                this.curr = 0;
                this.len = feed.json.length;
                return this.feed;
            });
    }
}

export default FeedModel.getInstance();
