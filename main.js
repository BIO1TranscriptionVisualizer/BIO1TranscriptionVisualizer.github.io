/*
function test(){
    console.log('Hello World!');
    const textfield = document.getElementById("transcriber-in");
    let data = textfield.value;
    console.log(data);
}
*/

/*
Debug output will start with [MAIN]: 

Main is called every time the button is pressed, essentially the website will not have
any active rendering and will instead essentially be modified entirely every time the
transcribe button is pressed.

There are currently no features that require the website to maintain even super short term memory.
*/
function main(){
    const debugText = "[MAIN]: ";
    let transcripton_container = document.getElementById("transcription-container");

    const textfield = document.getElementById("transcriber-in");
    let data = textfield.value; // this willbe a string
    dbugPrint(debugText,data);
    cleanData = cleanInput(data);
    let topBases = cleanData;
    let botBases = calcComplimentDNA(cleanData);
    let rnaBases = calcRNA(cleanData);
    if (validateInput(cleanData)){
        // remove old elements
        deleteOldElements();

        dbugPrint(debugText,topBases);
        dbugPrint(debugText,botBases);
        dbugPrint(debugText,rnaBases);
        // generate new elements
        for (let i = 0; i < data.length; i++){
            let newElement = generateTranscriptionElement(topBases[i],botBases[i],rnaBases[i]);
            transcripton_container.appendChild(newElement);
        }
    } else {
        alert("Bad Input! DNA only contains the base pairs A, T, C, or G.");
    }

    
    
}

/*
Debug output will start with [GTE]: 
*/

function generateTranscriptionElement(topBase,bottomBase,mrnaBase){
    const debugText = "[GTE]: ";

    let bTop = topBase.toLowerCase();
    let bBot = bottomBase.toLowerCase();
    let bRna = mrnaBase.toLowerCase();

    // building elements

    let transcription_element_container = document.createElement("div");
    transcription_element_container.className = "transcription-element-container";

    let dna_block = document.createElement("div");
    dna_block.className = "nucleic-acid-block dna-block";

    let mrna_block = document.createElement("div");
    mrna_block.className = "nucleic-acid-block mrna-block";

    let top_acid = document.createElement("p");
    top_acid.className = "nucleic-acid acid-top acid-" + bTop;
    top_acid.innerText = topBase; // They're called both acids and bases because nucleic acids
                                  // are also called base pairs, i don't fucking know it's just
                                  // a single letter one is capital one is lowercase.

    let bot_acid = document.createElement("p");
    bot_acid.className = "nucleic-acid acid-bottom acid-" + bBot;
    bot_acid.innerText = bottomBase;


    let rna_acid = document.createElement("p");
    rna_acid.className = "nucleic-acid acid-mrna acid-" + bRna;
    rna_acid.innerText = mrnaBase;

    // building elements

    // build heirarchy

    dna_block.appendChild(top_acid);
    dna_block.appendChild(bot_acid);

    mrna_block.appendChild(rna_acid);

    transcription_element_container.appendChild(dna_block);
    transcription_element_container.appendChild(mrna_block);

    // build heirarchy

    return transcription_element_container;
}

function calcComplimentDNA(dna){
    let compliment = "";
            for (let i= 0; i < dna.length; i++){
                if (dna[i] == "A"){
                    compliment = compliment + "T";
                }
                else if (dna[i] == "T"){
                    compliment = compliment + "A";
                }
                else if (dna[i] == "C"){
                    compliment = compliment + "G";
                }
                else if (dna[i] == "G"){
                    compliment = compliment + "C";
                }
            }
            return compliment;
}
/*
Just does uracil replacement, uses original text.
*/
function calcRNA(dna){
    let compdna = calcComplimentDNA(dna);
    return compdna.replaceAll("T", "U");
}

/*
Lifetime Management, Deletes old Visualization Elements.
*/
function deleteOldElements(){
    // this list is a live collection so it's length literally changes when an element is deleted.
    // thus we iterate backwards to avoid conflicts related to going out of bounds.
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
    let elements = document.getElementsByClassName("transcription-element-container");
    for(let i = elements.length-1; i >= 0; i--){
        elements[i].remove();
    }
}

/*
Makes sure you're only entering a string combination of A,T,C, and G.
Assumed you already cleaned string but isn't entirely necessary. Cleaning the
string just increases the number of valid inputs!

THIS COULD BE SMALLER WITH REGULAR EXPRESSIONS I KNOW!

Debug output will start with [VI]:

*/
function validateInput(data){
    const debugText = "[VI]: ";
    for(let i = 0; i < data.length; i++){
        if(!(data[i] == "A" || data[i] == "T" || data[i] == "C" || data[i] == "G")){
            dbugPrint(debugText,"False!");
            return false;
        }
    }
    dbugPrint(debugText,"True!");
    return true;
}

/*
Removes whitespaces and makes everything uppercase
Debug Output will start with [CI]:

*/
function cleanInput(data){
    const debugText = "[CI]: ";
    dbugPrint(debugText, data + " original");

    let cleanedData = data.trim(); // remove ending and leading whitespace
    cleanedData = cleanedData.toUpperCase(); // uppercase
    cleanedData = cleanedData.replace(/\s+/g, '') // remove inner spaces (it's a regular expression)
    // https://stackoverflow.com/questions/5964373/is-there-a-difference-between-s-g-and-s-g

    dbugPrint(debugText, cleanedData + " cleaned");
    return cleanedData;
}

function dbugPrint(debugText,toPrint){
    console.log(debugText+toPrint);
}