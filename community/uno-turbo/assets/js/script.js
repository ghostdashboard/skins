const callback = () => {
  // Variables, constants and DOM elements
  const signals = [
    'battAlt', 'eBrake', 'highBeam', 'parkLights', 'fogLights', 'auxLights',
    'openDoor', 'oilSwitch', 'ECUErr', 'fuelLight', 'turn'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'kmTrip', 'kmTotal'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, kmTrip, kmTotal
  } = elems;
  const { clt } = DASH_OPTIONS
  const maxRPM = 7000
  const signalsLen = signals.length - 2

  loadOdo(kmTotal, kmTrip, 0)

  const updateRPM = (val) => {
    if (+val > maxRPM) return
    setRootCSS('--rpm-path', `${51 - ((+val / maxRPM) * 41)}%`)
  }

  const updateKMH = (val) => {
    setText(speedo, zeroFixed(val))
  }

  const updateBoost = (val) => {
    if (+val > 1) return
    setRootCSS('--boost-path', `${(+val / 1) * 100}%`)
  }

  const updateCLT  = (val) => {
    if (+val > clt || +val < 0) return
    setRootCSS('--clt-path', `${84 - ((+val / clt) * 29)}%`)
  }

  const updateFuel = (val) => {
    if (+val > 100 || +val < 0) return
    setRootCSS('--fuel-path', `${84 - ((+val / 100) * 29)}%`)
  }


  const bindRealtimeData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (isBasicOnline) {
      updateFuel(safeReturn(basicData, 'lvlFuelF'))

      etoggle(elems.fuelLight, safeReturn(basicData, 'lvlFuelF') > 15 ? 1 : 0)
      etoggle(elems.turn, (+basicData.turnLeft === 0 || +basicData.turnRight === 0) ? 0 : 1)

      for (let i = 0; i < signalsLen; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    updateKMH(useCANForVSS ? canData.vss : basicData.kmh)
    updateCLT(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    requestAnimationFrame(bindRealtimeData);
  }

  setTimeout(() => openConnection(bindRealtimeData), 6500)

  container.classList.add('anim-in')
};

window.onload = () => callback()
