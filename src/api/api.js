import axios from 'axios'

export const login = params => {
    return axios.post(`/drug/login`, params)
}

export const listProductTypes = params => {
    return axios.get(`/drug/productType/all`, {})
}

export const productCount = params => {
    return axios.get(`/drug/product/count`, {})
}

export const selectProductTypeByName = params => {
    return axios.post(`/drug/productType/selectProductTypeByName`, params)
}

export const selectProductTypeById = params => {
    return axios.post(`/drug/productType/selectProductTypeById`, params)
}

export const updateProductType = params => {
    return axios.post(`/drug/productType/updateProductType`, params)
}

export const deleteProductType = params => {
    return axios.post(`/drug/productType/deleteProductType`, params)
}

export const insertProductType = params => {
    return axios.post(`/drug/productType/insertProductType`, params)
}

export const listProduct = params => {
    return axios.get(`/drug/product/list`, {})
}

export const selectProductByName = params => {
    return axios.post(`/drug/product/selectByName`, params)
}

export const updateProduct = params => {
    return axios.post(`/drug/product/updateProduct`, params)
}

export const insertProduct = params => {
    return axios.post(`/drug/product/insertProduct`, params)
}

export const getProductByNameAndPtId = params => {
    return axios.post(`/drug/product/getProductByNameAndPtId`, params)
}

export const listUser = params => {
    return axios.get(`/drug/user/list`, {})
}

export const deleteUser = params => {
    return axios.post(`/drug/user/delete`, params)
}

export const likeUserByAccount = params => {
    return axios.post(`/drug/user/likeUserByAccount`, params)
}

export const insertUser = params => {
    return axios.post(`/drug/user/insert`, params)
}

export const updateUser = params => {
    return axios.post(`/drug/user/update`, params)
}

export const coverList = params => {
    return axios.get(`/drug/cover/list`, {})
}

export const selectByType = params => {
    return axios.post(`/drug/cover/selectByType`, params)
}

export const insertCover = params => {
    return axios.post(`/drug/cover/insertCover`, params)
}

export const updateCover = params => {
    return axios.post(`/drug/cover/updateCover`, params)
}

export const deleteCover = params => {
    return axios.post(`/drug/cover/deleteCover`, params)
}

export const deleteProduct = params => {
    return axios.post(`/drug/product/deleteProduct`, params)
}

export const updateAuthority = params => {
    return axios.post(`/drug/role/update`, params)
}

export const insertClass = params => {
    return axios.post(`/drug/repertory/insertClass`, params)
}

export const allClass = params => {
    return axios.get(`/drug/repertory/allClass`)
}

export const allBound = params => {
    return axios.get(`/drug/repertory/all`)
}

export const allInBound = params => {
    return axios.get(`/drug/bound/allInBound`)
}

export const inBound = params => {
    return axios.post(`/drug/bound/inBound`, params)
}

export const allOutBound = params => {
    return axios.get(`/drug/bound/allOutBound`)
}

export const outBound = params => {
    return axios.post(`/drug/bound/outBound`, params)
}
