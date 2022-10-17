import style from "./Paginator.module.css";
import React, { FC, useState } from "react";
import cn from "classnames";


type PropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	portionSize?: number
}

const Paginator: FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

	//количество страниц
	let pagesCount = Math.ceil(totalItemsCount / pageSize);
	let pages: Array<number> = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
		// if (i === 20) break;
	}

	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1)
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1	//левая граница порции
	let rightPortionPageNumber = portionNumber * portionSize				//правая граница порции

	return <div className={style.usersPagination}>

		{
			portionNumber > 1 &&
			<button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
		}

		{
			pages
				.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
				.map(p => {
					return <span className={cn({
						[style.selectedPage]: currentPage === p
					}, style.pageNumber)}
						key={p}
						onClick={(e) => {
							onPageChanged(p)
						}}>{p}</span>
				})}
		{
			portionCount > portionNumber &&
			<button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
		}
	</div>

}

export default Paginator;