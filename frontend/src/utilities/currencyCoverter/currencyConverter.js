function currencyConverter (locales, currency, data) {
    const changer = new Intl.NumberFormat(locales, {
        style: "currency",
        currency
    })

    return changer.format(data);
}

export default currencyConverter;

export const testes = (...arr) => {
    const resp = arr.reduce((a, b) => {
        return a + b;
    }, 0)

    return resp;
}