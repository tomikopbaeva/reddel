import "./Error.css";

function Error() {
    return (
    <div className="errors">
        <input type="text" placeholder="Имя" className="input error1" />
        <span className="error">Нужно заполнить</span>
        <input type="text" placeholder="Имя" className="input error1 error2"/>
        <span className="error">Проверьте заполнение. Формат: 1234@mail.ru</span>
        <div className="registration-checkbox">
            <input type="checkbox" className="custom-checkbox error" id="checkbox" name="checkbox" />
            <label for="checkbox">Я согласен с <a>&nbsp; Условиями и Правилами &nbsp;</a> Reddell</label>
        </div>
    </div>
  );
}

export default Error;
