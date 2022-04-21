import { CallBack } from '../src/call-back';
import { MasterManager } from '../src/master-manger';

const eventName = 'Test';
const callBack: CallBack = {
  id: 1,
  run: () => 'function Called',
};

describe('test for subscribing for event', () => {
  let masterManager = new MasterManager();

  test('should create and init _subsctibedCallBack', () => {
    expect(masterManager).toBeDefined();
    expect(masterManager.subscribedCallBackForTestOnly).toBeDefined();
  });

  masterManager.subscribeForEventSync(eventName, callBack);
  test('should add event name to _subsctibedCallBack map', () => {
    expect(masterManager.subscribedCallBackForTestOnly.has(eventName)).toEqual(true);
  });

  test('should init Mapcallback and add callBack object to event map in _subsctibedCallBack ', () => {
    expect(masterManager.subscribedCallBackForTestOnly.get(eventName)).toBeDefined();
    expect(masterManager.subscribedCallBackForTestOnly.get(eventName)?.has(callBack.id)).toEqual(true);
  });

  test('should call run function in callBack object', () => {
    expect(masterManager.subscribedCallBackForTestOnly.get(eventName)?.get(callBack.id)!()).toBe('function Called');
  });
});

test(' unSubcribing from event should remove callBack form _subsctibedCallBack map', () => {
  let masterManager = new MasterManager();
  masterManager.subscribeForEventSync(eventName, callBack);
  masterManager.unSubscribeFromEventSync(eventName, callBack);
  expect(masterManager.subscribedCallBackForTestOnly.get(eventName)?.has(callBack.id)).toEqual(false);
});


test('clearEventSubscibed should remove  event',()=>{
  let masterManager = new MasterManager();
  masterManager.subscribeForEventSync(eventName, callBack);
  masterManager.clearEventSubscribedSync(eventName);
  expect(masterManager.subscribedCallBackForTestOnly.has(eventName)).toEqual(false);
});



test('emit event should call all subscribed',async ()=> {
  let masterManager = new MasterManager();
  
  let callBack1:CallBack= {
    id:1,
    run :jest.fn().mockImplementation(() => "a")
  };
  let callBack2:CallBack= {
    id:2,
    run :jest.fn().mockImplementation(() => "b")
  };
  
  masterManager.subscribeForEventSync(eventName,callBack1);
  masterManager.subscribeForEventSync(eventName,callBack2);

  await masterManager.emitEvent(eventName);
  expect(callBack1.run).toBeCalled();
  expect(callBack2.run).toBeCalled();
});
