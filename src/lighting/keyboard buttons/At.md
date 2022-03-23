---
title: At
draft: true
authors: ["Ben MacDonald"]
# tags: []
---

::: tip
I am created by the page
:::

## Usage

<LightingKey name="At"/> has two primary usages:

The first is to signify that the next number you type into the command line is a lighting intensity.

The second is used when patching lights to enter the physical address of the fixture.
<br><br>
<LightingKey name="At"/> also lesser used functions. See below for more details.

## Examples

::::: collapsible multiple
:::: collapsibleItem Typical Usage
::: command
1, At, 45, Enter
:::
This example sets channel 1 to be at 45% intensity.
::::

:::: collapsibleItem Usage in Patch Mode
::: command
1, At, 2, Enter
:::
This example, tells the lighting board that channel 1 on the console should control the physical lighting instrument connected to address 2 in the theatre space.

::: note
In patch mode, <LightingKey name="At"/> will enter as <LightingKey name="Address"/>, representing the physical location the light is **at**.
:::
::::
:::::

### Lesser Used / Specific Examples

::::: collapsible multiple
:::: collapsibleItem Return a channel to the background intensity level
::: command
1, At, Enter
:::
::: note
The background level comes from either a previous cue or the lights home state from the home preset.
:::
::::

:::: collapsibleItem Change the value of non-intensity parameters
::: command
1, {Pan}, At, 50, Enter
:::
This example sets channel 1's `Pan` property to 50.<br><br>The `Pan` button can be accessed by clicking down on the encoder mapped to the `Pan` property, or by clicking `Pan` in the encoder display portion of the monitor (It might be in the triangle menu). If the encoders are not currently mapped to anything, terminate the command after specifying your target. The pan property should appear. Pressing the parameter will continue the command using implicit target selection.<br><br>If the parameter does not appear, it likely doesn't exist on the light.

::::

:::: collapsibleItem Reset all parameters in a parameter group to their background level
::: command
1, Color, At, Enter
:::

The example resets all properties in the `Color` Category.
::::
:::::

## On Keyboard

<LightingKey name="At"/> is mapped to `A` on a QWERTY keyboard
