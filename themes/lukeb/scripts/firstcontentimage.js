const cheerio = require('cheerio');

hexo.extend.helper.register('firstcontentimage', function (content) {
    const images = [];
    const $ = cheerio.load(content);

    $('img').each(function () {
        const src = $(this).attr('src');
        if (src) {
            images.push(src);
        }
    });

    return images.length > 0 ? images[0] : undefined;
});
