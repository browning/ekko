var peer = P.create()

var webSocketPeer = peer.to('ws://localhost:20500/')

var peer_list = new Array();

// Listen to the messages the onramp server sends
webSocketPeer.on('message', function(message){
		console.log(message);
        // If we recieve a remote address, add it to peer list
        if(message === "remote address"){
                var peerAddress = arguments[1];
                peer_list.push(peerAddress);
                console.log('Potential peer: ' + peerAddress);
        }
});

webSocketPeer.on('connection', handleRtcConnection);

function handleRtcConnection(webRtcPeer){
        // When ever another browser connects, listen for messages
        webRtcPeer.on('message', function(message){
                // Output the message
                console.log('I received: ' + message);
        });        
}

function broadcast(msg) {
	for(i=0; i<peer_list.length; i++) {
		webRtcPeer = webSocketPeer.to(peer_list[i]);
		console.log('sending ' + msg + ' to ' + peer_list[i]);
		webRtcPeer.on('open', function() {
			this.send(msg);
		});
	}
}

function send_message(msg) {
	broadcast(msg);
}


