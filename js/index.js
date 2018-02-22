// server.js
const http = require('http');
const routing = require('./routing');


let server = new http.Server(function(req, res) {
    // API ������� ����� ��������� ������ POST-������� � ������ JSON, ��� ��� ����������
    // ��� ���� ���������� ���������� � ���������� jsonString
    var jsonString = '';
    res.setHeader('Content-Type', 'application/json');
    req.on('data', (data) => { // ������ ���������� - ��������.
        jsonString += data;
});

    req.on('end', () => {// ���������� ������ ��� - ������� � ������.
        routing.define(req, res, jsonString); // ������� define �� ��� �� �������.
});
});
server.listen(8000, 'localhost');