conf = {
	cycleTime: 100,
	threshold: 1,
	verticeProbability: 0.5
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
		conf.threshold = val;		
	}
}

function changeNodeProbability(that) {
	var val = parseFloat(that.value);
	if (val) {
		conf.verticeProbability = val;		
	}
}