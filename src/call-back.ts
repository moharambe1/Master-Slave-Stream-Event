import { manger } from './top-manger';

export class CallBack {
  private _id: number;
  private _run: (data?: any) => void;

  constructor(run: (data?: any) => void) {
    this._id = manger.createCallBackId();
    this._run = run;
  }

  get run() {
    return this._run;
  }

  get id() {
    return this._id;
  }
}
