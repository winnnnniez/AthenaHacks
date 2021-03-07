// initialization
const min_stress = 0;
const max_stress = 10;
const month_limit = 30;

var wallet = 2000;
var debt = 30000;
var stress_meter = 5;
var month = 0;

// input n -> # of money changes
// output ret -> related changes of stress point
function f(n) {
  if (n > 0) {var i = -1} else {var i = 1};
  var n = Math.abs(n);
  var ret = 0.03*Math.abs((n+(Math.log(n)))) ** (0.4);
  var ret = ret.toFixed(2)
  return ret*i;
}

// debt interest
const rate = 0.05 // annually rate 5% - calculate every 12 month
function loan_calculator(principal, rate) {
  var balance = (1+rate) * principal;
  return balance;
}

// jobs
class Job {
  constructor(args) {
      // each month
      this.income = args.income;
      this.stress = args.stress;
  }

  work(wallet, stress) {
      wallet += this.income;
      stress += this.stress;
      return [wallet, stress];
  }
}

var high_stress = new Job({income:5000, stress:0.8});
var startup = new Job({income:3000, stress:0.5});
var low_stress = new Job({income:1500, stress:0.2});


// events
// [money, stress_point]
const events = {"medical": {"surgery": [(-10000), f(-10000)], "clinic": [(-200), f(-200)], "fever": [(-50), f(-50)]},
                 "robbery": {"day": [(-100), 2*f(-100)], "night": [(-500), 2*f(-500)]},
                 "car": {"repair": [(-2000), f(-2000)], "buy_new": [(-15000), 0.2], "public_transit": [(-200), f(-200)]},
                 "extra_work": {"accept": [200, -f(200)], "ignore": [0, -0.3]},
                 "house_burn_down": [(-20000), f(-20000)],
                 "promotion": [1000, (-0.8)]};

// event probability
let prob_dict = {'medical': 1, 'robbery': 0.5, 'car': 1, 'extra_work': 1, 'house_burn_down': 0.5, 'promotion': 1};

// if 'car' -> 'public_transit' = true
// prob_dict[robbery] = 1.4
// prob_dict[car] = 0

// probability of events
//  input stress_score -> affect some of the events
//        prob_dict -> {event: prob increase parameters (default=0.5 for house_burn_down and robbery, 1 for others); ...}
//  output e -> event will happen
function event_prob(stress_score, prob_dict) {

  if (stress_score > 7) {
    prob_dict['medical'] = 1.4
    prob_dict['promotion'] = 0.7
    prob_dict['extra_work'] = 0.4;
} else if (stress_score < 3) {
    prob_dict['extra_work'] = 1.4;
    prob_dict['medical'] = 0.6;
} else {
    prob_dict['promotion'] = 1.2;
};

  let chance = new Array();
  for (let k in prob_dict) {
    probability = Math.floor(Math.random() * 100) * prob_dict[k];
    chance.push([probability, k]);
  };

  chance.sort().reverse();
  return chance[0][1];
};

// console.log(event_prob(2, prob_dict));


// de_stresser
var de_stresser_array = ['skip_work', 'video_game'];
var de_stresser = {"skip_work": [(-200), -0.5],
                   "video_game": [0, -0.3]};
