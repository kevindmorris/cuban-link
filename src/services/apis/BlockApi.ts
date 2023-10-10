import _BaseApi from "./_BaseApi";

export default class BlockApi {
  baseApi() {
    return new _BaseApi();
  }

  async getLatestBlock(): Promise<any> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/rawblock/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f `,
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
