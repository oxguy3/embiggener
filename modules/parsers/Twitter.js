import Parser from '/modules/Parser.js'

export default class Twitter extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'pbs.twimg.com',
                    pathPrefix: '/media/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/media\/([\w\d_]+)\.(\w+)(?:\:\w+)?$/ig;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let imageId = result[1];
            let fileExt = result[2];
            return "https://pbs.twimg.com/media/"+imageId+"."+fileExt+":large";
        }
        return null;
    }
}
