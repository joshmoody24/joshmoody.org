---
title: "How Many Input Combinations Do Video Game Controllers Have?"
description: "Video game controllers have many input mechanisms. Let's count how ways you can combine them!"
heroImage: "/video-game-controllers/snes-gamepad.webp"
pubDate: "Dec 18, 2024"
---

## Video Game Controllers Have Many Degrees of Freedom

I love video games that utilize [knowledge-based unlocks](https://www.youtube.com/watch?v=tkv05ZO7d8I). These games hide secrets that players can technically access right away, but they lack the knowledge to do so. My favorite games that do this are [_Outer Wilds_](https://www.mobiusdigitalgames.com/outer-wilds-text-adventure.html), [_Void Stranger_](https://store.steampowered.com/app/2121980/Void_Stranger/), and [_Tunic_](https://tunicgame.com/).

_Tunic_, in particular, hides several secrets behind obscure combinations of button presses that the player is very unlikely to stumble upon by accident.

(don't worry, no spoilers)

My question is, exactly _how_ unlikely is it that a player will discover these types of secrets accidentally? The answer depends on the input device. Specifically, it depends on how many possible combinations of inputs the controller has.

Out of sheer curiosity, I decided to count them!

This chart summarizes my findings:

![Chart of the growth of video game controller possible input states over time](/video-game-controllers/controller-input-states-over-time.png)

Surprising no one, video game controllers have gotten more complex over time. But they haven't gotten _slightly_ more complex. Not even _considerably_ more complex. They have become **many orders of magnitude** more complex.

Let's examine each controller individually, starting small and working our way up. I'll explain as we go.

## Atari 2600 Joystick

![Atari 2600 joystick](/video-game-controllers/atari-joystick.jpg)

The Atari 2600 has the simplest controller I know of. It consists solely of one 8-way joystick and one button.

The joystick has 9 possible states: neutral, up, down, left, right, and 4 diagonals, and the button has two: pressed and not pressed. This means that the controller can be in one of 9 &times; 2 = 18 possible input states at any given moment.

From now on I'll represent this calculation in tables. The multiplying all the values in the right column results in the total number of combinations:

| Input     | Possible States |
| --------- | --------------- |
| Joystick  | 9               |
| Button    | 2               |
| **Total** | **18**          |

## Thumby

![Thumby handheld console](/video-game-controllers/thumby.webp)

The Thumby is an adorably tiny gaming handheld. I have one on my backpack.

It has a D-pad instead of a joystick, but for our purposes those are equivalent.

The only relevant difference between the Thumby and the Atari 2600 is that the Thumby has one extra button, meaning it has twice as many possible input states.

Having multiple buttons on the right side of a controller is such a common pattern that I will lump them together as "face buttons." The total number of states for face buttons is 2<sup>_n_</sup>, where _n_ is the number of face buttons.

| Input                 | Possible States |
| --------------------- | --------------- |
| D-pad                 | 9               |
| Face button &times; 2 | 4               |
| **Total**             | **36**          |

## NES Controller

![NES Controller](/video-game-controllers/nes-gamepad.jpg)

The NES controller introduces two new buttons: start and select. In practice, these buttons are typically used for pausing or menus. It's rare to see these buttons used in combinations with other buttons.

That's a prime opportunity to stash a secret!

| Input                 | Possible States |
| --------------------- | --------------- |
| D-pad                 | 9               |
| Face button &times; 2 | 4               |
| Start / Select        | 4               |
| **Total**             | **144**         |

## SNES Controller

![SNES Controller](/video-game-controllers/snes-gamepad.jpg)

Every new button increases the number of states exponentially. The SNES controller introduces two more face buttons and shoulder buttons. For specificity, I'll refer to the shoulder buttons as "bumpers."

| Input                 | Possible States |
| --------------------- | --------------- |
| D-pad                 | 9               |
| Face button &times; 4 | 16              |
| Start / Select        | 4               |
| Bumper &times; 2      | 4               |
| **Total**             | **2,304**       |

## PlayStation 1 Controller

![PlayStation 1 Controller](/video-game-controllers/ps1-controller.jpg)

The original PlayStation controller introduces a secondary type of shoulder button: the trigger. Otherwise, it's identical to the SNES controller.

| Input                 | Possible States |
| --------------------- | --------------- |
| D-pad                 | 9               |
| Face button &times; 4 | 16              |
| Start / Select        | 4               |
| Bumper &times; 2      | 4               |
| Trigger &times 2      | 4               |
| **Total**             | **9,216**       |

## Nintendo 64 Controller

![N64 Controller](/video-game-controllers/n64-controller.jpg)

Now the real fun begins: analog sticks.

The N64's analog stick can be tilted 360 degrees at varying levels of pressure. That's an infinite number of states! 😱

Well, technically not infinite.

[The N64 analog stick is a surprisingly deep rabbit hole](https://n64squid.com/n64-joystick-360-degrees/). It uses an optical sensor (unusual) which outputs two 8-bit numbers — one for each axis. Theoretically, that's 65,536 possible states.

But in practice, it's signficantly fewer, for two reasons:

- The stick is an octagon, so diagonals have reduced range of motion.
- As N64 controllers age, they lose flexibility. The developer documentation recommends using slightly less than half the maximum range.

Together, these limitations mean the practical number of possible states is somewhere around 13,000.

(That's napkin math. If anyone ever calculates the exact number, please let me know. [Here's my source for the numbers](https://n64squid.com/n64-joystick-360-degrees/).)

That said, the average Joe doesn't care about all those states. I think it's more realistic to say that analog sticks have 17 possible states: 8 directions (cardinal + diagonal), multiplied by 2 to account for the intensity of the tilt. Plus one for neutral.

| Input                 | Possible States |
| --------------------- | --------------- |
| Analog stick          | 17              |
| D-pad                 | 9               |
| Face button &times; 6 | 64              |
| Start                 | 2               |
| Bumper &times; 2      | 4               |
| Trigger               | 2               |
| **Total**             | **156,672**     |

## GameCube Controller

![GameCube Controller](/video-game-controllers/gamecube-controller.jpg)

Don't get comfy yet. Now there are 2 analog sticks!

I'm not sure whether to count the C-stick as 17 states or 9. Due to its small size, few games utilize the tilt intensity in a meaningful way. I'll stick with 17 for consistency.

The GameCube controller's triggers are analog as well. I'm going to count this as 3 states for per trigger: neutral, soft squeeze, and hard squeeze.

Random side note: the GameCube controller only has one bumper. I've always wondered why.

| Input                    | Possible States |
| ------------------------ | --------------- |
| Analog stick &times; 2   | 289             |
| D-pad                    | 9               |
| Face button &times; 4    | 16              |
| Start                    | 2               |
| Bumper                   | 2               |
| Analog trigger &times; 2 | 9               |
| **Total**                | **1,498,176**   |

## DualShock (PlayStation 2 Controller)

![DualShock Controller](/video-game-controllers/dualshock.jpg)

Yet another twist: the DualShock's sticks can be pressed like a button, doubling their possible states! That's (17 &times; 2)<sup>2</sup> = 1,156 states just from the sticks!

Imagine a game where clicking both sticks and pushing them in opposite directions is a useful input. I want it.

I'm going to ignore the "analog" button in the middle of the controller, since as far as I know it was only used for disabling the "analog-ness" of the sticks to make PS1 games easier to play.

| Input                            | Possible States |
| -------------------------------- | --------------- |
| Clickable analog stick &times; 2 | 1,156           |
| D-pad                            | 9               |
| Face button &times; 4            | 16              |
| Start / Select                   | 4               |
| Bumper &times; 2                 | 4               |
| Trigger &times; 2                | 4               |
| **Total**                        | **10,653,696**  |

## Wii Remote

![Wii Remote](/video-game-controllers/wii-remote.jpg)

If you thought things were complicated before, buckle up.

The Wii Remote seems pretty basic at first glance:

| Input     | Possible States |
| --------- | --------------- |
| D-pad     | 9               |
| A         | 2               |
| B         | 2               |
| + / -     | 4               |
| 1 / 2     | 4               |
| **Total** | **576**         |

Note that I'm not counting the home button, because it's reserved for the operating system. I'm only counting buttons that game developers can actually use in their games.

However, the table above doesn't take motion controls or the pointer into account!

The standard Wii Remote has a three-axis accelerometer, meaning it can detect acceleration in every direction. These accelerometers can also be used to measure rotation, albeit not very accurately (the _Twilight Princess_ marble-rolling minigame is the bane of my existence).

I believe the output from the accelerometers is analog, meaning basically infinite possible states, although [the WiiBrew wiki claims that each axis has 9-10 bits of precision](https://wiibrew.org/wiki/Wiimote#Normal_Accelerometer_Reporting:~:text=10%20bits%20of%20precision).

I'm going to count each axis as 5 states: neutral, soft positive acceleration, hard positive acceleration, soft negative acceleration, and hard negative acceleration.

Now for the IR pointer:

The Wii Remote has an IR camera used for pointing at the screen, sort of like a computer mouse. [The IR sensor has a resolution of 1024 &times; 768 pixels](https://pmc.ncbi.nlm.nih.gov/articles/PMC7218719/#:~:text=The%20Nintendo%20Wii%20Remote%20has,resolution%20of%201024%20%C3%97%20768.), meaning 786,432 states total, assuming a one-hot encoding of which pixel is being pointed at (an overly simplified assumption).

Obviously, no one's hands are steady enough to reliably aim at a single pixel. I'll assume that the minimum reasonable size for a pointer target is 24 &times; 24 pixels ([halfhearted justification](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)).

The Wii's output resolution is 640 &times; 480 ([rabbit hole](https://www.avsforum.com/threads/480i-widescreen-wii.765195/)). That means it can fit 26 targets horizontally and 20 vertically. That's 520 pointer states total, assuming

Here's the final count:

| Input                   | Possible States |
| ----------------------- | --------------- |
| D-pad                   | 9               |
| A                       | 2               |
| B                       | 2               |
| + / -                   | 4               |
| 1 / 2                   | 4               |
| Accelerometer &times; 3 | 125             |
| Pointer                 | 520             |
| **Total**               | **37,440,000**  |

Update: I've been informed that I didn't account for the fact that the sensor bar allows the Wii Remote to sense one axis of rotation and its distance from the sensor. The total above doesn't take these inputs into account 😭

## Wii Remote + Nunchuk

![Wii Remote and Nunchuk](/video-game-controllers/wii-remote-nunchuk.jpg)

The [Nunchuck's accelerometer](https://webgburnet.com/wp-content/uploads/2018/11/Nunchuck-datasheet.pdf) is essentially identical to the Wii Remote's. Now we have two of them. Exponential growth, baby.

| Input                   | Possible States     |
| ----------------------- | ------------------- |
| Wii Remote              | 37,440,000          |
| Analog stick            | 17                  |
| C                       | 2                   |
| Z                       | 2                   |
| Accelerometer &times; 3 | 125                 |
| **Total**               | **318,240,000,000** |

## Wii Remote + Wii MotionPlus

![Wii Remote with MotionPlus](/video-game-controllers/wii-remote-motionplus.jpg)

The MotionPlus accessory adds [two gyroscopes](https://arduino-projects4u.com/wii-motion-plus/#:~:text=two%20gyro%20sensors) to the Wii Remote to increase motion control fidelity.

This calculation is left as an exercise for the reader.

## Keyboard

![8BitDo Retro Mechanical Keyboard](/video-game-controllers/retro-keyboard.jpg)

The most common type of US keyboard has 104 keys. Most keyboards support pressing 6 keys at once.

| Input     | Possible States       |
| --------- | --------------------- |
| Key 1     | 104                   |
| Key 2     | 103                   |
| Key 3     | 102                   |
| Key 4     | 101                   |
| Key 5     | 100                   |
| Key 6     | 99                    |
| **Total** | **1,092,514,737,606** |

The 6 at the end represents the neutral and partially-neutral states, e.g., no keys pressed, only the first key pressed, etc.

That's a pretty mind-boggling number of combinations, but that's child's play compared to the final one.

## Joy-Con Pair (Nintendo Switch)

![Pair of Joy-Con Controllers](/video-game-controllers/joycons.webp)

Joy-Cons are the final boss — the number of dimensions at play is frankly horrifying.

Like the Wii Remote + Wii MotionPlus, each Joy-Con has accelerometers and gyroscopes.

Another new (and weird) element in the mix is an IR camera with 320 &times; 240 resolution on the right Joy-Con. It's hardly ever used, and for the purposes of this estimate I'm going to treat it as a binary on-off input, since that's roughly how it's used in the game _1-2 Switch_.

I'm also making a few other assumptions:

- Despite technically being able to press opposite directions on the D-pad at the same time, this should not be counted because other Switch controllers (e.g., Switch Pro Controller) do not support this.
- For each rotational axis, each 10-degree slice counts as one state (my hands shake, okay?), meaning 36 states per axis.
- Home and screenshot buttons don't count because they're controlled by the operating system.
- The SL/SR buttons are only intended for use when using an individual Joy-Con and are equivalent to ZL/ZR. Thus, they should not be counted separately.
- Amiibo shouldn't count because they're external to the controller itself.

| Input                            | Possible States                 |
| -------------------------------- | ------------------------------- |
| Clickable analog stick &times; 2 | 1,156                           |
| Face button &times; 4            | 16                              |
| D-pad                            | 9                               |
| + / -                            | 4                               |
| Bumper &times; 2                 | 4                               |
| Trigger &times; 2                | 4                               |
| IR camera                        | 2                               |
| Accelerometer &times; 6          | 15,625                          |
| Rotational axis &times; 6        | 2,176,782,336                   |
| **Total**                        | **724,711,789,559,808,000,000** |

Joy-Cons have **724 quintillion** possible input combinations 😵

And that's not even counting the touchscreen!

## Further Ideas

The calculations above are the _theoretical_ number of possible input states.

In practice, it's unreasonable to expect players to twist their hands into a knot to hit unholy combinations like A + B + Top-Left + Select + Start + Left Bumper + Left Trigger.

I want to calculate the realistic number of possible states. Perhaps a maximum of 3 inputs per side of the controller. More thought is needed here.

Here are some other ideas to take this concept further:

- Account for inputs over time. Some games take a different action when the button is held down, e.g., dodging versus sprinting in _Dark Souls_.
- Run the same analysis on musical instruments (I suspect Piano will win).

## Conclusion

If you want to hide cool secrets in a video game that can technically be accessed immediately but are unlikely to be discovered accidentally, develop for Nintendo Switch, not the Atari 2600.

The Nintendo Switch has 40 quintillion times more hiding places.
