const fs = require("fs");
const path = require("path");

const getUsers = () => {
    const filePath = path.join(__dirname, "../../data/users.json");    
    return fs.readFileSync(filePath, "utf8"); // Добавляем 'utf8', чтобы получить строку, а не Buffer
};

module.exports = getUsers;
