const callback = function(){
    const signals = [
      'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam',
      'parkLights', 'fogLights', 'auxLights', 'defrost', 'oilSwitch'
    ];
    const elems = [
      ...signals, 'container', 'tachNum', 'kmTrip', 'kmTotal', 'fuelLevel',
      'lambda', 'gear'
    ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
    const {
      container, tachNum, lambda, fuelLevel, kmTrip, kmTotal, gear,
    } = elems;
    const { pBoost, clt } = DASH_OPTIONS;

    const updateRPM = (currRpm) => {
      setRootCSS('--rpm', (zeroFixed(((currRpm / 8000) * 772) / 10) * 10)+'px');
    }

    const bindRealtimeData = () => {
      if (!checkCache('useCAN', useCanChannel())) checkSource();

      if (useCAN) {
        setText(lambda, canData.lambda)
        setBoostBar(gtZero(canData.boost))
        setRootCSS('--pBoost-gauge-bar', '-'+(gtZero((canData.boost / pBoost) * 100))+'%')
        setText(gear, canData.gear)
      }

      updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
      setText(tachNum, zeroFixed(useCANForVSS ? canData.vss : basicData.kmhF));
      updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)
      setRootCSS('--clt-gauge-bar', '-'+(gtZero((useCANForCLT ? canData.clt : basicData.clt) / clt) * 100)+'%')

      if (isBasicOnline) {
        setText(fuelLevel, fuelLevelFormat(basicData, 'lvlFuelF', 99))

        for(let i = 0; i < signals.length; i++) {
          etoggle(elems[signals[i]], basicData[signals[i]])
        }
      }

      requestAnimationFrame(bindRealtimeData);
    }

    const resetNumbers = () => {
      setText(tachNum, 0);
      setText(lambda, '0.00');
      setText(fuelLevel, 0);
      setText(gear, 0);
      loadOdo(kmTotal, kmTrip, 0);
    }

    container.classList.add('anim-in');

    setTimeout(() => resetNumbers(), 2500);
    setTimeout(() => openConnection(bindRealtimeData), 4500);
};

window.onload = function(){
  requestAnimationFrame(callback);
};
