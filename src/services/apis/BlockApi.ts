import _BaseApi from "./_BaseApi";

export default class BlockApi {
  baseApi() {
    return new _BaseApi();
  }

  async getLatestBlock(): Promise<any> {
    let response = await this.baseApi().axios.get(
      `https://blockchain.info/q/getblockcount`,
      {}
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
