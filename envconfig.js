const isProduction = !!process.env.NODE_ENV;
const env = {
    folderId: isProduction ? process.env.FOLDER_ID : '1B_Qfjlz8KayC5R5bmL_nd3NehFwKaUnb',
    database: isProduction ? process.env.DATABASE : "mongodb+srv://dbuser:dd123@cluster0.hvpaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
module.exports = env;