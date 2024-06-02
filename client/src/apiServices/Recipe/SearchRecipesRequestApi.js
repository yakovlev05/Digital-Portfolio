const SearchRecipesRequestApi = async ({
                                           name = null,
                                           category = null,
                                           minRating = null,
                                           maxRating = null,
                                           minCookingTimeInMinutes = null,
                                           maxCookingTimeInMinutes = null,
                                           sort = null,
                                           orderByDescending = null,
                                           page = null,
                                           count = null
                                       }
) => {
    let url = '/api/v1/recipe/search?';
    if (name) url += `name=${name}&`;
    if (category) url += `category=${category}&`;
    if (minRating) url += `minRating=${minRating}&`;
    if (maxRating) url += `maxRating=${maxRating}&`;
    if (minCookingTimeInMinutes) url += `minCookingTimeInMinutes=${minCookingTimeInMinutes}&`;
    if (maxCookingTimeInMinutes) url += `maxCookingTimeInMinutes=${maxCookingTimeInMinutes}&`;
    if (sort) url += `sort=${sort}&`;
    if (orderByDescending) url += `orderByDescending=${orderByDescending}&`;
    if (page) url += `page=${page}&`;
    if (count) url += `count=${count}&`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default SearchRecipesRequestApi;