/* eslint-disable @typescript-eslint/no-explicit-any */
import { modalController } from '@ionic/vue';

export { useModalControls };

type modalConfig = {
  startingBreakPoint?: number;
  breakpointList?: number[];
  content: any;
  contentProps?: { [key: string]: any };
  presentingElement?: HTMLElement;
};

function useModalControls(config: modalConfig) {
  const initialBreakPoint = config.startingBreakPoint;
  const breakPoints = config.breakpointList;

  async function show() {
    const modal = await modalController.create({
      breakpoints: config.breakpointList,
      initialBreakpoint: config.startingBreakPoint,
      component: config.content,
      componentProps: config.contentProps,
      presentingElement: config.presentingElement
    });

    modal.present();
  }

  return {
    initialBreakPoint,
    breakPoints,
    show
  };
}
