const callback = () => {
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights',
    'fogLights', 'auxLights', 'openDoor', 'fan', 'oilSwitch', 'ECUErr'
  ];
  const elems = [...signals, 'container', 'kmTrip', 'kmTotal', 'introVideo']
    .reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const { container, kmTrip, kmTotal, introVideo } = elems;
  const { clt } = DASH_OPTIONS
  const maxRPM = 11000;

  loadOdo(kmTotal, kmTrip, 0)

  const updateRPM = (value) => {
    if (+value > maxRPM) return
    if (+value < 1001) setRootCSS('--rpm-deg', `${(((+value / 1000) * 10))}deg`)
    if (+value > 1000 && +value < 3001) setRootCSS('--rpm-deg', `${((((+value - 1000) / 2000) * 30) + 10)}deg`)
    if (+value > 3000) setRootCSS('--rpm-deg', `${((((+value - 3000) / 8000) * 210) + 40)}deg`)
  }

  const setKmhDeg = (val) => {
    if (checkCache('kmh-deg', val) || val > 320) return
    setRootCSS('--kmh-deg', `${(((val / 320) * 246) + 2)}deg`)
  }

  const updateSmallNeedle = (val, max, elem) => {
    setRootCSS(elem, '-' + (((val / max) * 81) + 3) + 'deg');
  }

  const updateOilPressure = (val) => {
    if (val > 8 || val < 0) return
    setRootCSS('--oil-pressure-deg', (88 - ((val / 8) * 88)) + 'deg');
  }

  const bindRealtimeData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (useCAN) {
      updateOilPressure(canData.oilPress)
    }

    if (isBasicOnline) {
      updateSmallNeedle(fuelLevelFormat(basicData, 'lvlFuelF'), 100, '--fuel-deg')

      for (let i = 0; i < signals.length; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? canData.vss : safeReturn(basicData, 'kmh'))
    updateSmallNeedle(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'), clt, '--coolant-deg')
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    requestAnimationFrame(bindRealtimeData);
  }

  switchIcons(document.querySelectorAll('#top-info img'))

  introVideo.onended = () => {
    introVideo.parentNode.removeChild(introVideo)
    container.classList.add('anim-in')
    setTimeout(() => openConnection(bindRealtimeData), 5000)
  }
  introVideo.play()
};

window.onload = () => callback()
