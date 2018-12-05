import Parser from '/modules/Parser.js'

export default class Flickr extends Parser {
    getConditions() {
        return [
            { pageUrl: { hostEquals: 'farm1.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm2.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm3.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm4.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm5.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm6.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm7.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm8.staticflickr.com' } },
            { pageUrl: { hostEquals: 'farm9.staticflickr.com' } },
        ];
    }
    getBiggestUrl(location) {
        if (/farm\d\.staticflickr\.com/gi.test(location.hostname)) {
            let re = /^\/\d{4}\/(\d{1,11})_[0-9a-f]{10}_\w(?:_d)?.jpg$/ig;
            let result = re.exec(location.pathname);
            if (result !== null) {
                let photoId = result[1];
                return "https://flickr.com/photo.gne?id="+photoId;
            }
        }
        return null;
    }
}
