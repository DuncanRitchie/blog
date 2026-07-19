---
title: Excel for data analysis
date: 2026-07-19 20:40:00
tags: [Software]
draft: false
---

# Excel for data analysis

I’m on a training course on data analysis, and the first module was on Excel.
I already knew a lot about Excel, but I now know even more.
Here is some of what I’ve learnt.

## Charts

<figure class="float-right" style="max-width: 480px;">
<img alt="Bullet chart comparing average sales for 2014–2019 with sales from 2018, across product categories for a fictional hardware store" src="./images/2026/example-bullet-chart.webp" width="480" style="aspect-ratio: 824 / 744;" />
<figcaption>The course provided this example of a bullet chart (the data are fictional)</figcaption>
</figure>

In Excel, we can draw bullet charts, which are bar charts with two series of data to compare.
For example, we can superimpose target values on top of the real values.
It can be nice to colour the targets grey and the other series red (if below the target) and green (if above the target).
Disappointingly, I’m not sure I can set the red/green distinction automatically, but at least I can apply the colours individually.

Waterfall charts, however, do show profit and loss in different colours automatically.

<figure>
<img alt="Waterfall chart showing quarterly changes in profits, for a fictional hardware store" src="./images/2026/waterfall-chart.webp" width="480" style="aspect-ratio: 800 / 397;" />
<figcaption>An example of a waterfall chart</figcaption>
</figure>

Here are some more tips and best practices with graphs:

- Charts with 3D effects are hard to read. Keep it simple.
- Try to start axes at zero whenever possible. Don’t if it would make the graph hard to read.
- Having a key message in the title can be nice (eg “A was top, now B is”).
- Otherwise, the chart title can be set to a cell value, if needed, using the formula bar.
- Red/amber/green should not be used except for bad/mid/good meaning.
- Chronological axes don’t need a title — obviously 2026 is a year.
- Avoid cluttering labels.
- Display units can be set in the “Number” part of the “Format Axis” pane.
- Smoothed lines on line-graphs are nice.
- Be careful when adding transparency to lines, because this can make them reset their hue, which is annoying.

## Pivot tables

I’ve also created my first pivot tables, pivot charts, and slicers.
It can sometimes be confusing which fields go into the Rows section and which go into the Columns, or Values, but it’s pretty powerful to see all the data summarised in a pivot table.

Rows in pivot tables can be grouped into custom groups from the right-click menu when several cells are selecteed.
Rows can also be grouped into same-size “buckets”, eg 0–25, 26–50, 51–75.

## `SWITCH` function

A simpler thing that was new to me was that Excel has a `SWITCH` function.
It behaves like a `switch` block in programming languages in that you specify a variable and a mapping of its possible values to the return values you want the function to output.
I think I’ll stick to using the `IFS` function a lot of the time, since it’s more flexible.

## Forecasting

More interestingly, we can do sensitivity analysis in Excel.
This looks at how much a dependent variable changes with the variable it’s dependent on.
There’s even a “Goal Seek” feature that can calculate the value of an independent variable that is needed to make a dependent variable a given value.
This all can be very useful for forecasting.

Speaking of forecasting, we can use existing data to predict future values.
We can choose our own weightings, so more recent data influence the forecast more than older data.
(Tip: weights should add up to 100%, especially if we’re writing a custom formula to use them.)

<figure class="float-left">
<img alt="Pane with a graph showing existent data and the forecast with upper and lower confidence bounds. Below that is some settings for the forecast." src="./images/2026/excel-forecast-wizard.webp" width="480" style="aspect-ratio: 686 / 707;" />
<figcaption>Excel’s Create Forecast Wizard</figcaption>
</figure>

Helpfully, Excel has a forecast worksheet wizard, and it can automatically detect seasonality (variation in the data according to the time of year).

Excel also has the functions `FORECAST.ETS`, for calculating a forecast value with “exponential triple smoothing”, and `FORECAST.CONFINT` for calculating the confidence interval on that.
For example, we might be 95% confident that the value of a metric in the future will be within the range of the forecast minus the confidence interval and the forecast plus the confidence interval.

This is always imprecise, with some level of subjectivity to the confidence intervals and weightings.
We need to be careful with sampling bias, where the data we’re working with don’t represent the total data fairly, and anchoring bias, where too much faith is put in early results and the model is not properly updated for newer data.

With that said, decent forecasts can be very helpful for informing business decisions.

More generally, I forecast that a lot of this Excel functionality will be useful to me!
