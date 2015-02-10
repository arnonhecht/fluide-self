conf = {
	cycleTime: 100,
	verticeThreshold: 1
};

function changeCycleTime(that) {
	var val = parseInt(that.value);
	if (val) {
		conf.cycleTime = val;		
	}
}

function changeNodeThreshold(that) {
	var val = parseInt(that.value);
	if (val) {
		conf.verticeThreshold = val;		
	}
}