let callback = function(){
    const container = document.getElementById("container");
    const kmh = document.getElementById("kmh");
    const turnLeft = document.getElementById("turnLeft");
    const turnRight = document.getElementById("turnRight");
    const eBrake = document.getElementById("eBrake");
    const highBeam = document.getElementById("highBeam");
    const parkLights = document.getElementById("parkLights");
    const fogLights = document.getElementById("fogLights");
    const DOOR = document.getElementById("DOOR");
    const FAN = document.getElementById("FAN");
    const kmtrip = document.getElementById("km-trip")
    const kmtotal = document.getElementById("km-total")
    let maxRpm = 7000;

    const updateRPM = (rpm) => setRootCSS('--rpm', (zeroFixed(((rpm || 0)/maxRpm)*106)-8)+'deg');
    const setKmhDeg = ([val, valf]) => setText(kmh, zeroFixed(DASH_OPTIONS.aSpd < 2 ? (valf || val) : val));

    function updateData() {
      if (useCanChannel()) {
        updateRPM(canData['rpm']);
        setRootCSS('--batt-bar', `${(((canData['batt'] - 8) / 8) * 225)}px`);
        setRootCSS('--oil-bar', `${((canData['oilPress'] / DASH_OPTIONS.pOil) * 225)}px`);
      }

      updateRPM(useCanChannel('sRpm') ? canData['rpm'] : safeReturn(basicData, 'rpm'))
      setKmhDeg(useCanChannel('sVss') ? [canData['vss']] : [basicData['kmh'], basicData['kmhF']])
      setRootCSS('--water-bar', `${(((useCanChannel('sClt') ? canData['clt'] : basicData['clt']) / DASH_OPTIONS.clt) * 225)}px`)
      updateOdo(kmtotal, kmtrip, useCanChannel('sVss') ? canData['odoNow'] : basicData['odoNow'])

      if (Object.keys(basicData).length !== 0) {
        setRootCSS('--comb-bar', ((basicData['lvlFuelF'] / 100) * 225)+'px');
        etoggle(turnLeft, basicData['turnLeft']);
        etoggle(turnRight, basicData['turnRight']);
        etoggle(eBrake, basicData['eBrake']);
        etoggle(highBeam, basicData['highBeam']);
        etoggle(parkLights, basicData['parkLights']);
        etoggle(fogLights, basicData['fogLights']);
        etoggle(DOOR, basicData['openDoor']);
        etoggle(FAN, basicData['fan']);
      }
      requestAnimationFrame(updateData);
    }

    container.classList.add('anim-in');
    setTimeout(function(){
      container.classList.add('anim-step2');
      etoggle(eBrake, 0);
      etoggle(INJ, 0);
      setTimeout(function(){
        container.classList.add('anim-step3');
        setTimeout(() => setText(kmh, 288), 2200);
        setTimeout(function(){
          etoggle(eBrake, 1);
          etoggle(INJ, 1);
          setText(kmh, 0);
          loadOdo(kmtotal, kmtrip, 0);
          openConnection(updateData);
        }, 3500)
      }, 400)
    }, 2500)
  };

  window.onload = function(){
    requestAnimationFrame(callback);
  };
