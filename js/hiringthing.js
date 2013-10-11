/*!
 * Hiring Thing Mobile Application Engine
 * http://hiringthing.com/
 *
 *
 * Copyright 2013 Hiring Thing
 * Version 0.5
 * Date: 2013-10-8
 */

function login() {
	var email = $("#email").val();
	var password = $("#password").val();
	var remember = $("#remember").val();
	if (validateEmail(email)) {
		showjobs(null);
	} else {
		document.getElementById("loginerror").innerHTML = "Invalid email address. Please try again.";
	}
}

function logout() {
	showlogin();
	document.getElementById("mainapp").style.display = "none";
}

function submitemail() {
	var email = $("#forgottenemail").val();
	if (validateEmail(email)) {
		showlogin();
		document.getElementById("loginerror").innerHTML = "Please check your email for a new login.";
	} else {
		document.getElementById("forgotpwiline").innerHTML = "Invalid email address. Please try again.<br/><br/>";
	}
}

function showgetpassword() {
	document.getElementById("signin").style.display = "none";
	document.getElementById("forgotpw").style.display = "block";
}

function showlogin() {
	document.getElementById("jobs").style.display = "none";
	document.getElementById("applicants").style.display = "none";
	document.getElementById("signin").style.display = "block";
	document.getElementById("forgotpw").style.display = "none";
}

function backtojobs() {
	document.getElementById("jobs").style.display = "block";
	document.getElementById("applicants").style.display = "none";
}


function backtoapplicants() {
	document.getElementById("applicantdetail").style.display = "none";
	document.getElementById("applicants").style.display = "block";
}

function showjobs(sortedby) {
	//document.getElementById("archivedbutton").
	var joblistings = {
		"jobs": [
			{
				"archived": 0,
				"title": "Web Developer",
				"city": "Portland",
				"state": "OR",
				"country": "United States",
				"id": 339,
				"job_code": "4324",
				"applicants": 136,
				"new_applicants": 4
			},
			{
				"archived": 1,
				"title": "Web Producer",
				"city": "Portland",
				"state": "OR",
				"country": "United States",
				"id": 339,
				"job_code": "4324",
				"applicants": 36,
				"new_applicants": 12
			},
			{
				"archived": 0,
				"title": "Web Designer",
				"city": "Salem",
				"state": "OR",
				"country": "United States",
				"id": 331,
				"job_code": "4321",
				"applicants": 10,
				"new_applicants": 5
			}
		]

	};
	
	var jobs;
	
	if (sortedby) {
		jobs = joblistings.jobs.sort(function(a,b) {
			var x = a[sortedby];
			var y = b[sortedby];
			return ((x > y) ? -1 : ((x > y) ? 1 : 0));
		});
	} else {
		document.getElementById("archivedlisting").style.display = "none";
		document.getElementById("activelisting").style.display = "block";
		jobs = joblistings.jobs
	}
	
	document.getElementById("activelisting").innerHTML = "";
	document.getElementById("archivedlisting").innerHTML = "";
	var active_jobs = 0;
	var archived_jobs = 0;
	var new_applicants = 0;
	var total_applicants = 0;

	if (jobs.length) {
	for (var i = 0; i < jobs.length; i++) {
		if (!jobs[i].archived) {
			active_jobs++;
			var rowtype = " altrow";
			if (i/2 != Math.round(i/2) || i == 0) {
				rowtype = "";
			}
			document.getElementById("activelisting").innerHTML = document.getElementById("activelisting").innerHTML + 
			"<div class=\"listingrow" + rowtype + "\" onClick=\"getjobapplicants(" + i + ",\'" + jobs[i].title + "\', null );\">" +
			"<div class=\"columna\">" +
			"<p class=\"jobtitle\">" + jobs[i].title + "</p>" +
			"<p class=\"joblocation\">" + jobs[i].city + ", " + jobs[i].state + "</p>" +
			"</div>" +
			"<div class=\"columnb\"><p class=\"columnnum\">" + jobs[i].new_applicants + "</p></div>" + 
			"<div class=\"columnc\"><p class=\"columnnum\">" + jobs[i].applicants + "</p></div>" +
			"<div class=\"carrotcolumn\">&rsaquo;</div><div class=\"brclear\"></div></div>";
			new_applicants = new_applicants + jobs[i].new_applicants;
			total_applicants = total_applicants + jobs[i].applicants;
		} else {
			archived_jobs++;

			var rowtype = " altrow";
			if (i/2 != Math.round(i/2) || i == 0) {
				rowtype = "";
			}
			document.getElementById("archivedlisting").innerHTML = document.getElementById("archivedlisting").innerHTML + 
			"<div class=\"listingrow" + rowtype + "\" onClick=\"getjobapplicants(" + i + ",\'" + jobs[i].title + "\', null );\">" +
			"<div class=\"columna\">" +
			"<p class=\"jobtitle\">" + jobs[i].title + "</p>" +
			"<p class=\"joblocation\">" + jobs[i].city + ", " + jobs[i].state + "</p>" +
			"</div>" +
			"<div class=\"columnb\"><p class=\"columnnum\">" + jobs[i].new_applicants + "</p></div>" + 
			"<div class=\"columnc\"><p class=\"columnnum\">" + jobs[i].applicants + "</p></div>" +
			"<div class=\"carrotcolumn\">&rsaquo;</div><div class=\"brclear\"></div></div>";


			new_applicants = new_applicants + jobs[i].new_applicants;
			total_applicants = total_applicants + jobs[i].applicants;
		}
	}
	}



	document.getElementById("signin").style.display = "none";
	document.getElementById("jobs").style.display = "block";
	document.getElementById("mainapp").style.display = "block";
	
	document.getElementById("currenttabsum").innerHTML = "Active Jobs ("+ active_jobs +")";
	document.getElementById("activejobsnum").innerHTML = active_jobs;
	document.getElementById("archivedjobsnum").innerHTML = archived_jobs;
	document.getElementById("newapplicantsnum").innerHTML = new_applicants;
	document.getElementById("totalapplicantsnum").innerHTML = total_applicants;
	
}

