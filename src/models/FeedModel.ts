import HttpRequests from '../utils/requests';
import { parseJson, getAllUsers, IResponseData } from '../utils/helpers';
import Context from '../utils/Context';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';

class FeedModel {
    static instance: FeedModel = null;
    feed: IResponseData = undefined;
    curr: number = undefined;
    len = 0

    static getInstance() {
        if (!FeedModel.instance) {
            FeedModel.instance = new FeedModel();
        }

        return FeedModel.instance;
    }

    constructor() {
        eventBus.connect(Events.resetFeed, this.resetFeed.bind(this));
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

    reactCurrent(reaction: Context): Promise<IResponseData> {
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

    get(count = 20): Promise<IResponseData> {
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
