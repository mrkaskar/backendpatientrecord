const isProduction = !!process.env.NODE_ENV;
const env = {
    folderId: isProduction ? process.env.FOLDER_ID : "",
    database: isProduction ? process.env.DATABASE : ""
}
module.exports = env;
