import React, { useEffect } from 'react';
import OrdersShowStore from './store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.m.styl';
import Item from './components/Item';
import Loader from '~/components/Loader';
import OrderStatus from '~/components/OrderStatus';
import DeliveryType from '~/components/DeliveryType';

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const { id } = useParams<ShowParams>();

    useEffect(() => {
      if (state.initialized) return;
      state.initialize(id);
    });

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          {state.loading && <Loader />}
          {!state.loading && (
            <>
              <div className={styles.title}>Order {state.order?.number}</div>

              <div className={styles.orderInfo}>
                <div>
                  Status: <OrderStatus code={state.order?.status ?? ''} />
                </div>
                <div>
                  Delivery code:{' '}
                  <DeliveryType code={state.order?.delivery.code ?? ''} />
                </div>
              </div>

              <div className={styles.items}>
                {state.order?.items.map((item) => (
                  <Item item={item} key={item.id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default OrdersShow;
