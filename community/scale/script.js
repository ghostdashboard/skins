const linearRPM = () => {
  let elemHolder = document.getElementById("rpmnumbers")
  elemHolder.classList.add(`rpm-max-${DASH_OPTIONS.rpmM}`)
  for (let index = DASH_OPTIONS.rpmM; index >= 0; index--) {
    let numHolder = document.createElement("div")
    numHolder.setAttribute('style', `animation-delay: ${((index+15)*0.2)}s; transform: translateX(${(index/DASH_OPTIONS.rpmM) * -180}px);`)
    numHolder.textContent = index
    elemHolder.appendChild(numHolder)
  }
}

const linearKMH = () => {
  const items = [0, 20, 40, 60, 100, 140, 200, 260]
  let elemHolder = document.getElementById("kmhnumbers")
  for (let index = (items.length - 1); index >= 0; index--) {
    let numHolder = document.createElement("div")
    numHolder.setAttribute('style', `animation-delay: ${((index+15)*0.2)}s; transform: translateX(${(index/(items.length - 1)) * 180}px);`)
    numHolder.textContent = items[index]
    elemHolder.appendChild(numHolder)
  }
}

const bottomLines = () => {
  let elemHolder = document.getElementById("bottomanimation")
  for (let index = 6; index >= 0; index--) {
    let numHolder = document.createElement("div")
    numHolder.setAttribute('style', `animation-delay: ${(((index*2)*100)/1000)}s;`)
    elemHolder.appendChild(numHolder)
  }
}

const callback = () => {
  linearRPM()
  linearKMH()
  bottomLines()
  const container = document.getElementById("container")
  const kmh = document.getElementById("kmh")
  const gear = document.getElementById("gear")
  const comb = document.getElementById("comb-now")
  const clt = document.getElementById("clt-now")
  const setaesq = document.getElementById("SETAESQ")
  const setadir = document.getElementById("SETADIR")
  const battAlt = document.getElementById("battAlt")
  const eBrake = document.getElementById("eBrake")
  const highBeam = document.getElementById("highBeam")
  const parkLights = document.getElementById("parkLights")
  const fogLights = document.getElementById("fogLights")
  const NEBLINA = document.getElementById("NEBLINA")
  const DOOR = document.getElementById("DOOR")
  const FAN = document.getElementById("FAN")
  const OIL = document.getElementById("OIL")
  const ECUERR = document.getElementById("INJ")
  const batlevel = document.getElementById("batt-level")
  const kmtrip = document.getElementById("km-trip")
  const kmtotal = document.getElementById("km-total")
  const afrnow = document.getElementById("afr-now")
  const mapnow = document.getElementById("map-now")
  const matnow = document.getElementById("mat-now")
  const oilPressnow = document.getElementById("oil-press-now")
  const fuelPressnow = document.getElementById("comb-press-now")
  const boost = document.getElementById("boost")
  const mainColor = COLORS.cMain
  const secondColor = COLORS.cSec
  const maxRpm = DASH_OPTIONS.rpmM * 1000
  let kmhbar = 294

  setRootCSS('--main-color', mainColor)
  setRootCSS('--second-color', secondColor)

  const updateRPM = (rpm) => {
    setRootCSS('--rpm-deg', `${(294 - (((rpm || 0) / maxRpm) * 294))}px`)
  }

  const setKmhDeg = ([val, valf]) => {
    kmhbar = 294
    setText(kmh, zeroFixed(DASH_OPTIONS.aSpd < 2 ? (valf || val) : val))
    if (val <= 60 && val >= 0) { kmhbar = (val/60)*125 }
    if (val <= 140 && val > 60) { kmhbar = 125 + (((val-60)/80)*83) }
    if (val <= 260 && val > 140) { kmhbar = 208 + (((val-140)/120)*86) }
    setRootCSS('--kmh-deg', `${294 - kmhbar}px`)
  }

  const getTopBarValues = (val) => `${(291 - (val * 291))}px`

  const updateData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (useCAN) {
      setText(boost, mapFormat(canData['map']))
      setText(fuelPressnow, canData['fuelPress'])
      setText(batlevel, canData['batt'])
      setText(afrnow, canData['lambda'])
      setText(oilPressnow, canData['oilPress'])
      setText(gear, canData['gear'])
      setText(mapnow, mapFormat(canData['map']))
      setText(matnow, canData['mat']);
    }

    updateRPM(useCANForRPM ? canData['rpm'] : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? [canData['vss']] : [basicData['kmh'], basicData['kmhF']])
    setRootCSS('--clt-gauge-bar', useCANForCLT ? getTopBarValues(canData['clt']/DASH_OPTIONS.clt) : getTopBarValues(safeReturn(basicData, 'clt')/DASH_OPTIONS.clt))
    setText(clt, useCANForCLT ? zeroFixed(canData['clt']) : zeroFixed(safeReturn(basicData, 'clt')))
    updateOdo(kmtotal, kmtrip, useCANForVSS ? canData['odoNow'] : basicData['odoNow'])

    if (isBasicOnline) {
      setText(comb, fuelLevelFormat(basicData, 'lvlFuelF'))
      setRootCSS('--comb-gauge-bar', getTopBarValues(safeReturn(basicData, 'lvlFuelF')/100))

      etoggle(setaesq, basicData['turnLeft'])
      etoggle(setadir, basicData['turnRight'])
      etoggle(battAlt, basicData['battAlt'])
      etoggle(eBrake, basicData['eBrake'])
      etoggle(highBeam, basicData['highBeam'])
      etoggle(parkLights, basicData['parkLights'])
      etoggle(fogLights, basicData['fogLights'])
      etoggle(NEBLINA, basicData['auxLights'])
      etoggle(DOOR, basicData['openDoor'])
      etoggle(FAN, basicData['fan'])
      etoggle(OIL, basicData['oilSwitch'])
      etoggle(ECUERR, basicData['ECUErr'])
    }
    requestAnimationFrame(updateData);
  }

  switchIcons(document.querySelectorAll('#top-info img'))
  setTimeout(() => openConnection(updateData), 5000)
  container.classList.add('anim-in')
  loadOdo(kmtotal, kmtrip, 0)
};

window.onload = () => callback()
