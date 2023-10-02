import _BaseApi from "./_BaseApi";

export default class BlockApi {
  baseApi() {
    return new _BaseApi();
  }

  async getBlocksByDate(date: number): Promise<any> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/blocks/${date}?format=json`,
      { headers: { "Access-Control-Allow-Origin": "http://localhost:3000" } }
    );

    return response.data;
  }
}
