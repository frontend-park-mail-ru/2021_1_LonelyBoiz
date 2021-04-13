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

    get(count = 20) {
        console.log('feed: ', this.feed, this.feed !== undefined);
        if (this.feed !== undefined) {
            return Promise.resolve(this.feed);
        }

        console.log('pass condition');

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
