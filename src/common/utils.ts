import moment from "moment";
import { enqueueSnackbar } from "notistack";

export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    enqueueSnackbar("Successfully copied to clipboard.", {
      variant: "success",
    });
  } catch (error) {
    console.log(error);
    enqueueSnackbar("Unsuccessfully copied to clipboard.", {
      variant: "error",
    });
  }
};

export const formatAmount = (amount?: number) =>
  amount?.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 10,
    maximumFractionDigits: 10,
  });

export const formatDate = (date?: number) =>
  moment(date ? date * 1000 : 0).format("MM/DD/yyyy, hh:mm:ss");

export const formatHash = (hash: string) =>
  hash.slice(0, 5) + "-" + hash.slice(-5);
