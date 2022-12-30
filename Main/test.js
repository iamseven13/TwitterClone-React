function findHighestNumberonArray() {
	var arr = [1, 2, 3, 4, 5];
	var highest = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > highest) {
			highest = arr[i];
		}
	}
	return highest;
}

function axiosRequest() {
	axios
		.get('https://jsonplaceholder.typicode.com/todos/1')
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function reverseString() {
	var str = 'Hello World';
	var strArray = str.split('');
	var reversedArray = strArray.reverse();
	var reversedString = reversedArray.join('');
	return reversedString;
}
reverseString();
