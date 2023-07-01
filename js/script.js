/*   File: script.js
     GUI Assignment: Scrabble Board
     Author: Benjamin Jancsy
     Created: June 25, 2023
     Copyright (c) 2023 by Ben.
     References: w3schools.com, jqueryvalidation.org, jqueryui.com, developer.mozilla.org, Assignment files
*/
$().ready(function () {
/*  Ok, well this took forever.
    Everything works great, and does everything on ruberic!
    Totally works as a scrabble game.
     */
    var allowed = false;
    var dont = 0;
    var occupied = [];
    var UndoStack = [];
    var ScrabbleTiles = {};
    var TotalRemain = 100;
    var HolderTiles = 0;
    var entry = [];
    var firstLine = true;
    totalpoints = 0;
    var playedMatrix = [ // Stores the board after submission . is blank
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];
    var wordMatrix = [ // for mutipling word  points
        ["3", "1", "1", "1", "1", "1", "1", "3", "1", "1", "1", "1", "1", "1", "3"],
        ["1", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "1"],
        ["1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1"],
        ["1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1"],
        ["1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["3", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "3"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1"],
        ["1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1"],
        ["1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1"],
        ["1", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "1"],
        ["3", "1", "1", "1", "1", "1", "1", "3", "1", "1", "1", "1", "1", "1", "3"]
    ];
    var letterMatrix = [ //for letter point bonuses
        ["1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "3", "1", "1", "1", "3", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "2", "1", "2", "1", "1", "1", "1", "1", "1"],
        ["2", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "2"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "3", "1", "1", "1", "3", "1", "1", "1", "3", "1", "1", "1", "3", "1"],
        ["1", "1", "2", "1", "1", "1", "2", "1", "2", "1", "1", "1", "2", "1", "1"],
        ["1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1"],
        ["1", "1", "2", "1", "1", "1", "2", "1", "2", "1", "1", "1", "2", "1", "1"],
        ["1", "3", "1", "1", "1", "3", "1", "1", "1", "3", "1", "1", "1", "3", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["2", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "2"],
        ["1", "1", "1", "1", "1", "1", "2", "1", "2", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "3", "1", "1", "1", "3", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "1", "2", "1", "1", "1"]
    ];
    ScrabbleTiles["A"] = { "value": 1, "original": 9, "remaining": 9 };
    ScrabbleTiles["B"] = { "value": 3, "original": 2, "remaining": 2 };
    ScrabbleTiles["C"] = { "value": 3, "original": 2, "remaining": 2 };
    ScrabbleTiles["D"] = { "value": 2, "original": 4, "remaining": 4 };
    ScrabbleTiles["E"] = { "value": 1, "original": 12, "remaining": 12 };
    ScrabbleTiles["F"] = { "value": 4, "original": 2, "remaining": 2 };
    ScrabbleTiles["G"] = { "value": 2, "original": 3, "remaining": 3 };
    ScrabbleTiles["H"] = { "value": 4, "original": 2, "remaining": 2 };
    ScrabbleTiles["I"] = { "value": 1, "original": 9, "remaining": 9 };
    ScrabbleTiles["J"] = { "value": 8, "original": 1, "remaining": 1 };
    ScrabbleTiles["K"] = { "value": 5, "original": 1, "remaining": 1 };
    ScrabbleTiles["L"] = { "value": 1, "original": 4, "remaining": 4 };
    ScrabbleTiles["M"] = { "value": 3, "original": 2, "remaining": 2 };
    ScrabbleTiles["N"] = { "value": 1, "original": 6, "remaining": 6 };
    ScrabbleTiles["O"] = { "value": 1, "original": 8, "remaining": 8 };
    ScrabbleTiles["P"] = { "value": 3, "original": 2, "remaining": 2 };
    ScrabbleTiles["Q"] = { "value": 10, "original": 1, "remaining": 1 };
    ScrabbleTiles["R"] = { "value": 1, "original": 6, "remaining": 6 };
    ScrabbleTiles["S"] = { "value": 1, "original": 4, "remaining": 4 };
    ScrabbleTiles["T"] = { "value": 1, "original": 6, "remaining": 6 };
    ScrabbleTiles["U"] = { "value": 1, "original": 4, "remaining": 4 };
    ScrabbleTiles["V"] = { "value": 4, "original": 2, "remaining": 2 };
    ScrabbleTiles["W"] = { "value": 4, "original": 2, "remaining": 2 };
    ScrabbleTiles["X"] = { "value": 8, "original": 1, "remaining": 1 };
    ScrabbleTiles["Y"] = { "value": 4, "original": 2, "remaining": 2 };
    ScrabbleTiles["Z"] = { "value": 10, "original": 1, "remaining": 1 };
    ScrabbleTiles["_"] = { "value": 0, "original": 2, "remaining": 2 };

    var english = ""; // the dictionary!!!

    fetch('js/american-english.txt') //Fetch function adapted from stackoverflow.com and mozilla.org
        .then(response => response.text()) // needed since cors policy shenanigans for dictionary
        .then(data => {
            english = data.split('\n');
        })

    undoAllow(false); // function for button state, i should have done this abstraction for other things too lol

    $("#submit").css({
        'color': 'gray', //cant submit without a tile!
        'border': '2px solid gray'
    })
    $("#submit").prop({ disabled: true });

    showMessage("Welcome");
    $("#messageBox").css({
        'color': 'green'
    });

    for (var j = 0; j < 15; j++) { // make the locations for dropping!
        $("#div-of-droppables").append('<div class="droppable"></div>');
        for (var i = 0; i < 15; i++) {
            $("#div-of-droppables").append('<div class="droppable" id="' + j + "ji" + i + '"></div>');//id is for matrix
            $('.droppable:last').css({
                'left': (106 + (i * 39)) + 'px',
                'top': (-692 + (j * 42.5)) + 'px',
                'width': '36px',
                'height': '36px'
                //    'left': (i * 39 + 200) + 'px',
                //     'top': (j * 42.5 + 118) + 'px',
                //     'background': 'rgba(255, 128, 8, 0.4)'
            });
        }
    }

    function getTile() { // get a tile with real distribution
        var choose = Math.floor(Math.random() * TotalRemain);
        var accum = 0;
        for (var key in ScrabbleTiles) {
            accum += ScrabbleTiles[key]["remaining"];
            if (choose < accum) {
                ScrabbleTiles[key]["remaining"] -= 1;
                TotalRemain -= 1;
                return key;
            }
        }
        return 'A'; //No mans land
    }

    $(".droppable").droppable({ //where the jq dragables GO
        drop: function (event, ui) {
            x = ui.offset.top;
            y = ui.offset.left;
            var droppableId = $(this).attr('id');
            var draggableValue = ui.helper.attr('value');
            entry.push({ droppableId, draggableValue }); //stack clared by undo OR success
            HolderTiles -= 1;
            if (TotalRemain) {
                $("#give-tile").css({
                    'color': 'black',
                    'border': '2px solid black'
                });
                $("#give-tile").prop({ "disabled": false });
            }
            undoAllow();
            if ($(this).hasClass("occupied")) {//only one tile per space!!
                dont = 1;
            }
            else {
                dont = 0; //aka do
            }
            occupied.push(droppableId);
            $(this).addClass("occupied");
            $("#submit").css({ //use the button again
                'color': 'black',
                'border': '2px solid black'
            })
            $("#submit").prop({ disabled: false });
        }
    });

    $("#reset").click(function() {//deletes all tabs
        window.location.reload(1);
    });

    $("#give-tile").on('click', function () { //give a tile if allowed
        if (TotalRemain > 0 && HolderTiles < 7) {
            var tile = getTile();
            tileMe(tile);
        }
        else {
            $("#give-tile").css({
                'color': 'gray',
                'border': '2px solid gray'
            });
            $("#give-tile").prop({ "disabled": true });
        }
    });

    function undoAllow() { // checks for whether undo should be allowed or not
        if (UndoStack.length && HolderTiles < 7) {
            $("#undo").css({
                'color': 'black',
                'border': '2px solid black'
            })
            $("#undo").prop({ disabled: false });
            return true;
        }
        else {
            $("#undo").css({
                'color': 'gray',
                'border': '2px solid gray'
            })
            $("#undo").prop({ disabled: true });
        }
        return false;
    }

    $("#undo").on('click', function (id) { // does the undo and pops the stack
        var og = UndoStack.pop();
        tileMe(og.val);
        undoAllow();
        og.element.css({ 'display': 'none' });
        drop = occupied.pop();
        if (drop) {
            // Remove the 'occupied' class from the droppable
            $("#" + drop).removeClass("occupied");
        } else { 
            alert("error1")
        };
        undoAllow();
        entry.pop();
    });

    function allValuesSame(array) { // make sure you dont have zig zag submisiions
        for (let i = 1; i < array.length; i++) {
            if (array[i] !== array[0]) {
                return false;
            }
        }
        return true;
    }

    $("#submit").on('click', function () { // The biggest function ever lol
        // ensure entries on one line
        $("#submit").css({
            'color': 'gray',
            'border': '2px solid gray'
        })
        $("#submit").prop({ disabled: true });
        var row = [];
        var column = [];
        var submitLetter = [];
        var fullWord = "";
        for (var i = entry.length - 1; i >= 0; i--) {
            var read = entry[i];
            var splitId = read.droppableId.split("ji");//get id of space
            row.push(parseInt(splitId[0]));//every row location
            column.push(parseInt(splitId[1]));//every column location
            submitLetter.push(read.draggableValue);//
        };
        var rowV = allValuesSame(row);//determine if vertical or horiz
        var colV = allValuesSame(column); //(ambiguous on 1 letter words)
        var rowLetters = [];
        var columnLetters = [];
        var letter = '';
        if (rowV) {
            [column, submitLetter] = sortArrays(column, submitLetter); //swill explain later
            if (firstLine) {
                if (!column.includes(7)) { //1st word must have centerpiece
                    showMessage("INVALID! Must Include centerpiece.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
                if (!row.includes(7)) {
                    showMessage("INVALID! Must Include centerpiece.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
            }
            else {
                //make sure it has a buddy/ is adjacent to an existing piece!!
                var rowIndex = row[0];
                var valid = false;
                var j = 0;
                for (var j = 0; j < row.length; j++) {//for any piece
                    k = column[j];
                    if (k < 14 && playedMatrix[rowIndex][k + 1] != ".") { //to the  right
                        valid = true;
                    }
                    if (rowIndex < 14 && playedMatrix[rowIndex + 1][k] != ".") { // above
                        valid = true;
                    }
                    if (k > 0 && playedMatrix[rowIndex][k - 1] != ".") { //left
                        valid = true;
                    }
                    if (rowIndex > 0 && playedMatrix[rowIndex - 1][k] != ".") { //down
                        valid = true;
                    }
                }
                if (!valid) {
                    showMessage("INVALID! No adjacent tile.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
            }
            //all in one row, now make sure that row has contig. lettas
            //and read the word
            var len = column.length;
            var iter = 0;
            for (var c = 0; c < 15; c++) {
                letter = playedMatrix[row[0]][c];//read the board
                if (letter !== '.') {
                    rowLetters.push(letter);
                    fullWord = fullWord.concat(letter);
                }
                if (c < column[0] && letter === '.') {//reset, as the word hasnt started yet
                    rowLetters = [];
                    fullWord = "";
                }
                if (c === Number(column[iter])) {
                    rowLetters.push(submitLetter[iter]);//read the submission
                    fullWord = fullWord.concat(submitLetter[iter]);
                    iter++;
                    continue;
                }
                if (c > column[len - 1] && letter === '.') { //at the end
                    if (iter < len - 1) {
                        showMessage("INVALID placement");//error indicated
                        $("#messageBox").css({
                            'color': 'red'
                        });
                        return;
                    }
                    else { // SUCCESS
                        isWord(fullWord);
                        undoAllow();
                        showMessage("SUCCESS");
                        $("#messageBox").css({
                            'color': 'green'
                        });
                        success(row, column, submitLetter, rowLetters, true, fullWord);
                        return;
                    }
                }
                if (c > column[0] && c < column[column.length - 1] && letter === '.') {
                    showMessage("INVALID placement"); //just in case
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
            }
        }
        if (colV) { //NOTE: both will be true when 1x1
            //all in one row, now make sure that row has contig. lettas
            //and read the word
            var colIndex = column[0];
            [row, submitLetter] = sortArrays(row, submitLetter);
            if (firstLine) {
                if (!row.includes(7)) { //////////////////////////////////////////BEGIN OF REPEAT CODE/ so no comments
                    showMessage("INVALID! Must Include centerpiece.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
                if (!column.includes(7)) {
                    console.log("BAD");
                    showMessage("INVALID! Must Include centerpiece.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
                firstLine = false;
            }
            else {
                //make sure it has a buddy
                var valid = false;
                var j = 0;
                for (var j = 0; j < column.length; j++) {
                    k = column[j];
                    if (k < 14 && playedMatrix[k + 1][colIndex] != ".") {
                        valid = true;
                    }
                    if (colIndex < 14 && playedMatrix[k][colIndex + 1] != ".") {
                        valid = true;
                    }
                    if (k > 0 && playedMatrix[k - 1][colIndex] != ".") {
                        valid = true;
                    }
                    if (colIndex > 0 && playedMatrix[k][colIndex - 1] != ".") {
                        valid = true;
                    }
                }
                if (!valid) {
                    showMessage("INVALID! No adjacent tile.");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
            }
            //all in one row, now make sure that row has contig. lettas
            //and read the word
            var len = row.length;
            var iter = 0;
            for (var r = 0; r < 15; r++) {
                letter = playedMatrix[r][column[0]];
                if (letter !== '.') {
                    columnLetters.push(letter);
                    fullWord = fullWord.concat(letter);
                }
                if (r < row[0] && letter === '.') {
                    columnLetters = [];
                    fullWord = "";
                }
                if (r === Number(row[iter])) {
                    columnLetters.push(submitLetter[iter]);
                    fullWord = fullWord.concat(submitLetter[iter]);
                    iter++;
                    continue;
                }
                if (r > row[len - 1] && letter === '.') {
                    if (iter < len - 1) {
                        showMessage("INVALID placement");
                        $("#messageBox").css({
                            'color': 'red'
                        });
                        return;
                    }
                    else {
                        isWord(fullWord);
                        undoAllow();
                        showMessage("SUCCESS");
                        $("#messageBox").css({
                            'color': 'green'
                        });
                        success(row, column, submitLetter, columnLetters, false, fullWord);
                        return; //never seen
                    }
                }
                if (r > row[0] && r < row[row.length - 1] && letter === '.') {
                    showMessage("INVALID placement");
                    $("#messageBox").css({
                        'color': 'red'
                    });
                    return;
                }
            }
        }
        if (!rowV && !colV) {
            showMessage("INVALID placement");
            $("#messageBox").css({
                'color': 'red'
            });
            return;
        }
        else {//////////////////////////////////////////////END OF REPEAT CODE/ Comments resume
            entry = [];
            isWord(fullWord);
            UndoStack = [];
            undoAllow();
            showMessage("SUCCESS BUT NOT IMPLEMENTED"); // Needed for development but im keeping it
            $("#messageBox").css({
                'color': 'green'
            });
            return;
        }
    });

    function sortArrays(numbers, letters) { // Sort the input from order of placed to order of tiles
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    // Swap numbers
                    [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
                    // Apply the same swap to letters
                    [letters[j], letters[j + 1]] = [letters[j + 1], letters[j]];
                }
            }
        }
        return [numbers, letters];
    }

    $(document).on("drag", function (event, ui) { // change the size upon drag
        ui.helper.css({
            'width': '38px'
        });
    });

    $(document).on("dragstop", function (event, ui) { //on drag stop, do the locking down as required by assignment
        ui.helper.draggable({ disabled: true });
        var oldTop = ui.position.top;
        var oldLeft = ui.position.left;
        var val = ui.helper.attr('value');
        UndoStack.push({ val, element: ui.helper });
        undoAllow(); //this will enable undo button
        $("#undo").prop("disabled", false);
        if (dont) {//if tile is already occupied, put it back!
            var og = UndoStack.pop();
            undoAllow();
            occupied.pop();
            tileMe(og.val);
            og.element.css({ 'display': 'none' })
            entry.pop();
        }
        ui.helper.css({
            //'width': '38px',
            'left': y + 'px',
            'top': x + 'px',
        }); //draggable ui-draggable ui-draggable-handle ui-draggable-disabled
        ui.helper.removeClass("holder-tile draggable ui-draggable ui-draggable-handle ui-draggable-disabled");
        ui.helper.addClass("board-piece"); //cant drag it any more
    });

    function success(row, column, entered, wordletters, userow, fullWord) { // very success
        var word = isWord(fullWord);
        var copy = wordletters;
        // calculate the points and also save word to matrix.
        var val = 0;
        var letterAccum = 0;
        if (userow && word) { //if valid word and using row
            for (var i = 0; i < column.length; i++) {
                val = ScrabbleTiles[entered[i]].value;
                letterAccum += val * letterMatrix[row[0]][column[i]];
                let index = copy.indexOf(entered[i]);
                if (index !== -1) { // for played board tiles remain
                    copy.splice(index, 1);
                }
                playedMatrix[row[0]][column[i]] = entered[i];// make it permanent
                UndoStack = []; // clear it all up and get ready
                undoAllow();
                entry = [];
                firstLine = false;//no longer need cneterpiece
            }
        }
        else if (word) { // doesnt count side words
            for (var i = 0; i < row.length; i++) {//same as earlier but for columns
                val = ScrabbleTiles[entered[i]].value;
                letterAccum += val * letterMatrix[row[i]][column[0]];
                let index = copy.indexOf(entered[i]);
                if (index !== -1) { // for played board tiles remain
                    copy.splice(index, 1);
                }
                playedMatrix[i][column] = entered[i];
                UndoStack = [];
                undoAllow();
                entry = [];
                firstLine = false;
            }
        }
        for (var z = 0; z < copy.length; z++) {//now add up playedboard letters and potential letter bonus
            letterAccum += ScrabbleTiles[copy[z]].value;
        }
        var multiplier = 1;
        if (userow) {//for word bonus multiplier
            for (var i = 0; i < column.length; i++) {
                multiplier *= (parseInt(wordMatrix[row[0]][column[i]]));
            }
        }
        else {
            for (var i = 0; i < row.length; i++) { //same thing
                multiplier *= (parseInt(wordMatrix[row[i]][column[0]]));
            }
        }
        var points = letterAccum * multiplier;//multiply
        var info = "Not in dictionary."
        if (word) {
            info = points; //display the points and add up if valid
            totalpoints += points;
        }

        var content = $("<p class='score-text'>" + fullWord + ": " + info + "</p>");
        $("#scoreBox").prepend(content); //put in scoreboard
        if (word) {
            $("#score").text(totalpoints);
        }
        // console.log(JSON.stringify(playedMatrix));
        //call someone!
    }

    function tileMe(tile) {//distribute a tile
        HolderTiles += 1;
        if (HolderTiles > 6) {
            $("#give-tile").css({//button color conntrol
                'color': 'gray',
                'border': '2px solid gray'
            });
            $("#give-tile").prop({ 'disabled': true });
            undoAllow();
        }
        $("#holder-tiles").append('<img src="images/Scrabble_Tiles/Scrabble_Tile_' + tile + '.jpg" class="holder-tile draggable" value="' + tile + '" alt="' + tile + '"></img>');
        $(".draggable").draggable({//set the defaults
            snap: ".droppable",
            snapMode: "right",
            cursor: "move",
            cursorAt: { top: 24, left: 24 },
            containment: $("#containment-wrapper")
        });
    }

    function showMessage(text) {
        // Set the message
        $("#messageText").text(text);
    }

    function isWord(submitted) { // checks my homemade dictionary
        if (submitted.includes("_")) {
            console.log("All blanks are words!"); //lol
            return true;
        }
        for (let i = 0; i < english.length; i++) {
            const currentWord = english[i].trim();
            if (currentWord === submitted) {
                // valid word
                return true;
            }
        }
        //NOT A WORD
        showMessage("OOPS! Feel free to hit undo.");
        $("#messageBox").css({
            'color': 'orange'
        });
        return false;
    }
});  
