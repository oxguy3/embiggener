import Parser from '/modules/Parser.js'

export default class YouTube extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'i.ytimg.com',
                    pathPrefix: '/vi/',
                    pathSuffix: 'default.jpg'
                }
            },
        ];
    }
    getBiggestUrl(location) {
        if (location.hostname == "i.ytimg.com") {
            let re = /^\/vi\/([^"&?/ ]{11})\/\w+.jpg$/ig;
            let result = re.exec(location.pathname);
            if (result !== null) {
                let videoId = result[1];
                return "https://i.ytimg.com/vi/"+videoId+"/maxresdefault.jpg";
            }
        }
        return null;
    }
}
