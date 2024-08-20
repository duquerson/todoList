import { filter } from "../../../const";
import { FilterValue } from "../../../types/type";
export const setFilter = () => {
    //read the url
    const params = new URLSearchParams(window.location.search);
    const getFilter = params.get('filter') as FilterValue | null;
    if (getFilter === null) return filter.ALL;
    return Object.values(filter).includes(getFilter) ? getFilter : filter.ALL;
};
