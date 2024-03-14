var margin = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

const main = document.querySelector("main");
const width = window.innerWidth - 300;
const height = main.getBoundingClientRect().height;
const radius = 6;

let dataset = fetch("data_network.json").then((response) => response.json());

let svg = d3
  .select(".graph-edilim")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

async function createGraph(option) {
  const data = await dataset;
  const arr = option
  const links = option ? data.links
  .filter((e) => arr.find((element) => element == e.source))
  .filter((e) => arr.find((element) => element == e.target))
  .map((d) => ({ ...d })) : data.links.map((d) => ({ ...d }))
  const nodes = option ? arr.map((e) => data.nodes[Number(e)]).map((d) => ({ ...d })) : data.nodes.map((d) => ({ ...d }))


  if(option) {
  let index = 0;
  for (let n of nodes) {
    for (let link of links) {
      if (link.source == n.name) {
        link.source = index;
      }
      if (link.target == n.name) {
        link.target = index;
      }
    }
    index++;
  }
  }

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
    .on("click", mouseEvent);

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

  function mouseEvent(event) {
    console.log(event);
  }

  function ticked() {

    if(option) {
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
    }

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

  if(option) {
    setTimeout(function () {
      console.log("stop simulation small");
      simulation.stop();
    }, 2500);
  }

  function dragstarted(d) {
    //console.log("drag start");
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
    //console.log("drag end");
  }

  function fix_nodes(this_node) {
    //console.log("fix node");
    node.each(function (d) {
      if (this_node != d) {
        d.fx = d.x;
        d.fy = d.y;
      }
    });
  }
}
