var margin = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};
let windowWidth = window.innerWidth;
const graphDiv = document.querySelector(".graph-edilim");
graphDiv.style.width = windowWidth - 300;

let windowHeight = window.innerHeight;
let main = document.querySelector("main");
let mainHeight = main.getBoundingClientRect();
let width = windowWidth - 300;
let height = mainHeight.height;
let radius = 6;

let allGraph = true;

//Create an SVG element and append it to the DOM
var divSvg = d3.select(".graph-edilim").append("svg");

var svg = d3
  .select("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//.attr({ width: width, height: height });
//  .append("g")
//  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function getD3Graph() {
  allGraph = true;
  d3.json("data_network.json", function (dataset) {
    //Extract data from dataset
    var nodes = dataset.nodes,
      links = dataset.links;
    //forceDirectedGraph(nodes, links)
    createD3Simulation(nodes, links)
    //createD3SimulationNodes(nodes, links);
  });
}

function getModifiedD3Graph(arr, themeNumber) {
  allGraph = false;
  d3.json("data_network.json", function (dataset) {
    //Extract data from dataset
    var nodesInitial = dataset.nodes,
      linksinitial = dataset.links;
    //create new nodes
    let nodes = [];
    let links = [];
    for (i = 0; i < arr.length; i++) {
      nodes.push(dataset.nodes[arr[i]]);
      dataset.links.forEach((element) => {
        if (element.source == arr[i]) {
          for (j = 0; j < arr.length; j++) {
            if (element.target == arr[j]) {
              links.push(element);
            }
          }
        }
      });
    }
    let index = 0;
    for (let node of nodes) {
      for (let link of links) {
        if (link.source == node.name) {
          link.source = index;
        }
        if (link.target == node.name) {
          link.target = index;
        }
      }
      index++;
    }
    console.log('nodes');
    console.log(nodes);
    console.log('links');
    console.log(links);
    //forceDirectedGraph(nodes, links)
    createD3Simulation(nodes, links, themeNumber)
    //createD3SimulationNodes(nodes, links, themeNumber);
  });
}

function forceDirectedGraph(n, l) {
  console.log("FORCE DIRECTED GRAPH");
  const nodes = n.map(d => ({...d}));
  const links = l.map(d => ({...d}));
  console.log(n);
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // Add a line for each link, and a circle for each node.
    const link = svg.selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", function (d) {
      return d.value / 10;
    })
    .attr("class", "link");

const node = svg.selectAll(".node")
.data(nodes)
.enter()
.append("g")
.attr("class", "node")
.attr("index", function (d) {
  return d.id;
});

node.append("title")
    .text(d => d.id);

    // Add a drag behavior.
  node.call(d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended));

// Set the position attributes of links and nodes each time the simulation ticks.
simulation.on("tick", () => {
  console.log("tick");
link
  .attr("x1", d => d.source.x)
  .attr("y1", d => d.source.y)
  .attr("x2", d => d.target.x)
  .attr("y2", d => d.target.y);

node
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);
});

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

invalidation.then(() => simulation.stop());
  
}

function createD3Simulation(n, l, themeNumber) {
  console.log("NEW SIMULATION");
  const nodes = n.map(d => ({...d}));
  const links = l.map(d => ({...d}));
  var simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id(function (d) {
        return d.index;
      })
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.force("charge").strength(-220).distanceMin(0).distanceMax(2000);
  simulation.force("link").distance(250);
  console.log("first simulation tick()");
  simulation.tick()
  
  
  var link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", function (d) {
      return d.value / 10;
    })
    .attr("class", "link")
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

    
  var node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("index", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
    })
    .attr("cy", function (d) {
      return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
    })
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .on("mousedown", mouseEvent);

  var label = node
    .append("text")
    .attr("dx", 12)
    .attr("dy", "0.35em")
    .text(function (d) {
      return d.prenom + " " + d.nom;
    });

  var circle = node.append("circle").attr("r", 4);

  var drag = node.call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

  console.log("second simulation tick()");
  //simulation.on("tick", ticked)
  //simulation.nodes(nodes).on("tick", ticked);
  //simulation.force("link").links(links);


    setTimeout(function () {
      console.log("timeOut function");
      simulation.stop();
    }, 2500);
  
    function mouseEvent() {
      const index = d3.select(this).attr("index");
      const name = d3.select(this).text();
      ticked()
    }

  function ticked() {
    console.log("ticked");
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node
      .attr("cx", function (d) {
        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
      })
      .attr("cy", function (d) {
        return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
      })
      

    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
    
  }

  invalidation.then(() => simulation.stop());

  function dragstarted(d) {
    console.log("drag start");
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    console.log("dragging");
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    fix_nodes(d);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
    console.log("drag end");
  }

  function fix_nodes(this_node) {
    console.log("fix node");
    node.each(function (d) {
      if (this_node != d) {
        d.fx = d.x;
        d.fy = d.y;
      }
    });
  }



}


function createD3SimulationNodes(nodes, links, themeNumber) {
  var simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id(function (d) {
        return d.index;
      })
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.force("charge").strength(-220).distanceMin(0).distanceMax(2000);
  simulation.force("link").distance(250);
  
  var link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", function (d) {
      return d.value / 10;
    })
    .attr("class", "link");

    
  var node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("index", function (d) {
      return d.id;
    })
    .on("click", function (e) {
      console.log("clicked");
      if (d3.event.defaultPrevented) return;
      // ignore drag
      else {
        const index = d3.select(this).attr("index");
        const name = d3.select(this).text();
        isAudioBoxShowed(true);
        if (allGraph) {
          if (isAllCheck) {
            getAudioParticipant(index, name)
          } else {
            getAudioAvenir(index);
          }
        } else {
          getAudioTheme(themeNumber, index)
        }
      }
    });
  var label = node
    .append("text")
    .attr("dx", 12)
    .attr("dy", "0.35em")
    .text(function (d) {
      return d.prenom + " " + d.nom;
    });
  var circle = node.append("circle").attr("r", 4);

  var drag = node.call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

  simulation.nodes(nodes).on("tick", ticked);
  simulation.force("link").links(links);

  function ticked() {
    console.log("ticked");
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node
      .attr("cx", function (d) {
        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
      })
      .attr("cy", function (d) {
        return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
      });

    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
   
    
  }

  //console.log(themeNumber);
  if (themeNumber) {
    setTimeout(function () {
      console.log("stop simulation small");
      simulation.stop();
    }, 2500);
  } else {
    setTimeout(function () {
      console.log("stop simulation big");
      simulation.stop();
    }, 10);
  }



  function dragstarted(d) {
    console.log("drag start");
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    fix_nodes(d);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
    console.log("drag end");
  }

  function fix_nodes(this_node) {
    console.log("fix node");
    node.each(function (d) {
      if (this_node != d) {
        d.fx = d.x;
        d.fy = d.y;
      }
    });
  }
}

