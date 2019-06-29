
var feature_lib = {
	"predicate_type" : ["verbal", "participial"],
	"first_conj_subject" : [1, 2, 3],
	"last_conj_subject" : [1, 2, 3],
	"has_gapping" : [true, false],
	"has_negation" : [false],
	"stim_type" : ["target", "filler-first-conj-agreement", "filler-licensed-NPI", "filler-unlicensed-NPI"],
	"tense" : ["past"],
	"lexical_verb" : ["drink", "go"]
};

var lexical_arguments = {
	"drink" : ["fruit_juice", "tea", "coffee"],
	"go" : ["to_Ankara", "to_Adana", "to_Trabzon"]
};

var argument_forms = {
	"fruit_juice" : "meyve suyu",
	"tea" : "çay",
	"coffee" : "kahve",
	"to_Ankara" : "Ankara'ya",
	"to_Adana" : "Adana'ya",
	"to_Trabzon" : "Trabzon'a"
};

var verb_forms = {
	"drink" : "iç",
	"go" : "git"
};

var negation_forms = {
	false : "",
	true : "me"
}

var aspect_forms = {
	"verbal" : "",
	"participial" : "miş"
};

function get_tense_form(negation, aspect, tense){
	// error checking
	if(tense != "past"){
		console.log("ERROR: INVALID TENSE");
		console.log(tense);
		return null; // ERROR: INVALID TENSE
	}

	if(negation == "me"){
		if(aspect == "miş"){return "ti";}
		else {return "di";}
	}else{
		return "ti";
	}
}

var subject_forms = {
	1 : "ben",
	2 : "sen",
	3 : "o"
};

var agreement_forms = {
	1 : "m",
	2 : "n",
	3 : ""
};

/* Shuffle function from "https://bost.ocks.org/mike/shuffle/"
 * shuffles in place
 */
