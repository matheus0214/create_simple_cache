const { cache } = require("../database");

const CreateCacheExist = async (key, datas_to_save) => {
    const datas = await cache.get(key);

    if(!datas) {
        await cache.set(key, JSON.stringify(datas_to_save));
    }
}

const GetDatasCache = async (key, datas_to_save) => {
    const datas = await cache.get(key);

    return JSON.parse(datas);
}

module.exports = { CreateCacheExist, GetDatasCache };