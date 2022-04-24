import { CallBack } from '../src/call-back';
import { MasterManager } from '../src/master-manger';
import { SlaveManager } from '../src/slave-manager';

const callBack = new CallBack(() => 'TEST');
const eventName = 'Test';

let masterManger = new MasterManager();

let slaveManger = new SlaveManager();

beforeEach(() => {
  slaveManger = new SlaveManager();
});
describe('testing for subscribeFroEventSync', () => {
  it('should add callback id to _subscribedCallBack', () => {
    slaveManger.subscribeFroEventSync(masterManger, eventName, callBack);

    expect(masterManger.id).toBeDefined();
    expect(slaveManger.mapEventCallBack.get(masterManger.id)).toBeDefined();
    expect(slaveManger.mapEventCallBack.get(masterManger.id)?.get(eventName)).toEqual(callBack.id);
  });

  it('should subscribeFroEventSync call MasterManager.subscribeForEventSync', () => {
    masterManger.subscribeForEventSync = jest.fn().mockImplementation();
    slaveManger.subscribeFroEventSync(masterManger, eventName, callBack);

    expect(masterManger.subscribeForEventSync).toBeCalled();
  });
});
