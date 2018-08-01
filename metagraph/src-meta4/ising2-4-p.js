var chk = "";
var dist1 = 0;
var dist2 = 0;
var dist3 = 0;
var dist4 = 0;
var cnt = 0;




// create the svg
var grd2 = d3.select('#chart3').append('svg')
.attr("transform","translate("+(w-wp)/4+","+(-h/3) +")")
  .attr({
    width: 5*square,
    height: 5*square
  });

var grd2grp = grd2.append("g")
// calculate number of rows and columns
var squaresRow = 4;
var squaresColumn = 4;

// loop over number of columns
_.times(squaresColumn, function(n) {
    
    
    
  var rows = grd2grp.selectAll('rect' + ' .row-' + (n + 1))
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
        return (i * 1.07*square + square/2);
      },
      y: (n * 1.07*square + square/2),
    })
    
    .attr("party",0)
    .attr("mask",0)
    .style("fill",simp_fill[2])
    .style("stroke","#555")
    .style("stroke-width",0)
    


  var rows = grd2grp.selectAll('rect' + ' .row-' + (n + 1))
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
      height: square/2,
      x: function(d, i) {
        return (i * 1.07*square + square/2);
      },
      y: (n * 1.07*square + square/2),
    })
    
    .attr("party",.5)
    .attr("mask",2)
    .style("fill",simp_fill[0])
    .style("stroke","#555")
    .style("stroke-width",0)
    




    

  // create each set of rows
  var rows = grd2grp.selectAll('rect' + ' .row-' + (n + 1))
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
        return (i * 1.07*square + square/2);
      },
      y: (n * 1.07*square + square/2),
    })
    
    .attr("mask",3)
    .style("fill","black")
    .style("stroke","#555")
    .style("stroke-width",5)
    .style("fill-opacity",0)
    
    
    
    .on("mouseover",function(d){
        d3.select(this).style("stroke","#000");
        d3.select(this).style("stroke-width","6");
    })
    
    .on("mouseout", function(d){
        d3.select(this).style("stroke","#555");
        d3.select(this).style("stroke-width","5")
    })
    
    .on("click",do_update)
    .on("contextmenu",do_updaterc)


});
    
    
function do_update(){    
        if (d3.event.defaultPrevented) return;
        var clid = d3.select(this).attr("id");



  

    grd2grp.selectAll('rect').each(function(d){
        
        if (d3.select(this).attr("mask") == 2 && d3.select(this).attr("id") == clid){ 
            var tempw = parseInt(d3.select(this).attr("height"));
            if (parseInt(tempw)>= square){d3.select(this).attr("height",0);}
            else{
                d3.select(this).attr("height", tempw + (square/10.0));
            }
            
            
                d3.select(this).attr("party", parseInt(d3.select(this).attr("height"))/square);
            
            
        }
        
    });


    
        vis5.selectAll("circle.node").each(function(d){
            var hld = this;
            chk = d3.select(this).attr("str_rep");
   
    
        dist1=0;
        dist2=0;
        dist3=0;
        dist4=0;
        cnt=0;
    

        grd2grp.selectAll("rect").each(function(e){
            if (d3.select(this).attr("mask") == 2){
            var b = parseFloat(d3.select(this).attr("party"));
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
            }

        });
        dist1 = Math.sign(2-dist1);
        dist2 = Math.sign(2-dist2);
        dist3 = Math.sign(2-dist3);
        dist4 = Math.sign(2-dist4);
        var col = Math.sign(dist1 + dist2 + dist3 + dist4) + 1;
        d3.select(this).style("fill", simp_fill[col]);
        });
    }

    
    
    
    
    
 function do_updaterc(){    
        if (d3.event.defaultPrevented) return;
        d3.event.preventDefault();
        var clid = d3.select(this).attr("id");



  

    grd2grp.selectAll('rect').each(function(d){
        
        if (d3.select(this).attr("mask") == 2 && d3.select(this).attr("id") == clid){ 
            var tempw = parseInt(d3.select(this).attr("height"));
            
            if (parseFloat(tempw)<= 0){d3.select(this).attr("height",square);}
            else{
                d3.select(this).attr("height", tempw - (square/10.0));
            }
            
            
                d3.select(this).attr("party", parseInt(d3.select(this).attr("height"))/square);
            
            
        }
        
    });


    
        vis5.selectAll("circle.node").each(function(d){
            var hld = this;
            chk = d3.select(this).attr("str_rep");
   
    
        dist1=0;
        dist2=0;
        dist3=0;
        dist4=0;
        cnt=0;
    

        grd2grp.selectAll("rect").each(function(e){
            if (d3.select(this).attr("mask") == 2){
            var b = parseFloat(d3.select(this).attr("party"));
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
            }

        });
        dist1 = Math.sign(2-dist1);
        dist2 = Math.sign(2-dist2);
        dist3 = Math.sign(2-dist3);
        dist4 = Math.sign(2-dist4);
        var col = Math.sign(dist1 + dist2 + dist3 + dist4) + 1;
        d3.select(this).style("fill", simp_fill[col]);
        });
    }   
do_update;
    
 
    
  
    
    
    






    
    
    
    
