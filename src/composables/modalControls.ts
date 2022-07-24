import { ref } from 'vue';

export function useModalControls(
  startingBreakPoint: number,
  breakpointList: Array<number>
) {
  const isOpen = ref(false);
  const initialBreakPoint = startingBreakPoint;
  const breakPoints = breakpointList;

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return {
    isOpen,
    initialBreakPoint,
    breakPoints,
    toggle
  };
}
