
var netToRun = myNet;

var mainTicker = function() {
	netToRun.checkAndSetParams('threshold');
	netToRun.checkAndSetParams('verticeProbability');

	netToRun.prepareExternalDataForNextCycle();

	netToRun.updateRoots();
	netToRun.determineCurrentState();
	netToRun.determineNetworkEffect();

	// Paint edges of the signaling vertices
	netToRun.relayNetStateToExternalConsumer();

	tick(); // Render the net

	netToRun.causeNetworkEffect();
	netToRun.prepareForNextState();

	setTimeout(mainTicker, conf.cycleTime);
};

setTimeout(mainTicker, 100);

