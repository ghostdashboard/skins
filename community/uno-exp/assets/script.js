const callback = () => {
  // Variables, constants and DOM elements
  const signals = [
    'battAlt', 'eBrake', 'highBeam', 'parkLights', 'fogLights', 'auxLights',
    'openDoor', 'oilSwitch', 'ECUErr', 'fuelLight', 'turn'
  ];
  const elems = [
    ...signals, 'container', 'kmTrip', 'kmTotal'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, kmTrip, kmTotal,
  } = elems;
  const { clt } = DASH_OPTIONS
  const maxRPM = 8000;
  const signalsLen = signals.length - 2

  loadOdo(kmTotal, kmTrip, 0)

  const updateRPM = (value) => {
    if (+value > maxRPM || +value < 0) return
    setRootCSS('--rpm-deg', `${(((+value / maxRPM) * 168))}deg`)
  }

  const setKmhDeg = (val) => {
    if (+val > 200 || +val < 0) return
    setRootCSS('--kmh-deg', `${(((+val / 200) * 202))}deg`)
  }

  const setFuelDeg = (val) => {
    if (+val > 100 || +val < 0) return
    setRootCSS('--fuel-deg', `${(((+val / 100) * 145))}deg`)
  }

  const setCLTDeg = (val) => {
    if (+val > clt || +val < 0) return
    setRootCSS('--clt-deg', `-${(((+val / clt) * 148))}deg`)
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

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? canData.vss : basicData.kmh)
    setCLTDeg(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    requestAnimationFrame(bindRealtimeData);
  }

  setTimeout(() => openConnection(bindRealtimeData), 6000)

  switchIcons(document.querySelectorAll('#top-info img'))
  container.classList.add('anim-in')
};

window.onload = () => callback()
