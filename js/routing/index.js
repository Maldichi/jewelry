// /routing/index.js
// Для начала установим зависимости.
const url = require('url');
const fs = require('fs');

const define = function(req, res, postData) {
    // Теперь получаем наш адрес. Если мы переходим на localhost:3000/test, то path будет '/test'
    const urlParsed = url.parse(req.url, true);
    let path = urlParsed.pathname;

    // Теперь записываем полный путь к server.js. Мне это особенно нужно, так как сервер будет
    // висеть в systemd, и путь, о котором он будет думать, будет /etc/systemd/system/...
    prePath = __dirname;
    try {
        // Здесь мы пытаемся подключить модуль по ссылке. Если мы переходим на
        // localhost:8000/api, то скрипт идёт по пути /routing/dynamic/api, и, если находит там
        // index.js, берет его. Я знаю, что использовать тут try/catch не слишком правильно, и потом
        // переделаю через fs.readFile, но пока у вас не загруженный проект, разницу в скорости
        // вы не заметите.
        let dynPath = './dynamic/' + path;
        let routeDestination = require(dynPath);
        res.end('We have API!');
    }
        // /routing/index.js: блок catch
    catch (err) {
        // Находим наш путь к статическому файлу и пытаемся его прочитать.
        // Если вы не знаете, что это за '=>', тогда прочитайте про стрелочные функции в es6,
        // очень крутая штука.
        let filePath = prePath+'/static'+path+'/index.html';
        fs.readFile(filePath, 'utf-8', (err, html) => {
            // Если не находим файл, пытаемся загрузить нашу страницу 404 и отдать её.
            // Если находим — отдаём, народ ликует и устраивает пир во имя царя-батюшки.
            if (err) {
                let nopath = '/var/www/html/nodejs/routing/nopage/index.html';
                fs.readFile(nopath, (err , html) => {
                    if(!err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(html);
                    }
                    else{
                    let text = "Something went wrong. Please contact webmaster@forgetable.ru";
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end(text);
                    }
            });
            }
            else {
                // Нашли файл, отдали, страница загружается.
                res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    });
    }
};
exports.define = define;