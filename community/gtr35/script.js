const callback = () => {
  // Variables, constants and DOM elements
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights', 'fogLights', 'auxLights',
    'openDoor', 'oilSwitch', 'ECUErr', 'fuelLight', 'turn'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'rpm', 'kmTrip', 'kmTotal', 'fuelLevel',
    'battLevel', 'fuelPressure', 'lambda', 'oilPressure', 'mapBoost', 'cltNow'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, rpm, kmTrip, kmTotal, battLevel,
    fuelPressure, lambda, oilPressure, mapBoost, boost, fuelLevel, cltNow
  } = elems;
  const { clt } = DASH_OPTIONS
  const maxRPM = 9000;
  const signalsLen = signals.length - 2



  loadOdo(kmTotal, kmTrip, 0)

  const updateKMH = (val) => {
    setText(speedo, zeroFixed(val))
  }

  const updateRPM = (value) => {
    setText(rpm, zeroFixed(value))
    if (+value > maxRPM || +value < 0) return
    setRootCSS('--rpm-deg', `${(220 + ((+value / maxRPM) * 245))}deg`)
  }

  const setKmhDeg = (val) => {
    if (+val > 340 || +val < 0) return
    if (+val > 0 && +val <= 100) setRootCSS('--kmh-deg', `${(139 + ((+val / 100) * 101))}deg`)
    if (+val > 100 && +val <= 340) setRootCSS('--kmh-deg', `${(170 + ((+val / 100) * 68))}deg`)
  }

  const setFuelDeg = (val) => {
    if (+val > 100 || +val < 0) return
    setRootCSS('--fuel-deg', `${(232 + ((+val / 100) * 76))}deg`)
  }

  const setCLTDeg = (val) => {
    if (+val > clt || +val < 0) return
    setRootCSS('--clt-deg', `${(232 + ((+val / 100) * 70))}deg`)
  }

  const setBoostDeg = (val) => {
    if (+val > mapBoost || +val < 0) return
    setRootCSS('--boost-deg', `${(((+val / mapBoost) * 100) + 271)}deg`)
  }

  const setOilPressDeg = (val) => {
    if (+val > oilPressure || +val < 0) return
    setRootCSS('--boost-deg', `${(((+val / oilPressure) * 100) + 271)}deg`)
  }

  const bindRealtimeData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (isBasicOnline) {
      setFuelDeg(safeReturn(basicData, 'lvlFuelF'))
      etoggle(elems.fuelLight, safeReturn(basicData, 'lvlFuelF') > 15 ? 1 : 0)
      etoggle(elems.turn, (+basicData.turnLeft === 0 || +basicData.turnRight === 0) ? 0 : 1)

      for (let i = 0; i < signalsLen; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }


    if (useCAN) {
      setText(mapBoost, mapFormat(canData.map))
      setText(fuelPressure, canData.fuelPress)
      setText(battLevel, canData.batt)
      setText(lambda, canData.lambda)
      setText(oilPressure, canData.oilPress)
      setText(gear, canData['gear'])
      // setText(tps, canData.tps + '%')
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    updateKMH(useCANForVSS ? canData.vss : basicData.kmh)
    setKmhDeg(useCANForVSS ? canData.vss : basicData.kmh)
    setBoostDeg(canData.boost)
    setCLTDeg(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)


    requestAnimationFrame(bindRealtimeData);

  }

  setTimeout(() => openConnection(bindRealtimeData), 6000)


  switchIcons(document.querySelectorAll('.icons img'))
  container.classList.add('anim-in')
};

window.onload = () => callback()
