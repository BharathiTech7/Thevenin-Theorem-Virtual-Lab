export const calculateReadings = ({ voltage, r1, r2, r3 }) => {
  const parallel = (r2 * r3) / (r2 + r3)
  const totalResistance = r1 + parallel
  const i1 = totalResistance > 0 ? voltage / totalResistance : 0
  const branchVoltage = i1 * parallel
  const i2 = r2 > 0 ? branchVoltage / r2 : 0
  const i3 = r3 > 0 ? branchVoltage / r3 : 0

  return {
    i1,
    i2,
    i3,
  }
}
