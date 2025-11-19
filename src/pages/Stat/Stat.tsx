import './Stat.css'
import {useExpensesList} from "../../hooks/expenses.hooks.ts";
import {useEffect} from "react";

function Stat() {
    const { expenses, getExpensesList } = useExpensesList()
    useEffect(() => {
        (async () => await getExpensesList())();
    }, [getExpensesList])
    console.log(expenses)
    return <h1>{expenses.items.length} around here ...</h1>
}

export default Stat
