# Ghost Dashboard Skins SDK
Welcome to the Ghost Dashboard Skins GitHub repository! This platform is dedicated to those passionate about automotive customization and software development. We aim to provide you with the tools and knowledge to create stunning, personalized skins for the Ghost Dashboard using web technologies.

## ⚠ IMPORTANT
- The content of this repository is intended to be used with the Ghost Dashboard product only.
- No other use is allowed without the author's express written permission.
- No other application will be compatible with the content of this repository.
<br><br>

## 🎨 Customization at Your Fingertips

We focus on enabling you to craft custom skins that bring your unique vision to life. With the Ghost Dashboard as your canvas, you can design a personalized interface that reflects your style and enhances your driving experience.

This is why we have built a powerful engine that allows you to create skins using the same technologies that power the web:

- **HTML:** Use this simple yet powerful markup language to structure your dashboard skin.
- **CSS:** Get creative with styles and animations to give your dashboard a unique flair.
- **JavaScript:** Add interactivity and dynamic content to your skins with robust scripting options.
- **Images & Vectors:** From icons to full-scale backgrounds, integrate visuals that resonate with your style.
- **Multimedia Content:** Embed various media types to create a truly multimedia experience on your dashboard.

By combining these technologies, we can compile the UI into a lightweight package that can be easily deployed to the Ghost Dashboard's hardware. That means you can focus on creating your vision without worrying about the technical details.

## 🛠️ Resources for Easy Development

We've stocked our repositories with resources to make skin development as intuitive as possible:

- **Documentation:** Comprehensive guides and references to help you start and advance your skin creation journey.
- **Examples:** Dive into sample skins to see the possibilities and get inspiration for your own designs.
- **Tools:** Utilities and scripts to streamline the development and testing of your skins.
<br><br>

# Development

## 🔥 Performance and Hardware Considerations

When developing skins for the Ghost Dashboard, it's crucial to consider the performance implications and hardware limitations to ensure a seamless and responsive user experience.

The hardware is equipped with a quad-core ARM processor running at 1.44GHz and 512MB of RAM dedicated to the UI, with video memory managed automatically.

The canvas size is 1280x480. While a responsive layout isn't necessary, scalable skins are recommended to perform well across different display specifications.

The rendering resolution is automatically scaled to 1x, 1.5x, or 2x, depending on the hardware's screen resolution.

## ⚡ Best Practices and Performance Tweaks

### 1. **Understand Mobile Development Paradigms**:
   - **Threading and Events:** A solid grasp of threads, queues, and event handling in JavaScript is vital. Optimize event handling and minimize blocking operations to maintain UI responsiveness.

