import { AddressObject } from "../../common/types";
import _BaseApi from "./_BaseApi";

export default class AddressApi {
  baseApi() {
    return new _BaseApi();
  }

  async getAddress(hash: string): Promise<AddressObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/rawaddr/${hash}`,
      {
        headers: {},
        params: {},
      }
    );

    return response.data;
  }
}
