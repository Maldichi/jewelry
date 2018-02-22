// /routing/index.js
// ��� ������ ��������� �����������.
const url = require('url');
const fs = require('fs');

const define = function(req, res, postData) {
    // ������ �������� ��� �����. ���� �� ��������� �� localhost:3000/test, �� path ����� '/test'
    const urlParsed = url.parse(req.url, true);
    let path = urlParsed.pathname;

    // ������ ���������� ������ ���� � server.js. ��� ��� �������� �����, ��� ��� ������ �����
    // ������ � systemd, � ����, � ������� �� ����� ������, ����� /etc/systemd/system/...
    prePath = __dirname;
    try {
        // ����� �� �������� ���������� ������ �� ������. ���� �� ��������� ��
        // localhost:8000/api, �� ������ ��� �� ���� /routing/dynamic/api, �, ���� ������� ���
        // index.js, ����� ���. � ����, ��� ������������ ��� try/catch �� ������� ���������, � �����
        // ��������� ����� fs.readFile, �� ���� � ��� �� ����������� ������, ������� � ��������
        // �� �� ��������.
        let dynPath = './dynamic/' + path;
        let routeDestination = require(dynPath);
        res.end('We have API!');
    }
        // /routing/index.js: ���� catch
    catch (err) {
        // ������� ��� ���� � ������������ ����� � �������� ��� ���������.
        // ���� �� �� ������, ��� ��� �� '=>', ����� ���������� ��� ���������� ������� � es6,
        // ����� ������ �����.
        let filePath = prePath+'/static'+path+'/index.html';
        fs.readFile(filePath, 'utf-8', (err, html) => {
            // ���� �� ������� ����, �������� ��������� ���� �������� 404 � ������ �.
            // ���� ������� � �����, ����� ������ � ���������� ��� �� ��� ����-�������.
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
                // ����� ����, ������, �������� �����������.
                res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    });
    }
};
exports.define = define;