### 2. **Optimize Animations and Graphics**:
   - **[Harware-accelerated CSS3](https://developer.mozilla.org/en-US/docs/Web/Performance/Fundamentals#specific_coding_tips_for_application_performance) and WebGL:** Utilize these for creating animations, layouts, typography, images, masks, and clipped paths.
   - **Use [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) Sparingly:** While `will-change` in CSS can boost performance, it's computationally intensive. Use it judiciously to optimize for specific properties only when necessary.
   - **Compress Images and Vectors:** Use tools like [TinyPNG](https://tinypng.com/) for PNG compression and [Vecta Nano](https://vecta.io/nano) for vector compression to reduce memory footprint.
   - **Efficient Video Use:** Embed low-resolution videos (e.g., 1000x300 30fps for a banner intro animation or a 480x480 30fps duplicated twice for a gauge intro animation) to conserve resources. Remember that low resolution is different from low quality/definition. Use high-quality videos with low resolution to ensure a crisp image.
   - **Prioritize Real-time Responsiveness:** Focus on rendering the most recent data quickly. This is key in real-time UIs.
   - **Use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):** This native method is ideal for triggering UI updates, aiming for a smooth 60fps performance.
   - **Avoid Heavy JavaScript Operations:** Steer clear of intensive JS tasks like complex calculations, recursive loops, and extensive data transformations. If you must use them, consider using [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to offload them to a separate thread.

### 3. **Leverage Optimized Library Functions**:
   - **Utilize Provided Libraries:** The devkit includes a library of optimized functions. Using these can significantly improve performance and reduce the need for custom code.

### 4. **General Optimization Techniques**:
   - **Minimize DOM Access:** Accessing the DOM can be expensive. Reduce direct DOM manipulations and batch updates when possible.
   - **Efficient CSS Selectors:** Use simple selectors and avoid deeply nested or overly complex selectors.
   - **Memory Management:** Be mindful of memory usage. Clean up objects and detach event listeners when no longer needed to prevent memory leaks.
   - **Check this Gist:** [DOM Performance](https://gist.github.com/faressoft/36cdd64faae21ed22948b458e6bf04d5)

### 5. **Testing and Profiling**:
   - **Regular Performance Testing:** Continuously test your skin's performance, especially after adding new features or making significant changes.
   - **Profiling Tools:** Use browser profiling tools to identify bottlenecks and optimize areas where the skin is underperforming.

### 6. **Sessions and Storage**:
   - **Sessions:** If you need to use a session to store data, you can use the [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) object. It's a key/value store that persists until the user switches to another skin or turns off the Ghost Dashboard. It's important to note that the `sessionStorage` object is shared between all skins, so you should use a unique key to avoid conflicts with other skins.
   - **Storage:** If you need to store data permanently, use the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) object. It's a key/value store that persists even after the user switches to another skin or turns off the Ghost Dashboard. It's important to note that the `localStorage` object is shared between all skins, so you should use a unique key to avoid conflicts with other skins.

<br>

## 🚀 Getting Started
- Clone the repo
- Make sure you have [Node.js](https://nodejs.org/en/) installed
- Run `npm run serve` to start the development server
- If asked, allow the installation of the `serve` package
- Open the browser and navigate to `http://localhost:3210`
- We recommend using the [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) browser for development
<br>

## 🛠 Building your skin - Please read carefully
Once the development server is running, you can start building your skin.
- To start, duplicate the `base` folder and rename it to your skin's name. Then, move it inside the `community` folder and start your development there.
  - Use simple names for your skin's folder. e.g. `duck`, `space-drift`, `cookies-n-cream`, etc.
  - Be careful not to pick a name already used by another skin.
  - You can use the available files as the base skeleton for your development. It contains the basic structure to render the UI and retrieve real-time data from the dashboard's hardware.
  - Check the `community` folder for examples and sample files on how to build your skin.
  - Create a README.md file inside your skin's folder to describe your skin's name (the one the user will see on the selection list), features, inspiration and anything else you want to share with the community.
  - Provide some screenshots of your skin in action.
  - Read the section "Load your skin (dev)" below for more information on how to load your skin.
- Once you are happy with your final product, you can open a PR (Pull Request) against the `main` branch and wait for an admin to review it.
- Your skin will be tested on a real Ghost Dashboard hardware to ensure it works as expected.
- Once approved, your skin will be available in the next software update release.
<br>

## 📚 Documentation

### ⚡ Using the built-in tools
When you first navigate to `http://localhost:3210`, the devkit will load the `base` skin.

### ⚪ Load your skin (dev)
To load the skin you are working on, you can use the `Load dev skin` button in the control panel.<br>
The SDK will ask you to input the name you gave to your skin's folder. Once you do that, the SDK will load your skin and save your choice in the browser's local storage.<br>
The next time you click the `Load dev skin` button, the SDK will automatically load your skin without asking you again.<br>
If your skin does not load, ensure you have entered the correct name and that your skin's folder is inside the `community` folder.<br>
To reset the saved skin, you can use the `Reset settings` button in the control panel.
> [!NOTE]
> To debug Javascript and network errors, use the browser's developer tools console (F12).

### ⚪ Emulate hardware connection
To emulate a hardware connection, you can use the `Server connection` toggle in the control panel.<br>
This will toggle the `connected` class on the `container` element, which you can use to style and animate your skin accordingly.<br>
Use this flag to set your skin in a "connected" state, meaning the UI successfully connects to the hardware.

### ⚪ Emulate Real-time data
You can use the `Real-time data` toggle in the control panel to emulate hardware data.<br>
This will trigger a simulated data stream that you can use to test your skin's UI.<br>
Make sure to test your skin thoroughly with different combinations of settings, since they can change the behaviour of the UI.

### ⚪ Emulate animations
To emulate animations, you can use the `Animation IN` and `Animation OUT` buttons in the control panel.<br>
These buttons will toggle the `anim-in` and `anim-out` classes on the `container` element, which you can use to style and animate your skin accordingly.<br>
When the skin is loaded, the `anim-in` class is automatically added to the `container` element. This is programatically called as the last step of the skin's loading process - usually the `classList.add('anim-in')` method is present at the end of the callback function called by `window.onload`, which gives you flexibility to delay the animation until the skin is fully loaded (if needed).

### ⚪ Load example skins
To load an example skin, you can use the `Load '<skin name>' example` button in the control panel.

### ⚪ Load base skin
To load the base skin, you can use the `Load base skin` button in the control panel.

### ⚪ Changing colours
To change the skin's colours, you can use the `Change colors` button in the control panel.<br>
This will open a modal window where you can change the skin's colours.<br>
The modal will show a list of all the colours available for the end user to customize when using your skin.<br>
Each button indicates the name of the colour it will change, and the current colour value.<br>
Remember to hit the `Save` button to save your changes.

### ⚪ Changing settings
To change the skin's settings, you can use the `Change settings` button in the control panel.<br>
This will open a modal window where you can change the skin's settings.<br>
The modal will show a list with all the settings available for the end user to customize when using the dashboard.<br>
Each combination of settings will trigger a different behaviour in the skin's UI, so make sure to test your skin thoroughly with different combinations of settings.<br>
Remember to hit the `Save` button to save your changes.

### ⚪ Reset settings
You can use the `Reset settings` button in the control panel to reset the skin's settings.<br>
This will reset all the settings to their default values, including the skin name you provided when you first loaded it.

<br>

### ⚡ Available settings
Customization is a key feature of the Ghost Dashboard, and we want to give you the tools to create skins that can be personalized by the end user.

You can access the settings object by using the `DASH_OPTIONS` global variable, which is available on the global scope and can be accessed anywhere in your script.

The `defaultSettings.js` file contains the default values for all the settings and should not be changed since it's automatically generated by the SDK, but can be used as a reference.

The list below contains all the settings available for the end user to customize when using your skin.<br>
Each setting has a unique ID (Object Key) that you can use to identify it and apply the changes to your skin's UI.

### ⚪ **General** settings
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `rpmM` | Limiter for RPM gauge (x1000) | `number` | `8` |
| `sLigt` | Shift light trigger | `number` | `5250` |
| `redline` | Redline trigger | `number` | `5500` |
| `icon` | Icon style - 1: mono, 2: color | `number` | `1` |
| `clt` | Coolant temperature gauge max value | `number` | `110` |
| `mat` | Manifold air temperature gauge max value | `number` | `110` |
| `pOil` | Oil pressure gauge max value | `number` | `10` |
| `tOil` | Oil temperature gauge max value | `number` | `120` |
| `pFuel` | Fuel pressure gauge max value | `number` | `6` |
| `pBoost` | Boost pressure gauge max value | `number` | `2` |
| `tKm` | Base total km to mimic the car's OEM odometer | `number` | `0` |
| `sCan` | Source for CAN data - 1: Enabled, 2: Disabled | `number` | `1` |
| `aSpd` | Speed algorithm - 1: Higher accuracy, 2: Higher refresh rate | `number` | `1` |
| `sRpm` | Source for RPM data - 1: Internal module (Basic), 2: CAN | `number` | `2` |
| `sVss` | Source for Speed data - 1: Internal module (Basic), 2: CAN | `number` | `1` |
| `sClt` | Source for Coolant Temperature data - 1: Internal module (Basic), 2: CAN | `number` | `2` |
| `batt` | Battery voltage gauge max value | `number` | `20` |
| `spdM` | Speedometer max value | `number` | `300` |
| `theme` | Skin settings - check **`theme` object:** below | `object` | - |
> [!NOTE]
> Note that the user can select the maximum scale for the RPM gauge, from 6 to 10, which means your skin should support it.<br>
If you are using an image for the RPM gauge, you will need to provide five different files to support the different scales.<br>
Check the `simple` skin for an example on how to implement this feature.<br>
<br>

**`theme` object:**
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `colors` | Color settings - check table below | `object` | - |
| `active` | Active skin | `string` | `base` |
<br>

**`colors` object:**
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `cMain` | Main color | `string` | `#00d3ff` |
| `cSec` | Secondary color | `string` | `#e43f01` |
| `cRed` | Redline color | `string` | `#b70000` |
| `cBg` | Background color | `string` | `#000000` |
| `cRpm` | RPM gauge color | `string` | `#00d3ff` |

```js
const { rpmM, theme } = DASH_OPTIONS;
const { cMain, cRpm } = theme.colors;
const maxRPM = rpmM * 1000;
// ...
setRootCSS('--main-color', cMain)
setRootCSS('--rpm-color', cRpm)

const updateRPM = (rpm) => {
   setRootCSS('--rpm-deg', `${(294 - ((+rpm / maxRpm) * 294))}deg`)
}
```
<br>

### ⚡ Available libraries

### ⚪ `client.js`
This is the main library that you will use to build your skin.<br>
It contains all the functions you need to interact with the dashboard's hardware and real-time data.<br>
The library is available in the `assets` folder and is already imported in the `index.html` file.<br>
Since we use a local static concept, the order of importing the scripts in the `index.html` file is critical and should follow the order below:
```html
<script src="../assets/defaultSettings.js" type="text/javascript"></script> <!-- default settings -->
<script src="../assets/client.js" type="text/javascript"></script> <!-- client library -->
<script src="./script.js" type="text/javascript"></script> <!-- skin's script -->
```
> [!NOTE]
> The SDK automatically generates the `defaultSettings.js` and `client.js` files and contains the default settings and methods for the skins, respectively. Its content should not be changed.<br>
Since the `client.js` file is imported directly inside the HTML file, every method will be available on the global scope and can be accessed anywhere in the subsequent scripts.<br>
<br>

### ⏺ Available methods:

### `openConnection(callback: () => void): void`
Start the connection to the server and calls `callback` after a successful connection. This method must be called programmatically right after the intro animation is finished.

This is a void method and doesn't return anything.<br>
Once the connection is established, the `connected` class is automatically added to the `container` element, and both `basicData` and `canData` objects will start to be hydrated with real-time data.

Every time you need to read the most recent bits from the data streams, you can access the `basicData` and `canData` objects, which are available on the global scope and can be accessed anywhere in your script.

`callback`: A function to be called after a successful connection to the server.
```js
openConnection(() => bindRealtimeData());
```
<br>

### `checkCache(element: HTMLElement | string, value: string): boolean`
Checks if the given element has the given value cached. If it does, returns `true` and does nothing. If it doesn't, returns `false` and caches the value.

`element`: The element to check the cache of. If a `HTMLElement` is passed, its `id` will be used as key to check the cache. If a `string` is passed, it will be used as the key to check the cache.

`value`: The value to check the cache for.
```js
const rpm = document.getElementById('rpm');
const rpmValue = 120;
if (!checkCache(rpm, rpmValue)) {
  // do something
}
```
<br>

### `setText(element: HTMLElement, text: string | number): void`
Sets the text of the given element to the given text. This is a high performance method that relies on fast caching and should be used to set the text of elements that are updated frequently - like speedometer, RPM number, temperatures, etc.

`element`: The element to set the text of.

`text`: The text to set.
```js
const speed = document.getElementById('speed');
setText(speed, canData.vss);
```
<br>

### `setRootCSS(prop: string, value: string | number): void`
Sets the value of the given CSS property on the root element of the page. Also backed by fast caching and should be used to set the value of CSS properties that are updated frequently - like colours, bars, element position/rotation/scale, etc.

`prop`: The CSS property to set/update.

`value`: The value to set.
```js
const { cRpm } = DASH_OPTIONS.theme.colors;
setRootCSS('--gauge-background-color', cRpm);
```
<br>

### `setGaugeValue(element: HTMLElement, value: string | number, barValue: string | number): void`
Combines `setText` and `setRootCSS` to set the text of the given element and the value of the bar related to it. Useful when using dynamic gauges.

Note that the `element` will have its text set to the given `value`, and `barValue` will be set as a CSS property on the root element of the page with the name `--<element-id>-bar`. Ensure that the `--<element-id>-bar` property is set on the CSS file with default values for a better experience.

`element`: The element to set the text of.

`value`: The text to set.

`barValue`: The value for the bar.
```js
const speed = document.getElementById('speed');
setGaugeValue(speed, 120, 0.6); // sets the text to 120 and the bar value to 0.6
```
```css
#speed-bar {
  width: 300px;
  transform: scaleX(var(--speed-bar));
}
```
<br>

### `setIconOpacity(icon: string, value: string | number): void`
Sets the opacity of the given icon. Useful to "turn on" the signal icons like turn, high beam, e-brake, alternator, engine light, etc. This method is a wrapper around `setRootCSS`.

`icon`: The name of the icon - the root property will be set as `--<icon-name>-icon`.

`value`: The state of the signal coming from the **Basic** data set.
```js
setIconOpacity('turnLeft', 1); // turns on the turn signal icon
setIconOpacity('highBeam', 0); // turns off the high beam icon
```
<br>

### `zeroFixed(value: string | number): string`
Returns the given value as a number with no decimal places. Useful to format numbers like speedometer, RPM, etc.

Fractional values will be rounded to the nearest integer.

`value`: The value to format.
```js
zeroFixed(120.5); // output: 121
zeroFixed(1.75); // output: 2
```
<br>

### `oneFixed(value: string | number): string`
Returns the given value as a number with one decimal place. Useful to format numbers like TPS, battery, temperatures, etc.

`value`: The value to format.
```js
oneFixed(12.34); // output: 12.3
oneFixed(1.75); // output: 1.8
```
<br>

### `twoFixed(value: string | number): string`
Returns the given value as a number with two decimal places. Useful to format numbers like map, boost, etc.

`value`: The value to format.
```js
twoFixed(12.3456); // output: 12.35
twoFixed(1.765); // output: 1.77
```
<br>

### `safeReturn(object: any, key: string, defaultValue: string | number): string | number`
Returns the value of the given key from the given object. If the key doesn't exist, it returns the default value.

Useful to avoid errors when the data set is not complete (e.g. first batch of real-time data).

`object`: The object to get the value from.

`key`: The key to get the value of.

`defaultValue`: The default value to return if the key doesn't exist.

```js
safeReturn(data, 'tps', 0); // returns the value of data.tps or 0 if it doesn't exist
```
<br>

### `mapFormat(value: string | number): string`
Formats the MAP value to a more readable format, considering 1 BAR (100 KPA) as the relative start point for both vacuum and boost. It adds a negative sign to indicate vacuum values.

Only works with values in BAR. e.g. 0.2, 0.35, 1.2, 10.3, etc.

`value`: The value to format.
```js
mapFormat(0.2); // output: -.2 (vacuum)
mapFormat(1.2); // output: 0.2 (boost)
```
<br>

### `boostFormat(value: string | number): string`
Formats the boost value to a more readable format, considering 1 BAR (100 KPA) as the relative start point. Any value below 1 BAR is considered vacuum and will return zero.

It only works with values in BAR. e.g. 0.2, 0.35, 1.2, 10.3, etc.

`value`: The value to format.
```js
boostFormat(0.2); // output: 0
boostFormat(1.2); // output: 0.2
```
<br>

### `mapBarFormat(value: string | number): string`
Returns the value to be used when representing the MAP and Boost values in the same bar.

The output is always a fraction of the input for both negative and positive values, so it can be used to scale (`scaleX` or `scaleY`) the bar on both sides of the zero point.

It varies from -0.5 to 0 for vacuum and from 0 to 0.5 for boost. The "max boost pressure" value the user sets is used automatically and will represent 0.5 as the maximum positive output.

To be used with the value coming from `mapbar` property within the **CAN** data set.

Check the **CAN data set** section below for more information. Only works when the **CAN** data set is available.

`value`: The value to format.
```js
setRootCSS('--map-gauge-bar', mapBarFormat(0.4)); // input: 0.4 BAR -> output: 0.1 considering 2 BAR as the max boost pressure
setRootCSS('--map-gauge-bar', mapBarFormat(1.7)); // input: 1.7 BAR -> output: 0.284 considering 3 BAR as the max boost pressure
setRootCSS('--map-gauge-bar', mapBarFormat(-0.4)); // input: -0.4 BAR -> output: -0.2 (boost is ignored)
```
```css
#map-gauge-bar {
  width: 300px;
  left: 50%;
  transform: scaleX(var(--map-gauge-bar));
}
```
<br>

### `set__channel__Bar(value: string | number, asPercentage: boolean = false): void`
Shorthand methods to set the value of the bar element inside the given gauge. Useful when using dynamic gauges.

**`setCLTBar(value: string | number, asPercentage: boolean = false): void`** <br>
**`setMATBar(value: string | number, asPercentage: boolean = false): void`** <br>
**`setOilPressBar(value: string | number, asPercentage: boolean = false): void`** <br>
**`setFuelPressBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setBoostBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setOilTempBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setFuelLevelBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setBatteryBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setSpeedBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setRPMBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setTPSBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setAFRBar(value: string | number, asPercentage: boolean = false): void`**<br>
**`setLambdaBar(value: string | number, asPercentage: boolean = false): void`**<br>

It also accepts a second parameter to set the value as a percentage of the max value and include the '%' at the end. Defaults to `false`, which will return the value as a fraction of the max value (for use with `scaleX` or `scaleY`).

It only works when the **CAN** data set is available.

The result of these methods is the same as calling `setRootCSS` with the `--<gauge-name>-gauge-bar` property. Ensure that the `--<gauge-name>-gauge-bar` property is set on the CSS file with default values for a better experience.

Reminder: Some values don't start at zero, which can affect the correct representation of the bar - e.g. AFR start at 8 (8 to 20) - so passing the value with the correct offset is recommended.

`value`: The actual value to be calculated by the method.

`asPercentage`: Whether to return the value as a percentage of the max value or as a fraction of the max value. Defaults to `false`.
```js
setCLTBar(80); // input: 80 -> output: 0.66 - assuming 120 as the max value for CLT
setMATBar(80, true); // input: 80 -> output: 72.7% - assuming 110 as the max value for MAT
setOilPressBar(3); // input: 3 -> output: 0.3 - assuming 10 as the max value for oil pressure
```
<br>

### `fuelLevelFormat(value: string | number): string`
Formats the fuel level value to a safely readable format. It returns a range from 0 to 100, removing any decimal places and values out of range.

`value`: The value to format.
```js
fuelLevelFormat(72.25); // output: 72
fuelLevelFormat(103); // output: 100
```
<br>

### `loadOdo(odoTotal: HTMLElement, odoTrip: HTMLElement, value: string | number): void`
Sets the value of both odometer elements. It is useful to load the values every time the skin is loaded by passing zero as the value.

The value to be passed is the increment of the odometer, not the total value. e.g. If the total odometer is 1000 and the trip odometer is 200, passing 1.24 will set the total odometer to 1001 and the trip odometer to 201.

Fractional values will be rounded to the nearest integer.

`odoTotal`: The element to set the total odometer value of.

`odoTrip`: The element to set the trip odometer value of.

`value`: The value to set.

```js
 // Saved values - totalOdo: 1000, tripOdo: 200
loadOdo(totalOdo, tripOdo, 0); // totalOdo: 1000, tripOdo: 200
loadOdo(totalOdo, tripOdo, 1.74); // totalOdo: 1002, tripOdo: 202
```
<br>

### `updateOdo(odoTotal: HTMLElement, odoTrip: HTMLElement, value: string | number): void`
This method is similar to `loadOdo` but doesn't update the odometer unless necessary. It was designed to be used within the real-time data stream and depends on a specific property within both **Basic** and **CAN** data sets - `odoNow`.

Updating the odometer is a critical task and must be implemented within your skin's scripting with good priority. It's recommended to call this method inside your `bindRealtimeData` method.

`odoTotal`: The element to set the total odometer value of.

`odoTrip`: The element to set the trip odometer value of.

`value`: The value to set.

```js
const useCANForVSS = useCanChannel('sVss'); // 'sVss' = Source VSS in User Settings
updateOdo(kmTotal, kmTrip, useCANForVSS ? canData.odoNow : basicData.odoNow)
```
<br>

### `useCanChannel(channel?: string): boolean`
Returns `true` if the given channel is available and should be used to get data from the **CAN** data set. If no channel is given, it returns `true` if the **CAN** data set is available.

This method can be used to verify what source the user has selected to get the data from the given channel. It must be used to check every channel that can be available on both **CAN** and **Basic** data sets. e.g. RPM, VSS, CLT, etc.

If the user has selected **CAN** as the source for the given channel, it will return `true`, and you should use the **CAN** data set to get the data. If the user has selected **Internal Module (Basic)** as the source, it will return `false`, and you should use the **Basic** data set to get the data.

`channel`: The channel to check. Defaults to `undefined`. Please take a look at the **data set** section below for a list of available channels.

```js
const useCANForRPM = useCanChannel('sRpm');  // 'sRpm' = Source RPM in User Settings - returns true if CAN is selected
// ...
const bindRealtimeData = () => {
  updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'RPM'))
}
```
<br>

### ⚡ Available data sets

### ⚪ **Basic** data set
The **Basic** data set is available on all Ghost Dashboard hardware and contains the most common channels used in automotive applications. It is the default data set and is always available, even if the user has selected **CAN** as the source for a given channel or disabled it completely.

To read the data from this data set, you can access the `basicData` object, which is available on the global scope and can be accessed anywhere in your script.

**Available channels:**

| Channel | Description | Type | Unit | Decimal places | Min | Max |
| --- | --- | --- | --- | --- | --- | --- |
| `rpm` | Engine speed | `number` | RPM | 0 | 0 | 10000 |
| `kmh` | Vehicle speed (higher refresh rate, lower accuracy) | `number` | km/h | 0 | 0 | 999 |
| `kmhF` | Vehicle speed (lower refresh rate, higher accuracy) | `number` | km/h | 0 | 0 | 999 |
| `clt` | Coolant temperature | `number` | °C | 0 | -40 | 150 |
| `lvlFuel` | Fuel level (higher refresh rate, lower accuracy) | `number` | % | 0 | 0 | 100 |
| `lvlFuelF` | Fuel level (lower refresh rate, higher accuracy) | `number` | % | 0 | 0 | 100 |
| `odoNow` | Trip odometer  | `number` | km | 3 | 0 | 100 |
| `turnLeft` | Turn signal left | `number` | binary | - | 0 | 1 |
| `turnRight` | Turn signal right | `number` | binary | - | 0 | 1 |
| `parkLights` | Parking lights | `number` | binary | - | 0 | 1 |
| `fogLights` | Fog lights | `number` | binary | - | 0 | 1 |
| `auxLights` | Auxiliary lights | `number` | binary | - | 0 | 1 |
| `highBeam` | High beam | `number` | binary | - | 0 | 1 |
| `eBrake` | E-brake | `number` | binary | - | 0 | 1 |
| `battAlt` | Alternator/Battery | `number` | binary | - | 0 | 1 |
| `ECUErr` | Engine light | `number` | binary | - | 0 | 1 |
| `oilSwitch` | Oil pressure switch | `number` | binary | - | 0 | 1 |
| `rearDefrost` | Rear windshield defroster | `number` | binary | - | 0 | 1 |
| `fan` | Readiator Fan On | `number` | binary | - | 0 | 1 |
| `openDoor` | Door open | `number` | binary | - | 0 | 1 |
| `airbag` | Airbag | `number` | binary | - | 0 | 1 |

> [!NOTE]
> All binary values represent a reverse logic, meaning `0` is ON and `1` is OFF.

<br>

### ⚪ **CAN** data set
The **CAN** data set is only available on Ghost Dashboard hardware that supports CAN and contains the most common channels used in automotive performance instrumentation. It is available when the user enables the **CAN** communication and there's a valid CAN connection.

To read the data from this data set, you can access the `canData` object, which is available on the global scope and can be accessed anywhere in your script.

**Available channels:**

| Channel | Description | Type | Unit | Decimal places | Min | Max |
| --- | --- | --- | --- | --- | --- | --- |
| `rpm` | Engine speed | `number` | RPM | 0 | 0 | 10000 |
| `vss` | Vehicle speed | `number` | km/h | 0 | 0 | 999 |
| `tps` | Throttle position | `number` | % | 1 | 0 | 100 |
| `map` | Manifold absolute pressure | `number` | BAR | 2 | 0 | 10 |
| `clt` | Coolant temperature | `number` | °C | 0 | -40 | 150 |
| `mat` | Manifold air temperature | `number` | °C | 0 | -40 | 150 |
| `oilPress` | Oil pressure | `number` | BAR | 1 | 0 | 20 |
| `oilTemp` | Oil temperature | `number` | °C | 0 | -40 | 150 |
| `fuelPress` | Fuel pressure | `number` | BAR | 1 | 0 | 20 |
| `gear` | Gear | `string` | - | 0 | `P/N/R` | 10 |
| `lambda` | Lambda | `number` | - | 2 | 0 | 2 |
| `afr` | Air/fuel ratio | `number` | - | 2 | 8 | 20 |
| `batt` | Battery voltage | `number` | V | 2 | 0 | 20 |
| `boost` | Boost pressure | `number` | BAR | 2 | 0 | 20 |
| `odoNow` | Trip odometer | `number` | km | 3 | 0 | 999 |
| `mapbar` | Special map/boost bar value | `string` | - | 2 | 0 | 20 |

> [!NOTE]
> - The `gear` channel returns a string value, which can be `P`, `N`, `R`, or a number from 1 to 10.
> - The `mapbar` channel is a special value used by the `mapBarFormat` method to calculate the value for the map/boost bar. It is not meant to be used directly.
> - Besides the global `canData` object, the global variable `isECUOnline` is also available and can be used to check if the ECU is online and sending data. It returns `true` if the ECU is online and `false` if it's offline.
```js
const useCAN = useCanChannel();  // returns true if CAN is enabled and available
const useCANForRPM = useCanChannel('sRpm');  // 'sRpm' = Source RPM in User Settings - returns true if CAN is selected
const useCANForVSS = useCanChannel('sVss');  // 'sVss' = Source VSS in User Settings - returns true if CAN is selected
// ...
const updateRPM = (rpm) => { ... }
const updateVSS = (vss) => { ... }

const bindRealtimeData = () => {
   updateRPM(useCANForRPM ? canData.rpm : safeReturn(basicData, 'RPM'))
   updateVSS(useCANForVSS ? canData.vss : safeReturn(basicData, 'kmh'))
}
// ...
```

<br>

# 📝 Collaborating
Have you found a bug or have a suggestion?<br>
Feel free to create issues and pull requests to help us improve the SDK and the skins.

Any suggestions, improvements and feedback are welcome and appreciated.

<br>

# 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The fonts used in the skins are licensed under the [SIL Open Font License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) and can be found for free at [Google Fonts](https://fonts.google.com/).

The icons used in the skins were created by [nrsleonardo](https://github.com/nrsleonardo)

<br>

# 📝 Changelog
All notable changes to this project will be documented in the [CHANGELOG](CHANGELOG) file.

<br>

# 📞 Support and Contact
If you have any questions or suggestions, please feel free to open an issue or contact us at:
- [Email](mailto:suporte@ghostdash.com.br)
- [Instagram](https://www.instagram.com/ghost.dashboard)
- [WhatsApp](https://api.whatsapp.com/send?phone=556792629793)
