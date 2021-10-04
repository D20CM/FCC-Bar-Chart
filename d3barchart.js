
let scott = function() {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    
    .then(data => {
         let dataset = JSON.stringify(data);
         dataset = JSON.parse(dataset);
         // console.log(dataset);
    
    
    let values = data.data.map(function (item) {
      // console.log("meh " + item[1]);
        return parseFloat(item[1])
      });
    
    let maxValue = d3.max(values);
    let minValue = d3.min(values);
    
    let dateArray = data.data.map(function (item){
          return item[0]
      })
    
    const firstDate = new Date (d3.min(dateArray)).toLocaleDateString();
    const lastDate = new Date (d3.max(dateArray)).toLocaleDateString();
    
    // console.log(firstDate + ", " + lastDate)
    // console.log(d3.max(values) + ", " + d3.min(values));
    // console.log(dataset.data[6][1]);
    
    const w = 800;
    const h = 400;
    const padding = 50;
    
    const xScale = d3.scaleTime()
                    .domain([new Date (firstDate), new Date (lastDate)])
                    .range([padding , w - padding])
                    
    const yScale = d3.scaleLinear()
                    .domain([0, maxValue])
                    .range([h - padding, padding])
    
    const svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("class","svg");
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)
     
    svg.append("text")
        .text("Gross Domestic Product ($billion)")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -h/2)
        .attr("y",padding + 20)
        .attr("class", "axis-label")
    
    svg.append("text")
        .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
        .style("text-anchor", "end")
        .attr("x", w-10)
        .attr("y", h-10)
        .attr("class", "axis-label")
       
    var tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        // .attr("data-date", "")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "grey")
        .text("a simple tooltip");
    
    let datesArr = dataset.data.map( (item) => { return new Date(item[0])});
    
    svg.selectAll("rect")
        .data(dataset.data)
        .enter()
        .append("rect")
        .attr("x", (d,i) => {
            return xScale(datesArr[i])
        })
        .attr("y", (d,i) => yScale(d[1]))
        .attr("width", 2)
        .attr("height", (d,i) => h - yScale(d[1]) - padding)
        .attr("fill", "blue")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .on("mouseover", function(e,d){
    
            let year = d[0].substring(0,4);
            let month = d[0].substring(5,7);
            let quarter;
            switch(month){
                case "01": 
                quarter = "1st Quarter";
                break;
    
                case "04":
                    quarter = "2nd Quarter";
                    break;
    
                case "07":
                    quarter = "3rd Quarter";
                    break;
    
                case "10":
                    quarter = "4th Quarter";
                    break;
            }
            
            tooltip.attr("data-date", d[0])
            tooltip.text(year + " " + quarter + ": $" + d[1] + " billion"); 
            return tooltip
                    .style("visibility", "visible");
        })
      
        .on("mousemove", function(event, d){
            return tooltip
                    .style("top", (event.pageY-10)+"px")
                    .style("left",(event.pageX+10)+"px");
        })
      
        .on("mouseout", function(){
            return tooltip
                    .style("visibility", "hidden");
        });
    
    
    
    // svg.selectAll("text")
    //     .data(dataset)
    //     .enter()
    //     .append("text")
    //     .attr("x", (d, i) => {
    //         return xScale(datesArr[i]) + 2
    //     })
    //     .attr("y", (d, i) => yScale(d[1]))
    //    .attr("class","label")
    //    .style("fill","black")
    // //    .text((d) => d)
    //    .text("boom")
    // //    .text("test")
    
    })
    
    }
    
    scott();
    