var Tournament = function () {
    this.groups = [];

    var entriesA = [];
    entriesA.push(new GroupEntry(teams.arg, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.per, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.chi, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.can, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "A",
        entriesA
    ));

    var entriesB = [];
    entriesB.push(new GroupEntry(teams.mex, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.ecu, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.ven, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.jam, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "B",
        entriesB
    ));

    var entriesC = [];
    entriesC.push(new GroupEntry(teams.usa, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.uru, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.pan, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.bol, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "C",
        entriesC
    ));

    var entriesD = [];
    entriesD.push(new GroupEntry(teams.bra, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.col, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.par, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.cra, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "D",
        entriesD
    ));

};

Tournament.prototype.simulate = function() {
    for(var i = 0; i < this.groups.length; i++) {
        this.groups[i].simulate();
        this.groups[i].sort();
    }
    var data = [];
    data[0] = this.groups[0].entries[0].team;  // Winner Group A
    data[1] = this.groups[1].entries[1].team;  // Runner-up Group B
    data[2] = this.groups[1].entries[0].team;  // Winner Group B
    data[3] = this.groups[0].entries[1].team;  // Runner-up Group A
    data[4] = this.groups[2].entries[0].team;  // Winner Group C
    data[5] = this.groups[3].entries[1].team;  // Runner-up Group D
    data[6] = this.groups[3].entries[0].team;  // Winner Group D
    data[7] = this.groups[2].entries[1].team;  // Runner-up Group C

    this.knockout = new Knockout(data);
    this.knockout.simulate();
}

Tournament.prototype.render = function() {
    var str = '<table>';
    for(var i = 0; i < this.groups.length; i++) {
        var g = this.groups[i];
        str += '<tr><td colspan="9">Group ' + g.label + '</td></tr>';
        str += '<tr><td>Pos</td><td>Team</td><td>Pld</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>Pts</td></tr>'
        for(var j = 0; j < g.entries.length; j++) {
            var e = g.entries[j];
            str += '<tr><td>' + (j+1) + '</td><td>' + e.team.name + '</td><td>' + e.pld + '</td><td>' + e.win + '</td><td>' + e.draw +'</td><td>' + e.loose + '</td><td>' + e.gf + '</td><td>' + e.ga + '</td><td>' + e.pts + '</td></tr>'
        }
        for(var j = 0; j < g.results.length; j++) {
            str += '<tr><td colspan="9">' + g.results[j] + '</td></tr>';
        }
    }
    str += '<table>';
    for(var j = 0; j < this.knockout.results.length; j++) {
        str += '<br/><label>' + this.knockout.results[j] + '</label>';
    }

    document.getElementById('details').innerHTML = str;
    document.getElementById("champLabel").textContent = this.knockout.champion().name;
}
