export function useD3Alarm(props) {
  let ucl, lcl
  function createAlarmLimit(slots) {
    const thresholdSlots = slots.thresholds?.()
    if (thresholdSlots) {
      ucl = thresholdSlots.find((slot) => slot.props?.label?.includes('UCL'))?.props?.value
      lcl = thresholdSlots.find((slot) => slot.props?.label?.includes('LCL'))?.props?.value
      return { ucl, lcl }
    }
  }

  return {
    createAlarmLimit
  }
}
