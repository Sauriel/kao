import mitt from 'mitt';
import { DirectoryViewDialogPayload } from '~/shared/models/emitter';

declare type BusEvent = {
  'directory:open': DirectoryViewDialogPayload;
};

const emitter = mitt<BusEvent>();

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bus: {
        on: emitter.on,
        emit: emitter.emit,
      }
    }
  }
});