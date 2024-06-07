import styles from './styles.module.scss';

const SearchRecipeComponent = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSettingsContainer}>
                <div className={styles.searchInputContainer}>
                    <input className={styles.searchInput} type={"search"} placeholder={'Введите название рецепта'}/>
                    <button className={styles.searchInputButton}>Найти</button>
                </div>
                <div className={styles.filtersMainContainer}>
                    <div className={styles.filtersContainer}>
                        <div>
                            <p className={styles.label}>Рейтинг</p>
                            <ul className={styles.inputNumberList}>
                                <li><input className={styles.inputNumber} type={"number"} placeholder={'от 1'} min={1}
                                           max={5}/></li>
                                <li><input className={styles.inputNumber} type={"number"} placeholder={'до 5'} min={1}
                                           max={5}/></li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.label}>Время приготовления в мин</p>
                            <ul className={styles.inputNumberList}>
                                <li><input className={styles.inputNumber} type={"number"} placeholder={'min'} min={0}/>
                                </li>
                                <li><input className={styles.inputNumber} type={"number"} placeholder={'max'} min={0}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className={styles.sortLabel}>Сортировать по:</p>
                        <ul className={styles.sortList}>
                            <li><input className={styles.sortOption} type={"radio"} name={'sort'} value={'rating'}
                            />Рейтингу
                            </li>
                            <li><input className={styles.sortOption} type={"radio"} name={'sort'} value={'time'}
                            />Времени приготовления
                            </li>
                            <li><input className={styles.sortOption} type={"radio"} name={'sort'} value={'date'}
                            />Дате публикации
                            </li>
                            <li><input className={styles.sortOption} type={"radio"} name={'sort'} value={'ingredients'}
                            />Количеству ингредиентов
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className={styles.sortLabel}>Результат поиска в порядке:</p>
                        <p><input className={styles.sortOption} type={"radio"} name={'order'} value={'ascending'}/>Возрастания
                        </p>
                        <p><input className={styles.sortOption} type={"radio"} name={'order'} value={'descending'}/>Убывания
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchRecipeComponent;