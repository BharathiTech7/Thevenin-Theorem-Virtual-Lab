export const ALERT_AUDIO_PLACEHOLDER = '#'

const alertAudioModules = import.meta.glob('../audios/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

const getAlertAudio = (fileName) =>
  alertAudioModules[`../audios/${fileName}`] ?? ALERT_AUDIO_PLACEHOLDER
const ALERT_AUDIO = {
  resistanceRequired: getAlertAudio(
    'Before resistance set, check & auto connect button click.wav'
  ),

  autoConnect: getAlertAudio(
    'autoconnect.wav'
  ),

  makeConnections: getAlertAudio(
    'After resistance is set, check button.wav'
  ),

  case1Verified: getAlertAudio(
    'After 1st case connections, check.wav'
  ),

  removeCase1: getAlertAudio(
    'After the Rth reading was added.wav'
  ),

  removeExisting: getAlertAudio(
    'After 1st and 2nd cases are completed, click autoconnect.wav'
  ),

  case2Verified: getAlertAudio(
    'After 2nd case connections, check.wav'
  ),

  voltageSet: getAlertAudio(
    'After the voltage value is set.wav'
  ),

  removeVoltmeter: getAlertAudio(
    'After reading is added for the second case.wav'
  ),

  case3Verified: getAlertAudio(
    'Now check again for the 3rd case.wav'
  ),

  addFinalReading: getAlertAudio(
    'After reading is added for the third case.wav'
  ),

  calculate: getAlertAudio(
    'After clicking the calculate button.wav'
  ),

  verifyCorrect: getAlertAudio(
    'Verify button click, Correct calculations.wav'
  ),

  verifyWrong: getAlertAudio(
    'Verify button click, Incorrect calculations.wav'
  ),

  reset: getAlertAudio(
    'Reset.wav'
  ),

  print: getAlertAudio(
    'Print.wav'
  ),
}
export const EXPERIMENT_ALERTS = {
  connectionMode: {
    dedupeKey: 'step-1-connection-mode',
    description: 'Drag nodes from apparatus to complete the circuit connections.',
    icon: '🔌',
    stepNumber: 1,
    target: '#circuit-panel',
    title: 'Connection Mode Activated',
    type: 'info',
  },
  circuitConnectionsCompleted: {
    description: 'The default wiring path has been placed on the apparatus.',
    icon: '✅',
    stepNumber: 1,
    target: '#circuit-panel',
    title: 'Circuit Connections Completed Successfully',
    type: 'success',
  },
  incorrectNodeConnection: {
    description: 'One or more wires are connected to the wrong node pair.',
    icon: '❌',
    stepNumber: 1,
    target: '#circuit-panel',
    title: 'Incorrect Node Connection Detected',
    type: 'error',
  },
  checkingConnections: {
    description: 'The lab console is validating each wire path.',
    duration: 2200,
    icon: '🎛️',
    stepNumber: 2,
    target: '#check-button',
    title: 'Checking Circuit Connections...',
    type: 'info',
  },
  connectionsVerified: {
  audio: ALERT_AUDIO.case1Verified,
  description:
    'Connections verified successfully. The digital multimeter is now displaying the Thevenin resistance value. Click ADD to add the reading to the observation table.',
  icon: '✅',
  stepNumber: 2,
  target: '#check-button',
  title: 'Connections Verified',
  type: 'success',
},
connectionsVerifiedCase2: {
  audio: ALERT_AUDIO.case2Verified,
  description:
    'Connections verified successfully. Now switch ON the power supply and set the required voltage value.',
  icon: '✅',
  stepNumber: 2,
  target: '#check-button',
  title: 'Connections Verified',
  type: 'success',
},

connectionsVerifiedCase3: {
  audio: ALERT_AUDIO.case3Verified,
  description:
    'Connections verified successfully. Now turn ON the power supply.',
  icon: '✅',
  stepNumber: 2,
  target: '#check-button',
  title: 'Connections Verified',
  type: 'success',
},
  connectionErrorFound: {
    icon: '⚠️',
    stepNumber: 2,
    target: '#circuit-panel',
    title: 'Connection Error Found - Please Recheck Wiring',
    type: 'error',
  },
  adjustResistance: {
    dedupeKey: 'step-3-adjust-resistance',
    description: 'Use the three resistance sliders before starting the supply.',
    icon: '🎛️',
    stepNumber: 3,
    target: '#resistance-controls',
    title: 'Adjust Resistance Values Using Sliders',
    type: 'info',
  },
  resistanceLocked: {
    description: 'Resistance controls are locked while the circuit is powered.',
    icon: '✅',
    stepNumber: 3,
    target: '#resistance-controls',
    title: 'Resistance Values Locked for Experiment',
    type: 'success',
  },
  powerOn: {
  description:
    'Power supply switched ON successfully.',
  icon: '⚡',
  stepNumber: 4,
  target: '#power-supply',
  title: 'Power Supply Turned ON',
  type: 'success',
},
  cannotStartPower: {
    description: 'Run CHECK and correct the circuit wiring before powering the supply.',
    icon: '⚠️',
    stepNumber: 4,
    target: '#check-button',
    title: 'Cannot Start Power - Complete Connections First',
    type: 'warning',
  },
  adjustVoltage: {
  audio: ALERT_AUDIO.voltageSet,
  dedupeKey: 'step-5-adjust-voltage',
  description:
    'The readings are now displayed on the voltmeter. Click ADD to record the reading.',
  icon: '⚡',
  stepNumber: 5,
  target: '#voltage-control',
  title: 'Voltage Set Successfully',
  type: 'success',
},
  addingReading: {
    description: 'The measured value is being added to the observation table.',
    duration: 1800,
    icon: '📊',
    stepNumber: 6,
    target: '#observation-table-panel',
   title: 'Adding Reading To Observation Table',
    type: 'info',
  },
 readingAdded: {
  audio: ALERT_AUDIO.addFinalReading,
  description:
    'Final reading added successfully. Click CALCULATE to manually verify Thevenin’s Theorem.',
  icon: '✅',
  stepNumber: 6,
  target: '#observation-table-panel',
  title: 'Reading Added Successfully',
  type: 'success',
},
readingAddedCase1: {
  audio: ALERT_AUDIO.removeCase1,
  description:
    'Reading added successfully. Remove the connections 9-10, 5-11 and 6-13.',
  icon: '✅',
  stepNumber: 6,
  target: '#observation-table-panel',
  title: 'Reading Added',
  type: 'success',
},

readingAddedCase2: {
  audio: ALERT_AUDIO.removeVoltmeter,
  description:
    'Reading added successfully. Turn OFF the power supply and remove voltmeter connections 1-11 and 2-13.',
  icon: '✅',
  stepNumber: 6,
  target: '#observation-table-panel',
  title: 'Reading Added',
  type: 'success',
},
  readingAlreadyExists: {
    description: 'Change the voltage before recording another observation.',
    icon: '⚠️',
    stepNumber: 6,
    target: '#voltage-control',
    title: 'Reading Already Exists',
    type: 'warning',
  },
 calculationReady: {
  audio: ALERT_AUDIO.calculate,
  description:
    'Observed values are displayed. Calculate IL manually, enter the value and click Verify.',
  icon: '🧮',
  stepNumber: 7,
  target: '#calculation-panel',
  title: 'Calculation Ready',
  type: 'info',
},

verificationSuccess: {
  audio: ALERT_AUDIO.verifyCorrect,
  description:
    'Thevenin Theorem verified successfully. Click Generate Report.',
  icon: '✅',
  stepNumber: 8,
  target: '#generate-report-button',
  title: 'Verification Successful',
  type: 'success',
},

verificationFailed: {
  audio: ALERT_AUDIO.verifyWrong,
  description:
    'Incorrect calculation. Please review your calculation and try again.',
  icon: '❌',
  stepNumber: 8,
  target: '#calculation-panel',
  title: 'Verification Failed',
  type: 'error',
},
  preparingReport: {
    description: 'The print view is being prepared from the current observations.',
    duration: 2000,
    icon: '📊',
    stepNumber: 10,
    target: '#print-button',
    title: 'Preparing Experiment Report for Printing',
    type: 'info',
  },
printLayoutGenerated: {
  audio: ALERT_AUDIO.print,
  description:
    'Opening the print dialog.',
  icon: '🖨️',
  stepNumber: 10,
  target: '#print-button',
  title: 'Print',
  type: 'success',
},
tingSetup: {
    description:
'Confirm reset before all readings and connections are cleared.',
    duration: 1800,
    icon: '🎛️',
    stepNumber: 11,
    target: '#reset-button',
    title: 'Resetting Experiment Setup...',
    type: 'info',
  },
  resetWarning: {
    confirmLabel: 'OK',
    dedupeKey: 'step-11-reset-warning',
    description: 'Confirm reset before the current table and circuit are cleared.',
    icon: '⚠️',
    placement: 'center',
    requiresConfirmation: true,
    stepNumber: 11,
    target: '#reset-button',
    title: 'All Readings and Connections Will Be Cleared',
    type: 'warning',
  },
  resetSuccess: {
  audio: ALERT_AUDIO.reset,
  description:
    'The simulation has been reset. You can start again.',
  icon: '✅',
  stepNumber: 11,
  target: '#circuit-panel',
  title: 'Experiment Reset Successfully',
  type: 'success',
},
reportGenerated: {
  audio: ALERT_AUDIO.reportGenerated,
  title: 'Report Generated',
  description: 'Your report has been generated successfully. Click OK to view your report.',
  icon: '✅',
  type: 'success',
},
}
