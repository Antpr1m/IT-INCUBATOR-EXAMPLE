import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog}>
            <div className={s.avatar}></div>
            <NavLink to={path} className={navData => navData.isActive ? s.active : s.item}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;