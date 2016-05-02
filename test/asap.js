import {
    describe,
    it
} from 'mocha';

import asap from '../js/asap.js';

import {
    expect
} from 'chai';

import {
    setTimeout
} from 'timers';

describe('asap', function () {
    this.timeout(13);

    it('should be a function', () => {
        expect(asap).to.be.a('function');
    });

    it('should execute a task as soon as possible but not before it returns', callbackFunction => {
        let before = true;

        const handle = asap(() => {
            expect(before).to.be.false;
            expect(handle).to.have.property('completed', true);
            callbackFunction();
        });

        expect(handle).to.be.an('object');
        expect(handle).to.have.property('completed', false);

        before = false;
    });

    it('should allow tasks to be cancelled before execution', callbackFunction => {
        let called = false;

        const handle = asap(() => {
            called = true;
        });

        expect(handle).to.be.an('object');
        expect(handle).to.have.property('cancel').that.is.a('function');
        expect(handle).to.have.property('cancelled', false);
        handle.cancel();
        expect(handle).to.have.property('cancelled', true);

        setTimeout(() => {
            expect(called).to.be.false;
            callbackFunction();
        }, 8);
    });
});
