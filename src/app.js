const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
    // Правильная проверка маршрута
    if (request.method === "GET" && request.url === "/users") {
        try {
            const data = getUsers();
            // 🔧 Правильная установка статуса и заголовков
            response.statusCode = 200;
            response.setHeader(
                "Content-Type",
                "application/json; charset=utf-8",
            );
            response.end(data);
        } catch (err) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Ошибка: " + err.message);
        }
        return;
    }

    // Дефолтный ответ
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Hello, World!");
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Сервер запущен: http://127.0.0.1:3000");
});
