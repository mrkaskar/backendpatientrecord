const restructure = (arr) => {
    arr = JSON.parse(JSON.stringify(arr));
    return arr.map(dbObj => {
      dbObj.id = dbObj._id;
      delete dbObj._id;
      delete dbObj.__v;

    return dbObj;
    })
}

module.exports = restructure;