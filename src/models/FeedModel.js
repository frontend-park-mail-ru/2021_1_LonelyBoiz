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
            return this.get.json[0];
        }

        const current = this.curr;

        this.curr += 1;

        return this.feed.json[current];
    }

    get(count = 20) {
        if (this.feed !== undefined) {
            return this.feed;
        }

        return HttpRequests.get('/feed?count=' + count)
            .then(parseJson)
            .then(getAllUsers)
            .then(feed => {
                this.feed = feed;
                this.curr = 0;
                this.len = count;
                return this.feed;
            });
    }
}

export default FeedModel.getInstance();
