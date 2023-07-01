/*   File: script.js
     GUI Assignment: Scrabble Board
     Author: Benjamin Jancsy
     Created: June 25, 2023
     Copyright (c) 2023 by Ben.
     References: w3schools.com, jqueryvalidation.org, jqueryui.com, developer.mozilla.org, Assignment files
*/
$().ready(function() {
// make sure its a real word
// make sure 1st ever word is on center
//       -  
//     1 A -
//       -  
// make minesweeper matrix? use matrix of board combo w/ that of submit letters and make sure one has a buddy
// 
// If feeling extra, then make sure submitletters make against grain valid words, start at the
// submit letter, then go left on board pices until . or end of board, then go right on board pieces until . or
// end of bord, then read that and see if its a real word. like a Turing machine.
//
//  Idea 2: go thru submit letter locations and multiply letter value with letter multiplier, then
// add board piece letter values. perhaps do this via a lookup rather than storing letter values.
// 
// then with that same datastructure of submitletters, see if any overlap word multipliers
// 
// make a function for rejecting.
//
// THEN, place submit tiles on the board. and tell em' their score.
// 
// make sure its ok that the minesweeper pieces are checked later and make sure its ok board isn't responsive.
// 






    var allowed = false;
    var dont = 0;
    var occupied = [];
    var UndoStack = [];
    var ScrabbleTiles = {} ;
    var TotalRemain = 100;
    var HolderTiles = 0;
    var entry = [];
    var playedMatrix = [
        [".", "W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
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
    var wordMatrix = [
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
    var letterMatrix = [
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
    ScrabbleTiles["A"] = {"value": 1,  "original": 9,  "remaining": 9 };
    ScrabbleTiles["B"] = {"value": 3,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["C"] = {"value": 3,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["D"] = {"value": 2,  "original": 4,  "remaining": 4 };
    ScrabbleTiles["E"] = {"value": 1,  "original": 12, "remaining": 12};
    ScrabbleTiles["F"] = {"value": 4,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["G"] = {"value": 2,  "original": 3,  "remaining": 3 };
    ScrabbleTiles["H"] = {"value": 4,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["I"] = {"value": 1,  "original": 9,  "remaining": 9 };
    ScrabbleTiles["J"] = {"value": 8,  "original": 1,  "remaining": 1 };
    ScrabbleTiles["K"] = {"value": 5,  "original": 1,  "remaining": 1 };
    ScrabbleTiles["L"] = {"value": 1,  "original": 4,  "remaining": 4 };
    ScrabbleTiles["M"] = {"value": 3,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["N"] = {"value": 1,  "original": 6,  "remaining": 6 };
    ScrabbleTiles["O"] = {"value": 1,  "original": 8,  "remaining": 8 };
    ScrabbleTiles["P"] = {"value": 3,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["Q"] = {"value": 10, "original": 1,  "remaining": 1 };
    ScrabbleTiles["R"] = {"value": 1,  "original": 6,  "remaining": 6 };
    ScrabbleTiles["S"] = {"value": 1,  "original": 4,  "remaining": 4 };
    ScrabbleTiles["T"] = {"value": 1,  "original": 6,  "remaining": 6 };
    ScrabbleTiles["U"] = {"value": 1,  "original": 4,  "remaining": 4 };
    ScrabbleTiles["V"] = {"value": 4,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["W"] = {"value": 4,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["X"] = {"value": 8,  "original": 1,  "remaining": 1 };
    ScrabbleTiles["Y"] = {"value": 4,  "original": 2,  "remaining": 2 };
    ScrabbleTiles["Z"] = {"value": 10, "original": 1,  "remaining": 1 };
    ScrabbleTiles["_"] = {"value": 0,  "original": 2,  "remaining": 2 };

    var english = "";
    // $.get("american-english.txt", function(txt) {
    //     english = txt.split("\n");
    // });
    fetch('./american-english.txt') // replace with the actual path to your file
    .then(response => response.text())
    .then(data => {
      wordsList = data.split('\n');
    })
    .catch(error => console.error('Error:', error));

    undoAllow(false);

    showMessage("Welcome");
    $("#messageBox").css({
            'color': 'green'
    });

    for (var j = 0; j < 15; j++) {
        $("#div-of-droppables").append('<div class="droppable"></div>');
        for (var i = 0; i < 15; i++) {
            $("#div-of-droppables").append('<div class="droppable" id="'+  j + "ji" + i + '"></div>');//id is for matrix
            $('.droppable:last').css({
                'left': (106 + (i * 39)) + 'px',
                'top': (-692 + (j * 42.5)) + 'px', 
                'width': '36px',
                'height': '36px' 
            //    'left': (i * 39 + 200) + 'px',
            //     'top': (j * 42.5 + 118) + 'px',
            //     'background': 'rgba(255, 128, 8, 0.4)', 
            //     'width': '36px',
            //     'height': '36px' 
            });
        }
    }

    function getTile() {
        var choose = Math.floor(Math.random() * TotalRemain);
        var accum = 0;
        for (var key in ScrabbleTiles) {
            //if (ScrabbleTiles.hasOwnProperty(key)) {
                //console.log("Key: " + key, "chose:", choose); 
                accum += ScrabbleTiles[key]["remaining"];
                if (choose < accum) {
                    ScrabbleTiles[key]["remaining"] -= 1;
                    TotalRemain -= 1;
                    return key;
                }
        }
        return 'A';
    }

    $(".droppable").droppable({
        drop: function( event, ui ) {
            x = ui.offset.top;
            y = ui.offset.left;
            var droppableId = $(this).attr('id');
            var draggableValue = ui.helper.attr('value');
            //alert(droppableId);
            entry.push({droppableId, draggableValue});
            HolderTiles -= 1;
            if (TotalRemain) {
                $("#give-tile").css({
                    'color': 'black',
                    'border': '2px solid black'
                });
                $("#give-tile").prop({"disabled": false});
            }
            undoAllow();
            if($(this).hasClass("occupied")) {
                dont = 1;
            }
            else {
                dont = 0; //aka do
            }
            occupied.push(droppableId);
            $(this).addClass("occupied");
        }
    });

    $("#give-tile").on('click', function() {
        if (TotalRemain > 0 && HolderTiles < 7) {
            var tile = getTile();
            tileMe(tile);
        }
        else {
            $("#give-tile").css({
                'color': 'gray',
                'border': '2px solid gray'
            });
            $("#give-tile").prop({"disabled": true});
        }
    });

    function undoAllow() {
            if (UndoStack.length && HolderTiles < 7) {
                $("#undo").css({
                    'color': 'black',
                    'border': '2px solid black'
                })
                $("#undo").prop({disabled: false});
                return true;
            }
            else {
                $("#undo").css({
                    'color': 'gray',
                    'border': '2px solid gray'
                })
                $("#undo").prop({disabled: true});
            }
        return false;
    }

    $("#undo").on('click', function(id) {
        var og = UndoStack.pop();
        tileMe(og.val);
        undoAllow();
        og.element.css ({'display': 'none'});
        drop = occupied.pop();
        if (drop) {
            // Remove the 'occupied' class from the droppable
            $("#" + drop).removeClass("occupied");
        } else {alert("error1")};
        undoAllow();
        entry.pop();
    });
    function allValuesSame(array) {
        for(let i = 1; i < array.length; i++) {
            if(array[i] !== array[0]) {
                return false;
            }
        }
        return true;
    }
    $("#submit").on('click', function() {
        // ensure entries on one line
        var row = [];
        var column = [];
        var submitLetter = [];
        var fullWord = "";
        for (var i = entry.length - 1; i >= 0; i--) {
            var read = entry[i];
            var splitId = read.droppableId.split("ji");
            row.push(splitId[0]);
            //var firstR = row[0]
            column.push(splitId[1]);
            submitLetter.push(read.draggableValue);
            //alert(read.droppableId);
        };
        var rowV = allValuesSame(row);
        var colV = allValuesSame(column);
        var rowLetters = [];
        var columnLetters = [];
        var letter = '';
        if(rowV) {
        [column, submitLetter] = sortArrays(column, submitLetter);
        console.log("post: " + submitLetter);
        console.log("post: " + column);
            //all in one row, now make sure that row has contig. lettas
            //and read the word
            var len = column.length;
            var iter = 0;
            for (var c = 0; c < 15; c++) {
                letter = playedMatrix[row[0]][c];
                if (letter !== '.') {
                    rowLetters.push(letter);
                    fullWord = fullWord.concat(letter);
                    console.log("board read");

                } 
                if (c < column[0] && letter === '.') {
                    console.log("yettostart");
                    rowLetters = [];
                    fullWord = "";
                   // console.log("zapp");
                }
                //console.log("coli " + column[iter] + " " + typeof column[iter] + " " + typeof c);
                if (c === Number(column[iter])) {
                    rowLetters.push(submitLetter[iter]);
                    fullWord = fullWord.concat(letter);
                    iter++;
                    console.log("bing");
                    continue;
                }
                if (c > column[len - 1] && letter === '.') {
                    if (iter < len - 1) {
                        showMessage("INVALID 1");
                        $("#messageBox").css({
                                'color': 'red'
                        });
                        console.log("Row" + row);
                        console.log("Column" + column);
                        console.log("RL: "+ submitLetter);
                        console.log("WD: "+ rowLetters);
                        console.log(column[len - 1]);
                        return;
                    }
                    else {
                        console.log("done");
                        console.log("WD: "+ rowLetters);
                        entry = [];

                        isWord(fullWord);
                        showMessage("SUCCESS");
                        $("#messageBox").css({
                                'color': 'green'
                        });
                        return;
                    }
                }
                if (c > column[0] && c < column[column.length - 1] && letter === '.') {
                    console.log("i2c: " + c);
                    console.log("i2: " + column[column.length - 1]);
                    showMessage("INVALID 2");
                    $("#messageBox").css({
                            'color': 'red'
                    });
                    return;
                }
            }
        }
        if(colV) { //NOTE: both will be true when 1x1
            //all in one row, now make sure that row has contig. lettas
            //and read the word

            [row, submitLetter] = sortArrays(row, submitLetter);
        console.log("rpost: " + submitLetter);
        console.log("rpost: " + row);
            //all in one row, now make sure that row has contig. lettas
            //and read the word
            var len = row.length;
            var iter = 0;
            for (var r = 0; r < 15; r++) {
                letter = playedMatrix[r][column[0]];
                if (letter !== '.') {
                    columnLetters.push(letter);
                    fullWord = fullWord.concat(letter);
                    console.log("rboard read");

                } 
                if (r < row[0] && letter === '.') {
                    console.log("ryettostart");
                    columnLetters = [];
                    fullWord = "";
                   // console.log("zapp");
                }
                //console.log("coli " + column[iter] + " " + typeof column[iter] + " " + typeof c);
                if (r === Number(row[iter])) {
                    columnLetters.push(submitLetter[iter]);
                    fullWord = fullWord.concat(letter);
                    iter++;
                    console.log("rbing");
                    continue;
                }
                if (r > row[len - 1] && letter === '.') {
                    if (iter < len - 1) {
                        showMessage("rINVALID 1");
                        $("#messageBox").css({
                                'color': 'red'
                        });
                        console.log("rRow" + row);
                        console.log("rColumn" + column);
                        console.log("rRL: "+ submitLetter);
                        console.log("rWD: "+ columnLetters);
                        console.log(row[len - 1]);
                        return;
                    }
                    else {
                        console.log("rdone");
                        console.log("rrWD: "+ columnLetters);
                        entry = [];
                        isWord(fullWord);
                        showMessage("SUCCESS");
                        $("#messageBox").css({
                                'color': 'green'
                        });
                        return;
                    }
                }
                if (r > row[0] && r < row[row.length - 1] && letter === '.') {
                    console.log("ri2c: " + r);
                    console.log("ri2: " + row[row.length - 1]);
                    showMessage("rINVALID 2");
                    $("#messageBox").css({
                            'color': 'red'
                    });
                    return;
                }
            }
        }
        if (!rowV && !colV) {
            showMessage("INVALID 3");
            $("#messageBox").css({
                    'color': 'red'
            });
            return;
        }
        else {
                    console.log("WDr final: "+ rowLetters);
                    console.log("WDc final: "+ columnLetters);
                        entry = [];
                        isWord(fullWord);
                        showMessage("SUCCESS");
                        $("#messageBox").css({
                                'color': 'green'
                        });
                        return;
        }
        // determine the made words
        // make sure the words are valid
        // calculate the points
        // clear appropriate data
/*         UndoStack = [];
        undoAllow();
        var read;
        while (entry.length) {
            read = entry.pop();
            alert(read.draggableValue);
        }
        droppableId, draggableValue; */
    });
    function sortArrays(numbers, letters) {
        if (numbers.length !== letters.length) {
            throw new Error('Both arrays must have the same length');
        }
        console.log("sal: " + letters);
        console.log("san: " + numbers);
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
    $(document).on( "drag", function( event, ui ) {
        ui.helper.css({
            'width': '38px'
        });
    });

    $(document).on( "dragstop", function( event, ui ) {
        ui.helper.draggable({ disabled: true });
        var oldTop = ui.position.top;
        var oldLeft = ui.position.left;
       // tileMe( ui.helper.attr('value'));
        var val = ui.helper.attr('value');
        //alert(oldLeft);
        //var dropId = ui.helper.droppable('instance').element.attr('id');//s}
        //catch {all};
        UndoStack.push({ val, element: ui.helper});
        undoAllow();
        $("#undo").prop("disabled",false);
        if(dont) {
            var og = UndoStack.pop();
            undoAllow();
            occupied.pop();
            tileMe(og.val);
            og.element.css ({'display': 'none'})
            entry.pop();
        }
        ui.helper.css({
            //'width': '38px',
            'left': y + 'px',
            'top': x + 'px',
        }); //draggable ui-draggable ui-draggable-handle ui-draggable-disabled
        ui.helper.removeClass("holder-tile draggable ui-draggable ui-draggable-handle ui-draggable-disabled");
        ui.helper.addClass("board-piece");
    });

    function tileMe(tile) {
        HolderTiles += 1;
        if (HolderTiles > 6) {
            $("#give-tile").css({
                'color': 'gray',
                'border': '2px solid gray'
            });
            $("#give-tile").prop({'disabled': true});
            undoAllow();
        }
        $("#holder-tiles").append('<img src="../images/Scrabble_Tiles/Scrabble_Tile_' + tile + '.jpg" class="holder-tile draggable" value="' + tile + '" alt="' + tile + '"></img>');
        $( ".draggable" ).draggable({
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
        // Show the message box
        $("#messageBox").show();
    }
    // function hideMessage() {
    //     // Hide the message box
    //     $("#messageBox").hide();
    // }

    function isWord(submitted) {
        let start = 0;
        let end = english.length - 1;
    
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);
    
            if (english[mid] === value) {
                // Found the value
                console.log("YES WORD");
                return true;
            } else if (english[mid] < value) {
                // Continue search on right side
                start = mid + 1;
            } else {
                // Continue search on left side
                end = mid - 1;
            }
        }
        console.log("NOT A WORD");
        // Value not found
        return false;
    }

});  
