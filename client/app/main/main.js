'use strict';

angular.module('yoSalaryApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });

var peopleObj = {};
var tempAssets = [];

$(function() {

  setTimeout(function(){

    var myExtents = {
      on: false,
      certification: [0],
      bonus: [0],
      base_salary: [0],
      num_of_reports: [0],
      shifts: [0],
      compensation: [0],
      years_of_experience: [],
      age: [0]
    }

    var m = [30, 10, 10, 10],
        w = $('.container').width() - m[1] - m[3],
        h = 500 - m[0] - m[2];

    var x = d3.scale.ordinal().rangePoints([0, w], 1),
        y = {},
        dragging = {};

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground,
        dimensions;

    var svg = d3.select('#chart').append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
      .append("g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // linear color scale
    var blue_to_brown = d3.scale.linear()
      .domain([70000, 200000])
      .range(["steelblue", "brown"])
      .interpolate(d3.interpolateLab);

    var color = function(d) { return blue_to_brown(d['base_salary']); };

    makeChart();

    $('#company-apple').on('click', function() {
      tempAssets.length = 0;
      console.log('clicked appl');
      for(var key in peopleObj) {
        if(peopleObj[key].company === "Apple Inc.") {
          tempAssets.push(peopleObj[key]);
        }
      }

        $('svg').remove();
        svg = d3.select('#chart').append("svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
          .append("g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
      makeChart(tempAssets);
      updateCompany("Apple Inc.");
    })

    function makeChart(temp) {
      d3.json("assets/data.json", function(error, people) {
        if(temp) people = temp;
        people.forEach(function(person) {
          peopleObj[person.uuid] = person;
            peopleObj[person.uuid].show = true;
          $('#lists').append('<tr id="' + person.uuid + '"><td>' + person.major + '</td><td>' + person.marital_status + '</td><td>' + person.gender + '</td><td>' + person.company + '</td><td>' + person.disability + '</td><td>' + person.veteran_status + '</td><td>' + person.race + '</td><td>' + person.education + '</td><td>' + person.ethnicity + '</td><td>' + person.job_title + '</td></tr>')
        });

        // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = d3.keys(people[0]).filter(function(d) {
          return d != "show" &&  d != "uuid" && d != "major" && d != "marital_status" && d != "gender" && d != "company" && d != "disability" && d != "veteran_status" && d != "race" && d != "education"
            && d != "ethnicity" && d != "job_title" && (y[d] = d3.scale.linear()
              .domain(d3.extent(people, function(p) { return +p[d]; }))
              .range([h, 0]));
        }));

        // Add grey background lines for context.
        background = svg.append("g")
            .attr("class", "background")
          .selectAll("path")
            .data(people)
          .enter().append("path")
            .attr("d", path);

        // Add blue foreground lines for focus.
        foreground = svg.append("g")
            .attr("class", "foreground")
          .selectAll("path")
            .data(people)
          .enter().append("path")
            .attr("d", path)
            .attr("stroke", function(d) {
              return color(d);
            });

        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
          .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
            .call(d3.behavior.drag()
              .on("dragstart", function(d) {
                dragging[d] = this.__origin__ = x(d);
                background.attr("visibility", "hidden");
              })
              .on("drag", function(d) {
                dragging[d] = Math.min(w, Math.max(0, this.__origin__ += d3.event.dx));
                foreground.attr("d", path);
                dimensions.sort(function(a, b) { return position(a) - position(b); });
                x.domain(dimensions);
                g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
              })
              .on("dragend", function(d) {
                delete this.__origin__;
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground)
                    .attr("d", path);
                background
                    .attr("d", path)
                    .transition()
                    .delay(500)
                    .duration(0)
                    .attr("visibility", null);
              }));

        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
          .append("text")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(String);

        // Add and store a brush for each axis.
        g.append("g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)); })
          .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
      });
    }

    function position(d) {
      var v = dragging[d];
      return v == null ? x(d) : v;
    }

    function transition(g) {
      return g.transition().duration(500);
    }

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
    }

    // When brushing, don’t trigger axis dragging.
    function brushstart() {
      d3.event.sourceEvent.stopPropagation();
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
      var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
          extents = actives.map(function(p) { return y[p].brush.extent(); });
      foreground.style("display", function(d) {
        myExtents.on = true;
        return actives.every(function(p, i) {
          myExtents[p][0] = 1;
          myExtents[p][1] = extents[i][0];
          myExtents[p][2] = extents[i][1];
          return extents[i][0] <= d[p] && d[p] <= extents[i][1];
        }) ? null : "none";
      });
      if(myExtents.on) {
        updateTable(myExtents);
      }
    }
}, 500);

    var updateTable = function(extents) {
      for(var key in peopleObj) {
        peopleObj[key].show = true;
      }
      for(var key in peopleObj) {
        for(var exKey in extents) {
          if(extents[exKey].length > 1) {
            if((peopleObj[key][exKey] >= extents[exKey][1] && peopleObj[key][exKey] <= extents[exKey][2]) || (peopleObj[key][exKey] <= extents[exKey][1] && peopleObj[key][exKey] >= extents[exKey][2])) {
            }
            else peopleObj[key].show = false;
          }
        }
      }

      for(var key in peopleObj) {
        if(peopleObj[key].show) $('tr#' + key).show();
        else $('tr#' + key).hide();
      }
    }

    var updateCompany = function(compName) {
      for(var key in peopleObj) {
        peopleObj[key].show = true;
      }
      for(var key in peopleObj) {
        if(peopleObj[key].company !== compName) peopleObj[key].show = false;
      }

      for(var key in peopleObj) {
        if(peopleObj[key].show) $('tr#' + key).show();
        else $('tr#' + key).hide();
      }
    }

});
