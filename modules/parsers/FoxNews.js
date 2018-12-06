import Parser from '/modules/Parser.js'

/*
TODO: Fox News Insider images e.g.
    http://insider.foxnews.com/sites/insider.foxnews.com/files/styles/780_crop/public/dole%20bush.jpg
    http://insider.foxnews.com/sites/insider.foxnews.com/files/styles/1280_crop/public/dole%20bush.jpg?itok=cZnlhbEj
    http://insider.foxnews.com/sites/insider.foxnews.com/files/styles/780/public/tctclimate.jpg?itok=BJWACq6N
They sometimes block the larger sizes, so we need a way to test URLs until we
find the biggest one that works.
*/
export default class FoxNews extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'a57.foxnews.com',
                    pathPrefix: '/static.foxnews.com/foxnews.com/content/uploads/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'a57.foxnews.com',
                    pathPrefix: '/hp.foxnews.com/images/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'a57.foxnews.com',
                    pathPrefix: '/static.foxbusiness.com/foxbusiness.com/content/uploads/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'a57.foxnews.com',
                    pathPrefix: '/media2.foxnews.com/BrightCove/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'a57.foxnews.com',
                    pathPrefix: '/secure.media.foxnews.com/BrightCove/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^(.*?\/)\d+\/\d+(\/[^\/]*)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let filePath = result[1];
            let fileName = result[2];
            url.pathname = filePath+'0/0'+fileName;
            return url.href;
        }
        return null;
    }
}
