const { cMain, cSec } = COLORS
const { aSpd, clt, icon, rpmM } = DASH_OPTIONS
const maxRpm = rpmM * 1000

const linearRPM = () => {
  let elemHolder = document.getElementById("rpmnumbers")
  elemHolder.classList.add(`rpm-max-${rpmM}`)
  for (let index = rpmM; index >= 0; index--) {
    let numHolder = document.createElement("div")
    numHolder.setAttribute('style', `animation-delay: ${((index+15)*0.2)}s; transform: translateX(${(index/rpmM) * -180}px);`)
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

const useColorIcons = () => {
  if (icon === 1) return
  const icons = document.querySelectorAll('#top-info img')
  for (let i = 0; i < icons.length; i++) {
    icons[i].src = icons[i].src.replace('icons', 'icons_color')
  }
}

const callback = () => {
  const signals = [
    'turnLeft', 'turnRight', 'battAlt', 'eBrake', 'highBeam', 'parkLights',
    'fogLights', 'auxLights', 'openDoor', 'fan', 'oilSwitch', 'ECUErr'
  ];
  const elems = [
    ...signals, 'container', 'speedo', 'kmTrip', 'kmTotal', 'fuelLevel', ,'mat',
    'battLevel', 'fuelPressure', 'lambda', 'oilPressure', 'mapBoost', 'cltNow', 'gear'
  ].reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
  const {
    container, speedo, kmTrip, kmTotal, battLevel, gear, mat,
    fuelPressure, lambda, oilPressure, mapBoost, fuelLevel, cltNow
  } = elems;
  let kmhbar = 294
  let [useCAN, useCANForRPM, useCANForVSS, useCANForCLT] = [false, false, false, false]

  linearRPM()
  linearKMH()
  bottomLines()
  useColorIcons()
  loadOdo(kmTotal, kmTrip, 0)
  setRootCSS('--main-color', cMain)
  setRootCSS('--second-color', cSec)

  const updateRPM = (rpm) => {
    setRootCSS('--rpm-deg', `${(294 - (((rpm || 0) / maxRpm) * 294))}px`)
  }

  const setKmhDeg = ([val, valf]) => {
    kmhbar = 294
    setText(speedo, zeroFixed(aSpd < 2 ? (valf || val) : val))
    if (val <= 60 && val >= 0) { kmhbar = (val/60)*125 }
    if (val <= 140 && val > 60) { kmhbar = 125 + (((val-60)/80)*83) }
    if (val <= 260 && val > 140) { kmhbar = 208 + (((val-140)/120)*86) }
    setRootCSS('--kmh-deg', `${294 - kmhbar}px`)
  }

  const getTopBarValues = (val) => `${(291 - (val * 291))}px`

  const checkSource = () => [useCAN, useCANForRPM, useCANForVSS, useCANForCLT] = [
    useCanChannel(),
    useCanChannel('sRpm'),
    useCanChannel('sVss'),
    useCanChannel('sClt'),
  ]

  const bindRealtimeData = () => {
    if (!checkCache('useCAN', useCanChannel())) checkSource();

    if (useCAN) {
      setText(gear, canData.gear)
      setText(mat, canData.mat);
      setText(mapBoost, mapFormat(canData.map))
      setText(fuelPressure, canData.fuelPress)
      setText(battLevel, canData.batt)
      setText(lambda, canData.lambda)
      setText(oilPressure, canData.oilPress)
    }

    if (isBasicOnline) {
      setText(fuelLevel, fuelLevelFormat(basicData, 'lvlFuel'))
      setRootCSS('--lFuel-gauge-bar', getTopBarValues(safeReturn(basicData, 'lvlFuel')/100))

      for(let i = 0; i < signals.length; i++) {
        etoggle(elems[signals[i]], basicData[signals[i]])
      }
    }

    updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'rpm'))
    setKmhDeg(useCANForVSS ? [canData.vss] : [basicData.kmh, basicData.kmhF])
    setRootCSS('--clt-gauge-bar', getTopBarValues((useCANForCLT ? canData.clt : safeReturn(basicData, 'clt')) / clt))
    setText(cltNow, useCANForCLT ? canData.clt : zeroFixed(safeReturn(basicData, 'clt')))
    updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)

    requestAnimationFrame(bindRealtimeData);
  }

  setTimeout(() => openConnection(bindRealtimeData), 5000)

  container.classList.add('anim-in')
};

window.onload = () => callback()
