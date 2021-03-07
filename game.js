
const questionElement = document.getElementById('question')
const answersElement = doucment.getElementById('answers')

//keeps track of how which answers are chosen
let state = {}

//function definitions
function start(){
	//add a start screen
	state={}
	showQuestion(1)
}

function showQuestion(questionIndex){
	const question = question.find(question => question.id === questionIndex)
	questionElement.innertext = question.text
	while (answersElement.firstChild)
		{
			answersElement.removeChild(answersElement.firstChild)
		}
	
	question.answers.forEach(answer => { if (showAnswer(answer))
		{
			const button = document.createElement('button')
			button.innerText = answer.text
			button.classlist.add('button')
			button.addEventListener('click', () => pickAnswer(answer))
			answersElement.appendChild(button)
		}
	})
}

function showAnswer(answer) {
	return true
}

function pickAnswer(answer){
	
	
}


const question= 
[
	{
		id: 1,
		text: 'Work is calling you in and its a Saturday.',
		answers: 
		[
			{
				//answer 1 incMoney
				text: 'You could really use the extra money. Pick up the phone and come in.',
				setState: { incMoney: true },
				nextQuestion: 2
			},
			{
				//answer 2 decStress
				text: 'The couch is calling your name. Stay at home and play with your cat, Zelda, instead.',
				setState: { decStress: true },
			}
		
		]
	},
	{
		//Month 3 recap
		id: 2,
		text: 'Work was really stressful these past 3 months. You can not get your develepors to finish anything by the deadlines',
		setState: { incStress: true, paySalary : true },
		nextQuestion: 3
	},
	{
		id: 3,
		text: 'Your very trustworthy 2005 Honda Civic breaks down on the way to work and requires a new transmission. To repair the car it will cost you $$. To buy a new car it will add $$ to your debt.',
		answers:
		[
			{
				//answer 1 decMoney and incCarProblems
				text:'Pay to get it fixed immediately. Your Honda still has a a few more miles left in her and you know it.',
				setState: {decMoney: true, incCarProblems: true },
				nextQuestion: 4
			},
			{
				//answer 2 incStress incSalary
				text:'You love your honda but the transmission costs more than its worth at this point. You decide to live the real city experience and start using public transit to get around.',
				setState: { incStress: true, incRobbery: true },
				nextQuestion: 4
			},
			{
				//answer 3 incDebt delCarProblems
				text:'You decide its time to give up on Betsy, your Honda, and buy a brand new Camry.',
				setState: { incDebt: true, delCarProblems: true },
				nextQuestion: 4
			}
		]
	},
	{
		//Month 6 recap 
		id: 4
	}
]

start()