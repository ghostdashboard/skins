const callback = () => {
  const { cMain, cBg, cRed } = COLORS
  const { rpmM, redline, icon, pBoost } = DASH_OPTIONS
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights',
    'fogLights', 'auxLights', 'openDoor', 'fan', 'oilSwitch', 'ECUErr'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'rpm', 'kmTrip', 'kmTotal', 'fuelLevel',
    'battLevel', 'fuelPressure', 'lambda', 'oilPressure', 'boost', 'cltNow', 'tps'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, rpm, kmTrip, kmTotal, battLevel, tps,
    fuelPressure, lambda, oilPressure, boost, fuelLevel, cltNow
  } = elems;
  const rpmGauge = document.getElementById(`rpm${rpmM}`)
  const maxRpm = rpmM * 1000
  const circularGaugeDashOffset = 11270;

  rpmGauge.style.display = 'block';
  setRootCSS('--main-color', cMain);
  setRootCSS('--second-color', cBg);
  setRootCSS('--rpm-color', cBg);
  loadOdo(kmTotal, kmTrip, 0)

  const updateRPM = (val) => {
    setText(rpm, zeroFixed(((val || 0) / 50)) * 50)
    setRootCSS('--rpm-deg', `${(9 + (((val || 0) / maxRpm) * 253))}deg`)
    setRootCSS('--rpm-color', (+val < redline ? cBg : cRed));
  }

  const setKmhDeg = ([val, valf]) => {
    setText(speedo, zeroFixed(rpmM < 2 ? (valf || val) : val))
    if (checkCache('kmh-deg', val)) return
    setRootCSS('--kmh-deg', `${(9 + (val < 80 ? ((val/80)*126.5) : (val < 240 ? 126.5 + (((val-80)/160)*126.5) : 253)))}deg`)
  }

  const getCircularGaugeValue = (val) => (
    val < 0 ? circularGaugeDashOffset : (
      circularGaugeDashOffset - (val * circularGaugeDashOffset)
    )
  )

  const updateData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (useCAN) {
      setText(boost, mapFormat(canData.map))
      setText(fuelPressure, canData.fuelPress)
      setText(battLevel, canData.batt)
      setText(lambda, canData.lambda)
      setText(oilPressure, canData.oilPress)
      setRootCSS('--tps-gauge-bar', getCircularGaugeValue(canData.tps / 100))
      setRootCSS('--boost-gauge-bar', getCircularGaugeValue(boostFormat(canData.map) / pBoost))
      setText(tps, canData.tps);
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? [canData.vss] : [basicData.kmh, basicData.kmhF])
    setCLTBar(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    setText(cltNow, useCANForCLT ? canData.clt : zeroFixed(safeReturn(basicData, 'clt')))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    if (isBasicOnline) {
      setText(fuelLevel, fuelLevelFormat(basicData, 'lvlFuelF'))
      setFuelLevelBar(safeReturn(basicData, 'lvlFuelF'))

      for(let i = 0; i < signals.length; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    requestAnimationFrame(updateData);
  }

  switchIcons(document.querySelectorAll('#top-info img'))
  setTimeout(() => openConnection(updateData), 6500)
  container.classList.add('anim-in')
};

window.onload = () => callback()
