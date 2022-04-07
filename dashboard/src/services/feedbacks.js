const defaultPagination = {
    limit: 5,
    offset: 0
}

export default (httpClient) => ({
    getAll: async ({ type, limit, offset } = defaultPagination) => {
        console.log("Getting all feedbacks...")
        const query = { limit, offset }
        if (type) {
            query.type = type
        }
        const response = await httpClient.get('/feedbacks', { params: query })

        return { data: response.data }
    },
    getSummary: async () => {
        const response = await httpClient.get('/feedbacks/summary')
        return { data: response.data }
    }
})