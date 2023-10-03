import { TransactionObject } from "../../common/types";
import _BaseApi from "./_BaseApi";

export default class TransactionApi {
  baseApi() {
    return new _BaseApi();
  }

  async getTransaction(hash: string): Promise<TransactionObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/rawtx/${hash}`,
      {
        headers: {},
        params: {},
      }
    );

    return response.data;
  }
}
