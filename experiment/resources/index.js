
var listnumber = _.sample(_.range(1, 14))
var condition = "primed"

// var stimfile = "stims_" + listnumber + "_" + condition;
var stimfile = generate_stim_set();
var order = 1;
//var truefalse_response = "na";

function make_slides(f) {
  var slides = {};
  var present_list = stimfile// _.shuffle(stims.concat(fillers)); //
  // var present_list = _.shuffle(fillers);
  slides.consent = slide({
    name : "consent",
    start: function() {
      exp.startT = Date.now();
      $("#consent_2").hide();
      exp.consent_position = 0;
    },
    button : function() {
      if(exp.consent_position === 0) {
        exp.consent_position++;
        $("#consent_1").hide();
        $("#consent_2").show();
      } else {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    }
  });

  slides.i0 = slide({
    name : "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });

  slides.trial = slide({
    name : "trial",
    present : present_list,
    start: function() {
      exp.startT = Date.now();
    },

  present_handle : function(stim) {
  // if stim is an attention check, pass html 
  this.stim = stim;
  $(".prompt").html("<p><strong>" + stim.stim + "</strong></p>"); /*"<u>Speaker A</u>: <p class='hangingindent'>" + stim.setup + ". " + 
    stim.question + "</p><br>" + "<u>Speaker B</u>: <p class='hangingindent'><b>" + 
    stim.response + ".</b></p>") ;*/
},
button: function(stim) {
  if ($('input[name="rating"]:checked').val() === undefined) {
    $(".error").show();
  } else {
    $(".error").hide()
    /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        /*if (this.stim.type == "filler" &  this.stim.truefalse_question != "na" & $('input[name="truefalse"]:checked').val() === undefined) {
          $('.truefalse-buttons').show()
          $('.vertical-radio-buttons').hide()
          $(".prompt").html("Given what you just read, is the following true or false: <p><b>" +
            this.stim.truefalse_question + "</b>.") ;
        } else {
          if (this.stim.truefalse_question === "na") {
            truefalse_response = "na";
          } else {
            truefalse_response = $('input[name="truefalse"]:checked').val();
          }*/
          this.log_responses();
          _stream.apply(this);
          $('input[name="rating"]').attr('checked',false)
          //$('input[name="truefalse"]').attr('checked',false)
          //$('.truefalse-buttons').hide()
          $('.vertical-radio-buttons').show()
        //}
      }
  },
      log_responses: function() {
      exp.data_trials.push({
        "rating" : $('input[name="rating"]:checked').val(),
        "stim" : this.stim.stim,
        "first_conj_subj" : this.stim.first_conj_subj,
        "last_conj_subj" : this.stim.last_conj_subj,
        "stim_type" : this.stim.stim_type,
        "predicate_type" : this.stim.predicate_type,
        "has_gapping" : this.stim.has_gapping,
        "has_negation" : this.stim.has_negation,
        "tense" : this.stim.tense,
        "verb" : this.stim.verb,
        "first_conj_arg" : this.stim.first_conj_arg,
        "last_conj_arg" : this.stim.last_conj_arg,
        //"question" : this.stim.question,
        //"answer" : this.stim.response,
        //"type" : this.stim.type,
        //"expression" : this.stim.expr,
        //"polarity" : this.stim.polarity,
        //"truefalse_question" : this.stim.truefalse_question,
        //"truefalse_answer" : this.stim.truefalse_answer,
        //"truefalse_response" : truefalse_response,
        "order" : order,
      });
    order = order + 1;
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample([1-4]); //can randomize between subject conditions here
  // exp.order = _.sample(["4fillerspacing","nofillerspacing"]);
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["consent","i0","instructions","trial","thanks"];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
