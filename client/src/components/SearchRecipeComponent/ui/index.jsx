import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import RecipesCardsComponent from "../../recipesCardsComponent";
import {useLocation} from "react-router-dom";

const SearchRecipeComponent = ({isAuthorized}) => {
    const customQuery = new URLSearchParams(useLocation().search);
    const [key, setKey] = useState(0); // Чтобы при изменении ключа перерендерился компонент с карточками, костыли (но этот компонент уже часть корабля)
    const [queryForm, setQueryForm] = useState(
        {
            name: customQuery.get('name') ? customQuery.get('name') : null,
            category: null,
            minRating: null,
            maxRating: null,
            minCookingTimeInMinutes: null,
            maxCookingTimeInMinutes: null,
            sort: 2, // По дате публикации
            orderByDescending: false,
            page: 1,
            count: 5
        }) // Форма фильтров для поиска
    const [completedQuery, setCompletedQuery] = useState(queryForm);

    const findSubmitHandle = () => {
        setCompletedQuery(queryForm);
        setKey(key + 1); // По сути гениально и грустно одновременно(
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSettingsContainer}>
                <div className={styles.searchInputContainer}>
                    <input className={styles.searchInput}
                           type={"search"}
                           placeholder={'Введите название рецепта'}
                           value={queryForm.name ? queryForm.name : ""}
                           onInput={(e) => setQueryForm({...queryForm, name: e.target.value})}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') findSubmitHandle();
                           }}
                    />
                    <button className={styles.searchInputButton} onClick={findSubmitHandle}>Найти</button>
                </div>
                <div className={styles.filtersMainContainer}>
                    <div className={styles.filtersContainer}>
                        <div>
                            <p className={styles.label}>Рейтинг</p>
                            <ul className={styles.inputNumberList}>
                                <li><input className={styles.inputNumber}
                                           type={"text"}
                                           placeholder={'от 1'}
                                           value={queryForm.minRating ? queryForm.minRating : ""}
                                           onInput={(e) => {
                                               const value = e.target.value;
                                               if (value === "" || (!isNaN(value) && value <= 5 && value >= 1))
                                                   setQueryForm({...queryForm, minRating: Number(value)})
                                           }}
                                /></li>
                                <li><input
                                    className={styles.inputNumber}
                                    type={"text"}
                                    placeholder={'до 5'}
                                    value={queryForm.maxRating ? queryForm.maxRating : ""}
                                    onInput={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || (!isNaN(value) && value <= 5 && value >= 1))
                                            if (Number(value) === 0) setQueryForm({...queryForm, maxRating: null})
                                            else setQueryForm({...queryForm, maxRating: Number(value)})
                                    }}
                                /></li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.label}>Время приготовления в мин</p>
                            <ul className={styles.inputNumberList}>
                                <li><input
                                    className={styles.inputNumber}
                                    type={"text"}
                                    placeholder={'min'}
                                    value={queryForm.minCookingTimeInMinutes ? queryForm.minCookingTimeInMinutes : ""}
                                    onInput={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || (!isNaN(value) && value >= 0))
                                            setQueryForm({...queryForm, minCookingTimeInMinutes: Number(value)})
                                    }}
                                />
                                </li>
                                <li><input
                                    className={styles.inputNumber}
                                    type={"text"}
                                    placeholder={'max'}
                                    value={queryForm.maxCookingTimeInMinutes ? queryForm.maxCookingTimeInMinutes : ""}
                                    onInput={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || (!isNaN(value) && value >= 0))
                                            if (Number(value) === 0) setQueryForm({
                                                ...queryForm,
                                                maxCookingTimeInMinutes: null
                                            })
                                            else setQueryForm({...queryForm, maxCookingTimeInMinutes: Number(value)})
                                    }}
                                />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className={styles.sortLabel}>Сортировать по:</p>
                        <ul className={styles.sortList}>
                            <li><input
                                className={styles.sortOption}
                                type={"radio"}
                                name={'sort'}
                                value={'rating'}
                                checked={queryForm.sort === 0}
                                onChange={() => setQueryForm({...queryForm, sort: 0})}
                            />Рейтингу
                            </li>
                            <li><input
                                className={styles.sortOption}
                                type={"radio"}
                                name={'sort'}
                                value={'time'}
                                checked={queryForm.sort === 1}
                                onChange={() => setQueryForm({...queryForm, sort: 1})}
                            />Времени приготовления
                            </li>
                            <li><input
                                className={styles.sortOption}
                                type={"radio"}
                                name={'sort'}
                                value={'date'}
                                checked={2 === queryForm.sort}
                                onChange={() => setQueryForm({...queryForm, sort: 2})}
                            />Дате публикации
                            </li>
                            <li><input
                                className={styles.sortOption}
                                type={"radio"}
                                name={'sort'}
                                value={'ingredients'}
                                checked={queryForm.sort === 3}
                                onChange={() => setQueryForm({...queryForm, sort: 3})}
                            />Количеству ингредиентов
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className={styles.sortLabel}>Результат поиска в порядке:</p>
                        <p><input
                            className={styles.sortOption}
                            type={"radio"}
                            name={'order'}
                            value={'ascending'}
                            checked={!queryForm.orderByDescending}
                            onChange={() => setQueryForm({...queryForm, orderByDescending: false})}
                        />Возрастания
                        </p>
                        <p><input
                            className={styles.sortOption}
                            type={"radio"}
                            name={'order'}
                            value={'descending'}
                            checked={queryForm.orderByDescending}
                            onChange={() => setQueryForm({...queryForm, orderByDescending: true})}
                        />Убывания
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.recipesContainer}>
                <RecipesCardsComponent
                    isSearch={true}
                    querySearch={completedQuery}
                    key={key}
                    isAuthorized={isAuthorized}
                    isPortfolio={true}
                />
            </div>
        </div>
    )
}

export default SearchRecipeComponent;