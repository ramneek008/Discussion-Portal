var ul_ques = document.getElementById("ques_list");

var id=1;

var questions = [];

var newQues = document.getElementById("newQues");
newQues.addEventListener("click", showQuestionForm);

function showQuestionForm(){
	document.getElementById("portal").setAttribute("class", "show");
	document.getElementById("response_portal").setAttribute("class", "hide");
}

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

		showQuestions();
	}
}

function showQuestionInfo(){
	let id_sel = this.getAttribute("id");
	document.getElementById("portal").setAttribute("class", "hide");
	document.getElementById("response_portal").setAttribute("class", "show");
	let j=0;
	for(j=0;j<questions.length;j++)
	{
		if(questions[j].id==id_sel)
			break;
	}
	let question_head = document.getElementById("question_head");
	let h3_qh = document.createElement("h3");
	let p_qh = document.createElement("p");
	question_head.innerHTML="";
	h3_qh.innerHTML = questions[j].subject;
	p_qh.innerHTML = questions[j].question;
	question_head.appendChild(h3_qh);
	question_head.appendChild(p_qh);

	let resolve = document.getElementById("resolve");
	resolve.onclick = () => resolveQuestion(j);

	showResponses(j);

	// Use onclick to overwrite the function. addEventListener keeps on appending functions. 

	let submit_res = document.getElementById("submit_res");
	submit_res.onclick = () => addResponse(j);

}


function resolveQuestion(id){
	questions.splice(id,1);

	showQuestions();
	showQuestionForm();
}

var ul_res = document.getElementById("res_list");

function showResponses(id){
	ul_res.innerHTML="";
	questions[id].responses.forEach((res) => {
		let li_res = document.createElement("li");
		let h3_res = document.createElement("h3");
		let p_res = document.createElement("p");
		h3_res.innerHTML = res.name;
		p_res.innerHTML = res.comment;
		li_res.appendChild(h3_res);
		li_res.appendChild(p_res);
		ul_res.appendChild(li_res);
	});
}

function addResponse(id){
	//console.log(id);
	let object_res = {};
	let name_res = document.getElementById("name_res").value;
	let comment_res = document.getElementById("comment_res").value;
	if(name_res!=="" && comment_res!==""){
		document.getElementById("name_res").value="";
		document.getElementById("comment_res").value="";

		object_res.name = name_res;
		object_res.comment = comment_res;

		questions[id].responses.push(object_res);

		showResponses(id);
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
