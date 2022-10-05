import s from './Messages.module.css';


const Message = (props) => {
    return (
        <div className={s.container}>
            <div className={s.bodyMessage}>
                <div className={`${s.message} ${s.messageLeft}`}>{props.message}</div>
            </div>
            {/*<div className={s.bodyMessage}>
                <div className={`${s.message} ${s.messageRight}`}>{props.message}</div>
            </div>*/}
        </div>
    )
}

export default Message;