function switchtoarchived() {
	document.getElementById("archivedbutton").setAttribute("class", "atab active");
	document.getElementById("activebutton").setAttribute("class", "atab");
	document.getElementById("archivedlisting").style.display = "block";
	document.getElementById("activelisting").style.display = "none";
}

function switchtoactive() {
	document.getElementById("archivedbutton").setAttribute("class", "atab");
	document.getElementById("activebutton").setAttribute("class", "atab active");
	document.getElementById("archivedlisting").style.display = "none";
	document.getElementById("activelisting").style.display = "block";
}


function switchtoallapps() {
	document.getElementById("newappstab").setAttribute("class", "atab");
	document.getElementById("ratedappstab").setAttribute("class", "atab");
	document.getElementById("archivedappstab").setAttribute("class", "atab");
	document.getElementById("allappstab").setAttribute("class", "atab active");

	document.getElementById("newapplicants").style.display = "none";
	document.getElementById("ratedapplicants").style.display = "none";
	document.getElementById("archivedapplicants").style.display = "none";
	document.getElementById("allapplicants").style.display = "block";
}

function switchtoarchivedapps() {
	document.getElementById("newappstab").setAttribute("class", "atab");
	document.getElementById("ratedappstab").setAttribute("class", "atab");
	document.getElementById("allappstab").setAttribute("class", "atab");
	document.getElementById("archivedappstab").setAttribute("class", "atab active");

	document.getElementById("newapplicants").style.display = "none";
	document.getElementById("ratedapplicants").style.display = "none";
	document.getElementById("allapplicants").style.display = "none";
	document.getElementById("archivedapplicants").style.display = "block";
}

function switchtoratedapps() {
	document.getElementById("newappstab").setAttribute("class", "atab");
	document.getElementById("archivedappstab").setAttribute("class", "atab");
	document.getElementById("allappstab").setAttribute("class", "atab");
	document.getElementById("ratedappstab").setAttribute("class", "atab active");

	document.getElementById("newapplicants").style.display = "none";
	document.getElementById("archivedapplicants").style.display = "none";
	document.getElementById("allapplicants").style.display = "none";
	document.getElementById("ratedapplicants").style.display = "block";
}


