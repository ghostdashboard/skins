const callback = () => {
  // Variables, constants and DOM elements
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights',
    'fogLights', 'auxLights', 'openDoor', 'fan', 'oilSwitch', 'ECUErr'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'rpm', 'kmTrip', 'kmTotal', 'fuelLevel',
    'battLevel', 'fuelPressure', 'lambda', 'oilPressure', 'mapBoost', 'cltNow'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, rpm, kmTrip, kmTotal, battLevel,
    fuelPressure, lambda, oilPressure, mapBoost, fuelLevel, cltNow
  } = elems;
  const { cMain, cSec, cRed } = COLORS
  const { aSpd, redline, icon } = DASH_OPTIONS
  const maxRPM = 8000;
  let [useCAN, useCANForRPM, useCANForVSS, useCANForCLT] = [false, false, false, false]

  // Set static parameters
  setRootCSS('--background-color', cMain);
  setRootCSS('--mini-bar', `90deg, ${cMain}33, ${cMain}FF`);
  setRootCSS('--mini-bar-red', `90deg, ${cSec}33, ${cSec}FF`);

  // Load odometer
  loadOdo(kmTotal, kmTrip, 0)

  // Wrapper method to update the RPM
  const updateRPM = (value) => {
    setText(rpm, zeroFixed(value))
    if (+value > maxRPM) return
    setRootCSS('--rpm-deg', `${-(155 + ((+value / maxRPM) * 230))}deg`)
    setRootCSS('--background-color', (+value < redline ? cMain : cRed));
  }

  // Wrapper method to update the speedometer
  const setKmhDeg = ([val, valf]) => {
    setText(speedo, zeroFixed(aSpd < 2 ? (valf || val) : val))
    if (checkCache('kmh-deg', val) || val > 160) return
    setRootCSS('--kmh-deg', `${(155 + ((val/160)*230))}deg`)
  }

  // Cache the settings for channel sources locally
  const checkSource = () => [useCAN, useCANForRPM, useCANForVSS, useCANForCLT] = [
      useCanChannel(),
      useCanChannel('sRpm'),
      useCanChannel('sVss'),
      useCanChannel('sClt'),
    ]

  // Bind the realtime data to the DOM
  const bindRealtimeData = () => {
    // Check if the source has changed and update the cache
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    // Update the data for CAN-only channels - batching methods for performance
    if (useCAN) {
      setText(mapBoost, mapFormat(canData.map))
      setText(fuelPressure, canData.fuelPress)
      setText(battLevel, canData.batt)
      setText(lambda, canData.lambda)
      setText(oilPressure, canData.oilPress)
    }

    // Update the data for Basic-only channels
    if (isBasicOnline) {
      setText(fuelLevel, fuelLevelFormat(basicData, 'lvlFuel'))
      setFuelLevelBar(safeReturn(basicData, 'lvlFuel'))

      // Toggle signals
      for(let i = 0; i < signals.length; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    // Update the data for channels that can be sourced from CAN or Basic servers
    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? [canData.vss] : [basicData.kmh, basicData.kmhF])
    setCLTBar(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    setText(cltNow, useCANForCLT ? canData.clt : zeroFixed(safeReturn(basicData, 'clt')))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    // Repeat bindRealtimeData as fast as possible
    requestAnimationFrame(bindRealtimeData);
  }

  // Replace the icons with the colored ones
  (() => {
    if (icon === 1) return
    const icons = document.querySelectorAll('#top-info img')
    for (let i = 0; i < icons.length; i++) {
      icons[i].src = icons[i].src.replace('icons', 'icons_color')
    }
  })()

  // Wait animations to finish and then open websocket connection
  setTimeout(() => openConnection(bindRealtimeData), 6500)

  // Trigger animation when DOM is ready
  container.classList.add('anim-in')
};

// Start the script when DOM is ready
window.onload = () => callback()
