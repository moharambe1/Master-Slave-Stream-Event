import { CallBack } from './call-back';
import { MasterManager } from './master-manger';

type pCallBacl = ((data?: any) => void) | CallBack;

export class SlaveManager {
  private _mapEventCallBack: Map<number, Map<String, CallBack['id']>>;

  constructor() {
    this._mapEventCallBack = new Map<number, Map<String, CallBack['id']>>();
  }

  subscribeFroEventSync(masterManager: MasterManager, eventName: String, callBack: pCallBacl): CallBack {
    const list = this._mapEventCallBack.get(masterManager.id);
    let tmpCallBack: CallBack;
    if (callBack instanceof CallBack) tmpCallBack = callBack;
    else tmpCallBack = new CallBack(callBack);

    if (list !== undefined && list !== null) {
      masterManager.subscribeForEventSync(eventName, tmpCallBack);
      list.set(eventName, tmpCallBack.id);
    } else {
      this._mapEventCallBack.set(masterManager.id, new Map<String, CallBack['id']>());
      this._mapEventCallBack.get(masterManager.id)?.set(eventName, tmpCallBack.id);
      masterManager.subscribeForEventSync(eventName, tmpCallBack);
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

  get mapEventCallBack() {
    return this._mapEventCallBack;
  }
}