function switchtonewapps() {
	document.getElementById("ratedappstab").setAttribute("class", "atab");
	document.getElementById("archivedappstab").setAttribute("class", "atab");
	document.getElementById("allappstab").setAttribute("class", "atab");
	document.getElementById("newappstab").setAttribute("class", "atab active");

	document.getElementById("ratedapplicants").style.display = "none";
	document.getElementById("archivedapplicants").style.display = "none";
	document.getElementById("allapplicants").style.display = "none";
	document.getElementById("newapplicants").style.display = "block";
}



function getjobapplicants(jobid, jobname, searchphrase) {

	var applicantlist = {
		"applicants": [
			{
				"new_applicant": 1,
				"archived": 0,
				"first_name": "Stephen",
				"last_name": "Kozik",
				"id": 339,
				"rating": 0,
				"job_name": "Web Designer"
			},

			{
				"new_applicant": 1,
				"archived": 0,
				"first_name": "Jeff",
				"last_name": "Locke",
				"id": 269,
				"rating": 2,
				"job_name": "Web Designer"
			},

			{
				"new_applicant": 0,
				"archived": 1,
				"first_name": "Bill",
				"last_name": "Smithcheck",
				"id": 319,
				"rating": 5,
				"job_name": "Web Designer"
			},

			{
				"new_applicant": 0,
				"archived": 0,
				"first_name": "John",
				"last_name": "Smith",
				"id": 139,
				"rating": 3,
				"job_name": "Web Designer"
			}

		]

	};


	document.getElementById("newapplicants").innerHTML = "";
	document.getElementById("ratedapplicants").innerHTML = "";
	document.getElementById("archivedapplicants").innerHTML = "";
	document.getElementById("allapplicants").innerHTML = "";

	if (jobname) {
		document.getElementById("jobtitle").innerHTML = jobname;
	} else if (searchphrase) {
		document.getElementById("jobtitle").innerHTML = "Results for '" + searchphrase + "'";
	}

	var new_applicants = 0;
	var rated_applicants = 0;
	var archived_applicants = 0;
	var total_applicants = 0;


	if (applicantlist.applicants.length) {
		for (var i = 0; i < applicantlist.applicants.length; i++) {
			var rowtype = " altrow";
			if (i/2 != Math.round(i/2)) {
				rowtype = "";
			}
			var star_rating_html = "";
			for (var a = 0; a < applicantlist.applicants[i].rating; a++) {
				star_rating_html = star_rating_html + "<img src=\"images/star_on.png\" width=\"16\" height=\"16\" border=\"0\" />";
				
			}
			for (var a = 0; a < (5 - applicantlist.applicants[i].rating); a++) {
				star_rating_html = star_rating_html + "<img src=\"images/star_off.png\" width=\"16\" height=\"16\" border=\"0\" />";
					
			}
			if (applicantlist.applicants[i].new_applicant) {
				document.getElementById("newapplicants").innerHTML = document.getElementById("newapplicants").innerHTML +
				"<div class=\"listingrow" + rowtype + "\" onClick=\"getapplicantdetail(" + i + ");\">" +
				"<div class=\"columnd\"><p class=\"applicantname\">" + applicantlist.applicants[i].first_name + " " + applicantlist.applicants[i].last_name + "</p>" +
				"</div>" +
				"<div class=\"columne\">" +
				star_rating_html +
				"</div><div class=\"columnf\"><p class=\"columnviewer\" id=\"viewbutton1\">View &rsaquo;</p>" +
				"</div><div class=\"brclear\"></div></div>";

				new_applicants++;

			}

			if (applicantlist.applicants[i].archived) {
				document.getElementById("archivedapplicants").innerHTML = document.getElementById("archivedapplicants").innerHTML +
				"<div class=\"listingrow" + rowtype + "\" onClick=\"getapplicantdetail(" + i + ");\">" +
				"<div class=\"columnd\"><p class=\"applicantname\">" + applicantlist.applicants[i].first_name + " " + applicantlist.applicants[i].last_name + "</p>" +
				"</div>" +
				"<div class=\"columne\">" +
				star_rating_html +
				"</div><div class=\"columnf\"><p class=\"columnviewer\" id=\"viewbutton1\">View &rsaquo;</p>" +
				"</div><div class=\"brclear\"></div></div>";

				archived_applicants++;

			}
			
			if (applicantlist.applicants[i].rating) {
				document.getElementById("ratedapplicants").innerHTML = document.getElementById("ratedapplicants").innerHTML +
				"<div class=\"listingrow" + rowtype + "\" onClick=\"getapplicantdetail(" + i + ");\">" +
				"<div class=\"columnd\"><p class=\"applicantname\">" + applicantlist.applicants[i].first_name + " " + applicantlist.applicants[i].last_name + "</p>" +
				"</div>" +
				"<div class=\"columne\">" +
				star_rating_html +
				"</div><div class=\"columnf\"><p class=\"columnviewer\" id=\"viewbutton1\">View &rsaquo;</p>" +
				"</div><div class=\"brclear\"></div></div>";

				rated_applicants++;
			}
			
			total_applicants++;
			
			document.getElementById("allapplicants").innerHTML = document.getElementById("allapplicants").innerHTML +
			"<div class=\"listingrow" + rowtype + "\" onClick=\"getapplicantdetail(" + i + ");\">" +
			"<div class=\"columnd\"><p class=\"applicantname\">" + applicantlist.applicants[i].first_name + " " + applicantlist.applicants[i].last_name + "</p>" +
			"</div>" +
			"<div class=\"columne\">" +
			star_rating_html +
			"</div><div class=\"columnf\"><p class=\"columnviewer\" id=\"viewbutton1\">View &rsaquo;</p>" +
			"</div><div class=\"brclear\"></div></div>";

			
		}
	}


	document.getElementById("newapplicants").style.display = "block";
	document.getElementById("ratedapplicants").style.display = "none";
	document.getElementById("archivedapplicants").style.display = "none";
	document.getElementById("allapplicants").style.display = "none";

	var active_jobs = 0;
	
	document.getElementById("newapplicantsnumz").innerHTML = new_applicants;
	document.getElementById("ratedappz").innerHTML = rated_applicants;
	document.getElementById("archivedappz").innerHTML = archived_applicants;
	document.getElementById("totalappz").innerHTML = total_applicants;


	document.getElementById("jobs").style.display = "none";
	document.getElementById("applicants").style.display = "block";
	document.getElementById("mainapp").style.display = "block";
	
 	
}


