import s from './Navbar.module.css';
import Menu from "./Menu/Menu";

const Navbar = () => {
    return (
        <div className={s.container}>
            <Menu/>
        </div>
    )
}

export default Navbar;

