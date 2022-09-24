import { modalController } from '@ionic/vue';

export { useModalControls };

function useModalControls(
  startingBreakPoint: number,
  breakpointList: Array<number>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentProps?: { [key: string]: any },
  presenter?: HTMLElement
) {
  const initialBreakPoint = startingBreakPoint;
  const breakPoints = breakpointList;

  async function show() {
    const modal = await modalController.create({
      breakpoints: breakpointList,
      initialBreakpoint: startingBreakPoint,
      component: content,
      componentProps: contentProps,
      presentingElement: presenter
    });

    modal.present();
  }

  return {
    initialBreakPoint,
    breakPoints,
    show
  };
}
