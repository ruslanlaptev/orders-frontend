import React, { useEffect } from 'react';
import styles from './styles.m.styl';
import { map } from 'lodash';
import { observer } from 'mobx-react-lite';
import OrdersListState from './store';
import { OrdersListItem } from './types';
import usePage from './hooks/usePage';
import Button from '../../../components/Button';
import AngleLeftIcon from '../../../assets/icons/angle-left-solid.svg';
import AngleRightIcon from '~/assets/icons/angle-right-solid.svg';
import ListItem from './components/ListItem';
import Loader from '~/components/Loader';

const OrdersList = observer(
  (): JSX.Element => {
    const page = usePage();
    const [state] = React.useState(new OrdersListState(page));

    useEffect(() => {
      if (state.initialized) return;
      state.initialize();
    });

    return (
      <React.Fragment>
        <div className={styles.screenWrapper}>
          <div className={styles.screen}>
            {state.loading && <Loader />}
            {!state.loading && (
              <div className={styles.table}>
                <div className={styles.head}>
                  <div className={styles.row}>
                    <div className={styles.headCell}>Номер</div>
                    <div className={styles.headCell}>Создан</div>
                    <div className={styles.headCell}>Доставка</div>
                    <div className={styles.headCell}>В работе</div>
                    <div className={styles.headCell}>Статус</div>
                  </div>
                </div>
                <div>
                  {map(state.orders, (order: OrdersListItem, index: number) => (
                    <ListItem order={order} key={index} />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.pagination}>
              <Button
                small
                text='PREV'
                icon={AngleLeftIcon}
                resting
                disabled={!state.canPrev}
                onClick={() => state.prevPage()}
              />
              <Button
                small
                text='NEXT'
                rightIcon={AngleRightIcon}
                resting
                disabled={!state.canNext}
                onClick={() => state.nextPage()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default OrdersList;
