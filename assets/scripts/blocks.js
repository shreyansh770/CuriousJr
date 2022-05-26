$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['Bot'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck("String")
      .appendField(new Blockly.FieldLabelSerializable("Bot"), "NAME");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");

  }
};

Blockly.Blocks['dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Ask me a question:')
      .appendField(new Blockly.FieldDropdown([
        ['What is the date today?', 'ITEM1'],
        ['What is the time now?', 'ITEM2'],
        ['How are you?', 'ITEM3'],
        ['What is JavaScript?', 'ITEM4'],
        ['What is your name?', 'ITEM5']
      ]), 'FIELDNAME');

    this.setOutput(true, null); // connection notch on left
    // console.log(this);

  }
};

Blockly.JavaScript["dropdown"] = function (block) {
  var question = block.getFieldValue()
  console.log(question);
}

Blockly.JavaScript["Bot"] = function (block) {
  console.log("cliked");

  var text_input = block.getFieldValue("input");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
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