const SearchRecipesRequestApi = async (query) => {
    let url = '/api/v1/recipe/search?';
    if (query.name) url += `name=${query.name}&`
    if (query.category) url += `category=${query.category}&`
    if (query.minRating) url += `minRating=${query.minRating}&`
    if (query.maxRating) url += `maxRating=${query.maxRating}&`
    if (query.minCookingTimeInMinutes) url += `minCookingTimeInMinutes=${query.minCookingTimeInMinutes}&`
    if (query.maxCookingTimeInMinutes) url += `maxCookingTimeInMinutes=${query.maxCookingTimeInMinutes}&`
    if (query.sort) url += `sort=${query.sort}&`
    if (query.orderByDescending) url += `orderByDescending=${query.orderByDescending}&`
    if (query.page) url += `page=${query.page}&`
    if (query.count) url += `count=${query.count}&`

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default SearchRecipesRequestApi;