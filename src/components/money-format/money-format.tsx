import {CURRENCY} from "../../utils/constant";

const MoneyFormat = ({ value, currencyPosition = 'start' }) => {
    return (
        <>
            { currencyPosition == 'start' && CURRENCY }
            <span style={{letterSpacing: '.1rem', marginLeft: '2px', marginRight: '2px'}}>
                { Number.parseFloat(value || 0).toFixed(2) }
            </span >
            { currencyPosition == 'end' && CURRENCY }
        </>

    )
};

export default MoneyFormat;
