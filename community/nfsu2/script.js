const callback = function(){
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights',
    'fogLights', 'auxLights', 'openDoor', 'fan', 'oilSwitch', 'ECUErr'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'kmTrip', 'kmTotal', 'gear', 'cltNum',
    'customBg'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, rpm, kmTrip, kmTotal, gear, cltNum, customBg
  } = elems;
  const { cMain, cRed } = COLORS;
  const { clt, redline, bgImage } = DASH_OPTIONS;
  const cltMax = parseInt(clt, 10);
  let combLvl = 0;

  setRootCSS('--main-color', cMain)
  customBg.src = userBackground() || 'img/default_bg.jpg';

  const updateRPM = (currRpm) => {
    if (+currRpm > 8000) return;
    setRootCSS('--rpm', (((currRpm / 8000) * 230)) + 'deg');
  }

  const updateClt = (currClt) => {
    setRootCSS('--clt-needle', (((currClt / cltMax) * 193) + 40) + 'deg');
    setText(cltNum, zeroFixed(currClt));
  }

  const updateFuelLevel = (currFuel) => {
    setRootCSS('--fuel-needle', ((currFuel / 100) * 118) + 'deg');
  }

  function updateData() {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    combLvl = fuelLevelFormat(basicData, 'lvlFuelF');

    if (useCAN) {
      setText(gear, canData.gear);
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setText(speedo, zeroFixed(useCANForVSS ? canData.vss : basicData.kmhF));
    updateClt(useCANForCLT ? canData.clt : safeReturn(basicData, 'clt'))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    if (isBasicOnline) {
      updateFuelLevel(fuelLevelFormat(basicData, 'lvlFuelF'))

      for(let i = 0; i < signals.length; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    requestAnimationFrame(updateData);
  }

  loadOdo(kmTotal, kmTrip, 0);
  container.classList.add('anim-in');
  switchIcons(document.querySelectorAll('#top-info img'))

  setTimeout(function() {
    openConnection(updateData);
  }, 4500);
};

window.onload = function(){
  requestAnimationFrame(callback);
};
