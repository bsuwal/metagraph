var distfills = [
  "#7bc8f6",
  "#6fc276",
  "#0343df",
  "#bbf90f",
  "#6a79f7",
  "#475f94",
  "#13eac9",
  "#008000",
  "#800000",
  "#800080"
];


var saffron = [2, 3, 4, 5, 6, 7,
               19,
               20, 22, 23, 24, 25, 29,
               31, 32, 35, 36, 37,
               40, 41, 47, 49,
               50, 54, 59,
               60, 62, 63, 64, 66,
               70, 72, 79,
               80, 84, 85, 89,
               93, 98, 99
             ];


square_side = 10
var square7 = 32;
var square7sm = square7 / 1.25;
square7 = square7sm;
var square10sRow = 10;
var square10sColumn = 10;
red_this = 0;

function initialize_plan(grid_side) {
  plan = []
  for (let i = 1; i < grid_side + 1; i++) {
    for (let j = 0; j < grid_side; j++) {
      plan.push(i);
    }
  }
  return plan;
}

function initialize_plan_to_zeros(grid_side) {
  districts = {}
  plan = []
  for (let i = 0; i < grid_side * grid_side; i++) {
      plan.push(0);
  }
  return plan;
}

curr_plan = initialize_plan(square_side)
var curr_color = 1

function compute_edges(grid_side) {
  var edges = []
  // row edges
  for (let i = 0; i < grid_side; i++) {
    for (let j = 0; j < grid_side-1; j++) {
      edges.push([grid_side * i + j, grid_side * i + j + 1]);
    }
  }
  // col edges
  for (let i = 0; i < grid_side-1; i++) {
    for (let j = 0; j < grid_side; j++) {
      edges.push([grid_side * i + j, (grid_side * (i + 1)) + j]);
    }
  }
  return edges;
}

edges = compute_edges(square_side);

cell_cols = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

var r_win_i = [0, 0, 0, 0, 0, 0];
var b_win_i = [0, 0, 0, 0, 0, 0];
var n_win_i = [0, 0, 0, 0, 0, 0];
var rwin = 0;
var bwin = 0;

var can_chain = true;

var elecfill = [
  "#0000ff",
  "#5934df",
  "#7250c0",
  "#7d69a0",
  "#808080",
  "#aa7264",
  "#ca6048",
  "#e6462a",
  "#ff0000"
];

elecfill[0] = "#fca336";
elecfill[4] = "#909090";
elecfill[8] = "#857ab8";

var simp_fill = ["#1E1E26", "#909090", "#9E2825"];

var simp_fill_parts = ["#4a4a5e", "#909090", "#9e4b49"];
var simp_char = ["\u2663", "", "\u2665"];

opacity_red = 0.4;
opacity_blk = 0.15;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

party_init = [
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1
];
party_init = shuffle(party_init);

var parties = [-1, 1];

var gap = 2;


var voter_colors = ["#FBB917", "#C48793"];

// loop over number of columns
for (let n = 0; n < 1; n++) {

  var voter_grid = d3
    .select("#voter-d")
    .append("svg")
    .attr("width", (square7 + gap) * 2 + gap)
    .attr("height", (square7 + gap) * 1 + gap + 20);

    var rows = voter_grid
      .selectAll("rect" + " .row-" + (n + 1))
      .data(d3.range(2))
      .enter()
      .append("rect")

      .attr("class", function(d, i) {
        return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
      })
      .attr("id", function(d, i) {
        return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
      })
      .attr("width", square7sm)
      .attr("height", square7sm)
      .attr("x", function(d, i) {
        return (square7 + gap) * i + gap;
      })
      .attr("y", (square7 + gap) * n + gap)
      .style("fill", function(d, i) {
        return voter_colors[i];
      })
      .style("stroke", "#555")
      .style("stroke-width", 1)

      // .on("mouseover", function(d) {
      //   d3.select(this).style("stroke", "#000");
      //   d3.select(this).style("stroke-width", "3");
      // })

      // .on("mouseout", function(d) {
      //   d3.select(this).style("stroke", "#555");
      //   d3.select(this).style("stroke-width", "1");
      // });
  }

  // loop over number of columns
  for (let n = 0; n < 1; n++) {
    // create each set of rows
    var rows = voter_grid
      .selectAll("rect" + " .row-" + (n + 1))
      .data(d3.range(square_side))
      .enter()
      .append("rect")

      .attr("class", function(d, i) {
        return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
      })
      .attr("id", function(d, i) {
        return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
      })
      .attr("width", square7sm)
      .attr("height", square7sm)
      .attr("x", function(d, i) {
        return (square7 + gap) * i + gap;
      })
      .attr("y", (square7 + gap) * n + gap)
      .style("fill", function(d, i) {
        return voter_colors[i];
      })
      .style("stroke", "#555")
      .style("stroke-width", 1)

      // .on("mouseover", function(d) {
      //   //d3.select(this).style("stroke", "#000");
      //   d3.select(this).style("stroke-width", "3");
      // })
      //
      // .on("mouseout", function(d) {
      //   d3.select(this).style("stroke", "#555");
      //   d3.select(this).style("stroke-width", "1");
      // });
  }

