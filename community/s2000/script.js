const callback = function(){
    const elems = {};
    [
      'container', 'tachNum', 'cltArc', 'fuelArc', 'batt', 'mat', 'tps', 'kmtrip', 'kmtotal', 'boost', 'turnL', 'turnR', 'hBeam', 'brake', 'battery', 'oil', 'injection', 'headlight', 'fan', 'door', 'pump'
    ].map((id) => elems[id] = document.getElementById(id));
    const {
      container, tachNum, cltArc, fuelArc, batt, mat, tps, kmtrip, kmtotal, boost, turnL, turnR, hBeam, brake, battery, oil, injection, headlight, fan, door, pump
    } = elems;
    const { cMain, cRed } = COLORS;
    const cltMax = parseInt(DASH_OPTIONS.clt, 10);
    let combLvl = 0;

    setRootCSS('--main-color', cMain)

    const combGauge = Gauge(fuelArc, {
        max: 100,
        min: 0,
        dialStartAngle: -8,
        dialEndAngle: 190,
        value: 100,
        showValue: false,
      }
    );

    const cltGauge = Gauge(cltArc, {
        max: cltMax,
        min: 0,
        dialStartAngle: -8,
        dialEndAngle: 190,
        value: cltMax,
        showValue: false,
      }
    );

    function updateRPM(currRpm) {
      setRootCSS('--rpm', `${(((currRpm / 9000) * 104) + 4)}deg`);
      setRootCSS('--rpm-color', ((currRpm / 1) < (DASH_OPTIONS.redline / 1) ? cMain : cRed));
    }

    function updateData() {
      if (!checkCache('useCAN', useCanChannel())) checkSource();

      combLvl = fuelLevelFormat(basicData, 'lvlFuelF');

      if (useCAN) {
        setText(boost, boostFormat(canData['map']));
        setText(batt, canData['batt']);
        setText(mat, canData['mat']);
        setText(tps, zeroFixed(canData['tps']));
      }

      updateRPM(useCANForRPM ? canData['rpm'] : safeReturn(basicData, 'rpm'))
      setText(tachNum, zeroFixed(useCANForVSS ? canData['vss'] : basicData['kmhF']));
      setSVGGaugeValue(combGauge, 'comb-gauge', combLvl);
      setSVGGaugeValue(cltGauge, 'clt-gauge', useCANForCLT ? canData['clt'] : safeReturn(basicData, 'clt'));
      updateOdo(kmtotal, kmtrip, useCANForVSS ? canData['odoNow'] : basicData['odoNow'])

      if (isBasicOnline) {
        etoggle(turnL, basicData['turnLeft']);
        etoggle(turnR, basicData['turnRight']);
        etoggle(battery, basicData['battAlt']);
        etoggle(brake, basicData['eBrake']);
        etoggle(hBeam, basicData['highBeam']);
        etoggle(headlight, basicData['parkLights']);
        etoggle(injection, basicData['ECUErr']);
        etoggle(door, basicData['openDoor']);
        etoggle(fan, basicData['fan']);
        etoggle(pump, combLvl < 20 ? 0 : 1);
        etoggle(oil, basicData['oilSwitch']);
      }

      requestAnimationFrame(updateData);
    }

    loadOdo(kmtotal, kmtrip, 0);
    container.classList.add('anim-in');

    function animateVSS(num) {
      setText(tachNum, num);
      if (num < 1) return;
      setTimeout(function() { animateVSS(num - 111) }, 300);
    }

    setTimeout(function() { animateVSS(999); }, 2200);
    setTimeout(function() {
      combGauge.setValue(0);
      cltGauge.setValue(0);
      openConnection(updateData);
    }, 5500);
};

window.onload = function(){
  requestAnimationFrame(callback);
};
