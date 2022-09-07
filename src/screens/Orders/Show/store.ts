import { makeAutoObservable } from 'mobx';
import { SingleOrder } from '~/screens/Orders/Show/types';
import client from '~/api/gql';
import { ORDER_QUERY } from './queries';

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  loading: boolean = false;
  initialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setId(id: string) {
    this.id = id;
  }

  setOrder(order: SingleOrder) {
    this.order = order;
  }

  async loadOrder(id: string) {
    this.loading = true;
    try {
      await client
        .query(ORDER_QUERY, { number: id })
        .toPromise()
        .then((result) => {
          this.setId(result.data.order.number);
          this.setOrder(result.data.order);
        });
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  initialize(id: string) {
    if (this.initialized) return;
    this.initialized = true;
    this.loadOrder(id);
  }
}
