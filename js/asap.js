import asap from 'asap/raw.js';

export default callbackFunction => {
    let cancelled = false,
        completed = false;

    asap(() => {
        if (!cancelled) {
            completed = true;
            callbackFunction();
        }
    });

    return {
        cancel () {
            cancelled = true;
            return this;
        },
        get cancelled () {
            return cancelled;
        },
        get completed () {
            return completed;
        }
    };
};
