import React from "react";
import { Api } from "../../../services/Api";
import moment from "moment";

export default function LandingPage() {
  const api = new Api();
  const date = moment().valueOf();

  React.useEffect(() => {
    // (async () => {
    //   try {
    //     console.log(date);
    //     const response = await api.getBlocksByDate(date);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  }, [date]);
  return <div>LandingPage</div>;
}
