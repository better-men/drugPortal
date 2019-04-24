import axios from 'axios'

export const login = params => {
    return axios.post(`/blakk/login`, params)
}

export const listProductTypes = params => {
    return axios.get(`/blakk/productType/all`, {})
}

export const productCount = params => {
    return axios.get(`/blakk/product/count`, {})
}

export const selectProductTypeByName = params => {
    return axios.post(`/blakk/productType/selectProductTypeByName`, params)
}

export const selectProductTypeById = params => {
    return axios.post(`/blakk/productType/selectProductTypeById`, params)
}

export const updateProductType = params => {
    return axios.post(`/blakk/productType/updateProductType`, params)
}

export const deleteProductType = params => {
    return axios.post(`/blakk/productType/deleteProductType`, params)
}

export const insertProductType = params => {
    return axios.post(`/blakk/productType/insertProductType`, params)
}

export const listProduct = params => {
    return axios.get(`/blakk/product/list`, {})
}

export const selectProductByName = params => {
    return axios.post(`/blakk/product/selectByName`, params)
}

export const updateProduct = params => {
    return axios.post(`/blakk/product/updateProduct`, params)
}

export const insertProduct = params => {
    return axios.post(`/blakk/product/insertProduct`, params)
}

export const getProductByNameAndPtId = params => {
    return axios.post(`/blakk/product/getProductByNameAndPtId`, params)
}

export const listUser = params => {
    return axios.get(`/blakk/user/list`, {})
}

export const deleteUser = params => {
    return axios.post(`/blakk/user/delete`, params)
}

export const likeUserByAccount = params => {
    return axios.post(`/blakk/user/likeUserByAccount`, params)
}

export const insertUser = params => {
    return axios.post(`/blakk/user/insert`, params)
}

export const updateUser = params => {
    return axios.post(`/blakk/user/update`, params)
}

export const coverList  = params => {
    return axios.get(`/blakk/cover/list`, {})
}

export const selectByType = params => {
    return axios.post(`/blakk/cover/selectByType`, params)
}

export const insertCover  = params => {
    return axios.post(`/blakk/cover/insertCover`, params)
}

export const updateCover  = params => {
    return axios.post(`/blakk/cover/updateCover`, params)
}

export const deleteCover  = params => {
    return axios.post(`/blakk/cover/deleteCover`, params)
}

export const deleteProduct   = params => {
    return axios.post(`/blakk/product/deleteProduct`, params)
}