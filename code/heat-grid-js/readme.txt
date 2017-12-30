Heat Grid Simulator

A coding challenge for JavaScript, and later for front-end framewoks and libraries like React, Angular and so on.

Ideally, there is a radio box where you can choose the size of the grid: 3x3, 5x5, 7x7, or 11x11. When you select the size, you will see a grid of that size. Each box in the grid is 26x26 pixels, with a 2 pixel border.

When you click on a square in the grid, it toggles whether it is selected. If it is selected, you will see a 1 pixel border around the square.

All the squares have a temperature. The initial temperature for every box is 0 degrees. Selected squares have their temperature increase by 1 degree each time interval.

Each time interval, the heat spreads out. For each square in the grid, calculate the average temperature of the square and its neighbors. Average that, and that becomes that square's new temperature.

So, for example, if you have a 3x3 grid, and you select the middle box, that temperature would go to 1. But each of the neighbors would get some of that heat, so it dissipates.

By playing around in Excel, it looks like it would be most best to always take the sum of 9 numbers - the number you are calculating and neighbors on all sides. Then divide this by 9.

If a cell is not on the edge, this is normal. But for those cells on the edge, we are including 0-degree invisible cells that are off the grid. This might be like the heat dissipating out of the system entirely. I think it makes the heat dissipation very realistic.

(The alternative is to average with only 4 or 6 cells for the cells on the edge. Mathematically, these will end up with more heat than others with more neighbors. This might be realistic if the grid were surrounded by something that retains all the heat. That might be another option for the system. But I don't like it that way and will do it the first way to start.)

We should represent how hot each cell is by changing the color. We could have the coldest cells be black, and a different color depending on how hot it is.

One way is to go through the rainbow: red, orange, yellow, green, indigo, violet. But I don't think that's the best way to represent it.

2 ideas: The first is take a color like red and just use a color gradient from a cool red to a hot red. The second is to get a spectrum of what hot matter looks like, the red being the cooler and blue being the hotter.

Interesting heat map articles:
http://www.andrewnoske.com/wiki/Code_-_heatmaps_and_color_gradients

http://www.blksmth.com/heat_colors.htm

We should also have controls where we can speed up or slow down time. It starts at 1 second per heat interval, but we can speed it up. Does up go to 2 heat intervals per second? Then 3? That might be best.

I should try to keep MVC (model, view, controller) separate: The data (what is the current temperature of each cell), the view (the way the grid looks on the screen) and the controller (mouse clicking to turn on or off the heat) as separate as possible.

Ok, so what are the steps?

[x] Set up the HTML and CSS for one size of grid, perhaps the 3x3
[x] Set up the data in JavaScript
[x] Set up click to select, click again to deselect
[x] Make a loop of heat intervals, and start the temperature calculations
[x] Figure out a color scheme, and make the hot cells different colors
[x] Add the speed controls to make time move faster or slower
[x] Add the radio button so the user can change the size of the grid
[x] Bonus - add a button to turn on / turn off all the cells
[x] make the website responsive so it looks good on a tablet
[x] would like to change the color of the numbers for the yellows so they are more readable
[ ] would maybe like to change the colors of the borders (red and black) so they are always recognizable
