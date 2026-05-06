const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
    // Парсим URL и query-параметры
    const parsedUrl = url.parse(request.url, true);
    const query = parsedUrl.query;

    // 1. ?users — возвращаем JSON из файла
    if ("users" in query) {
        try {
            const data = getUsers();
            response.statusCode = 200;
            response.setHeader(
                "Content-Type",
                "application/json; charset=utf-8",
            );
            response.end(data);
        } catch {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.end();
        }
        return;
    }

    // 2. ?hello=<name>
    if ("hello" in query) {
        if (query.hello === "") {
            // Параметр есть, но имя не передано
            response.statusCode = 400;
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.end("Enter a name");
        } else {
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.end(`Hello ${query.hello}.`);
        }
        return;
    }

    // 3. Никаких параметров → "Hello, World!"
    if (Object.keys(query).length === 0) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.end("Hello world");
        return;
    }

    // 4. Любые другие параметры → пустой ответ, 500
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end();
});

server.listen(PORT, HOST, () => {
    console.log(`✅ Сервер запущен: http://${HOST}:${PORT}`);
});
