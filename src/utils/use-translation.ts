import { useIntl } from "react-intl";

export default function useTranslation(){

    const { formatMessage } = useIntl();

    return {
        t: (id, defaultMessage = null) => formatMessage({ id, defaultMessage })
    }
}