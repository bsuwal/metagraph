var chk = "";
var dist1 = 0;
var dist2 = 0;
var dist3 = 0;
var dist4 = 0;
var cnt = 0;
function get_col(chkstr){
        var chk = chkstr;
        dist1=0;
        dist2=0;
        dist3=0;
        dist4=0;
        dist5=0;
        cnt=0;
        console.log("YAAA");

        grd.selectAll("rect").each(function(e){
            console.log(d3.select(e));
            for(var i=0;i<5;i++){
                console.log(d3.select(this).attr("districts"), "DISTRICTS");
             cnt += dist_wins[d3.select(this).attr("districts")[i]];   
            }

        
   
        

        var col = Math.sign(cnt) + 1;
        d3.select(this).style("fill", simp_fill[col]);
    
    });
}
var simp_fill = ['#0000ff','#808080','#ff0000'];

// create the svg
var grd = d3.select('#chart2').append('svg').attr("transform","translate(0,"+(-h/3) +")")
  .attr({
    width: 5*70,
    height: 5*70
  });


// calculate number of rows and columns
var squaresRow = 4;
var squaresColumn = 4;
var square=70;

// loop over number of columns
_.times(squaresColumn, function(n) {

  // create each set of rows
  var rows = grd.selectAll('rect' + ' .row-' + (n + 1))
    .data(d3.range(squaresRow))
    .enter().append('rect')
    

    
    
    
    
    .attr({
      class: function(d, i) {
        return 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1);
      },
      id: function(d, i) {
        return 's-' + (n + 1) + (i + 1);
      },
      width: square,
      height: square,
      x: function(d, i) {
        return (i * 1.07*square + 35);
      },
      y: (n * 1.07*square + 35),
    })
    
    .attr("party",0)
    .style("fill",elecfill[4])
    .style("stroke","#555")
    .style("stroke-width",5)
    
    
    
    .on("mouseover",function(d){
        d3.select(this).style("stroke","#000");
        d3.select(this).style("stroke-width","6");
    })
    
    .on("mouseout", function(d){
        d3.select(this).style("stroke","#555");
        d3.select(this).style("stroke-width","5")
    })
    
    .on("click",do_update)


});
    
    
function do_update(){    
        if (d3.event.defaultPrevented) return;

        var t = parseInt(d3.select(this).attr("party"));
        d3.select(this).attr("party", t+1);
        if (d3.select(this).attr("party") == 2){d3.select(this).attr("party",-1);}
  


    grd.selectAll('rect').each(function(d){
        //console.log(d3.select(this).attr("party"));
        if (d3.select(this).attr("party") == 0) d3.select(this).style("fill", elecfill[4]);
        if (d3.select(this).attr("party") == 1) d3.select(this).style("fill", elecfill[8]);
        if (d3.select(this).attr("party") == -1) d3.select(this).style("fill", elecfill[0]);

    });


    
        vis3.selectAll("circle.node").each(function(d){
            var hld = this;
            chk = d3.select(this).attr("str_rep");
   
    
        dist1=0;
        dist2=0;
        dist3=0;
        dist4=0;
        cnt=0;
    

        grd.selectAll("rect").each(function(e){
            var b = parseInt(d3.select(this).attr("party"));
            if (chk[cnt] == 1){
            dist1 = dist1 + b;
            } else  if (chk[cnt] == 2){
            dist2 = dist2 + b;
            }else   if (chk[cnt] == 3){
            dist3 = dist3 + b;
            }else   if (chk[cnt] == 4){
            dist4 = dist4 + b;
                       }
            cnt = cnt+1;

        });
        dist1 = Math.sign(dist1);
        dist2 = Math.sign(dist2);
        dist3 = Math.sign(dist3);
        dist4 = Math.sign(dist4);
        
        var col = Math.sign(dist1 + dist2 + dist3 + dist4) + 1;
        d3.select(this).style("fill", simp_fill[col]);
        });
    }
    
do_update;
    
 
    
  
    
    
    






    
    
    
    
