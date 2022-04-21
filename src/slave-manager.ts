import { manger } from './top-manger';
import { CallBack } from './call-back';
import { MasterManager } from './master-manger';

class SlaveManager {
  private _mapeventCallBack: Map<number, Map<String, CallBack['id']>>;

  constructor() {
    this._mapeventCallBack = new Map<number, Map<String, CallBack['id']>>();
  }

  subscribeFroEventSync(masterManager: MasterManager, eventName: String, callBack: (data?: any) => void): CallBack {
    const list = this._mapeventCallBack.get(masterManager.id);
    const tmpCallBack = new CallBack(callBack);

    if (list !== undefined && list !== null) {
      masterManager.subscribeForEventSync(eventName, tmpCallBack);
      list.set(eventName, tmpCallBack.id);
    } else {
      this._mapeventCallBack.set(masterManager.id, new Map<String, CallBack['id']>([[eventName, tmpCallBack.id]]));
    }
    return tmpCallBack;
  }

  async subscribeFroEvent(
    masterManager: MasterManager,
    eventName: String,
    callBack: (data?: any) => void,
  ): Promise<CallBack> {
    return this.subscribeFroEventSync(masterManager, eventName, callBack);
  }

  unSbscribeFromEventSync(masterManager: MasterManager, eventName: string, callBackId: CallBack | number) {
    masterManager.unSubscribeFromEventSync(eventName, callBackId);
  }

  async unSbscribeFromEvent(masterManager: MasterManager, eventName: string, callBackId: CallBack | number) {
    this.unSbscribeFromEventSync(masterManager, eventName, callBackId);
  }
}
