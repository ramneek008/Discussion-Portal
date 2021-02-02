var ul_ques = document.getElementById("ques_list");

var id=1;
var questions = [];

var submit_ques = document.getElementById("submit_ques");

submit_ques.addEventListener("click", addQuestion);
showQuestions();

function showQuestions(){
	ul_ques.innerHTML="";
	questions.forEach((ques) => {
		let li_ques = document.createElement("li");
		li_ques.setAttribute("id", ques.id);
		let h3_ques = document.createElement("h3");
		let p_ques = document.createElement("p");
		h3_ques.innerHTML = ques.subject;
		p_ques.innerHTML = ques.question;
		li_ques.appendChild(h3_ques);
		li_ques.appendChild(p_ques);
		ul_ques.appendChild(li_ques);
		li_ques.addEventListener("click", showQuestionInfo);
	});
}

function addQuestion(){
	let object = {};
	let subject = document.getElementById("subject").value;
	let question = document.getElementById("question").value;
	if(subject!=="" && question!=="")
	{
		document.getElementById("subject").value="";
		document.getElementById("question").value="";
		object.id = id;
		object.subject = subject;
		object.question = question;
		object.responses = [];
		questions.push(object);
		id++;

		localStorage.setItem("questions",JSON.stringify(questions));
		localStorage.setItem("id",JSON.stringify(id));
		showQuestions();
	}
}

function filter()
{
	let text = document.getElementById("search").value.toLowerCase();
	//console.log(text);
	if(text==="")
	{
		//console.log(questions);
		showQuestions();
	}
	else
	{
		showFilteredQuestions(text);
	}
}

function showFilteredQuestions(text){
	let size=0;
	ul_ques.innerHTML="";
	questions.forEach((ques) => {
		let txt1 = ques.subject.toLowerCase();
		let txt2 = ques.question.toLowerCase();
		if(txt1.includes(text) || txt2.includes(text))
		{
			let li_ques = document.createElement("li");
			li_ques.setAttribute("id", ques.id);
			let h3_ques = document.createElement("h3");
			let p_ques = document.createElement("p");
			h3_ques.innerHTML = ques.subject;
			p_ques.innerHTML = ques.question;
			li_ques.appendChild(h3_ques);
			li_ques.appendChild(p_ques);
			ul_ques.appendChild(li_ques);
			li_ques.addEventListener("click", showQuestionInfo);
			size++;
		}
	});
	if(size===0)
	{
		let li_ques = document.createElement("li");
		let h3_ques = document.createElement("h3");
		let p_ques = document.createElement("p");
		h3_ques.innerHTML = "No match found";
		p_ques.innerHTML = "";
		li_ques.appendChild(h3_ques);
		li_ques.appendChild(p_ques);
		ul_ques.appendChild(li_ques);
	}
}
