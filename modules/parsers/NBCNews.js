import Parser from '/modules/Parser.js'

/*
https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201812/nn_ksn_bedminster_nj_illegal_workers_181206_1920x1080.focal-80x80.jpg
https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201812/nn_ksn_bedminster_nj_illegal_workers_181206_1920x1080.focal-580x290.jpg

https://media3.s-nbcnews.com/j/newscms/2018_49/2674516/181206-heather-nauert-ac-801p_d9f9c555c41c42458b1c9d7d2ddf4750.focal-580x290.jpg
https://media3.s-nbcnews.com/j/newscms/2018_49/2674516/181206-heather-nauert-ac-801p_d9f9c555c41c42458b1c9d7d2ddf4750.fit-1000w.jpg
https://media3.s-nbcnews.com/j/newscms/2018_49/2674516/181206-heather-nauert-ac-801p_d9f9c555c41c42458b1c9d7d2ddf4750.fit-2000w.jpg

https://media3.s-nbcnews.com/j/newscms/2018_49/2669916/181204-wisconsin-capitol-protest-se-211p_43dad03d7d8774908a8125205a06ac3e.focal-380x190.jpg
*/
export default class FoxNews extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'media1.s-nbcnews.com',
                    pathPrefix: '/j/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'media2.s-nbcnews.com',
                    pathPrefix: '/j/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'media3.s-nbcnews.com',
                    pathPrefix: '/j/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'media4.s-nbcnews.com',
                    pathPrefix: '/j/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^(\/j\/.*\/[^\/\.]+)\.[\w-]+\.jpg$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let filePath = result[1];
            url.pathname = filePath+'.fit-2000w.jpg';
            return url.href;
        }
        return null;
    }
}
