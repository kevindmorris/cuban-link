export interface TransactionObject {
  hash: string;
  tx_index: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  time: number;
  lock_time: string;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  block_height: number;
  block_index: number;
  double_spend: boolean;
  inputs: Array<{
    sequence: number;
    witness: string;
    script: string;
    index: number;
    prev_out: {
      n: number;
      addr: string;
      script: string;
      spent: boolean;
      tx_index: number;
      type: number;
      value: number;
      spending_outputs: Array<{ n: number; tx_index: number }>;
    };
  }>;
  out: Array<{
    value: number;
    addr: string;
    script: string;
    tx_index: number;
    spending_outputs: Array<{ n: number; tx_index: number }>;
    n: number;
    spent: boolean;
    type: number;
  }>;
}

export interface AddressObject {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: Array<TransactionObject>;
}

export interface BlockObject {
  hash: string;
  ver: number;
  mrkl_root: string;
  time: number;
  bits: number;
  prev_block?: string;
  next_block?: string[];
  nonce: number;
  n_tx: number;
  size: number;
  block_index: number;
  main_chain: boolean;
  height: number;
  received_time: number;
  relayed_by: string;
  tx: Array<TransactionObject>;
}
