class TopManger {
  private _masterId: number = 0;
  private _callBackId: number = 0;

  createMasterId() {
    return this._masterId++;
  }
  createCallBackId() {
    return this._callBackId++;
  }
}

const manger = new TopManger();
export { manger };
