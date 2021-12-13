var serverUrl = "/hello/";

function getXMLHttp()
{
  var xmlHttp

  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}

function HandleResponse(response)
{
  document.getElementById('ResponseDiv').innerHTML = response;
}

function MakeRequestSync()
{
	var xmlHttp = getXMLHttp();
	  
	userKeyin = document.getElementById('txtTest').value;

	xmlHttp.open("GET", serverUrl + userKeyin, false);
	xmlHttp.send(null);

	// HandleResponse(userKeyin);
	HandleResponse(xmlHttp.responseText);
}

function MakeRequestAsync()
{
  var xmlHttp = getXMLHttp();
 
  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      HandleResponse(xmlHttp.responseText);
    }
  }
  
  userKeyin = document.getElementById('txtTest').value;

  xmlHttp.open("GET", serverUrl + userKeyin, true);
  xmlHttp.send(null);
}
