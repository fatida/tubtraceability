export interface IIMM {
    uniqueid: number;
    imm: string;
    date: string;
    datamatrix: string;
    meta: {
      [key: string]: {
        [key: string]: string;
      };
    };
    data: {
      [key: string]: {
        [key: string]: any;
      };
    };
  }


  export interface IMessage {
    seq: number;
    vals: {
        id: string;
        qc: number;
        ts: string;
        val: boolean | string | number;
    }[];
};
