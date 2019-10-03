--- 

layout: default
title: hw3

---

# <img src="img/logo.png" width="30px"> CSCI339001 Visualization


## HW 3 - Building Interactive Visualization using D3


In this assignment, you will build an interactive visualization using D3. The objective of this assignment is to practice the **implementation skills** you learned from the labs so far and also to prepare for the final project. You will choose a topic and dataset of your interest similar to HW2.

You need to **scope this assignment** appropriately in order to complete it successfully within three weeks. Plan for building **a highly compact and tightly focused visualization with compelling interactivity**. Put your attention on a few data dimensions and implement simple graceful interactions. Please find [some examples](#step-3.-building-a-web-based-visualization-using-d3) below.

### Team Formation
This assignment is a group project. You should work in a team of **2-4 students**. This is also an opportunity for you to find partners for your final project as you can continue working in the same team. 

On **Github Classroom**, when accepting the assignment invitation, you should be able to **create a team or join an existing team**. In this way, your team will collaboratively work on a shared repository. You need to coordinate with your team members to decide which team repo name to use, who is going to create a team, and who will join the team. Please contact us if you have trouble signing up your team.


* **Github Classroom Assignment Invitation: [https://classroom.github.com/g/XwY987Qt](https://classroom.github.com/g/XwY987Qt)**

On **Canvas**, you are required to **self sign-up your team** under the HW3 group set. Please work with us if you have trouble managing the group.


### Part 1. Data Selection
Similar to HW2, you will need to find a **public** dataset in a topic of interest. Again, please start a search for the dataset as early as possible. Here is the list of potential sources:

* [Tableau Public Sample Data](https://public.tableau.com/en-us/s/resources?qt-overview_resources=1#qt-overview_resources)
* [FiveThirtyEight](https://data.fivethirtyeight.com/)
* [data.world](https://data.world/datasets/open-data)
* [Data Is Plural Archive](https://tinyletter.com/data-is-plural/archive)
* [Kaggle Datasets](https://www.kaggle.com/datasets)
* [Google Dataset Search](https://toolbox.google.com/datasetsearch)
* [UN Data](http://data.un.org/)
* [World Bank Open Data](https://data.worldbank.org/)
* [World Health Organization](https://www.who.int/gho/en/)
* [OECD](https://data.oecd.org/)
* [UNICEF](https://data.unicef.org/)
* [IMF (International Monetary Fund)](https://www.imf.org/en/Data)
* [NOAA (National Center for Environmental Information)](https://www.ncdc.noaa.gov/cdo-web/datasets)
* [U.S. Government Open Data](https://www.data.gov/)

We strongly recommend that you find a relatively **clean dataset** which does not require a lot of preprocessing. You are welcome to reuse the dataset you used for Tableau.



### Part 2 Implementation

#### Step 1. Exploratory Analysis

Once you have a dataset, you may want to **explore data** to gain ideas about **what data dimensions and measures** to show in your interactive visualization. Feel free to leverage your **Tableau** skills to perform exploratory analysis on the dataset and narrow down **what question** you want to address or **what message** you want to communicate through your interactive visualization.

#### Step 2. Sketching visualizations & user interactions

Before diving into the implementation, brainstorm and produce a set of rough sketches about your final visualizations and user interactions. What **visual marks and channels** do you think are the most appropriate for encoding the **most important aspects** of your data? What **interactions** can you use to show a **high-density** of information* in a limited space and enable **efficient exploration** of interesting trends, patterns, or outliers?


#### Step 3. Building a web-based visualization using D3

As mentioned above, try to implement a **well-scoped and tightly-focused** visualization enhanced with elegant interactions. Do not try to show everything about the data, instead focus on what **subset of the data** is most interesting. The following examples will be helpful for scoping your assignment. If you are building more than one visualization, try to coordinate them together through cohesive interaction design.


**Interactive Visualization Examples**
- [BabyVoyager](http://www.babynamewizard.com/voyager)
- [Global cities house-price index](https://www.economist.com/graphic-detail/2019/03/11/global-cities-house-price-index)
- [Atlas of Economic Complexity](http://atlas.cid.harvard.edu/explore) 
- [Zipdecode](https://benfry.com/zipdecode/)
- [NYC Foodiverse](http://nycfoodiverse.com/)
- [Music Timeline](https://research.google.com/bigpicture/music/)
- [Hack Your Way To Scientific Glory](https://fivethirtyeight.com/features/science-isnt-broken/#part1)
- [What's Your Pay Gap?](http://graphics.wsj.com/gender-pay-gap/)
- [This Chart Shows Who Marries CEOs, Doctors, Chefs and Janitors](https://www.bloomberg.com/graphics/2016-who-marries-whom/)
- [Tax Bill Calculator: Will Your Taxes Go Up or Down?](https://www.nytimes.com/interactive/2017/12/17/upshot/tax-calculator.html)
- [How Much Warmer Was Your City in 2018?](https://www.nytimes.com/interactive/2019/01/28/world/year-in-weather.html)
- [The Political Brain. How the Final Presidential Debate Played on the Subconscious Minds of Voters](http://politics.andyourbrain.com/debate/)

**Resources for Implementing Interactions**
- [Tooltip](https://github.com/caged/d3-tip)
- [Panning & zooming](https://observablehq.com/@d3/zoom)
- [Brushing](https://observablehq.com/@pstuffa/scatterplot-matrix-as-a-function)
- [Lasso](http://bl.ocks.org/skokenes/511c5b658c405ad68941)
- [Crossfilter](http://crossfilter.github.io/crossfilter/)
- [Sliders](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)
- [Autocomplete](https://tarekraafat.github.io/autoComplete.js/#/)
- [DimpVis](http://vialab.science.uoit.ca/dimpVis/)
- [Annotation](https://d3-annotation.susielu.com/)


**Resources for Implementing D3 Visualizations**
- [D3 Official Gallery](https://github.com/d3/d3/wiki/Gallery)
- [D3 Graph Gallery](https://www.d3-graph-gallery.com/)
- [Bl.ocks](https://blockbuilder.org/search?text=search)
- [Observable](https://observablehq.com/search?query=d3)

### Part 4. Submission

#### Final Deliverable

1. **Visualization** (`index.html`)
2. **Project description** (`about.html`)

In addition to your visualization (`index.html`), please include the following information in the `about.html`. Wright roughly a paragraph or more, along with images as necessary, for each point:

* A brief project information: motivations, design rationale for visual encoding decisions and interaction techniques, takeaways, etc.

* A brief info about the design and development process: alternatives tried, struggles, lessoned learned. Also mention how the workload was distributed among team members. 



<!-- 
#### Final Deliverable

You need to create a simple web page (no Javascript needed) to showcase your work. Overall, your web page should have two parts: 1) [embedded Tableau workbook](https://help.tableau.com/current/pro/desktop/en-us/shareworkbooks.htm#shareworkbooks.html) (an annotated chart, dashboard or Story Points) and 2) your **reflection on processes, findings, and lessons** learned. Also, don't forget to **mention the data source** in your workbook or web page.

In the reflection part, you essentially describe **the backstory of your project**. Imagine you are writing an article about your analysis. You can describe what you did in each stage, things that are not included in the workbook, alternative narrative designs you experimented. You should include **at least a paragraph and an image for each stage** (data selection, exploration, explanation stages). For example, why did you find the topic interesting, what were the questions you had, what hurdles did you run into? why did you decide not to include certain visualizations? what was your initial story structure? etc. -->


#### Submission on Canvas

Please find the Github Classroom assignment invitation here: [https://classroom.github.com/a/XwY987Qt](https://classroom.github.com/a/XwY987Qt).

As before, enable Github Pages and make your visualization available online. The url will be like this: ```https://bcviscourse.github.io/hw-3-[teamname]/```.

Finally, please submit the working url on Canvas. We will use the url to grade your homework. 

*Thank you!*