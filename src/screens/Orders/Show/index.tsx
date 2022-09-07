import React, { useEffect } from 'react';
import OrdersShowStore from './store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.m.styl';

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const { id } = useParams<ShowParams>();

    useEffect(() => {
      state.loadOrder(id);
    }, []);

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
            <div>Number: {state.order?.number}</div>
            <div>Status: {state.order?.status}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default OrdersShow;
