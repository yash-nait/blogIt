import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const insertPage = payload => api.post(`/blog`, payload)
export const getAllPages = () => api.get(`/pages`)
export const getBlogById = id => api.get(`blog/${id}`)
export const updateBlogById = (id, payload) => api.put(`/blog/${id}`, payload)

const apis = {
    insertPage,
    getAllPages,
    getBlogById,
    updateBlogById
}

export default apis