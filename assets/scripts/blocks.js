let d = new Date()

let date = d.toLocaleDateString('en-us', {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric"
})

let time = d.getHours() + ":" + d.getMinutes()


$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});


// Bot block
Blockly.Blocks['Bot'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck("String")
      .appendField(new Blockly.FieldLabelSerializable("Bot"), "input");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");

  }
};

// dropdown block
Blockly.Blocks['dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Ask me a question:')
      .appendField(new Blockly.FieldDropdown([
        ['What is the date today?', `Today is ${date}`],
        ['What is the time now?', `The time is ${time}`],
        ['How are you?', 'I am fine thankyou'],
        ['What is JavaScript?', 'JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much everything else'],
        ['What is your name?', 'My name is Shreyansh']
      ]), 'dropquestions');

    this.setOutput(true, null); // connection notch on left

  }
};


// dropdown function
Blockly.JavaScript["dropdown"] = function (block) {
  console.log("dropdown clicked");

  if (this.parentBlock_ == null) {
    var code = `
    var inputTextValue = "Please join the Bot and Question block";
    `;
    return code;
  }
}

// bot function
Blockly.JavaScript["Bot"] = function (block) {

  console.log("bot clicked");

  if (this.childBlocks_.length == 0) {
    var code = `
    var inputTextValue = "Please join the Bot and Question block";
    `;

    return code
  } else {
    var answer = this.childBlocks_[0].getFieldValue("dropquestions")

    var code = `
    var inputTextValue = "${answer}";
    `;
    return code;
  }


};


//1
var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  maxBlocks: 2,
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}


//2
function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
}