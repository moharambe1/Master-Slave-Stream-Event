import { CallBack } from './call-back';
import { manger } from './top-manger';

export class MasterManager {
  private _subscribedCallBack: Map<String, Map<CallBack['id'], CallBack['run']>>;
  private _id: number;

  constructor() {
    this._id = manger.createMasterId();
    this._subscribedCallBack = new Map<String, Map<CallBack['id'], CallBack['run']>>();
  }
  //
  subscribeForEventSync(eventName: String, callback: CallBack) {
    let mapCallBack = this._subscribedCallBack.get(eventName);
    if (mapCallBack === undefined || mapCallBack === null)
      this._subscribedCallBack.set(eventName, new Map([[callback.id, callback.run]]));
    else mapCallBack.set(callback.id, callback.run);
  }

  async subscribeForEvent(eventName: String, callback: CallBack) {
    this.subscribeForEventSync(eventName, callback);
  }

  ///
  unSubscribeFromEventSync(eventName: String, callback: CallBack | number) {
    if (typeof callback === 'number') this._subscribedCallBack.get(eventName)?.delete(callback);
    else this._subscribedCallBack.get(eventName)?.delete(callback.id);
  }
  async unSubscribeFromEvent(eventName: String, callback: CallBack) {
    this.subscribeForEventSync(eventName, callback);
  }

  //
  clearEventSubscribedSync(eventName: String) {
    this._subscribedCallBack.delete(eventName);
  }

  async clearEventSubscibed(eventName: String) {
    this.clearEventSubscribedSync(eventName);
  }

  async emitEvent(eventName: String, data?: any) {
    let mapCallBack = this._subscribedCallBack.get(eventName);

    if (mapCallBack === undefined) return;

    for (const callBack of mapCallBack.values()) callBack(data);
  }

  get id() {
    return this._id;
  }

  // for esying the Testing only dont directly accest _subscribedCallBack variable
  get subscribedCallBackForTestOnly() {
    return this._subscribedCallBack;
  }
}
