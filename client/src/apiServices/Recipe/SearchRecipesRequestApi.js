const SearchRecipesRequestApi = async (query) => {
    let url = '/api/v1/recipe/search?';
    if (query.name != null) url += `name=${query.name}&`
    if (query.category != null) url += `category=${query.category}&`
    if (query.minRating != null) url += `minRating=${query.minRating}&`
    if (query.maxRating != null) url += `maxRating=${query.maxRating}&`
    if (query.minCookingTimeInMinutes != null) url += `minCookingTimeInMinutes=${query.minCookingTimeInMinutes}&`
    if (query.maxCookingTimeInMinutes != null) url += `maxCookingTimeInMinutes=${query.maxCookingTimeInMinutes}&`
    if (query.sort != null) url += `sort=${query.sort}&`
    if (query.orderByDescending != null) url += `orderByDescending=${query.orderByDescending}&`
    if (query.page != null) url += `page=${query.page}&`
    if (query.count != null) url += `count=${query.count}&`

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default SearchRecipesRequestApi;