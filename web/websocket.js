

var wsUrl="ws://"+document.location.host + document.location.pathname + "echo";
var websocket = new WebSocket(wsUrl);
var username;

websocket.onopen = function(evt){OnOpen(evt)};
websocket.onmessage = function(evt){OnMessage(evt)};
websocket.onclose = function(evt){OnClose(evt)};
websocket.onerror = function(evt){OnError(evt)};

var output = document.getElementById("output");

function join(){
    username=textField.value;
    websocket.send(username + ": enlazado");
}

function send_message(){
    websocket.send(username +": "+textField.value);
}

function OnOpen(evt){
    writeToScreen("Conectado a " + wsUrl);
}

function OnMessage(evt){
    console.log("OnMessage");
    writeToScreen("Recibido:" + evt.data);
    console.log(evt.data);
    if((evt.data.indexOf("enlazado"))!==-1){
        userField.innerHTML+=evt.data.substring(0,evt.data.indexOf("enlazado"))+"\n";
    }else{
        chatlogField.innerHTML+=evt.data+"\n";
    }
}

function OnError(){
    writeToScreen('<span style="color:red;">ERROR: </span>'+evt.data);
}

function writeToScreen(message){
    output.innerHTML+=message+"<br>";
}