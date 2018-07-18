'use strict';
const Avalanche = require('../');
const testTimeout = 1000;

class Test extends Avalanche {
	constructor() {
		super();
		this.a = 0;
	}

	methodA(param = 1) {
		return this.then(resolve => {
			setTimeout(() => {
				this.a += param;
				resolve(this.a);
			}, testTimeout);
		});
	}

	methodB(multiplier = 2) {
		return this.then(resolve => {
			setTimeout(() => {
				this.b = this.a * multiplier;
				console.log('B done', this.a, this.b);
				resolve(this.b);
			}, testTimeout);
		});
	}

	methodC(forceFail) {
		return this.then((resolve, reject) => {
			setTimeout(() => {
				if (forceFail) {
					reject(new Error('Handled error'));
				} else {
					resolve({a: this.a, b: this.b});
				}
			}, testTimeout);
		});
	}
}

new Test()
	.methodA(5)
	.methodB(3)
	.methodA(2)
	.methodB()
	.methodA(8)
	.methodB(1)
	.methodC()
	.catch(error => {
		console.error(error);
	})
	.done(stuff => {
		console.log('All is done... errors or not...', stuff);
	});