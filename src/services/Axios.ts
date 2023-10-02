import axios, { AxiosRequestConfig } from "axios";

export default class Axios {
  _axios;

  constructor() {
    this._axios = axios.create({});
  }

  get(a0: string, a1: AxiosRequestConfig<any> | undefined) {
    return this._axios.get(a0, a1);
  }
}
