'use strict';
module.exports = (() => {
	return class {
		then (callback) {
			if (callback && typeof callback === 'function') {
				const newStep = () => {
					return new Promise(callback);
				};
				this.__promise = !this.__promise ? newStep() : this.__promise.then(newStep);
			} else {
				throw new Error('Missing or invalid promise callback.');
			}
			return this;
		}
		catch (callback) {
			if (this.__promise) {
				if (callback && typeof callback === 'function') {
					this.__promise = this.__promise.catch(callback);
				} else {
					throw new Error('Missing or invalid promise callback.');
				}
			} else {
				throw new Error('Missing or invalid promise callback.');
			}
			return this;
		}
		done (callback) {
			if (callback && typeof callback === 'function') {
				this.__promise = this.__promise.then(callback);
			} else {
				throw new Error('Missing or invalid promise callback.');
			}
			return this;
		}
	}
})();