// loop over number of columns
for (let n = 0; n < 1; n++) {

var color_grid = d3
  .select("#color-d")
  .append("svg")
  .attr("width", (square7 + gap) * square_side + gap)
  .attr("height", (square7 + gap) * 1 + gap + 20);

  var rows = color_grid
    .selectAll("rect" + " .row-" + (n + 1))
    .data(d3.range(square_side))
    .enter()
    .append("rect")

    .attr("class", function(d, i) {
      return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
    })
    .attr("id", function(d, i) {
      return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
    })
    .attr("width", square7sm)
    .attr("height", square7sm)
    .attr("x", function(d, i) {
      return (square7 + gap) * i + gap;
    })
    .attr("y", (square7 + gap) * n + gap)
    .style("fill", function(d, i) {
      return distfills[i];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("click", function(d) {
      d3.select(this).style("stroke-width", "3");
      d3.select(this).attr("stroke", "#333")
    })

    .on("mouseover", function(d) {
      //d3.select(this).style("stroke", "#000");
      d3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3.select(this).style("stroke", "#555");
      d3.select(this).style("stroke-width", "1");
    });

}

// loop over number of columns
for (let n = 0; n < 1; n++) {
  // create each set of rows
  var rows = color_grid
    .selectAll("rect" + " .row-" + (n + 1))
    .data(d3.range(square_side))
    .enter()
    .append("rect")

    .attr("class", function(d, i) {
      return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
    })
    .attr("id", function(d, i) {
      return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
    })
    .attr("width", square7sm)
    .attr("height", square7sm)
    .attr("x", function(d, i) {
      return (square7 + gap) * i + gap;
    })
    .attr("y", (square7 + gap) * n + gap)
    .style("fill", function(d, i) {
      return distfills[i];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("click", function(d) {
      var ix = d3
        .select(this)
        .attr("id")
        .slice(5, 7);
      curr_color = parseInt(ix);
      //bhushan
      // d3.select(this).style("stroke-width", "3");
      // d3.select(this).attr("stroke", "#333")
    })

    .on("mouseover", function(d) {
      //d3.select(this).style("stroke", "#000");
      d3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3.select(this).style("stroke", "#555");
      d3.select(this).style("stroke-width", "1");
    });

}

var grd = d3
 .select("#pop-d")
 .append("svg")
 .attr("width", (square7 + gap) * square_side + gap)
 .attr("height", (square7 + gap) * square_side + gap);

// loop over number of columns
for (let n = 0; n < square10sColumn; n++) {
 // create each set of rows
 var rows = grd
   .selectAll("rect" + " .row-" + stringify_num(n + 1))
   .data(d3.range(square10sRow))
   .enter()
   .append("rect")

   .attr("class", function(d, i) {
     return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
   })
   .attr("id", function(d, i) {
     return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
   })
   .attr("width", square7sm)
   .attr("height", square7sm)
   .attr("x", function(d, i) {
     return (square7 + gap) * i + gap;
   })
   .attr("y", (square7 + gap) * n + gap)
   .attr("district", function(d, i) {
     return curr_plan[square_side * n + i];
   })
   .style("fill", function(d, i) {
     if (saffron.includes(square_side * n + (i + 1) - 1)) {
       return "#FBB917"
     }
     else {
       return "#C48793"
     }
   })
   .style("stroke", "#555")
   .style("stroke-width", 1)

   // .on("mouseover", function(d) {
   //   //d3.select(this).style("stroke", "#000");
   //   d3.select(this).style("stroke-width", "3");
   // })

   // .on("mouseout", function(d) {
   //   d3.select(this).style("stroke", "#555");
   //   d3.select(this).style("stroke-width", "1");
   // });
}

var grd2 = d3
  .select("#current-d")
  .append("svg")
  .attr("width", (square7 + gap) * square_side + gap)
  .attr("height", (square7 + gap) * square_side + gap);

// loop over number of columns
for (let n = 0; n < square10sColumn; n++) {
  // create each set of rows
  var rows = grd2
    .selectAll("rect" + " .row-" + stringify_num(n + 1))
    .data(d3.range(square10sRow))
    .enter()
    .append("rect")

    .attr("class", function(d, i) {
      return "square7 row-" + stringify_num(n + 1) + " " + "col-" + stringify_num(i + 1);
    })
    .attr("id", function(d, i) {
      return "s-" + stringify_num(n + 1) + " " + stringify_num(i + 1);
    })
    .attr("width", square7sm)
    .attr("height", square7sm)
    .attr("x", function(d, i) {
      return (square7 + gap) * i + gap;
    })
    .attr("y", (square7 + gap) * n + gap)
    .attr("district", function(d, i) {
      return curr_plan[square_side * n + i];
    })
    .style("fill", function(d, i) {
      return distfills[curr_plan[square_side * n + i] - 1];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("click", function(d) {
      // var cd = parseInt(d3.select(this).attr("district"));
      var r = d3
        .select(this)
        .attr("id")
        .slice(2, 4);
      var c = d3
        .select(this)
        .attr("id")
        .slice(5, 7);

      ix = (parseInt(r) - 1) * square_side + (parseInt(c) - 1);

      curr_plan[ix] = curr_color;
      update_dists();
      d3.select(this).attr("district", function(e) {
        return curr_color;
      });
    })
    .on("mouseover", function(d) {
      //d3.select(this).style("stroke", "#000");
      d3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3.select(this).style("stroke", "#555");
      d3.select(this).style("stroke-width", "1");
    });
}

var go_button_g = grd2.append("svg").attr("height", 10 * square7);

var clearDButton = d3.select("#clear-d").on("click", function(d) {
    curr_plan = initialize_plan_to_zeros(square_side)
    grd2.selectAll("rect").each(function(d) {
      var nm = d3.select(this).attr("id");
      var r = d3
        .select(this)
        .attr("id")
        .slice(2, 4);
      var c = d3
        .select(this)
        .attr("id")
        .slice(5, 7);
      if (nm != null) {
        d3.select(this).style("fill", function() {
          return "#FFFFFF";
        });
      }
    });
    grid_borders();
});

var downloadButton = d3.select("#download").on("click", function(d) {
    document.getElementById("cut-edges").click()
    exportToJsonFile(districts)
});

var computeCutEdgesButton = d3.select("#cut-edges").on("click", function(d) {
    // cut edges
    num_cut_edges = 0
    dists = new Set()
    for (let i = 0; i < edges.length; i++) {
      edge = edges[i];
      if (curr_plan[edge[0]] !=  curr_plan[edge[1]]) {
        num_cut_edges += 1
      }
      dists.add(curr_plan[edge[0]]);
      dists.add(curr_plan[edge[1]]);
    }
    if (dists.size != square_side) {
        document.getElementById("ce").innerHTML = "Incomplete map!";
    }
    else {
        document.getElementById("ce").innerHTML = "Cut Edges: " + num_cut_edges;
    }

    // initialize and populate districts
    districts = []
    for (let i = 0; i < square_side; i++) {
      districts.push([])
    }
    for (let i = 0; i < square_side * square_side; i++) {
      districts[curr_plan[i]-1].push(i)
    }
    //bhushan
    // orange seats
    orange_seats = 0
    tied_seats = 0
    pink_seats = 0
    competitive_seats = 0
    safe_seats = 0
    comp_range = [4, 5, 6]
    safe_range = [8, 9, 10]

    for (let i = 0; i < square_side; i++) {
      orange_count = 0;
      for (let j = 0; j < square_side; j++) {
        orange_count += saffron.includes(districts[i][j]);
      }
      if (orange_count >= square_side/2 + 1) {
        orange_seats += 1
      } else if (orange_count == square_side/2) {
        tied_seats += 1
      } else {
        pink_seats += 1
      }

      if (comp_range.includes(orange_count)) {
        competitive_seats += 1
      }
      if (safe_range.includes(orange_count)) {
        safe_seats += 1
      }
    }

    perims = perimeters(districts);
    popos = []
    for (let i = 0; i < square_side; i++) {
      popos.push(4 * Math.PI * square_side / (perims[i] ** 2))
    }
    avg_popo = popos.reduce((a, b) => a + b, 0) / popos.length

    // max pop deviation
    max_pop_dev= max_pop_deviation(districts)

    // contiguity
    contiguitys = []
    for (let i = 0; i < square_side; i++) {
      contiguitys.push(contiguous(districts[i]))
      // break
    }
    console.log(contiguitys)
    console.log(districts)
    console.log(curr_plan)
    console.log(contiguitys.reduce((a, b) => a + b, 0) == square_side)
    console.log(contiguitys.reduce((a, b) => a + b, 0))

    document.getElementById("orange_seats").innerHTML = "Orange Seats: " + orange_seats;
    document.getElementById("tied_seats").innerHTML = "Tied Seats: " + tied_seats;
    document.getElementById("pink_seats").innerHTML = "Pink Seats: " + pink_seats;
    document.getElementById("orange_score").innerHTML = "Orange Score: " + parseFloat(orange_seats + tied_seats * 0.5);
    document.getElementById("competitive_seats").innerHTML = "Competitive Seats: " + competitive_seats;
    document.getElementById("safe_seats").innerHTML = "Safe Seats: " + safe_seats;
    document.getElementById("popo_avg").innerHTML = "Average PoPo: " + avg_popo.toFixed(3);
    document.getElementById("max_pop_dev").innerHTML = "Maximum Pop Deviation: " + max_pop_dev;
    document.getElementById("contiguity").innerHTML = "Contiguous: " + (contiguitys.reduce((a, b) => a + b, 0) == square_side);
});

function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'districts.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function out_of_bounds(number, dir) {
  if ((number - 10 < 0 && dir == "u") ||
      (number % 10 == 0 && dir == "l") ||
      (number + 10 > 99 && dir == "d") ||
      (number % 10 == 9 && dir == "r")) {
        return true
      }
  return false
}

function perimeters(districts) {
  dirs = ["u", "d", "l", "r"]
  perims = []

  for (let i = 0; i < square_side; i++) {
    perim = 0
    for (let j = 0; j < square_side; j++) {
      for (const dir of dirs) {
        if (out_of_bounds(districts[i][j], dir)) {
          perim += 1;
          continue;
        }
        // check side to see if in same dist
        if (dir == "u" && !districts[i].includes(districts[i][j] - 10)) {
          perim += 1;
        } else if (dir == "l" && !districts[i].includes(districts[i][j] - 1)) {
          perim += 1;
        } else if (dir == "r" && !districts[i].includes(districts[i][j] + 1)) {
          perim += 1;
        } else if (dir == "d" && !districts[i].includes(districts[i][j] + 10)) {
          perim += 1;
        }
      }
    }
    perims.push(perim)
  }
  return perims;
}

function max_pop_deviation(districts) {
  max = 0
  for (let i = 0; i < square_side; i++) {
    dev = Math.abs(districts[i].length - square_side)
    if (dev > max) {
      max = dev
    }
  }
  return max / square_side
}

// change everything in arr where arr[i] = x to be arr[i] = y
// function change_value_in_arr(arr, x, y) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == x) {
//       arr[i] = y
//     }
//   }
// }

// function vicinity_max(i) {
//   dirs = ["u", "d", "l", "r"]
//   vicinity_in_dist = []
//   for (const dir of dirs) {
//     if (out_of_bounds(i, dir)) {
//       continue;
//     } else {
//       if (dir == "u" && curr_plan[i] == curr_plan[i - 10]) {
//         vicinity_in_dist.push(i - 10);
//       } else if (dir == "d" && curr_plan[i] == curr_plan[i + 10]) {
//         vicinity_in_dist.push(i + 10);
//       } else if (dir == "l" && curr_plan[i] == curr_plan[i - 1]) {
//         vicinity_in_dist.push(i - 1);
//       } else if (dir == "r" && curr_plan[i] == curr_plan[i + 1]) {
//         vicinity_in_dist.push(i + 1);
//       }
//     }
//   }
//   vicinity_in_dist.push(i)
//   return Math.max.apply(null, vicinity_in_dist)
// }

function contiguous(arr) {
  to_visit = []
  component = new Set()
  dirs = ["u", "d", "l", "r"]
  to_visit.push(arr[0])

  while (to_visit.length != 0) {
      console.log("to_visit: " + to_visit)
      i = to_visit.pop()
      component.add(i)
      for (const dir of dirs) {
        if (out_of_bounds(i, dir)) {
          continue
        } else {
          if (dir == "u" && curr_plan[i] == curr_plan[i - 10] && !component.has(i - 10)) {
            to_visit.push(i - 10);
          } else if (dir == "d" && curr_plan[i] == curr_plan[i + 10] && !component.has(i + 10)) {
            to_visit.push(i + 10);
          } else if (dir == "l" && curr_plan[i] == curr_plan[i - 1] && !component.has(i - 1)) {
            to_visit.push(i - 1);
          } else if (dir == "r" && curr_plan[i] == curr_plan[i + 1] && !component.has(i + 1)) {
            to_visit.push(i + 1);
          }
        }
      }
  }
  return component.length == arr.size
}

var randomDButton = d3.select("#random-d").on("click", function(d) {
  if (!is_conn(curr_plan)) {
    curr_plan = initialize_plan(square_side)
  }
  var counter = 0;
  while (counter < 200) {
    counter += 1;
    cur_plan = swap_cells(curr_plan);
  }

  update_dists();
});

function grid_borders() {
  grd.selectAll("line").remove();

  grd.selectAll("rect").each(function() {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var r = d3
        .select(this)
        .attr("id")
        .slice(2, 4);
      var c = d3
        .select(this)
        .attr("id")
        .slice(5, 7);
      r = parseInt(r);
      c = parseInt(c);

      var cr = d3.select(this);
      if (parseInt(r) == 1) {
        grd
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7 + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
          )
          .attr("y1", parseFloat(cr.attr("y")))
          .attr("y2", parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (parseInt(r) == square_side) {
        grd
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7 + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
          )
          .attr("y1", square7 + parseFloat(cr.attr("y")))
          .attr("y2", square7 + parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = curr_plan[square_side * (r - 1) + (c - 1)];
        var checkcell_up = curr_plan[square_side * (r - 1) + (c - 1) - square_side];
        var checkcell_dn = curr_plan[square_side * (r - 1) + (c - 1) + square_side];

        if (cellchar != checkcell_up) {
          grd
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7 + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
            )
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr("y2", parseFloat(cr.attr("y") - 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_dn && r == square_side-1) {
          grd
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7 + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
            )
            .attr("y1", square7 + (parseFloat(cr.attr("y")) + 1))
            .attr("y2", square7 + (parseFloat(cr.attr("y")) + 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }

      if (parseInt(c) == 1) {
        grd
          .append("line")
          .attr("x1", parseFloat(cr.attr("x")))
          .attr("x2", parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr(
            "y2",
            square7 + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (c == square_side) {
        grd
          .append("line")
          .attr("x1", square7 + parseFloat(cr.attr("x")))
          .attr("x2", square7 + parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y")) - 1)
          .attr(
            "y2",
            square7 + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = curr_plan[square_side * (r - 1) + (c - 1)];
        var checkcell_lf = curr_plan[square_side * (r - 1) + (c - 1) - 1];
        var checkcell_rt = curr_plan[square_side * (r - 1) + (c - 1) + 1];

        if (cellchar != checkcell_lf) {
          grd
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr("x2", parseFloat(cr.attr("x") - 1))
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr(
              "y2",
              square7 + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_rt && c == square_side-1) {
          grd
            .append("line")
            .attr("x1", square7 + (parseFloat(cr.attr("x")) + 1.7))
            .attr("x2", square7 + (parseFloat(cr.attr("x")) + 1.7))
            .attr("y1", parseFloat(cr.attr("y")) - 1)
            .attr(
              "y2",
              square7 + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }
    }
  });

  grd2.selectAll("line").remove();

  grd2.selectAll("rect").each(function() {
    var nm = d3.select(this).attr("id");
    var r = d3
      .select(this)
      .attr("id")
      .slice(2, 4);
    var c = d3
      .select(this)
      .attr("id")
      .slice(5, 7);
    r = parseInt(r);
    c = parseInt(c);

    var cr = d3.select(this);
    if (nm != null) {
      if (r == 1) {
        grd2
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7sm + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
          )
          .attr("y1", parseFloat(cr.attr("y")))
          .attr("y2", parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (r == square_side) {
        grd2
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7sm + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
          )
          .attr("y1", square7sm + parseFloat(cr.attr("y")))
          .attr("y2", square7sm + parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = curr_plan[square_side * (r - 1) + (c - 1)];
        var checkcell_up = curr_plan[square_side * (r - 1) + (c - 1) - square_side];
        var checkcell_dn = curr_plan[square_side * (r - 1) + (c - 1) + square_side];

        if (cellchar != checkcell_up) {
          grd2
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7sm + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
            )
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr("y2", parseFloat(cr.attr("y") - 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_dn && r == square_side-1) {
          grd2
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7sm + (parseFloat(cr.attr("x")) + 1 + (c == square_side ? 0 : 1))
            )
            .attr("y1", square7sm + (parseFloat(cr.attr("y")) + 1))
            .attr("y2", square7sm + (parseFloat(cr.attr("y")) + 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }

      if (c == 1) {
        grd2
          .append("line")
          .attr("x1", parseFloat(cr.attr("x")))
          .attr("x2", parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr(
            "y2",
            square7sm + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (c == square_side) {
        grd2
          .append("line")
          .attr("x1", square7sm + parseFloat(cr.attr("x")))
          .attr("x2", square7sm + parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y")) - 1)
          .attr(
            "y2",
            square7sm + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = curr_plan[square_side * (r - 1) + (c - 1)];
        var checkcell_lf = curr_plan[square_side * (r - 1) + (c - 1) - 1];
        var checkcell_rt = curr_plan[square_side * (r - 1) + (c - 1) + 1];

        if (cellchar != checkcell_lf) {
          grd2
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr("x2", parseFloat(cr.attr("x") - 1))
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr(
              "y2",
              square7sm + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_rt && c == square_side-1) {
          grd2
            .append("line")
            .attr("x1", square7sm + (parseFloat(cr.attr("x")) + 1.7))
            .attr("x2", square7sm + (parseFloat(cr.attr("x")) + 1.7))
            .attr("y1", parseFloat(cr.attr("y")) - 1)
            .attr(
              "y2",
              square7sm + (parseFloat(cr.attr("y")) + 1 + (r == square_side ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }
    }
  });

  grd
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
  grd2
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
}

function do_update2(r) {
  if (d3.event != null && r != -1) {
    var t = parseInt(d3.select(r).attr("party"));
    var tid = d3.select(r).attr("id");
    grd.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
  }

  grd.selectAll("text").each(function(d) {
    if (d3.select(this).attr("id") == tid) {
      d3.select(this).attr("party", t + 2);
      if (d3.select(this).attr("party") >= 2) {
        d3.select(this).attr("party", -1);
      }
    }

    //console.log(d3.select(this).attr("party"));
    if (d3.select(this).attr("party") == 0)
      d3.select(this).style("fill", simp_fill[1]);
    if (d3.select(this).attr("party") == 0) d3.select(this).text(simp_char[1]);
    if (d3.select(this).attr("party") == 1)
      d3.select(this).style("fill", simp_fill[2]);
    if (d3.select(this).attr("party") == 1) d3.select(this).text(simp_char[2]);
    if (d3.select(this).attr("party") == -1)
      d3.select(this).style("fill", simp_fill[0]);
    if (d3.select(this).attr("party") == -1) d3.select(this).text(simp_char[0]);
  });

  grd.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var idnum =
        7 * (parseInt(d3.select(this).attr("id")[2]) - 1) +
        parseInt(d3.select(this).attr("id")[3]) -
        1;
      if (d3.select(this).attr("party") == 0) {
        d3.select(this).style("fill", simp_fill[1]);
        cell_cols[idnum] = 0;
      }
      if (d3.select(this).attr("party") == 1) {
        d3.select(this).style("fill", simp_fill[2]);
        d3.select(this).style("fill-opacity", opacity_red);
        cell_cols[idnum] = 1;
      }
      if (d3.select(this).attr("party") == -1) {
        d3.select(this).style("fill", simp_fill[0]);
        d3.select(this).style("fill-opacity", opacity_blk);
        cell_cols[idnum] = -1;
      }
    }
  });

  r_win_i = [0, 0, 0, 0, 0, 0];
  b_win_i = [0, 0, 0, 0, 0, 0];
  n_win_i = [0, 0, 0, 0, 0, 0];

  //compute_hists();

}

function update_dists() {
  // updates the colors
  grd2.selectAll("rect").each(function(d) {
    var nm = d3.select(this).attr("id");
    var r = d3
      .select(this)
      .attr("id")
      .slice(2, 4);
    var c = d3
      .select(this)
      .attr("id")
      .slice(5, 7);

    if (nm != null) {
      var ix = parseInt(curr_plan[square_side * (parseInt(r) - 1) + parseInt(c) - 1] - 1);

      if (ix  == -1) {
        d3.select(this).style("fill", function() {
          return "#FFFFFF";
        });
      } else {
        d3.select(this).style("fill", function() {
          return distfills[ix];
        });
      }
    }
  });
  grid_borders();
}

function is_conn(s) {
  for (var d = 1; d <= square_side; d++) {
    var seen = [];
    var to_check = [];
    var first = -1;
    var currnode;
    var cand;
    for (var i = 0; i < s.length; i++) {
      if (s[i] == d && first == -1) {
        first = i;
      }
    }

    to_check.push(first);

    while (to_check.length > 0) {
      currnode = parseInt(to_check.pop());
      var already = false;
      for (var a = 0; a < seen.length; a++) {
        if (seen[a] == currnode) {
          already = true;
        }
      }
      if (!already) {
        seen.push(currnode);
        if (s[currnode + 1] == d && currnode % square_side != square_side-1) {
          to_check.push(currnode + 1);
        }
        if (s[currnode - 1] == d && currnode % square_side != 0) {
          to_check.push(currnode - 1);
        }
        if (s[currnode + square_side] == d) {
          to_check.push(currnode + square_side);
        }
        if (s[currnode - square_side] == d) {
          to_check.push(currnode - square_side);
        }
      }
    }
    if (!(seen.length == square_side)) {
      return false;
    }
  }

  return true;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function swap_cells(s) {
  var val = false;
  // var string_copy = (" " + s).slice(1);
  while (!val) {
    // string_copy = (" " + s).slice(1);
    var i1 = Math.floor(Math.random() * square_side * square_side);
    var i2 = Math.floor(Math.random() * square_side * square_side);

    // var c1 = string_copy[i1];
    // var c2 = string_copy[i2];
    var c1 = s[i1];
    var c2 = s[i2];

    if (c1 != c2) {
      s[i1] = c2;
      s[i2] = c1;
      // string_copy = setCharAt(string_copy, i1, c2);
      // string_copy = setCharAt(string_copy, i2, c1);

      val = is_conn(string_copy);
    }
  }

  return string_copy;
}

let histogram = createHistogram(
  d3.select("#histogram"),
  [
    { label: "0 Seats", count: 0 },
    { label: "1 Seat", count: 0 },
    { label: "2 Seats", count: 0 },
    { label: "3 Seats", count: 0 },
    { label: "4 Seats", count: 0 },
    { label: "5 Seats", count: 0 },
    { label: "6 Seats", count: 0 },
    { label: "7 Seats", count: 0 }
  ],
  500,
  220
);

function update_histo(newhist) {
  console.log(red_this);
  let data = newhist.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: i == red_this
  }));
  updateHistogram(histogram, data, "#66ABFF", 500, 220);
}

let randomDeltaButton = d3.select("#random-delta");

randomDeltaButton.on("click", function(d) {
  party_init = shuffle(party_init);
  grd.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var n = nm[2] - 1;
      var k = nm[3] - 1;

      d3.select(this).attr("party", function(d) {
        return party_init[7 * n + k];
      });
      d3.select(this).style("fill", function(d) {
        return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
      });

      do_update2(-1);
    }
  });
  grd.selectAll("text").each(function(d) {
    if (
      d3.select(this).attr("button") == null &&
      d3.select(this).attr("id") != null
    ) {
      var nm = d3.select(this).attr("id");
      var n = nm[2] - 1;
      var k = nm[3] - 1;

      d3.select(this).attr("party", function(d) {
        return party_init[7 * n + k];
      });
      d3.select(this).style("fill", function(d) {
        return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
      });

      do_update2(-1);
    }
  });
});

function stringify_num(num) {
  str = num.toString();
  if (str.length == 1) {
    return "0" + str;
  } else if (str.length == 2) {
    return str
  }
}