function validateEmail(email) { 
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function searchfor(applicant) {
        getjobapplicants(0, null, applicant);
};

function getapplicantdetail(applicant_id) {
	var applicant_info = "<div class=\"columnd\">Rate This Applicant:</div><div class=\"columne\"><img src=\"images/star_off.png\" id=\"star1\" width=\"16\" height=\"16\" border=\"0\" onClick=\"rateapplicant(1,'" + applicant_id + "');\"/><img src=\"images/star_off.png\" id=\"star2\" width=\"16\" height=\"16\" border=\"0\" onClick=\"rateapplicant(2,'" + applicant_id + "');\"/><img src=\"images/star_off.png\" id=\"star3\" width=\"16\" height=\"16\" border=\"0\" onClick=\"rateapplicant(3,'" + applicant_id + "');\"/><img src=\"images/star_off.png\" id=\"star4\" width=\"16\" height=\"16\" border=\"0\" onClick=\"rateapplicant(4,'" + applicant_id + "');\"/><img src=\"images/star_off.png\" id=\"star5\" width=\"16\" height=\"16\" border=\"0\" onClick=\"rateapplicant(5,'" + applicant_id + "');\"/></div><div class=\"brclear\"></div>";

	applicant_info = applicant_info + "<div id=\"info\" class=\"box\"><h1>George Peterson</h1><div class=\"content\"><p>5553334444</p><p>no@email.com</p><em>applied for <strong>Account Executive</strong> on 04/06/13</em></div></div><div id=\"status\" class=\"box\"><h2>Current Status</h2><div class=\"content\"><hr /><p>Status: <strong>Schedule phone interview</strong></p><hr /><h4>Notes</h4><ul><li>Marked as [ Hired ] <small><em>by Eric Semon on 09/10/13</em></small></li><li>Marked as [ Hired ] <small><em>by Eric Semon on 09/10/13</em></small></li><li>Removed from archive.<small><em>by Joshua Siler on 09/04/13</em></small></li><li>Archived.<small><em>by Eric Semon on 08/27/13</em></small></li><li>Marked as [ Hired ] <small><em>by Eric Semon on 08/27/13</em></small></li><li>In-Person-Interview scheduled for Jul 19, 5:30 AM (PDT). &lt;br/&gt;Invitees: George Peterson, Eric Semon<small><em>by Eric Semon on 07/19/13</em></small></li><li>Eric Semon sent a message to George Peterson<small><em>by Eric Semon on 07/19/13</em></small></li><li>Rating updated to [ 1 stars ] <small><em>by Eric Semon on 07/19/13</em></small></li><li>Rating was cleared [ previously 1 stars ] <small><em>by Eric Semon on 07/19/13</em></small></li><li>Removed from archive.<small><em>by Eric Semon on 07/19/13</em></small></li><li>Archived.<small><em>by Eric Semon on 07/19/13</em></small></li><li>Sent &#x27;Thanks But No Thanks&#x27; email.<small><em>by Eric Semon on 07/19/13</em></small></li><li>Eric Semon sent a note to Buzz Killington: This is a test notification<small><em>by Eric Semon on 07/19/13</em></small></li><li>Rating updated to [ 4 stars ] <small><em>by Eric Semon on 07/19/13</em></small></li><li>Status updated to [ Schedule phone interview ] <small><em>by Eric Semon on 07/19/13</em></small></li><li>Status updated to [ Not qualified ] <small><em>by Eric Semon on 07/19/13</em></small></li><li>this is a test note.<small><em>by Eric Semon on 07/19/13</em></small></li><li>Status updated to [ Not qualified ] <small><em>by Eric Semon on 05/07/13</em></small></li><li>Rating updated to [ 4 stars ] <small><em>by Eric Semon on 05/07/13</em></small></li><li>Archived.<small><em>by Eric Semon on 04/19/13</em></small></li></ul></div></div>";
	document.getElementById("applicantraw").innerHTML = applicant_info;
	document.getElementById("mainapp").style.display = "block";
	document.getElementById("jobs").style.display = "none";
	document.getElementById("applicants").style.display = "none";
	document.getElementById("applicantdetail").style.display = "block";
}

function rateapplicant(rating,applicant_id) {
	for (var i = 1; i < 6; i++) {
		document.getElementById("star"+i).src = "images/star_off.png";
	}
	for (var i = 1; i < (rating+1); i++) {
		document.getElementById("star"+i).src = "images/star_on.png";
	}
	
	var ratings = {
		"rating": rating,
		"applicant_id": applicant_id
	};

}

function sortjobsby(sorttype) {
	if (sorttype == "title") {
		document.getElementById("positionon").src = "images/downarrow.png";
		document.getElementById("newon").src = "images/blank.png";
		document.getElementById("totalon").src = "images/blank.png";
	}
	if (sorttype == "new_applicants") {
		document.getElementById("positionon").src = "images/blank.png";
		document.getElementById("newon").src = "images/downarrow.png";
		document.getElementById("totalon").src = "images/blank.png";
	}
	if (sorttype == "applicants") {
		document.getElementById("positionon").src = "images/blank.png";
		document.getElementById("newon").src = "images/blank.png";
		document.getElementById("totalon").src = "images/downarrow.png";
	}
	showjobs(sorttype);
}