function shuffle(array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

/* Samples |n| from array. Does not modify input array.
 */
function sample(array, n=0) {
	if(n==0){n=array.length;}
	if(n > array.length){
		console.log("ERROR: SAMPLING MORE ELEMENTS THAN IN ARRAY");
		console.log("array = ", array);
		console.log("n = ", n);
	}
	new_arr = [...array];
	shuffle(new_arr);
	return new_arr.slice(0,n);
}

function get_lexical_arguments(verb){
	/* Returns two distinct lexical gloss of a random argument for a given verb.
	 * @param string verb: the lexical gloss for the verb
	 * @returns list_of_strings: two lexical glosses that are randomly chosen
	 */
	 var arg_list = lexical_arguments[verb];
	 shuffle(arg_list);
	 return arg_list.slice(0,2);
}

function capitalize(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function generate_stim(features) {
	/* Generates stimuli string from features that are passed in.
	 * @param dictionary features: the keys are typed values that determine which string should be inserted into slots in template.
	 * @returns string stimuli: generated stimuli sentence
	 */
	 var stim_row = {};

	 switch(features['stim_type']){
	 	case 'target':
	 		if(features['first_conj_subj'] == features['last_conj_subj']){
	 			var first_subj = features['first_conj_subj'];
	 			var last_subj = features['last_conj_subj'];
	 			var first_subj_form = subject_forms[first_subj];
	 			var last_subj_form = subject_forms[last_subj];
	 			var first_agr_form = agreement_forms[first_subj];
	 			var last_agr_form = agreement_forms[last_subj];

	 			var has_gap = features['has_gapping'];

	 			var has_neg = features['has_negation'];
	 			var neg_form = negation_forms[has_neg];

	 			var lex_verb = features['lexical_verb'];
	 			var verb_form = verb_forms[lex_verb];
	 			
				var lex_args = get_lexical_arguments(lex_verb);
	 			var first_arg = lex_args[0], last_arg = lex_args[1];
	 			var first_arg_form = argument_forms[first_arg];
	 			var last_arg_form = argument_forms[last_arg];

	 			var aspect_form = aspect_forms[features['predicate_type']];
	 			var tense_form = get_tense_form(negation=neg_form,aspect=aspect_form,tense=features['tense']);

	 			// VARIANT: include contrastive dA
	 			if(has_gap){
	 				var stim_sent = `${first_subj_form} Çarşamba günü ${first_arg_form}, `
	 				+ `dün de ${last_arg_form} ${verb_form}${aspect_form}${tense_form}${first_agr_form}.`;
	 			}else{
	 				var stim_sent = `${first_subj_form} Çarşamba günü ${first_arg_form} ${verb_form}${aspect_form}${tense_form}${first_agr_form}, `
	 				+ `dün de ${last_arg_form} ${verb_form}${aspect_form}${tense_form}${last_agr_form}.`;
	 			}
	 			stim_sent = capitalize(stim_sent);
	 		}else{
	 			var first_subj = features['first_conj_subj'];
	 			var last_subj = features['last_conj_subj'];
	 			var first_subj_form = subject_forms[first_subj];
	 			var last_subj_form = subject_forms[last_subj];
	 			var first_agr_form = agreement_forms[first_subj];
	 			var last_agr_form = agreement_forms[last_subj];

	 			var has_gap = features['has_gapping'];

	 			var has_neg = features['has_negation'];
	 			var neg_form = negation_forms[has_neg];

	 			var lex_verb = features['lexical_verb'];
	 			var verb_form = verb_forms[lex_verb];
	 			
				var lex_args = get_lexical_arguments(lex_verb);
	 			var first_arg = lex_args[0], last_arg = lex_args[1];
	 			var first_arg_form = argument_forms[first_arg];
	 			var last_arg_form = argument_forms[last_arg];

	 			var aspect_form = aspect_forms[features['predicate_type']];
				var tense_form = get_tense_form(negation=neg_form,aspect=aspect_form,tense=features['tense']);

	 			var contr_focus_form = (last_subj == 3 ? "da" : "de");

	 			// VARIANT: include contrastive dA
	 			if(has_gap){
	 				var stim_sent = `${first_subj_form} ${first_arg_form}, `
	 				+ `${last_subj_form} ${contr_focus_form} ${last_arg_form} ${verb_form}${aspect_form}${tense_form}${last_agr_form}.`;
	 			}else{
	 				var stim_sent = `${first_subj_form} ${first_arg_form} ${verb_form}${aspect_form}${tense_form}${first_agr_form}, `
	 				+ `${last_subj_form} ${contr_focus_form} ${last_arg_form} ${verb_form}${aspect_form}${tense_form}${last_agr_form}.`;
	 			}
	 			stim_sent = capitalize(stim_sent);
	 		}
	 		break;
	 	case 'filler-first-conj-agreement':
	 		var first_subj = features['first_conj_subj'];
 			var last_subj = features['last_conj_subj'];
 			var first_subj_form = subject_forms[first_subj];
 			var last_subj_form = subject_forms[last_subj];
 			var first_agr_form = agreement_forms[first_subj];
 			var last_agr_form = agreement_forms[last_subj];

 			var has_gap = features['has_gapping'];

 			var has_neg = features['has_negation'];
 			var neg_form = negation_forms[has_neg];

 			var lex_verb = features['lexical_verb'];
 			var verb_form = verb_forms[lex_verb];
 			
			var lex_args = get_lexical_arguments(lex_verb);
 			var first_arg = lex_args[0], last_arg = lex_args[1];
 			var first_arg_form = argument_forms[first_arg];
 			var last_arg_form = argument_forms[last_arg];

 			var aspect_form = aspect_forms[features['predicate_type']];
 			var tense_form = get_tense_form(negation=neg_form,aspect=aspect_form,tense=features['tense']);

 			var contr_focus_form = (last_subj == 3 ? "da" : "de");

 			// VARIANT: include contrastive dA
 			var stim_sent = `${first_subj_form} ${first_arg_form}, `
 				+ `${last_subj_form} ${contr_focus_form} ${last_arg_form} ${verb_form}${aspect_form}${tense_form}${first_agr_form}.`;
 			stim_sent = capitalize(stim_sent);
	 		break;
	 	case 'filler-licensed-NPI':
	 	case 'filler-unlicensed-NPI':
	 		var first_subj = features['first_conj_subj'];
 			//var last_subj = features['last_conj_subj'];
 			var first_subj_form = subject_forms[first_subj];
 			//var last_subj_form = subject_forms[last_subj];
 			var first_agr_form = agreement_forms[first_subj];
 			//var last_agr_form = agreement_forms[last_subj];

 			var has_gap = features['has_gapping'];
 			
 			var has_neg = features['has_negation'];
 			var neg_form = negation_forms[has_neg];

 			var lex_verb = features['lexical_verb'];
 			var verb_form = verb_forms[lex_verb];
 			
			var lex_args = get_lexical_arguments(lex_verb);
 			var first_arg = lex_args[0];
 			var last_arg = "NA";
 			var first_arg_form = argument_forms[first_arg];
 			//var last_arg_form = argument_forms[last_arg];

 			var aspect_form = aspect_forms[features['predicate_type']];
 			var tense_form = get_tense_form(negation=neg_form,aspect=aspect_form,tense=features['tense']);

 			//var contr_focus_form = (last_subj == 3 ? "da" : "de");

 			// VARIANT: include contrastive dA
 			//var stim_sent = `${first_subj_form} hiç ${first_arg_form},`
 			//	+ ` ${last_subj_form} ${contr_focus_form} hiç ${last_arg_form} ${verb_form}${neg_form}${aspect_form}${tense_form}${last_agr_form}.`;
 			var stim_sent = `$Bugüne kadar hiç ${first_arg_form} ${verb_form}${neg_form}${aspect_form}${tense_form}${first_agr_form}.`
 			stim_sent = capitalize(stim_sent);
	 		break;
	 	default:
	 	// ERROR: Undefined stim_type"
	 		console.log("ERROR: UNDEFINED stim_type");
	 		console.log(features);
	 		return {};
	 }
	 stim_row = {
	 	"stim" : stim_sent,
	 	"stim_type" : features["stim_type"],
	 	"predicate_type" : features["predicate_type"],
	 	"first_conj_subj" : features["first_conj_subj"],
	 	"last_conj_subj" : features["last_conj_subj"],
	 	"has_gapping" : features["has_gapping"],
	 	"tense" : features["tense"],
	 	"has_negation" : features["has_negation"],
	 	"verb" : lex_verb,
	 	"first_conj_arg" : first_arg,
	 	"last_conj_arg" : last_arg
	 };
	return stim_row;
}

function generate_stim_set(n_fillers = {'filler-first-conj-agreement':3,'filler-unlicensed-NPI':4,'filler-licensed-NPI':7}){
	stimuli = [];

	// generate target stimuli
	// 36 stimuli
	for(i_f_subj in feature_lib['first_conj_subject']){
		var f_subj = feature_lib['first_conj_subject'][i_f_subj];
		for(i_l_subj in feature_lib['last_conj_subject']){
			var l_subj = feature_lib['last_conj_subject'][i_l_subj];
			for(i_pred_type in feature_lib['predicate_type']){
				var pred_type = feature_lib['predicate_type'][i_pred_type];
				for(i_tense in feature_lib['tense']){
					var tense = feature_lib['tense'][i_tense];
					for(i_has_gap in feature_lib['has_gapping']){
						var has_gap = feature_lib['has_gapping'][i_has_gap];
						var stim_type = "target"
						var verb_list = feature_lib['lexical_verb'];
						var verb = verb_list[Math.floor(Math.random() * verb_list.length)];
						var has_neg = false;
						var stim_feats = {
							"predicate_type" : pred_type,
							"first_conj_subj" : f_subj,
							"last_conj_subj" : l_subj,
							"has_gapping" : has_gap,
							"has_negation" : has_neg,
							"stim_type" : stim_type,
							"tense" : tense,
							"lexical_verb" : verb
						};
						stimuli.push(generate_stim(stim_feats));					
					}
				}
			}
		}
	}

	// generate bad filler: gapping w/ first-subject agreement
	// max 3x2 = 6 stimuli, non-repeating first_subj & last_subj combinations
	var fillers = [];
	var stim_type = 'filler-first-conj-agreement';
	// make sure each filler has a different subject combinations (different per stim), and non-matching subjects (no 1-1, 2-2, 3,3)
	for(i_f_subj in feature_lib['first_conj_subject']){
		var f_subj = feature_lib['first_conj_subject'][i_f_subj];
		for(i_l_subj in feature_lib['last_conj_subject']){
			if(i_f_subj == i_l_subj){continue;};
			var l_subj = feature_lib['last_conj_subject'][i_l_subj];
			var pred_type = feature_lib['predicate_type'][Math.floor(Math.random() * feature_lib['predicate_type'].length)];
			var tense = feature_lib['tense'][Math.floor(Math.random() * feature_lib['tense'].length)];
			var verb = feature_lib['lexical_verb'][Math.floor(Math.random() * feature_lib['lexical_verb'].length)];
			var has_neg = false;
			var has_gap = true;
			var stim_feats = {
				"stim_type" : stim_type,

				"predicate_type" : pred_type,
				"first_conj_subj" : f_subj,
				"last_conj_subj" : l_subj,
				"has_gapping" : has_gap,
				"has_negation" : has_neg,
				"tense" : tense,
				"lexical_verb" : verb			
			}
			fillers.push(stim_feats);
		}
	}
	// select random fillers from list
	var sampled_fillers = sample(fillers, n=n_fillers[stim_type]);
	for(i in sampled_fillers){
		stimuli.push(generate_stim(sampled_fillers[i]));
	}

	// genereate bad filler: unlicensed NPI
	// max 12 sentences, 2 x (each subject {1,2,3} in both pred_types {verbal, participial})
	var fillers = [];
	var stim_type = 'filler-unlicensed-NPI';
	for(i_f_subj in feature_lib['first_conj_subject']){
		var f_subj = feature_lib['first_conj_subject'][i_f_subj];
		for (var i = 0; i < 2; i++){
			for(i_pred_type in feature_lib['predicate_type']){
				var pred_type = feature_lib['predicate_type'][i_pred_type];
				var l_subj = "NA";
				//var pred_type = feature_lib['predicate_type'][Math.floor(Math.random() * feature_lib['predicate_type'].length)];
				var tense = feature_lib['tense'][Math.floor(Math.random() * feature_lib['tense'].length)];
				var verb = feature_lib['lexical_verb'][Math.floor(Math.random() * feature_lib['lexical_verb'].length)];
				var has_neg = false; // IMPORTANT for UNLICENSED NPI
				var has_gap = false; // ???
				var stim_feats = {
					"stim_type" : stim_type,
					
					"predicate_type" : pred_type,
					"first_conj_subj" : f_subj,
					"last_conj_subj" : l_subj,
					"has_gapping" : has_gap,
					"has_negation" : has_neg,
					"tense" : tense,
					"lexical_verb" : verb			
				}
				fillers.push(stim_feats);
			}
		}
	}
	// select random fillers from list
	var sampled_fillers = sample(fillers, n=n_fillers[stim_type]);
	for(i in sampled_fillers){
		stimuli.push(generate_stim(sampled_fillers[i]));
	}

	// genereate good filler: licensed NPI
	// max 12 sentences, 2 x (each subject {1,2,3} in both pred_types {verbal, participial})
	var fillers = [];
	var stim_type = 'filler-licensed-NPI';
	for(i_f_subj in feature_lib['first_conj_subject']){
		var f_subj = feature_lib['first_conj_subject'][i_f_subj];
		for (var i = 0; i < 2; i++){
			for(i_pred_type in feature_lib['predicate_type']){
				var pred_type = feature_lib['predicate_type'][i_pred_type];
				var l_subj = "NA";
				//var pred_type = feature_lib['predicate_type'][Math.floor(Math.random() * feature_lib['predicate_type'].length)];
				var tense = feature_lib['tense'][Math.floor(Math.random() * feature_lib['tense'].length)];
				var verb = feature_lib['lexical_verb'][Math.floor(Math.random() * feature_lib['lexical_verb'].length)];
				var has_neg = true; // IMPORTANT for UNLICENSED NPI
				var has_gap = false; // ???
				var stim_feats = {
					"stim_type" : stim_type,
					
					"predicate_type" : pred_type,
					"first_conj_subj" : f_subj,
					"last_conj_subj" : l_subj,
					"has_gapping" : has_gap,
					"has_negation" : has_neg,
					"tense" : tense,
					"lexical_verb" : verb			
				}
				fillers.push(stim_feats);
			}
		}
	}
	// select random fillers from list
	var sampled_fillers = sample(fillers, n=n_fillers[stim_type]);
	for(i in sampled_fillers){
		stimuli.push(generate_stim(sampled_fillers[i]));
	}

	return sample(stimuli); //returns shuffled stimuli set
	//return stimuli; //return unshuffled stimuli set
}

