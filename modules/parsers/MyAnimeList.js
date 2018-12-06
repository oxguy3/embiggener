import Parser from '/modules/Parser.js'

export default class MyAnimeList extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'cdn.myanimelist.net',
                    pathPrefix: '/r/',
                }
            },
            {
                pageUrl: {
                    hostEquals: 'cdn.myanimelist.net',
                    pathPrefix: '/images/'
                }
            }
        ];
    }
    getBiggestUrl(url) {
        let isChanged = false;

        // remove '/r/NxN/' prefix
        let rePrefix = /^(\/r\/\d+x\d+)/g;
        let resultPrefix = rePrefix.exec(url.pathname);
        if (resultPrefix !== null) {
            let prefix = resultPrefix[1];
            url.pathname = url.pathname.substring(prefix.length);
            isChanged = true;
        }

        //
        let re = /^(\/images\/(\w+)\/\d+\/\d+)(\.\w+)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let category = result[1];
            let filePath = result[2];
            let fileExt = result[3];

            // characters don't have a large version for some reason
            if (category != 'characters') {
                url.pathname = filePath+'l'+fileExt;
                isChanged = true;
            }
        }
        return isChanged ? url.href : null;
    }
}
