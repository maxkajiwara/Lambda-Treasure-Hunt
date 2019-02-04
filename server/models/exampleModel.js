const db = require('../config/dbConfig');

module.exports = {
	getExamples
};

function getExamples() {
	return db('exampleTable');
}
