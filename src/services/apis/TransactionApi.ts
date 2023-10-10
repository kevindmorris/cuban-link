import { TransactionObject } from "../../common/types";
import _BaseApi from "./_BaseApi";

export default class TransactionApi {
  baseApi() {
    return new _BaseApi();
  }

  async getTransaction(id: string): Promise<TransactionObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/rawtx/${id}`,
      {
        headers: {},
        params: {},
      }
    );

    return response.data;
  }
}
