import { InputBase, inputBaseClasses, styled } from "@mui/material";
import React from "react";
import { Api } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [q, setQ] = React.useState<string>("");

  const api = new Api();

  const search = async (searchValue: string) => {
    try {
      const transaction = await api.getTransaction(searchValue);
      navigate(`/transaction/${transaction.hash}`);
      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
    try {
      const address = await api.getAddress(searchValue);
      navigate(`/address/${address.hash160}`);
      console.log(address);
    } catch (err) {
      console.log(err);
    }
    try {
      const block = await api.getBlock(searchValue);
      navigate(`/block/${block.hash}`);
      console.log(block);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchInput
      fullWidth
      placeholder="Search..."
      value={q}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setQ(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.code === "Enter") search(q);
      }}
    />
  );
}

const SearchInput = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(0.25, 1),
  color: theme.palette.text.secondary,
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(0.5),
  [`& .${inputBaseClasses.input}`]: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
