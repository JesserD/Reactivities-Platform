import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useHistory } from 'react-router-dom';

const Navigator = () => {
    const history = useHistory();
    const { userStore } = useStore();
    const { navigate } = userStore;
    useEffect(() => {
        if (navigate)
            history.push(navigate);
    }, [navigate, history]);

    return (<></>);
};

export default observer(Navigator);