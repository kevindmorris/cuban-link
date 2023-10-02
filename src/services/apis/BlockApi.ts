import _BaseApi from "./_BaseApi";

export default class BlockApi {
  baseApi() {
    return new _BaseApi();
  }

  async getLatestBlock(): Promise<any> {
    let response = await this.baseApi().axios.get(
      `https://chain.api.btc.com/v3/block/latest`,
      {
        headers: {},
        params: {},
      }
    );

    return response.data;
  }

  async getBlock(hash: string): Promise<any> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/rawblock/${hash}`,
      {
        headers: {},
        params: {},
      }
    );

    return response.data;
  }
}
