import axios from 'axios'

export const login = params => {
    return axios.post(`http://39.108.82.48/blakk/login`, params)
}

export const listProductTypes = params => {
    return axios.get(`http://39.108.82.48/blakk/productType/all`, {})
}

export const productCount = params => {
    return axios.get(`http://39.108.82.48/blakk/product/count`, {})
}

export const selectProductTypeByName = params => {
    return axios.post(`http://39.108.82.48/blakk/productType/selectProductTypeByName`, params)
}

export const selectProductTypeById = params => {
    return axios.post(`http://39.108.82.48/blakk/productType/selectProductTypeById`, params)
}

export const updateProductType = params => {
    return axios.post(`http://39.108.82.48/blakk/productType/updateProductType`, params)
}

export const deleteProductType = params => {
    return axios.post(`http://39.108.82.48/blakk/productType/deleteProductType`, params)
}

export const insertProductType = params => {
    return axios.post(`http://39.108.82.48/blakk/productType/insertProductType`, params)
}

export const listProduct = params => {
    return axios.get(`http://39.108.82.48/blakk/product/list`, {})
}

export const selectProductByName = params => {
    return axios.post(`http://39.108.82.48/blakk/product/selectByName`, params)
}

export const updateProduct = params => {
    return axios.post(`http://39.108.82.48/blakk/product/updateProduct`, params)
}

export const insertProduct = params => {
    return axios.post(`http://39.108.82.48/blakk/product/insertProduct`, params)
}

export const getProductByNameAndPtId = params => {
    return axios.post(`http://39.108.82.48/blakk/product/getProductByNameAndPtId`, params)
}

export const listUser = params => {
    return axios.get(`http://39.108.82.48/blakk/user/list`, {})
}

export const deleteUser = params => {
    return axios.post(`http://39.108.82.48/blakk/user/delete`, params)
}

export const likeUserByAccount = params => {
    return axios.post(`http://39.108.82.48/blakk/user/likeUserByAccount`, params)
}

export const insertUser = params => {
    return axios.post(`http://39.108.82.48/blakk/user/insert`, params)
}

export const updateUser = params => {
    return axios.post(`http://39.108.82.48/blakk/user/update`, params)
}

export const coverList  = params => {
    return axios.get(`http://39.108.82.48/blakk/cover/list`, {})
}

export const selectByType = params => {
    return axios.post(`http://39.108.82.48/blakk/cover/selectByType`, params)
}

export const insertCover  = params => {
    return axios.post(`http://39.108.82.48/blakk/cover/insertCover`, params)
}

export const updateCover  = params => {
    return axios.post(`http://39.108.82.48/blakk/cover/updateCover`, params)
}

export const deleteCover  = params => {
    return axios.post(`http://39.108.82.48/blakk/cover/deleteCover`, params)
}

export const deleteProduct   = params => {
    return axios.post(`http://39.108.82.48/blakk/product/deleteProduct`, params)
}
