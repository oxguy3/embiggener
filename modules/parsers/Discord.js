import Parser from '/modules/Parser.js'

export default class Discord extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'media.discordapp.net',
                    pathPrefix: '/attachments/',
                }
            },
            {
                pageUrl: {
                    hostEquals: 'images-ext-1.discordapp.net',
                    pathPrefix: '/external/',
                }
            },
            {
                pageUrl: {
                    hostEquals: 'images-ext-2.discordapp.net',
                    pathPrefix: '/external/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let paramsNew = url.searchParams;
        paramsNew.delete('height');
        paramsNew.delete('width');
        url.search = '?' + paramsNew.toString();
        return url.href;
    }
}
