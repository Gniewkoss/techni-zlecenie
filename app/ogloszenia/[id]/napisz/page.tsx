const napiszPage = () => {
    return (
        <div>
            <h1>Napisz wiadomość</h1>
            <form>
                <div>
                    <label>Treść wiadomości:</label>
                    <textarea required />
                </div>
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
}
 
export default napiszPage;